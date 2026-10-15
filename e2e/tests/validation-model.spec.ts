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

  // Record the event behind each form validation pass: every pass adds or
  // removes the pick-size error-class once.
  async function recordPasses(page) {
    await page.evaluate(() => {
      const w = window as any;
      w.__passes = [];
      const el = document.querySelector('[data-test="pick-size"]') as HTMLElement;
      for (const m of ['add', 'remove'] as const) {
        const orig = el.classList[m].bind(el.classList);
        el.classList[m] = (...c: string[]) => {
          if (c.includes('bad')) w.__passes.push(w.event ? w.event.type : 'none');
          return orig(...c);
        };
      }
    });
  }
  // Take the passes recorded since the last call, by triggering event.
  const takePasses = (page) => page.evaluate(() => {
    const w = window as any;
    const out: Record<string, number> = {};
    for (const t of w.__passes.splice(0)) out[t] = (out[t] || 0) + 1;
    return out;
  });

  test('select, checkbox and radio with model: a script-dispatched input validates, keeps the pick and syncs the model', async ({ page }) => {
    const size = page.getByTestId('pick-size');
    const agree = page.getByTestId('pick-agree');
    const blue = page.getByTestId('pick-blue');
    const echo = page.getByTestId('pick-echo');
    const validated = page.getByTestId('pick-validated');
    await expect(echo).toHaveText('a/true/red');
    await recordPasses(page);
    const input = (el, prop: string, value: unknown) =>
      el.evaluate((n, [p, v]) => {
        n[p] = v;
        n.dispatchEvent(new Event('input', { bubbles: true }));
      }, [prop, value]);

    await input(size, 'value', 'b');
    await expect(validated).toHaveText('b/true/red/-');
    await expect(size).toHaveValue('b');
    await expect(echo).toHaveText('b/true/red');
    expect(await takePasses(page)).toEqual({ input: 1 });

    await input(size, 'value', '');
    await expect(validated).toHaveText('/true/red/Required');
    await expect(size).toHaveValue('');
    await expect(size).toHaveClass(/bad/);
    await expect(echo).toHaveText('/true/red');

    // Other fields validating afterwards leave the select's pick alone.
    await input(agree, 'checked', false);
    await expect(agree).not.toBeChecked();
    await input(blue, 'checked', true);
    await expect(blue).toBeChecked();
    await expect(size).toHaveValue('');
    await expect(validated).toHaveText('/false/blue/Required');
    await expect(echo).toHaveText('/false/blue');

    for (const el of [size, agree, blue]) {
      await el.evaluate((n) => n.dispatchEvent(new Event('change', { bubbles: true })));
    }
    await expect(echo).toHaveText('/false/blue');
    await expect(validated).toHaveText('/false/blue/Required');
  });

  test('select, checkbox and radio with model: a real pick keeps it and validates once', async ({ page }) => {
    const size = page.getByTestId('pick-size');
    const agree = page.getByTestId('pick-agree');
    const blue = page.getByTestId('pick-blue');
    await expect(page.getByTestId('pick-echo')).toHaveText('a/true/red');
    await recordPasses(page);

    // input and change both fire; only input validates (as in v1.21.1)
    await size.selectOption('b');
    await expect(size).toHaveValue('b');
    await expect(page.getByTestId('pick-echo')).toHaveText('b/true/red');
    let p = await takePasses(page);
    expect(p.input).toBe(1);
    expect(p.change).toBeUndefined();

    await agree.click();
    await expect(agree).not.toBeChecked();
    p = await takePasses(page);
    expect(p.input).toBe(1);
    expect(p.change).toBeUndefined();

    await blue.click();
    await expect(blue).toBeChecked();
    p = await takePasses(page);
    expect(p.input).toBe(1);
    expect(p.change).toBeUndefined();

    await expect(page.getByTestId('pick-echo')).toHaveText('b/false/blue');
    await expect(page.getByTestId('pick-validated')).toHaveText('b/false/blue/-');
  });
});
