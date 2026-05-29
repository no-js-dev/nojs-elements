import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _modalStack, _modalRegistry, BASE_Z_INDEX, resetModalState } from '../src/modal/state.js';

// ─── Install the plugin once before all tests ────────────────────────
beforeAll(() => {
  NoJS.use(NoJSElements);
});

// ─── Polyfill Popover API for jsdom ──────────────────────────────────
function polyfillPopover(el) {
  let _open = false;
  el.showPopover = jest.fn(() => {
    _open = true;
    el.setAttribute('data-popover-open', '');
    const evt = new Event('toggle');
    Object.defineProperty(evt, 'newState', { value: 'open' });
    el.dispatchEvent(evt);
  });
  el.hidePopover = jest.fn(() => {
    _open = false;
    el.removeAttribute('data-popover-open');
    const evt = new Event('toggle');
    Object.defineProperty(evt, 'newState', { value: 'closed' });
    el.dispatchEvent(evt);
  });
  el.togglePopover = jest.fn(() => {
    if (_open) el.hidePopover();
    else el.showPopover();
  });
}

// ─── Helper: build a modal + trigger pair ────────────────────────────
function setupModal(modalId, opts = {}) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('state', opts.state || '{}');

  // Modal element
  const modalEl = document.createElement('div');
  modalEl.setAttribute('modal', modalId);
  if (opts.headingText) {
    const h2 = document.createElement('h2');
    h2.textContent = opts.headingText;
    modalEl.appendChild(h2);
  }
  if (opts.modalEscape !== undefined) {
    modalEl.setAttribute('modal-escape', opts.modalEscape);
  }
  if (opts.modalClass) {
    modalEl.setAttribute('modal-class', opts.modalClass);
  }

  // Add focusable elements inside modal
  if (opts.focusableContent !== false) {
    const btn1 = document.createElement('button');
    btn1.textContent = 'OK';
    btn1.className = 'modal-ok';
    const btn2 = document.createElement('button');
    btn2.textContent = 'Cancel';
    btn2.className = 'modal-cancel';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'modal-input';
    modalEl.appendChild(input);
    modalEl.appendChild(btn1);
    modalEl.appendChild(btn2);
  }

  // Close button inside modal (no explicit value = closes ancestor)
  if (opts.closeButton !== false) {
    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('modal-close', '');
    closeBtn.textContent = 'X';
    closeBtn.className = 'modal-close-btn';
    modalEl.appendChild(closeBtn);
  }

  // Trigger button
  const triggerEl = document.createElement('button');
  triggerEl.setAttribute('modal-open', modalId);
  triggerEl.textContent = 'Open Modal';

  wrapper.appendChild(modalEl);
  wrapper.appendChild(triggerEl);
  document.body.appendChild(wrapper);

  // Polyfill popover before NoJS processes (since jsdom has no Popover API)
  polyfillPopover(modalEl);

  NoJS.processTree(wrapper);
  return { wrapper, modalEl, triggerEl };
}

// =======================================================================
//  MODAL DIRECTIVE TESTS
// =======================================================================

describe('Modal Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-modal]').forEach(s => s.remove());
    resetModalState();
  });

  test('1 - modal element has correct attributes', () => {
    const { modalEl } = setupModal('test-modal');
    expect(modalEl.getAttribute('popover')).toBe('manual');
    expect(modalEl.getAttribute('role')).toBe('dialog');
    expect(modalEl.getAttribute('aria-modal')).toBe('true');
  });

  test('2 - links aria-labelledby to first heading', () => {
    const { modalEl } = setupModal('headed-modal', { headingText: 'Confirm Delete' });
    const heading = modalEl.querySelector('h2');
    expect(heading.id).toBeTruthy();
    expect(modalEl.getAttribute('aria-labelledby')).toBe(heading.id);
  });

  test('3 - no heading means no aria-labelledby', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');
    const modalEl = document.createElement('div');
    modalEl.setAttribute('modal', 'no-heading');
    const btn = document.createElement('button');
    btn.textContent = 'OK';
    modalEl.appendChild(btn);
    wrapper.appendChild(modalEl);
    document.body.appendChild(wrapper);
    polyfillPopover(modalEl);
    NoJS.processTree(wrapper);

    expect(modalEl.hasAttribute('aria-labelledby')).toBe(false);
  });

  test('4 - registers modal in _modalRegistry', () => {
    const { modalEl } = setupModal('reg-test');
    expect(_modalRegistry.get('reg-test')).toBe(modalEl);
  });

  test('5 - empty modal ID auto-generates unique ID', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');
    const el = document.createElement('div');
    el.setAttribute('modal', '');
    wrapper.appendChild(el);
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);

    expect(el.getAttribute('role')).toBe('dialog');
    expect(el.getAttribute('data-modal-id')).toBeTruthy();
    expect(el.getAttribute('data-modal-id')).toMatch(/^nojs-modal-/);
  });
});

