import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _splitRegistry, _paneRegistry, _resizeState } from '../src/split/state.js';

// ─── Polyfill setPointerCapture for jsdom ────────────────────────────
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = jest.fn();
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = jest.fn();
}

// ─── Install the plugin once before all tests ────────────────────────
beforeAll(() => {
  NoJS.use(NoJSElements);
});

// ─── Helper: build a split container with panes ─────────────────────
function setupSplit(direction, paneAttrs = [{}, {}]) {
  const parent = document.createElement('div');
  parent.setAttribute('state', '{}');

  const splitEl = document.createElement('div');
  splitEl.setAttribute('split', direction || '');

  paneAttrs.forEach((attrs, i) => {
    const pane = document.createElement('div');
    pane.setAttribute('pane', attrs.size || '');
    if (attrs.min) pane.setAttribute('pane-min', String(attrs.min));
    if (attrs.max) pane.setAttribute('pane-max', String(attrs.max));
    if (attrs.collapsible) pane.setAttribute('pane-collapsible', 'true');
    pane.textContent = `Pane ${i}`;
    splitEl.appendChild(pane);
  });

  for (const [k, v] of Object.entries(paneAttrs[0]._splitAttrs || {})) {
    splitEl.setAttribute(k, v);
  }

  parent.appendChild(splitEl);
  document.body.appendChild(parent);
  NoJS.processTree(parent);
  return { parent, splitEl };
}

// Overload helper that accepts split-level attributes
function setupSplitWithAttrs(direction, splitAttrs = {}, paneAttrs = [{}, {}]) {
  const parent = document.createElement('div');
  parent.setAttribute('state', '{}');

  const splitEl = document.createElement('div');
  splitEl.setAttribute('split', direction || '');
  for (const [k, v] of Object.entries(splitAttrs)) {
    splitEl.setAttribute(k, v);
  }

  paneAttrs.forEach((attrs, i) => {
    const pane = document.createElement('div');
    pane.setAttribute('pane', attrs.size || '');
    if (attrs.min) pane.setAttribute('pane-min', String(attrs.min));
    if (attrs.max) pane.setAttribute('pane-max', String(attrs.max));
    if (attrs.collapsible) pane.setAttribute('pane-collapsible', 'true');
    pane.textContent = `Pane ${i}`;
    splitEl.appendChild(pane);
  });

  parent.appendChild(splitEl);
  document.body.appendChild(parent);
  NoJS.processTree(parent);
  return { parent, splitEl };
}

// ─── Helper: create a PointerEvent (jsdom lacks PointerEvent) ───────
function createPointerEvent(type, opts = {}) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'clientX', { value: opts.clientX || 0, writable: false });
  Object.defineProperty(event, 'clientY', { value: opts.clientY || 0, writable: false });
  Object.defineProperty(event, 'pointerId', { value: opts.pointerId || 1, writable: false });
  Object.defineProperty(event, 'button', { value: opts.button !== undefined ? opts.button : 0, writable: false });
  event.setPointerCapture = jest.fn();
  event.releasePointerCapture = jest.fn();
  return event;
}

// =======================================================================
//  SPLIT DIRECTIVE TESTS
// =======================================================================

