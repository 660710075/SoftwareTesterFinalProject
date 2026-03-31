import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 120 * 1000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 6 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://cpsu-website-beta.vercel.app',
    trace: 'on-first-retry',
  },

projects: [
    // UI //
    {
      name: 'webkit',
      use:
      {
        ...devices['Desktop Safari'],
      },
    },
  ],
});