// =======================================================================
//  MODAL-OPEN DIRECTIVE TESTS
// =======================================================================

describe('Modal-Open Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-modal]').forEach(s => s.remove());
    resetModalState();
  });

  test('6 - trigger has correct ARIA attributes', () => {
    const { modalEl, triggerEl } = setupModal('open-test');
    expect(triggerEl.getAttribute('aria-haspopup')).toBe('dialog');
    triggerEl.click();
    expect(triggerEl.getAttribute('aria-controls')).toBe(modalEl.id);
  });

  test('7 - click calls showPopover on target modal', () => {
    const { modalEl, triggerEl } = setupModal('open-click');
    triggerEl.click();
    expect(modalEl.showPopover).toHaveBeenCalled();
  });

  test('8 - click sets aria-expanded="true"', () => {
    const { triggerEl } = setupModal('open-expanded');
    triggerEl.click();
    expect(triggerEl.getAttribute('aria-expanded')).toBe('true');
  });

  test('9 - click pushes entry to _modalStack', () => {
    const initialLen = _modalStack.length;
    const { triggerEl } = setupModal('stack-push');
    triggerEl.click();
    expect(_modalStack.length).toBe(initialLen + 1);
    const entry = _modalStack[_modalStack.length - 1];
    expect(entry.id).toBe('stack-push');
    expect(entry.triggerEl).toBe(triggerEl);
  });

  test('10 - click on trigger for nonexistent modal does not throw', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');
    const trigger = document.createElement('button');
    trigger.setAttribute('modal-open', 'nonexistent-modal');
    wrapper.appendChild(trigger);
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);

    expect(() => trigger.click()).not.toThrow();
  });

  test('11 - empty modal-open value skips setup (no aria-haspopup)', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');
    const trigger = document.createElement('button');
    trigger.setAttribute('modal-open', '');
    wrapper.appendChild(trigger);
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);

    expect(trigger.hasAttribute('aria-haspopup')).toBe(false);
  });
});

// =======================================================================
//  MODAL-CLOSE DIRECTIVE TESTS
// =======================================================================

describe('Modal-Close Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-modal]').forEach(s => s.remove());
    resetModalState();
  });

  test('12 - without value closes ancestor modal', () => {
    const { modalEl, triggerEl } = setupModal('close-ancestor');
    triggerEl.click(); // open modal
    expect(modalEl.showPopover).toHaveBeenCalled();

    const closeBtn = modalEl.querySelector('.modal-close-btn');
    closeBtn.click();
    expect(modalEl.hidePopover).toHaveBeenCalled();
  });

  test('13 - with value closes modal by specific ID', () => {
    // Create two modals
    const { modalEl: modal1, triggerEl: trigger1 } = setupModal('modal-a', { closeButton: false });
    const { modalEl: modal2 } = setupModal('modal-b', { closeButton: false });

    // Add a button inside modal2 that closes modal-a by ID
    const crossCloseBtn = document.createElement('button');
    crossCloseBtn.setAttribute('modal-close', 'modal-a');
    modal2.appendChild(crossCloseBtn);
    NoJS.processTree(crossCloseBtn.parentElement);

    // Open modal-a
    trigger1.click();
    expect(modal1.showPopover).toHaveBeenCalled();

    // Close modal-a from modal-b's button
    crossCloseBtn.click();
    expect(modal1.hidePopover).toHaveBeenCalled();
  });

  test('14 - click with no parent modal does not throw', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');
    const btn = document.createElement('button');
    btn.setAttribute('modal-close', '');
    wrapper.appendChild(btn);
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);

    expect(() => btn.click()).not.toThrow();
  });
});

// =======================================================================
//  MODAL FOCUS TRAP TESTS
// =======================================================================

