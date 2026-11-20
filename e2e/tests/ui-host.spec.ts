import { test, expect, Page } from '@playwright/test';

// UI directives on the NoJS-Server host API (compiled sites, ADR-021 §7):
// DOM mechanics only, expression attributes hold server-delivered values.
// The page stands in for the integrator's plugin host.

const warns = (page: Page) => page.evaluate(() => (window as any).__warns);

test.describe('UI directives (host backend)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/e2e/examples/ui-host.html');
  });

  test('initializes every directive without host warnings', async ({ page }) => {
    await expect(page.getByTestId('faq')).toHaveAttribute('role', 'group');
    expect(await warns(page)).toEqual([]);
  });

  test('accordion: single mode closes the other item', async ({ page }) => {
    await page.getByTestId('q2').click();
    await expect(page.locator('#q2')).toHaveAttribute('open', '');
    await page.getByTestId('q1').click();
    await expect(page.locator('#q1')).toHaveAttribute('open', '');
    await expect(page.locator('#q2')).not.toHaveAttribute('open', '');
    await expect(page.getByTestId('q1')).toHaveAttribute('aria-expanded', 'true');
  });

  test('tabs: delivered tab-disabled, keyboard, selection kept across a server re-render', async ({ page }) => {
    await expect(page.getByTestId('tab-a')).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByTestId('tab-c')).toHaveAttribute('aria-disabled', 'true');
    await page.getByTestId('tab-a').focus();
    await page.keyboard.press('End');
    await expect(page.getByTestId('tab-b')).toHaveAttribute('aria-selected', 'true');

    await page.evaluate(() => (window as any).__rerender('#tabs',
      '<button tab data-test="tab-a">A</button><button tab data-test="tab-b">B</button>' +
      '<button tab tab-disabled="false" data-test="tab-c">C</button>' +
      '<div panel>Panel A</div><div panel>Panel B</div><div panel>Panel C</div>'));
    await expect(page.getByTestId('tab-b')).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByTestId('tab-c')).not.toHaveAttribute('aria-disabled', 'true');
    await expect(page.locator('#tabs [role="tablist"]')).toHaveCount(1);
  });

  test('tooltip: shows on focus, hides when the server disables it', async ({ page }) => {
    await page.getByTestId('hint').focus();
    await expect(page.locator('.nojs-tooltip')).toHaveAttribute('aria-hidden', 'false');
    await page.evaluate(() => (window as any).__setAttr('[data-test="hint"]', 'tooltip-disabled', 'true'));
    await expect(page.locator('.nojs-tooltip')).toHaveCount(0);
  });

  test('modal: opens and closes', async ({ page }) => {
    await page.getByTestId('open-modal').click();
    await expect(page.getByTestId('modal')).toBeVisible();
    await page.getByTestId('close-modal').click();
    await expect(page.getByTestId('modal')).toBeHidden();
  });

  test('dropdown: toggles and closes on Escape', async ({ page }) => {
    await page.getByTestId('dd-toggle').click();
    await expect(page.getByTestId('dd-toggle')).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('dd-toggle')).toHaveAttribute('aria-expanded', 'false');
  });

  test('popover: opens from its trigger', async ({ page }) => {
    await page.getByTestId('pop-trigger').click();
    await expect(page.getByTestId('pop')).toBeVisible();
    await expect(page.getByTestId('pop-trigger')).toHaveAttribute('aria-expanded', 'true');
  });

  test('toast: literal on a button, a changed delivered value elsewhere', async ({ page }) => {
    await page.getByTestId('toast-btn').click();
    await expect(page.getByTestId('toasts').locator('.nojs-toast')).toHaveText(/Saved!/);
    await page.evaluate(() => (window as any).__reinit('[data-test="notice"]', 'toast', '"Second"'));
    await expect(page.getByTestId('toasts').locator('.nojs-toast')).toHaveCount(2);
    await expect(page.getByTestId('toasts')).toContainText('Second');
  });

  test('skeleton: delivered value; a re-render to false removes it', async ({ page }) => {
    await expect(page.getByTestId('skel')).toHaveAttribute('aria-busy', 'true');
    await expect(page.getByTestId('skel').locator('.nojs-skeleton-line')).toHaveCount(2);
    await page.evaluate(() => (window as any).__reinit('[data-test="skel"]', 'skeleton', 'false'));
    await expect(page.getByTestId('skel')).not.toHaveAttribute('aria-busy', 'true');
    await expect(page.getByTestId('skel').locator('.nojs-skeleton-line')).toHaveCount(0);
  });

  test('stepper: step-validate gates Next until the server delivers true', async ({ page }) => {
    const next = page.getByTestId('stepper').locator('.nojs-stepper-next');
    await next.click();
    await expect(page.getByTestId('step2')).toHaveAttribute('aria-current', 'step');
    await next.click();
    await expect(page.getByTestId('step2')).toHaveAttribute('aria-current', 'step');
    await page.evaluate(() => (window as any).__rerender('[data-test="stepper"]',
      '<div step>One</div><div step step-validate="true" data-test="step2">Two</div><div step>Three</div>'));
    await expect(page.getByTestId('step2')).toHaveAttribute('aria-current', 'step');
    await page.getByTestId('stepper').locator('.nojs-stepper-next').click();
    await expect(page.getByTestId('stepper').locator('[step]').nth(2)).toHaveAttribute('aria-current', 'step');
  });

  test('breadcrumb: manual mode', async ({ page }) => {
    await expect(page.getByTestId('crumbs').locator('[aria-current="page"]')).toHaveText('Here');
  });

  test('table: sorts the rendered rows', async ({ page }) => {
    await page.getByTestId('th-name').click();
    await expect(page.getByTestId('table').locator('tbody td')).toHaveText(['Alice', 'Bob', 'Carol']);
    await expect(page.getByTestId('th-name')).toHaveAttribute('aria-sort', 'ascending');
  });

  test('split: gutter between panes', async ({ page }) => {
    await expect(page.getByTestId('split').locator('[role="separator"]')).toHaveCount(1);
  });

  test('tree: branch toggles', async ({ page }) => {
    await page.getByTestId('branch').click();
    await expect(page.getByTestId('branch')).toHaveAttribute('aria-expanded', 'true');
  });

  test('virtual-list: windows the server-rendered rows', async ({ page }) => {
    const options = page.getByTestId('vlist').locator('[role="option"]');
    await expect(options.first()).toHaveText('Row 0');
    expect(await options.count()).toBeLessThan(20);
    await page.getByTestId('vlist').evaluate((el) => { el.scrollTop = 2000; });
    await expect(options.filter({ hasText: 'Row 100' })).toHaveCount(1);
    await expect(options.first()).toHaveAttribute('aria-setsize', '200');
  });

  test('scroll-spy: activates the visible section link', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.getElementById('s2')!.offsetTop));
    await expect(page.getByTestId('spy2')).toHaveClass(/active/);
  });
});
