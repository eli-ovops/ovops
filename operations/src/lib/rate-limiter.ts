import { PublicInquiryError, publicInquiryErrorCodes } from '@/lib/public-inquiry-error'

/**
 * L1 boundary only: this process-local limiter is suitable for isolated local
 * and test execution. It is not a shared, multi-instance, or production rate
 * limiter; unknown runtime modes remain rejected before this seam is reached.
 */
export const rateLimiterBoundary = 'L1 process-local, single-instance test/local only; not production-ready'

const buckets = new Map<string, number[]>()
export function assertRateLimit(key: string, limit: number, windowMs: number, now = Date.now()): void {
  const recent = (buckets.get(key) ?? []).filter((time) => time > now - windowMs)
  if (recent.length >= limit) throw new PublicInquiryError(429, publicInquiryErrorCodes.rateLimited)
  recent.push(now)
  buckets.set(key, recent)
}
export function resetRateLimitsForTests(): void { buckets.clear() }