describe('Modal Focus Trap', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-modal]').forEach(s => s.remove());
    resetModalState();
    jest.useRealTimers();
  });

  test('15 - Tab on last focusable wraps to first', () => {
    jest.useFakeTimers();
    const { modalEl, triggerEl } = setupModal('focus-trap');
    triggerEl.click();
    jest.runAllTimers();

    const focusable = modalEl.querySelectorAll('input, button');
    const last = focusable[focusable.length - 1];

    // Focus the last element
    last.focus();
    expect(document.activeElement).toBe(last);

    // Press Tab
    const tabEvt = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    const preventSpy = jest.spyOn(tabEvt, 'preventDefault');
    modalEl.dispatchEvent(tabEvt);

    expect(preventSpy).toHaveBeenCalled();
  });

  test('16 - Shift+Tab on first focusable wraps to last', () => {
    jest.useFakeTimers();
    const { modalEl, triggerEl } = setupModal('focus-trap-shift');
    triggerEl.click();
    jest.runAllTimers();

    const focusable = modalEl.querySelectorAll('input, button');
    const first = focusable[0];

    // Focus the first element
    first.focus();
    expect(document.activeElement).toBe(first);

    // Press Shift+Tab
    const tabEvt = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
    const preventSpy = jest.spyOn(tabEvt, 'preventDefault');
    modalEl.dispatchEvent(tabEvt);

    expect(preventSpy).toHaveBeenCalled();
  });

  test('17 - non-Tab keys are not intercepted by focus trap', () => {
    jest.useFakeTimers();
    const { modalEl, triggerEl } = setupModal('focus-other-key');
    triggerEl.click();
    jest.runAllTimers();

    // Press Enter (should not be prevented by the focus trap)
    const enterEvt = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    const preventSpy = jest.spyOn(enterEvt, 'preventDefault');
    modalEl.dispatchEvent(enterEvt);
    expect(preventSpy).not.toHaveBeenCalled();
  });
});

// =======================================================================
//  MODAL ESCAPE KEY TESTS
// =======================================================================

describe('Modal Escape Key', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-modal]').forEach(s => s.remove());
    resetModalState();
    jest.useRealTimers();
  });

  test('18 - Escape key closes modal by default', () => {
    jest.useFakeTimers();
    const { modalEl, triggerEl } = setupModal('esc-close');
    triggerEl.click();
    jest.runAllTimers();

    // Press Escape
    modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(modalEl.hidePopover).toHaveBeenCalled();
  });

  test('19 - modal-escape="false" prevents Escape from closing', () => {
    jest.useFakeTimers();
    const { modalEl, triggerEl } = setupModal('no-esc', { modalEscape: 'false' });
    triggerEl.click();
    jest.runAllTimers();

    const hideCallCount = modalEl.hidePopover.mock.calls.length;

    // Press Escape - should NOT close
    modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(modalEl.hidePopover.mock.calls.length).toBe(hideCallCount);
  });
});

// =======================================================================
//  MODAL STACKING / Z-INDEX TESTS
// =======================================================================

describe('Modal Stacking', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-modal]').forEach(s => s.remove());
    resetModalState();
    jest.useRealTimers();
  });

  test('20 - first modal gets BASE_Z_INDEX', () => {
    jest.useFakeTimers();
    const { modalEl, triggerEl } = setupModal('stack-1');
    triggerEl.click();
    jest.runAllTimers();

    // z-index is set via toggle handler
    expect(modalEl.style.zIndex).toBeTruthy();
    expect(parseInt(modalEl.style.zIndex, 10)).toBeGreaterThanOrEqual(BASE_Z_INDEX);
  });

  test('21 - second modal gets higher z-index', () => {
    jest.useFakeTimers();
    const { modalEl: modal1, triggerEl: trigger1 } = setupModal('stack-a');
    const { modalEl: modal2, triggerEl: trigger2 } = setupModal('stack-b');

    trigger1.click();
    jest.runAllTimers();
    const z1 = parseInt(modal1.style.zIndex, 10);

    trigger2.click();
    jest.runAllTimers();
    const z2 = parseInt(modal2.style.zIndex, 10);

    expect(z2).toBeGreaterThan(z1);
  });

  test('22 - closing modal pops from _modalStack', () => {
    jest.useFakeTimers();
    const { modalEl, triggerEl } = setupModal('stack-pop');
    triggerEl.click();
    jest.runAllTimers();

    const stackLen = _modalStack.length;
    expect(stackLen).toBeGreaterThan(0);

    // Close
    modalEl.hidePopover();
    expect(_modalStack.length).toBe(stackLen - 1);
  });

  test('23 - closing modal restores focus to trigger', () => {
    jest.useFakeTimers();
    const { modalEl, triggerEl } = setupModal('focus-restore');
    const focusSpy = jest.spyOn(triggerEl, 'focus');

    triggerEl.click();
    jest.runAllTimers();

    modalEl.hidePopover();
    jest.runAllTimers();

    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });
});

