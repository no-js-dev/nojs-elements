import { test, expect } from '@playwright/test';

test.describe('Scroll Spy', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/examples/scroll-spy/');
    // Wait for the page to fully load and IntersectionObserver to register
    await page.waitForLoadState('networkidle');
  });

  // ─── Initial active state ──────────────────────────────────────────

  test('first spy link is active on page load', async ({ page }) => {
    const spyIntro = page.getByTestId('spy-intro');

    // The first section should be visible initially, so its spy link is active
    await expect(spyIntro).toHaveClass(/active/, { timeout: 3000 });
    await expect(spyIntro).toHaveAttribute('aria-current', 'true');
  });

  test('non-visible spy links are not active on page load', async ({ page }) => {
    const spyContact = page.getByTestId('spy-contact');

    await expect(spyContact).not.toHaveClass(/active/);
  });

  // ─── Scroll detection ──────────────────────────────────────────────

  test('scrolling to a section activates its spy link', async ({ page }) => {
    const spyFeatures = page.getByTestId('spy-features');

    // Use evaluate to scroll in-page — triggers IntersectionObserver reliably
    await page.evaluate(() => {
      document.getElementById('section-features')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });

    await expect(spyFeatures).toHaveClass(/active/, { timeout: 5000 });
  });

  test('scrolling activates the correct spy and deactivates others', async ({ page }) => {
    const spyIntro = page.getByTestId('spy-intro');
    const spyDocs = page.getByTestId('spy-docs');

    // Initially, intro should be active
    await expect(spyIntro).toHaveClass(/active/, { timeout: 3000 });

    // Scroll to the docs section
    await page.evaluate(() => {
      document.getElementById('section-docs')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });

    await expect(spyDocs).toHaveClass(/active/, { timeout: 5000 });
    // Intro spy should no longer be active
    await expect(spyIntro).not.toHaveClass(/active/);
  });

  // ─── Spy links are navigable ───────────────────────────────────────

  test('spy links have correct href attributes', async ({ page }) => {
    const spyIntro = page.getByTestId('spy-intro');
    const spyFeatures = page.getByTestId('spy-features');
    const spyDocs = page.getByTestId('spy-docs');
    const spyContact = page.getByTestId('spy-contact');

    await expect(spyIntro).toHaveAttribute('href', '#section-intro');
    await expect(spyFeatures).toHaveAttribute('href', '#section-features');
    await expect(spyDocs).toHaveAttribute('href', '#section-docs');
    await expect(spyContact).toHaveAttribute('href', '#section-contact');
  });
});