describe('Split Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-split]').forEach(s => s.remove());
    _splitRegistry.clear();
    _paneRegistry.clear();
    _resizeState.active = false;
  });

  test('1 — creates horizontal split by default', () => {
    const { splitEl } = setupSplit('');
    expect(splitEl.classList.contains('nojs-split')).toBe(true);
    expect(splitEl.getAttribute('data-direction')).toBe('horizontal');
  });

  test('2 — split="vertical" for vertical layout', () => {
    const { splitEl } = setupSplit('vertical');
    expect(splitEl.getAttribute('data-direction')).toBe('vertical');
  });

  test('3 — gutter has correct attributes', () => {
    const { splitEl } = setupSplit('horizontal');
    const gutters = splitEl.querySelectorAll('.nojs-gutter');
    expect(gutters.length).toBe(1);

    const gutter = gutters[0];
    expect(gutter.getAttribute('role')).toBe('separator');
    expect(gutter.getAttribute('tabindex')).toBe('0');
    // horizontal split -> vertical separator
    expect(gutter.getAttribute('aria-orientation')).toBe('vertical');
  });

  test('4 — multiple panes get multiple gutters', () => {
    const { splitEl } = setupSplit('horizontal', [{}, {}, {}]);
    const gutters = splitEl.querySelectorAll('.nojs-gutter');
    expect(gutters.length).toBe(2);
  });

  test('5 — vertical split gutter has horizontal aria-orientation', () => {
    const { splitEl } = setupSplit('vertical');
    const gutter = splitEl.querySelector('.nojs-gutter');
    expect(gutter.getAttribute('aria-orientation')).toBe('horizontal');
  });

  test('6 — injects split styles once', () => {
    setupSplit('horizontal');
    const styles = document.querySelectorAll('style[data-nojs-split]');
    expect(styles.length).toBe(1);
    expect(styles[0].textContent).toContain('.nojs-split');
    expect(styles[0].textContent).toContain('.nojs-gutter');
    expect(styles[0].textContent).toContain('.nojs-pane');

    // Creating another split doesn't inject again
    setupSplit('vertical');
    expect(document.querySelectorAll('style[data-nojs-split]').length).toBe(1);
  });
});

// =======================================================================
//  PANE DIRECTIVE TESTS
// =======================================================================

describe('Pane Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-split]').forEach(s => s.remove());
    _splitRegistry.clear();
    _paneRegistry.clear();
    _resizeState.active = false;
  });

  test('7 — pane registered in _paneRegistry with size/min/max', () => {
    const { splitEl } = setupSplit('horizontal', [
      { size: '200px', min: 100, max: 400 },
      { size: '300px' },
    ]);
    const panes = splitEl.querySelectorAll('.nojs-pane');
    const info = _paneRegistry.get(panes[0]);
    expect(info).toBeDefined();
    expect(info.size).toBe('200px');
    expect(info.min).toBe(100);
    expect(info.max).toBe(400);
  });

  test('8 — pane min/max applied as CSS constraints', () => {
    const { splitEl } = setupSplit('horizontal', [
      { min: 100, max: 500 },
      {},
    ]);
    const pane = splitEl.querySelectorAll('.nojs-pane')[0];
    expect(pane.style.minWidth).toBe('100px');
    expect(pane.style.maxWidth).toBe('500px');
  });

  test('9 — pane-collapsible registers collapsible flag', () => {
    const { splitEl } = setupSplit('horizontal', [
      { collapsible: true },
      {},
    ]);
    const pane = splitEl.querySelectorAll('.nojs-pane')[0];
    const info = _paneRegistry.get(pane);
    expect(info.collapsible).toBe(true);
  });

  test('10 — pane initial size sets flexBasis', () => {
    const { splitEl } = setupSplit('horizontal', [
      { size: '250px' },
      {},
    ]);
    const pane = splitEl.querySelectorAll('.nojs-pane')[0];
    expect(pane.style.flexBasis).toBe('250px');
    expect(pane.style.flexGrow).toBe('0');
  });

  test('11 — pane without size gets flexGrow=1', () => {
    const { splitEl } = setupSplit('horizontal', [{}, {}]);
    const pane = splitEl.querySelectorAll('.nojs-pane')[0];
    expect(pane.style.flexGrow).toBe('1');
  });
});

// =======================================================================
//  POINTER DRAG RESIZE TESTS
// =======================================================================

