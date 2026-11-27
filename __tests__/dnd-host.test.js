import NoJSElements from '../src/index.js';
import { isHostBackend } from '../src/_host.js';
import { _dndState, resetDndState } from '../src/dnd/state.js';
import { dndContract } from '../src/dnd/contract.js';
import { uiContract } from '../src/ui-contract.js';

// Host backend (NoJS-Server compiled sites): directives receive
// `init(el, host)` and only do DOM mechanics. Expressions were compiled
// server-side: `drag` carries a sealed token, `drop` a binding key, and
// *-disabled / drop-max delivered JSON values.

function createHostRegistrar() {
  const directives = new Map();
  return {
    hostApi: 1,
    directives,
    directive(name, def) { directives.set(name, def); },
    filter() {},
    validator() {},
    global() {},
    config() {},
  };
}

function createHost() {
  const disposers = [];
  const watchers = [];
  return {
    exec: jest.fn(),
    warn: jest.fn(),
    value(el, attr) {
      const raw = el.getAttribute(attr);
      return raw == null || raw === '' ? null : JSON.parse(raw);
    },
    watch: jest.fn((el, attr, cb) => {
      watchers.push({ el, attr, cb });
      return () => {};
    }),
    onDispose(el, fn) { disposers.push(fn); },
    dispose() { disposers.splice(0).reverse().forEach((fn) => fn()); },
    watchers,
  };
}

let registrar;

beforeEach(() => {
  registrar = createHostRegistrar();
  NoJSElements.install(registrar);
  resetDndState();
});

afterEach(() => {
  document.body.innerHTML = '';
  resetDndState();
});

function init(name, el, host) {
  registrar.directives.get(name).init(el, host);
}

function buildList(count = 3) {
  const ul = document.createElement('ul');
  ul.setAttribute('drop', 'np-0123456789abcdef0123');
  ul.setAttribute('drop-sort', 'vertical');
  for (let i = 0; i < count; i++) {
    const li = document.createElement('li');
    li.setAttribute('drag', `v1.token-${i}`);
    li.textContent = `Item ${i}`;
    ul.appendChild(li);
  }
  document.body.appendChild(ul);
  // jsdom has no layout: give each li a 20px-tall box stacked vertically.
  [...ul.children].forEach((li, i) => {
    li.getBoundingClientRect = () => ({ top: i * 20, bottom: i * 20 + 20, height: 20, left: 0, right: 100, width: 100, x: 0, y: i * 20 });
  });
  return ul;
}

function dragEvent(type, clientY = 0) {
  const evt = new Event(type, { bubbles: true, cancelable: true });
  evt.clientX = 10;
  evt.clientY = clientY;
  return evt;
}

describe('dual-backend seam', () => {
  test('isHostBackend detects the integrator registrar by hostApi', () => {
    expect(isHostBackend({ hostApi: 1 })).toBe(true);
    expect(isHostBackend({ hostApi: 0 })).toBe(false);
    expect(isHostBackend({ evaluate() {}, internals: {} })).toBe(false);
    expect(isHostBackend(null)).toBe(false);
  });

  test('host install registers every dnd directive, none as a warning stub', () => {
    for (const name of ['drag', 'drop', 'drag-list', 'drag-multiple', 'validate', 'modal', 'tabs']) {
      expect(registrar.directives.has(name)).toBe(true);
    }
    const host = createHost();
    init('drag-list', document.createElement('ul'), host);
    expect(host.warn).not.toHaveBeenCalled();
  });

  test('the plugin exposes the dnd attribute contract', () => {
    expect(NoJSElements.contract.directives.drop.attrs.drop).toBe('statement');
    expect(NoJSElements.contract.directives.drag.attrs.drag).toEqual({ type: 'expression', deliver: 'sealed' });
    expect(NoJSElements.contract.directives).toEqual({ ...dndContract, ...uiContract });
  });
});

