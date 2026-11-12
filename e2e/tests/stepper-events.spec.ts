import { test, expect } from '@playwright/test';

test.describe('Stepper events', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/e2e/examples/stepper-events.html');
  });

  test('on:nojs:stepper-change runs on every step change after the first render', async ({ page }) => {
    await expect(page.getByTestId('events-changes')).toHaveText('');
    await page.getByTestId('events-next-1').click();
    await page.getByTestId('events-back').click();
    await page.getByTestId('events-next-1').click();
    await expect(page.getByTestId('events-changes')).toHaveText('2,1,2');
  });

  test('on:nojs:stepper-complete runs when next() is called on the last step', async ({ page }) => {
    await page.getByTestId('events-next-1').click();
    await expect(page.getByTestId('events-completed')).toHaveText('0');
    await page.getByTestId('events-finish').click();
    await expect(page.getByTestId('events-completed')).toHaveText('1');
    await expect(page.getByTestId('events-total')).toHaveText('2');
  });

  test('the pre-v1.15.0 names step-change and step-complete never fire', async ({ page }) => {
    await page.getByTestId('events-next-1').click();
    await page.getByTestId('events-finish').click();
    await expect(page.getByTestId('events-completed')).toHaveText('1');
    await expect(page.getByTestId('events-legacy')).toHaveText('0');
  });

  test('nojs:stepper-change bubbles to an ancestor listener, without the initial render', async ({ page }) => {
    await expect(page.getByTestId('bubble-log')).toHaveText('');
    await page.getByTestId('bubble-next').click();
    await expect(page.getByTestId('bubble-log')).toHaveText('1');
  });

  test('in linear mode nojs:stepper-complete waits for the last step to validate', async ({ page }) => {
    await page.getByTestId('linear-finish').click();
    await expect(page.getByTestId('linear-done')).toHaveText('pending');
    await page.getByTestId('linear-name').fill('Ada');
    await page.getByTestId('linear-finish').click();
    await expect(page.getByTestId('linear-done')).toHaveText('done');
  });
});
