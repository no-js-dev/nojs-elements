import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _dndState, _dragListRegistry, resetDndState } from '../src/dnd/state.js';
import { _injectDndStyles } from '../src/dnd/styles.js';

// ─── Install the plugin once before all tests ────────────────────────
beforeAll(() => {
  NoJS.use(NoJSElements);
});

// ─── Helper: set up a drag source ───────────────────────────────────
function setupDrag(expr = "'item1'", opts = {}) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('state', JSON.stringify(opts.state || { items: ['a', 'b', 'c'] }));

  const el = document.createElement('div');
  el.setAttribute('drag', expr);
  if (opts.dragType) el.setAttribute('drag-type', opts.dragType);
  if (opts.dragEffect) el.setAttribute('drag-effect', opts.dragEffect);
  if (opts.dragHandle) el.setAttribute('drag-handle', opts.dragHandle);
  if (opts.dragDisabled) el.setAttribute('drag-disabled', opts.dragDisabled);
  if (opts.dragClass) el.setAttribute('drag-class', opts.dragClass);
  if (opts.dragGroup) el.setAttribute('drag-group', opts.dragGroup);

  wrapper.appendChild(el);
  document.body.appendChild(wrapper);
  NoJS.processTree(wrapper);
  return { wrapper, el };
}

// ─── Helper: set up a drop target ───────────────────────────────────
function setupDrop(expr = '', opts = {}) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('state', JSON.stringify(opts.state || {}));

  const el = document.createElement('div');
  el.setAttribute('drop', expr);
  if (opts.dropAccept) el.setAttribute('drop-accept', opts.dropAccept);
  if (opts.dropEffect) el.setAttribute('drop-effect', opts.dropEffect);
  if (opts.dropClass) el.setAttribute('drop-class', opts.dropClass);
  if (opts.dropDisabled) el.setAttribute('drop-disabled', opts.dropDisabled);
  if (opts.dropSort) el.setAttribute('drop-sort', opts.dropSort);

  wrapper.appendChild(el);
  document.body.appendChild(wrapper);
  NoJS.processTree(wrapper);
  return { wrapper, el };
}

// ─── Helper: set up a drag-list ─────────────────────────────────────
function setupDragList(listPath = 'items', opts = {}) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('state', JSON.stringify(opts.state || { items: ['a', 'b', 'c'] }));

  // Template for list items
  const tpl = document.createElement('template');
  tpl.id = 'drag-list-tpl';
  tpl.innerHTML = '<div><span bind="item"></span></div>';
  wrapper.appendChild(tpl);

  const el = document.createElement('div');
  el.setAttribute('drag-list', listPath);
  el.setAttribute('template', 'drag-list-tpl');
  if (opts.sortDir) el.setAttribute('drop-sort', opts.sortDir);
  if (opts.dragType) el.setAttribute('drag-type', opts.dragType);

  wrapper.appendChild(el);
  document.body.appendChild(wrapper);
  NoJS.processTree(wrapper);
  return { wrapper, el };
}

// ─── Helper: set up a drag-multiple element ─────────────────────────
function setupDragMultiple(group = 'test-group', opts = {}) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('state', JSON.stringify(opts.state || { item: 'x' }));

  const el = document.createElement('div');
  el.setAttribute('drag', "'x'");
  el.setAttribute('drag-multiple', '');
  el.setAttribute('drag-group', group);
  if (opts.selectClass) el.setAttribute('drag-multiple-class', opts.selectClass);

  wrapper.appendChild(el);
  document.body.appendChild(wrapper);
  NoJS.processTree(wrapper);
  return { wrapper, el };
}

// =======================================================================
//  DND REGISTRATION TESTS
// =======================================================================

describe('DnD Registration', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dnd]').forEach(s => s.remove());
    resetDndState();
  });

  test('1 - registerDnd registers drag directive', () => {
    const el = document.createElement('div');
    el.setAttribute('drag', "'item'");
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');
    wrapper.appendChild(el);
    document.body.appendChild(wrapper);

    // processTree should recognize and initialize the drag directive
    NoJS.processTree(wrapper);
    expect(el.draggable).toBe(true);
  });

  test('2 - registerDnd registers drop directive', () => {
    const { el } = setupDrop();
    expect(el.getAttribute('aria-dropeffect')).toBe('move');
  });

  test('3 - registerDnd registers drag-list directive', () => {
    const { el } = setupDragList('items');
    expect(el.getAttribute('role')).toBe('listbox');
  });

  test('4 - registerDnd registers drag-multiple directive', () => {
    const { el } = setupDragMultiple('grp');
    // drag-multiple runs after drag — if drag-group is present, it sets up the selection set
    expect(_dndState.selected.has('grp')).toBe(true);
  });

  test('5 - removeCoreDirective is called for drag', () => {
    // If core directive was not removed, we'd get a "Cannot override" error.
    // The fact that registration succeeded in beforeAll proves it was called.
    // Confirm the directive works by checking a drag element initializes.
    const { el } = setupDrag("'test'");
    expect(el.draggable).toBe(true);
  });
});

