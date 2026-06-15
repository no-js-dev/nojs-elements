import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';

// ─── Install the plugin once before all tests ────────────────────────
beforeAll(() => {
  NoJS.use(NoJSElements);
});

// ─── Helper: build a tooltip trigger element ─────────────────────────
function setupTooltip(text, attrs = {}) {
  const parent = document.createElement('div');
  parent.setAttribute('state', attrs.state || '{}');
  const el = document.createElement('button');
  el.setAttribute('tooltip', text);
  el.textContent = 'Hover me';
  for (const [k, v] of Object.entries(attrs)) {
    if (k !== 'state') el.setAttribute(k, v);
  }
  parent.appendChild(el);
  document.body.appendChild(parent);
  NoJS.processTree(parent);
  return { parent, el };
}

// ─── Helper: build a popover + trigger pair ──────────────────────────
function setupPopover(popoverId, attrs = {}) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('state', attrs.state || '{}');

  // Popover element
  const popoverEl = document.createElement('div');
  popoverEl.setAttribute('popover', popoverId);
  popoverEl.textContent = 'Popover content';
  if (attrs['popover-position']) {
    popoverEl.setAttribute('popover-position', attrs['popover-position']);
  }

  // Trigger element
  const triggerEl = document.createElement('button');
  triggerEl.setAttribute('popover-trigger', popoverId);
  triggerEl.textContent = 'Toggle';

  wrapper.appendChild(popoverEl);
  wrapper.appendChild(triggerEl);
  document.body.appendChild(wrapper);
  NoJS.processTree(wrapper);
  return { wrapper, popoverEl, triggerEl };
}

// =======================================================================
//  TOOLTIP DIRECTIVE TESTS
// =======================================================================

describe('Tooltip Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tooltip]').forEach(s => s.remove());
  });

  test('1 - creates tooltip element with role="tooltip"', () => {
    const { el } = setupTooltip('Hello tooltip');
    const tooltipId = el.getAttribute('aria-describedby');
    expect(tooltipId).toBeTruthy();
    // Tooltip is not in DOM until shown, but it was created internally
    // Trigger mouseenter to append it
    el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    jest.advanceTimersByTime(300);
    const tooltipEl = document.getElementById(tooltipId);
    expect(tooltipEl).not.toBeNull();
    expect(tooltipEl.getAttribute('role')).toBe('tooltip');
  });

  test('2 - tooltip text matches attribute value', () => {
    const { el } = setupTooltip('My tooltip text');
    el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    jest.advanceTimersByTime(300);
    const tooltipId = el.getAttribute('aria-describedby');
    const tooltipEl = document.getElementById(tooltipId);
    expect(tooltipEl.textContent).toBe('My tooltip text');
  });

  test('3 - shows on mouseenter, hides on mouseleave', () => {
    const { el } = setupTooltip('Mouse tooltip');
    const tooltipId = el.getAttribute('aria-describedby');

    // Not yet visible before mouseenter
    el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    let tooltipEl = document.getElementById(tooltipId);
    expect(tooltipEl).toBeNull();

    // Advance past default 300ms delay — tooltip should appear
    jest.advanceTimersByTime(300);
    tooltipEl = document.getElementById(tooltipId);
    expect(tooltipEl).not.toBeNull();
    expect(tooltipEl.getAttribute('aria-hidden')).toBe('false');

    // Mouseleave — tooltip should be removed
    el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    tooltipEl = document.getElementById(tooltipId);
    expect(tooltipEl).toBeNull();
  });

  test('4 - shows on focusin, hides on focusout', () => {
    const { el } = setupTooltip('Focus tooltip');
    const tooltipId = el.getAttribute('aria-describedby');

    // Show on focusin
    el.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    jest.advanceTimersByTime(300);
    let tooltipEl = document.getElementById(tooltipId);
    expect(tooltipEl).not.toBeNull();
    expect(tooltipEl.getAttribute('aria-hidden')).toBe('false');

    // Hide on focusout
    el.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    expect(document.getElementById(tooltipId)).toBeNull();
  });

  test('5 - hides tooltip on Escape key', () => {
    const { el } = setupTooltip('Escape me');
    const tooltipId = el.getAttribute('aria-describedby');

    el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    jest.advanceTimersByTime(300);
    expect(document.getElementById(tooltipId)).not.toBeNull();

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(document.getElementById(tooltipId)).toBeNull();
  });

  test('6 - respects tooltip-delay attribute', () => {
    const { el } = setupTooltip('Custom delay', { 'tooltip-delay': '500' });
    const tooltipId = el.getAttribute('aria-describedby');

    el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

    // 300ms should not be enough
    jest.advanceTimersByTime(300);
    expect(document.getElementById(tooltipId)).toBeNull();

    // 500ms total should be enough
    jest.advanceTimersByTime(200);
    expect(document.getElementById(tooltipId)).not.toBeNull();
  });

  test('7 - mouseleave cancels pending show timer', () => {
    const { el } = setupTooltip('Cancel me');
    const tooltipId = el.getAttribute('aria-describedby');

    el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    // Leave before delay expires
    jest.advanceTimersByTime(100);
    el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    jest.advanceTimersByTime(300);

    expect(document.getElementById(tooltipId)).toBeNull();
  });

  test('8 - multiple tooltips get unique IDs', () => {
    const { el: el1 } = setupTooltip('First');
    const { el: el2 } = setupTooltip('Second');
    const id1 = el1.getAttribute('aria-describedby');
    const id2 = el2.getAttribute('aria-describedby');
    expect(id1).not.toBe(id2);
  });

  test('9 - empty tooltip value skips setup (no aria-describedby)', () => {
    const parent = document.createElement('div');
    parent.setAttribute('state', '{}');
    const el = document.createElement('button');
    el.setAttribute('tooltip', '');
    parent.appendChild(el);
    document.body.appendChild(parent);
    NoJS.processTree(parent);

    expect(el.hasAttribute('aria-describedby')).toBe(false);
  });
});

