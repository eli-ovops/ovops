import type { Payload } from 'payload'
import { commitTransaction, createLocalReq, killTransaction } from 'payload'

import type { PublicInquiryReceipt } from '@/contracts/public-inquiry'
import { PublicInquiryError, publicInquiryErrorCodes } from '@/lib/public-inquiry-error'
import type { IntakeCommand, IntakeRepository } from '@/services/lead-service'

type StoredIntake = IntakeCommand & { consentVersion: string; dedupeKey: string; receiptId: string }
type DocumentWithID = { id: number; dedupeKey?: string; receiptId?: string }
const publicInquiryCapability = Symbol('ovops.public-inquiry-capability')

export function isPublicInquiryRequest(request: unknown): boolean {
  if (!request || typeof request !== 'object') return false
  const context = (request as { context?: unknown }).context
  return Boolean(context && typeof context === 'object' && (context as Record<PropertyKey, unknown>)[publicInquiryCapability] === true)
}

async function createPublicInquiryRequest(payload: Payload, transactionID: number | string) {
  return createLocalReq({ context: { __ovopsInternalContext: true, [publicInquiryCapability]: true }, req: { transactionID } }, payload)
}

export class PayloadIntakeRepository implements IntakeRepository {
  constructor(private readonly payload: Payload) {}

  async createOrReplay(command: StoredIntake): Promise<PublicInquiryReceipt> {
    const transactionID = await this.payload.db.beginTransaction()
    if (transactionID === null) throw new Error('database transaction is unavailable')
    const req = await createPublicInquiryRequest(this.payload, transactionID)

    try {
      const existing = await this.payload.find({ collection: 'intake-requests', limit: 1, overrideAccess: false, req, where: { idempotencyKey: { equals: command.idempotencyKey } } })
      const prior = existing.docs[0] as DocumentWithID | undefined
      if (prior) {
        if (prior.dedupeKey !== command.dedupeKey) throw new PublicInquiryError(409, publicInquiryErrorCodes.idempotencyReused)
        await commitTransaction(req)
        return { receiptId: prior.receiptId ?? command.receiptId, status: 'accepted' }
      }

      const duplicate = await this.payload.find({ collection: 'leads', limit: 1, overrideAccess: false, req, where: { dedupeKey: { equals: command.dedupeKey } } })
      const priorLead = duplicate.docs[0] as DocumentWithID | undefined
      if (priorLead) {
        await this.payload.create({ collection: 'intake-requests', data: { dedupeKey: command.dedupeKey, idempotencyKey: command.idempotencyKey, lead: priorLead.id, receiptId: command.receiptId, requestId: command.requestId }, overrideAccess: false, req })
        await commitTransaction(req)
        return { receiptId: command.receiptId, status: 'accepted' }
      }

      const retentionExpiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      const lead = (await this.payload.create({
        collection: 'leads',
        data: {
          companyName: command.input.companyName,
          consentAt: new Date().toISOString(),
          consentVersion: command.consentVersion,
          contactName: command.input.contactName,
          dedupeKey: command.dedupeKey,
          email: command.input.email,
          message: command.input.message,
          notificationStatus: 'pending',
          retentionExpiresAt,
          sourceRoute: command.sourceRoute,
          status: 'new',
        },
        overrideAccess: false,
        req,
      })) as DocumentWithID
      await this.payload.create({ collection: 'intake-requests', data: { dedupeKey: command.dedupeKey, idempotencyKey: command.idempotencyKey, lead: lead.id, receiptId: command.receiptId, requestId: command.requestId }, overrideAccess: false, req })
      await this.payload.create({ collection: 'audit-events', data: { action: 'lead_created', metadata: { sourceRoute: command.sourceRoute }, requestId: command.requestId, resourceId: String(lead.id), resourceType: 'lead', result: 'success' }, overrideAccess: false, req })
      await commitTransaction(req)
      return { receiptId: command.receiptId, status: 'accepted' }
    } catch (error) {
      await killTransaction(req)
      throw error
    }
  }
}
