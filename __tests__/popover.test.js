import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _popoverRegistry, resetPopoverState } from '../src/popover/state.js';

// ─── Install the plugin once before all tests ────────────────────────
beforeAll(() => {
  NoJS.use(NoJSElements);
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  document.body.innerHTML = '';
  document.querySelectorAll('style[data-nojs-popover]').forEach((s) => s.remove());
  resetPopoverState();
  jest.restoreAllMocks();
});

// ─── Helpers ─────────────────────────────────────────────────────────

// Attach a jsdom-friendly mock of the native Popover API to an element so
// togglePopover / showPopover / hidePopover and `:popover-open` work.
function mockPopoverApi(el) {
  let open = false;
  el.showPopover = jest.fn(() => {
    open = true;
    el.dispatchEvent(makeToggle('open'));
  });
  el.hidePopover = jest.fn(() => {
    open = false;
    el.dispatchEvent(makeToggle('closed'));
  });
  el.togglePopover = jest.fn(() => {
    open ? el.hidePopover() : el.showPopover();
  });
  const realMatches = el.matches.bind(el);
  el.matches = (sel) => (sel === ':popover-open' ? open : realMatches(sel));
  return { isOpen: () => open };
}

function makeToggle(state) {
  const evt = new Event('toggle');
  Object.defineProperty(evt, 'newState', { value: state });
  return evt;
}

// Build a popover with N triggers sharing the same id.
function setupShared(popoverId, triggerCount = 2) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('state', '{}');

  const popoverEl = document.createElement('div');
  popoverEl.setAttribute('popover', popoverId);
  popoverEl.textContent = 'Popover content';

  const triggers = [];
  for (let i = 0; i < triggerCount; i++) {
    const t = document.createElement('button');
    t.setAttribute('popover-trigger', popoverId);
    t.textContent = `Toggle ${i}`;
    triggers.push(t);
  }

  wrapper.appendChild(popoverEl);
  triggers.forEach((t) => wrapper.appendChild(t));
  document.body.appendChild(wrapper);
  NoJS.processTree(wrapper);
  return { wrapper, popoverEl, triggers };
}

function dispose(el) {
  if (el.__disposers) el.__disposers.forEach((fn) => fn());
}

// =======================================================================
//  REGISTRY INTEGRITY (#20)
// =======================================================================

describe('Popover registry integrity', () => {
  test('1 - two triggers share one registry entry', () => {
    const { triggers } = setupShared('shared-1', 2);
    const entry = _popoverRegistry.get('shared-1');
    expect(entry).toBeTruthy();
    expect(entry.triggerEls.size).toBe(2);
    expect(entry.triggerEls.has(triggers[0])).toBe(true);
    expect(entry.triggerEls.has(triggers[1])).toBe(true);
  });

  test('2 - disposing one trigger does NOT break the other', () => {
    const { popoverEl, triggers } = setupShared('shared-2', 2);
    mockPopoverApi(popoverEl);

    // Dispose the first trigger only.
    dispose(triggers[0]);

    const entry = _popoverRegistry.get('shared-2');
    expect(entry).toBeTruthy();
    expect(entry.popoverEl).toBe(popoverEl);
    expect(entry.triggerEls.has(triggers[0])).toBe(false);
    expect(entry.triggerEls.has(triggers[1])).toBe(true);

    // Surviving trigger still toggles the popover (no "no popover found").
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    triggers[1].click();
    expect(popoverEl.togglePopover).toHaveBeenCalledTimes(1);
    expect(warn).not.toHaveBeenCalled();
  });

  test('3 - disposing the popover keeps the entry while triggers live', () => {
    const { popoverEl, triggers } = setupShared('shared-3', 2);
    mockPopoverApi(popoverEl);

    // Dispose the popover element itself.
    dispose(popoverEl);

    const entry = _popoverRegistry.get('shared-3');
    expect(entry).toBeTruthy(); // entry survives for the still-living triggers
    expect(entry.popoverEl).toBeNull();
    expect(entry.triggerEls.size).toBe(2);

    // Triggers no longer have a popover, but must not throw.
    expect(() => triggers[0].click()).not.toThrow();
  });

  test('4 - entry removed only after popover AND all triggers disposed', () => {
    const { popoverEl, triggers } = setupShared('shared-4', 2);
    mockPopoverApi(popoverEl);

    dispose(triggers[0]);
    expect(_popoverRegistry.has('shared-4')).toBe(true);
    dispose(popoverEl);
    expect(_popoverRegistry.has('shared-4')).toBe(true);
    dispose(triggers[1]);
    // Now nothing references the entry.
    expect(_popoverRegistry.has('shared-4')).toBe(false);
  });

  test('5 - popover declared position is not overridden by trigger default', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');

    // Trigger appears first so it creates the registry entry with default
    // position 'bottom' before the popover runs.
    const trigger = document.createElement('button');
    trigger.setAttribute('popover-trigger', 'pos-merge');

    const popoverEl = document.createElement('div');
    popoverEl.setAttribute('popover', 'pos-merge');
    popoverEl.setAttribute('popover-position', 'top');

    wrapper.appendChild(trigger);
    wrapper.appendChild(popoverEl);
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);

    expect(_popoverRegistry.get('pos-merge').position).toBe('top');
  });

  test('6 - popover gets a matching DOM id so aria-controls resolves', () => {
    const { popoverEl, triggers } = setupShared('aria-id', 1);
    expect(popoverEl.id).toBe('aria-id');
    expect(triggers[0].getAttribute('aria-controls')).toBe('aria-id');
    expect(document.getElementById('aria-id')).toBe(popoverEl);
  });
});

