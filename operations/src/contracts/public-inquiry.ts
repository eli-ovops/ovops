import { z } from 'zod'

const normalizedText = (minimum: number, maximum: number) =>
  z.string().trim().min(minimum).max(maximum)

export const PublicInquiryInputSchema = z
  .object({
    contactName: normalizedText(2, 80),
    email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
    message: normalizedText(20, 2000),
    companyName: normalizedText(2, 120).optional(),
    consent: z.literal(true),
    formToken: z.string().min(16).max(2048),
    website: z.string().max(120).optional().default(''),
  })
  .strict()

export type PublicInquiryInput = z.infer<typeof PublicInquiryInputSchema>

export const PublicInquiryReceiptSchema = z.object({
  receiptId: z.string().uuid(),
  status: z.literal('accepted'),
})

export type PublicInquiryReceipt = z.infer<typeof PublicInquiryReceiptSchema>