describe('Split Pointer Drag', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-split]').forEach(s => s.remove());
    _splitRegistry.clear();
    _paneRegistry.clear();
    _resizeState.active = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });

  test('12 — pointerdown on gutter activates resize state', () => {
    const { splitEl } = setupSplit('horizontal', [{ size: '200px' }, { size: '200px' }]);
    const gutter = splitEl.querySelector('.nojs-gutter');

    gutter.dispatchEvent(createPointerEvent('pointerdown', { clientX: 200 }));
    expect(_resizeState.active).toBe(true);
    expect(_resizeState.gutterEl).toBe(gutter);
  });

  test('13 — pointermove updates pane flexBasis', () => {
    const { splitEl } = setupSplit('horizontal', [{ size: '200px' }, { size: '200px' }]);
    const gutter = splitEl.querySelector('.nojs-gutter');
    const panes = splitEl.querySelectorAll('.nojs-pane');

    // Mock offsetWidth so resize math works
    Object.defineProperty(panes[0], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(splitEl, 'offsetWidth', { value: 406, configurable: true });
    Object.defineProperty(gutter, 'offsetWidth', { value: 6, configurable: true });

    gutter.dispatchEvent(createPointerEvent('pointerdown', { clientX: 200 }));
    gutter.dispatchEvent(createPointerEvent('pointermove', { clientX: 230 }));

    // Prev pane should grow by 30, next should shrink by 30
    expect(panes[0].style.flexBasis).toBe('230px');
    expect(panes[1].style.flexBasis).toBe('170px');
  });

  test('14 — pointerup deactivates resize and dispatches split-resize', () => {
    const { splitEl } = setupSplit('horizontal', [{ size: '200px' }, { size: '200px' }]);
    const gutter = splitEl.querySelector('.nojs-gutter');
    const panes = splitEl.querySelectorAll('.nojs-pane');

    Object.defineProperty(panes[0], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(splitEl, 'offsetWidth', { value: 406, configurable: true });
    Object.defineProperty(gutter, 'offsetWidth', { value: 6, configurable: true });

    let resizeDetail = null;
    splitEl.addEventListener('split-resize', (e) => { resizeDetail = e.detail; });

    gutter.dispatchEvent(createPointerEvent('pointerdown', { clientX: 200 }));
    gutter.dispatchEvent(createPointerEvent('pointerup'));

    expect(_resizeState.active).toBe(false);
    expect(resizeDetail).not.toBeNull();
    expect(resizeDetail.prevPane).toBe(panes[0]);
    expect(resizeDetail.nextPane).toBe(panes[1]);
  });

  test('15 — right-click (button !== 0) does not start resize', () => {
    const { splitEl } = setupSplit('horizontal', [{ size: '200px' }, { size: '200px' }]);
    const gutter = splitEl.querySelector('.nojs-gutter');

    gutter.dispatchEvent(createPointerEvent('pointerdown', { button: 2 }));
    expect(_resizeState.active).toBe(false);
  });
});

// =======================================================================
//  KEYBOARD RESIZE TESTS
// =======================================================================

describe('Split Keyboard', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-split]').forEach(s => s.remove());
    _splitRegistry.clear();
    _paneRegistry.clear();
    _resizeState.active = false;
  });

  function setupKeyboardSplit() {
    const { splitEl } = setupSplit('horizontal', [
      { size: '200px', min: 50 },
      { size: '200px', min: 50 },
    ]);
    const gutter = splitEl.querySelector('.nojs-gutter');
    const panes = splitEl.querySelectorAll('.nojs-pane');

    Object.defineProperty(panes[0], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 200, configurable: true });

    return { splitEl, gutter, panes };
  }

  test('16 — ArrowRight increases prev pane by STEP', () => {
    const { gutter, panes } = setupKeyboardSplit();

    gutter.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    // prev pane: 200 + 10 = 210
    expect(panes[0].style.flexBasis).toBe('210px');
    expect(panes[1].style.flexBasis).toBe('190px');
  });

  test('17 — ArrowLeft decreases prev pane by STEP', () => {
    const { gutter, panes } = setupKeyboardSplit();

    gutter.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));

    expect(panes[0].style.flexBasis).toBe('190px');
    expect(panes[1].style.flexBasis).toBe('210px');
  });

  test('18 — Home collapses prev pane to min', () => {
    const { gutter, panes } = setupKeyboardSplit();

    gutter.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));

    expect(panes[0].style.flexBasis).toBe('50px');
    expect(panes[1].style.flexBasis).toBe('350px');
  });

  test('19 — End expands prev pane to max (consuming next pane to min)', () => {
    const { gutter, panes } = setupKeyboardSplit();

    gutter.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));

    // next pane min is 50, so prev gets 400 - 50 = 350
    expect(panes[0].style.flexBasis).toBe('350px');
    expect(panes[1].style.flexBasis).toBe('50px');
  });

  test('20 — vertical split uses ArrowDown/ArrowUp', () => {
    const { splitEl } = setupSplit('vertical', [
      { size: '200px', min: 50 },
      { size: '200px', min: 50 },
    ]);
    const gutter = splitEl.querySelector('.nojs-gutter');
    const panes = splitEl.querySelectorAll('.nojs-pane');

    Object.defineProperty(panes[0], 'offsetHeight', { value: 200, configurable: true });
    Object.defineProperty(panes[1], 'offsetHeight', { value: 200, configurable: true });

    gutter.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(panes[0].style.flexBasis).toBe('210px');

    // Reset mock sizes for next key
    Object.defineProperty(panes[0], 'offsetHeight', { value: 210, configurable: true });
    Object.defineProperty(panes[1], 'offsetHeight', { value: 190, configurable: true });

    gutter.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(panes[0].style.flexBasis).toBe('200px');
  });
});

