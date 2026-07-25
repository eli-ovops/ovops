import type { CollectionConfig } from 'payload'
import { superAdminOnly, systemUserSecurityOnly, workflowReadOrSuperAdmin } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: { create: superAdminOnly, delete: systemUserSecurityOnly, read: workflowReadOrSuperAdmin, update: systemUserSecurityOnly },
  fields: [
    { name: 'displayName', type: 'text', required: true, minLength: 2, maxLength: 80 },
    { name: 'role', type: 'select', required: true, defaultValue: 'ops_manager', options: [{ label: 'Super admin', value: 'super_admin' }, { label: 'Operations manager', value: 'ops_manager' }] },
    { name: 'status', type: 'select', required: true, defaultValue: 'invited', options: [{ label: 'Active', value: 'active' }, { label: 'Suspended', value: 'suspended' }, { label: 'Invited', value: 'invited' }] },
    { name: 'lastLoginAt', type: 'date', admin: { readOnly: true } },
  ],
}
