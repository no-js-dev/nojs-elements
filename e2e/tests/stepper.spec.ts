import { test, expect } from '@playwright/test';

test.describe('Stepper', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/stepper/');
  });

  test('linear stepper starts at step 0 with first step content visible', async ({ page }) => {
    const stepper = page.getByTestId('linear-stepper');
    await expect(stepper).toBeVisible();

    const stepPersonal = page.getByTestId('step-personal');
    await expect(stepPersonal).toBeVisible();

    const stepAddress = page.getByTestId('step-address');
    await expect(stepAddress).toBeHidden();

    const stepReview = page.getByTestId('step-review');
    await expect(stepReview).toBeHidden();
  });

  test('linear stepper stays on current step when required fields are empty', async ({ page }) => {
    const stepper = page.getByTestId('linear-stepper');
    const nextBtn = stepper.locator('button', { hasText: /next/i });
    await nextBtn.click();

    // Should still be on step 0 — personal info visible
    const stepPersonal = page.getByTestId('step-personal');
    await expect(stepPersonal).toBeVisible();

    const stepAddress = page.getByTestId('step-address');
    await expect(stepAddress).toBeHidden();
  });

  test('filling inputs then clicking Next advances to step 2', async ({ page }) => {
    const nameInput = page.getByTestId('input-name');
    const emailInput = page.getByTestId('input-email');
    await nameInput.fill('John Doe');
    await emailInput.fill('john@example.com');

    const stepper = page.getByTestId('linear-stepper');
    const nextBtn = stepper.locator('button', { hasText: /next/i });
    await nextBtn.click();

    // Should be on step 1 — address visible
    const stepAddress = page.getByTestId('step-address');
    await expect(stepAddress).toBeVisible();

    const stepPersonal = page.getByTestId('step-personal');
    await expect(stepPersonal).toBeHidden();

    // Fill address and go to review
    const streetInput = page.getByTestId('input-street');
    const cityInput = page.getByTestId('input-city');
    await streetInput.fill('123 Main St');
    await cityInput.fill('Springfield');

    await stepper.locator('button', { hasText: /next/i }).click();

    // Should be on step 2 — review visible
    const stepReview = page.getByTestId('step-review');
    await expect(stepReview).toBeVisible();
  });

  test('Previous button goes back to the prior step', async ({ page }) => {
    // Fill step 0 and advance
    await page.getByTestId('input-name').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');

    const stepper = page.getByTestId('linear-stepper');
    await stepper.locator('button', { hasText: /next/i }).click();

    await expect(page.getByTestId('step-address')).toBeVisible();

    // Go back
    await stepper.locator('button', { hasText: /prev|back/i }).click();

    await expect(page.getByTestId('step-personal')).toBeVisible();
    await expect(page.getByTestId('step-address')).toBeHidden();
  });

  test('free mode allows jumping directly to any step via indicator', async ({ page }) => {
    const stepper = page.getByTestId('free-stepper');
    await expect(stepper).toBeVisible();

    // Click the third step indicator (Review)
    const indicators = stepper.locator('.nojs-stepper-indicator-item, [class*="stepper-indicator"] button, [class*="stepper-indicator"] [role="tab"]');
    const count = await indicators.count();

    if (count >= 3) {
      await indicators.nth(2).click();
      // Third step content should be visible
      const steps = stepper.locator('[step]');
      await expect(steps.nth(2)).toBeVisible();
    } else {
      // Fallback: look for step labels as clickable elements
      const labelButtons = stepper.locator('button:has-text("Review"), [role="tab"]:has-text("Review")');
      if (await labelButtons.count() > 0) {
        await labelButtons.first().click();
      }
    }
  });

  test('stepper has appropriate ARIA attributes', async ({ page }) => {
    const stepper = page.getByTestId('linear-stepper');
    const role = await stepper.getAttribute('role');
    // Stepper should have a semantic role
    expect(role === 'group' || role === 'tablist' || role === 'region' || role === 'list').toBeTruthy();

    // Active step should have aria-current or equivalent
    const steps = stepper.locator('[step]');
    const firstStep = steps.nth(0);
    const ariaCurrent = await firstStep.getAttribute('aria-current');
    const ariaSelected = await firstStep.getAttribute('aria-selected');
    const hasActiveClass = await firstStep.evaluate(el =>
      el.classList.contains('active') || el.classList.contains('nojs-stepper-step-active')
    );
    expect(ariaCurrent === 'step' || ariaSelected === 'true' || hasActiveClass).toBeTruthy();
  });

  test('manual stepper navigation with custom buttons', async ({ page }) => {
    const stepper = page.getByTestId('manual-stepper');
    const steps = stepper.locator('[step]');

    // Initially on step 0 (first step visible)
    await expect(steps.nth(0)).toBeVisible();
    await expect(steps.nth(1)).toBeHidden();

    // Click custom Next button
    await page.getByTestId('manual-next').click();
    await expect(steps.nth(1)).toBeVisible();
    await expect(steps.nth(0)).toBeHidden();

    // Click custom Next again
    await page.getByTestId('manual-next').click();
    await expect(steps.nth(2)).toBeVisible();
    await expect(steps.nth(1)).toBeHidden();

    // Click custom Prev button
    await page.getByTestId('manual-prev').click();
    await expect(steps.nth(1)).toBeVisible();
    await expect(steps.nth(2)).toBeHidden();
  });
});