// =======================================================================
//  TOOLTIP STYLE INJECTION TESTS
// =======================================================================

describe('Tooltip Style Injection', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tooltip]').forEach(s => s.remove());
  });

  test('10 - injects <style data-nojs-tooltip> once', () => {
    setupTooltip('Inject styles');
    const styles = document.querySelectorAll('style[data-nojs-tooltip]');
    expect(styles.length).toBe(1);
    expect(styles[0].textContent).toContain('.nojs-tooltip');
  });

  test('11 - does not duplicate styles on multiple tooltips', () => {
    setupTooltip('First');
    setupTooltip('Second');
    setupTooltip('Third');
    expect(document.querySelectorAll('style[data-nojs-tooltip]').length).toBe(1);
  });
});

// =======================================================================
//  POPOVER DIRECTIVE TESTS
// =======================================================================

describe('Popover Directive', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tooltip]').forEach(s => s.remove());
  });

  test('12 - sets popover="auto" on the popover element', () => {
    const { popoverEl } = setupPopover('my-popover');
    expect(popoverEl.getAttribute('popover')).toBe('auto');
  });

  test('13 - popover trigger has correct ARIA attributes', () => {
    const { triggerEl } = setupPopover('my-popover');
    expect(triggerEl.getAttribute('aria-haspopup')).toBe('dialog');
    expect(triggerEl.getAttribute('aria-expanded')).toBe('false');
    expect(triggerEl.getAttribute('aria-controls')).toBe('my-popover');
  });

  test('14 - click on trigger calls togglePopover', () => {
    const { popoverEl, triggerEl } = setupPopover('toggle-test');
    popoverEl.togglePopover = jest.fn();

    triggerEl.click();
    expect(popoverEl.togglePopover).toHaveBeenCalledTimes(1);
  });

  test('15 - toggle event syncs aria-expanded on triggers', () => {
    const { popoverEl, triggerEl } = setupPopover('aria-sync');

    // Simulate toggle open
    popoverEl.dispatchEvent(new CustomEvent('toggle', {
      bubbles: false,
      detail: {},
    }));
    // The toggle event in popover API uses newState
    const openEvt = new Event('toggle');
    Object.defineProperty(openEvt, 'newState', { value: 'open' });
    popoverEl.dispatchEvent(openEvt);

    expect(triggerEl.getAttribute('aria-expanded')).toBe('true');

    // Simulate toggle close
    const closeEvt = new Event('toggle');
    Object.defineProperty(closeEvt, 'newState', { value: 'closed' });
    popoverEl.dispatchEvent(closeEvt);

    expect(triggerEl.getAttribute('aria-expanded')).toBe('false');
  });

  test('16 - popover-dismiss closes closest popover ancestor', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');

    const popoverEl = document.createElement('div');
    popoverEl.setAttribute('popover', 'dismiss-test');
    popoverEl.hidePopover = jest.fn();

    const dismissBtn = document.createElement('button');
    dismissBtn.setAttribute('popover-dismiss', '');
    popoverEl.appendChild(dismissBtn);

    wrapper.appendChild(popoverEl);
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);

    dismissBtn.click();
    expect(popoverEl.hidePopover).toHaveBeenCalledTimes(1);
  });

  test('17 - popover-dismiss skips when not inside a popover', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');
    const btn = document.createElement('button');
    btn.setAttribute('popover-dismiss', '');
    wrapper.appendChild(btn);
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);

    // Should not throw
    expect(() => btn.click()).not.toThrow();
  });

  test('18 - popover-trigger click when no popover exists does not throw', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');
    const trigger = document.createElement('button');
    trigger.setAttribute('popover-trigger', 'nonexistent');
    wrapper.appendChild(trigger);
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);

    // Should not throw
    expect(() => trigger.click()).not.toThrow();
  });

  test('19 - empty popover ID auto-generates unique ID', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');
    const el = document.createElement('div');
    el.setAttribute('popover', '');
    wrapper.appendChild(el);
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);

    expect(el.classList.contains('nojs-popover')).toBe(true);
    expect(el.getAttribute('data-popover-id')).toBeTruthy();
    expect(el.getAttribute('data-popover-id')).toMatch(/^nojs-popover-/);
  });
});

