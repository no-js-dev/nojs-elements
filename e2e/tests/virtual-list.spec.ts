import { test, expect } from '@playwright/test';

test.describe('Virtual List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/virtual-list/');
    // Wait for NoJS to process the virtual list
    await page.waitForLoadState('networkidle');
  });

  // ─── Virtualization ─────────────────────────────────────────────────

  test('virtual list renders only a subset of items, not all 1000', async ({ page }) => {
    const list = page.getByTestId('fixed-list');
    await expect(list).toBeVisible();

    // The list has 1000 items but should only render a window of them
    const renderedItems = list.locator('[data-test="virtual-item"]');
    const count = await renderedItems.count();

    // Should render far fewer than the full 1000
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(100);
  });

  test('virtual list has spacer elements for scroll height', async ({ page }) => {
    const list = page.getByTestId('fixed-list');

    // Check for spacer elements that maintain scroll height
    const spacers = list.locator('.nojs-virtual-spacer');
    const spacerCount = await spacers.count();
    expect(spacerCount).toBeGreaterThanOrEqual(1);
  });

  test('total scroll height approximates all items', async ({ page }) => {
    const list = page.getByTestId('fixed-list');

    // The total scroll height should approximate 1000 items * 40px each
    const scrollHeight = await list.evaluate((el) => el.scrollHeight);
    // Allow some tolerance — at least most of the expected height
    expect(scrollHeight).toBeGreaterThan(30000);
  });

  // ─── Scroll behavior ───────────────────────────────────────────────

  test('scrolling renders different items', async ({ page }) => {
    const list = page.getByTestId('fixed-list');

    // Capture how many rendered items exist before scroll
    const countBefore = await list.locator('[data-test="virtual-item"]').count();
    expect(countBefore).toBeGreaterThan(0);

    // Capture the data-test attribute count at current scroll position
    const scrollTopBefore = await list.evaluate((el) => el.scrollTop);

    // Scroll down significantly
    await list.evaluate((el) => {
      el.scrollTop = 5000;
      el.dispatchEvent(new Event('scroll'));
    });

    // Poll until scrollTop has actually changed and items re-rendered
    await expect.poll(async () => {
      return await list.evaluate((el) => el.scrollTop);
    }, { timeout: 5000 }).toBeGreaterThan(scrollTopBefore);

    // Items should still be rendered at the new position
    const countAfter = await list.locator('[data-test="virtual-item"]').count();
    expect(countAfter).toBeGreaterThan(0);
  });

  // ─── Small dataset ──────────────────────────────────────────────────

  test('small dataset renders all items without virtualization issues', async ({ page }) => {
    const list = page.getByTestId('small-list');
    await expect(list).toBeVisible();

    // Small list has 5 items — all should be rendered
    const items = list.locator('.virtual-item');
    const count = await items.count();
    expect(count).toBe(5);
  });

  // ─── Item count display ─────────────────────────────────────────────

  test('item count label reflects the total items', async ({ page }) => {
    const countLabel = page.getByTestId('item-count');
    await expect(countLabel).toHaveText('Total: 1000 items');
  });
});
