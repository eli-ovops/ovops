import { defineProject, defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  './vitest.config.ts',
  defineProject({
    test: {
      name: 'dom',
      environment: 'jsdom',
      fileParallelism: false,
      include: ['src/tests/**/*.dom.test.ts', 'src/tests/**/*.dom.test.tsx'],
    },
  }),
])
