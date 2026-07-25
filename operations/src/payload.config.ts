import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { AuditEvents } from '@/collections/AuditEvents'
import { Companies } from '@/collections/Companies'
import { IntakeRequests } from '@/collections/IntakeRequests'
import { LeadNotes } from '@/collections/LeadNotes'
import { Leads } from '@/collections/Leads'
import { Users } from '@/collections/Users'
import { requirePayloadSecret } from '@/lib/runtime'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) } },
  collections: [Users, Companies, Leads, LeadNotes, IntakeRequests, AuditEvents],
  db: postgresAdapter({ migrationDir: path.resolve(dirname, 'migrations'), pool: { connectionString: process.env.DATABASE_URI ?? '' }, push: false }),
  secret: requirePayloadSecret(),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
