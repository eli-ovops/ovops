import type { CollectionConfig } from 'payload'
import { superAdminOnly, systemWorkflowOnly, workflowReadOrOperator } from '@/access'

export const LeadNotes: CollectionConfig = {
  slug: 'lead-notes',
  access: { create: systemWorkflowOnly, delete: superAdminOnly, read: workflowReadOrOperator, update: systemWorkflowOnly },
  fields: [
    { name: 'lead', type: 'relationship', relationTo: 'leads', required: true },
    { name: 'author', type: 'relationship', relationTo: 'users', required: true },
    { name: 'body', type: 'textarea', required: true, minLength: 1, maxLength: 4000 },
  ],
}