describe('drag (host)', () => {
  test('sets the same a11y attributes as the core backend', () => {
    const ul = buildList(1);
    const li = ul.firstElementChild;
    init('drag', li, createHost());
    expect(li.draggable).toBe(true);
    expect(li.getAttribute('aria-roledescription')).toBe('draggable item');
    expect(li.getAttribute('role')).toBe('button');
    expect(li.getAttribute('tabindex')).toBe('0');
  });

  test('dragstart records the sealed token as the dragged item, read at event time', () => {
    const ul = buildList(2);
    const li = ul.children[1];
    init('drag', li, createHost());
    li.setAttribute('drag', 'v1.re-rendered');

    li.dispatchEvent(dragEvent('dragstart'));

    expect(_dndState.dragging.item).toBe('v1.re-rendered');
    expect(_dndState.dragging.sourceCtx).toBeNull();
    expect(li.classList.contains('nojs-dragging')).toBe(true);
  });

  test('a delivered drag-disabled=true cancels dragstart', () => {
    const ul = buildList(1);
    const li = ul.firstElementChild;
    li.setAttribute('drag-disabled', 'true');
    init('drag', li, createHost());

    const evt = dragEvent('dragstart');
    li.dispatchEvent(evt);

    expect(evt.defaultPrevented).toBe(true);
    expect(_dndState.dragging).toBeNull();
  });

  test('applies a delivered drag-disabled=true at init (not draggable, no roledescription)', () => {
    const ul = buildList(1);
    const li = ul.firstElementChild;
    li.setAttribute('drag-disabled', 'true');
    init('drag', li, createHost());
    expect(li.draggable).toBe(false);
    expect(li.hasAttribute('aria-roledescription')).toBe(false);
  });

  test('watches drag-disabled and toggles draggable on change', () => {
    const ul = buildList(1);
    const li = ul.firstElementChild;
    li.setAttribute('drag-disabled', 'false');
    const host = createHost();
    init('drag', li, host);
    expect(host.watch).toHaveBeenCalledWith(li, 'drag-disabled', expect.any(Function));

    li.setAttribute('drag-disabled', 'true');
    host.watchers[0].cb('true', 'false');
    expect(li.draggable).toBe(false);
  });

  test('listeners are removed through host.onDispose', () => {
    const ul = buildList(1);
    const li = ul.firstElementChild;
    const host = createHost();
    init('drag', li, host);
    host.dispose();

    li.dispatchEvent(dragEvent('dragstart'));
    expect(_dndState.dragging).toBeNull();
  });
});

describe('drop (host)', () => {
  function setup(count = 3) {
    const ul = buildList(count);
    const host = createHost();
    init('drop', ul, host);
    for (const li of ul.children) init('drag', li, createHost());
    return { ul, host };
  }

  test('dropping reports the implicit variables as the action payload via host.exec', () => {
    const { ul, host } = setup(3);
    ul.children[0].dispatchEvent(dragEvent('dragstart'));

    ul.dispatchEvent(dragEvent('drop', 55));

    expect(host.exec).toHaveBeenCalledWith('np-0123456789abcdef0123', {
      $drag: 'v1.token-0',
      $dragType: 'default',
      $dragEffect: 'move',
      $dropIndex: 3,
      $source: { index: null },
      $target: { index: 3 },
    });
    expect(_dndState.dragging).toBeNull();
  });

  test('the payload never contains DOM elements', () => {
    const { ul, host } = setup(2);
    ul.children[1].dispatchEvent(dragEvent('dragstart'));
    ul.dispatchEvent(dragEvent('drop', 1));
    const payload = host.exec.mock.calls[0][1];
    expect(JSON.parse(JSON.stringify(payload))).toEqual(payload);
    expect(payload.$dropIndex).toBe(0);
  });

  test('dragover shows the placeholder at the computed index (client mechanics)', () => {
    const { ul } = setup(3);
    ul.setAttribute('drop-placeholder', 'auto');
    // re-init so drop-placeholder is read
    const host = createHost();
    init('drop', ul, host);
    ul.children[0].dispatchEvent(dragEvent('dragstart'));

    ul.dispatchEvent(dragEvent('dragover', 25));

    const ph = ul.querySelector('.nojs-drop-placeholder');
    expect(ph).not.toBeNull();
    expect([...ul.children].indexOf(ph)).toBe(1);
  });

  test('a delivered drop-disabled=true blocks the drop', () => {
    const ul = buildList(2);
    ul.setAttribute('drop-disabled', 'true');
    const host = createHost();
    init('drop', ul, host);
    init('drag', ul.children[0], createHost());
    ul.children[0].dispatchEvent(dragEvent('dragstart'));

    ul.dispatchEvent(dragEvent('drop', 30));

    expect(host.exec).not.toHaveBeenCalled();
  });

  test('a delivered drop-max blocks drops at capacity', () => {
    const ul = buildList(2);
    ul.setAttribute('drop-max', '2');
    const host = createHost();
    init('drop', ul, host);
    init('drag', ul.children[0], createHost());
    ul.children[0].dispatchEvent(dragEvent('dragstart'));

    ul.dispatchEvent(dragEvent('drop', 30));

    expect(host.exec).not.toHaveBeenCalled();
  });

  test('keyboard drop (Enter) also dispatches through host.exec', () => {
    const { ul, host } = setup(2);
    ul.children[0].dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    ul.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(host.exec).toHaveBeenCalledTimes(1);
    expect(host.exec.mock.calls[0][1].$drag).toBe('v1.token-0');
  });
});

