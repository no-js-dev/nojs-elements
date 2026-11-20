import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _dropdownState, resetDropdownState } from '../src/dropdown/state.js';

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

// ─── Helper: build a complete dropdown widget ────────────────────────
function setupDropdown(opts = {}) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('dropdown', '');
  if (opts.position) wrapper.setAttribute('dropdown-position', opts.position);
  if (opts.align) wrapper.setAttribute('dropdown-align', opts.align);

  const toggle = document.createElement('button');
  toggle.setAttribute('dropdown-toggle', '');
  toggle.textContent = opts.label || 'Menu';
  wrapper.appendChild(toggle);

  const menu = document.createElement('div');
  menu.setAttribute('dropdown-menu', '');
  wrapper.appendChild(menu);

  const itemTexts = opts.items || ['Item 1', 'Item 2', 'Item 3'];
  const items = itemTexts.map((text, i) => {
    const item = document.createElement('div');
    item.setAttribute('dropdown-item', '');
    item.textContent = text;
    if (opts.disabled && opts.disabled.includes(i)) {
      item.setAttribute('disabled', '');
    }
    menu.appendChild(item);
    return item;
  });

  document.body.appendChild(wrapper);
  NoJS.processTree(wrapper);

  return { wrapper, toggle, menu, items };
}

// =======================================================================
//  DROPDOWN TOGGLE TESTS
// =======================================================================

describe('Dropdown Toggle', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dropdown]').forEach(s => s.remove());
    resetDropdownState();
  });

  test('1 — click toggles menu open and closed', () => {
    const { toggle } = setupDropdown();
    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  test('2 — sets aria-haspopup="menu" on toggle', () => {
    const { toggle } = setupDropdown();
    expect(toggle.getAttribute('aria-haspopup')).toBe('menu');
  });

  test('3 — aria-controls links toggle to menu by id', () => {
    const { toggle, menu } = setupDropdown();
    const controlsId = toggle.getAttribute('aria-controls');
    expect(controlsId).toBeTruthy();
    expect(menu.id).toBe(controlsId);
  });
});

// =======================================================================
//  DROPDOWN MENU TESTS
// =======================================================================

describe('Dropdown Menu', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dropdown]').forEach(s => s.remove());
    resetDropdownState();
  });

  test('4 — menu has role="menu"', () => {
    const { menu } = setupDropdown();
    expect(menu.getAttribute('role')).toBe('menu');
  });

  test('5 — menu has popover="auto" attribute', () => {
    const { menu } = setupDropdown();
    expect(menu.getAttribute('popover')).toBe('auto');
  });

  test('6 — menu gets unique id for aria-controls', () => {
    const { menu } = setupDropdown();
    expect(menu.id).toBeTruthy();
    expect(menu.id).toMatch(/^nojs-dd-menu-/);
  });

  test('6b — menu ids are the lowest free index, independent of render history', () => {
    const a = setupDropdown();
    const b = setupDropdown();
    expect([a.menu.id, b.menu.id]).toEqual(['nojs-dd-menu-0', 'nojs-dd-menu-1']);
    // Re-rendering (core recreates loop rows) hands out the same ids again.
    a.wrapper.remove();
    b.wrapper.remove();
    expect(setupDropdown().menu.id).toBe('nojs-dd-menu-0');
  });

  test('6c — the menu does not also get the popover directive', () => {
    const { menu } = setupDropdown();
    expect(menu.classList.contains('nojs-popover')).toBe(false);
    expect(menu.hasAttribute('data-popover-id')).toBe(false);
  });
});

// =======================================================================
//  DROPDOWN ITEM TESTS
// =======================================================================

describe('Dropdown Item', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dropdown]').forEach(s => s.remove());
    resetDropdownState();
  });

  test('7 — items have role="menuitem"', () => {
    const { items } = setupDropdown();
    items.forEach(item => {
      expect(item.getAttribute('role')).toBe('menuitem');
    });
  });

  test('8 — items have tabindex="-1"', () => {
    const { items } = setupDropdown();
    items.forEach(item => {
      expect(item.getAttribute('tabindex')).toBe('-1');
    });
  });

  test('9 — disabled item has aria-disabled="true"', () => {
    const { items } = setupDropdown({ disabled: [1] });
    expect(items[1].getAttribute('aria-disabled')).toBe('true');
  });

  test('10 — clicking item closes menu', () => {
    const { toggle, items } = setupDropdown();
    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    items[0].click();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  test('11 — clicking item returns focus to toggle', () => {
    const { toggle, items } = setupDropdown();
    toggle.click();
    items[0].focus();
    items[0].click();
    expect(document.activeElement).toBe(toggle);
  });
});

// =======================================================================
//  KEYBOARD NAVIGATION TESTS
// =======================================================================

