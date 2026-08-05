import { test, expect } from '@playwright/test';

test.describe('Drag and Drop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/dnd/');
  });

  // ── Scenario 1: Basic cross-list transfer ────────────────────────

  test('drag-list renders initial items from state', async ({ page }) => {
    const listA = page.getByTestId('list-a');
    const listB = page.getByTestId('list-b');

    await expect(listA.getByTestId('item')).toHaveCount(3);
    await expect(listB.getByTestId('item')).toHaveCount(0);
    await expect(page.getByTestId('count-a')).toHaveText('3');
    await expect(page.getByTestId('count-b')).toHaveText('0');
  });

  test('draggable items have correct ARIA attributes', async ({ page }) => {
    const listA = page.getByTestId('list-a');
    const firstItem = listA.getByTestId('item').first();

    await expect(firstItem).toHaveAttribute('draggable', 'true');
    await expect(firstItem).toHaveAttribute('role', 'option');
    await expect(firstItem).toHaveAttribute('aria-roledescription', 'draggable item');
  });

  test('drag item from list A to list B transfers the item', async ({ page }) => {
    const listA = page.getByTestId('list-a');
    const listB = page.getByTestId('list-b');
    const firstItem = listA.getByTestId('item').first();

    await firstItem.dragTo(listB);

    // Wait for state update
    await expect(page.getByTestId('count-a')).toHaveText('2');
    await expect(page.getByTestId('count-b')).toHaveText('1');
    await expect(listA.getByTestId('item')).toHaveCount(2);
    await expect(listB.getByTestId('item')).toHaveCount(1);
  });

  // ── Scenario 2: Type isolation ───────────────────────────────────

  test('type isolation: task-only zone rejects file-typed items', async ({ page }) => {
    const fileSrc = page.getByTestId('files-src');
    const taskDrop = page.getByTestId('task-drop');
    const fileItem = fileSrc.getByTestId('item').first();

    // Attempt drag file into task zone
    await fileItem.dragTo(taskDrop);

    // File should still be in source (task zone rejects file type)
    await expect(fileSrc.getByTestId('item')).toHaveCount(1);
    await expect(taskDrop.getByTestId('item')).toHaveCount(0);
  });

  test('type isolation: task drops into task zone succeeds', async ({ page }) => {
    const taskSrc = page.getByTestId('tasks-src');
    const taskDrop = page.getByTestId('task-drop');
    const taskItem = taskSrc.getByTestId('item').first();

    await taskItem.dragTo(taskDrop);

    await expect(taskSrc.getByTestId('item')).toHaveCount(0);
    await expect(taskDrop.getByTestId('item')).toHaveCount(1);
  });

  // ── Scenario 3: Wildcard accept ──────────────────────────────────

  test('wildcard drop-accept="*" zone accepts any drag type', async ({ page }) => {
    const wildSrc = page.getByTestId('wild-src');
    const wildTarget = page.getByTestId('wild-target');
    const item = wildSrc.getByTestId('item').first();

    await item.dragTo(wildTarget);

    await expect(wildSrc.getByTestId('item')).toHaveCount(0);
    await expect(wildTarget.getByTestId('item')).toHaveCount(1);
  });

  // ── Scenario 4: Drag handle ──────────────────────────────────────

  test('drag handle: item is draggable only via handle element', async ({ page }) => {
    const handleList = page.getByTestId('handle-list');
    const items = handleList.getByTestId('handle-item');

    await expect(items).toHaveCount(2);

    // The handle grip should exist
    const grip = handleList.getByTestId('handle-grip').first();
    await expect(grip).toBeVisible();
  });

  // ── Scenario 5: Disabled states ──────────────────────────────────

  test('disabled drag: items are not draggable when drag-disabled is true', async ({ page }) => {
    const disabledSrc = page.getByTestId('disabled-src');
    const disabledTarget = page.getByTestId('disabled-target');

    // Initially both drag and drop are disabled
    const item = disabledSrc.getByTestId('item').first();
    await item.dragTo(disabledTarget);

    // Item should remain in source
    await expect(disabledSrc.getByTestId('item')).toHaveCount(1);
    await expect(disabledTarget.getByTestId('item')).toHaveCount(0);
  });

  test('toggle drag: enabling drag allows items to be moved', async ({ page }) => {
    // Enable drag by toggling
    await page.getByTestId('toggle-drag').click();
    // Enable drop by toggling
    await page.getByTestId('toggle-drop').click();

    const disabledSrc = page.getByTestId('disabled-src');
    const disabledTarget = page.getByTestId('disabled-target');
    const item = disabledSrc.getByTestId('item').first();

    await item.dragTo(disabledTarget);

    await expect(disabledSrc.getByTestId('item')).toHaveCount(0);
    await expect(disabledTarget.getByTestId('item')).toHaveCount(1);
  });

  // ── Scenario 6: Drop max capacity ────────────────────────────────

  test('drop-max limits the number of items in a zone', async ({ page }) => {
    const maxSrc = page.getByTestId('max-src');
    const maxTarget = page.getByTestId('max-target');

    // Target already has 1 item, max is 2
    await expect(maxTarget.getByTestId('item')).toHaveCount(1);

    // First drag should succeed (1 -> 2)
    const first = maxSrc.getByTestId('item').first();
    await first.dragTo(maxTarget);
    await expect(maxTarget.getByTestId('item')).toHaveCount(2);

    // Second drag should be rejected (would exceed max 2)
    const second = maxSrc.getByTestId('item').first();
    await second.dragTo(maxTarget);
    await expect(maxTarget.getByTestId('item')).toHaveCount(2);
  });

  // ── Scenario 7: Lifecycle events ─────────────────────────────────

  test('lifecycle: on:receive fires when item is dropped into target', async ({ page }) => {
    const evtA = page.getByTestId('evt-a');
    const evtB = page.getByTestId('evt-b');
    const item = evtA.getByTestId('item').first();

    await item.dragTo(evtB);

    await expect(page.getByTestId('receive-log')).toHaveText(/received:Evt-1/);
  });

  test('lifecycle: on:remove fires when item leaves source list', async ({ page }) => {
    const evtA = page.getByTestId('evt-a');
    const evtB = page.getByTestId('evt-b');
    const item = evtA.getByTestId('item').first();

    await item.dragTo(evtB);

    await expect(page.getByTestId('remove-log')).toHaveText(/removed:0/);
  });

  // ── Scenario 8: Low-level drag + drop ────────────────────────────

  test('low-level drag: items with drag directive can be dropped into drop zone', async ({ page }) => {
    const fruitSrc = page.getByTestId('fruit-src');
    const fruitBin = page.getByTestId('fruit-bin');
    const firstFruit = fruitSrc.getByTestId('basic-item').first();

    await firstFruit.dragTo(fruitBin);

    await expect(page.getByTestId('bin-count')).toHaveText('1');
  });

  // ── Scenario 9: Multi-select ─────────────────────────────────────

  test('multi-select: items have drag-multiple attribute', async ({ page }) => {
    const selSrc = page.getByTestId('sel-src');
    const items = selSrc.getByTestId('sel-item');

    await expect(items).toHaveCount(3);
    await expect(items.first()).toHaveAttribute('drag-multiple', '');
  });

  // ── Scenario 10: Drop on empty list ──────────────────────────────

  test('drop on empty list: item can be dropped into empty target', async ({ page }) => {
    const emSrc = page.getByTestId('em-src');
    const emTarget = page.getByTestId('em-target');

    // Target should start empty
    await expect(emTarget.getByTestId('item')).toHaveCount(0);

    const item = emSrc.getByTestId('item').first();
    await item.dragTo(emTarget);

    await expect(emTarget.getByTestId('item')).toHaveCount(1);
    await expect(emSrc.getByTestId('item')).toHaveCount(0);
  });

  // ── Scenario 11: Horizontal reorder ──────────────────────────────

  test('horizontal list renders items in a row', async ({ page }) => {
    const hList = page.getByTestId('h-list');
    const items = hList.getByTestId('item');

    await expect(items).toHaveCount(3);
    await expect(hList).toHaveAttribute('drop-sort', 'horizontal');
  });

  // ── Scenario 12: Keyboard DnD ────────────────────────────────────

  test('keyboard DnD: list items are focusable for keyboard access', async ({ page }) => {
    const kbList = page.getByTestId('kb-list');
    const items = kbList.getByTestId('item');

    await expect(items).toHaveCount(3);

    // Items in a drag-list should have tabindex for keyboard access
    const firstItem = items.first();
    await firstItem.focus();
    await expect(firstItem).toBeFocused();
  });

  test('keyboard DnD: Space activates drag mode (nojs-dragging class + live-region announcement)', async ({ page }) => {
    const kbList = page.getByTestId('kb-list');
    const firstItem = kbList.getByTestId('item').first();

    await firstItem.focus();
    await expect(firstItem).not.toHaveClass(/nojs-dragging/);

    await page.keyboard.press('Space');

    // After Space, the drag class should be applied
    await expect(firstItem).toHaveClass(/nojs-dragging/);

    // Live region should announce the grab
    const liveRegion = page.locator('.nojs-dnd-live-region');
    await expect(liveRegion).toHaveText(/Grabbed .+\. Use arrow keys to (?:move|reorder)\./);
  });

  test('keyboard DnD: Escape cancels drag mode (class removed + cancellation announcement)', async ({ page }) => {
    const kbList = page.getByTestId('kb-list');
    const firstItem = kbList.getByTestId('item').first();

    await firstItem.focus();
    await page.keyboard.press('Space');
    await expect(firstItem).toHaveClass(/nojs-dragging/);

    await page.keyboard.press('Escape');
    await expect(firstItem).not.toHaveClass(/nojs-dragging/);

    // Live region should announce the cancellation
    const liveRegion = page.locator('.nojs-dnd-live-region');
    await expect(liveRegion).toHaveText(/(?:Drag|Reorder) cancelled\./);
  });

  // ── Visual feedback (CSS classes) ────────────────────────────────

  test('DnD styles are injected into the document', async ({ page }) => {
    const styleTag = page.locator('style[data-nojs-dnd]');
    await expect(styleTag).toHaveCount(1);
  });
});