// =======================================================================
//  DND STATE TESTS
// =======================================================================

describe('DnD State', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dnd]').forEach(s => s.remove());
    resetDndState();
  });

  test('6 - _dndState starts with null dragging', () => {
    expect(_dndState.dragging).toBeNull();
  });

  test('7 - _dndState.selected is a Map', () => {
    expect(_dndState.selected).toBeInstanceOf(Map);
  });

  test('8 - _dndState.placeholder starts null', () => {
    expect(_dndState.placeholder).toBeNull();
  });

  test('9 - resetDndState clears dragging', () => {
    _dndState.dragging = { item: 'test' };
    resetDndState();
    expect(_dndState.dragging).toBeNull();
  });

  test('10 - resetDndState clears selected', () => {
    _dndState.selected.set('group1', new Set(['item']));
    resetDndState();
    expect(_dndState.selected.size).toBe(0);
  });

  test('11 - resetDndState removes and clears placeholder', () => {
    const ph = document.createElement('div');
    document.body.appendChild(ph);
    _dndState.placeholder = ph;
    resetDndState();
    expect(_dndState.placeholder).toBeNull();
    expect(ph.parentElement).toBeNull();
  });

  test('12 - resetDndState clears _dragListRegistry', () => {
    const el = document.createElement('div');
    _dragListRegistry.set(el, { listPath: 'items', ctx: {}, el });
    resetDndState();
    expect(_dragListRegistry.size).toBe(0);
  });
});

// =======================================================================
//  DND STYLES TESTS
// =======================================================================

describe('DnD Styles', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dnd]').forEach(s => s.remove());
    resetDndState();
  });

  test('13 - _injectDndStyles creates style tag with data-nojs-dnd', () => {
    _injectDndStyles();
    const style = document.querySelector('style[data-nojs-dnd]');
    expect(style).toBeTruthy();
    expect(style.textContent).toContain('.nojs-dragging');
  });

  test('14 - _injectDndStyles injects only once', () => {
    _injectDndStyles();
    _injectDndStyles();
    _injectDndStyles();
    const styles = document.querySelectorAll('style[data-nojs-dnd]');
    expect(styles.length).toBe(1);
  });

  test('15 - style includes drop placeholder styles', () => {
    _injectDndStyles();
    const style = document.querySelector('style[data-nojs-dnd]');
    expect(style.textContent).toContain('.nojs-drop-placeholder');
  });

  test('16 - style includes selected class', () => {
    _injectDndStyles();
    const style = document.querySelector('style[data-nojs-dnd]');
    expect(style.textContent).toContain('.nojs-selected');
  });

  test('17 - style includes drop settle animation', () => {
    _injectDndStyles();
    const style = document.querySelector('style[data-nojs-dnd]');
    expect(style.textContent).toContain('nojs-drop-settle');
  });
});

// =======================================================================
//  DRAG DIRECTIVE INIT TESTS
// =======================================================================

