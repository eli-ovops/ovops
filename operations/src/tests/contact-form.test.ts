// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ContactForm } from '@/app/contact/contact-form'

const validValues = {
  contactName: '测试联系人',
  email: 'contact@example.test',
  message: '这是一段用于本地测试的合成咨询内容，长度满足最小提交要求。',
}

function form(): ReturnType<typeof createElement> {
  return createElement(ContactForm)
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })
}

async function completeForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('联系人姓名'), validValues.contactName)
  await user.type(screen.getByLabelText('工作邮箱'), validValues.email)
  await user.type(screen.getByLabelText('想讨论的问题'), validValues.message)
  await user.click(screen.getByLabelText(/我已阅读并同意本地\/测试演示的数据处理说明/))
}

async function waitUntilSubmittable() {
  await waitFor(() => expect((screen.getByRole('button', { name: '提交咨询' }) as HTMLButtonElement).disabled).toBe(false), { timeout: 5_000 })
}

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('ContactForm public UX seam', () => {
  it('describes the Local/Test boundary and never solicits non-contract fields', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ formToken: 'a'.repeat(32) })))
    render(form())

    expect(await screen.findByText(/仅用于 Local\/Test 演示/)).toBeTruthy()
    expect(screen.queryByLabelText(/电话|附件|预算/)).toBeNull()
  })

  it('blocks an invalid submission before the public write seam', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ formToken: 'a'.repeat(32) }))
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    render(form())

    await screen.findByLabelText('联系人姓名')
    await waitUntilSubmittable()
    await user.click(screen.getByRole('button', { name: '提交咨询' }))

    expect(await screen.findByText('请填写联系人姓名')).toBeTruthy()
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('submits a frozen DTO once and reveals the accepted receipt', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse({ formToken: 'a'.repeat(32) }))
      .mockResolvedValueOnce(jsonResponse({ receiptId: '3f8e6118-52e2-4c4f-8a6d-448d3f798eee', status: 'accepted' }, 202))
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    render(form())

    await screen.findByLabelText('联系人姓名')
    await waitUntilSubmittable()
    await completeForm(user)
    await user.click(screen.getByRole('button', { name: '提交咨询' }))

    expect(await screen.findByText('咨询已收到', {}, { timeout: 5_000 })).toBeTruthy()
    expect(screen.getByText('3f8e6118-52e2-4c4f-8a6d-448d3f798eee')).toBeTruthy()
    expect(fetchMock.mock.calls[1]?.[0]).toBe('/api/inquiries')
    expect(fetchMock.mock.calls[1]?.[1]).toMatchObject({ method: 'POST' })
    const body = JSON.parse(String(fetchMock.mock.calls[1]?.[1]?.body))
    expect(body).toMatchObject({ ...validValues, consent: true, website: '' })
    expect(body).not.toHaveProperty('phone')
  })

  it('maps rate limiting and uncertain network outcomes without claiming success', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse({ formToken: 'a'.repeat(32) }))
      .mockResolvedValueOnce(jsonResponse({ error: { code: 'RATE_LIMITED' } }, 429))
    vi.stubGlobal('fetch', fetchMock)
    render(form())

    await screen.findByLabelText('联系人姓名')
    await waitUntilSubmittable()
    await completeForm(user)
    await user.click(screen.getByRole('button', { name: '提交咨询' }))
    expect(await screen.findByText(/提交频率过高/, {}, { timeout: 5_000 })).toBeTruthy()

    fetchMock.mockReset()
    fetchMock.mockResolvedValueOnce(jsonResponse({ formToken: 'b'.repeat(32) })).mockRejectedValueOnce(new TypeError('network unavailable'))
    cleanup()
    render(form())
    await waitFor(() => expect(screen.getByLabelText('联系人姓名')).toBeTruthy())
    await waitUntilSubmittable()
    await completeForm(user)
    await user.click(screen.getByRole('button', { name: '提交咨询' }))
    expect(await screen.findByText(/无法确认本次提交是否已送达/, {}, { timeout: 5_000 })).toBeTruthy()
    expect(screen.queryByText('咨询已收到')).toBeNull()
  }, 12_000)

  it('refreshes the form token after persisted history restoration and popstate', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse({ formToken: 'a'.repeat(32) }))
      .mockResolvedValueOnce(jsonResponse({ formToken: 'b'.repeat(32) }))
      .mockResolvedValueOnce(jsonResponse({ formToken: 'c'.repeat(32) }))
    vi.stubGlobal('fetch', fetchMock)
    render(form())

    await screen.findByLabelText('联系人姓名')
    await waitUntilSubmittable()

    const pageShow = new Event('pageshow')
    Object.defineProperty(pageShow, 'persisted', { value: true })
    window.dispatchEvent(pageShow)
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))
    await waitUntilSubmittable()

    window.dispatchEvent(new PopStateEvent('popstate'))
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3))
    await waitUntilSubmittable()
  }, 15_000)
})
