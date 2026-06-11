import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _toastContainers, _toastTimers, resetToastState } from '../src/toast/state.js';
import { _injectToastStyles } from '../src/toast/styles.js';
import { _globals } from '../../NoJS/src/globals.js';

// ─── Popover API mock for jsdom ─────────────────────────────────────
function installPopoverMock() {
  if (HTMLElement.prototype.showPopover) return;

  HTMLElement.prototype.showPopover = function () {
    if (this._popoverOpen) return;
    this._popoverOpen = true;
    const evt = new Event('toggle', { bubbles: false });
    evt.newState = 'open';
    evt.oldState = 'closed';
    this.dispatchEvent(evt);
  };

  HTMLElement.prototype.hidePopover = function () {
    if (!this._popoverOpen) return;
    this._popoverOpen = false;
    const evt = new Event('toggle', { bubbles: false });
    evt.newState = 'closed';
    evt.oldState = 'open';
    this.dispatchEvent(evt);
  };

  HTMLElement.prototype.togglePopover = function () {
    if (this._popoverOpen) this.hidePopover();
    else this.showPopover();
  };
}

// ─── Install plugin once before all tests ────────────────────────────
beforeAll(() => {
  installPopoverMock();
  NoJS.use(NoJSElements);
});

// ─── Helper: setup a toast-container element ─────────────────────────
function setupContainer(position = 'top-right') {
  const el = document.createElement('div');
  el.setAttribute('toast-container', position);
  document.body.appendChild(el);
  NoJS.processTree(el);
  return el;
}

// ─── Helper: call the $toast global function ─────────────────────────
function callToast(msg, type = 'info', duration = 3000) {
  return NoJS.toast(msg, type, duration);
}

// =======================================================================
//  TOAST CONTAINER DIRECTIVE TESTS
// =======================================================================

describe('Toast Container Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-toast]').forEach(s => s.remove());
    resetToastState();
  });

  test('1 — toast-container creates container with position data attribute', () => {
    const el = setupContainer('top-right');
    expect(el.classList.contains('nojs-toast-container')).toBe(true);
    expect(el.getAttribute('data-position')).toBe('top-right');
  });

  test('2 — invalid position defaults to top-right', () => {
    const el = setupContainer('invalid-pos');
    expect(el.getAttribute('data-position')).toBe('top-right');
  });

  test('3 — container has role="log"', () => {
    const el = setupContainer();
    expect(el.getAttribute('role')).toBe('log');
  });

  test('4 — container has aria-live="polite"', () => {
    const el = setupContainer();
    expect(el.getAttribute('aria-live')).toBe('polite');
  });

  test('5 — container has aria-relevant="additions"', () => {
    const el = setupContainer();
    expect(el.getAttribute('aria-relevant')).toBe('additions');
  });

  test('6 — container is registered in _toastContainers state', () => {
    const el = setupContainer('bottom-left');
    expect(_toastContainers.get('bottom-left')).toBe(el);
  });
});

// =======================================================================
//  $TOAST GLOBAL FUNCTION TESTS
// =======================================================================

describe('$toast Global Function', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-toast]').forEach(s => s.remove());
    resetToastState();
  });

  test('7 — $toast is registered as a global via NoJS.global()', () => {
    expect(typeof NoJS.toast).toBe('function');
    expect(_globals.toast).toBe(NoJS.toast);
  });

  test('8 — $toast creates a toast element in container', () => {
    const container = setupContainer('top-right');
    callToast('Hello', 'success');
    const toasts = container.querySelectorAll('.nojs-toast');
    expect(toasts.length).toBe(1);
    expect(toasts[0].textContent).toContain('Hello');
  });

  test('9 — toast has data-type attribute matching type arg', () => {
    setupContainer();
    const toast = callToast('Test', 'success');
    expect(toast.getAttribute('data-type')).toBe('success');
  });

  test('10 — each toast gets a unique data-toast-id', () => {
    setupContainer();
    const t1 = callToast('First');
    const t2 = callToast('Second');
    expect(t1.getAttribute('data-toast-id')).toBeTruthy();
    expect(t2.getAttribute('data-toast-id')).toBeTruthy();
    expect(t1.getAttribute('data-toast-id')).not.toBe(t2.getAttribute('data-toast-id'));
  });

  test('11 — default type is "info"', () => {
    setupContainer();
    const toast = callToast('Default type');
    expect(toast.getAttribute('data-type')).toBe('info');
  });

  test('12 — toast contains dismiss button with aria-label', () => {
    setupContainer();
    const toast = callToast('Dismissable');
    const btn = toast.querySelector('.nojs-toast-dismiss');
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('aria-label')).toBe('Dismiss');
    expect(btn.textContent).toBe('\u00d7');
  });

  test('13 — auto-creates default container when none declared', () => {
    callToast('Auto container');
    const container = document.querySelector('.nojs-toast-container');
    expect(container).not.toBeNull();
    expect(container.getAttribute('data-position')).toBe('top-right');
  });
});

