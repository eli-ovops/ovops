import { describe, expect, it } from 'vitest'
import { PublicInquiryInputSchema } from '@/contracts/public-inquiry'
import { assertLeadTransition, LeadService } from '@/services/lead-service'

describe('public inquiry DTO contract', () => {
  it('normalizes the approved minimum synthetic request', () => {
    expect(
      PublicInquiryInputSchema.parse({
        contactName: '  Synthetic Contact  ',
        email: 'SYNTHETIC@EXAMPLE.TEST ',
        message: 'This synthetic enquiry validates the accepted public inquiry contract.',
        companyName: 'Synthetic Company',
        consent: true,
        formToken: 'test.token.signature',
        website: '',
      }),
    ).toMatchObject({
      contactName: 'Synthetic Contact',
      email: 'synthetic@example.test',
      consent: true,
    })
  })

  it('rejects unknown fields and non-consented requests', () => {
    expect(() =>
      PublicInquiryInputSchema.parse({
        contactName: 'Synthetic Contact',
        email: 'synthetic@example.test',
        message: 'This synthetic enquiry validates the accepted public inquiry contract.',
        consent: false,
        formToken: 'test.token.signature',
        website: '',
        phone: 'not-approved',
      }),
    ).toThrow()
  })

  it('allows only the frozen lead workflow transitions', () => {
    expect(() => assertLeadTransition('new', 'triaged')).not.toThrow()
    expect(() => assertLeadTransition('triaged', 'qualified')).not.toThrow()
    expect(() => assertLeadTransition('qualified', 'closed_won')).not.toThrow()
    expect(() => assertLeadTransition('closed_won', 'new')).toThrow()
    expect(() => assertLeadTransition('new', 'closed_won')).toThrow()
  })

  it('normalizes again in the service before creating its dedupe command', async () => {
    let captured: { input: { contactName: string; email: string; message: string } } | undefined
    const service = new LeadService({
      createOrReplay: async (command) => {
        captured = command
        return { receiptId: command.receiptId, status: 'accepted' }
      },
    }, 'unit-dedupe-secret')
    await service.intake({
      clientIp: '198.51.100.1',
      idempotencyKey: 'unit-idempotency',
      requestId: 'unit-request',
      sourceRoute: '/contact',
      input: { contactName: '  Synthetic Contact ', email: ' SYNTHETIC@EXAMPLE.TEST ', message: ' This synthetic service message is intentionally long enough. ', consent: true, formToken: 'test.token.signature', website: '' },
    })
    expect(captured?.input).toMatchObject({ contactName: 'Synthetic Contact', email: 'synthetic@example.test', message: 'This synthetic service message is intentionally long enough.' })
  })
})
