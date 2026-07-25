import type { PublicInquiryReceipt } from '@/contracts/public-inquiry'
import { PublicInquiryError, publicInquiryErrorCodes } from '@/lib/public-inquiry-error'
import type { IntakeCommand, IntakeRepository } from '@/services/lead-service'

type StoredIntake = IntakeCommand & { consentVersion: string; dedupeKey: string; receiptId: string }

export class InMemoryIntakeRepository implements IntakeRepository {
  private readonly byIdempotencyKey = new Map<string, StoredIntake>()
  private readonly byDedupeKey = new Map<string, StoredIntake>()

  async createOrReplay(command: StoredIntake): Promise<PublicInquiryReceipt> {
    const idempotent = this.byIdempotencyKey.get(command.idempotencyKey)
    if (idempotent) {
      if (idempotent.dedupeKey !== command.dedupeKey) throw new PublicInquiryError(409, publicInquiryErrorCodes.idempotencyReused)
      return { receiptId: idempotent.receiptId, status: 'accepted' }
    }
    const deduped = this.byDedupeKey.get(command.dedupeKey)
    if (deduped) {
      this.byIdempotencyKey.set(command.idempotencyKey, deduped)
      return { receiptId: deduped.receiptId, status: 'accepted' }
    }
    this.byIdempotencyKey.set(command.idempotencyKey, command)
    this.byDedupeKey.set(command.dedupeKey, command)
    return { receiptId: command.receiptId, status: 'accepted' }
  }
}