describe('Dropdown Keyboard Navigation', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dropdown]').forEach(s => s.remove());
    resetDropdownState();
  });

  test('12 — keyboard opens menu (Enter, Space, ArrowDown)', () => {
    for (const key of ['Enter', ' ', 'ArrowDown']) {
      const { toggle, items } = setupDropdown();
      toggle.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
      expect(document.activeElement).toBe(items[0]);
      // cleanup for next iteration
      document.body.innerHTML = '';
      document.querySelectorAll('style[data-nojs-dropdown]').forEach(s => s.remove());
      resetDropdownState();
    }
  });

  test('13 — ArrowUp on toggle opens menu and focuses last item', () => {
    const { toggle, items } = setupDropdown();
    toggle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(document.activeElement).toBe(items[items.length - 1]);
  });

  test('14 — ArrowDown on item focuses next item', () => {
    const { toggle, items } = setupDropdown();
    toggle.click();
    items[0].focus();
    items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(document.activeElement).toBe(items[1]);
  });

  test('15 — ArrowUp on item focuses previous item', () => {
    const { toggle, items } = setupDropdown();
    toggle.click();
    items[1].focus();
    items[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(document.activeElement).toBe(items[0]);
  });

  test('16 — ArrowDown on last item wraps to first', () => {
    const { toggle, items } = setupDropdown();
    toggle.click();
    items[2].focus();
    items[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(document.activeElement).toBe(items[0]);
  });

  test('17 — ArrowUp on first item wraps to last', () => {
    const { toggle, items } = setupDropdown();
    toggle.click();
    items[0].focus();
    items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(document.activeElement).toBe(items[2]);
  });

  test('18 — Enter on item triggers click (selects)', () => {
    const { toggle, items } = setupDropdown();
    toggle.click();
    items[0].focus();
    const spy = jest.fn();
    items[0].addEventListener('click', spy);
    items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(spy).toHaveBeenCalled();
  });

  test('19 — Escape on item closes menu and returns focus to toggle', () => {
    const { toggle, items } = setupDropdown();
    toggle.click();
    items[1].focus();
    items[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
  });

  test('20 — Home focuses first item', () => {
    const { toggle, items } = setupDropdown();
    toggle.click();
    items[2].focus();
    items[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(document.activeElement).toBe(items[0]);
  });

  test('21 — End focuses last item', () => {
    const { toggle, items } = setupDropdown();
    toggle.click();
    items[0].focus();
    items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(document.activeElement).toBe(items[2]);
  });

  test('22 — Tab closes menu', () => {
    const { toggle, items } = setupDropdown();
    toggle.click();
    items[0].focus();
    items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  test('23 — disabled items are skipped during navigation', () => {
    const { toggle, items } = setupDropdown({ disabled: [1] });
    toggle.click();
    items[0].focus();
    items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(document.activeElement).toBe(items[2]);
  });
});

// =======================================================================
//  LIGHT DISMISS TESTS
// =======================================================================

describe('Dropdown Light Dismiss', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dropdown]').forEach(s => s.remove());
    resetDropdownState();
  });

  test('24 — external popover close updates aria-expanded', () => {
    const { toggle, menu } = setupDropdown();
    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    // Simulate browser light-dismiss (popover auto-close)
    menu.hidePopover();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });
});

// =======================================================================
//  STYLE INJECTION TESTS
// =======================================================================

describe('Dropdown Style Injection', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dropdown]').forEach(s => s.remove());
    resetDropdownState();
  });

  test('25 — injects dropdown styles once', () => {
    setupDropdown();
    const styles = document.querySelectorAll('style[data-nojs-dropdown]');
    expect(styles.length).toBe(1);
    expect(styles[0].textContent).toContain('.nojs-dropdown-menu');
    expect(styles[0].textContent).toContain('.nojs-dropdown-item');
  });
});

// =======================================================================
//  STATE & CLEANUP TESTS
// =======================================================================

describe('Dropdown State & Cleanup', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dropdown]').forEach(s => s.remove());
    resetDropdownState();
  });

  test('26 — opening menu registers in _dropdownState.openMenus', () => {
    const { toggle, menu } = setupDropdown();
    expect(_dropdownState.openMenus.size).toBe(0);
    toggle.click();
    expect(_dropdownState.openMenus.has(menu)).toBe(true);
    expect(_dropdownState.openMenus.get(menu).toggle).toBe(toggle);
  });

  test('27 — closing menu removes from _dropdownState.openMenus', () => {
    const { toggle, menu } = setupDropdown();
    toggle.click();
    expect(_dropdownState.openMenus.has(menu)).toBe(true);
    toggle.click();
    expect(_dropdownState.openMenus.has(menu)).toBe(false);
  });

  test('28 — resetDropdownState clears all open menus', () => {
    const { toggle } = setupDropdown();
    toggle.click();
    expect(_dropdownState.openMenus.size).toBe(1);
    resetDropdownState();
    expect(_dropdownState.openMenus.size).toBe(0);
  });
});
