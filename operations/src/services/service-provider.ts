import { requirePayloadSecret } from '@/lib/runtime'
import { LeadService, type IntakeRepository } from '@/services/lead-service'

let testRepository: IntakeRepository | undefined
export function setIntakeRepositoryForTests(repository: IntakeRepository | undefined): void { testRepository = repository }
export async function publicInquiryService(): Promise<LeadService> {
  if (testRepository) return new LeadService(testRepository, 'test-dedupe-secret')
  const { PayloadIntakeRepository } = await import('@/services/payload-intake-repository')
  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  return new LeadService(new PayloadIntakeRepository(await getPayload({ config })), requirePayloadSecret())
}
