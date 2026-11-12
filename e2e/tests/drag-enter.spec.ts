import { test, expect, Page, Locator } from '@playwright/test';

// The pointer starts a drag on the source, jumps into the target in one move
// and releases at once. The target gets a dragenter and no dragover before
// the drop: WebKit drops there only when dragenter was cancelled.
async function releaseOnEnter(page: Page, source: Locator, target: Locator, zone: 'middle' | 'bottom' = 'middle') {
  await source.scrollIntoViewIfNeeded();
  const from = await source.boundingBox();
  const to = await target.boundingBox();
  if (!from || !to) throw new Error('source or target is not visible');
  await page.mouse.move(from.x + 10, from.y + 5);
  await page.mouse.down();
  await page.mouse.move(from.x + 14, from.y + 7);
  await page.mouse.move(from.x + 18, from.y + 9);
  await page.mouse.move(to.x + 10, zone === 'bottom' ? to.y + to.height - 3 : to.y + to.height / 2);
  await page.mouse.up();
}

test.describe('Drop on the first position inside a target', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/e2e/examples/drag-enter.html');
  });

  test.describe('tree-drag-mode', () => {
    test('a release on entering a valid node reorders', async ({ page }) => {
      await releaseOnEnter(page, page.locator('#t-1'), page.locator('#t-3'), 'bottom');
      await expect(page.getByTestId('tree-log')).toHaveText('reorder:t-1@2');
      const order = await page.getByTestId('tree').locator(':scope > [role="treeitem"]').evaluateAll((els) => els.map((e) => e.id));
      expect(order).toEqual(['t-2', 't-3', 't-1']);
    });

    test('a release on entering a descendant of the dragged node does nothing', async ({ page }) => {
      await releaseOnEnter(page, page.locator('#t-1'), page.locator('#t-1a'));
      await expect(page.getByTestId('tree-log')).toHaveText('');
      await expect(page.locator('#t-1 #t-1a')).toHaveCount(1);
    });
  });

  test.describe('table-reorder', () => {
    test('a release on entering a row reorders', async ({ page }) => {
      await releaseOnEnter(page, page.locator('#r-1'), page.locator('#r-3'), 'bottom');
      await expect(page.getByTestId('table-log')).toHaveText('reorder:0>2');
      const order = await page.getByTestId('table').locator('tbody > tr').evaluateAll((rows) => rows.map((r) => r.id));
      expect(order).toEqual(['r-2', 'r-3', 'r-1']);
    });
  });

  test.describe('drag / drop', () => {
    test('a release on entering an accepting zone drops', async ({ page }) => {
      await releaseOnEnter(page, page.locator('#d-task'), page.getByTestId('drop-task'));
      await expect(page.getByTestId('drop-accepted')).toHaveText('task');
    });

    test('a release on entering a zone that rejects the type does not drop', async ({ page }) => {
      await releaseOnEnter(page, page.locator('#d-task'), page.getByTestId('drop-file'));
      await expect(page.getByTestId('drop-rejected')).toHaveText('');
    });
  });

  test.describe('drag-list', () => {
    test('a release on entering an accepting list moves the item', async ({ page }) => {
      await releaseOnEnter(page, page.getByTestId('list-source').locator('.item'), page.getByTestId('list-target'));
      await expect(page.getByTestId('list-counts')).toHaveText('0,1,0');
      await expect(page.getByTestId('list-target').locator('.item')).toHaveText(['Alpha']);
    });

    test('a release on entering a list that rejects the type keeps the item', async ({ page }) => {
      await releaseOnEnter(page, page.getByTestId('list-source').locator('.item'), page.getByTestId('list-files'));
      await expect(page.getByTestId('list-counts')).toHaveText('1,0,0');
    });
  });
});