// =======================================================================
//  COLLAPSIBLE PANE TESTS
// =======================================================================

describe('Split Collapsible (double-click)', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-split]').forEach(s => s.remove());
    _splitRegistry.clear();
    _paneRegistry.clear();
    _resizeState.active = false;
  });

  test('21 — double-click gutter collapses collapsible pane', () => {
    const { splitEl } = setupSplit('horizontal', [
      { size: '200px', collapsible: true },
      { size: '200px' },
    ]);
    const gutter = splitEl.querySelector('.nojs-gutter');
    const panes = splitEl.querySelectorAll('.nojs-pane');

    Object.defineProperty(panes[0], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 200, configurable: true });

    gutter.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));

    expect(panes[0].style.flexBasis).toBe('0px');
    expect(panes[0].getAttribute('data-collapsed')).toBe('true');
  });

  test('22 — second double-click expands collapsed pane', () => {
    const { splitEl } = setupSplit('horizontal', [
      { size: '200px', collapsible: true },
      { size: '200px' },
    ]);
    const gutter = splitEl.querySelector('.nojs-gutter');
    const panes = splitEl.querySelectorAll('.nojs-pane');

    Object.defineProperty(panes[0], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 200, configurable: true });

    // Collapse
    gutter.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
    expect(panes[0].getAttribute('data-collapsed')).toBe('true');

    // Update mock sizes for expand calculation
    Object.defineProperty(panes[0], 'offsetWidth', { value: 0, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 400, configurable: true });

    // Expand
    gutter.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
    expect(panes[0].hasAttribute('data-collapsed')).toBe(false);
    expect(panes[0].style.flexBasis).not.toBe('0px');
  });

  test('23 — dispatches split-collapse event', () => {
    const { splitEl } = setupSplit('horizontal', [
      { size: '200px', collapsible: true },
      { size: '200px' },
    ]);
    const gutter = splitEl.querySelector('.nojs-gutter');
    const panes = splitEl.querySelectorAll('.nojs-pane');

    Object.defineProperty(panes[0], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 200, configurable: true });

    let detail = null;
    splitEl.addEventListener('split-collapse', (e) => { detail = e.detail; });

    gutter.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));

    expect(detail).not.toBeNull();
    expect(detail.pane).toBe(panes[0]);
    expect(detail.collapsed).toBe(true);
  });

  test('24 — non-collapsible panes ignore double-click', () => {
    const { splitEl } = setupSplit('horizontal', [{}, {}]);
    const gutter = splitEl.querySelector('.nojs-gutter');
    const panes = splitEl.querySelectorAll('.nojs-pane');

    Object.defineProperty(panes[0], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 200, configurable: true });

    let detail = null;
    splitEl.addEventListener('split-collapse', (e) => { detail = e.detail; });

    gutter.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));

    expect(detail).toBeNull();
  });
});

// =======================================================================
//  PERSISTENCE TESTS
// =======================================================================

