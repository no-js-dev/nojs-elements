import { test, expect } from '@playwright/test';

test.describe('Table', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/table/');
  });

  test('table renders with correct data from state', async ({ page }) => {
    const table = page.getByTestId('basic-table');
    await expect(table).toBeVisible();

    // Wait for each directive to expand rows
    const rows = table.locator('tbody tr');
    await expect(rows).toHaveCount(5, { timeout: 5000 });

    // First row should contain Alice's data
    const firstRow = rows.first();
    await expect(firstRow.locator('td').nth(0)).toHaveText('Alice');
    await expect(firstRow.locator('td').nth(1)).toHaveText('30');
    await expect(firstRow.locator('td').nth(2)).toHaveText('alice@example.com');
  });

  test('clicking sort header sorts ascending, clicking again sorts descending', async ({ page }) => {
    const sortName = page.getByTestId('sort-name');
    const table = page.getByTestId('basic-table');

    // Wait for rows to render
    await expect(table.locator('tbody tr')).toHaveCount(5, { timeout: 5000 });

    // Click to sort ascending
    await sortName.click();
    const firstCell = table.locator('tbody tr').first().locator('td').first();
    await expect(firstCell).toHaveText('Alice');

    const lastCell = table.locator('tbody tr').last().locator('td').first();
    await expect(lastCell).toHaveText('Eve');

    // Click again to sort descending
    await sortName.click();
    await expect(firstCell).toHaveText('Eve');
    await expect(lastCell).toHaveText('Alice');
  });

  test('sort indicator appears on active column', async ({ page }) => {
    const sortName = page.getByTestId('sort-name');
    const table = page.getByTestId('basic-table');
    await expect(table.locator('tbody tr')).toHaveCount(5, { timeout: 5000 });

    // Click to sort ascending
    await sortName.click();
    // Should have sort indicator via data-sort-dir attribute (visual indicator is CSS ::after)
    const sortDir = await sortName.getAttribute('data-sort-dir');
    expect(sortDir === 'asc' || sortDir === 'desc').toBeTruthy();
  });

  test('third click returns to original order', async ({ page }) => {
    const table = page.getByTestId('basic-table');
    const sortName = page.getByTestId('sort-name');
    await expect(table.locator('tbody tr')).toHaveCount(5, { timeout: 5000 });

    // Capture original order
    const getFirstName = async () => {
      return table.locator('tbody tr').first().locator('td').first().textContent();
    };
    const originalFirst = await getFirstName();

    // Click 3 times: asc -> desc -> original
    await sortName.click();
    await sortName.click();
    await sortName.click();

    const restoredFirst = await getFirstName();
    expect(restoredFirst).toBe(originalFirst);
  });

  test('numeric sort sorts numerically not lexically', async ({ page }) => {
    const sortAge = page.getByTestId('sort-age');
    const table = page.getByTestId('basic-table');
    await expect(table.locator('tbody tr')).toHaveCount(5, { timeout: 5000 });

    // Click to sort ascending by age
    await sortAge.click();

    const ages: number[] = [];
    const rows = table.locator('tbody tr');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const text = await rows.nth(i).locator('td').nth(1).textContent();
      ages.push(Number(text));
    }

    // Verify sorted ascending numerically
    for (let i = 1; i < ages.length; i++) {
      expect(ages[i]).toBeGreaterThanOrEqual(ages[i - 1]);
    }

    // Specifically check that 22 comes before 25 (lexical would put 25 before 30 but also 22 first,
    // so let's verify 22 < 25 < 28 < 30 < 35)
    expect(ages).toEqual([22, 25, 28, 30, 35]);
  });

  test('default sort applies on page load', async ({ page }) => {
    const table = page.getByTestId('default-sort-table');
    await expect(table).toBeVisible();

    // With sort-default="asc" on name, first row should be Anna (alphabetically first)
    const firstRow = table.locator('tbody tr').first();
    await expect(firstRow.locator('td').first()).toHaveText('Anna');

    // Last row should be Zara (alphabetically last)
    const lastRow = table.locator('tbody tr').last();
    await expect(lastRow.locator('td').first()).toHaveText('Zara');
  });

  test('table has .nojs-sortable class and th has data-sort-dir', async ({ page }) => {
    const table = page.getByTestId('basic-table');
    await expect(table.locator('tbody tr')).toHaveCount(5, { timeout: 5000 });
    await expect(table).toHaveClass(/nojs-sortable/);

    const sortName = page.getByTestId('sort-name');

    // Click to sort ascending
    await sortName.click();
    await expect(sortName).toHaveAttribute('data-sort-dir', 'asc');

    // Click to sort descending
    await sortName.click();
    await expect(sortName).toHaveAttribute('data-sort-dir', 'desc');
  });
});
