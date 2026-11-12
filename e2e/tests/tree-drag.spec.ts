import { test, expect, Page } from '@playwright/test';

type Zone = 'top' | 'middle' | 'bottom';

// Drop on the top edge, the middle or the bottom edge of the target item.
// The tree is centred first so that no scroll happens between press and drop,
// and the pointer moves once more inside the target before the release:
// WebKit only drops where a dragover has fired, as it does for a real user.
async function drag(page: Page, source: string, target: string, zone: Zone) {
  await page.locator(source).evaluate((el) => el.closest('[tree-drag-mode]')!.scrollIntoView({ block: 'center' }));
  const from = await page.locator(source).boundingBox();
  const to = await page.locator(target).boundingBox();
  if (!from || !to) throw new Error(`${source} or ${target} is not visible`);
  const y = to.y + (zone === 'top' ? 2 : zone === 'bottom' ? to.height - 2 : to.height / 2);
  await page.mouse.move(from.x + 10, from.y + from.height / 2);
  await page.mouse.down();
  await page.mouse.move(to.x + 10, y, { steps: 5 });
  await page.mouse.move(to.x + 12, y);
  await page.mouse.up();
}

async function expectAllDraggable(page: Page, tree: string, except: string[] = []) {
  const items = page.getByTestId(tree).locator('[role="treeitem"]');
  expect(await items.count()).toBeGreaterThan(0);
  for (const item of await items.all()) {
    const id = await item.getAttribute('id');
    await expect(item, `#${id}`).toHaveAttribute('draggable', except.includes(id!) ? 'false' : 'true');
  }
}

