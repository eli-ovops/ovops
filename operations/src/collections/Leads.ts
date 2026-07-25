import type { CollectionConfig } from 'payload'
import { superAdminOnly, systemIntakeOnly, systemWorkflowOnly, workflowReadOrOperator } from '@/access'

export const Leads: CollectionConfig = {
  slug: 'leads',
  access: { create: systemIntakeOnly, delete: superAdminOnly, read: workflowReadOrOperator, update: systemWorkflowOnly },
  fields: [
    { name: 'contactName', type: 'text', required: true, minLength: 2, maxLength: 80 },
    { name: 'email', type: 'email', required: true },
    { name: 'message', type: 'textarea', required: true, minLength: 20, maxLength: 2000 },
    { name: 'companyName', type: 'text', maxLength: 120 },
    { name: 'company', type: 'relationship', relationTo: 'companies' },
    { name: 'sourceRoute', type: 'text', required: true, maxLength: 120 },
    { name: 'consentVersion', type: 'text', required: true, maxLength: 64 },
    { name: 'consentAt', type: 'date', required: true },
    { name: 'status', type: 'select', required: true, defaultValue: 'new', options: ['new', 'triaged', 'contacted', 'qualified', 'closed_lost', 'closed_won', 'spam'] },
    { name: 'owner', type: 'relationship', relationTo: 'users' },
    { name: 'notificationStatus', type: 'select', required: true, defaultValue: 'pending', options: ['pending', 'sent', 'failed'] },
    { name: 'dedupeKey', type: 'text', required: true, unique: true, admin: { readOnly: true } },
    { name: 'retentionExpiresAt', type: 'date', required: true },
  ],
}
