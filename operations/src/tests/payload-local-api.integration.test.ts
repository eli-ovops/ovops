import { afterEach, describe, expect, it } from 'vitest'
import { getPayload } from 'payload'
import { POST } from '@/app/api/inquiries/route'
import { issueFormToken } from '@/lib/form-token'
import { resetRateLimitsForTests } from '@/lib/rate-limiter'
import { publicInquiryService, setIntakeRepositoryForTests } from '@/services/service-provider'

const runAgainstIsolatedDatabase = Boolean(process.env.DATABASE_URI && process.env.OVOPS_RUNTIME_MODE === 'test')
const describeIntegration = runAgainstIsolatedDatabase ? describe : describe.skip
const origin = 'http://localhost:3000'

async function payloadConfig() {
  return (await import('@payload-config')).default
}

async function removeSyntheticIntake(email: string, idempotencyKey: string, requestId: string): Promise<void> {
  const payload = await getPayload({ config: await payloadConfig() })
  await payload.delete({ collection: 'audit-events', overrideAccess: true, where: { requestId: { equals: requestId } } })
  await payload.delete({ collection: 'intake-requests', overrideAccess: true, where: { idempotencyKey: { equals: idempotencyKey } } })
  await payload.delete({ collection: 'leads', overrideAccess: true, where: { email: { equals: email } } })
}

describeIntegration('Payload Local API + PostgreSQL intake integration', () => {
  afterEach(() => {
    setIntakeRepositoryForTests(undefined)
    resetRateLimitsForTests()
  })

  it('creates through the service transaction with system Local API access', async () => {
    const idempotencyKey = crypto.randomUUID()
    const requestId = crypto.randomUUID()
    const email = `service-${idempotencyKey}@example.test`
    const result = await (await publicInquiryService()).intake({
      clientIp: '198.51.100.200',
      idempotencyKey,
      requestId,
      sourceRoute: '/contact',
      input: { contactName: 'Service Synthetic', email, message: 'This is a synthetic service integration request for the isolated PostgreSQL test database.', consent: true, formToken: 'service-only', website: '' },
    })
    expect(result.status).toBe('accepted')
    await removeSyntheticIntake(email, idempotencyKey, requestId)
  }, 15_000)

  it('denies an anonymous Local API read outside the named system service', async () => {
    const payload = await getPayload({ config: await payloadConfig() })
    await expect(payload.find({ collection: 'leads', overrideAccess: false })).rejects.toThrow('not allowed')
  })

  it('persists nothing when public validation rejects the request', async () => {
    const payload = await getPayload({ config: await payloadConfig() })
    const before = await Promise.all([
      payload.count({ collection: 'leads', overrideAccess: true }),
      payload.count({ collection: 'intake-requests', overrideAccess: true }),
      payload.count({ collection: 'audit-events', overrideAccess: true }),
    ])
    const issued = issueFormToken({ origin, secret: process.env.FORM_TOKEN_SECRET!, now: Date.now() - 4000 })
    const rejected = await POST(new Request(`${origin}/api/inquiries`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin,
        referer: `${origin}/contact`,
        cookie: `ovops_form_nonce=${issued.nonce}`,
        'x-ovops-test-client-ip': '198.51.100.200',
        'idempotency-key': crypto.randomUUID(),
      },
      body: JSON.stringify({ contactName: 'Rejected Synthetic', email: 'rejected@example.test', message: 'This synthetic request must fail validation and leave no database records behind.', consent: false, formToken: issued.token, website: '' }),
    }))
    expect(rejected.status).toBe(422)
    await expect(rejected.json()).resolves.toEqual({ error: { code: 'CONSENT_REQUIRED' } })
    const after = await Promise.all([
      payload.count({ collection: 'leads', overrideAccess: true }),
      payload.count({ collection: 'intake-requests', overrideAccess: true }),
      payload.count({ collection: 'audit-events', overrideAccess: true }),
    ])
    expect(after).toEqual(before)
  })

  it('writes a synthetic Lead, idempotency record, and audit event through the public route', async () => {
    resetRateLimitsForTests()
    setIntakeRepositoryForTests(undefined)
    const issued = issueFormToken({ origin, secret: process.env.FORM_TOKEN_SECRET!, now: Date.now() - 4000 })
    const idempotencyKey = crypto.randomUUID()
    const requestId = crypto.randomUUID()
    const email = `integration-${idempotencyKey}@example.test`
    const request = new Request(`${origin}/api/inquiries`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin,
        referer: `${origin}/contact`,
        cookie: `ovops_form_nonce=${issued.nonce}`,
        'x-ovops-test-client-ip': '198.51.100.200',
        'idempotency-key': idempotencyKey,
        'x-request-id': requestId,
      },
      body: JSON.stringify({ contactName: 'Integration Synthetic', email, message: 'This is a synthetic integration request for the isolated PostgreSQL test database.', consent: true, formToken: issued.token, website: '' }),
    })

    const response = await POST(request)
    const responseBody = (await response.json()) as { receiptId?: string; error?: { code: string } }
    expect(response.status, JSON.stringify(responseBody)).toBe(202)
    const receipt = responseBody as { receiptId: string }
    const payload = await getPayload({ config: await payloadConfig() })
    const intakes = await payload.find({ collection: 'intake-requests', depth: 0, limit: 1, overrideAccess: true, where: { receiptId: { equals: receipt.receiptId } } })
    expect(intakes.totalDocs).toBe(1)
    const audit = await payload.find({ collection: 'audit-events', depth: 0, limit: 1, overrideAccess: true, where: { requestId: { equals: requestId } } })
    expect(audit.totalDocs).toBe(1)
    await removeSyntheticIntake(email, idempotencyKey, requestId)
  })
})
