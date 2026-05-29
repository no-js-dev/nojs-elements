import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _tabsState } from '../src/tabs/state.js';

// ─── Install the plugin once before all tests ────────────────────────
beforeAll(() => {
  NoJS.use(NoJSElements);
});

// ─── Helper: build a tabs container with N tab/panel pairs ───────────
function setupTabs(count = 3, attrs = {}) {
  const parent = document.createElement('div');
  parent.setAttribute('state', attrs.state || '{}');

  const container = document.createElement('div');
  const tabsValue = attrs.tabs !== undefined ? attrs.tabs : '';
  container.setAttribute('tabs', tabsValue);

  for (const [k, v] of Object.entries(attrs)) {
    if (k !== 'state' && k !== 'tabs') container.setAttribute(k, v);
  }

  for (let i = 0; i < count; i++) {
    const tab = document.createElement('button');
    tab.setAttribute('tab', '');
    tab.textContent = `Tab ${i}`;
    if (attrs[`tab-${i}-disabled`]) tab.setAttribute('tab-disabled', attrs[`tab-${i}-disabled`]);
    container.appendChild(tab);

    const panel = document.createElement('div');
    panel.setAttribute('panel', '');
    panel.textContent = `Panel content ${i}`;
    container.appendChild(panel);
  }

  parent.appendChild(container);
  document.body.appendChild(parent);
  NoJS.processTree(parent);

  const tablist = container.querySelector('[role="tablist"]');
  const tabs = Array.from(container.querySelectorAll('[role="tab"]'));
  const panels = Array.from(container.querySelectorAll('[role="tabpanel"]'));

  return { parent, container, tablist, tabs, panels };
}

// =======================================================================
//  TABS DIRECTIVE TESTS
// =======================================================================

describe('Tabs Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tabs]').forEach(s => s.remove());
  });

  test('1 — creates tablist container with role="tablist"', () => {
    const { tablist } = setupTabs(2);
    expect(tablist).not.toBeNull();
    expect(tablist.getAttribute('role')).toBe('tablist');
  });

  test('2 — moves tab elements into tablist', () => {
    const { tablist, tabs } = setupTabs(3);
    tabs.forEach(tab => {
      expect(tab.parentElement).toBe(tablist);
    });
  });

  test('3 — active tab is selected, inactive panels are hidden', () => {
    const { tabs, panels } = setupTabs(3);
    // Active tab (first)
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].getAttribute('tabindex')).toBe('0');
    expect(panels[0].getAttribute('aria-hidden')).toBe('false');
    expect(panels[0].inert).toBe(false);
    // Inactive tabs and panels
    for (let i = 1; i < 3; i++) {
      expect(tabs[i].getAttribute('aria-selected')).toBe('false');
      expect(tabs[i].getAttribute('tabindex')).toBe('-1');
      expect(panels[i].getAttribute('aria-hidden')).toBe('true');
      expect(panels[i].inert).toBe(true);
    }
  });
});

// =======================================================================
//  TAB DIRECTIVE TESTS
// =======================================================================

describe('Tab Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tabs]').forEach(s => s.remove());
  });

  test('4 — sets role="tab" on tab elements', () => {
    const { tabs } = setupTabs(2);
    tabs.forEach(tab => {
      expect(tab.getAttribute('role')).toBe('tab');
    });
  });

  test('5 — sets aria-controls pointing to panel id', () => {
    const { tabs, panels } = setupTabs(2);
    for (let i = 0; i < tabs.length; i++) {
      const controlsId = tabs[i].getAttribute('aria-controls');
      expect(controlsId).toBe(panels[i].id);
    }
  });
});

// =======================================================================
//  PANEL DIRECTIVE TESTS
// =======================================================================

describe('Panel Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tabs]').forEach(s => s.remove());
  });

  test('6 — sets role="tabpanel" on panel elements', () => {
    const { panels } = setupTabs(2);
    panels.forEach(panel => {
      expect(panel.getAttribute('role')).toBe('tabpanel');
    });
  });

  test('7 — sets aria-labelledby pointing to tab id', () => {
    const { tabs, panels } = setupTabs(2);
    for (let i = 0; i < panels.length; i++) {
      const labelledBy = panels[i].getAttribute('aria-labelledby');
      expect(labelledBy).toBe(tabs[i].id);
    }
  });

  test('8 — panel has tabindex="0" for focus', () => {
    const { panels } = setupTabs(2);
    panels.forEach(panel => {
      expect(panel.getAttribute('tabindex')).toBe('0');
    });
  });
});

// =======================================================================
//  CLICK INTERACTION TESTS
// =======================================================================

