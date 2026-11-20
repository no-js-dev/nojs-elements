import NoJSElements from '../src/index.js';
import { _tabsState, resetTabsState } from '../src/tabs/state.js';
import { _tableState } from '../src/table/state.js';
import { uiContract } from '../src/ui-contract.js';

// UI directives on the host backend (NoJS-Server compiled sites): directives
// receive `init(el, host)`, read server-delivered values with host.value and
// register cleanup with host.onDispose. This file stands in for the
// integrator's plugin host: it initializes directives in document order then
// priority, records disposers per element and lets a test re-render.

function createHarness() {
  const defs = new Map();
  const disposers = new Map(); // el -> [{ directive, fn }]
  const watchers = [];
  const warns = [];
  const execs = [];
  const registrar = {
    hostApi: 1,
    directive(name, def) { defs.set(name, def); },
    filter() {}, validator() {}, global() {}, config() {},
  };

  function hostFor(directive) {
    return {
      value(el, attr) {
        const raw = el.getAttribute(attr);
        if (raw == null || raw === '') return null;
        try { return JSON.parse(raw); } catch { return null; }
      },
      exec(key, payload) { execs.push({ key, payload }); },
      watch(el, attr, cb) {
        const entry = { el, attr, cb, last: el.getAttribute(attr) };
        watchers.push(entry);
        return () => { entry.cb = null; };
      },
      onDispose(el, fn) {
        if (!disposers.has(el)) disposers.set(el, []);
        disposers.get(el).push({ directive, fn });
      },
      disposeTree() {},
      validators: new Map(),
      warn(msg) { warns.push(`[${directive}] ${msg}`); },
    };
  }

  function initAll(root = document.body) {
    const order = [...defs.entries()].sort((a, b) => (a[1].priority ?? 20) - (b[1].priority ?? 20));
    const els = [root, ...root.querySelectorAll('*')];
    for (const el of els) {
      for (const [name, def] of order) {
        if (!el.hasAttribute(name)) continue;
        el.__inited = el.__inited || new Set();
        if (el.__inited.has(name)) continue;
        el.__inited.add(name);
        def.init(el, hostFor(name));
      }
    }
  }

  function dispose(el, directive) {
    const list = disposers.get(el) || [];
    const run = list.filter((d) => !directive || d.directive === directive);
    disposers.set(el, list.filter((d) => directive && d.directive !== directive));
    for (let i = run.length - 1; i >= 0; i--) run[i].fn();
    if (el.__inited) {
      if (directive) el.__inited.delete(directive);
      else el.__inited.clear();
    }
  }

  // What the integrator's watch phase does after a morph.
  function runWatchers() {
    for (const w of watchers) {
      const v = w.el.getAttribute(w.attr);
      if (w.cb && v !== w.last) { const prev = w.last; w.last = v; w.cb(v, prev); }
    }
  }

  return { registrar, defs, initAll, dispose, runWatchers, warns, execs, disposers };
}

let h;

beforeEach(() => {
  document.body.innerHTML = '';
  resetTabsState();
  h = createHarness();
  NoJSElements.install(h.registrar);
});

afterEach(() => {
  NoJSElements.dispose(h.registrar);
  document.body.innerHTML = '';
  jest.useRealTimers();
});