describe('Drag Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dnd]').forEach(s => s.remove());
    resetDndState();
  });

  test('18 - sets draggable=true', () => {
    const { el } = setupDrag("'test'");
    expect(el.draggable).toBe(true);
  });

  test('19 - sets aria-roledescription initially (WCAG: aria-grabbed deprecated)', () => {
    const { el } = setupDrag("'test'");
    expect(el.getAttribute('aria-roledescription')).toBe('draggable item');
    expect(el.getAttribute('aria-grabbed')).toBeNull();
  });

  test('20 - adds tabindex=0 for keyboard access', () => {
    const { el } = setupDrag("'test'");
    expect(el.getAttribute('tabindex')).toBe('0');
  });

  test('21 - dragstart sets _dndState.dragging', () => {
    const { el } = setupDrag("'myItem'");
    const evt = new Event('dragstart', { bubbles: true });
    evt.dataTransfer = { effectAllowed: '', setData: jest.fn() };
    el.dispatchEvent(evt);

    expect(_dndState.dragging).toBeTruthy();
    expect(_dndState.dragging.sourceEl).toBe(el);
  });

  test('22 - dragstart applies drag class', () => {
    const { el } = setupDrag("'test'");
    const evt = new Event('dragstart', { bubbles: true });
    evt.dataTransfer = { effectAllowed: '', setData: jest.fn() };
    el.dispatchEvent(evt);

    expect(el.classList.contains('nojs-dragging')).toBe(true);
  });

  test('23 - dragstart preserves aria-roledescription (no aria-grabbed)', () => {
    const { el } = setupDrag("'test'");
    const evt = new Event('dragstart', { bubbles: true });
    evt.dataTransfer = { effectAllowed: '', setData: jest.fn() };
    el.dispatchEvent(evt);

    expect(el.getAttribute('aria-roledescription')).toBe('draggable item');
    expect(el.getAttribute('aria-grabbed')).toBeNull();
  });

  test('24 - dragstart dispatches drag-start custom event', () => {
    const { el } = setupDrag("'test'");
    const handler = jest.fn();
    el.addEventListener('nojs:dnd-start', handler);

    const evt = new Event('dragstart', { bubbles: true });
    evt.dataTransfer = { effectAllowed: '', setData: jest.fn() };
    el.dispatchEvent(evt);

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail.el).toBe(el);
  });

  test('25 - dragend removes drag class and resets state', () => {
    const { el } = setupDrag("'test'");

    // Start drag
    const startEvt = new Event('dragstart', { bubbles: true });
    startEvt.dataTransfer = { effectAllowed: '', setData: jest.fn() };
    el.dispatchEvent(startEvt);
    expect(el.classList.contains('nojs-dragging')).toBe(true);

    // End drag
    el.dispatchEvent(new Event('dragend', { bubbles: true }));
    expect(el.classList.contains('nojs-dragging')).toBe(false);
    expect(el.getAttribute('aria-grabbed')).toBeNull();
    expect(el.getAttribute('aria-roledescription')).toBe('draggable item');
  });

  test('26 - dragend dispatches drag-end custom event', () => {
    const { el } = setupDrag("'test'");
    const handler = jest.fn();
    el.addEventListener('nojs:dnd-end', handler);

    const startEvt = new Event('dragstart', { bubbles: true });
    startEvt.dataTransfer = { effectAllowed: '', setData: jest.fn() };
    el.dispatchEvent(startEvt);
    el.dispatchEvent(new Event('dragend', { bubbles: true }));

    expect(handler).toHaveBeenCalled();
  });

  test('27 - custom drag-class attribute is used', () => {
    const { el } = setupDrag("'test'", { dragClass: 'custom-drag' });
    const evt = new Event('dragstart', { bubbles: true });
    evt.dataTransfer = { effectAllowed: '', setData: jest.fn() };
    el.dispatchEvent(evt);

    expect(el.classList.contains('custom-drag')).toBe(true);
    expect(el.classList.contains('nojs-dragging')).toBe(false);
  });

  test('28 - keyboard: Space initiates keyboard drag', () => {
    const { el } = setupDrag("'kbItem'");
    el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

    expect(_dndState.dragging).toBeTruthy();
    expect(el.getAttribute('aria-grabbed')).toBeNull();
    expect(el.getAttribute('aria-roledescription')).toBe('draggable item');
    expect(el.classList.contains('nojs-dragging')).toBe(true);
  });

  test('29 - keyboard: Escape cancels keyboard drag', () => {
    const { el } = setupDrag("'kbItem'");
    el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(_dndState.dragging).toBeTruthy();

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(_dndState.dragging).toBeNull();
    expect(el.getAttribute('aria-grabbed')).toBeNull();
    expect(el.getAttribute('aria-roledescription')).toBe('draggable item');
    expect(el.classList.contains('nojs-dragging')).toBe(false);
  });
});

// =======================================================================
//  DROP DIRECTIVE TESTS
// =======================================================================