describe('drop-disabled watcher (host)', () => {
  test('turning drop-disabled true mid-drag clears drag-over state and placeholder', () => {
    const ul = buildList(2);
    ul.setAttribute('drop-disabled', 'false');
    ul.setAttribute('drop-placeholder', 'auto');
    const host = createHost();
    init('drop', ul, host);
    init('drag', ul.children[0], createHost());
    ul.children[0].dispatchEvent(dragEvent('dragstart'));
    ul.dispatchEvent(dragEvent('dragenter', 5));
    ul.dispatchEvent(dragEvent('dragover', 5));
    expect(ul.classList.contains('nojs-drag-over')).toBe(true);
    expect(ul.querySelector('.nojs-drop-placeholder')).not.toBeNull();

    ul.setAttribute('drop-disabled', 'true');
    const w = host.watchers.find((x) => x.attr === 'drop-disabled');
    w.cb('true', 'false');

    expect(ul.classList.contains('nojs-drag-over')).toBe(false);
    expect(ul.querySelector('.nojs-drop-placeholder')).toBeNull();
  });

  test('no watcher is registered when drop-disabled is not declared on the element', () => {
    const ul = buildList(1);
    const host = createHost();
    init('drop', ul, host);
    expect(host.watchers.find((x) => x.attr === 'drop-disabled')).toBeUndefined();
  });
});

// Server-rendered drag-list (NoJS-Server plugin-lists.ts): the loop's
// markers, one display:contents wrapper per item with its sealed item, and
// the action keys of the compiled edits.
function buildServerList(id, items, attrs = {}) {
  const ul = document.createElement('ul');
  ul.id = id;
  ul.setAttribute('drag-list', id);
  ul.setAttribute('template', 'row');
  ul.setAttribute('data-nj-list', '');
  ul.setAttribute('data-nj-list-move', `np-move-${id}`);
  ul.setAttribute('data-nj-list-insert', `np-insert-${id}`);
  ul.setAttribute('data-nj-list-remove', `np-remove-${id}`);
  for (const [k, v] of Object.entries(attrs)) ul.setAttribute(k, v);
  ul.appendChild(document.createComment('foreach'));
  items.forEach((text, i) => {
    const w = document.createElement('div');
    w.setAttribute('style', 'display: contents;');
    w.setAttribute('data-nj-list-item', `v1.${id}-${i}`);
    const span = document.createElement('span');
    span.textContent = text;
    w.appendChild(span);
    ul.appendChild(w);
  });
  ul.appendChild(document.createComment('/foreach'));
  document.body.appendChild(ul);
  [...ul.querySelectorAll('span')].forEach((el, i) => {
    el.getBoundingClientRect = () => ({ top: i * 20, bottom: i * 20 + 20, height: 20, left: 0, right: 100, width: 100, x: 0, y: i * 20 });
  });
  return ul;
}

