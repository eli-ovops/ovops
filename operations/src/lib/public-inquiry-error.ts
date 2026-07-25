export const publicInquiryErrorCodes = {
  malformedBody: 'MALFORMED_BODY',
  bodyTooLarge: 'BODY_TOO_LARGE',
  unsupportedMediaType: 'UNSUPPORTED_MEDIA_TYPE',
  invalidInput: 'INVALID_INPUT',
  consentRequired: 'CONSENT_REQUIRED',
  idempotencyReused: 'IDEMPOTENCY_KEY_REUSED',
  rateLimited: 'RATE_LIMITED',
  submissionRejected: 'SUBMISSION_REJECTED',
  environmentBlocked: 'ENVIRONMENT_BLOCKED',
} as const

export type PublicInquiryErrorCode = (typeof publicInquiryErrorCodes)[keyof typeof publicInquiryErrorCodes]

export class PublicInquiryError extends Error {
  constructor(
    readonly status: number,
    readonly code: PublicInquiryErrorCode,
  ) {
    super(code)
  }
}
