import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _accordionState } from '../src/accordion/state.js';

// ─── Mock CSS.supports so the accordion uses the non-fallback path ───
// jsdom lacks CSS.supports. Without this mock, the accordion uses
// requestAnimationFrame + transitionend to close siblings, which
// never completes in jsdom. The non-fallback path sets .open = false
// synchronously.
beforeAll(() => {
  global.CSS = { supports: () => true };
  NoJS.use(NoJSElements);
});

afterAll(() => {
  delete global.CSS;
});

// ─── Helper: build an accordion container with N details/summary pairs ─
function setupAccordion(count = 3, opts = {}) {
  const parent = document.createElement('div');
  parent.setAttribute('state', opts.state || '{}');

  const container = document.createElement('div');
  const mode = opts.mode !== undefined ? opts.mode : '';
  container.setAttribute('accordion', mode);

  for (let i = 0; i < count; i++) {
    const details = document.createElement('details');
    if (opts.openIndex === i) details.setAttribute('open', '');

    const summary = document.createElement('summary');
    summary.textContent = `Section ${i}`;
    details.appendChild(summary);

    const content = document.createElement('p');
    content.textContent = `Content for section ${i}`;
    details.appendChild(content);

    container.appendChild(details);
  }

  parent.appendChild(container);
  document.body.appendChild(parent);
  NoJS.processTree(parent);

  const detailsList = Array.from(container.querySelectorAll(':scope > details'));
  const summaries = detailsList.map(d => d.querySelector(':scope > summary'));

  return { parent, container, detailsList, summaries };
}

// =======================================================================
//  ACCORDION DIRECTIVE TESTS
// =======================================================================