describe('Tabs Click Interaction', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tabs]').forEach(s => s.remove());
  });

  test('9 — clicking tab activates panel and deactivates others', () => {
    const { tabs, panels } = setupTabs(3);

    // Initially tab 0 is active
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');

    // Click tab 2
    tabs[2].click();
    expect(tabs[2].getAttribute('aria-selected')).toBe('true');
    expect(panels[2].getAttribute('aria-hidden')).toBe('false');
    expect(panels[2].inert).toBe(false);

    // Others deactivated
    expect(tabs[0].getAttribute('aria-selected')).toBe('false');
    expect(panels[0].getAttribute('aria-hidden')).toBe('true');
    expect(panels[0].inert).toBe(true);
    expect(tabs[1].getAttribute('aria-selected')).toBe('false');
    expect(panels[1].getAttribute('aria-hidden')).toBe('true');
  });

  test('10 — tabs="1" activates second tab initially (0-based)', () => {
    const { tabs, panels } = setupTabs(3, { tabs: '1' });
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(panels[1].getAttribute('aria-hidden')).toBe('false');
    expect(tabs[0].getAttribute('aria-selected')).toBe('false');
    expect(panels[0].getAttribute('aria-hidden')).toBe('true');
  });
});

// =======================================================================
//  KEYBOARD NAVIGATION TESTS
// =======================================================================

describe('Tabs Keyboard Navigation', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tabs]').forEach(s => s.remove());
  });

  test('11 — ArrowRight navigates to next tab', () => {
    const { tabs } = setupTabs(3);

    // Dispatch from the tab element so e.target has role="tab"
    tabs[0].focus();
    tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].getAttribute('aria-selected')).toBe('false');
  });

  test('12 — ArrowLeft navigates to previous tab', () => {
    const { tabs } = setupTabs(3);

    // Activate tab 2 first
    tabs[2].click();
    expect(tabs[2].getAttribute('aria-selected')).toBe('true');

    // Dispatch ArrowLeft from tab 2
    tabs[2].focus();
    tabs[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(tabs[2].getAttribute('aria-selected')).toBe('false');
  });

  test('13 — ArrowRight wraps from last to first tab', () => {
    const { tabs } = setupTabs(3);

    // Activate last tab
    tabs[2].click();
    tabs[2].focus();
    tabs[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
  });

  test('14 — ArrowLeft wraps from first to last tab', () => {
    const { tabs } = setupTabs(3);

    // Tab 0 is active and focused
    tabs[0].focus();
    tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(tabs[2].getAttribute('aria-selected')).toBe('true');
  });

  test('15 — Home key jumps to first tab', () => {
    const { tabs } = setupTabs(3);

    // Activate last tab
    tabs[2].click();
    tabs[2].focus();
    tabs[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
  });

  test('16 — End key jumps to last tab', () => {
    const { tabs } = setupTabs(3);

    // Tab 0 is active
    tabs[0].focus();
    tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(tabs[2].getAttribute('aria-selected')).toBe('true');
  });

  test('17 — ArrowUp navigates to previous tab (vertical equivalent)', () => {
    const { tabs } = setupTabs(3);

    tabs[2].click();
    tabs[2].focus();
    tabs[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
  });
});

// =======================================================================
//  STYLE INJECTION TESTS
// =======================================================================

describe('Tabs Style Injection', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tabs]').forEach(s => s.remove());
  });

  test('18 — injects styles exactly once', () => {
    setupTabs(2);
    const styles = document.querySelectorAll('style[data-nojs-tabs]');
    expect(styles.length).toBe(1);
    expect(styles[0].textContent).toContain('.nojs-tabs');
    expect(styles[0].textContent).toContain('.nojs-tablist');
    expect(styles[0].textContent).toContain('.nojs-panel');

    // Second setup does not inject again
    setupTabs(2);
    expect(document.querySelectorAll('style[data-nojs-tabs]').length).toBe(1);
  });
});

// =======================================================================
//  CLEANUP TESTS
// =======================================================================