// =======================================================================
//  AUTO-DISMISS TESTS (FAKE TIMERS)
// =======================================================================

describe('Toast Auto-Dismiss', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-toast]').forEach(s => s.remove());
    resetToastState();
  });

  test('14 — auto-dismisses at correct duration', () => {
    const container = setupContainer();
    callToast('Short', 'info', 1000);
    // persists before duration expires
    jest.advanceTimersByTime(999);
    expect(container.querySelectorAll('.nojs-toast').length).toBe(1);
    // fires at exact time
    jest.advanceTimersByTime(1);
    expect(container.querySelectorAll('.nojs-toast').length).toBe(0);
  });

  test('15 — duration 0 means permanent (no auto-dismiss)', () => {
    const container = setupContainer();
    callToast('Permanent', 'info', 0);
    jest.advanceTimersByTime(100000);
    expect(container.querySelectorAll('.nojs-toast').length).toBe(1);
  });

  test('16 — auto-dismiss timer is tracked in _toastTimers', () => {
    setupContainer();
    callToast('Tracked', 'info', 3000);
    expect(_toastTimers.size).toBe(1);
    jest.advanceTimersByTime(3000);
    expect(_toastTimers.size).toBe(0);
  });

  test('17 — multiple toasts dismiss independently', () => {
    const container = setupContainer();
    callToast('Short', 'info', 1000);
    callToast('Long', 'info', 5000);
    expect(container.querySelectorAll('.nojs-toast').length).toBe(2);

    jest.advanceTimersByTime(1000);
    expect(container.querySelectorAll('.nojs-toast').length).toBe(1);

    jest.advanceTimersByTime(4000);
    expect(container.querySelectorAll('.nojs-toast').length).toBe(0);
  });
});

// =======================================================================
//  MANUAL DISMISS TESTS
// =======================================================================

describe('Toast Manual Dismiss', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-toast]').forEach(s => s.remove());
    resetToastState();
  });

  test('18 — dismiss button removes toast from container', () => {
    const container = setupContainer();
    const toast = callToast('Dismiss me');
    const btn = toast.querySelector('.nojs-toast-dismiss');
    expect(container.querySelectorAll('.nojs-toast').length).toBe(1);
    btn.click();
    expect(container.querySelectorAll('.nojs-toast').length).toBe(0);
  });

  test('19 — manual dismiss clears auto-dismiss timer', () => {
    jest.useFakeTimers();
    const container = setupContainer();
    const toast = callToast('Dismiss early', 'info', 5000);
    expect(_toastTimers.size).toBe(1);

    const btn = toast.querySelector('.nojs-toast-dismiss');
    btn.click();
    expect(_toastTimers.size).toBe(0);

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});

// =======================================================================
//  MULTIPLE TOASTS / STACKING TESTS
// =======================================================================

describe('Toast Stacking', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-toast]').forEach(s => s.remove());
    resetToastState();
  });

  test('20 — multiple toasts stack in container', () => {
    const container = setupContainer();
    callToast('First');
    callToast('Second');
    callToast('Third');
    const toasts = container.querySelectorAll('.nojs-toast');
    expect(toasts.length).toBe(3);
  });

  test('21 — top-position toasts are prepended (newest first)', () => {
    const container = setupContainer('top-right');
    callToast('First');
    callToast('Second');
    const toasts = container.querySelectorAll('.nojs-toast');
    expect(toasts[0].textContent).toContain('Second');
    expect(toasts[1].textContent).toContain('First');
  });

  test('22 — bottom-position toasts are appended (newest last)', () => {
    const container = setupContainer('bottom-right');
    callToast('First');
    callToast('Second');
    const toasts = container.querySelectorAll('.nojs-toast');
    expect(toasts[0].textContent).toContain('First');
    expect(toasts[1].textContent).toContain('Second');
  });
});