// =======================================================================
//  TOOLTIP CLEANUP / DISPOSE TESTS
// =======================================================================

describe('Tooltip Cleanup', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tooltip]').forEach(s => s.remove());
  });

  test('20 - dispose removes tooltip from DOM', () => {
    const { el } = setupTooltip('Dispose me');
    const tooltipId = el.getAttribute('aria-describedby');

    // Show the tooltip first
    el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    jest.advanceTimersByTime(300);
    expect(document.getElementById(tooltipId)).not.toBeNull();

    // Run disposers
    if (el.__disposers) {
      el.__disposers.forEach(fn => fn());
    }

    expect(document.getElementById(tooltipId)).toBeNull();
  });

  test('21 - dispose clears pending timeout', () => {
    const { el } = setupTooltip('Timeout cleanup');

    // Start show timer
    el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

    // Dispose before timer fires
    if (el.__disposers) {
      el.__disposers.forEach(fn => fn());
    }

    // Advance past delay — no tooltip should appear
    jest.advanceTimersByTime(500);
    const tooltipId = el.getAttribute('aria-describedby');
    expect(document.getElementById(tooltipId)).toBeNull();
  });

  test('22 - dispose removes event listeners from trigger', () => {
    const { el } = setupTooltip('Listener cleanup');
    const removeSpy = jest.spyOn(el, 'removeEventListener');

    if (el.__disposers) {
      el.__disposers.forEach(fn => fn());
    }

    const removedEvents = removeSpy.mock.calls.map(call => call[0]);
    expect(removedEvents).toContain('mouseenter');
    expect(removedEvents).toContain('mouseleave');
    expect(removedEvents).toContain('focusin');
    expect(removedEvents).toContain('focusout');
    expect(removedEvents).toContain('keydown');
    removeSpy.mockRestore();
  });

  test('23 - popover dispose removes click listener from trigger', () => {
    const { triggerEl } = setupPopover('dispose-pop');
    const removeSpy = jest.spyOn(triggerEl, 'removeEventListener');

    if (triggerEl.__disposers) {
      triggerEl.__disposers.forEach(fn => fn());
    }

    const removedEvents = removeSpy.mock.calls.map(call => call[0]);
    expect(removedEvents).toContain('click');
    removeSpy.mockRestore();
  });
});

// Use fake timers globally for tooltip delay tests
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});
