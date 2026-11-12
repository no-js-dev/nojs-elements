import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _dndState, resetDndState } from '../src/dnd/state.js';

// WebKit only drops on an element whose dragenter or dragover was cancelled.
// A release on the first pointer position inside a target fires dragenter
// and then drop, with no dragover in between, so every drop target cancels
// dragenter when it would accept the drop, and leaves it alone otherwise.

beforeAll(() => {
  NoJS.use(NoJSElements);
});

afterEach(() => {
  document.body.innerHTML = '';
  resetDndState();
});

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

function render(html, state = {}) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('state', JSON.stringify(state));
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);
  NoJS.processTree(wrapper);
  return wrapper;
}

function dragEvent(type, clientY = 0) {
  const evt = new MouseEvent(type, { bubbles: true, cancelable: true, clientX: 10, clientY });
  evt.dataTransfer = { dropEffect: 'none', effectAllowed: 'all', setData: jest.fn() };
  return evt;
}

function box(el, top, height = 20) {
  el.getBoundingClientRect = () => ({ top, bottom: top + height, height, left: 0, right: 100, width: 100, x: 0, y: top });
}

describe('tree-drag-mode: dragenter', () => {
  const TREE =
    '<ul tree tree-drag-mode="reorder">' +
    '<li branch="expanded" id="a">A<ul subtree><li id="a1">A1</li></ul></li>' +
    '<li branch id="b">B</li>' +
    '<li branch id="c">C</li>' +
    '</ul>';

  let dragged = null;

  // The tree drag state is module-scoped: end every drag before the next test.
  afterEach(() => {
    dragged?.dispatchEvent(dragEvent('dragend'));
    dragged = null;
  });

  async function setup() {
    const tree = render(TREE).querySelector('[tree]');
    await flush();
    const [a, a1, b, c] = ['a', 'a1', 'b', 'c'].map((id) => tree.querySelector(`#${id}`));
    box(a, 0); box(b, 40); box(c, 60);
    dragged = a;
    return { tree, a, a1, b, c };
  }

  test('a valid target cancels dragenter and sets the move drop effect', async () => {
    const { a, c } = await setup();
    a.dispatchEvent(dragEvent('dragstart'));
    const enter = dragEvent('dragenter', 78);
    c.dispatchEvent(enter);
    expect(enter.defaultPrevented).toBe(true);
    expect(enter.dataTransfer.dropEffect).toBe('move');
  });

  test('a drop right after dragenter, with no dragover, reorders', async () => {
    const { tree, a, c } = await setup();
    const handler = jest.fn();
    tree.addEventListener('tree:reorder', handler);
    a.dispatchEvent(dragEvent('dragstart'));
    c.dispatchEvent(dragEvent('dragenter', 78));
    c.dispatchEvent(dragEvent('drop', 78));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual({ node: a, newIndex: 2 });
  });

  test('the drop indicator is shown on dragenter', async () => {
    const { a, c } = await setup();
    a.dispatchEvent(dragEvent('dragstart'));
    c.dispatchEvent(dragEvent('dragenter', 78));
    expect(document.querySelector('.nojs-tree-drag-indicator')).not.toBeNull();
  });

  test('the dragged node and its descendants do not cancel dragenter', async () => {
    const { tree, a, a1 } = await setup();
    const handler = jest.fn();
    tree.addEventListener('tree:reorder', handler);
    a.dispatchEvent(dragEvent('dragstart'));
    for (const target of [a, a1]) {
      const enter = dragEvent('dragenter', 5);
      target.dispatchEvent(enter);
      expect(enter.defaultPrevented).toBe(false);
    }
    a1.dispatchEvent(dragEvent('drop', 5));
    expect(handler).not.toHaveBeenCalled();
  });

  test('dragenter without an active tree drag is left alone', async () => {
    const { c } = await setup();
    const enter = dragEvent('dragenter', 78);
    c.dispatchEvent(enter);
    expect(enter.defaultPrevented).toBe(false);
  });
});

