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

  test('checkbox and select with model keep the user choice', async ({ page }) => {
    const agree = page.getByTestId('choice-agree');
    const size = page.getByTestId('choice-size');

    await agree.click();
    await expect(agree).toBeChecked();
    await size.selectOption('b');
    await expect(size).toHaveValue('b');
    await expect(page.getByTestId('choice-echo')).toHaveText('true/b');

    await agree.click();
    await expect(agree).not.toBeChecked();
    await expect(page.getByTestId('choice-echo')).toHaveText('false/b');
  });

  test('without model, on:input reads $form.fields for the current keystroke', async ({ page }) => {
    await page.getByTestId('plain-code').click();
    await page.keyboard.type('a@b.co');
    await expect(page.getByTestId('plain-log')).toHaveText('FFFFTT');
  });

  test('without model, on:focusout sees the field touched with its error', async ({ page }) => {
    await page.getByTestId('plain-mail').click();
    await page.getByTestId('plain-code').click();
    await expect(page.getByTestId('plain-seen')).toHaveText('true:Required');
  });

  test('without model, aria-invalid follows typing before blur', async ({ page }) => {
    const mail = page.getByTestId('plain-mail');
    await mail.click();
    await page.keyboard.type('bad');
    await expect(mail).toHaveAttribute('aria-invalid', 'true');
  });
});
