import { test, expect, Page } from '@playwright/test';

// The same page with the Elements script loaded three ways: a plain script tag
// after core (sync), an async script, and a script injected after core has
// initialized the page (late). In the late and async orders core first binds
// every [validate] node against its stub.
const ORDERS = ['sync', 'async', 'late'] as const;

async function open(page: Page, order: string, warnings: string[] = []) {
  page.on('console', (msg) => {
    if (msg.type() === 'warning') warnings.push(msg.text());
  });
  await page.goto(`/e2e/examples/validation-load-order.html?order=${order}`);
  await expect(page.getByTestId('ready')).toBeVisible();
}

for (const order of ORDERS) {
  test.describe(`Validation load order: ${order}`, () => {
    for (const scope of ['outer', 'own']) {
      test(`if="$form.errors.x" renders and clears its content (state ${scope === 'outer' ? 'above the form' : 'on the form'})`, async ({ page }) => {
        await open(page, order);
        const email = page.getByTestId(`${scope}-email`);
        const message = page.getByTestId(`${scope}-message`);

        await expect(message).toHaveCount(0);
        await email.fill('nope');
        await expect(message).toHaveText('Enter a valid email address');
        await email.fill('ada@example.com');
        await expect(message).toHaveCount(0);
        await email.fill('nope again');
        await expect(message).toHaveText('Enter a valid email address');
      });

      test(`a valid submit runs on:submit (state ${scope === 'outer' ? 'above the form' : 'on the form'})`, async ({ page }) => {
        const warnings: string[] = [];
        await open(page, order, warnings);
        await expect(page.getByTestId(`${scope}-submit`)).toBeDisabled();
        await expect(page.getByTestId(`${scope}-sent`)).toBeHidden();
        await page.getByTestId(`${scope}-email`).fill('ada@example.com');
        await expect(page.getByTestId(`${scope}-submit`)).toBeEnabled();
        await page.getByTestId(`${scope}-submit`).click();
        await expect(page.getByTestId(`${scope}-sent`)).toBeVisible();
        expect(warnings.filter((w) => w.includes('Form submission blocked'))).toHaveLength(0);
      });
    }

    test('$form bindings in a form without state stay reactive', async ({ page }) => {
      await open(page, order);
      await page.getByTestId('bare-email').fill('nope');
      await expect(page.getByTestId('bare-count')).toHaveText('1');
      await page.getByTestId('bare-email').fill('ada@example.com');
      await expect(page.getByTestId('bare-count')).toHaveText('0');
    });
  });
}

test('sync: if content in a form without state renders', async ({ page }) => {
  await open(page, 'sync');
  await page.getByTestId('bare-email').fill('nope');
  await expect(page.getByTestId('bare-message')).toHaveText('Enter a valid email address');
});

test('late: a form without state that lost if content is reported', async ({ page }) => {
  const warnings: string[] = [];
  await open(page, 'late', warnings);
  await expect.poll(() => warnings.some((w) => w.includes('loaded after core processed this <form validate>'))).toBe(true);
});
