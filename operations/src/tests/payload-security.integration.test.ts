import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { sql } from '@payloadcms/db-postgres'
import { createLocalReq, getPayload, killTransaction, type Payload, type PayloadRequest } from 'payload'

import { LeadWorkflowService } from '@/services/lead-workflow-service'
import { UserSecurityService } from '@/services/user-security-service'

const runAgainstIsolatedDatabase = Boolean(process.env.DATABASE_URI && process.env.OVOPS_RUNTIME_MODE === 'test')
const describeIntegration = runAgainstIsolatedDatabase ? describe : describe.skip

type TransactionExecutor = { execute(statement: unknown): Promise<unknown> }
type TransactionSessionAdapter = { sessions: Record<string, { db: TransactionExecutor }> }

let payload: Payload
let fixtureReq: PayloadRequest
let savepointIndex = 0

async function payloadConfig() {
  return (await import('@payload-config')).default
}

function transactionExecutor(req: PayloadRequest): TransactionExecutor | undefined {
  const adapter = payload.db as unknown as TransactionSessionAdapter
  return adapter.sessions[String(req.transactionID)]?.db
}

async function withSavepoint<T>(req: PayloadRequest, operation: (executor: TransactionExecutor) => Promise<T>): Promise<T> {
  const executor = transactionExecutor(req)
  if (!executor) throw new Error('test fixture transaction session is unavailable')
  const name = `fixture_guard_${++savepointIndex}`
  await executor.execute(sql.raw(`SAVEPOINT ${name}`))
  try {
    const result = await operation(executor)
    await executor.execute(sql.raw(`RELEASE SAVEPOINT ${name}`))
    return result
  } catch (error) {
    await executor.execute(sql.raw(`ROLLBACK TO SAVEPOINT ${name}`))
    await executor.execute(sql.raw(`RELEASE SAVEPOINT ${name}`))
    throw error
  }
}

async function syntheticUser(role: 'super_admin' | 'ops_manager', status: 'active' | 'invited' | 'suspended' = 'active') {
  return payload.create({
    collection: 'users',
    data: {
      displayName: `Synthetic ${role}`,
      email: `${role}-${crypto.randomUUID()}@example.test`,
      password: 'Synthetic-Test-Only-Password-123!',
      role,
      status,
    },
    overrideAccess: true,
    req: fixtureReq,
  })
}

async function syntheticLead() {
  return payload.create({
    collection: 'leads',
    data: {
      consentAt: new Date().toISOString(),
      consentVersion: 'privacy-v1-draft',
      contactName: 'Workflow Synthetic',
      dedupeKey: crypto.randomUUID().replaceAll('-', ''),
      email: `workflow-${crypto.randomUUID()}@example.test`,
      message: 'This synthetic Lead exists only to validate the protected workflow service.',
      notificationStatus: 'pending',
      retentionExpiresAt: new Date(Date.now() + 86_400_000).toISOString(),
      sourceRoute: '/contact',
      status: 'new',
    },
    overrideAccess: true,
    req: fixtureReq,
  })
}

async function activeSuperAdminCount(req = fixtureReq): Promise<number> {
  const active = await payload.find({
    collection: 'users',
    overrideAccess: true,
    req,
    where: { and: [{ role: { equals: 'super_admin' } }, { status: { equals: 'active' } }] },
  })
  return active.totalDocs
}

async function assertTestDatabaseRowsAreZero(): Promise<void> {
  const counts = await Promise.all(['users', 'leads', 'lead-notes', 'audit-events', 'intake-requests'].map(async (collection) => {
    return (await payload.count({ collection: collection as 'users', overrideAccess: true })).totalDocs
  }))
  expect(counts).toEqual([0, 0, 0, 0, 0])
}