describe('host install', () => {
  test('registers every UI directive with its real implementation', () => {
    for (const name of [
      'tooltip', 'popover', 'popover-trigger', 'popover-dismiss',
      'modal', 'modal-open', 'modal-close',
      'dropdown', 'dropdown-toggle', 'dropdown-menu', 'dropdown-item',
      'toast', 'toast-container', 'tabs', 'tab', 'panel', 'tab-disabled',
      'tree', 'branch', 'subtree', 'tree-drag-mode', 'stepper', 'step',
      'skeleton', 'split', 'pane', 'sortable', 'sort', 'fixed-header',
      'fixed-col', 'table-reorder', 'breadcrumb', 'accordion', 'virtual', 'spy',
    ]) {
      expect(h.defs.has(name)).toBe(true);
    }
    document.body.innerHTML = '<div tooltip="x"></div><div tabs><b tab>1</b><p panel>1</p></div>';
    h.initAll();
    expect(h.warns).toEqual([]);
  });

  test('marks the directives that restructure or annotate their subtree', () => {
    const subtree = [...h.defs].filter(([, d]) => d.subtree).map(([n]) => n).sort();
    expect(subtree).toEqual([
      'accordion', 'breadcrumb', 'skeleton', 'sortable', 'split', 'spy', 'stepper',
      'table-reorder', 'tabs', 'toast-container', 'tree', 'tree-drag-mode', 'virtual',
    ]);
  });

  test('only drag-list and drag-multiple remain host stubs', () => {
    document.body.innerHTML = '<ul drag-list="items"></ul>';
    h.initAll();
    expect(h.warns).toEqual([expect.stringContaining('"drag-list" is not yet available')]);
  });

  test('declares the expression attributes in the contract', () => {
    expect(NoJSElements.contract.directives).toMatchObject(uiContract);
    expect(uiContract.toast.attrs.toast.literalOn).toEqual(['button', 'a', '[on:click]']);
  });

  test('sets the programmatic APIs on the page-level window.NoJS compat object', () => {
    const page = { hostApi: 1, directive() {}, filter() {}, validator() {}, global() {}, config() {} };
    window.NoJS = page;
    try {
      NoJSElements.install(createHarness().registrar);
      expect(typeof page.modal.open).toBe('function');
      expect(typeof page.dropdown.open).toBe('function');
      expect(typeof page.popover).toBe('function');
      expect(typeof page.toast).toBe('function');
    } finally {
      delete window.NoJS;
    }
  });
});

describe('accordion', () => {
  test('sets ARIA, dispatches changes and is disposed through the host', () => {
    document.body.innerHTML = `<section accordion>
      <details id="a"><summary>A</summary><p>a</p></details>
      <details id="b"><summary>B</summary><p>b</p></details></section>`;
    h.initAll();
    const sec = document.querySelector('section');
    expect(sec.getAttribute('role')).toBe('group');
    const [sa] = document.querySelectorAll('summary');
    expect(sa.getAttribute('aria-expanded')).toBe('false');
    expect(sa.getAttribute('aria-controls')).toBeTruthy();
    const changes = [];
    sec.addEventListener('nojs:accordion-change', (e) => changes.push([e.detail.index, e.detail.open]));
    const a = document.getElementById('a');
    a.open = true;
    a.dispatchEvent(new Event('toggle'));
    expect(sa.getAttribute('aria-expanded')).toBe('true');
    expect(changes).toEqual([[0, true]]);
    h.dispose(sec);
    a.dispatchEvent(new Event('toggle'));
    expect(changes).toHaveLength(1);
  });
});

describe('tooltip', () => {
  test('reads tooltip-disabled as a delivered value and hides when a server change disables it', () => {
    jest.useFakeTimers();
    document.body.innerHTML = '<span tooltip="Hint" tooltip-delay="0" tooltip-disabled="false">x</span>';
    h.initAll();
    const el = document.querySelector('span');
    expect(el.getAttribute('aria-describedby')).toMatch(/^nojs-tooltip-/);
    el.dispatchEvent(new Event('mouseenter'));
    jest.runAllTimers();
    const tip = document.getElementById(el.getAttribute('aria-describedby'));
    expect(tip.getAttribute('aria-hidden')).toBe('false');

    el.setAttribute('tooltip-disabled', 'true'); // morph
    h.runWatchers();
    expect(tip.isConnected).toBe(false);

    el.dispatchEvent(new Event('mouseenter'));
    jest.runAllTimers();
    expect(tip.isConnected).toBe(false);
    h.dispose(el);
  });

  test('warns through the host when the text is missing', () => {
    document.body.innerHTML = '<span tooltip="">x</span>';
    h.initAll();
    expect(h.warns).toEqual(['[tooltip] attribute value (tooltip text) is required.']);
  });
});

