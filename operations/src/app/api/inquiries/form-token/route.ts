import { NextResponse } from 'next/server'
import { issueFormToken } from '@/lib/form-token'
import { PublicInquiryError, publicInquiryErrorCodes } from '@/lib/public-inquiry-error'
import { isSyntheticRuntime, requireRuntimeSecret } from '@/lib/runtime'

export const runtime = 'nodejs'

export async function GET(request: Request): Promise<NextResponse> {
  try {
    if (!isSyntheticRuntime()) throw new PublicInquiryError(503, publicInquiryErrorCodes.environmentBlocked)
    const origin = new URL(request.url).origin
    const issued = issueFormToken({ origin, secret: requireRuntimeSecret('FORM_TOKEN_SECRET') })
    const response = NextResponse.json({ formToken: issued.token, expiresAt: new Date(issued.exp).toISOString() })
    response.cookies.set('ovops_form_nonce', issued.nonce, { httpOnly: true, sameSite: 'strict', secure: false, path: '/api/inquiries', maxAge: 600 })
    return response
  } catch (error) {
    const known = error instanceof PublicInquiryError ? error : new PublicInquiryError(503, publicInquiryErrorCodes.environmentBlocked)
    return NextResponse.json({ error: { code: known.code } }, { status: known.status })
  }
}
