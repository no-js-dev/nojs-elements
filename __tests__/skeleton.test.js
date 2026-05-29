import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';

// ─── Install the plugin once before all tests ────────────────────────
beforeAll(() => {
  NoJS.use(NoJSElements);
});

// ─── Test helper: create a skeleton element in a state context ───────
function setupSkeleton(expr, attrs = {}) {
  const parent = document.createElement('div');
  parent.setAttribute('state', attrs.state || '{ loading: true }');

  const el = document.createElement('div');
  el.setAttribute('skeleton', expr);

  for (const [k, v] of Object.entries(attrs)) {
    if (k !== 'state') el.setAttribute(k, v);
  }

  parent.appendChild(el);
  document.body.appendChild(parent);
  NoJS.processTree(parent);
  return { parent, el, ctx: parent.__ctx };
}

// =======================================================================
//  SKELETON DIRECTIVE TESTS
// =======================================================================

describe('Skeleton Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-skeleton]').forEach(s => s.remove());
  });

  test('1 -- adds .nojs-skeleton class when expression is truthy', () => {
    const { el } = setupSkeleton('loading', { state: '{ loading: true }' });
    expect(el.classList.contains('nojs-skeleton')).toBe(true);
  });

  test('2 -- does NOT add .nojs-skeleton class when expression is falsy', () => {
    const { el } = setupSkeleton('loading', { state: '{ loading: false }' });
    expect(el.classList.contains('nojs-skeleton')).toBe(false);
  });

  test('3 -- sets aria-busy=true while loading', () => {
    const { el } = setupSkeleton('loading', { state: '{ loading: true }' });
    expect(el.getAttribute('aria-busy')).toBe('true');
  });

  test('4 -- aria-busy not set when not loading', () => {
    const { el } = setupSkeleton('loading', { state: '{ loading: false }' });
    expect(el.hasAttribute('aria-busy')).toBe(false);
  });
});

// =======================================================================
//  SKELETON-TYPE TESTS
// =======================================================================

describe('Skeleton Types', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-skeleton]').forEach(s => s.remove());
  });

  test('5 -- skeleton-type=circle adds nojs-skeleton-circle class', () => {
    const { el } = setupSkeleton('loading', {
      state: '{ loading: true }',
      'skeleton-type': 'circle',
    });
    expect(el.classList.contains('nojs-skeleton')).toBe(true);
    expect(el.classList.contains('nojs-skeleton-circle')).toBe(true);
  });

  test('6 -- skeleton-size sets width and height for circle', () => {
    const { el } = setupSkeleton('loading', {
      state: '{ loading: true }',
      'skeleton-type': 'circle',
      'skeleton-size': '48',
    });
    expect(el.style.width).toBe('48px');
    expect(el.style.height).toBe('48px');
  });

  test('7 -- skeleton-size does NOT set dimensions for text type', () => {
    const { el } = setupSkeleton('loading', {
      state: '{ loading: true }',
      'skeleton-type': 'text',
      'skeleton-size': '80',
    });
    expect(el.style.width).toBe('');
    expect(el.style.height).toBe('');
  });
});

// =======================================================================
//  SKELETON-LINES TESTS
// =======================================================================

describe('Skeleton Lines', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-skeleton]').forEach(s => s.remove());
  });

  test('8 -- skeleton-lines generates placeholder line elements', () => {
    const { el } = setupSkeleton('loading', {
      state: '{ loading: true }',
      'skeleton-lines': '3',
    });
    const lines = el.querySelectorAll('.nojs-skeleton-line');
    expect(lines.length).toBe(3);
  });

  test('9 -- lines are removed when skeleton deactivates', () => {
    const { el, ctx } = setupSkeleton('loading', {
      state: '{ loading: true }',
      'skeleton-lines': '3',
    });
    expect(el.querySelectorAll('.nojs-skeleton-line').length).toBe(3);

    ctx.$set('loading', false);
    expect(el.querySelectorAll('.nojs-skeleton-line').length).toBe(0);
  });
});

// =======================================================================
//  REACTIVE BEHAVIOR TESTS
// =======================================================================

describe('Skeleton Reactive Behavior', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-skeleton]').forEach(s => s.remove());
  });

  test('10 -- removes skeleton when expression becomes falsy', () => {
    const { el, ctx } = setupSkeleton('loading', { state: '{ loading: true }' });
    expect(el.classList.contains('nojs-skeleton')).toBe(true);
    expect(el.getAttribute('aria-busy')).toBe('true');

    ctx.$set('loading', false);
    expect(el.classList.contains('nojs-skeleton')).toBe(false);
    expect(el.hasAttribute('aria-busy')).toBe(false);
  });

  test('11 -- adds nojs-skeleton-fade class on deactivation', () => {
    const { el, ctx } = setupSkeleton('loading', { state: '{ loading: true }' });
    ctx.$set('loading', false);
    expect(el.classList.contains('nojs-skeleton-fade')).toBe(true);
  });

  test('12 -- reactivates skeleton when expression becomes truthy again', () => {
    const { el, ctx } = setupSkeleton('loading', { state: '{ loading: true }' });

    // Deactivate
    ctx.$set('loading', false);
    expect(el.classList.contains('nojs-skeleton')).toBe(false);

    // Remove fade class to simulate transitionend
    el.dispatchEvent(new Event('transitionend'));
    expect(el.classList.contains('nojs-skeleton-fade')).toBe(false);

    // Reactivate
    ctx.$set('loading', true);
    expect(el.classList.contains('nojs-skeleton')).toBe(true);
    expect(el.getAttribute('aria-busy')).toBe('true');
  });

  test('13 -- circle class removed on deactivation', () => {
    const { el, ctx } = setupSkeleton('loading', {
      state: '{ loading: true }',
      'skeleton-type': 'circle',
    });
    expect(el.classList.contains('nojs-skeleton-circle')).toBe(true);

    ctx.$set('loading', false);
    expect(el.classList.contains('nojs-skeleton-circle')).toBe(false);
  });

  test('14 -- inline size cleared on deactivation (circle)', () => {
    const { el, ctx } = setupSkeleton('loading', {
      state: '{ loading: true }',
      'skeleton-type': 'circle',
      'skeleton-size': '64',
    });
    expect(el.style.width).toBe('64px');
    expect(el.style.height).toBe('64px');

    ctx.$set('loading', false);
    expect(el.style.width).toBe('');
    expect(el.style.height).toBe('');
  });
});

