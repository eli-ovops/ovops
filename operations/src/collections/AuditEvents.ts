import type { CollectionConfig } from 'payload'
import { superAdminOnly, systemAuditOnly } from '@/access'

export const AuditEvents: CollectionConfig = {
  slug: 'audit-events',
  access: { create: systemAuditOnly, delete: () => false, read: superAdminOnly, update: () => false },
  fields: [
    { name: 'action', type: 'text', required: true },
    { name: 'resourceType', type: 'text', required: true },
    { name: 'resourceId', type: 'text', required: true },
    { name: 'requestId', type: 'text', required: true },
    { name: 'result', type: 'select', required: true, options: ['success', 'failure'] },
    { name: 'metadata', type: 'json' },
  ],
}
