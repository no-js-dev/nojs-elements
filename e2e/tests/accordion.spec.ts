import { test, expect } from '@playwright/test';

test.describe('Accordion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/accordion/');
  });

  // ─── Open / Close behavior ──────────────────────────────────────────

  test('all panels are closed by default', async ({ page }) => {
    const panel1 = page.getByTestId('panel-1');
    const panel2 = page.getByTestId('panel-2');
    const panel3 = page.getByTestId('panel-3');

    await expect(panel1).not.toHaveAttribute('open');
    await expect(panel2).not.toHaveAttribute('open');
    await expect(panel3).not.toHaveAttribute('open');
  });

  test('clicking a summary opens its panel', async ({ page }) => {
    const summary1 = page.getByTestId('summary-1');
    const panel1 = page.getByTestId('panel-1');

    await summary1.click();
    await expect(panel1).toHaveAttribute('open');
  });

  test('single mode: opening one panel closes the previously open panel', async ({ page }) => {
    const summary1 = page.getByTestId('summary-1');
    const summary2 = page.getByTestId('summary-2');
    const panel1 = page.getByTestId('panel-1');
    const panel2 = page.getByTestId('panel-2');

    await summary1.click();
    await expect(panel1).toHaveAttribute('open');

    await summary2.click();
    await expect(panel2).toHaveAttribute('open');
    await expect(panel1).not.toHaveAttribute('open', { timeout: 2000 });
  });

  test('multi mode: multiple panels can be open simultaneously', async ({ page }) => {
    const summary1 = page.getByTestId('multi-summary-1');
    const summary2 = page.getByTestId('multi-summary-2');
    const panel1 = page.getByTestId('multi-panel-1');
    const panel2 = page.getByTestId('multi-panel-2');

    await summary1.click();
    await expect(panel1).toHaveAttribute('open');

    await summary2.click();
    await expect(panel2).toHaveAttribute('open');
    // First panel should remain open in multi mode
    await expect(panel1).toHaveAttribute('open');
  });

  test('pre-opened panel is open on load', async ({ page }) => {
    const closedPanel = page.getByTestId('preopen-panel-1');
    const openPanel = page.getByTestId('preopen-panel-2');

    await expect(closedPanel).not.toHaveAttribute('open');
    await expect(openPanel).toHaveAttribute('open');
  });

  // ─── Keyboard navigation ───────────────────────────────────────────

  test('ArrowDown moves focus to next summary, wraps at end', async ({ page }) => {
    const summary1 = page.getByTestId('summary-1');
    const summary2 = page.getByTestId('summary-2');
    const summary3 = page.getByTestId('summary-3');

    await summary1.focus();
    await expect(summary1).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(summary2).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(summary3).toBeFocused();

    // Wraps from last to first
    await page.keyboard.press('ArrowDown');
    await expect(summary1).toBeFocused();
  });

  test('ArrowUp moves focus to previous summary, wraps at start', async ({ page }) => {
    const summary1 = page.getByTestId('summary-1');
    const summary3 = page.getByTestId('summary-3');

    await summary1.focus();
    await expect(summary1).toBeFocused();

    // Wraps from first to last
    await page.keyboard.press('ArrowUp');
    await expect(summary3).toBeFocused();
  });

  test('Home and End keys move focus to first and last summary', async ({ page }) => {
    const summary1 = page.getByTestId('summary-1');
    const summary3 = page.getByTestId('summary-3');

    await summary3.focus();
    await page.keyboard.press('Home');
    await expect(summary1).toBeFocused();

    await summary1.focus();
    await page.keyboard.press('End');
    await expect(summary3).toBeFocused();
  });
});
