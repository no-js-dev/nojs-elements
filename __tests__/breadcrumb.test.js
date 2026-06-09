import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _breadcrumbState } from '../src/breadcrumb/state.js';

// ─── Install the plugin once before all tests ────────────────────────
beforeAll(() => {
  NoJS.use(NoJSElements);
});

// ─── Helper: build a breadcrumb container with child <a> elements ────
function setupBreadcrumb(crumbs = [], opts = {}) {
  const parent = document.createElement('div');
  parent.setAttribute('state', opts.state || '{}');

  const tag = opts.tag || 'nav';
  const container = document.createElement(tag);
  container.setAttribute('breadcrumb', opts.expr || '');
  if (opts.ariaLabel) container.setAttribute('aria-label', opts.ariaLabel);

  for (const crumb of crumbs) {
    const a = document.createElement('a');
    a.setAttribute('href', crumb.href || '#');
    if (crumb.title) a.setAttribute('title', crumb.title);
    a.textContent = crumb.text || '';
    container.appendChild(a);
  }

  parent.appendChild(container);
  document.body.appendChild(parent);
  NoJS.processTree(parent);

  return { parent, container };
}

// =======================================================================
//  BREADCRUMB DIRECTIVE TESTS
// =======================================================================

describe('Breadcrumb Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-breadcrumb]').forEach(s => s.remove());
    _breadcrumbState.containers.clear();
  });

  // ─── Manual mode: rendering ───────────────────────────────────────

  test('1 — renders crumbs from child <a> elements', () => {
    const { container } = setupBreadcrumb([
      { href: '/', text: 'Home' },
      { href: '/products', text: 'Products' },
      { href: '/products/shoes', text: 'Shoes' },
    ]);

    const ol = container.querySelector('ol.nojs-breadcrumb');
    expect(ol).not.toBeNull();
    const items = ol.querySelectorAll('li');
    expect(items.length).toBe(3);
  });

  test('2 — intermediate crumbs are rendered as clickable <a> elements', () => {
    const { container } = setupBreadcrumb([
      { href: '/', text: 'Home' },
      { href: '/products', text: 'Products' },
      { href: '/products/shoes', text: 'Shoes' },
    ]);

    const ol = container.querySelector('ol.nojs-breadcrumb');
    const items = ol.querySelectorAll('li');

    const link0 = items[0].querySelector('a');
    expect(link0).not.toBeNull();
    expect(link0.href).toContain('/');
    expect(link0.textContent).toBe('Home');

    const link1 = items[1].querySelector('a');
    expect(link1).not.toBeNull();
    expect(link1.textContent).toBe('Products');
  });

  test('3 — last crumb gets aria-current="page" and is non-clickable', () => {
    const { container } = setupBreadcrumb([
      { href: '/', text: 'Home' },
      { href: '/products', text: 'Products' },
      { href: '/products/shoes', text: 'Shoes' },
    ]);

    const ol = container.querySelector('ol.nojs-breadcrumb');
    const items = ol.querySelectorAll('li');
    const lastItem = items[items.length - 1];

    const span = lastItem.querySelector('span');
    expect(span).not.toBeNull();
    expect(span.getAttribute('aria-current')).toBe('page');
    expect(span.textContent).toBe('Shoes');

    const link = lastItem.querySelector('a');
    expect(link).toBeNull();
  });

  // ─── Label priority ───────────────────────────────────────────────

  test('4 — title attribute takes priority over text content for labels', () => {
    const { container } = setupBreadcrumb([
      { href: '/', title: 'Home Title', text: 'Home Text' },
      { href: '/page', title: 'Page Title', text: 'Page Text' },
      { href: '/final', text: 'Final Text' },
    ]);

    const ol = container.querySelector('ol.nojs-breadcrumb');
    const items = ol.querySelectorAll('li');

    // First: title wins over text
    expect(items[0].textContent).toBe('Home Title');
    // Second: title wins over text
    expect(items[1].textContent).toBe('Page Title');
    // Third (last): text content used
    expect(items[2].textContent).toBe('Final Text');
  });

  test('5 — text content used when no title attribute is present', () => {
    const { container } = setupBreadcrumb([
      { href: '/', text: 'Home' },
      { href: '/end', text: 'End' },
    ]);

    const ol = container.querySelector('ol.nojs-breadcrumb');
    const items = ol.querySelectorAll('li');
    expect(items[0].textContent).toBe('Home');
  });

  test('6 — state crumbs reflect label priority (title over text)', () => {
    const { container } = setupBreadcrumb([
      { href: '/', title: 'Title Label', text: 'Text Label' },
      { href: '/end', text: 'End' },
    ]);

    const state = _breadcrumbState.containers.get(container);
    expect(state.crumbs[0].label).toBe('Title Label');
    expect(state.crumbs[1].label).toBe('End');
  });

  // ─── ARIA: nav label ──────────────────────────────────────────────

  test('7 — <nav> gets aria-label="Breadcrumb" by default', () => {
    const { container } = setupBreadcrumb([
      { href: '/', text: 'Home' },
      { href: '/end', text: 'End' },
    ]);

    expect(container.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  test('8 — existing aria-label on <nav> is preserved', () => {
    const { container } = setupBreadcrumb(
      [
        { href: '/', text: 'Home' },
        { href: '/end', text: 'End' },
      ],
      { ariaLabel: 'Custom Label' },
    );

    expect(container.getAttribute('aria-label')).toBe('Custom Label');
  });

  test('9 — non-nav elements do not get aria-label', () => {
    const { container } = setupBreadcrumb(
      [
        { href: '/', text: 'Home' },
        { href: '/end', text: 'End' },
      ],
      { tag: 'div' },
    );

    expect(container.hasAttribute('aria-label')).toBe(false);
  });

  // ─── OL structure ─────────────────────────────────────────────────

  test('10 — generates <ol> with class nojs-breadcrumb', () => {
    const { container } = setupBreadcrumb([
      { href: '/', text: 'Home' },
      { href: '/end', text: 'End' },
    ]);

    const ol = container.querySelector('ol.nojs-breadcrumb');
    expect(ol).not.toBeNull();
    expect(ol.tagName).toBe('OL');
  });

  test('11 — each crumb is wrapped in an <li>', () => {
    const { container } = setupBreadcrumb([
      { href: '/', text: 'Home' },
      { href: '/about', text: 'About' },
      { href: '/end', text: 'End' },
    ]);

    const ol = container.querySelector('ol.nojs-breadcrumb');
    const items = ol.querySelectorAll('li');
    expect(items.length).toBe(3);
    items.forEach(item => expect(item.tagName).toBe('LI'));
  });

  // ─── Original children hidden ─────────────────────────────────────

  test('12 — original child elements are hidden after processing', () => {
    const { container } = setupBreadcrumb([
      { href: '/', text: 'Home' },
      { href: '/end', text: 'End' },
    ]);

    const originalLinks = Array.from(container.querySelectorAll('a[href]'));
    const hiddenLinks = originalLinks.filter(a => {
      return !a.closest('ol.nojs-breadcrumb') && a.style.display === 'none';
    });
    expect(hiddenLinks.length).toBe(2);
  });

  // ─── State registration ───────────────────────────────────────────

  test('13 — state is registered for breadcrumb container', () => {
    const { container } = setupBreadcrumb([
      { href: '/', text: 'Home' },
      { href: '/end', text: 'End' },
    ]);

    expect(_breadcrumbState.containers.has(container)).toBe(true);
    const state = _breadcrumbState.containers.get(container);
    expect(state.crumbs).toBeDefined();
    expect(state.crumbs.length).toBe(2);
  });

  test('14 — state crumbs contain correct labels', () => {
    const { container } = setupBreadcrumb([
      { href: '/', text: 'Home' },
      { href: '/about', text: 'About' },
    ]);

    const state = _breadcrumbState.containers.get(container);
    expect(state.crumbs[0].label).toBe('Home');
    expect(state.crumbs[1].label).toBe('About');
  });

  test('15 — state crumbs contain correct hrefs', () => {
    const { container } = setupBreadcrumb([
      { href: '/', text: 'Home' },
      { href: '/about', text: 'About' },
    ]);

    const state = _breadcrumbState.containers.get(container);
    expect(state.crumbs[0].href).toBe('/');
    expect(state.crumbs[1].href).toBe('/about');
  });

  // ─── Cleanup ──────────────────────────────────────────────────────

  test('16 — cleanup removes state from registry', () => {
    const { container } = setupBreadcrumb([
      { href: '/', text: 'Home' },
      { href: '/end', text: 'End' },
    ]);

    expect(_breadcrumbState.containers.has(container)).toBe(true);

    if (container.__disposers) {
      container.__disposers.forEach(fn => fn());
    }

    expect(_breadcrumbState.containers.has(container)).toBe(false);
  });

  // ─── Graceful when NoJS.router does not exist ─────────────────────

  test('17 — works gracefully when NoJS.router is falsy', () => {
    expect(NoJS.router).toBeFalsy();

    expect(() => {
      setupBreadcrumb([
        { href: '/', text: 'Home' },
        { href: '/end', text: 'End' },
      ]);
    }).not.toThrow();
  });

  // ─── Edge cases ───────────────────────────────────────────────────

  test('18 — handles single crumb (last crumb with aria-current)', () => {
    const { container } = setupBreadcrumb([
      { href: '/', text: 'Home' },
    ]);

    const ol = container.querySelector('ol.nojs-breadcrumb');
    const items = ol.querySelectorAll('li');
    expect(items.length).toBe(1);

    const span = items[0].querySelector('span');
    expect(span).not.toBeNull();
    expect(span.getAttribute('aria-current')).toBe('page');
  });

  test('19 — handles empty text with fallback to empty label (skipped)', () => {
    const parent = document.createElement('div');
    parent.setAttribute('state', '{}');

    const container = document.createElement('nav');
    container.setAttribute('breadcrumb', '');

    const a = document.createElement('a');
    a.setAttribute('href', '/empty');
    container.appendChild(a);

    const a2 = document.createElement('a');
    a2.setAttribute('href', '/end');
    a2.textContent = 'End';
    container.appendChild(a2);

    parent.appendChild(container);
    document.body.appendChild(parent);
    NoJS.processTree(parent);

    const ol = container.querySelector('ol.nojs-breadcrumb');
    const items = ol.querySelectorAll('li');
    expect(items.length).toBe(1);
  });

  test('20 — style injection happens only once', () => {
    setupBreadcrumb([{ href: '/', text: 'Home' }, { href: '/end', text: 'End' }]);
    const before = document.querySelectorAll('style[data-nojs-breadcrumb]').length;

    setupBreadcrumb([{ href: '/', text: 'A' }, { href: '/b', text: 'B' }]);
    const after = document.querySelectorAll('style[data-nojs-breadcrumb]').length;

    expect(after).toBe(before);
  });

  test('21 — handles container with no children gracefully', () => {
    const parent = document.createElement('div');
    parent.setAttribute('state', '{}');

    const container = document.createElement('nav');
    container.setAttribute('breadcrumb', '');

    parent.appendChild(container);
    document.body.appendChild(parent);

    expect(() => NoJS.processTree(parent)).not.toThrow();
    expect(_breadcrumbState.containers.has(container)).toBe(true);
  });
});