// =======================================================================
//  ARIA / ACCESSIBILITY TESTS
// =======================================================================

describe('Toast ARIA', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-toast]').forEach(s => s.remove());
    resetToastState();
  });

  test('23 — error toast has aria-live="assertive"', () => {
    setupContainer();
    const toast = callToast('Error occurred', 'error');
    expect(toast.getAttribute('aria-live')).toBe('assertive');
  });

  test('24 — non-error types lack aria-live=assertive', () => {
    setupContainer();
    const infoToast = callToast('Info message', 'info');
    expect(infoToast.getAttribute('aria-live')).toBeNull();
    const successToast = callToast('Success!', 'success');
    expect(successToast.getAttribute('aria-live')).toBeNull();
  });
});

// =======================================================================
//  REACTIVE TOAST OUTSIDE CONTEXT
// =======================================================================

describe('Toast — reactive outside reactive context', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-toast]').forEach(s => s.remove());
    resetToastState();
  });

  test('25b — non-interactive toast outside reactive scope does not crash', () => {
    setupContainer();
    const div = document.createElement('div');
    div.setAttribute('toast', 'someExpr');
    document.body.appendChild(div);
    expect(() => NoJS.processTree(div)).not.toThrow();
  });
});

// =======================================================================
//  STYLE INJECTION TESTS
// =======================================================================

describe('Toast Style Injection', () => {
  afterEach(() => {
    document.querySelectorAll('style[data-nojs-toast]').forEach(s => s.remove());
  });

  test('25 — injects toast styles once', () => {
    _injectToastStyles();
    const styles = document.querySelectorAll('style[data-nojs-toast]');
    expect(styles.length).toBe(1);
    expect(styles[0].textContent).toContain('.nojs-toast-container');
    expect(styles[0].textContent).toContain('.nojs-toast');
  });

  test('26 — styles include all 6 position variants', () => {
    _injectToastStyles();
    const css = document.querySelector('style[data-nojs-toast]').textContent;
    expect(css).toContain('data-position="top-right"');
    expect(css).toContain('data-position="top-left"');
    expect(css).toContain('data-position="top-center"');
    expect(css).toContain('data-position="bottom-right"');
    expect(css).toContain('data-position="bottom-left"');
    expect(css).toContain('data-position="bottom-center"');
  });

  test('27 — calling _injectToastStyles twice does not duplicate', () => {
    _injectToastStyles();
    _injectToastStyles();
    expect(document.querySelectorAll('style[data-nojs-toast]').length).toBe(1);
  });
});

// =======================================================================
//  CLEANUP TESTS
// =======================================================================

describe('Toast Cleanup', () => {
  test('28 — resetToastState clears all active timers', () => {
    jest.useFakeTimers();
    setupContainer();
    callToast('A', 'info', 5000);
    callToast('B', 'info', 5000);
    expect(_toastTimers.size).toBe(2);

    resetToastState();
    expect(_toastTimers.size).toBe(0);

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-toast]').forEach(s => s.remove());
  });

  test('29 — resetToastState clears container references', () => {
    setupContainer('top-right');
    setupContainer('bottom-left');
    expect(_toastContainers.size).toBe(2);

    resetToastState();
    expect(_toastContainers.size).toBe(0);

    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-toast]').forEach(s => s.remove());
  });

  test('30 — dismissing all toasts cleans up container children', () => {
    const container = setupContainer();
    const t1 = callToast('A');
    const t2 = callToast('B');

    t1.querySelector('.nojs-toast-dismiss').click();
    t2.querySelector('.nojs-toast-dismiss').click();

    expect(container.querySelectorAll('.nojs-toast').length).toBe(0);

    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-toast]').forEach(s => s.remove());
    resetToastState();
  });
});