describe('Split Persistence', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-split]').forEach(s => s.remove());
    _splitRegistry.clear();
    _paneRegistry.clear();
    _resizeState.active = false;
    localStorage.clear();
  });

  test('25 — split-persist saves sizes to localStorage on resize', () => {
    const { splitEl } = setupSplitWithAttrs('horizontal', { 'split-persist': 'my-split' }, [
      { size: '200px' },
      { size: '200px' },
    ]);
    const gutter = splitEl.querySelector('.nojs-gutter');
    const panes = splitEl.querySelectorAll('.nojs-pane');

    Object.defineProperty(panes[0], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(splitEl, 'offsetWidth', { value: 406, configurable: true });
    Object.defineProperty(gutter, 'offsetWidth', { value: 6, configurable: true });

    gutter.dispatchEvent(createPointerEvent('pointerdown', { clientX: 200 }));
    gutter.dispatchEvent(createPointerEvent('pointermove', { clientX: 250 }));
    gutter.dispatchEvent(createPointerEvent('pointerup'));

    const stored = localStorage.getItem('nojs-split:my-split');
    expect(stored).not.toBeNull();
    const sizes = JSON.parse(stored);
    expect(sizes.length).toBe(2);
  });

  test('26 — split-persist restores sizes on init', () => {
    // Pre-seed localStorage
    localStorage.setItem('nojs-split:restore-test', JSON.stringify(['150px', '250px']));

    const { splitEl } = setupSplitWithAttrs('horizontal', { 'split-persist': 'restore-test' }, [
      { size: '200px' },
      { size: '200px' },
    ]);
    const panes = splitEl.querySelectorAll('.nojs-pane');

    expect(panes[0].style.flexBasis).toBe('150px');
    expect(panes[1].style.flexBasis).toBe('250px');
  });

  test('27 — keyboard resize persists sizes', () => {
    const { splitEl } = setupSplitWithAttrs('horizontal', { 'split-persist': 'kb-persist' }, [
      { size: '200px', min: 50 },
      { size: '200px', min: 50 },
    ]);
    const gutter = splitEl.querySelector('.nojs-gutter');
    const panes = splitEl.querySelectorAll('.nojs-pane');

    Object.defineProperty(panes[0], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 200, configurable: true });

    gutter.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    const stored = localStorage.getItem('nojs-split:kb-persist');
    expect(stored).not.toBeNull();
  });
});

// =======================================================================
//  HARDENING TESTS (ELEM-33)
// =======================================================================