function startRowDrag(ul, index) {
  const evt = dragEvent('dragstart');
  evt.dataTransfer = { effectAllowed: '', setData: jest.fn() };
  ul.children[index].firstElementChild.dispatchEvent(evt);
}

// A site whose authors write the build's marker names: the server serves its own under another
// prefix and the host resolves them (host.marker, nojs-server ADR-030 / nojs-elements#133).
function renamed(ul, prefix) {
  for (const el of [ul, ...ul.querySelectorAll('*')]) {
    for (const a of [...el.attributes]) {
      if (!a.name.startsWith('data-nj-list')) continue;
      el.removeAttribute(a.name);
      el.setAttribute(a.name.replace('data-nj-', prefix), a.value);
    }
  }
  return ul;
}
const renamingHost = (prefix) => ({ ...createHost(), marker: (name) => (name.startsWith('data-nj-list') ? name.replace('data-nj-', prefix) : name) });

describe('drag-list (host) under renamed markers', () => {
  test('rows, item and move key come from the served names; an author attribute of the old name is ignored', () => {
    const host = renamingHost('data-nj0-');
    const ul = renamed(buildServerList('a', ['x', 'y', 'z']), 'data-nj0-');
    // The author's own attributes with the build's names (kept as written by the server).
    ul.setAttribute('data-nj-list-move', 'author-move');
    const authorRow = document.createElement('p');
    authorRow.setAttribute('data-nj-list-item', 'author-item');
    document.body.appendChild(authorRow);
    init('drag-list', ul, host);
    startRowDrag(ul, 1);
    expect(_dndState.dragging.item).toBe('v1.a-1');
    ul.dispatchEvent(dragEvent('drop', 55));
    expect(host.exec).toHaveBeenCalledWith('np-move-a', { $from: 1, $to: 2 });
    expect(ul.getAttribute('data-nj-list-move')).toBe('author-move');
  });

  test('a host without marker() reads the names as written', () => {
    const host = createHost();
    const ul = buildServerList('a', ['x', 'y', 'z']);
    init('drag-list', ul, host);
    startRowDrag(ul, 0);
    ul.dispatchEvent(dragEvent('drop', 55));
    expect(host.exec).toHaveBeenCalledWith('np-move-a', { $from: 0, $to: 2 });
  });
});

