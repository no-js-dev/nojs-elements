import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _virtualListRegistry } from '../src/virtual-list/state.js';

// ─── Mock ResizeObserver (jsdom does not provide it) ─────────────────
class MockResizeObserver {
  constructor(cb) {
    this._cb = cb;
    this._observing = new Set();
  }
  observe(el) { this._observing.add(el); }
  unobserve(el) { this._observing.delete(el); }
  disconnect() { this._observing.clear(); }
}

// ─── Mock requestAnimationFrame ─────────────────────────────────────
const origRAF = global.requestAnimationFrame;
const origCAF = global.cancelAnimationFrame;

beforeAll(() => {
  global.ResizeObserver = MockResizeObserver;
  global.requestAnimationFrame = (fn) => setTimeout(fn, 0);
  global.cancelAnimationFrame = (id) => clearTimeout(id);
  NoJS.use(NoJSElements);
});

afterAll(() => {
  delete global.ResizeObserver;
  if (origRAF) global.requestAnimationFrame = origRAF;
  if (origCAF) global.cancelAnimationFrame = origCAF;
});

// ─── Helper: build a virtual list container ──────────────────────────
function setupVirtualList(opts = {}) {
  const parent = document.createElement('div');
  const items = opts.items || Array.from({ length: 100 }, (_, i) => `Item ${i}`);
  parent.setAttribute('state', JSON.stringify({ items }));

  const container = document.createElement('div');
  container.setAttribute('virtual', '');
  if (opts.height !== undefined) {
    container.setAttribute('virtual-height', String(opts.height));
  } else {
    container.setAttribute('virtual-height', '50');
  }
  if (opts.buffer !== undefined) {
    container.setAttribute('virtual-buffer', String(opts.buffer));
  }

  // Template child with each binding
  const template = document.createElement('div');
  template.setAttribute('each', 'item in items');
  template.textContent = '{{ item }}';
  container.appendChild(template);

  // Give container dimensions (jsdom won't have real layout)
  Object.defineProperty(container, 'clientHeight', { value: opts.clientHeight || 500, configurable: true });
  Object.defineProperty(container, 'scrollTop', { value: 0, writable: true, configurable: true });

  parent.appendChild(container);
  document.body.appendChild(parent);
  NoJS.processTree(parent);

  return { parent, container, items };
}

// =======================================================================
//  VIRTUAL LIST DIRECTIVE TESTS
// =======================================================================

