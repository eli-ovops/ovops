import type { Payload, PayloadRequest } from 'payload'
import { commitTransaction, createLocalReq, killTransaction } from 'payload'

import { assertLeadTransition, leadStatuses, type LeadStatus } from '@/services/lead-service'

type ActiveOperator = { id: number; role: 'super_admin' | 'ops_manager'; status: 'active' | 'invited' | 'suspended' }
type StoredLead = { id: number; status: LeadStatus }
type StoredNote = { id: number; lead: number; author: number }
const leadWorkflowCapability = Symbol('ovops.lead-workflow-capability')

export function isLeadWorkflowRequest(request: unknown): boolean {
  if (!request || typeof request !== 'object') return false
  const context = (request as { context?: unknown }).context
  return Boolean(context && typeof context === 'object' && (context as Record<PropertyKey, unknown>)[leadWorkflowCapability] === true)
}

async function createLeadWorkflowRequest(payload: Payload, transactionID: number | string): Promise<PayloadRequest> {
  return createLocalReq({ context: { __ovopsInternalContext: true, [leadWorkflowCapability]: true }, req: { transactionID } }, payload)
}

function asActiveOperator(user: unknown): ActiveOperator {
  const candidate = user as Partial<ActiveOperator> | undefined
  if (!candidate || typeof candidate.id !== 'number' || candidate.status !== 'active' || (candidate.role !== 'super_admin' && candidate.role !== 'ops_manager')) {
    throw new Error('persisted active operator is required')
  }
  return candidate as ActiveOperator
}

function onlyKeys(value: Record<string, unknown>, allowed: readonly string[]): void {
  if (Object.keys(value).some((key) => !allowed.includes(key))) throw new Error('field is not allowed for this operation')
}

function asLeadStatus(value: unknown): LeadStatus {
  if (typeof value !== 'string' || !leadStatuses.includes(value as LeadStatus)) throw new Error('lead status is invalid')
  return value as LeadStatus
}

export class LeadWorkflowService {
  constructor(private readonly payload: Payload) {}

  private async request(transactionID: number | string): Promise<PayloadRequest> {
    return createLeadWorkflowRequest(this.payload, transactionID)
  }

  private async actor(req: PayloadRequest, actorId: number): Promise<ActiveOperator> {
    return asActiveOperator(await this.payload.findByID({ collection: 'users', id: actorId, overrideAccess: false, req }))
  }

  private assertSystemRequest(req: PayloadRequest): void {
    if (!isLeadWorkflowRequest(req)) throw new Error('lead workflow system request is required')
  }

  async transition(input: { actorId: number; leadId: number; requestId: string; patch: Record<string, unknown>; req?: PayloadRequest }): Promise<StoredLead> {
    onlyKeys(input.patch, ['status', 'owner'])
    const status = asLeadStatus(input.patch.status)
    const ownsTransaction = !input.req
    const transactionID = ownsTransaction ? await this.payload.db.beginTransaction() : null
    if (ownsTransaction && transactionID === null) throw new Error('database transaction is unavailable')
    const requestTransactionID = input.req ? await input.req.transactionID : transactionID
    if (requestTransactionID == null) throw new Error('database transaction is unavailable')
    const req = await this.request(requestTransactionID)

    try {
      this.assertSystemRequest(req)
      await this.actor(req, input.actorId)
      const lead = await this.payload.findByID({ collection: 'leads', id: input.leadId, overrideAccess: false, req }) as StoredLead
      assertLeadTransition(lead.status, status)
      const data: Record<string, unknown> = { status }
      if (input.patch.owner !== undefined) {
        if (typeof input.patch.owner !== 'number') throw new Error('lead owner is invalid')
        await this.actor(req, input.patch.owner)
        data.owner = input.patch.owner
      }
      const updated = await this.payload.update({ collection: 'leads', id: input.leadId, data, overrideAccess: false, req }) as StoredLead
      await this.payload.create({
        collection: 'audit-events',
        data: {
          action: 'lead_transitioned',
          metadata: { actorId: input.actorId, from: lead.status, to: status },
          requestId: input.requestId,
          resourceId: String(input.leadId),
          resourceType: 'lead',
          result: 'success',
        },
        overrideAccess: false,
        req,
      })
      if (ownsTransaction) await commitTransaction(req)
      return updated
    } catch (error) {
      if (ownsTransaction) await killTransaction(req)
      throw error
    }
  }

  async createNote(input: { actorId: number; leadId: number; requestId: string; body: string; req?: PayloadRequest }): Promise<StoredNote> {
    if (input.body.trim().length < 1 || input.body.length > 4000) throw new Error('note body is invalid')
    const ownsTransaction = !input.req
    const transactionID = ownsTransaction ? await this.payload.db.beginTransaction() : null
    if (ownsTransaction && transactionID === null) throw new Error('database transaction is unavailable')
    const requestTransactionID = input.req ? await input.req.transactionID : transactionID
    if (requestTransactionID == null) throw new Error('database transaction is unavailable')
    const req = await this.request(requestTransactionID)

    try {
      this.assertSystemRequest(req)
      await this.actor(req, input.actorId)
      await this.payload.findByID({ collection: 'leads', id: input.leadId, overrideAccess: false, req })
      const note = await this.payload.create({ collection: 'lead-notes', data: { author: input.actorId, body: input.body.trim(), lead: input.leadId }, overrideAccess: false, req }) as StoredNote
      await this.payload.create({ collection: 'audit-events', data: { action: 'lead_note_created', metadata: { actorId: input.actorId }, requestId: input.requestId, resourceId: String(note.id), resourceType: 'lead_note', result: 'success' }, overrideAccess: false, req })
      if (ownsTransaction) await commitTransaction(req)
      return note
    } catch (error) {
      if (ownsTransaction) await killTransaction(req)
      throw error
    }
  }

  async updateNote(input: { actorId: number; noteId: number; requestId: string; patch: Record<string, unknown>; req?: PayloadRequest }): Promise<StoredNote> {
    onlyKeys(input.patch, ['body'])
    if (typeof input.patch.body !== 'string' || input.patch.body.trim().length < 1 || input.patch.body.length > 4000) throw new Error('note body is invalid')
    const ownsTransaction = !input.req
    const transactionID = ownsTransaction ? await this.payload.db.beginTransaction() : null
    if (ownsTransaction && transactionID === null) throw new Error('database transaction is unavailable')
    const requestTransactionID = input.req ? await input.req.transactionID : transactionID
    if (requestTransactionID == null) throw new Error('database transaction is unavailable')
    const req = await this.request(requestTransactionID)

    try {
      this.assertSystemRequest(req)
      await this.actor(req, input.actorId)
      await this.payload.findByID({ collection: 'lead-notes', id: input.noteId, overrideAccess: false, req })
      const note = await this.payload.update({ collection: 'lead-notes', id: input.noteId, data: { body: input.patch.body.trim() }, overrideAccess: false, req }) as StoredNote
      await this.payload.create({ collection: 'audit-events', data: { action: 'lead_note_updated', metadata: { actorId: input.actorId }, requestId: input.requestId, resourceId: String(note.id), resourceType: 'lead_note', result: 'success' }, overrideAccess: false, req })
      if (ownsTransaction) await commitTransaction(req)
      return note
    } catch (error) {
      if (ownsTransaction) await killTransaction(req)
      throw error
    }
  }
}