// =======================================================================
//  MODAL STYLE INJECTION TESTS
// =======================================================================

describe('Modal Style Injection', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-modal]').forEach(s => s.remove());
    resetModalState();
  });

  test('24 - injects styles exactly once', () => {
    setupModal('style-test');
    const styles = document.querySelectorAll('style[data-nojs-modal]');
    expect(styles.length).toBe(1);
    expect(styles[0].textContent).toContain('.nojs-modal');

    // Creating more modals should not add more style tags
    setupModal('style-b');
    setupModal('style-c');
    expect(document.querySelectorAll('style[data-nojs-modal]').length).toBe(1);
  });
});

// =======================================================================
//  MODAL CLEANUP / DISPOSE TESTS
// =======================================================================

describe('Modal Cleanup', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-modal]').forEach(s => s.remove());
    resetModalState();
  });

  test('25 - dispose removes modal from _modalRegistry', () => {
    const { modalEl } = setupModal('dispose-reg');
    expect(_modalRegistry.has('dispose-reg')).toBe(true);

    if (modalEl.__disposers) {
      modalEl.__disposers.forEach(fn => fn());
    }
    expect(_modalRegistry.has('dispose-reg')).toBe(false);
  });

  test('26 - dispose removes toggle listener from modal', () => {
    const { modalEl } = setupModal('dispose-toggle');
    const removeSpy = jest.spyOn(modalEl, 'removeEventListener');

    if (modalEl.__disposers) {
      modalEl.__disposers.forEach(fn => fn());
    }

    const removedEvents = removeSpy.mock.calls.map(call => call[0]);
    expect(removedEvents).toContain('toggle');
    removeSpy.mockRestore();
  });

  test('27 - dispose removes click listener from trigger', () => {
    const { triggerEl } = setupModal('dispose-click');
    const removeSpy = jest.spyOn(triggerEl, 'removeEventListener');

    if (triggerEl.__disposers) {
      triggerEl.__disposers.forEach(fn => fn());
    }

    const removedEvents = removeSpy.mock.calls.map(call => call[0]);
    expect(removedEvents).toContain('click');
    removeSpy.mockRestore();
  });

  test('28 - dispose removes click listener from modal-close button', () => {
    const { modalEl } = setupModal('dispose-close-btn');
    const closeBtn = modalEl.querySelector('.modal-close-btn');
    const removeSpy = jest.spyOn(closeBtn, 'removeEventListener');

    if (closeBtn.__disposers) {
      closeBtn.__disposers.forEach(fn => fn());
    }

    const removedEvents = removeSpy.mock.calls.map(call => call[0]);
    expect(removedEvents).toContain('click');
    removeSpy.mockRestore();
  });

  test('29 - dispose clears modal from stack if open', () => {
    jest.useFakeTimers();
    const { modalEl, triggerEl } = setupModal('dispose-stack');
    triggerEl.click();
    jest.runAllTimers();

    expect(_modalStack.some(m => m.id === 'dispose-stack')).toBe(true);

    if (modalEl.__disposers) {
      modalEl.__disposers.forEach(fn => fn());
    }

    expect(_modalStack.some(m => m.id === 'dispose-stack')).toBe(false);
    jest.useRealTimers();
  });
});

// =======================================================================
//  MODAL EDGE CASES
// =======================================================================

describe('Modal Edge Cases', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-modal]').forEach(s => s.remove());
    resetModalState();
  });

  test('30 - modal with no focusable elements does not throw', () => {
    jest.useFakeTimers();
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');
    const modalEl = document.createElement('div');
    modalEl.setAttribute('modal', 'empty-modal');
    modalEl.innerHTML = '<p>No focusable elements here</p>';
    const trigger = document.createElement('button');
    trigger.setAttribute('modal-open', 'empty-modal');
    wrapper.appendChild(modalEl);
    wrapper.appendChild(trigger);
    document.body.appendChild(wrapper);
    polyfillPopover(modalEl);
    NoJS.processTree(wrapper);

    expect(() => {
      trigger.click();
      jest.runAllTimers();
    }).not.toThrow();
    jest.useRealTimers();
  });

  test('31 - modal-backdrop="false" sets data-nojs-no-backdrop', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');
    const modalEl = document.createElement('div');
    modalEl.setAttribute('modal', 'no-backdrop');
    modalEl.setAttribute('modal-backdrop', 'false');
    wrapper.appendChild(modalEl);
    document.body.appendChild(wrapper);
    polyfillPopover(modalEl);
    NoJS.processTree(wrapper);

    expect(modalEl.hasAttribute('data-nojs-no-backdrop')).toBe(true);
  });
});

