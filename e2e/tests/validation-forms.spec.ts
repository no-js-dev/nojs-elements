import { test, expect } from '@playwright/test';

test.describe('Validation forms', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/register', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }),
    );
    await page.goto('/e2e/examples/validation-forms.html');
  });

  // ── Without validate-on, model choice controls keep the user's pick ──

  test('a model select keeps the picked option in a form without validate-on', async ({ page }) => {
    const size = page.getByTestId('choice-size');

    await size.selectOption('b');
    await expect(size).toHaveValue('b');
    await expect(page.getByTestId('choice-echo')).toHaveText('b/false/red/');
    await expect(page.getByTestId('choice-validated')).toHaveText('b/false/red/');
  });

  test('a model checkbox keeps its check in a form without validate-on', async ({ page }) => {
    const agree = page.getByTestId('choice-agree');

    await agree.click();
    await expect(agree).toBeChecked();
    await expect(page.getByTestId('choice-echo')).toHaveText('a/true/red/');
    await agree.click();
    await expect(agree).not.toBeChecked();
    await expect(page.getByTestId('choice-echo')).toHaveText('a/false/red/');
  });

  test('a model radio keeps its pick in a form without validate-on', async ({ page }) => {
    const blue = page.getByTestId('choice-blue');

    await blue.click();
    await expect(blue).toBeChecked();
    await expect(page.getByTestId('choice-red')).not.toBeChecked();
    await expect(page.getByTestId('choice-echo')).toHaveText('a/false/blue/');
    await expect(page.getByTestId('choice-validated')).toHaveText('a/false/blue/');
  });

  test('a model text field still validates on every keystroke', async ({ page }) => {
    const name = page.getByTestId('choice-name');

    await name.click();
    await page.keyboard.type('Ada');
    await expect(name).toHaveValue('Ada');
    await expect(page.getByTestId('choice-validated')).toHaveText('a/false/red/Ada');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await expect(name).toHaveAttribute('aria-invalid', 'true');
    await expect(name).toHaveClass(/bad/);
  });

  test('the docs Complete Example: the shipping checkbox reveals and validates the address', async ({ page }) => {
    const ship = page.getByTestId('complete-ship');
    const submit = page.getByTestId('complete-submit');

    await page.getByTestId('complete-name').fill('Ada');
    await page.getByTestId('complete-email').fill('ada@example.com');
    await page.getByTestId('complete-age').fill('30');
    await expect(submit).toBeEnabled();

    await ship.click();
    await expect(ship).toBeChecked();
    await expect(page.getByTestId('complete-address')).toBeVisible();
    await expect(submit).toBeDisabled();

    await page.getByTestId('complete-street').fill('Main St');
    await page.getByTestId('complete-city').fill('Lisbon');
    await expect(submit).toBeEnabled();

    const request = page.waitForRequest('**/api/register');
    await submit.click();
    expect(JSON.parse((await request).postData() || '{}')).toMatchObject({
      name: 'Ada', email: 'ada@example.com', street: 'Main St', city: 'Lisbon',
    });
  });

  // ── validate-if exclusion ────────────────────────────────────────────

  test('a field excluded by validate-if drops aria-invalid, its error-class and its error template', async ({ page }) => {
    const code = page.getByTestId('if-code');

    await code.click();
    await page.keyboard.type('x');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Tab');
    await expect(code).toHaveAttribute('aria-invalid', 'true');
    await expect(code).toHaveClass(/bad/);
    await expect(page.getByTestId('if-code-error')).toHaveText('Required');

    await page.getByTestId('if-toggle').click();
    await expect(page.getByTestId('if-toggle')).not.toBeChecked();
    await expect(code).not.toHaveAttribute('aria-invalid');
    await expect(code).not.toHaveClass(/bad/);
    await expect(page.getByTestId('if-code-error')).toHaveCount(0);
    await expect(page.getByTestId('if-submit')).toBeEnabled();

    await page.getByTestId('if-toggle').click();
    await expect(code).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByTestId('if-code-error')).toHaveText('Required');
  });

  // ── Submit buttons ───────────────────────────────────────────────────

  test('submit buttons: automatic, auto-disable="off" with bind-disabled, and auto-disable="off" alone', async ({ page }) => {
    const title = page.getByTestId('btn-title');
    const auto = page.getByTestId('btn-auto');
    const changed = page.getByTestId('btn-changed');
    const always = page.getByTestId('btn-always');

    await expect(title).toHaveValue('Draft');
    await expect(auto).toBeEnabled();
    await expect(changed).toBeDisabled();
    await expect(always).toBeEnabled();

    await title.fill('Draft 2');
    await expect(changed).toBeEnabled();

    await title.fill('');
    await expect(auto).toBeDisabled();
    await expect(changed).toBeDisabled();
    await expect(always).toBeEnabled();

    await always.click();
    await expect(page.getByTestId('btn-error')).toHaveText('Required');
    await expect(page.getByTestId('btn-sent')).toHaveText('0');

    await title.fill('Final');
    await changed.click();
    await expect(page.getByTestId('btn-sent')).toHaveText('1');
    await expect(auto).toBeEnabled();
    await expect(changed).toBeEnabled();
  });

  test('the docs auto-disable="off" examples: save after a change, sign up shows errors on click', async ({ page }) => {
    let profile = 0;
    let signup = 0;
    await page.route('**/api/profile', (route) => { profile++; return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }); });
    await page.route('**/api/signup', (route) => { signup++; return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }); });
    const save = page.getByTestId('optout-save');
    const signupBtn = page.getByTestId('optout-signup-btn');

    await expect(page.getByTestId('optout-name')).toHaveValue('Ada');
    await expect(save).toBeDisabled();
    await page.getByTestId('optout-name').fill('Ada L.');
    await expect(save).toBeEnabled();
    const request = page.waitForRequest('**/api/profile');
    await save.click();
    await request;
    await expect(save).toBeEnabled();
    expect(profile).toBe(1);

    await expect(signupBtn).toBeEnabled();
    await signupBtn.click();
    await expect(page.getByTestId('optout-email-error')).toHaveText('Required');
    await expect(signupBtn).toBeEnabled();
    expect(signup).toBe(0);

    await page.getByTestId('optout-email').fill('ada@example.com');
    const signupRequest = page.waitForRequest('**/api/signup');
    await signupBtn.click();
    await signupRequest;
    expect(signup).toBe(1);
  });

  // ── Custom validators ────────────────────────────────────────────────

  test('custom:matchPassword and sameAs:password compare against the password field', async ({ page }) => {
    await page.getByTestId('match-password').fill('secret');
    await page.getByTestId('match-confirm').fill('other');
    await page.getByTestId('match-again').fill('other');
    await expect(page.getByTestId('match-error')).toHaveText('Passwords do not match');
    await expect(page.getByTestId('match-again-error')).toHaveText('Must match password');

    await page.getByTestId('match-confirm').fill('secret');
    await page.getByTestId('match-again').fill('secret');
    await expect(page.getByTestId('match-error')).toHaveText('');
    await expect(page.getByTestId('match-again-error')).toHaveText('');
  });
});
