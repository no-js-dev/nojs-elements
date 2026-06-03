// Regression test for ELEM-37 (carried-forward concern #3 from E1 / PR #16).
//
// Root cause: before the dropdown hardening, open() always called showPopover()
// and close() always called hidePopover() without tracking whether the popover
// was actually in the top layer. The native Popover API throws
//   DOMException: "InvalidStateError"
// when you call showPopover() on an already-shown popover, or hidePopover() on an
// already-hidden one. The asymmetry surfaced on the open -> close -> reopen cycle:
// the synchronous `toggle` event fired by hidePopover() re-entered close(), the
// internal flag drifted, and the next open() called showPopover() on a popover the
// browser still considered shown -> InvalidStateError.
//
// Fix (src/dropdown/dropdown.js): open()/close() are symmetric around a
// `_popoverShown` flag, and close() clears the flag BEFORE calling hidePopover()
// so the synchronous toggle event cannot re-enter the close path.
//
// This test installs a STRICT, browser-faithful Popover API mock that throws
// InvalidStateError on double-show / double-hide (jsdom has no native Popover API,
// and the lenient mock in dropdown.test.js would mask the regression). It then
// drives multiple open -> close -> reopen cycles and asserts that NO error whose
// name is "InvalidStateError" is ever thrown.

import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { resetDropdownState } from '../src/dropdown/state.js';

// ─── Strict Popover API mock (throws like a real browser) ────────────
// Mirrors the spec: showPopover() on a shown popover and hidePopover() on a
// hidden one both throw an InvalidStateError DOMException.
function installStrictPopoverMock() {
  const make = (msg) => {
    // Prefer the real DOMException so .name === 'InvalidStateError' exactly.
    if (typeof DOMException === 'function') {
      return new DOMException(msg, 'InvalidStateError');
    }
    const e = new Error(msg);
    e.name = 'InvalidStateError';
    return e;
  };

  HTMLElement.prototype.showPopover = function () {
    if (this._popoverOpen) throw make('Invalid on already-showing popover.');
    this._popoverOpen = true;
    const evt = new Event('toggle', { bubbles: false });
    evt.newState = 'open';
    evt.oldState = 'closed';
    this.dispatchEvent(evt);
  };

  HTMLElement.prototype.hidePopover = function () {
    if (!this._popoverOpen) throw make('Invalid on already-hidden popover.');
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

// Replace any mock installed by other suites with the strict one for this file.
beforeAll(() => {
  installStrictPopoverMock();
  NoJS.use(NoJSElements);
});

function setupDropdown() {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('dropdown', '');

  const toggle = document.createElement('button');
  toggle.setAttribute('dropdown-toggle', '');
  toggle.textContent = 'Menu';
  wrapper.appendChild(toggle);

  const menu = document.createElement('div');
  menu.setAttribute('dropdown-menu', '');
  ['Item 1', 'Item 2'].forEach((text) => {
    const item = document.createElement('div');
    item.setAttribute('dropdown-item', '');
    item.textContent = text;
    menu.appendChild(item);
  });
  wrapper.appendChild(menu);

  document.body.appendChild(wrapper);
  NoJS.processTree(wrapper);

  return { wrapper, toggle, menu };
}

// Capture any error thrown while running `fn`, plus any error surfaced through
// the global error path (the synchronous `toggle` event handler runs inside the
// hidePopover() call, so a re-entrancy bug throws there). We assert specifically
// on the error NAME so a future, differently-worded message can't slip through.
function runAndCaptureErrors(fn) {
  const caught = [];
  const onError = (e) => caught.push(e.error || e);
  window.addEventListener('error', onError);
  try {
    fn();
  } catch (e) {
    caught.push(e);
  } finally {
    window.removeEventListener('error', onError);
  }
  return caught;
}

describe('Dropdown reopen regression (ELEM-37)', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dropdown]').forEach((s) => s.remove());
    resetDropdownState();
  });

  test('strict mock throws InvalidStateError on double-show (mock sanity check)', () => {
    const el = document.createElement('div');
    el.setAttribute('popover', 'auto');
    document.body.appendChild(el);
    el.showPopover();
    let name = null;
    try {
      el.showPopover();
    } catch (e) {
      name = e.name;
    }
    expect(name).toBe('InvalidStateError');
  });

  test('open -> close -> reopen produces no InvalidStateError', () => {
    const { toggle, menu } = setupDropdown();

    const errors = runAndCaptureErrors(() => {
      toggle.click(); // open
      toggle.click(); // close (hidePopover -> synchronous toggle event)
      toggle.click(); // reopen (must NOT call showPopover on an already-shown popover)
    });

    expect(errors.map((e) => e && e.name)).not.toContain('InvalidStateError');
    // Final state is open and the popover top-layer state is in sync.
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(menu._popoverOpen).toBe(true);
  });

  test('repeated open/close cycles stay error-free and state-consistent', () => {
    const { toggle, menu } = setupDropdown();

    const errors = runAndCaptureErrors(() => {
      for (let i = 0; i < 5; i++) {
        toggle.click(); // open
        expect(toggle.getAttribute('aria-expanded')).toBe('true');
        expect(menu._popoverOpen).toBe(true);
        toggle.click(); // close
        expect(toggle.getAttribute('aria-expanded')).toBe('false');
        expect(menu._popoverOpen).toBe(false);
      }
    });

    expect(errors.map((e) => e && e.name)).not.toContain('InvalidStateError');
  });

  test('reopen after browser light-dismiss (external toggle->closed) is error-free', () => {
    const { toggle, menu } = setupDropdown();

    const errors = runAndCaptureErrors(() => {
      toggle.click();            // open
      menu.hidePopover();        // browser light-dismiss: fires toggle->closed, close() syncs flag
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
      toggle.click();            // reopen — flag must already be false, so showPopover is valid
    });

    expect(errors.map((e) => e && e.name)).not.toContain('InvalidStateError');
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(menu._popoverOpen).toBe(true);
  });
});