describe('Drop Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dnd]').forEach(s => s.remove());
    resetDndState();
  });

  test('30 - sets aria-dropeffect', () => {
    const { el } = setupDrop('', { dropEffect: 'copy' });
    expect(el.getAttribute('aria-dropeffect')).toBe('copy');
  });

  test('31 - default aria-dropeffect is move', () => {
    const { el } = setupDrop();
    expect(el.getAttribute('aria-dropeffect')).toBe('move');
  });

  test('32 - dragover with matching type adds drop-class', () => {
    const { el } = setupDrop('', { dropAccept: 'default' });

    // Simulate an active drag
    _dndState.dragging = { item: 'x', type: 'default', effect: 'move', sourceEl: document.createElement('div') };

    // First dragenter to set depth
    el.dispatchEvent(new Event('dragenter', { bubbles: true }));
    expect(el.classList.contains('nojs-drag-over')).toBe(true);
  });

  test('33 - dragover with non-matching type adds reject class', () => {
    const { el } = setupDrop('', { dropAccept: 'file' });

    _dndState.dragging = { item: 'x', type: 'default', effect: 'move', sourceEl: document.createElement('div') };

    el.dispatchEvent(new Event('dragenter', { bubbles: true }));
    expect(el.classList.contains('nojs-drop-reject')).toBe(true);
    expect(el.classList.contains('nojs-drag-over')).toBe(false);
  });

  test('34 - dragleave removes drop classes', () => {
    const { el } = setupDrop('', { dropAccept: 'default' });

    _dndState.dragging = { item: 'x', type: 'default', effect: 'move', sourceEl: document.createElement('div') };

    el.dispatchEvent(new Event('dragenter', { bubbles: true }));
    expect(el.classList.contains('nojs-drag-over')).toBe(true);

    el.dispatchEvent(new Event('dragleave', { bubbles: true }));
    expect(el.classList.contains('nojs-drag-over')).toBe(false);
  });

  test('35 - dragleave dispatches drag-leave custom event', () => {
    const { el } = setupDrop();
    const handler = jest.fn();
    el.addEventListener('nojs:dnd-leave', handler);

    _dndState.dragging = { item: 'x', type: 'default', effect: 'move', sourceEl: document.createElement('div') };

    el.dispatchEvent(new Event('dragenter', { bubbles: true }));
    el.dispatchEvent(new Event('dragleave', { bubbles: true }));
    expect(handler).toHaveBeenCalled();
  });

  test('36 - keyboard Enter/Space triggers drop when item is grabbed', () => {
    const { el } = setupDrop();

    _dndState.dragging = { item: 'x', type: 'default', effect: 'move', sourceEl: document.createElement('div') };

    const handler = jest.fn();
    el.addEventListener('nojs:dnd-drop', handler);

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    // The drop handler runs, clears dragging state
    expect(_dndState.dragging).toBeNull();
  });
});

// =======================================================================
//  DRAG-LIST DIRECTIVE TESTS
// =======================================================================

describe('Drag-List Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dnd]').forEach(s => s.remove());
    resetDndState();
  });

  test('37 - sets role=listbox on container', () => {
    const { el } = setupDragList('items');
    expect(el.getAttribute('role')).toBe('listbox');
  });

  test('38 - sets aria-dropeffect=move by default', () => {
    const { el } = setupDragList('items');
    expect(el.getAttribute('aria-dropeffect')).toBe('move');
  });

  test('39 - renders items from the array', () => {
    const { el } = setupDragList('items', { state: { items: ['a', 'b', 'c'] } });
    // role="option" is set on each rendered, focusable item (the dragEl)
    const options = el.querySelectorAll('[role="option"]');
    expect(options.length).toBe(3);
  });

  test('40 - items are draggable', () => {
    const { el } = setupDragList('items', { state: { items: ['a', 'b'] } });
    // role="option" lives on the focusable item itself, which is also draggable
    const options = el.querySelectorAll('[role="option"]');
    for (const dragEl of options) {
      expect(dragEl.draggable).toBe(true);
      expect(dragEl.getAttribute('aria-roledescription')).toBe('draggable item');
    }
  });

  test('41 - registers in _dragListRegistry', () => {
    const { el } = setupDragList('items');
    expect(_dragListRegistry.has(el)).toBe(true);
    expect(_dragListRegistry.get(el).listPath).toBe('items');
  });

  test('42 - empty list gets empty class', () => {
    const { el } = setupDragList('items', { state: { items: [] } });
    expect(el.classList.contains('nojs-drag-list-empty')).toBe(true);
  });
});

// =======================================================================
//  DRAG-MULTIPLE DIRECTIVE TESTS
// =======================================================================