describe('tabs', () => {
  function tabsMarkup(disabled = 'true') {
    return `<div tabs="1">
      <button tab>A</button><button tab>B</button><button tab tab-disabled="${disabled}">C</button>
      <div panel>pa</div><div panel>pb</div><div panel>pc</div></div>`;
  }

  test('builds the tablist and reads tab-disabled as a delivered value', () => {
    document.body.innerHTML = tabsMarkup();
    h.initAll();
    const el = document.querySelector('[tabs]');
    const tabs = el.querySelectorAll('[role="tablist"] > [role="tab"]');
    expect(tabs).toHaveLength(3);
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(tabs[2].getAttribute('aria-disabled')).toBe('true');
  });

  test('a re-init after a server re-render keeps the selected tab', () => {
    document.body.innerHTML = tabsMarkup();
    h.initAll();
    const el = document.querySelector('[tabs]');
    el.querySelectorAll('[role="tab"]')[0].click();
    expect(_tabsState.containers.get(el).activeIndex).toBe(0);
    const ids = [...el.querySelectorAll('[role="tab"], [role="tabpanel"]')].map((n) => n.id);

    h.dispose(el, 'tabs');
    // The morph brings back the server markup, then the host re-inits.
    el.innerHTML = tabsMarkup('false').replace(/^<div tabs="1">|<\/div>$/g, '');
    h.initAll();
    const tabs = el.querySelectorAll('[role="tablist"] > [role="tab"]');
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(tabs[2].hasAttribute('aria-disabled')).toBe(false);
    expect([...el.querySelectorAll('[role="tab"], [role="tabpanel"]')].map((n) => n.id)).toEqual(ids);
  });
});

