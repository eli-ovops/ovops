import type { CollectionConfig } from 'payload'
import { intakeReadOrSuperAdmin, systemIntakeOnly } from '@/access'

export const IntakeRequests: CollectionConfig = {
  slug: 'intake-requests',
  access: { create: systemIntakeOnly, delete: () => false, read: intakeReadOrSuperAdmin, update: () => false },
  fields: [
    { name: 'idempotencyKey', type: 'text', required: true, unique: true },
    { name: 'dedupeKey', type: 'text', required: true },
    { name: 'receiptId', type: 'text', required: true, unique: true },
    { name: 'lead', type: 'relationship', relationTo: 'leads', required: true },
    { name: 'requestId', type: 'text', required: true },
  ],
}
