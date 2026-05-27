import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: `http://localhost:${process.env.TEST_PORT || 3001}`,
    trace: 'on-first-retry',
    testIdAttribute: 'data-test',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
  webServer: {
    command: 'node test-server.js',
    port: parseInt(process.env.TEST_PORT || '3001'),
    cwd: path.resolve(__dirname, '..'),
    reuseExistingServer: !process.env.CI,
  },
});