describe('Split Hardening (ELEM-33)', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-split]').forEach(s => s.remove());
    _splitRegistry.clear();
    _paneRegistry.clear();
    _resizeState.active = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });

  // ── Finding #4 (pane.js): removeProperty must use kebab-case names ──
  test('28 — pane dispose clears inline min/max via kebab-case removeProperty', () => {
    const { splitEl } = setupSplit('horizontal', [
      { min: 100, max: 400 },
      {},
    ]);
    const pane = splitEl.querySelectorAll('.nojs-pane')[0];
    expect(pane.style.minWidth).toBe('100px');
    expect(pane.style.maxWidth).toBe('400px');

    // Run the pane's disposer
    (pane.__disposers || []).forEach((fn) => fn());

    expect(pane.style.minWidth).toBe('');
    expect(pane.style.maxWidth).toBe('');
    expect(pane.style.flexBasis).toBe('');
    expect(pane.style.flexGrow).toBe('');
  });

  // ── Finding #40 (split.js:133): RTL inverts horizontal drag delta ──
  test('29 — RTL horizontal drag inverts the resize direction', () => {
    const parent = document.createElement('div');
    parent.setAttribute('state', '{}');
    parent.setAttribute('dir', 'rtl');

    const splitEl = document.createElement('div');
    splitEl.setAttribute('split', 'horizontal');
    [{ size: '200px' }, { size: '200px' }].forEach((attrs, i) => {
      const pane = document.createElement('div');
      pane.setAttribute('pane', attrs.size);
      pane.textContent = `Pane ${i}`;
      splitEl.appendChild(pane);
    });
    parent.appendChild(splitEl);
    document.body.appendChild(parent);
    NoJS.processTree(parent);

    const gutter = splitEl.querySelector('.nojs-gutter');
    const panes = splitEl.querySelectorAll('.nojs-pane');
    Object.defineProperty(panes[0], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(splitEl, 'offsetWidth', { value: 406, configurable: true });
    Object.defineProperty(gutter, 'offsetWidth', { value: 6, configurable: true });

    // Pointer moves +30 in client coords; under RTL the prev pane should SHRINK.
    gutter.dispatchEvent(createPointerEvent('pointerdown', { clientX: 200 }));
    gutter.dispatchEvent(createPointerEvent('pointermove', { clientX: 230 }));

    expect(panes[0].style.flexBasis).toBe('170px');
    expect(panes[1].style.flexBasis).toBe('230px');
  });

  test('30 — LTR horizontal drag keeps natural direction (sign = 1)', () => {
    const { splitEl } = setupSplit('horizontal', [{ size: '200px' }, { size: '200px' }]);
    const gutter = splitEl.querySelector('.nojs-gutter');
    const panes = splitEl.querySelectorAll('.nojs-pane');
    Object.defineProperty(panes[0], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(splitEl, 'offsetWidth', { value: 406, configurable: true });
    Object.defineProperty(gutter, 'offsetWidth', { value: 6, configurable: true });

    gutter.dispatchEvent(createPointerEvent('pointerdown', { clientX: 200 }));
    gutter.dispatchEvent(createPointerEvent('pointermove', { clientX: 230 }));

    expect(panes[0].style.flexBasis).toBe('230px');
    expect(panes[1].style.flexBasis).toBe('170px');
  });

  // ── Finding #48 (split.js:220): keyboard re-clamps prev after rebalance ──
  test('31 — keyboard resize re-clamps prev pane after balancing next', () => {
    // prev max 250, next max 120, total 400, prev currently 200.
    // ArrowLeft requests prev=190; rebalancing onto next clamps next to its
    // max (120), which pushes the rebalanced prev to 280 (> its own max 250).
    // The fix re-clamps prev back to 250 and gives the remainder (150) to next.
    const { splitEl } = setupSplit('horizontal', [
      { size: '200px', max: 250 },
      { size: '200px', max: 120 },
    ]);
    const gutter = splitEl.querySelector('.nojs-gutter');
    const panes = splitEl.querySelectorAll('.nojs-pane');
    Object.defineProperty(panes[0], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 200, configurable: true });

    gutter.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));

    // prev must respect its own max (250); remainder (150) goes to next.
    expect(panes[0].style.flexBasis).toBe('250px');
    expect(panes[1].style.flexBasis).toBe('150px');
  });

  // ── Finding #49 (split.js:259): expand resolves percentage restore size ──
  test('32 — double-click expand resolves a percentage pre-collapse size to px', () => {
    const { splitEl } = setupSplit('horizontal', [
      { collapsible: true },
      {},
    ]);
    const gutter = splitEl.querySelector('.nojs-gutter');
    const panes = splitEl.querySelectorAll('.nojs-pane');
    const info = _paneRegistry.get(panes[0]);

    Object.defineProperty(panes[0], 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 200, configurable: true });

    // Simulate a collapsed pane whose stored size is a percentage string.
    info.collapsed = true;
    info.preCollapseSize = '25%';
    panes[0].setAttribute('data-collapsed', 'true');
    panes[0].style.flexBasis = '0px';

    // total = 0 (collapsed) + 200 = wait, mocks above. Expand:
    Object.defineProperty(panes[0], 'offsetWidth', { value: 0, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 400, configurable: true });

    gutter.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));

    // total = 400; 25% → 100px for target, 300px for the sibling.
    expect(panes[0].style.flexBasis).toBe('100px');
    expect(panes[1].style.flexBasis).toBe('300px');
  });

  test('33 — double-click expand clamps a restore size larger than the total', () => {
    const { splitEl } = setupSplit('horizontal', [
      { collapsible: true },
      {},
    ]);
    const gutter = splitEl.querySelector('.nojs-gutter');
    const panes = splitEl.querySelectorAll('.nojs-pane');
    const info = _paneRegistry.get(panes[0]);

    info.collapsed = true;
    info.preCollapseSize = '9999px';
    panes[0].setAttribute('data-collapsed', 'true');
    panes[0].style.flexBasis = '0px';

    Object.defineProperty(panes[0], 'offsetWidth', { value: 0, configurable: true });
    Object.defineProperty(panes[1], 'offsetWidth', { value: 300, configurable: true });

    gutter.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));

    // Sibling basis must never go negative.
    expect(panes[0].style.flexBasis).toBe('300px');
    expect(panes[1].style.flexBasis).toBe('0px');
  });
});