describe('Virtual List Directive', () => {
  afterEach(() => {
    // Clear all poll timers
    for (const [el, state] of _virtualListRegistry) {
      state.disposed = true;
    }
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-virtual-list]').forEach(s => s.remove());
    _virtualListRegistry.clear();
    jest.clearAllTimers();
  });

  // ─── Initialization ───────────────────────────────────────────────

  test('1 — sets data-nojs-virtual attribute on container', () => {
    const { container } = setupVirtualList();
    expect(container.hasAttribute('data-nojs-virtual')).toBe(true);
  });

  test('2 — state is registered in _virtualListRegistry', () => {
    const { container } = setupVirtualList();
    expect(_virtualListRegistry.has(container)).toBe(true);
  });

  test('3 — state contains correct itemHeight (fixed)', () => {
    const { container } = setupVirtualList({ height: 40 });
    const state = _virtualListRegistry.get(container);
    expect(state.itemHeight).toBe(40);
  });

  test('4 — state contains correct itemHeight (auto)', () => {
    const { container } = setupVirtualList({ height: 'auto' });
    const state = _virtualListRegistry.get(container);
    expect(state.itemHeight).toBe('auto');
  });

  test('5 — state contains correct buffer value', () => {
    const { container } = setupVirtualList({ buffer: 10 });
    const state = _virtualListRegistry.get(container);
    expect(state.buffer).toBe(10);
  });

  test('6 — buffer defaults to 5 when not specified', () => {
    const { container } = setupVirtualList();
    const state = _virtualListRegistry.get(container);
    expect(state.buffer).toBe(5);
  });

  // ─── Spacer elements ─────────────────────────────────────────────

  test('7 — creates top and bottom spacer elements', () => {
    const { container } = setupVirtualList();
    const spacers = container.querySelectorAll('.nojs-virtual-spacer');
    expect(spacers.length).toBe(2);
  });

  test('8 — spacers have aria-hidden="true"', () => {
    const { container } = setupVirtualList();
    const spacers = container.querySelectorAll('.nojs-virtual-spacer');
    spacers.forEach(spacer => {
      expect(spacer.getAttribute('aria-hidden')).toBe('true');
    });
  });

  test('9 — spacers are div elements for a div container', () => {
    const { container } = setupVirtualList();
    const spacers = container.querySelectorAll('.nojs-virtual-spacer');
    spacers.forEach(spacer => {
      expect(spacer.tagName).toBe('DIV');
    });
  });

  test('10 — spacers use <li> for <ul> containers', () => {
    const parent = document.createElement('div');
    parent.setAttribute('state', JSON.stringify({ items: ['a', 'b', 'c'] }));

    const container = document.createElement('ul');
    container.setAttribute('virtual', '');
    container.setAttribute('virtual-height', '30');

    const template = document.createElement('li');
    template.setAttribute('each', 'item in items');
    template.textContent = '{{ item }}';
    container.appendChild(template);

    Object.defineProperty(container, 'clientHeight', { value: 200, configurable: true });
    Object.defineProperty(container, 'scrollTop', { value: 0, writable: true, configurable: true });

    parent.appendChild(container);
    document.body.appendChild(parent);
    NoJS.processTree(parent);

    const spacers = container.querySelectorAll('.nojs-virtual-spacer');
    expect(spacers.length).toBe(2);
    spacers.forEach(spacer => {
      expect(spacer.tagName).toBe('LI');
    });
  });

  // ─── Template capture ─────────────────────────────────────────────

  test('11 — captures template from child with each binding', () => {
    const { container } = setupVirtualList();
    const state = _virtualListRegistry.get(container);
    expect(state.template).not.toBeNull();
    expect(state.template.nodeType).toBe(1);
  });

  test('12 — removes each/foreach/for attribute from captured template', () => {
    const { container } = setupVirtualList();
    const state = _virtualListRegistry.get(container);
    expect(state.template.hasAttribute('each')).toBe(false);
    expect(state.template.hasAttribute('foreach')).toBe(false);
    expect(state.template.hasAttribute('for')).toBe(false);
  });

  test('13 — iteratorVar is parsed from each expression', () => {
    const { container } = setupVirtualList();
    const state = _virtualListRegistry.get(container);
    expect(state.iteratorVar).toBe('item');
  });

  test('14 — arrayPath is parsed from each expression', () => {
    const { container } = setupVirtualList();
    const state = _virtualListRegistry.get(container);
    expect(state.arrayPath).toBe('items');
  });

  // ─── State properties ────────────────────────────────────────────

  test('15 — initial startIndex and endIndex are -1 (dirty)', () => {
    const { container } = setupVirtualList();
    const state = _virtualListRegistry.get(container);
    // Before first render, these are -1
    expect(state.startIndex).toBe(-1);
    expect(state.endIndex).toBe(-1);
  });

  test('16 — disposed flag starts as false', () => {
    const { container } = setupVirtualList();
    const state = _virtualListRegistry.get(container);
    expect(state.disposed).toBe(false);
  });

  test('17 — renderedNodes is an empty Map initially', () => {
    const { container } = setupVirtualList();
    const state = _virtualListRegistry.get(container);
    expect(state.renderedNodes).toBeInstanceOf(Map);
  });

  // ─── Prefix sums ─────────────────────────────────────────────────

  test('18 — prefix sums initialized with [0] for auto-height mode', () => {
    const { container } = setupVirtualList({ height: 'auto' });
    const state = _virtualListRegistry.get(container);
    expect(state.prefixSums).toBeDefined();
    expect(state.prefixSums[0]).toBe(0);
  });

  test('19 — estimatedHeight defaults to itemHeight for fixed mode', () => {
    const { container } = setupVirtualList({ height: 40 });
    const state = _virtualListRegistry.get(container);
    expect(state.estimatedHeight).toBe(40);
  });

  test('20 — estimatedHeight defaults to 50 for auto-height mode', () => {
    const { container } = setupVirtualList({ height: 'auto' });
    const state = _virtualListRegistry.get(container);
    expect(state.estimatedHeight).toBe(50);
  });

  // ─── Cleanup ──────────────────────────────────────────────────────

  test('21 — cleanup sets disposed to true', () => {
    const { container } = setupVirtualList();
    const state = _virtualListRegistry.get(container);

    if (container.__disposers) {
      container.__disposers.forEach(fn => fn());
    }

    expect(state.disposed).toBe(true);
  });

  test('22 — cleanup removes container from registry', () => {
    const { container } = setupVirtualList();

    if (container.__disposers) {
      container.__disposers.forEach(fn => fn());
    }

    expect(_virtualListRegistry.has(container)).toBe(false);
  });

  test('23 — cleanup disconnects ResizeObserver', () => {
    const { container } = setupVirtualList();
    const state = _virtualListRegistry.get(container);
    const ro = state.resizeObserver;
    expect(ro).not.toBeNull();
    const disconnectSpy = jest.spyOn(ro, 'disconnect');

    if (container.__disposers) {
      container.__disposers.forEach(fn => fn());
    }

    expect(disconnectSpy).toHaveBeenCalled();
  });

  test('24 — cleanup removes spacer elements from DOM', () => {
    const { container } = setupVirtualList();
    const state = _virtualListRegistry.get(container);
    const topSpacer = state.spacerTop;
    const bottomSpacer = state.spacerBottom;

    expect(topSpacer.parentNode).toBe(container);
    expect(bottomSpacer.parentNode).toBe(container);

    if (container.__disposers) {
      container.__disposers.forEach(fn => fn());
    }

    expect(topSpacer.parentNode).toBeNull();
    expect(bottomSpacer.parentNode).toBeNull();
  });

  test('25 — cleanup clears renderedNodes', () => {
    const { container } = setupVirtualList();
    const state = _virtualListRegistry.get(container);

    if (container.__disposers) {
      container.__disposers.forEach(fn => fn());
    }

    expect(state.renderedNodes.size).toBe(0);
  });

  // ─── Invalid config ──────────────────────────────────────────────

  test('26 — warns and skips when virtual-height is zero', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const parent = document.createElement('div');
    parent.setAttribute('state', '{}');

    const container = document.createElement('div');
    container.setAttribute('virtual', '');
    container.setAttribute('virtual-height', '0');

    const template = document.createElement('div');
    template.setAttribute('each', 'item in items');
    container.appendChild(template);

    parent.appendChild(container);
    document.body.appendChild(parent);
    NoJS.processTree(parent);

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('virtual-height must be a positive number')
    );

    warnSpy.mockRestore();
  });

  test('27 — warns and skips when virtual-height is negative', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const parent = document.createElement('div');
    parent.setAttribute('state', '{}');

    const container = document.createElement('div');
    container.setAttribute('virtual', '');
    container.setAttribute('virtual-height', '-10');

    const template = document.createElement('div');
    template.setAttribute('each', 'item in items');
    container.appendChild(template);

    parent.appendChild(container);
    document.body.appendChild(parent);
    NoJS.processTree(parent);

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('virtual-height must be a positive number')
    );

    warnSpy.mockRestore();
  });

  test('28 — warns when no child template is found', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const parent = document.createElement('div');
    parent.setAttribute('state', '{}');

    const container = document.createElement('div');
    container.setAttribute('virtual', '');
    container.setAttribute('virtual-height', '50');
    // No children at all

    parent.appendChild(container);
    document.body.appendChild(parent);
    NoJS.processTree(parent);

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('No child template found')
    );

    warnSpy.mockRestore();
  });

  // ─── Scroll handler ──────────────────────────────────────────────

  test('29 — scroll handler is attached to container', () => {
    const { container } = setupVirtualList();
    const state = _virtualListRegistry.get(container);
    expect(state.scrollHandler).toBeDefined();
    expect(typeof state.scrollHandler).toBe('function');
  });

  test('30 — cleanup removes scroll event listener', () => {
    const { container } = setupVirtualList();
    const removeSpy = jest.spyOn(container, 'removeEventListener');

    if (container.__disposers) {
      container.__disposers.forEach(fn => fn());
    }

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeSpy.mockRestore();
  });

  // ─── Style injection ─────────────────────────────────────────────

  test('31 — style injection happens only once', () => {
    setupVirtualList();
    const before = document.querySelectorAll('style[data-nojs-virtual-list]').length;

    setupVirtualList();
    const after = document.querySelectorAll('style[data-nojs-virtual-list]').length;

    expect(after).toBe(before);
  });
});
