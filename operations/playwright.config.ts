import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './src/tests/e2e',
  fullyParallel: false,
  use: {
    browserName: 'chromium',
    channel: 'chrome',
    headless: true,
  },
})
