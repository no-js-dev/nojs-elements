import { test, expect } from '@playwright/test';

test.describe('Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/validation/');
  });

  // ── Scenario 1: Basic form validation ────────────────────────────

  test('form starts with valid=false when required fields are empty', async ({ page }) => {
    await expect(page.getByTestId('form-valid')).toHaveText('false');
  });

  test('submit button is auto-disabled when form is invalid', async ({ page }) => {
    const submitBtn = page.getByTestId('submit-btn');
    await expect(submitBtn).toBeDisabled();
  });

  test('required field shows error after blur', async ({ page }) => {
    const nameInput = page.getByTestId('input-name');
    const errorName = page.getByTestId('error-name');

    // Focus and immediately blur without typing
    await nameInput.focus();
    await nameInput.blur();

    // Error should appear after field is touched
    await expect(errorName).toBeVisible();
    await expect(errorName).toHaveText('Name is required');
  });

  test('email validation rejects invalid format', async ({ page }) => {
    const emailInput = page.getByTestId('input-email');
    const errorEmail = page.getByTestId('error-email');

    // Type an invalid email and blur
    await emailInput.fill('not-an-email');
    await emailInput.blur();

    await expect(errorEmail).toBeVisible();
    await expect(errorEmail).toHaveText('Please enter a valid email');
  });

  test('email validation accepts valid format', async ({ page }) => {
    const emailInput = page.getByTestId('input-email');
    const errorEmail = page.getByTestId('error-email');

    await emailInput.fill('test@example.com');
    await emailInput.blur();

    await expect(errorEmail).not.toBeVisible();
  });

  test('min validation rejects value below minimum', async ({ page }) => {
    const ageInput = page.getByTestId('input-age');
    const errorAge = page.getByTestId('error-age');

    await ageInput.fill('10');
    await ageInput.blur();

    await expect(errorAge).toBeVisible();
    await expect(errorAge).toHaveText('You must be at least 18');
  });

  test('min validation accepts value at or above minimum', async ({ page }) => {
    const ageInput = page.getByTestId('input-age');
    const errorAge = page.getByTestId('error-age');

    await ageInput.fill('25');
    await ageInput.blur();

    await expect(errorAge).not.toBeVisible();
  });

  test('$form.valid becomes true when all fields pass', async ({ page }) => {
    await page.getByTestId('input-name').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');
    await page.getByTestId('input-age').fill('25');

    // Blur the last field to ensure validation runs
    await page.getByTestId('input-age').blur();

    await expect(page.getByTestId('form-valid')).toHaveText('true');
    await expect(page.getByTestId('error-count')).toHaveText('0');
  });

  test('submit button becomes enabled when form is valid', async ({ page }) => {
    await page.getByTestId('input-name').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');
    await page.getByTestId('input-age').fill('25');
    await page.getByTestId('input-age').blur();

    const submitBtn = page.getByTestId('submit-btn');
    await expect(submitBtn).toBeEnabled();
  });

  test('form submit triggers on:submit handler when valid', async ({ page }) => {
    await page.getByTestId('input-name').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');
    await page.getByTestId('input-age').fill('25');
    await page.getByTestId('input-age').blur();

    await page.getByTestId('submit-btn').click();

    await expect(page.getByTestId('submit-msg')).toBeVisible();
    await expect(page.getByTestId('submit-msg')).toHaveText('Form submitted!');
  });

  test('$form.errorCount tracks number of errors for interacted fields', async ({ page }) => {
    // Touch all fields but leave them empty
    await page.getByTestId('input-name').focus();
    await page.getByTestId('input-name').blur();
    await page.getByTestId('input-email').focus();
    await page.getByTestId('input-email').blur();
    await page.getByTestId('input-age').focus();
    await page.getByTestId('input-age').blur();

    // All 3 fields should have errors
    await expect(page.getByTestId('error-count')).toHaveText('3');
  });

  test('$form.firstError shows the first error message', async ({ page }) => {
    await page.getByTestId('input-name').focus();
    await page.getByTestId('input-name').blur();

    await expect(page.getByTestId('first-error')).toContainText('Name is required');
  });

  test('error-class is applied to invalid interacted fields', async ({ page }) => {
    const nameInput = page.getByTestId('input-name');

    await nameInput.focus();
    await nameInput.blur();

    await expect(nameInput).toHaveClass(/field-error/);
  });

  test('error-class is removed when field becomes valid', async ({ page }) => {
    const nameInput = page.getByTestId('input-name');

    // Make it invalid first
    await nameInput.focus();
    await nameInput.blur();
    await expect(nameInput).toHaveClass(/field-error/);

    // Now make it valid
    await nameInput.fill('John');
    await expect(nameInput).not.toHaveClass(/field-error/);
  });

  test('form reset clears errors and resets state', async ({ page }) => {
    // Fill and submit
    await page.getByTestId('input-name').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');
    await page.getByTestId('input-age').fill('25');
    await page.getByTestId('input-age').blur();

    await expect(page.getByTestId('form-valid')).toHaveText('true');

    // Reset
    await page.getByTestId('reset-btn').click();

    // After reset, form should be invalid again (fields empty)
    await expect(page.getByTestId('form-valid')).toHaveText('false');

    // Errors should be cleared (no fields interacted after reset)
    await expect(page.getByTestId('error-name')).not.toBeVisible();
    await expect(page.getByTestId('error-email')).not.toBeVisible();
    await expect(page.getByTestId('error-age')).not.toBeVisible();
  });

  // ── Scenario 2: Per-field state ──────────────────────────────────

  test('per-field dirty state tracks user input', async ({ page }) => {
    const usernameInput = page.getByTestId('input-username');

    await expect(page.getByTestId('username-dirty')).toHaveText('false');

    await usernameInput.fill('hello');

    await expect(page.getByTestId('username-dirty')).toHaveText('true');
  });

  test('per-field touched state tracks focus/blur', async ({ page }) => {
    const usernameInput = page.getByTestId('input-username');

    await expect(page.getByTestId('username-touched')).toHaveText('false');

    await usernameInput.focus();
    await usernameInput.blur();

    await expect(page.getByTestId('username-touched')).toHaveText('true');
  });

  test('per-field valid state reflects validation result', async ({ page }) => {
    const usernameInput = page.getByTestId('input-username');

    // Initially invalid (required field, empty)
    await expect(page.getByTestId('username-valid')).toHaveText('false');

    await usernameInput.fill('testuser');

    await expect(page.getByTestId('username-valid')).toHaveText('true');
  });

  test('per-field error shows after interaction', async ({ page }) => {
    const usernameInput = page.getByTestId('input-username');

    // Touch and leave empty
    await usernameInput.focus();
    await usernameInput.blur();

    await expect(page.getByTestId('username-error')).toBeVisible();
  });

  // ── Scenario 3: Validate-on triggers ─────────────────────────────

  test('validate-on="focusout": no error shown on input event alone', async ({ page }) => {
    const focusInput = page.getByTestId('input-focus');
    const errorFocus = page.getByTestId('error-focus');

    // Type something then clear it — error should not appear just from typing
    await focusInput.fill('x');
    await focusInput.fill('');

    // The error should still not be visible (focusout-only trigger)
    await expect(errorFocus).not.toBeVisible();
  });

  test('validate-on="focusout": error appears after blur', async ({ page }) => {
    const focusInput = page.getByTestId('input-focus');
    const errorFocus = page.getByTestId('error-focus');

    await focusInput.focus();
    await focusInput.blur();

    await expect(errorFocus).toBeVisible();
    await expect(errorFocus).toHaveText('This field is required');
  });

  // ── Scenario 4: Error template ───────────────────────────────────

  test('error template renders when field is invalid and interacted', async ({ page }) => {
    const tplInput = page.getByTestId('input-tpl');

    // Touch the field and leave empty
    await tplInput.focus();
    await tplInput.blur();

    const rendered = page.getByTestId('tpl-error-rendered');
    await expect(rendered).toBeVisible();
    await expect(rendered).toContainText('Required');
  });

  test('error template is removed when field becomes valid', async ({ page }) => {
    const tplInput = page.getByTestId('input-tpl');

    // Make invalid
    await tplInput.focus();
    await tplInput.blur();
    await expect(page.getByTestId('tpl-error-rendered')).toBeVisible();

    // Make valid
    await tplInput.fill('something');
    await expect(page.getByTestId('tpl-error-rendered')).not.toBeVisible();
  });

  test('typing into a templated field renders the error template once', async ({ page }) => {
    const tplInput = page.getByTestId('input-tpl');
    const rendered = page.getByTestId('tpl-error-rendered');

    await tplInput.fill('a');
    await expect(rendered).toHaveCount(0);

    await tplInput.fill('');
    await expect(rendered).toHaveCount(1);
    await expect(rendered).toHaveText('Required');

    await tplInput.fill('b');
    await expect(rendered).toHaveCount(0);
  });

  // ── Scenario 5: Conditional validation ───────────────────────────

  test('validate-if: excluded field does not affect form validity', async ({ page }) => {
    // When checkbox is unchecked, company field is excluded
    await expect(page.getByTestId('cond-form-valid')).toHaveText('true');
  });

  test('validate-if: enabling condition makes field required', async ({ page }) => {
    // Toggle checkbox to enable company field validation
    await page.getByTestId('toggle-company').click();

    // Now form should be invalid (company is empty + required)
    await expect(page.getByTestId('cond-form-valid')).toHaveText('false');
  });

  test('validate-if: filling conditional field restores validity', async ({ page }) => {
    await page.getByTestId('toggle-company').click();
    await expect(page.getByTestId('cond-form-valid')).toHaveText('false');

    await page.getByTestId('input-company').fill('Acme Inc');

    await expect(page.getByTestId('cond-form-valid')).toHaveText('true');
  });

  // ── Scenario 6: Multiple rules (native pattern + maxlength) ──────

  test('native pattern validation rejects non-matching input', async ({ page }) => {
    const zipInput = page.getByTestId('input-zip');
    const errorZip = page.getByTestId('error-zip');

    await zipInput.fill('abc');
    await zipInput.blur();

    await expect(errorZip).toBeVisible();
  });

  test('native pattern validation accepts matching input', async ({ page }) => {
    const zipInput = page.getByTestId('input-zip');
    const errorZip = page.getByTestId('error-zip');

    await zipInput.fill('12345');
    await zipInput.blur();

    await expect(errorZip).not.toBeVisible();
  });

  // ── Accessibility ────────────────────────────────────────────────

  test('form has novalidate attribute to suppress browser popups', async ({ page }) => {
    const form = page.getByTestId('basic-form');
    await expect(form).toHaveAttribute('novalidate', '');
  });
});
