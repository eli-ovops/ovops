import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@payload-config': fileURLToPath(new URL('./src/payload.config.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    fileParallelism: false,
    include: ['src/tests/**/*.test.ts', '!src/tests/**/*.dom.test.ts'],
  },
})
