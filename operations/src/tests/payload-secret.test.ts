import { afterEach, describe, expect, it, vi } from 'vitest'

const original = process.env.PAYLOAD_SECRET

afterEach(() => {
  if (original === undefined) delete process.env.PAYLOAD_SECRET
  else process.env.PAYLOAD_SECRET = original
  vi.resetModules()
})

describe('PAYLOAD_SECRET configuration guard', () => {
  it.each([undefined, 'REPLACE_WITH_LOCAL_TEST_SECRET', 'too-short'])('fails closed for %s', async (value) => {
    if (value === undefined) delete process.env.PAYLOAD_SECRET
    else process.env.PAYLOAD_SECRET = value
    vi.resetModules()
    await expect(import('@/payload.config')).rejects.toThrow('PAYLOAD_SECRET')
  })

  it('accepts a test-injected high-entropy secret', async () => {
    process.env.PAYLOAD_SECRET = '0123456789abcdef0123456789abcdef'
    vi.resetModules()
    await expect(import('@/payload.config')).resolves.toBeDefined()
  })
})