// =======================================================================
//  STYLE INJECTION TESTS
// =======================================================================

describe('Skeleton Style Injection', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-skeleton]').forEach(s => s.remove());
  });

  test('15 -- injects styles exactly once', () => {
    setupSkeleton('loading', { state: '{ loading: true }' });
    const styles = document.querySelectorAll('style[data-nojs-skeleton]');
    expect(styles.length).toBe(1);
    expect(styles[0].textContent).toContain('.nojs-skeleton');
    expect(styles[0].textContent).toContain('nojs-shimmer');

    // Creating another skeleton does not inject again
    setupSkeleton('loading', { state: '{ loading: true }' });
    expect(document.querySelectorAll('style[data-nojs-skeleton]').length).toBe(1);
  });
});

// =======================================================================
//  CLEANUP / DISPOSE TESTS
// =======================================================================

describe('Skeleton Cleanup', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-skeleton]').forEach(s => s.remove());
  });

  test('16 -- skeleton state starts as loading=true, deactivates cleanly', () => {
    const { el, ctx } = setupSkeleton('loading', {
      state: '{ loading: true }',
      'skeleton-type': 'circle',
      'skeleton-size': '40',
      'skeleton-lines': '2',
    });

    // Everything active
    expect(el.classList.contains('nojs-skeleton')).toBe(true);
    expect(el.classList.contains('nojs-skeleton-circle')).toBe(true);
    expect(el.getAttribute('aria-busy')).toBe('true');
    expect(el.style.width).toBe('40px');
    expect(el.querySelectorAll('.nojs-skeleton-line').length).toBe(2);

    // Deactivate
    ctx.$set('loading', false);

    // All cleaned up
    expect(el.classList.contains('nojs-skeleton')).toBe(false);
    expect(el.classList.contains('nojs-skeleton-circle')).toBe(false);
    expect(el.hasAttribute('aria-busy')).toBe(false);
    expect(el.style.width).toBe('');
    expect(el.style.height).toBe('');
    expect(el.querySelectorAll('.nojs-skeleton-line').length).toBe(0);
  });

  test('17 -- fallback timer removes fade class on next tick (no transitionend)', () => {
    jest.useFakeTimers();
    try {
      const { el, ctx } = setupSkeleton('loading', { state: '{ loading: true }' });
      ctx.$set('loading', false);
      expect(el.classList.contains('nojs-skeleton-fade')).toBe(true);

      // Fallback safety-net timer fires on the next tick (|| 0), not after 500ms.
      jest.advanceTimersByTime(0);
      expect(el.classList.contains('nojs-skeleton-fade')).toBe(false);
    } finally {
      jest.useRealTimers();
    }
  });

  test('18 -- dispose tears down pending fade timer and listener', () => {
    jest.useFakeTimers();
    const clearSpy = jest.spyOn(global, 'clearTimeout');
    try {
      const { el, ctx } = setupSkeleton('loading', { state: '{ loading: true }' });

      // Trigger a fade so a transitionend listener + fallback timer are pending.
      ctx.$set('loading', false);
      expect(el.classList.contains('nojs-skeleton-fade')).toBe(true);

      // Dispose the element while the fade is still in flight.
      const removeSpy = jest.spyOn(el, 'removeEventListener');
      el.__disposers.forEach((fn) => fn());

      // The pending fallback timer must have been cleared by the disposer.
      expect(clearSpy).toHaveBeenCalled();
      // The transitionend listener must have been removed.
      expect(removeSpy).toHaveBeenCalledWith('transitionend', expect.any(Function));

      // Advancing timers after dispose must not throw.
      expect(() => jest.advanceTimersByTime(1000)).not.toThrow();
    } finally {
      clearSpy.mockRestore();
      jest.useRealTimers();
    }
  });

  test('19 -- detached element fade callback is isConnected-guarded (no throw)', () => {
    jest.useFakeTimers();
    try {
      const { el, ctx } = setupSkeleton('loading', { state: '{ loading: true }' });
      ctx.$set('loading', false);

      // Detach the element before the fallback timer fires.
      el.remove();
      expect(el.isConnected).toBe(false);

      // Firing the safety-net timer on a detached node must not throw.
      expect(() => jest.advanceTimersByTime(0)).not.toThrow();
    } finally {
      jest.useRealTimers();
    }
  });
});