describe('Tabs Cleanup', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tabs]').forEach(s => s.remove());
  });

  test('19 — state is registered for tab container', () => {
    const { container } = setupTabs(2);
    expect(_tabsState.containers.has(container)).toBe(true);
    const state = _tabsState.containers.get(container);
    expect(state.tabs.length).toBe(2);
    expect(state.panels.length).toBe(2);
    expect(state.activeIndex).toBe(0);
  });

  test('20 — keyboard events ignored after state cleared', () => {
    const { tabs, container } = setupTabs(3);

    // Verify keyboard works (dispatch from tab so e.target has role="tab")
    tabs[0].focus();
    tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');

    // Clear state to simulate disposal
    _tabsState.containers.delete(container);

    // Keyboard should be a no-op now since handler early-returns when state is missing
    tabs[1].focus();
    tabs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    // Should remain on tab 1
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
  });

  test('21 — clicking disabled tab does not activate it', () => {
    // Create tabs where tab at index 1 is disabled
    const parent = document.createElement('div');
    parent.setAttribute('state', '{}');

    const container = document.createElement('div');
    container.setAttribute('tabs', '');

    // Tab 0
    const tab0 = document.createElement('button');
    tab0.setAttribute('tab', '');
    tab0.textContent = 'Tab 0';
    container.appendChild(tab0);
    const panel0 = document.createElement('div');
    panel0.setAttribute('panel', '');
    panel0.textContent = 'Panel 0';
    container.appendChild(panel0);

    // Tab 1 (disabled)
    const tab1 = document.createElement('button');
    tab1.setAttribute('tab', '');
    tab1.setAttribute('tab-disabled', 'true');
    tab1.textContent = 'Tab 1';
    container.appendChild(tab1);
    const panel1 = document.createElement('div');
    panel1.setAttribute('panel', '');
    panel1.textContent = 'Panel 1';
    container.appendChild(panel1);

    parent.appendChild(container);
    document.body.appendChild(parent);
    NoJS.processTree(parent);

    const tabs = Array.from(container.querySelectorAll('[role="tab"]'));
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(tabs[1].getAttribute('aria-disabled')).toBe('true');

    // Click disabled tab
    tabs[1].click();
    // Should not activate
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(tabs[1].getAttribute('aria-selected')).toBe('false');
  });

  test('22 — tab-position attribute sets data-position', () => {
    const { container } = setupTabs(2, { 'tab-position': 'left' });
    expect(container.getAttribute('data-position')).toBe('left');
  });

  // ─── Hardening (ELEM-32) ──────────────────────────────────────────

  test('23 — unpaired extra panels are hidden, not left visible', () => {
    // 2 tabs but 3 panels: the 3rd panel has no controlling tab.
    const parent = document.createElement('div');
    parent.setAttribute('state', '{}');
    const container = document.createElement('div');
    container.setAttribute('tabs', '');

    for (let i = 0; i < 2; i++) {
      const tab = document.createElement('button');
      tab.setAttribute('tab', '');
      tab.textContent = `Tab ${i}`;
      container.appendChild(tab);
      const panel = document.createElement('div');
      panel.setAttribute('panel', '');
      panel.textContent = `Panel ${i}`;
      container.appendChild(panel);
    }
    // Extra unpaired panel
    const extra = document.createElement('div');
    extra.setAttribute('panel', '');
    extra.textContent = 'Orphan panel';
    container.appendChild(extra);

    parent.appendChild(container);
    document.body.appendChild(parent);
    NoJS.processTree(parent);

    expect(extra.getAttribute('aria-hidden')).toBe('true');
    expect(extra.inert).toBe(true);
  });

  test('24 — all tabs disabled still reveals the initial panel', () => {
    const parent = document.createElement('div');
    parent.setAttribute('state', '{}');
    const container = document.createElement('div');
    container.setAttribute('tabs', '');

    for (let i = 0; i < 2; i++) {
      const tab = document.createElement('button');
      tab.setAttribute('tab', '');
      tab.setAttribute('tab-disabled', 'true');
      tab.textContent = `Tab ${i}`;
      container.appendChild(tab);
      const panel = document.createElement('div');
      panel.setAttribute('panel', '');
      panel.textContent = `Panel ${i}`;
      container.appendChild(panel);
    }

    parent.appendChild(container);
    document.body.appendChild(parent);
    NoJS.processTree(parent);

    const state = _tabsState.containers.get(container);
    expect(state.activeIndex).toBe(0);
    const panels = Array.from(container.querySelectorAll('[role="tabpanel"]'));
    expect(panels[0].getAttribute('aria-hidden')).toBe('false');
  });

  test('25 — reactive tab-disabled re-enables a tab when state flips', () => {
    const { container, tabs } = setupTabs(2, {
      state: '{ "locked": true }',
      'tab-1-disabled': 'locked',
    });

    expect(tabs[1].getAttribute('aria-disabled')).toBe('true');

    // Flip the bound state and notify the context.
    const ctx = NoJS.findContext(container);
    ctx.locked = false;
    ctx.$notify();

    expect(tabs[1].getAttribute('aria-disabled')).toBeNull();

    // Now the previously disabled tab can be activated.
    tabs[1].click();
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
  });

  test('26 — clicking a disabled tab does not move focus to it', () => {
    const { tabs } = setupTabs(2, {
      state: '{}',
      'tab-1-disabled': 'true',
    });

    tabs[0].focus();
    expect(tabs[1].getAttribute('aria-disabled')).toBe('true');

    tabs[1].click();
    // Focus must not move onto the disabled tab.
    expect(document.activeElement).not.toBe(tabs[1]);
    expect(tabs[1].getAttribute('aria-selected')).toBe('false');
  });
});
