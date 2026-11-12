import { test, expect, Page } from '@playwright/test';

// validate on the NoJS-Server host API (compiled sites, ADR-028): the
// plugin reports facts and owns novalidate + the submit auto-disable.
// The page stands in for the integrator's plugin host.

const execs = (page: Page) => page.evaluate(() => (window as any).__execs);
const order = (page: Page) => page.evaluate(() => (window as any).__order);

test.describe('Validation (host backend)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/e2e/examples/validation-host.html');
  });

  test('sets novalidate, runs no validator and sends the init facts with real native validity', async ({ page }) => {
    await expect(page.getByTestId('form')).toHaveAttribute('novalidate', '');
    await expect.poll(async () => (await execs(page)).length).toBe(1);
    // In flight: the button stays clickable until the envelope arrives.
    await expect(page.getByTestId('submit')).toBeEnabled();
    await page.evaluate(() => (window as any).__envelope('signup'));
    await expect(page.getByTestId('submit')).toBeDisabled();
    const [init] = await execs(page);
    expect(init.key).toBe('vk-signup');
    expect(init.payload.trigger).toBe('init');
    expect(init.payload.values).toEqual({ name: '', email: '', agree: false });
    expect(init.payload.native.name.flags).toEqual(['valueMissing']);
    expect(init.payload.native.name.message.length).toBeGreaterThan(0);
    expect(await page.evaluate(() => (window as any).__warns)).toEqual([]);
  });

  test('typing is debounced, focusout flushes; buttons stay enabled while facts are pending', async ({ page }) => {
    await expect.poll(async () => (await execs(page)).length).toBe(1);
    await page.evaluate(() => (window as any).__envelope('signup'));
    await expect(page.getByTestId('submit')).toBeDisabled();

    await page.getByTestId('email').fill('bad');
    await expect(page.getByTestId('submit')).toBeEnabled();
    await expect.poll(async () => (await execs(page)).length).toBe(2);
    const typed = (await execs(page))[1].payload;
    expect(typed).toMatchObject({ trigger: 'input', field: 'email', values: { email: 'bad' } });
    expect(typed.native.email.flags).toEqual(['typeMismatch']);
    await expect(page.getByTestId('submit')).toBeEnabled();     // still in flight

    await page.evaluate(() => (window as any).__envelope('signup'));
    await expect(page.getByTestId('submit')).toBeDisabled();    // envelope: still invalid

    await page.getByTestId('email').fill('ana@example.com');
    await page.getByTestId('agree').click();                     // focusout of email flushes its input
    const triggers = (await execs(page)).slice(2).map((e: any) => `${e.payload.trigger}:${e.payload.field}`);
    // The blur fires `change` (collapsed with a waiting input) before
    // focusout; under load the debounce may already have sent the input.
    const upTo = triggers.indexOf('focusout:email');
    expect(upTo).toBeGreaterThan(0);
    for (const t of triggers.slice(0, upTo)) expect(['input:email', 'change:email']).toContain(t);
    await page.evaluate(() => (window as any).__envelope('signup', { valid: true, submitting: false, pending: false, reset: 0 }));
    await expect(page.getByTestId('submit')).toBeEnabled();
  });

  test('a submit sends waiting facts before the integrator dispatches it and is never blocked', async ({ page }) => {
    await expect.poll(async () => (await execs(page)).length).toBe(1);
    await page.getByTestId('name').fill('Ana');
    await page.getByTestId('name').press('Enter');
    // Under load the debounce may fire before Enter, and the blur-less
    // submit may add a `change`: whatever was sent, the facts precede the
    // submit action and nothing waits behind it.
    await expect.poll(async () => (await order(page)).at(-1)).toBe('submit-action:signup');
    const seen: string[] = await order(page);
    expect(seen[0]).toBe('facts:init');
    expect(seen.slice(1, -1).length).toBeGreaterThan(0);
    for (const o of seen.slice(1, -1)) expect(['facts:input', 'facts:change']).toContain(o);
  });

  test('per-field validate-on: input and focusout of the field only; reset counter resets the form', async ({ page }) => {
    const code = page.getByTestId('code');
    await code.fill('x1');
    await code.blur();
    await expect.poll(async () => (await execs(page)).filter((e: any) => e.key === 'vk-perfield')
      .map((e: any) => `${e.payload.trigger}:${e.payload.field}`)).toEqual(['input:code', 'focusout:code']);
    await page.evaluate(() => (window as any).__envelope('perfield', { valid: true, submitting: false, pending: false, reset: 1 }));
    await expect(code).toHaveValue('');
  });

  test('a standalone field reports its value to its own action', async ({ page }) => {
    await page.getByTestId('standalone').fill('hey');
    await expect.poll(async () => (await execs(page)).filter((e: any) => e.key === 'vk-q').map((e: any) => e.payload))
      .toEqual([{ trigger: 'input', value: 'hey' }]);
  });
});
