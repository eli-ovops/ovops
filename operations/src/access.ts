import type { Access } from 'payload'
import { isLeadWorkflowRequest } from '@/services/lead-workflow-service'
import { isPublicInquiryRequest } from '@/services/payload-intake-repository'
import { isUserSecurityRequest } from '@/services/user-security-service'

type ActiveUser = { role?: 'super_admin' | 'ops_manager'; status?: 'active' }

function activeUser(user: unknown): ActiveUser | undefined {
  const candidate = user as ActiveUser | null | undefined
  return candidate?.status === 'active' ? candidate : undefined
}

export const superAdminOnly: Access = ({ req }) => activeUser(req.user)?.role === 'super_admin'
export const activeOperator: Access = ({ req }) => {
  const user = activeUser(req.user)
  return user?.role === 'super_admin' || user?.role === 'ops_manager'
}
export const systemIntakeOnly: Access = ({ req }) => isPublicInquiryRequest(req)
export const systemWorkflowOnly: Access = ({ req }) => isLeadWorkflowRequest(req)
export const systemUserSecurityOnly: Access = ({ req }) => isUserSecurityRequest(req)
export const systemAuditOnly: Access = ({ req }) => (
  isPublicInquiryRequest(req)
  || isLeadWorkflowRequest(req)
  || isUserSecurityRequest(req)
)
export const intakeReadOrOperator: Access = ({ req }) => systemIntakeOnly({ req }) || activeOperator({ req })
export const intakeReadOrSuperAdmin: Access = ({ req }) => systemIntakeOnly({ req }) || superAdminOnly({ req })
export const workflowReadOrOperator: Access = ({ req }) => systemIntakeOnly({ req }) || systemWorkflowOnly({ req }) || activeOperator({ req })
export const workflowReadOrSuperAdmin: Access = ({ req }) => systemWorkflowOnly({ req }) || systemUserSecurityOnly({ req }) || superAdminOnly({ req })