describe('table-reorder: dragenter', () => {
  function setup() {
    const table = render(
      '<table table-reorder><tbody><tr id="r1"><td>1</td></tr><tr id="r2"><td>2</td></tr><tr id="r3"><td>3</td></tr></tbody></table>'
    ).querySelector('table');
    const tbody = table.querySelector('tbody');
    const rows = [...tbody.rows];
    rows.forEach((r, i) => box(r, i * 20));
    return { table, tbody, rows };
  }

  test('a row cancels dragenter during a row drag and sets the move drop effect', () => {
    const { rows } = setup();
    rows[0].dispatchEvent(dragEvent('dragstart'));
    const enter = dragEvent('dragenter', 58);
    rows[2].dispatchEvent(enter);
    expect(enter.defaultPrevented).toBe(true);
    expect(enter.dataTransfer.dropEffect).toBe('move');
  });

  test('the tbody cancels dragenter during a row drag', () => {
    const { tbody, rows } = setup();
    rows[0].dispatchEvent(dragEvent('dragstart'));
    const enter = dragEvent('dragenter', 70);
    tbody.dispatchEvent(enter);
    expect(enter.defaultPrevented).toBe(true);
  });

  test('a drop right after dragenter, with no dragover, reorders', () => {
    const { table, rows } = setup();
    const handler = jest.fn();
    table.addEventListener('table:reorder', handler);
    rows[0].dispatchEvent(dragEvent('dragstart'));
    rows[2].dispatchEvent(dragEvent('dragenter', 58));
    rows[2].dispatchEvent(dragEvent('drop', 58));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toMatchObject({ from: 0, to: 2 });
  });

  test('dragenter without a row drag is left alone', () => {
    const { tbody, rows } = setup();
    for (const target of [rows[1], tbody]) {
      const enter = dragEvent('dragenter', 30);
      target.dispatchEvent(enter);
      expect(enter.defaultPrevented).toBe(false);
    }
  });
});

describe('drop: dragenter', () => {
  function setup(attrs = '') {
    const zone = render(`<div drop="dropped = $drag" drop-accept="task" ${attrs}></div>`, { dropped: null }).querySelector('[drop]');
    _dndState.dragging = { item: 'x', type: 'task', effect: 'move', sourceEl: document.createElement('div') };
    return zone;
  }

  test('an accepting zone cancels dragenter and sets its drop effect', () => {
    const zone = setup('drop-effect="copy"');
    const enter = dragEvent('dragenter');
    zone.dispatchEvent(enter);
    expect(enter.defaultPrevented).toBe(true);
    expect(enter.dataTransfer.dropEffect).toBe('copy');
  });

  test('a nested dragenter inside an accepting zone is cancelled too', () => {
    const zone = setup();
    const child = document.createElement('span');
    zone.appendChild(child);
    zone.dispatchEvent(dragEvent('dragenter'));
    const enter = dragEvent('dragenter');
    child.dispatchEvent(enter);
    expect(enter.defaultPrevented).toBe(true);
  });

  test('a zone that rejects the type does not cancel dragenter', () => {
    const zone = setup();
    _dndState.dragging.type = 'file';
    const enter = dragEvent('dragenter');
    zone.dispatchEvent(enter);
    expect(enter.defaultPrevented).toBe(false);
    expect(zone.classList.contains('nojs-drop-reject')).toBe(true);
  });

  test('a full zone does not cancel dragenter', () => {
    const zone = setup('drop-max="0"');
    const enter = dragEvent('dragenter');
    zone.dispatchEvent(enter);
    expect(enter.defaultPrevented).toBe(false);
  });

  test('a disabled zone does not cancel dragenter', () => {
    const zone = setup('drop-disabled="true"');
    const enter = dragEvent('dragenter');
    zone.dispatchEvent(enter);
    expect(enter.defaultPrevented).toBe(false);
  });
});

describe('drag-list: dragenter', () => {
  function setup(attrs = '') {
    const wrapper = render(
      '<template id="dl-tpl"><div bind="item"></div></template>' +
      `<div id="dl" drag-list="items" template="dl-tpl" drag-type="task" drop-accept="task" ${attrs}></div>`,
      { items: ['a'] }
    );
    _dndState.dragging = { item: 'x', type: 'task', effect: 'move', sourceEl: document.createElement('div') };
    return wrapper.querySelector('#dl');
  }

  test('an accepting list cancels dragenter and sets the move drop effect', () => {
    const list = setup();
    const enter = dragEvent('dragenter');
    list.dispatchEvent(enter);
    expect(enter.defaultPrevented).toBe(true);
    expect(enter.dataTransfer.dropEffect).toBe('move');
  });

  test('a copy list sets the copy drop effect', () => {
    const list = setup('drag-list-copy');
    const enter = dragEvent('dragenter');
    list.dispatchEvent(enter);
    expect(enter.dataTransfer.dropEffect).toBe('copy');
  });

  test('a list that rejects the type does not cancel dragenter', () => {
    const list = setup();
    _dndState.dragging.type = 'file';
    const enter = dragEvent('dragenter');
    list.dispatchEvent(enter);
    expect(enter.defaultPrevented).toBe(false);
  });

  test('a full list does not cancel dragenter', () => {
    const list = setup('drop-max="1"');
    const enter = dragEvent('dragenter');
    list.dispatchEvent(enter);
    expect(enter.defaultPrevented).toBe(false);
  });
});
