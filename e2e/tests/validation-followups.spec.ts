import { test, expect } from '@playwright/test';

test.describe('Validation follow-ups', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/e2e/examples/validation-followups.html');
  });

  test('a validator registered after the Elements script runs', async ({ page }) => {
    await page.getByTestId('late-qty').fill('3');
    await expect(page.getByTestId('late-qty-error')).toHaveText('Must be even');
    await page.getByTestId('late-qty').fill('4');
    await expect(page.getByTestId('late-qty-error')).toHaveText('');
  });

  test('custom:name finds a validator registered after the Elements script', async ({ page }) => {
    await page.getByTestId('late-repeat').fill('nope');
    await expect(page.getByTestId('late-repeat-error')).toHaveText('Passwords do not match');
    await page.getByTestId('late-repeat').fill('secret');
    await expect(page.getByTestId('late-repeat-error')).toHaveText('');
  });

  test('if="$form.errors.x" renders and clears its inline content', async ({ page }) => {
    const email = page.getByTestId('if-email');

    await expect(page.getByTestId('if-message')).toHaveCount(0);
    await email.fill('nope');
    await expect(page.getByTestId('if-message')).toHaveText('Enter a valid email address');
    await email.fill('ada@example.com');
    await expect(page.getByTestId('if-message')).toHaveCount(0);
    await email.fill('nope again');
    await expect(page.getByTestId('if-message')).toHaveText('Enter a valid email address');
  });

  test('an excluded field resets its as="" variable to valid', async ({ page }) => {
    const company = page.getByTestId('as-company');

    await company.fill('x');
    await company.fill('');
    await expect(page.getByTestId('as-state')).toHaveText('invalid');
    await page.getByTestId('as-toggle').uncheck();
    await expect(page.getByTestId('as-state')).toHaveText('valid');
    await page.getByTestId('as-toggle').check();
    await expect(page.getByTestId('as-state')).toHaveText('invalid');
  });
});