describe('Drag-Multiple Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dnd]').forEach(s => s.remove());
    resetDndState();
  });

  test('43 - initializes selection set for group', () => {
    setupDragMultiple('my-group');
    expect(_dndState.selected.has('my-group')).toBe(true);
    expect(_dndState.selected.get('my-group').size).toBe(0);
  });

  test('44 - click selects the element', () => {
    const { el } = setupDragMultiple('sel-group');
    el.click();
    expect(_dndState.selected.get('sel-group').size).toBe(1);
    expect(el.classList.contains('nojs-selected')).toBe(true);
  });

  test('45 - Ctrl+click adds to selection', () => {
    const { el: el1 } = setupDragMultiple('multi');
    const { el: el2 } = setupDragMultiple('multi');

    el1.click();
    expect(_dndState.selected.get('multi').size).toBe(1);

    el2.dispatchEvent(new MouseEvent('click', { ctrlKey: true, bubbles: true }));
    expect(_dndState.selected.get('multi').size).toBe(2);
  });

  test('46 - Ctrl+click toggles selection off', () => {
    const { el } = setupDragMultiple('toggle');
    el.click();
    expect(el.classList.contains('nojs-selected')).toBe(true);

    el.dispatchEvent(new MouseEvent('click', { ctrlKey: true, bubbles: true }));
    expect(el.classList.contains('nojs-selected')).toBe(false);
    expect(_dndState.selected.get('toggle').size).toBe(0);
  });

  test('47 - Escape clears all selections in group', () => {
    const { el: el1 } = setupDragMultiple('esc-group');
    const { el: el2 } = setupDragMultiple('esc-group');

    el1.click();
    el2.dispatchEvent(new MouseEvent('click', { ctrlKey: true, bubbles: true }));
    expect(_dndState.selected.get('esc-group').size).toBe(2);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(_dndState.selected.get('esc-group').size).toBe(0);
    expect(el1.classList.contains('nojs-selected')).toBe(false);
    expect(el2.classList.contains('nojs-selected')).toBe(false);
  });

  test('48 - custom select class is used', () => {
    const { el } = setupDragMultiple('custom-cls', { selectClass: 'my-selected' });
    el.click();
    expect(el.classList.contains('my-selected')).toBe(true);
    expect(el.classList.contains('nojs-selected')).toBe(false);
  });
});

// =======================================================================
//  CLEANUP / DISPOSE TESTS
// =======================================================================

describe('DnD Cleanup', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-dnd]').forEach(s => s.remove());
    resetDndState();
  });

  test('49 - dispose removes drag event listeners', () => {
    const { el } = setupDrag("'test'");
    const removeSpy = jest.spyOn(el, 'removeEventListener');

    if (el.__disposers) {
      el.__disposers.forEach(fn => fn());
    }

    const removedEvents = removeSpy.mock.calls.map(call => call[0]);
    expect(removedEvents).toContain('dragstart');
    expect(removedEvents).toContain('dragend');
    expect(removedEvents).toContain('keydown');
    removeSpy.mockRestore();
  });

  test('50 - dispose removes drop event listeners', () => {
    const { el } = setupDrop();
    const removeSpy = jest.spyOn(el, 'removeEventListener');

    if (el.__disposers) {
      el.__disposers.forEach(fn => fn());
    }

    const removedEvents = removeSpy.mock.calls.map(call => call[0]);
    expect(removedEvents).toContain('dragover');
    expect(removedEvents).toContain('dragenter');
    expect(removedEvents).toContain('dragleave');
    expect(removedEvents).toContain('drop');
    expect(removedEvents).toContain('keydown');
    removeSpy.mockRestore();
  });

  test('51 - dispose removes drag-list from registry', () => {
    const { el } = setupDragList('items');
    expect(_dragListRegistry.has(el)).toBe(true);

    if (el.__disposers) {
      el.__disposers.forEach(fn => fn());
    }

    expect(_dragListRegistry.has(el)).toBe(false);
  });

  test('52 - dispose removes drag-multiple from selection set', () => {
    const { el } = setupDragMultiple('dispose-grp');
    el.click(); // select it
    expect(_dndState.selected.get('dispose-grp').size).toBe(1);

    if (el.__disposers) {
      el.__disposers.forEach(fn => fn());
    }

    expect(_dndState.selected.get('dispose-grp').size).toBe(0);
  });
});
