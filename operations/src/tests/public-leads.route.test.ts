import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { POST } from '@/app/api/inquiries/route'
import { issueFormToken } from '@/lib/form-token'
import { resetRateLimitsForTests } from '@/lib/rate-limiter'
import { InMemoryIntakeRepository } from '@/services/in-memory-intake-repository'
import { setIntakeRepositoryForTests } from '@/services/service-provider'

const origin = 'http://localhost:3000'
const token = () => issueFormToken({ origin, secret: 'test-form-secret', now: Date.now() - 4000 })

function request(body: Record<string, unknown>, issued = token(), idempotencyKey = '4cd3f44d-fb48-45c1-a4fc-2e453909b677'): Request {
  return new Request(`${origin}/api/inquiries`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin,
      referer: `${origin}/contact`,
      cookie: `ovops_form_nonce=${issued.nonce}`,
      'x-ovops-test-client-ip': '198.51.100.10',
      'idempotency-key': idempotencyKey,
    },
    body: JSON.stringify({ contactName: 'Synthetic Contact', email: 'synthetic@example.test', message: 'This synthetic enquiry validates the public HTTP contract end to end.', consent: true, formToken: issued.token, website: '', ...body }),
  })
}

describe('POST /api/inquiries', () => {
  beforeEach(() => {
    process.env.OVOPS_RUNTIME_MODE = 'test'
    process.env.FORM_TOKEN_SECRET = 'test-form-secret'
    resetRateLimitsForTests()
    setIntakeRepositoryForTests(new InMemoryIntakeRepository())
  })

  afterEach(() => setIntakeRepositoryForTests(undefined))

  it('accepts a minimal synthetic submission and replays an idempotent retry', async () => {
    const first = await POST(request({}))
    const second = await POST(request({}))
    expect(first.status).toBe(202)
    expect(await second.json()).toEqual(await first.clone().json())
  })

  it('rejects a non-json body before any write seam', async () => {
    const response = await POST(new Request(`${origin}/api/inquiries`, { method: 'POST', headers: { 'content-type': 'text/plain', origin } }))
    expect(response.status).toBe(415)
    await expect(response.json()).resolves.toEqual({ error: { code: 'UNSUPPORTED_MEDIA_TYPE' } })
  })

  it('returns stable errors for consent, idempotency reuse, and rate limiting', async () => {
    const missingConsent = await POST(request({ consent: false }))
    expect(missingConsent.status).toBe(422)
    await expect(missingConsent.json()).resolves.toEqual({ error: { code: 'CONSENT_REQUIRED' } })

    const idempotencyKey = '7cd3f44d-fb48-45c1-a4fc-2e453909b677'
    const accepted = await POST(request({}, token(), idempotencyKey))
    expect(accepted.status).toBe(202)
    const reused = await POST(request({ email: 'other@example.test' }, token(), idempotencyKey))
    expect(reused.status).toBe(409)
    await expect(reused.json()).resolves.toEqual({ error: { code: 'IDEMPOTENCY_KEY_REUSED' } })

    const limited = await Promise.all(Array.from({ length: 5 }, (_, index) => POST(request({ email: `rate-${index}@example.test` }, token(), `8cd3f44d-fb48-45c1-a4fc-2e453909b67${index}`))))
    expect(limited.at(-1)?.status).toBe(429)
    await expect(limited.at(-1)?.json()).resolves.toEqual({ error: { code: 'RATE_LIMITED' } })
  })

  it('maps malformed, tampered, and expired tokens to the stable rejection contract', async () => {
    const malformed = await POST(request({ formToken: 'not-a-valid-token' }))
    expect(malformed.status).toBe(403)
    await expect(malformed.json()).resolves.toEqual({ error: { code: 'SUBMISSION_REJECTED' } })

    const issued = token()
    const tampered = await POST(request({ formToken: `${issued.token}x` }, issued))
    expect(tampered.status).toBe(403)
    await expect(tampered.json()).resolves.toEqual({ error: { code: 'SUBMISSION_REJECTED' } })

    const expired = issueFormToken({ origin, secret: 'test-form-secret', now: Date.now() - 11 * 60 * 1000 })
    const expiredResponse = await POST(request({}, expired))
    expect(expiredResponse.status).toBe(403)
    await expect(expiredResponse.json()).resolves.toEqual({ error: { code: 'SUBMISSION_REJECTED' } })
  })
})
