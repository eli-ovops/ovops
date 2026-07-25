import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { PublicInquiryInputSchema } from '@/contracts/public-inquiry'
import { verifyFormToken } from '@/lib/form-token'
import { PublicInquiryError, publicInquiryErrorCodes } from '@/lib/public-inquiry-error'
import { cookieValue, readBoundedJson, requestId, requestOrigin, sourceRoute, trustedClientIp } from '@/lib/public-request'
import { assertRateLimit } from '@/lib/rate-limiter'
import { requireRuntimeSecret } from '@/lib/runtime'
import { publicInquiryService } from '@/services/service-provider'

export const runtime = 'nodejs'

function failure(error: unknown): NextResponse {
  const known = error instanceof PublicInquiryError
    ? error
    : error instanceof ZodError
      ? new PublicInquiryError(422, error.issues.some((issue) => issue.path[0] === 'consent') ? publicInquiryErrorCodes.consentRequired : publicInquiryErrorCodes.invalidInput)
      : new PublicInquiryError(500, publicInquiryErrorCodes.submissionRejected)
  return NextResponse.json({ error: { code: known.code } }, { status: known.status })
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Type and both declared/actual byte bounds are enforced before any trust or write path.
    const rawBody = await readBoundedJson(request)
    const origin = requestOrigin(request)
    const clientIp = trustedClientIp(request)
    assertRateLimit(`ip:${clientIp}`, 5, 10 * 60 * 1000)
    const body = PublicInquiryInputSchema.parse(rawBody)
    if (body.website) throw new PublicInquiryError(403, publicInquiryErrorCodes.submissionRejected)
    let claims: ReturnType<typeof verifyFormToken>
    try {
      claims = verifyFormToken({ token: body.formToken, origin, secret: requireRuntimeSecret('FORM_TOKEN_SECRET') })
    } catch {
      // Token parsing and signature failures are an expected anonymous-input
      // boundary, never an internal error or a source of parser details.
      throw new PublicInquiryError(403, publicInquiryErrorCodes.submissionRejected)
    }
    if (cookieValue(request, 'ovops_form_nonce') !== claims.nonce || Date.now() - claims.iat < 3000) throw new PublicInquiryError(403, publicInquiryErrorCodes.submissionRejected)
    const idempotencyKey = request.headers.get('idempotency-key')
    if (!idempotencyKey || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idempotencyKey)) throw new PublicInquiryError(422, publicInquiryErrorCodes.invalidInput)
    const receipt = await (await publicInquiryService()).intake({ clientIp, idempotencyKey, requestId: requestId(request), sourceRoute: sourceRoute(request, origin), input: body })
    return NextResponse.json(receipt, { status: 202 })
  } catch (error) {
    return failure(error)
  }
}
