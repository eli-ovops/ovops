export const MAX_PUBLIC_LEAD_BODY_BYTES = 12 * 1024
export const CONSENT_VERSION = 'privacy-v1-draft'

export function isSyntheticRuntime(): boolean {
  return process.env.OVOPS_RUNTIME_MODE === 'test'
}

export function requireRuntimeSecret(name: 'FORM_TOKEN_SECRET' | 'PAYLOAD_SECRET'): string {
  const value = process.env[name]
  if (!value || value.includes('REPLACE_WITH')) {
    throw new Error(`${name} is required outside example configuration`)
  }
  return value
}

export function requirePayloadSecret(): string {
  const value = requireRuntimeSecret('PAYLOAD_SECRET')
  if (value.length < 32) throw new Error('PAYLOAD_SECRET must be at least 32 characters')
  return value
}
