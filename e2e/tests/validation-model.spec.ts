import { test, expect } from '@playwright/test';

test.describe('Validation with model', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/login', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }),
    );
    await page.goto('/e2e/examples/validation-model.html');
  });

  test('validate-on="blur" keeps typed values and posts them', async ({ page }) => {
    const email = page.getByTestId('blur-email');
    const password = page.getByTestId('blur-password');

    await email.click();
    await page.keyboard.type('a@b.com');
    await expect(email).toHaveValue('a@b.com');
    await page.keyboard.press('Tab');
    await expect(email).toHaveValue('a@b.com');

    await page.keyboard.type('longpassword');
    await page.keyboard.press('Tab');
    await expect(password).toHaveValue('longpassword');

    const submit = page.getByTestId('blur-submit');
    await expect(submit).toBeEnabled();
    const request = page.waitForRequest('**/api/login');
    await submit.click();
    expect(JSON.parse((await request).postData() || '{}')).toEqual({
      email: 'a@b.com',
      password: 'longpassword',
    });
  });

  test('validate-on="blur" keeps an invalid value and shows its error', async ({ page }) => {
    const email = page.getByTestId('blur-email');

    await email.click();
    await page.keyboard.type('bad');
    await expect(email).toHaveValue('bad');
    await expect(page.getByTestId('blur-email-error')).toHaveText('');
    await page.keyboard.press('Tab');

    await expect(email).toHaveValue('bad');
    await expect(page.getByTestId('blur-email-error')).toHaveText('Enter a valid email');
    await expect(email).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByTestId('blur-submit')).toBeDisabled();
  });

  test('validate-on="input" keeps every keystroke in the input and the model', async ({ page }) => {
    const name = page.getByTestId('input-name');

    await name.click();
    await page.keyboard.type('Ada');
    await expect(name).toHaveValue('Ada');
    await expect(page.getByTestId('input-echo')).toHaveText('Ada');
  });
});
