import { spawn, type ChildProcess } from 'node:child_process'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { getPayload } from 'payload'

const runAgainstIsolatedDatabase = Boolean(process.env.DATABASE_URI && process.env.OVOPS_RUNTIME_MODE === 'test')
const describeIntegration = runAgainstIsolatedDatabase ? describe : describe.skip
const port = 3107
const origin = `http://localhost:${port}`
let server: ChildProcess | undefined

async function payloadConfig() {
  return (await import('@payload-config')).default
}

async function waitForServer(): Promise<void> {
  const deadline = Date.now() + 30_000
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${origin}/api/health`)
      if (response.ok) return
    } catch {
      // The child is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
  throw new Error('Next HTTP integration server did not become ready')
}

describeIntegration('canonical inquiry HTTP contract', () => {
  beforeAll(async () => {
    const nextCli = path.resolve(process.cwd(), 'node_modules/next/dist/bin/next')
    server = spawn(process.execPath, [nextCli, 'dev', '--hostname', '127.0.0.1', '--port', String(port)], {
      cwd: process.cwd(),
      env: process.env,
      stdio: 'ignore',
    })
    await waitForServer()
  }, 35_000)

  afterAll(async () => {
    server?.kill('SIGINT')
  })

  it('returns 202 through the real Next HTTP path with the paired token and cookie', async () => {
    const tokenResponse = await fetch(`${origin}/api/inquiries/form-token`)
    expect(tokenResponse.status).toBe(200)
    const { formToken } = await tokenResponse.json() as { formToken: string }
    const setCookie = tokenResponse.headers.get('set-cookie')
    expect(setCookie).toContain('ovops_form_nonce=')
    expect(setCookie).toContain('Path=/api/inquiries')
    const cookie = setCookie!.split(';', 1)[0]!
    await new Promise((resolve) => setTimeout(resolve, 3_100))
    const idempotencyKey = crypto.randomUUID()
    const email = `http-${idempotencyKey}@example.test`
    const requestBody = { contactName: 'HTTP Synthetic', consent: true, email, message: 'This synthetic request validates the real canonical Next HTTP inquiry contract.', website: '' }
    const requestHeaders = {
      'content-type': 'application/json',
      cookie,
      origin,
      referer: `${origin}/contact`,
      'x-ovops-test-client-ip': '198.51.100.91',
    }
    const badToken = await fetch(`${origin}/api/inquiries`, {
      method: 'POST',
      headers: { ...requestHeaders, 'idempotency-key': crypto.randomUUID() },
      body: JSON.stringify({ ...requestBody, formToken: `${formToken}x` }),
    })
    expect(badToken.status).toBe(403)
    await expect(badToken.json()).resolves.toEqual({ error: { code: 'SUBMISSION_REJECTED' } })

    const response = await fetch(`${origin}/api/inquiries`, {
      method: 'POST',
      headers: {
        'idempotency-key': idempotencyKey,
        ...requestHeaders,
      },
      body: JSON.stringify({ ...requestBody, formToken }),
    })
    const responseBody = await response.json() as { receiptId?: string; status?: string; error?: { code: string } }
    expect(response.status, JSON.stringify(responseBody)).toBe(202)
    const receipt = responseBody as { receiptId: string; status: string }
    expect(receipt.status).toBe('accepted')
    const payload = await getPayload({ config: await payloadConfig() })
    const intake = await payload.find({ collection: 'intake-requests', overrideAccess: true, where: { receiptId: { equals: receipt.receiptId } } })
    expect(intake.totalDocs).toBe(1)
    await payload.delete({ collection: 'audit-events', overrideAccess: true, where: { requestId: { equals: intake.docs[0]!.requestId } } })
    await payload.delete({ collection: 'intake-requests', overrideAccess: true, where: { receiptId: { equals: receipt.receiptId } } })
    await payload.delete({ collection: 'leads', overrideAccess: true, where: { email: { equals: email } } })
  }, 40_000)

  it('does not provide the retired /api/leads write contract', async () => {
    const response = await fetch(`${origin}/api/leads`, { method: 'POST' })
    expect(response.status).toBe(404)
  })
})