// =======================================================================
//  LIVE POSITIONING (#21)
// =======================================================================

describe('Popover live positioning', () => {
  test('7 - opening attaches scroll & resize listeners', () => {
    const { popoverEl, triggers } = setupShared('live-1', 1);
    mockPopoverApi(popoverEl);
    const addSpy = jest.spyOn(window, 'addEventListener');

    triggers[0].click();
    jest.advanceTimersByTime(16); // flush requestAnimationFrame

    const events = addSpy.mock.calls.map((c) => c[0]);
    expect(events).toContain('scroll');
    expect(events).toContain('resize');
  });

  test('8 - scroll while open re-positions the popover', () => {
    const { popoverEl, triggers } = setupShared('live-2', 1);
    mockPopoverApi(popoverEl);

    triggers[0].click();
    jest.advanceTimersByTime(16);

    const styleBefore = popoverEl.style.top;
    // Move the trigger, then scroll — reposition should recompute top/left.
    triggers[0].getBoundingClientRect = () => ({
      top: 200, bottom: 224, left: 50, right: 130, width: 80, height: 24,
    });
    window.dispatchEvent(new Event('scroll'));
    jest.advanceTimersByTime(16);

    expect(popoverEl.style.top).not.toBe(styleBefore);
    expect(popoverEl.style.top).toBeTruthy();
  });

  test('9 - resize while open re-positions the popover', () => {
    const { popoverEl, triggers } = setupShared('live-3', 1);
    mockPopoverApi(popoverEl);

    triggers[0].click();
    jest.advanceTimersByTime(16);

    triggers[0].getBoundingClientRect = () => ({
      top: 10, bottom: 34, left: 300, right: 380, width: 80, height: 24,
    });
    const before = popoverEl.style.left;
    window.dispatchEvent(new Event('resize'));
    jest.advanceTimersByTime(16);

    expect(popoverEl.style.left).not.toBe(before);
  });

  test('10 - closing removes scroll & resize listeners', () => {
    const { popoverEl, triggers } = setupShared('live-4', 1);
    mockPopoverApi(popoverEl);
    const removeSpy = jest.spyOn(window, 'removeEventListener');

    triggers[0].click();          // open
    jest.advanceTimersByTime(16);
    triggers[0].click();          // close
    jest.advanceTimersByTime(16);

    const events = removeSpy.mock.calls.map((c) => c[0]);
    expect(events).toContain('scroll');
    expect(events).toContain('resize');
  });

  test('11 - closing stops repositioning on subsequent scroll', () => {
    const { popoverEl, triggers } = setupShared('live-5', 1);
    mockPopoverApi(popoverEl);

    triggers[0].click();          // open
    jest.advanceTimersByTime(16);
    triggers[0].click();          // close
    jest.advanceTimersByTime(16);

    const positionSpy = jest.fn();
    popoverEl.getBoundingClientRect = () => {
      positionSpy();
      return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
    };
    window.dispatchEvent(new Event('scroll'));
    jest.advanceTimersByTime(16);

    expect(positionSpy).not.toHaveBeenCalled();
  });

  test('12 - disposing trigger removes tracking listeners', () => {
    const { popoverEl, triggers } = setupShared('live-6', 1);
    mockPopoverApi(popoverEl);

    triggers[0].click();          // open + start tracking
    jest.advanceTimersByTime(16);

    const removeSpy = jest.spyOn(window, 'removeEventListener');
    dispose(popoverEl); // disposing popover stops tracking
    const events = removeSpy.mock.calls.map((c) => c[0]);
    expect(events).toContain('scroll');
    expect(events).toContain('resize');
  });

  test('13 - Escape closes popover and stops tracking', () => {
    const { popoverEl, triggers } = setupShared('live-7', 1);
    mockPopoverApi(popoverEl);

    triggers[0].click();
    jest.advanceTimersByTime(16);
    expect(_popoverRegistry.get('live-7').open).toBe(true);

    const removeSpy = jest.spyOn(window, 'removeEventListener');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(popoverEl.hidePopover).toHaveBeenCalled();
    const events = removeSpy.mock.calls.map((c) => c[0]);
    expect(events).toContain('scroll');
  });
});

// =======================================================================
//  POPOVER API GUARDS / FEATURE-DETECTION
// =======================================================================

describe('Popover programmatic API', () => {
  test('14 - $popover.open returns false when Popover API unsupported', () => {
    const { popoverEl } = setupShared('api-1', 1);
    // No mock attached → togglePopover/showPopover undefined (jsdom default).
    expect(typeof popoverEl.showPopover).toBe('undefined');
    expect(NoJS.popover.open('api-1')).toBe(false);
  });

  test('15 - $popover.open / close drive the popover when supported', () => {
    const { popoverEl } = setupShared('api-2', 1);
    mockPopoverApi(popoverEl);

    expect(NoJS.popover.open('api-2')).toBe(true);
    expect(popoverEl.showPopover).toHaveBeenCalledTimes(1);

    expect(NoJS.popover.close('api-2')).toBe(true);
    expect(popoverEl.hidePopover).toHaveBeenCalledTimes(1);
  });

  test('16 - $popover.open on unknown id returns false', () => {
    expect(NoJS.popover.open('does-not-exist')).toBe(false);
  });
});