// =======================================================================
//  MODAL STACK INTEGRITY (ELEM-28)
// =======================================================================

describe('Modal Stack Integrity', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-modal]').forEach(s => s.remove());
    resetModalState();
    jest.useRealTimers();
  });

  test('32 - stacked open A, open B, close B, close A keeps stack consistent', () => {
    jest.useFakeTimers();
    const { modalEl: modalA, triggerEl: triggerA } = setupModal('intg-a');
    const { modalEl: modalB, triggerEl: triggerB } = setupModal('intg-b');

    triggerA.click();
    jest.runAllTimers();
    expect(_modalStack.map(m => m.id)).toEqual(['intg-a']);

    triggerB.click();
    jest.runAllTimers();
    expect(_modalStack.map(m => m.id)).toEqual(['intg-a', 'intg-b']);

    modalB.hidePopover();
    jest.runAllTimers();
    expect(_modalStack.map(m => m.id)).toEqual(['intg-a']);

    modalA.hidePopover();
    jest.runAllTimers();
    expect(_modalStack.length).toBe(0);
  });

  test('33 - a throwing showPopover does NOT leave a phantom stack entry', () => {
    const { modalEl, triggerEl } = setupModal('intg-throw');
    modalEl.showPopover = jest.fn(() => { throw new Error('popover failure'); });

    expect(() => triggerEl.click()).not.toThrow();
    expect(_modalStack.some(m => m.id === 'intg-throw')).toBe(false);
    expect(_modalStack.length).toBe(0);
    // ARIA should not claim expanded when the show failed
    expect(triggerEl.getAttribute('aria-expanded')).toBe('false');
  });

  test('34 - re-clicking an already-open trigger does not duplicate the entry', () => {
    const { triggerEl } = setupModal('intg-dup');
    triggerEl.click();
    triggerEl.click();
    triggerEl.click();
    const matches = _modalStack.filter(m => m.id === 'intg-dup');
    expect(matches.length).toBe(1);
  });

  test('35 - opening same modal via two triggers does not duplicate the entry', () => {
    const { modalEl, triggerEl: trigger1 } = setupModal('intg-multi');

    // Second trigger for the same modal
    const trigger2 = document.createElement('button');
    trigger2.setAttribute('modal-open', 'intg-multi');
    document.body.appendChild(trigger2);
    NoJS.processTree(trigger2);

    trigger1.click();
    trigger2.click();
    expect(_modalStack.filter(m => m.id === 'intg-multi').length).toBe(1);
  });

  test('36 - $modal.open does not leave a phantom entry when show throws', () => {
    const { modalEl } = setupModal('intg-api-throw');
    modalEl.showPopover = jest.fn(() => { throw new Error('fail'); });

    const result = NoJS.modal.open('intg-api-throw');
    expect(result).toBe(false);
    expect(_modalStack.some(m => m.id === 'intg-api-throw')).toBe(false);
  });

  test('37 - $modal.open does not duplicate when already open', () => {
    setupModal('intg-api-dup');
    expect(NoJS.modal.open('intg-api-dup')).toBe(true);
    expect(NoJS.modal.open('intg-api-dup')).toBe(true);
    expect(_modalStack.filter(m => m.id === 'intg-api-dup').length).toBe(1);
  });

  test('38 - special characters in modal id resolve without selector injection', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');
    const modalEl = document.createElement('div');
    const trickyId = 'a"]:focus';
    modalEl.setAttribute('modal', trickyId);
    const trigger = document.createElement('button');
    trigger.setAttribute('modal-open', trickyId);
    wrapper.appendChild(modalEl);
    wrapper.appendChild(trigger);
    document.body.appendChild(wrapper);
    polyfillPopover(modalEl);
    NoJS.processTree(wrapper);

    // Clear the registry entry to force the data-modal-id lookup path
    _modalRegistry.delete(trickyId);

    expect(() => trigger.click()).not.toThrow();
    expect(modalEl.showPopover).toHaveBeenCalled();
  });
});
