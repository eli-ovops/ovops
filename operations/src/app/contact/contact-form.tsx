'use client'

import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { type FieldErrors, type Resolver, useForm, useWatch } from 'react-hook-form'

import { PublicInquiryInputSchema, PublicInquiryReceiptSchema, type PublicInquiryInput, type PublicInquiryReceipt } from '@/contracts/public-inquiry'
import type { PublicInquiryErrorCode } from '@/lib/public-inquiry-error'

import styles from './contact.module.css'

const ContactFormSchema = PublicInquiryInputSchema.omit({ formToken: true, website: true })
type ContactFormValues = Omit<PublicInquiryInput, 'formToken' | 'website' | 'consent'> & { consent: boolean }

type TokenResponse = { formToken: string; expiresAt?: string }
type SubmissionState = 'idle' | 'token-loading' | 'ready' | 'submitting' | 'success' | 'error'

// The frozen runtime still uses Zod v3, while the approved resolver package
// targets Zod v4. Keep RHF + the exported frozen Zod schema as the client
// seam without adding a second, drifting validation schema.
const contactFormResolver: Resolver<ContactFormValues> = async (values) => {
  const parsed = ContactFormSchema.safeParse({ ...values, companyName: values.companyName?.trim() || undefined })
  if (parsed.success) return { values: parsed.data as ContactFormValues, errors: {} }
  const errors: FieldErrors<ContactFormValues> = {}
  for (const issue of parsed.error.issues) {
    const field = issue.path[0] as keyof ContactFormValues | undefined
    if (field && !errors[field]) errors[field] = { type: 'zod', message: issue.message }
  }
  return { values: {}, errors }
}

const errorMessages: Record<PublicInquiryErrorCode, string> = {
  MALFORMED_BODY: '提交内容无法识别，请检查后重试。',
  BODY_TOO_LARGE: '提交内容过长，请缩短后重试。',
  UNSUPPORTED_MEDIA_TYPE: '提交格式不受支持，请刷新页面后重试。',
  INVALID_INPUT: '请检查标记字段后再次提交。',
  CONSENT_REQUIRED: '需要勾选本地/测试演示的数据处理说明。',
  IDEMPOTENCY_KEY_REUSED: '提交内容已变更，请重新确认后提交。',
  RATE_LIMITED: '提交频率过高，请稍后再试。',
  SUBMISSION_REJECTED: '本次提交未被接受，请刷新页面并使用合成测试信息重试。',
  ENVIRONMENT_BLOCKED: '当前环境未开放提交演示。',
}

function createIdempotencyKey(): string {
  return crypto.randomUUID()
}

function payloadFingerprint(values: ContactFormValues): string {
  return JSON.stringify({
    contactName: values.contactName.trim(),
    companyName: values.companyName?.trim() || undefined,
    email: values.email.trim().toLowerCase(),
    message: values.message.trim(),
    consent: values.consent,
  })
}

function responseCode(body: unknown): PublicInquiryErrorCode | undefined {
  if (!body || typeof body !== 'object' || !('error' in body)) return undefined
  const error = (body as { error?: { code?: unknown } }).error
  return typeof error?.code === 'string' && error.code in errorMessages ? error.code as PublicInquiryErrorCode : undefined
}

