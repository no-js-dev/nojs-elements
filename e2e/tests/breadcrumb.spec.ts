import { test, expect } from '@playwright/test';

test.describe('Breadcrumb', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/breadcrumb/');
  });

  // ─── Rendering ──────────────────────────────────────────────────────

  test('manual breadcrumb renders an ordered list from child elements', async ({ page }) => {
    const breadcrumb = page.getByTestId('manual-breadcrumb');
    const ol = breadcrumb.locator('ol.nojs-breadcrumb');

    await expect(ol).toBeVisible();
    const items = ol.locator('li');
    await expect(items).toHaveCount(4);
  });

  test('breadcrumb items render as links except the last one', async ({ page }) => {
    const breadcrumb = page.getByTestId('manual-breadcrumb');
    const ol = breadcrumb.locator('ol.nojs-breadcrumb');
    const items = ol.locator('li');

    // First three items should have <a> links
    for (let i = 0; i < 3; i++) {
      const link = items.nth(i).locator('a');
      await expect(link).toBeVisible();
    }

    // Last item should be a <span> (not a link)
    const lastLink = items.nth(3).locator('a');
    await expect(lastLink).toHaveCount(0);
    const lastSpan = items.nth(3).locator('span');
    await expect(lastSpan).toBeVisible();
  });

  test('breadcrumb links have correct href attributes', async ({ page }) => {
    const breadcrumb = page.getByTestId('manual-breadcrumb');
    const links = breadcrumb.locator('ol.nojs-breadcrumb li a');

    await expect(links.nth(0)).toHaveAttribute('href', '/');
    await expect(links.nth(1)).toHaveAttribute('href', '/products');
    await expect(links.nth(2)).toHaveAttribute('href', '/products/widgets');
  });

  // ─── ARIA / Navigation ─────────────────────────────────────────────

  test('last breadcrumb item has aria-current="page"', async ({ page }) => {
    const breadcrumb = page.getByTestId('manual-breadcrumb');
    const ol = breadcrumb.locator('ol.nojs-breadcrumb');
    const lastItem = ol.locator('li').last();
    const span = lastItem.locator('span');

    await expect(span).toHaveAttribute('aria-current', 'page');
  });

  test('nav element gets aria-label="Breadcrumb"', async ({ page }) => {
    const breadcrumb = page.getByTestId('manual-breadcrumb');
    await expect(breadcrumb).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  // ─── Custom labels ─────────────────────────────────────────────────

  test('breadcrumb uses custom labels from breadcrumb attribute', async ({ page }) => {
    const breadcrumb = page.getByTestId('labeled-breadcrumb');
    const ol = breadcrumb.locator('ol.nojs-breadcrumb');
    const items = ol.locator('li');

    const firstLink = items.nth(0).locator('a');
    await expect(firstLink).toHaveText('Home Page');

    const secondLink = items.nth(1).locator('a');
    await expect(secondLink).toHaveText('Documentation');

    const lastSpan = items.nth(2).locator('span');
    await expect(lastSpan).toHaveText('API Reference');
  });

  // ─── Overflow / many items ─────────────────────────────────────────

  test('breadcrumb with many items renders all items', async ({ page }) => {
    const breadcrumb = page.getByTestId('overflow-breadcrumb');
    const ol = breadcrumb.locator('ol.nojs-breadcrumb');
    const items = ol.locator('li');

    await expect(items).toHaveCount(6);
  });

  // ─── Non-nav container ─────────────────────────────────────────────

  test('div-based breadcrumb renders without nav aria-label', async ({ page }) => {
    const breadcrumb = page.getByTestId('div-breadcrumb');
    const ol = breadcrumb.locator('ol.nojs-breadcrumb');

    await expect(ol).toBeVisible();
    const items = ol.locator('li');
    await expect(items).toHaveCount(3);
  });
});