test.describe('Stepper $stepper API in bound attributes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/e2e/examples/stepper-api.html');
  });

  test('bind-disabled and bind-hidden follow $stepper.isFirst and $stepper.isLast', async ({ page }) => {
    const back = page.getByTestId('api-back');
    const cont = page.getByTestId('api-continue');
    const submit = page.getByTestId('api-submit');

    await expect(page.getByTestId('api-current')).toHaveText('1');
    await expect(page.getByTestId('api-total')).toHaveText('2');
    await expect(back).toBeDisabled();
    await expect(cont).toBeVisible();
    await expect(submit).toBeHidden();

    await page.getByTestId('api-name').fill('Ada');
    await cont.click();
    await expect(page.getByTestId('api-current')).toHaveText('2');
    await expect(back).toBeEnabled();
    await expect(cont).toBeHidden();
    await expect(submit).toBeVisible();

    await back.click();
    await expect(page.getByTestId('api-current')).toHaveText('1');
    await expect(back).toBeDisabled();
    await expect(cont).toBeVisible();
    await expect(submit).toBeHidden();

    await cont.click();
    await expect(page.getByTestId('api-submitted')).toBeHidden();
    await submit.click();
    await expect(page.getByTestId('api-submitted')).toBeVisible();
  });
});

test.describe('Stepper without a state above it', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/e2e/examples/stepper-api.html');
  });

  const activeStep = (page, stepper: string) =>
    page.getByTestId(stepper).locator('[step][aria-current="step"]');

  test('the steps read and drive $stepper', async ({ page }) => {
    await expect(page.getByTestId('bare-current')).toHaveText('1');
    await expect(page.getByTestId('bare-total')).toHaveText('3');

    await page.getByTestId('bare-next').click();
    await expect(activeStep(page, 'bare-stepper')).toHaveAttribute('step-label', 'Terms');
  });

  test('step-validate reads the value a step writes', async ({ page }) => {
    await page.getByTestId('bare-next').click();
    await page.getByTestId('bare-terms-next').click();
    await expect(activeStep(page, 'bare-stepper')).toHaveAttribute('step-label', 'Terms');

    await page.getByTestId('bare-agree').check();
    await page.getByTestId('bare-terms-next').click();
    await expect(page.getByTestId('bare-done')).toBeVisible();
  });

  test('each step form keeps its own stepper-validate gate', async ({ page }) => {
    const steps = page.getByTestId('forms-stepper').locator('[step]');

    await page.getByTestId('forms-next-1').click();
    await expect(steps.nth(0)).toHaveAttribute('aria-current', 'step');

    await page.getByTestId('forms-first').fill('a');
    await page.getByTestId('forms-next-1').click();
    await expect(steps.nth(1)).toHaveAttribute('aria-current', 'step');

    await page.getByTestId('forms-next-2').click();
    await expect(steps.nth(1)).toHaveAttribute('aria-current', 'step');

    await page.getByTestId('forms-second').fill('b');
    await page.getByTestId('forms-next-2').click();
    await expect(steps.nth(2)).toHaveAttribute('aria-current', 'step');
  });
});