export function ContactForm() {
  const [formToken, setFormToken] = useState<string>()
  const [state, setState] = useState<SubmissionState>('token-loading')
  const [globalError, setGlobalError] = useState<string>()
  const [receipt, setReceipt] = useState<PublicInquiryReceipt>()
  const idempotencyKey = useRef<string | undefined>(undefined)
  const submittedFingerprint = useRef<string | undefined>(undefined)
  const abortController = useRef<AbortController | undefined>(undefined)
  const tokenReadyTimer = useRef<number | undefined>(undefined)

  const form = useForm<ContactFormValues>({
    resolver: contactFormResolver,
    defaultValues: { contactName: '', companyName: '', email: '', message: '', consent: false },
    mode: 'onBlur',
  })
  const message = useWatch({ control: form.control, name: 'message' }) ?? ''
  const charsRemaining = 2000 - message.length
  const canSubmit = state === 'ready' && !form.formState.isSubmitting
  const stateMessage = useMemo(() => {
    if (state === 'token-loading') return '正在准备本地测试表单…'
    if (state === 'submitting') return '正在提交，请勿重复操作。'
    return undefined
  }, [state])

  async function requestToken() {
    abortController.current?.abort()
    if (tokenReadyTimer.current) window.clearTimeout(tokenReadyTimer.current)
    setState('token-loading')
    setGlobalError(undefined)
    try {
      const response = await fetch('/api/inquiries/form-token', { credentials: 'same-origin', headers: { accept: 'application/json' } })
      const body = await response.json().catch(() => undefined)
      if (!response.ok || !body || typeof body.formToken !== 'string') throw new Error(responseCode(body) ?? 'ENVIRONMENT_BLOCKED')
      setFormToken((body as TokenResponse).formToken)
      // The server rejects submissions made within three seconds of token
      // issuance. Keep the control disabled until that same minimum is met.
      tokenReadyTimer.current = window.setTimeout(() => setState('ready'), 3000)
    } catch (error) {
      const code = error instanceof Error && error.message in errorMessages ? error.message as PublicInquiryErrorCode : 'ENVIRONMENT_BLOCKED'
      setGlobalError(errorMessages[code])
      setState('error')
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => { void requestToken() }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const refreshAfterHistoryRestore = () => { void requestToken() }

    window.addEventListener('pageshow', refreshAfterHistoryRestore)
    window.addEventListener('popstate', refreshAfterHistoryRestore)
    return () => {
      window.removeEventListener('pageshow', refreshAfterHistoryRestore)
      window.removeEventListener('popstate', refreshAfterHistoryRestore)
    }
  }, [])

  useEffect(() => () => {
    abortController.current?.abort()
    if (tokenReadyTimer.current) window.clearTimeout(tokenReadyTimer.current)
  }, [])

  async function submit(values: ContactFormValues) {
    if (!formToken || state !== 'ready') {
      setGlobalError(errorMessages.ENVIRONMENT_BLOCKED)
      setState('error')
      return
    }
    const fingerprint = payloadFingerprint(values)
    if (submittedFingerprint.current !== fingerprint) {
      idempotencyKey.current = createIdempotencyKey()
      submittedFingerprint.current = fingerprint
    }
    setState('submitting')
    setGlobalError(undefined)
    const controller = new AbortController()
    abortController.current = controller
    const timeout = window.setTimeout(() => controller.abort(), 15_000)
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        credentials: 'same-origin',
        signal: controller.signal,
        headers: { 'content-type': 'application/json', 'idempotency-key': idempotencyKey.current! },
        body: JSON.stringify({ ...values, formToken, website: '' }),
      })
      const body = await response.json().catch(() => undefined)
      if (response.status === 202) {
        const parsed = PublicInquiryReceiptSchema.safeParse(body)
        if (parsed.success) {
          setReceipt(parsed.data)
          setState('success')
          return
        }
      }
      const code = responseCode(body) ?? 'SUBMISSION_REJECTED'
      setGlobalError(errorMessages[code])
      setState('error')
    } catch {
      setGlobalError('无法确认本次提交是否已送达。请不要修改内容；可使用原内容再次提交以安全重试。')
      setState('error')
    } finally {
      window.clearTimeout(timeout)
    }
  }

  function startNewInquiry() {
    form.reset()
    setReceipt(undefined)
    idempotencyKey.current = undefined
    submittedFingerprint.current = undefined
    void requestToken()
  }

  function handleInvalid(errors: FieldErrors<ContactFormValues>) {
    const first = Object.keys(errors)[0] as keyof ContactFormValues | undefined
    if (first) form.setFocus(first)
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    void form.handleSubmit(submit, handleInvalid)(event)
  }

  if (state === 'success' && receipt) {
    return (
      <section className={styles.formCard} aria-labelledby="receipt-title" aria-live="polite">
        <p className={styles.eyebrow}>LOCAL / TEST RECEIPT</p>
        <h2 id="receipt-title">咨询已收到</h2>
        <p>这是本地/测试演示回执，并不代表生产渠道、通知或真实客户记录已启用。</p>
        <p className={styles.receipt}><span>回执编号</span><code>{receipt.receiptId}</code></p>
        <button className={styles.secondaryButton} type="button" onClick={startNewInquiry}>新建咨询</button>
      </section>
    )
  }

  return (
    <form className={styles.formCard} noValidate onSubmit={handleFormSubmit}>
      <div className={styles.field}>
        <label htmlFor="contactName">联系人姓名</label>
        <input id="contactName" autoComplete="name" aria-describedby="contactName-help contactName-error" {...form.register('contactName')} />
        <small id="contactName-help">2–80 个字符</small>
        {form.formState.errors.contactName && <p id="contactName-error" className={styles.fieldError}>{form.formState.errors.contactName.message === 'String must contain at least 2 character(s)' ? '请填写联系人姓名' : form.formState.errors.contactName.message}</p>}
      </div>
      <div className={styles.field}>
        <label htmlFor="companyName">公司名称 <span>（可选）</span></label>
        <input id="companyName" autoComplete="organization" aria-describedby="companyName-help companyName-error" {...form.register('companyName')} />
        <small id="companyName-help">如填写，请使用 2–120 个字符。</small>
        {form.formState.errors.companyName && <p id="companyName-error" className={styles.fieldError}>{form.formState.errors.companyName.message}</p>}
      </div>
      <div className={styles.field}>
        <label htmlFor="email">工作邮箱</label>
        <input id="email" type="email" autoComplete="email" aria-describedby="email-help email-error" {...form.register('email')} />
        <small id="email-help">最多 254 个字符；仅用于 Local/Test 演示。</small>
        {form.formState.errors.email && <p id="email-error" className={styles.fieldError}>请输入有效的工作邮箱</p>}
      </div>
      <div className={styles.field}>
        <label htmlFor="message">想讨论的问题</label>
        <textarea id="message" rows={7} aria-describedby="message-help message-error" {...form.register('message')} />
        <small id="message-help">20–2000 个字符，剩余 {charsRemaining} 个字符。</small>
        {form.formState.errors.message && <p id="message-error" className={styles.fieldError}>请至少填写 20 个字符的问题说明</p>}
      </div>
      <div className={styles.checkField}>
        <input id="consent" type="checkbox" aria-describedby="consent-error" {...form.register('consent')} />
        <label htmlFor="consent">我已阅读并同意本地/测试演示的数据处理说明（<code>privacy-v1-draft</code>；非已批准正式隐私文本）。</label>
        {form.formState.errors.consent && <p id="consent-error" className={styles.fieldError}>需要勾选本地/测试演示的数据处理说明</p>}
      </div>
      <div className={styles.actions}>
        <button className={styles.primaryButton} type="submit" disabled={!canSubmit}>{state === 'submitting' ? '正在提交…' : '提交咨询'}</button>
        {state === 'error' && !formToken && <button className={styles.secondaryButton} type="button" onClick={() => void requestToken()}>重新准备表单</button>}
      </div>
      <p className={styles.status} role="status" aria-live="polite">{stateMessage}</p>
      {globalError && <p className={styles.globalError} role="alert">{globalError}</p>}
    </form>
  )
}