describe('drag-list (host)', () => {
  test('decorates the server-rendered rows as core renders them and drops the loop markers', () => {
    const ul = buildServerList('backlog', ['Spike SSE', 'Write docs'], { 'drag-list-copy': '' });
    init('drag-list', ul, createHost());
    expect([...ul.childNodes].some((n) => n.nodeType === 8)).toBe(false);
    expect(ul.getAttribute('role')).toBe('listbox');
    expect(ul.getAttribute('aria-dropeffect')).toBe('copy');
    const span = ul.querySelector('span');
    expect(span.draggable).toBe(true);
    expect(span.getAttribute('role')).toBe('option');
    expect(span.getAttribute('aria-roledescription')).toBe('draggable item');
    expect(span.getAttribute('tabindex')).toBe('0');
  });

  test('an empty list gets the empty class', () => {
    const ul = buildServerList('empty', [], { 'drop-empty-class': 'empty' });
    init('drag-list', ul, createHost());
    expect(ul.classList.contains('empty')).toBe(true);
  });

  test('dragging a row records its sealed item', () => {
    const ul = buildServerList('a', ['x', 'y']);
    init('drag-list', ul, createHost());
    startRowDrag(ul, 1);
    expect(_dndState.dragging.item).toBe('v1.a-1');
    expect(_dndState.dragging.sourceIndex).toBe(1);
  });

  test('a reorder in the same list sends the move action with core indices', () => {
    const host = createHost();
    const ul = buildServerList('a', ['x', 'y', 'z']);
    init('drag-list', ul, host);
    startRowDrag(ul, 0);
    ul.dispatchEvent(dragEvent('drop', 55)); // below the third row's midpoint: index 3
    expect(host.exec).toHaveBeenCalledWith('np-move-a', { $from: 0, $to: 2 });
  });

  test('a drop onto the same position sends nothing', () => {
    const host = createHost();
    const ul = buildServerList('a', ['x', 'y']);
    init('drag-list', ul, host);
    startRowDrag(ul, 0);
    ul.dispatchEvent(dragEvent('drop', 5));
    expect(host.exec).not.toHaveBeenCalled();
  });

  test('a move to another list inserts the sealed item there, then removes it from the source', () => {
    const host = createHost();
    const from = buildServerList('a', ['x', 'y'], { 'drag-type': 't', 'drag-list-remove': '' });
    const to = buildServerList('b', ['z'], { 'drop-accept': 't' });
    init('drag-list', from, host);
    init('drag-list', to, host);
    startRowDrag(from, 1);
    to.dispatchEvent(dragEvent('drop', 0));
    expect(host.exec.mock.calls).toEqual([
      ['np-insert-b', { $index: 0, $item: 'v1.a-1' }],
      ['np-remove-a', { $index: 1 }],
    ]);
  });

  test('a copy list keeps its source item', () => {
    const host = createHost();
    const from = buildServerList('a', ['x'], { 'drag-type': 't', 'drag-list-copy': '', 'drag-list-remove': '' });
    const to = buildServerList('b', [], { 'drop-accept': 't' });
    init('drag-list', from, host);
    init('drag-list', to, host);
    startRowDrag(from, 0);
    to.dispatchEvent(dragEvent('drop', 0));
    expect(host.exec.mock.calls).toEqual([['np-insert-b', { $index: 0, $item: 'v1.a-0' }]]);
  });

  test('delivered drop-disabled and drop-max block the drop', () => {
    const host = createHost();
    const from = buildServerList('a', ['x'], { 'drag-type': 't' });
    const off = buildServerList('b', [], { 'drop-accept': 't', 'drop-disabled': 'true' });
    const full = buildServerList('c', ['y'], { 'drop-accept': 't', 'drop-max': '1' });
    for (const ul of [from, off, full]) init('drag-list', ul, host);
    startRowDrag(from, 0);
    off.dispatchEvent(dragEvent('drop', 0));
    full.dispatchEvent(dragEvent('drop', 0));
    expect(host.exec).not.toHaveBeenCalled();
  });

  test('a delivered drag-disabled cancels the row drag', () => {
    const ul = buildServerList('a', ['x'], { 'drag-disabled': 'true' });
    init('drag-list', ul, createHost());
    const evt = dragEvent('dragstart');
    ul.querySelector('span').dispatchEvent(evt);
    expect(evt.defaultPrevented).toBe(true);
    expect(_dndState.dragging).toBeNull();
  });

  test('declares the list in the contract', () => {
    expect(dndContract['drag-list'].attrs['drag-list']).toBe('path');
    expect(dndContract['drag-list'].list).toEqual({
      path: 'drag-list', template: 'template', item: 'drag-list-item', itemDefault: 'item',
      wrapper: { tag: 'div', attrs: { style: 'display: contents;' } },
    });
  });
});

describe('drag-multiple (host)', () => {
  test('selects with a click and drags the selection as sealed references', () => {
    const host = createHost();
    const ul = buildList(3);
    for (const li of ul.children) {
      li.setAttribute('drag-group', 'g');
      li.setAttribute('drag-multiple', '');
      init('drag', li, host);
      init('drag-multiple', li, host);
    }
    const [a, b] = ul.children;
    a.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    b.dispatchEvent(new MouseEvent('click', { bubbles: true, ctrlKey: true }));
    expect(a.classList.contains('nojs-selected')).toBe(true);
    expect(b.classList.contains('nojs-selected')).toBe(true);
    const evt = dragEvent('dragstart');
    evt.dataTransfer = { effectAllowed: '', setData: jest.fn() };
    a.dispatchEvent(evt);
    expect(_dndState.dragging.item).toEqual(['v1.token-0', 'v1.token-1']);
  });

  test('warns like core without drag-group', () => {
    const host = createHost();
    init('drag-multiple', document.createElement('div'), host);
    expect(host.warn).toHaveBeenCalledWith('drag-multiple requires drag-group attribute');
  });
});
