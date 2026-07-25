import { createHmac, randomUUID } from 'node:crypto'

import type { PublicInquiryInput, PublicInquiryReceipt } from '@/contracts/public-inquiry'
import { CONSENT_VERSION } from '@/lib/runtime'

export const leadStatuses = ['new', 'triaged', 'contacted', 'qualified', 'closed_lost', 'closed_won', 'spam'] as const
export type LeadStatus = (typeof leadStatuses)[number]

const allowedLeadTransitions: Record<LeadStatus, readonly LeadStatus[]> = {
  new: ['triaged', 'spam'],
  triaged: ['contacted', 'qualified', 'closed_lost', 'spam'],
  contacted: ['qualified', 'closed_lost', 'spam'],
  qualified: ['closed_won', 'closed_lost'],
  closed_lost: [],
  closed_won: [],
  spam: [],
}

export function assertLeadTransition(from: LeadStatus, to: LeadStatus): void {
  if (!allowedLeadTransitions[from].includes(to)) throw new Error(`Lead transition ${from} -> ${to} is not permitted`)
}

export type IntakeCommand = {
  clientIp: string
  idempotencyKey: string
  requestId: string
  sourceRoute: string
  input: PublicInquiryInput
}

export type IntakeRepository = {
  createOrReplay(command: IntakeCommand & { consentVersion: string; dedupeKey: string; receiptId: string }): Promise<PublicInquiryReceipt>
}

export class LeadService {
  constructor(private readonly repository: IntakeRepository, private readonly dedupeSecret: string) {}

  async intake(command: IntakeCommand): Promise<PublicInquiryReceipt> {
    const input: PublicInquiryInput = {
      ...command.input,
      contactName: command.input.contactName.trim(),
      companyName: command.input.companyName?.trim(),
      email: command.input.email.trim().toLowerCase(),
      message: command.input.message.trim(),
    }
    const dedupeKey = createHmac('sha256', this.dedupeSecret)
      .update(`${input.email}\u0000${input.message}`)
      .digest('hex')
    return this.repository.createOrReplay({ ...command, consentVersion: CONSENT_VERSION, dedupeKey, input, receiptId: randomUUID() })
  }
}