describe('modal, dropdown, popover', () => {
  test('modal opens from modal-open and closes from modal-close', () => {
    document.body.innerHTML = `<button id="o" modal-open="m">open</button>
      <div modal="m"><h2>T</h2><button id="c" modal-close>x</button></div>`;
    const modal = document.querySelector('[modal]');
    modal.showPopover = jest.fn();
    modal.hidePopover = jest.fn();
    h.initAll();
    expect(modal.getAttribute('role')).toBe('dialog');
    expect(modal.getAttribute('aria-labelledby')).toBe(modal.querySelector('h2').id);
    document.getElementById('o').click();
    expect(modal.showPopover).toHaveBeenCalled();
    document.getElementById('c').click();
    expect(modal.hidePopover).toHaveBeenCalled();
  });

  test('dropdown toggle wires the menu and toggles aria-expanded', () => {
    document.body.innerHTML = `<div dropdown><button dropdown-toggle>v</button>
      <ul dropdown-menu><li dropdown-item>a</li></ul></div>`;
    h.initAll();
    const btn = document.querySelector('[dropdown-toggle]');
    const menu = document.querySelector('[dropdown-menu]');
    expect(btn.getAttribute('aria-controls')).toBe(menu.id);
    expect(menu.getAttribute('role')).toBe('menu');
    btn.click();
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  test('popover registers and its trigger points at it', () => {
    document.body.innerHTML = `<button popover-trigger="p">i</button><div popover="p">info</div>`;
    h.initAll();
    const pop = document.querySelector('[popover="p"], [data-popover-id="p"]');
    expect(pop.classList.contains('nojs-popover')).toBe(true);
    expect(document.querySelector('[popover-trigger]').getAttribute('aria-controls')).toBe('p');
  });
});

describe('toast', () => {
  test('a literal message on a button shows on click', () => {
    document.body.innerHTML = '<div toast-container="top-left"></div><button toast="Saved!" toast-duration="0">s</button>';
    h.initAll();
    document.querySelector('button').click();
    expect(document.querySelector('.nojs-toast').textContent).toContain('Saved!');
  });

  test('literal text on a compiled on:click element is interactive', () => {
    document.body.innerHTML = '<div toast-container></div><span toast="Done now" toast-duration="0">s</span>';
    h.initAll();
    document.querySelector('span').click();
    expect(document.querySelector('.nojs-toast').textContent).toContain('Done now');
  });

  test('a delivered value shows a toast when a re-render changes it, never at first render', () => {
    document.body.innerHTML = '<div toast-container></div><p toast="&quot;Hello&quot;" toast-duration="0"></p>';
    h.initAll();
    expect(document.querySelectorAll('.nojs-toast')).toHaveLength(0);
    const p = document.querySelector('p');

    h.dispose(p, 'toast');
    p.setAttribute('toast', '"Saved"');
    h.initAll();
    expect(document.querySelector('.nojs-toast').textContent).toContain('Saved');

    h.dispose(p, 'toast');
    h.initAll(); // same value: no new toast
    expect(document.querySelectorAll('.nojs-toast')).toHaveLength(1);
  });
});

describe('skeleton', () => {
  test('reads the delivered value', () => {
    document.body.innerHTML = '<div skeleton="true" skeleton-lines="2">c</div><div skeleton="false">d</div>';
    h.initAll();
    const [on, off] = document.querySelectorAll('[skeleton]');
    expect(on.classList.contains('nojs-skeleton')).toBe(true);
    expect(on.getAttribute('aria-busy')).toBe('true');
    expect(on.querySelectorAll('.nojs-skeleton-line')).toHaveLength(2);
    expect(off.classList.contains('nojs-skeleton')).toBe(false);
    h.dispose(on);
    expect(on.classList.contains('nojs-skeleton')).toBe(false);
    expect(on.querySelectorAll('.nojs-skeleton-line')).toHaveLength(0);
  });
});

describe('stepper', () => {
  test('step-validate gates Next with the delivered value; a re-init stays on the step', () => {
    document.body.innerHTML = `<div stepper>
      <div step>one</div><div step step-validate="false">two</div><div step>three</div></div>`;
    h.initAll();
    const el = document.querySelector('[stepper]');
    const next = () => el.querySelector('.nojs-stepper-next').click();
    const current = () => [...el.querySelectorAll('[step]')].findIndex((s) => s.getAttribute('aria-current') === 'step');
    next();
    expect(current()).toBe(1);
    next();
    expect(current()).toBe(1);
    const ids = [...el.querySelectorAll('.nojs-stepper-indicator-item')].map((i) => i.id);

    h.dispose(el, 'stepper');
    el.querySelectorAll('[step]')[1].setAttribute('step-validate', 'true');
    h.initAll();
    expect(current()).toBe(1);
    expect([...el.querySelectorAll('.nojs-stepper-indicator-item')].map((i) => i.id)).toEqual(ids);
    next();
    expect(current()).toBe(2);
  });

  test('the validation gate reads the server form state', () => {
    document.body.innerHTML = `<div stepper><div step stepper-validate>
      <form validate data-nj-form-state='{"valid":false,"submitting":false,"pending":false,"reset":0}'></form>
      </div><div step>two</div></div>`;
    h.initAll();
    const el = document.querySelector('[stepper]');
    el.querySelector('.nojs-stepper-next').click();
    expect(el.querySelectorAll('[step]')[0].getAttribute('aria-current')).toBe('step');
  });
});

describe('breadcrumb', () => {
  test('auto mode tracks the page path and nojs:navigate', () => {
    window.history.replaceState(null, '', '/docs/getting-started');
    document.body.innerHTML = '<nav breadcrumb></nav>';
    h.initAll();
    const labels = () => [...document.querySelectorAll('ol.nojs-breadcrumb li')].map((li) => li.textContent);
    expect(labels()).toEqual(['Home', 'Docs', 'Getting started']);
    window.history.replaceState(null, '', '/docs');
    document.dispatchEvent(new CustomEvent('nojs:navigate', { detail: { path: '/docs' } }));
    expect(labels()).toEqual(['Home', 'Docs']);
    h.dispose(document.querySelector('nav'));
    window.history.replaceState(null, '', '/');
    document.dispatchEvent(new CustomEvent('nojs:navigate', { detail: { path: '/' } }));
    expect(labels()).toEqual(['Home', 'Docs']);
  });

  test('manual mode builds from the children', () => {
    document.body.innerHTML = '<nav breadcrumb><a href="/">Home</a><span>Here</span></nav>';
    h.initAll();
    expect(document.querySelector('[aria-current="page"]').textContent).toBe('Here');
  });
});

describe('table', () => {
  function table() {
    document.body.innerHTML = `<table sortable><thead><tr><th sort="name">N</th></tr></thead>
      <tbody><tr><td>Carol</td></tr><tr><td>Alice</td></tr><tr><td>Bob</td></tr></tbody></table>`;
    return document.querySelector('table');
  }
  const names = (t) => [...t.querySelectorAll('tbody td')].map((td) => td.textContent);

  test('sorts the rendered rows (no client state)', () => {
    const t = table();
    h.initAll();
    t.querySelector('th').click();
    expect(names(t)).toEqual(['Alice', 'Bob', 'Carol']);
    expect(t.querySelector('th').getAttribute('aria-sort')).toBe('ascending');
  });

  test('re-applies the sort when a server re-render re-initializes sortable', () => {
    const t = table();
    h.initAll();
    t.querySelector('th').click();
    t.querySelector('th').click();
    expect(names(t)).toEqual(['Carol', 'Bob', 'Alice']);
    h.dispose(t, 'sortable');
    t.querySelector('tbody').innerHTML = '<tr><td>Dan</td></tr><tr><td>Alice</td></tr><tr><td>Eve</td></tr>';
    h.initAll();
    expect(names(t)).toEqual(['Eve', 'Dan', 'Alice']);
    expect(_tableState.sorts.get(t).direction).toBe('desc');
  });
});

describe('split, tree, scroll-spy', () => {
  test('split inserts gutters between panes', () => {
    document.body.innerHTML = '<div split><div pane>a</div><div pane>b</div></div>';
    h.initAll();
    expect(document.querySelectorAll('[split] > [role="separator"]')).toHaveLength(1);
  });

  test('tree branches toggle', () => {
    document.body.innerHTML = '<ul tree><li branch id="b">src<ul subtree><li>a</li></ul></li></ul>';
    h.initAll();
    return Promise.resolve().then(() => {
      const b = document.getElementById('b');
      expect(b.getAttribute('role')).toBe('treeitem');
      b.click();
      expect(b.getAttribute('aria-expanded')).toBe('true');
      expect(b.querySelector('[subtree]').getAttribute('aria-hidden')).toBe('false');
    });
  });

  test('scroll-spy warns through the host when the target is missing', () => {
    document.body.innerHTML = '<button spy>x</button>';
    h.initAll();
    expect(h.warns).toEqual([expect.stringContaining('could not resolve target ID')]);
  });
});

describe('virtual-list', () => {
  test('windows the server-rendered items', () => {
    const items = Array.from({ length: 50 }, (_, i) => `<li>Row ${i}</li>`).join('');
    document.body.innerHTML = `<ul virtual virtual-height="20" virtual-buffer="1">${items}</ul>`;
    const ul = document.querySelector('ul');
    Object.defineProperty(ul, 'clientHeight', { value: 60, configurable: true });
    h.initAll();
    const rendered = ul.querySelectorAll('[role="option"]');
    expect(rendered.length).toBeGreaterThan(0);
    expect(rendered.length).toBeLessThan(10);
    expect(rendered[0].textContent).toBe('Row 0');
    expect(rendered[0].getAttribute('aria-setsize')).toBe('50');
    expect(ul.querySelectorAll('.nojs-virtual-spacer')).toHaveLength(2);
    h.dispose(ul);
  });
});
