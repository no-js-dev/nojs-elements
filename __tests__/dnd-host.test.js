import NoJSElements from '../src/index.js';
import { isHostBackend } from '../src/_host.js';
import { _dndState, resetDndState } from '../src/dnd/state.js';
import { dndContract } from '../src/dnd/contract.js';

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

  test('host install registers drag and drop, warn stubs for unmigrated directives', () => {
    expect(registrar.directives.has('drag')).toBe(true);
    expect(registrar.directives.has('drop')).toBe(true);
    for (const name of ['drag-list', 'drag-multiple', 'validate', 'modal', 'tabs']) {
      expect(registrar.directives.has(name)).toBe(true);
    }
    const host = createHost();
    const el = document.createElement('div');
    init('drag-list', el, host);
    expect(host.warn).toHaveBeenCalledWith(expect.stringContaining('"drag-list" is not yet available'));
  });

  test('the plugin exposes the dnd attribute contract', () => {
    expect(NoJSElements.contract.directives.drop.attrs.drop).toBe('statement');
    expect(NoJSElements.contract.directives.drag.attrs.drag).toEqual({ type: 'expression', deliver: 'sealed' });
    expect(NoJSElements.contract.directives).toEqual(dndContract);
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
