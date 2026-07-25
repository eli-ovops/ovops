import type { Payload, PayloadRequest } from 'payload'
import { commitTransaction, createLocalReq, killTransaction } from 'payload'

type ActiveSuperAdmin = { id: number; role: 'super_admin'; status: 'active' }
type UserStatus = 'active' | 'invited' | 'suspended'
const userSecurityCapability = Symbol('ovops.user-security-capability')

export function isUserSecurityRequest(request: unknown): boolean {
  if (!request || typeof request !== 'object') return false
  const context = (request as { context?: unknown }).context
  return Boolean(context && typeof context === 'object' && (context as Record<PropertyKey, unknown>)[userSecurityCapability] === true)
}

async function createUserSecurityRequest(payload: Payload, transactionID: number | string): Promise<PayloadRequest> {
  return createLocalReq({ context: { __ovopsInternalContext: true, [userSecurityCapability]: true }, req: { transactionID } }, payload)
}

function asActiveSuperAdmin(user: unknown): ActiveSuperAdmin {
  const candidate = user as Partial<ActiveSuperAdmin> | undefined
  if (!candidate || typeof candidate.id !== 'number' || candidate.role !== 'super_admin' || candidate.status !== 'active') throw new Error('persisted active super_admin is required')
  return candidate as ActiveSuperAdmin
}

function asUserStatus(value: unknown): UserStatus {
  if (value !== 'active' && value !== 'invited' && value !== 'suspended') throw new Error('user status is invalid')
  return value
}

export class UserSecurityService {
  constructor(private readonly payload: Payload) {}

  private async request(transactionID: number | string): Promise<PayloadRequest> {
    return createUserSecurityRequest(this.payload, transactionID)
  }

  private async actor(req: PayloadRequest, actorId: number): Promise<ActiveSuperAdmin> {
    return asActiveSuperAdmin(await this.payload.findByID({ collection: 'users', id: actorId, overrideAccess: false, req }))
  }

  private assertSystemRequest(req: PayloadRequest): void {
    if (!isUserSecurityRequest(req)) throw new Error('user security system request is required')
  }

  async changeStatus(input: { actorId: number; userId: number; requestId: string; patch: Record<string, unknown>; req?: PayloadRequest }): Promise<void> {
    if (Object.keys(input.patch).length !== 1 || !Object.hasOwn(input.patch, 'status')) throw new Error('only status may be changed')
    const status = asUserStatus(input.patch.status)
    const ownsTransaction = !input.req
    const transactionID = ownsTransaction ? await this.payload.db.beginTransaction() : null
    if (ownsTransaction && transactionID === null) throw new Error('database transaction is unavailable')
    const requestTransactionID = input.req ? await input.req.transactionID : transactionID
    if (requestTransactionID == null) throw new Error('database transaction is unavailable')
    const req = await this.request(requestTransactionID)
    try {
      this.assertSystemRequest(req)
      await this.actor(req, input.actorId)
      await this.payload.update({ collection: 'users', id: input.userId, data: { status }, overrideAccess: false, req })
      await this.payload.create({ collection: 'audit-events', data: { action: 'user_status_changed', metadata: { actorId: input.actorId, status }, requestId: input.requestId, resourceId: String(input.userId), resourceType: 'user', result: 'success' }, overrideAccess: false, req })
      if (ownsTransaction) await commitTransaction(req)
    } catch (error) {
      if (ownsTransaction) await killTransaction(req)
      throw error
    }
  }

  async deleteUser(input: { actorId: number; userId: number; requestId: string; req?: PayloadRequest }): Promise<void> {
    const ownsTransaction = !input.req
    const transactionID = ownsTransaction ? await this.payload.db.beginTransaction() : null
    if (ownsTransaction && transactionID === null) throw new Error('database transaction is unavailable')
    const requestTransactionID = input.req ? await input.req.transactionID : transactionID
    if (requestTransactionID == null) throw new Error('database transaction is unavailable')
    const req = await this.request(requestTransactionID)
    try {
      this.assertSystemRequest(req)
      await this.actor(req, input.actorId)
      await this.payload.delete({ collection: 'users', id: input.userId, overrideAccess: false, req })
      await this.payload.create({ collection: 'audit-events', data: { action: 'user_deleted', metadata: { actorId: input.actorId }, requestId: input.requestId, resourceId: String(input.userId), resourceType: 'user', result: 'success' }, overrideAccess: false, req })
      if (ownsTransaction) await commitTransaction(req)
    } catch (error) {
      if (ownsTransaction) await killTransaction(req)
      throw error
    }
  }
}
