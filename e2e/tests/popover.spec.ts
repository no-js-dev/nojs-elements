import { test, expect } from '@playwright/test';

test.describe('Popover', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/popover/');
  });

  // ─── Trigger / Dismiss ──────────────────────────────────────────────

  test('clicking trigger opens the popover', async ({ page }) => {
    const trigger = page.getByTestId('basic-trigger');
    const popover = page.getByTestId('basic-popover');

    await expect(popover).not.toBeVisible();
    await trigger.click();
    await expect(popover).toBeVisible();
  });

  test('clicking outside the popover closes it (light dismiss)', async ({ page }) => {
    const trigger = page.getByTestId('basic-trigger');
    const popover = page.getByTestId('basic-popover');

    await trigger.click();
    await expect(popover).toBeVisible();

    // Click outside the popover to light-dismiss it
    await page.mouse.click(10, 10);
    await expect(popover).not.toBeVisible();
  });

  test('popover-dismiss button closes the popover', async ({ page }) => {
    const trigger = page.getByTestId('dismiss-trigger');
    const popover = page.getByTestId('dismiss-popover');
    const dismissBtn = page.getByTestId('dismiss-btn');

    await trigger.click();
    await expect(popover).toBeVisible();

    await dismissBtn.click();
    await expect(popover).not.toBeVisible();
  });

  test('Escape key closes the popover and returns focus to trigger', async ({ page }) => {
    const trigger = page.getByTestId('basic-trigger');
    const popover = page.getByTestId('basic-popover');

    await trigger.click();
    await expect(popover).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(popover).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });

  // ─── ARIA attributes ───────────────────────────────────────────────

  test('trigger has correct ARIA attributes before and after opening', async ({ page }) => {
    const trigger = page.getByTestId('basic-trigger');

    // Before opening
    await expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // After opening
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // After closing
    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  // ─── Multiple triggers ─────────────────────────────────────────────

  test('multiple triggers can open the same popover', async ({ page }) => {
    const trigger1 = page.getByTestId('shared-trigger-1');
    const trigger2 = page.getByTestId('shared-trigger-2');
    const popover = page.getByTestId('shared-popover');

    // Open via first trigger
    await trigger1.click();
    await expect(popover).toBeVisible();

    // Close it
    await page.keyboard.press('Escape');
    await expect(popover).not.toBeVisible();

    // Open via second trigger
    await trigger2.click();
    await expect(popover).toBeVisible();
  });

  // ─── Content rendering ─────────────────────────────────────────────

  test('popover content is accessible when open', async ({ page }) => {
    const trigger = page.getByTestId('basic-trigger');
    const popoverText = page.getByTestId('basic-popover-text');

    await trigger.click();
    await expect(popoverText).toBeVisible();
    await expect(popoverText).toHaveText('Basic popover content');
  });
});