test.describe('Tree drag and drop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/e2e/examples/tree-drag.html');
  });

  test.describe('static <li branch> markup', () => {
    test('every branch and leaf is draggable in each mode', async ({ page }) => {
      await expectAllDraggable(page, 'static-reparent');
      await expectAllDraggable(page, 'static-reorder');
      await expectAllDraggable(page, 'static-both', ['sb-system']);
    });

    test('reparent: dropping a branch on another nests it and fires start, reparent, end', async ({ page }) => {
      await drag(page, '#sr-c', '#sr-b', 'middle');
      await expect(page.getByTestId('static-reparent-log')).toHaveText('start:sr-c reparent:sr-c>sr-b end:sr-c');
      await expect(page.locator('#sr-b > [role="group"] > #sr-c')).toHaveCount(1);
      await expect(page.locator('#sr-b')).toHaveAttribute('aria-expanded', 'true');
    });

    test('reparent: a leaf of an expanded branch can be moved to another branch', async ({ page }) => {
      await page.locator('#sr-a').click({ position: { x: 10, y: 8 } });
      await expect(page.locator('#sr-a1')).toBeVisible();
      await drag(page, '#sr-a1', '#sr-b', 'middle');
      await expect(page.getByTestId('static-reparent-log')).toHaveText('start:sr-a1 reparent:sr-a1>sr-b end:sr-a1');
      await expect(page.locator('#sr-b #sr-a1')).toHaveCount(1);
    });

    test('reorder: dropping on the bottom half moves after, on the top half moves before', async ({ page }) => {
      const log = page.getByTestId('static-reorder-log');
      await drag(page, '#so-1', '#so-3', 'bottom');
      await expect(log).toHaveText('start:so-1 reorder:so-1@2 end:so-1');
      await drag(page, '#so-1', '#so-2', 'top');
      await expect(log).toHaveText('start:so-1 reorder:so-1@2 end:so-1 start:so-1 reorder:so-1@0 end:so-1');
      const order = await page.getByTestId('static-reorder').locator(':scope > [role="treeitem"]').evaluateAll((els) => els.map((e) => e.id));
      expect(order).toEqual(['so-1', 'so-2', 'so-3']);
    });

    test('reorder: the middle of a node never reparents', async ({ page }) => {
      await drag(page, '#so-3', '#so-1', 'middle');
      await expect(page.getByTestId('static-reorder-log')).toHaveText(/^start:so-3 reorder:so-3@\d end:so-3$/);
      await expect(page.locator('#so-1 #so-3')).toHaveCount(0);
    });

    test('both: edges reorder and the middle reparents', async ({ page }) => {
      const log = page.getByTestId('static-both-log');
      await drag(page, '#sb-archive', '#sb-user', 'top');
      await expect(log).toHaveText('start:sb-archive reorder:sb-archive@2 end:sb-archive');
      await drag(page, '#sb-archive', '#sb-docs', 'middle');
      await expect(log).toHaveText('start:sb-archive reorder:sb-archive@2 end:sb-archive start:sb-archive reparent:sb-archive>sb-docs end:sb-archive');
      await expect(page.locator('#sb-docs > [role="group"] > #sb-archive')).toHaveCount(1);
    });

    test('both: a tree-drag-disabled branch does not start a drag but still accepts drops', async ({ page }) => {
      const log = page.getByTestId('static-both-log');
      await drag(page, '#sb-system', '#sb-user', 'middle');
      await expect(log).not.toContainText('start:sb-system');
      await drag(page, '#sb-user', '#sb-system', 'middle');
      await expect(log).toHaveText('start:sb-user reparent:sb-user>sb-system end:sb-user');
    });
  });

  test.describe('items that already have role="treeitem"', () => {
    test('stay draggable and fire the drag events', async ({ page }) => {
      await expectAllDraggable(page, 'role-both');
      const log = page.getByTestId('role-both-log');
      await drag(page, '#rb-1', '#rb-3', 'bottom');
      await expect(log).toHaveText('start:rb-1 reorder:rb-1@2 end:rb-1');
      await drag(page, '#rb-2', '#rb-3', 'middle');
      await expect(log).toHaveText('start:rb-1 reorder:rb-1@2 end:rb-1 start:rb-2 reparent:rb-2>rb-3 end:rb-2');
    });
  });

  test.describe('dynamic items rendered by each', () => {
    test('rendered and added items are draggable in each mode', async ({ page }) => {
      for (const mode of ['reparent', 'reorder', 'both']) {
        await expectAllDraggable(page, `dynamic-${mode}`);
        await page.getByTestId(`dynamic-${mode}-add`).click();
        await expect(page.getByTestId(`dynamic-${mode}`).locator('[role="treeitem"]')).toHaveCount(4);
        await expectAllDraggable(page, `dynamic-${mode}`);
      }
    });

    test('reparent: an added item can be dropped on a rendered one', async ({ page }) => {
      await page.getByTestId('dynamic-reparent-add').click();
      await drag(page, '#dr-d', '#dr-a', 'middle');
      await expect(page.getByTestId('dynamic-reparent-log')).toHaveText('start:dr-d reparent:dr-d>dr-a end:dr-d');
      await expect(page.locator('#dr-a #dr-d')).toHaveCount(1);
    });

    test('reorder: an added item can be moved to the top', async ({ page }) => {
      await page.getByTestId('dynamic-reorder-add').click();
      await drag(page, '#do-d', '#do-a', 'top');
      await expect(page.getByTestId('dynamic-reorder-log')).toHaveText('start:do-d reorder:do-d@0 end:do-d');
    });

    test('both: edges reorder and the middle reparents', async ({ page }) => {
      const log = page.getByTestId('dynamic-both-log');
      await drag(page, '#db-a', '#db-c', 'bottom');
      await expect(log).toHaveText('start:db-a reorder:db-a@2 end:db-a');
      await page.getByTestId('dynamic-both-add').click();
      await drag(page, '#db-d', '#db-b', 'middle');
      await expect(log).toHaveText('start:db-a reorder:db-a@2 end:db-a start:db-d reparent:db-d>db-b end:db-d');
    });
  });
});
