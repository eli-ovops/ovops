import { expect, test } from '@playwright/test'

const baseURL = process.env.E2E_BASE_URL ?? 'http://127.0.0.1:3108'

for (const viewport of [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 960 },
]) {
  test(`${viewport.name}: /contact is keyboard-accessible without horizontal overflow`, async ({ browser }) => {
    test.setTimeout(45_000)
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } })
    const page = await context.newPage()
    const consoleErrors: string[] = []
    page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()) })

    const tokenResponse = page.waitForResponse((response) => response.url().endsWith('/api/inquiries/form-token'))
    await page.goto(`${baseURL}/contact`)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('聊聊一个具体问题')
    expect((await tokenResponse).status()).toBe(200)
    const submitButton = page.getByRole('button', { name: '提交咨询' })
    await expect(submitButton).toBeEnabled({ timeout: 5_000 })
    await page.reload()
    await expect(page.getByRole('heading', { level: 1 })).toContainText('聊聊一个具体问题')
    await expect(submitButton).toBeEnabled({ timeout: 5_000 })
    await page.evaluate(() => history.pushState({ source: 'contact-history-test' }, '', '/contact?from=history'))
    await expect(page).toHaveURL(`${baseURL}/contact?from=history`)
    await expect(submitButton).toBeEnabled({ timeout: 5_000 })
    const restoredToken = page.waitForResponse((response) => response.url().endsWith('/api/inquiries/form-token') && response.status() === 200)
    await page.goBack()
    await expect(page).toHaveURL(`${baseURL}/contact`)
    await restoredToken
    await expect(submitButton).toBeEnabled({ timeout: 5_000 })
    await page.goForward()
    await expect(page).toHaveURL(`${baseURL}/contact?from=history`)
    await page.keyboard.press('Tab')
    await expect(page.getByLabel('联系人姓名')).toBeFocused()
    expect(await page.locator('body').evaluate((body) => body.scrollWidth <= window.innerWidth)).toBe(true)
    expect(consoleErrors).toEqual([])
    await context.close()
  })
}
