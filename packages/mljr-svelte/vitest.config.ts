import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
      headless: true,
    },
    teardownTimeout: 3000,
    include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
    setupFiles: ['./src/tests/setup-browser.ts'],
    testTimeout: 3000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        'dist/',
      ],
    },
  },
  resolve: {
    alias: {
      $lib: '/src/lib',
      $app: '/src/app',
    },
  },
});