describe('Accordion Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-accordion]').forEach(s => s.remove());
    _accordionState.containers.clear();
  });

  // ─── ARIA ──────────────────────────────────────────────────────────

  test('1 — sets role="group" on the container', () => {
    const { container } = setupAccordion(2);
    expect(container.getAttribute('role')).toBe('group');
  });

  // ─── Single mode (default) ────────────────────────────────────────

  test('2 — defaults to single mode when no expression given', () => {
    const { container } = setupAccordion(2);
    const state = _accordionState.containers.get(container);
    expect(state).toBeDefined();
    expect(state.mode).toBe('single');
  });

  test('3 — single mode: opening one details closes siblings', () => {
    const { detailsList } = setupAccordion(3);

    // Open first
    detailsList[0].open = true;
    detailsList[0].dispatchEvent(new Event('toggle'));
    expect(detailsList[0].open).toBe(true);

    // Open second — first should close
    detailsList[1].open = true;
    detailsList[1].dispatchEvent(new Event('toggle'));
    expect(detailsList[1].open).toBe(true);
    expect(detailsList[0].open).toBe(false);
  });

  test('4 — single mode: opening third closes second', () => {
    const { detailsList } = setupAccordion(3);

    detailsList[1].open = true;
    detailsList[1].dispatchEvent(new Event('toggle'));

    detailsList[2].open = true;
    detailsList[2].dispatchEvent(new Event('toggle'));

    expect(detailsList[2].open).toBe(true);
    expect(detailsList[1].open).toBe(false);
    expect(detailsList[0].open).toBe(false);
  });

  test('5 — single mode: closing an item does not affect others', () => {
    const { detailsList } = setupAccordion(3);

    detailsList[0].open = true;
    detailsList[0].dispatchEvent(new Event('toggle'));

    detailsList[0].open = false;
    detailsList[0].dispatchEvent(new Event('toggle'));

    expect(detailsList[0].open).toBe(false);
    expect(detailsList[1].open).toBe(false);
    expect(detailsList[2].open).toBe(false);
  });

  // ─── Multi mode ───────────────────────────────────────────────────

  test('6 — multi mode: accordion="multi" sets mode correctly', () => {
    const { container } = setupAccordion(3, { mode: 'multi' });
    const state = _accordionState.containers.get(container);
    expect(state.mode).toBe('multi');
  });

  test('7 — multi mode: all items can be open independently', () => {
    const { detailsList } = setupAccordion(3, { mode: 'multi' });

    detailsList[0].open = true;
    detailsList[0].dispatchEvent(new Event('toggle'));
    detailsList[1].open = true;
    detailsList[1].dispatchEvent(new Event('toggle'));
    detailsList[2].open = true;
    detailsList[2].dispatchEvent(new Event('toggle'));

    expect(detailsList[0].open).toBe(true);
    expect(detailsList[1].open).toBe(true);
    expect(detailsList[2].open).toBe(true);
  });

  test('8 — multi mode: closing one does not close others', () => {
    const { detailsList } = setupAccordion(3, { mode: 'multi' });

    detailsList[0].open = true;
    detailsList[0].dispatchEvent(new Event('toggle'));
    detailsList[1].open = true;
    detailsList[1].dispatchEvent(new Event('toggle'));

    detailsList[0].open = false;
    detailsList[0].dispatchEvent(new Event('toggle'));

    expect(detailsList[0].open).toBe(false);
    expect(detailsList[1].open).toBe(true);
  });

  // ─── nojs:accordion-change event ────────────────────────────────────

  test('9 — fires nojs:accordion-change event on open with correct detail', () => {
    const { container, detailsList } = setupAccordion(3);
    const events = [];
    container.addEventListener('nojs:accordion-change', (e) => events.push(e.detail));

    detailsList[1].open = true;
    detailsList[1].dispatchEvent(new Event('toggle'));

    expect(events.length).toBeGreaterThanOrEqual(1);
    const openEvt = events.find(e => e.open === true && e.element === detailsList[1]);
    expect(openEvt).toBeDefined();
    expect(openEvt.index).toBe(1);
  });

  test('10 — fires nojs:accordion-change event on close with open=false', () => {
    const { container, detailsList } = setupAccordion(3);

    detailsList[0].open = true;
    detailsList[0].dispatchEvent(new Event('toggle'));

    const events = [];
    container.addEventListener('nojs:accordion-change', (e) => events.push(e.detail));

    detailsList[0].open = false;
    detailsList[0].dispatchEvent(new Event('toggle'));

    const closeEvt = events.find(e => e.open === false && e.element === detailsList[0]);
    expect(closeEvt).toBeDefined();
    expect(closeEvt.index).toBe(0);
  });

  test('11 — nojs:accordion-change event bubbles', () => {
    const { parent, detailsList } = setupAccordion(2);
    let caught = false;
    parent.addEventListener('nojs:accordion-change', () => { caught = true; });

    detailsList[0].open = true;
    detailsList[0].dispatchEvent(new Event('toggle'));

    expect(caught).toBe(true);
  });

  // ─── Keyboard navigation ─────────────────────────────────────────

  test('12 — ArrowDown moves focus to next summary', () => {
    const { summaries } = setupAccordion(3);
    summaries[0].focus();
    summaries[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));

    expect(document.activeElement).toBe(summaries[1]);
  });

  test('13 — ArrowUp moves focus to previous summary', () => {
    const { summaries } = setupAccordion(3);
    summaries[2].focus();
    summaries[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));

    expect(document.activeElement).toBe(summaries[1]);
  });

  test('14 — ArrowDown wraps from last to first summary', () => {
    const { summaries } = setupAccordion(3);
    summaries[2].focus();
    summaries[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));

    expect(document.activeElement).toBe(summaries[0]);
  });

  test('15 — ArrowUp wraps from first to last summary', () => {
    const { summaries } = setupAccordion(3);
    summaries[0].focus();
    summaries[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));

    expect(document.activeElement).toBe(summaries[2]);
  });

  test('16 — Home key moves focus to first summary', () => {
    const { summaries } = setupAccordion(3);
    summaries[2].focus();
    summaries[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));

    expect(document.activeElement).toBe(summaries[0]);
  });

  test('17 — End key moves focus to last summary', () => {
    const { summaries } = setupAccordion(3);
    summaries[0].focus();
    summaries[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));

    expect(document.activeElement).toBe(summaries[2]);
  });

  test('18 — ArrowRight also moves focus to next summary', () => {
    const { summaries } = setupAccordion(3);
    summaries[0].focus();
    summaries[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(document.activeElement).toBe(summaries[1]);
  });

  test('19 — ArrowLeft also moves focus to previous summary', () => {
    const { summaries } = setupAccordion(3);
    summaries[1].focus();
    summaries[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));

    expect(document.activeElement).toBe(summaries[0]);
  });

  test('20 — keyboard handler ignores non-summary targets', () => {
    const { detailsList } = setupAccordion(2);
    const p = detailsList[0].querySelector('p');
    p.setAttribute('tabindex', '0');
    p.focus();
    p.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));

    expect(document.activeElement).toBe(p);
  });

  // ─── Dynamic details ─────────────────────────────────────────────

  test('21 — dynamically added details elements get picked up', async () => {
    const { container, detailsList } = setupAccordion(2);

    const newDetails = document.createElement('details');
    const newSummary = document.createElement('summary');
    newSummary.textContent = 'Dynamic Section';
    newDetails.appendChild(newSummary);
    newDetails.appendChild(document.createElement('p')).textContent = 'Dynamic content';

    container.appendChild(newDetails);

    // MutationObserver is async — wait for it
    await new Promise(r => setTimeout(r, 0));

    // In single mode, opening the new one should close existing ones
    detailsList[0].open = true;
    detailsList[0].dispatchEvent(new Event('toggle'));

    newDetails.open = true;
    newDetails.dispatchEvent(new Event('toggle'));

    expect(newDetails.open).toBe(true);
    expect(detailsList[0].open).toBe(false);
  });

  // ─── State registration ───────────────────────────────────────────

  test('22 — state is registered for accordion container', () => {
    const { container } = setupAccordion(2);
    expect(_accordionState.containers.has(container)).toBe(true);
    const state = _accordionState.containers.get(container);
    expect(state.mode).toBe('single');
    expect(state.listeners).toBeDefined();
    expect(state.listeners.length).toBe(2);
    expect(state.observer).toBeDefined();
  });

  // ─── Cleanup ──────────────────────────────────────────────────────

  test('23 — cleanup removes state and disconnects observer', () => {
    const { container } = setupAccordion(2);
    const state = _accordionState.containers.get(container);
    const observer = state.observer;
    const disconnectSpy = jest.spyOn(observer, 'disconnect');

    if (container.__disposers) {
      container.__disposers.forEach(fn => fn());
    }

    expect(_accordionState.containers.has(container)).toBe(false);
    expect(disconnectSpy).toHaveBeenCalled();
  });

  test('24 — cleanup removes toggle listeners from state', () => {
    const { container } = setupAccordion(2);
    const state = _accordionState.containers.get(container);
    expect(state.listeners.length).toBe(2);

    if (container.__disposers) {
      container.__disposers.forEach(fn => fn());
    }

    expect(state.listeners.length).toBe(0);
  });

  // ─── Nested / subaccordion scoping ────────────────────────────────

  test('25 — nested accordion scopes independently from parent', () => {
    const parent = document.createElement('div');
    parent.setAttribute('state', '{}');

    const outer = document.createElement('div');
    outer.setAttribute('accordion', '');

    const outerD1 = document.createElement('details');
    const outerS1 = document.createElement('summary');
    outerS1.textContent = 'Outer 1';
    outerD1.appendChild(outerS1);
    const outerP1 = document.createElement('p');
    outerP1.textContent = 'Outer content 1';
    outerD1.appendChild(outerP1);

    const inner = document.createElement('div');
    inner.setAttribute('accordion', '');

    const innerD1 = document.createElement('details');
    const innerS1 = document.createElement('summary');
    innerS1.textContent = 'Inner 1';
    innerD1.appendChild(innerS1);
    innerD1.appendChild(document.createElement('p')).textContent = 'Inner content 1';

    const innerD2 = document.createElement('details');
    const innerS2 = document.createElement('summary');
    innerS2.textContent = 'Inner 2';
    innerD2.appendChild(innerS2);
    innerD2.appendChild(document.createElement('p')).textContent = 'Inner content 2';

    inner.appendChild(innerD1);
    inner.appendChild(innerD2);
    outerD1.appendChild(inner);

    const outerD2 = document.createElement('details');
    const outerS2 = document.createElement('summary');
    outerS2.textContent = 'Outer 2';
    outerD2.appendChild(outerS2);
    outerD2.appendChild(document.createElement('p')).textContent = 'Outer content 2';

    outer.appendChild(outerD1);
    outer.appendChild(outerD2);
    parent.appendChild(outer);
    document.body.appendChild(parent);
    NoJS.processTree(parent);

    expect(_accordionState.containers.has(outer)).toBe(true);
    expect(_accordionState.containers.has(inner)).toBe(true);

    innerD1.open = true;
    innerD1.dispatchEvent(new Event('toggle'));
    innerD2.open = true;
    innerD2.dispatchEvent(new Event('toggle'));

    expect(innerD2.open).toBe(true);
    expect(innerD1.open).toBe(false);
    expect(outerD1.open).toBe(false);
    expect(outerD2.open).toBe(false);
  });

  // ─── Edge cases ───────────────────────────────────────────────────

  test('26 — handles container with zero details gracefully', () => {
    const parent = document.createElement('div');
    parent.setAttribute('state', '{}');

    const container = document.createElement('div');
    container.setAttribute('accordion', '');

    parent.appendChild(container);
    document.body.appendChild(parent);

    expect(() => NoJS.processTree(parent)).not.toThrow();
    expect(container.getAttribute('role')).toBe('group');
  });

  test('27 — mode expression is case-insensitive', () => {
    const { container } = setupAccordion(2, { mode: 'MULTI' });
    const state = _accordionState.containers.get(container);
    expect(state.mode).toBe('multi');
  });

  test('28 — mode expression with whitespace is trimmed', () => {
    const { container } = setupAccordion(2, { mode: '  multi  ' });
    const state = _accordionState.containers.get(container);
    expect(state.mode).toBe('multi');
  });

  test('29 — single mode with one item does not throw', () => {
    const { detailsList } = setupAccordion(1);
    detailsList[0].open = true;
    detailsList[0].dispatchEvent(new Event('toggle'));
    expect(detailsList[0].open).toBe(true);
  });

  test('30 — style injection happens only once', () => {
    setupAccordion(2);
    const stylesBefore = document.querySelectorAll('style[data-nojs-accordion]').length;

    setupAccordion(2);
    const stylesAfter = document.querySelectorAll('style[data-nojs-accordion]').length;

    expect(stylesAfter).toBe(stylesBefore);
  });
});
