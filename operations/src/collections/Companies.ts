import type { CollectionConfig } from 'payload'
import { activeOperator, superAdminOnly } from '@/access'

export const Companies: CollectionConfig = {
  slug: 'companies',
  access: { create: activeOperator, delete: superAdminOnly, read: activeOperator, update: activeOperator },
  fields: [
    { name: 'legalName', type: 'text', required: true, minLength: 2, maxLength: 160 },
    { name: 'displayName', type: 'text', maxLength: 160 },
    { name: 'website', type: 'text', maxLength: 2048 },
    { name: 'industry', type: 'text', maxLength: 120 },
    { name: 'status', type: 'select', required: true, defaultValue: 'prospect', options: ['prospect', 'active', 'archived'] },
  ],
}
