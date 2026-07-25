import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'

export type FormTokenClaims = {
  exp: number
  iat: number
  nonce: string
  origin: string
}

function encode(value: string): string {
  return Buffer.from(value).toString('base64url')
}

function decode(value: string): string {
  return Buffer.from(value, 'base64url').toString('utf8')
}

function signature(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

export function issueFormToken({ origin, secret, now = Date.now() }: { origin: string; secret: string; now?: number }): FormTokenClaims & { token: string } {
  const claims: FormTokenClaims = {
    exp: now + 10 * 60 * 1000,
    iat: now,
    nonce: randomUUID(),
    origin,
  }
  const payload = encode(JSON.stringify(claims))
  return { ...claims, token: `${payload}.${signature(payload, secret)}` }
}

export function verifyFormToken({ token, origin, secret, now = Date.now() }: { token: string; origin: string; secret: string; now?: number }): FormTokenClaims {
  const [payload, suppliedSignature, extra] = token.split('.')
  if (!payload || !suppliedSignature || extra) throw new Error('invalid token shape')
  const expectedSignature = signature(payload, secret)
  if (!timingSafeEqual(Buffer.from(suppliedSignature), Buffer.from(expectedSignature))) throw new Error('invalid token signature')
  const claims = JSON.parse(decode(payload)) as FormTokenClaims
  if (claims.origin !== origin || claims.exp < now || claims.iat > now) throw new Error('expired or mismatched token')
  return claims
}
