import { randomUUID } from 'node:crypto'
import { PublicInquiryError, publicInquiryErrorCodes } from '@/lib/public-inquiry-error'
import { isSyntheticRuntime, MAX_PUBLIC_LEAD_BODY_BYTES } from '@/lib/runtime'

export async function readBoundedJson(request: Request): Promise<unknown> {
  const contentType = request.headers.get('content-type') ?? ''
  if (!/^application\/json(?:\s*;\s*charset=utf-8)?$/i.test(contentType)) throw new PublicInquiryError(415, publicInquiryErrorCodes.unsupportedMediaType)
  const declared = request.headers.get('content-length')
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > MAX_PUBLIC_LEAD_BODY_BYTES)) throw new PublicInquiryError(413, publicInquiryErrorCodes.bodyTooLarge)
  const reader = request.body?.getReader()
  if (!reader) throw new PublicInquiryError(400, publicInquiryErrorCodes.malformedBody)
  const chunks: Uint8Array[] = []
  let size = 0
  while (true) {
    const next = await reader.read()
    if (next.done) break
    size += next.value.byteLength
    if (size > MAX_PUBLIC_LEAD_BODY_BYTES) throw new PublicInquiryError(413, publicInquiryErrorCodes.bodyTooLarge)
    chunks.push(next.value)
  }
  try { return JSON.parse(new TextDecoder().decode(Buffer.concat(chunks))) } catch { throw new PublicInquiryError(400, publicInquiryErrorCodes.malformedBody) }
}

export function requestOrigin(request: Request): string {
  const origin = request.headers.get('origin')
  const expected = new URL(request.url).origin
  if (!origin || origin !== expected) throw new PublicInquiryError(403, publicInquiryErrorCodes.submissionRejected)
  return origin
}

export function trustedClientIp(request: Request): string {
  if (!isSyntheticRuntime()) throw new PublicInquiryError(503, publicInquiryErrorCodes.environmentBlocked)
  const ip = request.headers.get('x-ovops-test-client-ip')
  if (!ip) throw new PublicInquiryError(503, publicInquiryErrorCodes.environmentBlocked)
  return ip
}

export function requestId(request: Request): string { return request.headers.get('x-request-id') ?? randomUUID() }

export function sourceRoute(request: Request, origin: string): string {
  const referer = request.headers.get('referer')
  if (!referer) throw new PublicInquiryError(403, publicInquiryErrorCodes.submissionRejected)
  let url: URL
  try { url = new URL(referer) } catch { throw new PublicInquiryError(403, publicInquiryErrorCodes.submissionRejected) }
  if (url.origin !== origin || url.pathname !== '/contact') throw new PublicInquiryError(403, publicInquiryErrorCodes.submissionRejected)
  return url.pathname
}

export function cookieValue(request: Request, name: string): string | undefined {
  return request.headers.get('cookie')?.split(';').map((item) => item.trim().split('=')).find(([key]) => key === name)?.[1]
}
