import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'

type VerifierModule = Record<string, unknown>

const issuerName = /^(create|issue|runWith).*(Capability|Operation|Request)$/i

describe('internal capability boundary', () => {
  it('does not keep a generic capability issuer module', async () => {
    const source = await readFile(new URL('../lib/internal-operation.ts', import.meta.url), 'utf8').catch(() => '')
    expect(source).not.toMatch(/export\s+(?:async\s+)?function\s+(?:create|issue|runWith).*?(?:Capability|Operation|Request)/)
  })

  it('exposes only read-only verifiers from named service modules', async () => {
    const modules: Array<[VerifierModule, string]> = [
      [await import('@/services/payload-intake-repository'), 'isPublicInquiryRequest'],
      [await import('@/services/lead-workflow-service'), 'isLeadWorkflowRequest'],
      [await import('@/services/user-security-service'), 'isUserSecurityRequest'],
    ]

    for (const [module, verifierName] of modules) {
      expect(Object.keys(module).filter((name) => issuerName.test(name))).toEqual([])
      expect(module[verifierName]).toBeTypeOf('function')
      const verifier = module[verifierName] as (request: unknown) => boolean
      expect(verifier({ context: { systemOperation: 'lead-workflow', [Symbol('forged')]: true } })).toBe(false)
    }
  })
})
