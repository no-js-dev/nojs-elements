import { test, expect } from '@playwright/test';

test.describe('Dropdown', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/dropdown/');
  });

  test('toggle opens menu on click and Escape closes it', async ({ page }) => {
    const toggle = page.getByTestId('basic-toggle');
    const menu = page.getByTestId('basic-menu');

    // Menu should be hidden initially
    await expect(menu).not.toBeVisible();

    // Click toggle to open
    await toggle.click();
    await expect(menu).toBeVisible();

    // Close with Escape (popover="auto" toggle-click re-open race)
    await page.keyboard.press('Escape');
    await expect(menu).not.toBeVisible();
  });

  test('ARIA attributes on toggle', async ({ page }) => {
    const toggle = page.getByTestId('basic-toggle');

    // Toggle should have aria-haspopup="menu" always
    await expect(toggle).toHaveAttribute('aria-haspopup', 'menu');

    // Initially aria-expanded should be false
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // After opening, aria-expanded should be true
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // After closing via Escape, aria-expanded should return to false
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('keyboard navigation: ArrowDown/ArrowUp moves focus between items', async ({ page }) => {
    const toggle = page.getByTestId('basic-toggle');
    const menu = page.getByTestId('basic-menu');

    // Open dropdown
    await toggle.click();
    await expect(menu).toBeVisible();

    // Ensure toggle retains focus before keyboard navigation (WebKit compat)
    await toggle.focus();

    // Press ArrowDown to focus first item
    await page.keyboard.press('ArrowDown');
    const items = menu.locator('[dropdown-item]');
    await expect(items.nth(0)).toBeFocused({ timeout: 2000 });

    // Press ArrowDown to focus second item
    await page.keyboard.press('ArrowDown');
    await expect(items.nth(1)).toBeFocused();

    // Press ArrowUp to go back to first item
    await page.keyboard.press('ArrowUp');
    await expect(items.nth(0)).toBeFocused();
  });

  test('disabled item has disabled attribute', async ({ page }) => {
    const dropdown = page.getByTestId('disabled-dropdown');
    const toggle = dropdown.locator('[dropdown-toggle]');
    const disabledItem = page.getByTestId('disabled-item');

    // Open dropdown
    await toggle.click();

    // Disabled item should have disabled or aria-disabled attribute
    const isDisabled = await disabledItem.evaluate(el =>
      el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true'
    );
    expect(isDisabled).toBe(true);
  });

  test('Escape key closes the dropdown', async ({ page }) => {
    const toggle = page.getByTestId('basic-toggle');
    const menu = page.getByTestId('basic-menu');

    // Open dropdown
    await toggle.click();
    await expect(menu).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');
    await expect(menu).not.toBeVisible();
  });

  test('clicking outside closes the dropdown', async ({ page }) => {
    const toggle = page.getByTestId('basic-toggle');
    const menu = page.getByTestId('basic-menu');

    // Open dropdown
    await toggle.click();
    await expect(menu).toBeVisible();

    // Click outside (light dismiss with popover="auto")
    await page.locator('body').click({ position: { x: 10, y: 10 } });
    await expect(menu).not.toBeVisible();
  });

  test('positioned dropdown has correct position attributes', async ({ page }) => {
    const dropdown = page.getByTestId('positioned-dropdown');

    await expect(dropdown).toHaveAttribute('dropdown-position', 'top');
    await expect(dropdown).toHaveAttribute('dropdown-align', 'end');

    // Open and verify it renders
    const toggle = page.getByTestId('positioned-toggle');
    await toggle.click();
    const menu = dropdown.locator('[dropdown-menu]');
    await expect(menu).toBeVisible();
  });

  test('link items are navigable', async ({ page }) => {
    const dropdown = page.getByTestId('link-dropdown');
    const toggle = dropdown.locator('[dropdown-toggle]');

    await toggle.click();
    const links = dropdown.locator('a[dropdown-item]');
    const count = await links.count();
    expect(count).toBe(3);

    // Each link item should have href
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toHaveAttribute('href', '#');
    }
  });
});