describeIntegration('Payload workflow and user-security integration', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await payloadConfig() })
  })

  beforeEach(async () => {
    const transactionID = await payload.db.beginTransaction()
    if (transactionID === null) throw new Error('test fixture transaction is unavailable')
    fixtureReq = await createLocalReq({ context: { systemOperation: 'fixture-rollback' }, req: { transactionID } }, payload)
  })

  afterEach(async () => {
    // Payload aborts a transaction itself when a collection operation fails.
    // Otherwise, roll back this test's complete fixture graph. No trigger is
    // disabled, no table is truncated, and no privileged cleanup is used.
    if (transactionExecutor(fixtureReq)) await killTransaction(fixtureReq)
    await assertTestDatabaseRowsAreZero()
  })

  it('blocks direct updates, validates transitions, records an audit, and rejects mass assignment', async () => {
    const actor = await syntheticUser('ops_manager')
    const lead = await syntheticLead()
    const workflow = new LeadWorkflowService(payload)

    await expect(payload.update({ collection: 'leads', id: lead.id, data: { status: 'triaged' }, overrideAccess: false })).rejects.toThrow('not allowed')
    // Rejected Local API requests can abort their transaction, so this forged
    // request intentionally has no fixture transaction to preserve test
    // isolation while proving that a copied string is not authority.
    const forgedWorkflowReq = await createLocalReq({ context: { systemOperation: 'lead-workflow' } }, payload)
    await expect(payload.update({ collection: 'leads', id: lead.id, data: { status: 'triaged' }, overrideAccess: false, req: forgedWorkflowReq })).rejects.toThrow('not allowed')
    const forgedObjectReq = await createLocalReq({ context: { __ovopsInternalContext: true, systemOperation: 'lead-workflow', [Symbol('forged-capability')]: true } }, payload)
    await expect(payload.update({ collection: 'leads', id: lead.id, data: { status: 'triaged' }, overrideAccess: false, req: forgedObjectReq })).rejects.toThrow('not allowed')
    await expect(payload.create({ collection: 'audit-events', data: { action: 'forged', metadata: {}, requestId: crypto.randomUUID(), resourceId: String(lead.id), resourceType: 'lead', result: 'success' }, overrideAccess: false, req: forgedWorkflowReq })).rejects.toThrow('not allowed')
    await expect(workflow.transition({ actorId: actor.id, leadId: lead.id, requestId: crypto.randomUUID(), patch: { status: 'triaged', email: 'forbidden@example.test' }, req: fixtureReq })).rejects.toThrow('field is not allowed')
    const updated = await workflow.transition({ actorId: actor.id, leadId: lead.id, requestId: 'workflow-transition', patch: { status: 'triaged' }, req: fixtureReq })
    expect(updated.status).toBe('triaged')
    await expect(workflow.transition({ actorId: actor.id, leadId: lead.id, requestId: crypto.randomUUID(), patch: { status: 'closed_won' }, req: fixtureReq })).rejects.toThrow('not permitted')
    const audit = await payload.find({ collection: 'audit-events', overrideAccess: true, req: fixtureReq, where: { requestId: { equals: 'workflow-transition' } } })
    expect(audit.totalDocs).toBe(1)

    const note = await workflow.createNote({ actorId: actor.id, body: 'Synthetic protected note.', leadId: lead.id, requestId: 'workflow-note', req: fixtureReq })
    await expect(payload.update({ collection: 'lead-notes', id: note.id, data: { body: 'direct mutation' }, overrideAccess: false })).rejects.toThrow('not allowed')
    await expect(workflow.updateNote({ actorId: actor.id, noteId: note.id, requestId: crypto.randomUUID(), patch: { body: 'body', author: actor.id }, req: fixtureReq })).rejects.toThrow('field is not allowed')
  })

  it('preserves the last active super_admin under a competing status change without persisting fixtures', async () => {
    const first = await syntheticUser('super_admin')
    const second = await syntheticUser('super_admin')
    const service = new UserSecurityService(payload)
    await service.changeStatus({ actorId: first.id, userId: second.id, requestId: crypto.randomUUID(), patch: { status: 'suspended' }, req: fixtureReq })
    expect(await activeSuperAdminCount()).toBe(1)

    await expect(withSavepoint(fixtureReq, (executor) => executor.execute(sql`UPDATE users SET status = 'suspended' WHERE id = ${first.id}`))).rejects.toThrow('Failed query')
    expect(await activeSuperAdminCount()).toBe(1)
  })

  it('does not let the protected service suspend the last active super_admin', async () => {
    const first = await syntheticUser('super_admin')
    const second = await syntheticUser('super_admin')
    const service = new UserSecurityService(payload)
    await service.changeStatus({ actorId: first.id, userId: second.id, requestId: crypto.randomUUID(), patch: { status: 'suspended' }, req: fixtureReq })
    expect(await activeSuperAdminCount()).toBe(1)
    await expect(service.changeStatus({ actorId: first.id, userId: first.id, requestId: crypto.randomUUID(), patch: { status: 'suspended' }, req: fixtureReq })).rejects.toThrow('Failed query')
  })

  it('does not let a direct Payload update bypass the last-super-admin trigger', async () => {
    const first = await syntheticUser('super_admin')
    const second = await syntheticUser('super_admin')
    const service = new UserSecurityService(payload)
    await service.changeStatus({ actorId: first.id, userId: second.id, requestId: crypto.randomUUID(), patch: { status: 'suspended' }, req: fixtureReq })
    expect(await activeSuperAdminCount()).toBe(1)
    await expect(payload.update({ collection: 'users', id: first.id, data: { status: 'suspended' }, overrideAccess: true, req: fixtureReq })).rejects.toThrow('Failed query')
  })

  it('does not let a direct Payload delete bypass the last-super-admin trigger', async () => {
    const first = await syntheticUser('super_admin')
    const second = await syntheticUser('super_admin')
    const service = new UserSecurityService(payload)
    await service.changeStatus({ actorId: first.id, userId: second.id, requestId: crypto.randomUUID(), patch: { status: 'suspended' }, req: fixtureReq })
    expect(await activeSuperAdminCount()).toBe(1)
    await expect(payload.delete({ collection: 'users', id: first.id, overrideAccess: true, req: fixtureReq })).rejects.toThrow('Failed query')
  })
})
