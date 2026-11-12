import fs from 'fs';
import path from 'path';
import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';

// Every event the docs name must be one the source dispatches, and every
// event the source dispatches must be documented.

const root = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

// ── Source: events each element dispatches ──────────────────────────

function srcFiles(dir) {
  return fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((d) => {
    const rel = path.join(dir, d.name);
    if (d.isDirectory()) return srcFiles(rel);
    return rel.endsWith('.js') ? [rel] : [];
  });
}

const NATIVE_REDISPATCH = ['focusout'];

const scanProblems = [];

function dispatchedByElement() {
  const byElement = {};
  for (const file of srcFiles('src')) {
    const code = read(file);
    const element = file.split(path.sep)[1];
    const custom = [...code.matchAll(/new CustomEvent\(\s*"([^"]+)"/g)].map((m) => m[1]);
    const native = [...code.matchAll(/new Event\(\s*"([^"]+)"/g)].map((m) => m[1]);
    const dispatches = (code.match(/\.dispatchEvent\(/g) || []).length;
    // A dispatch built from a variable would hide its name from this test.
    if (dispatches !== custom.length + native.length) scanProblems.push(`${file}: ${dispatches} dispatchEvent calls, ${custom.length + native.length} literal events`);
    for (const name of native) if (!NATIVE_REDISPATCH.includes(name)) scanProblems.push(`${file}: native "${name}"`);
    if (custom.length) byElement[element] = new Set([...(byElement[element] || []), ...custom]);
  }
  return byElement;
}

const dispatched = dispatchedByElement();
const allDispatched = new Set(Object.values(dispatched).flatMap((s) => [...s]));

// ── Docs: where each element's events are documented ────────────────

const DOCS = {
  accordion: { md: 'docs/md/accordion.md', llms: 'Accordion', tpl: 'docs/pages/accordion.tpl' },
  dnd: { md: 'docs/md/drag-and-drop.md', llms: 'Drag and Drop', tpl: 'docs/pages/dnd.tpl' },
  split: { md: 'docs/md/split.md', llms: 'Split / Pane', tpl: 'docs/pages/split.tpl' },
  stepper: { md: 'docs/md/stepper.md', llms: 'Stepper', tpl: 'docs/pages/stepper.tpl' },
  table: { md: 'docs/md/table.md', llms: 'Sortable Table', tpl: 'docs/pages/table.tpl' },
  tree: { md: 'docs/md/tree.md', llms: 'Tree', tpl: 'docs/pages/tree.tpl' },
};

function llmsSection(title) {
  const llms = read('docs/llms-full.txt');
  const start = llms.indexOf('\n# ' + title + '\n');
  if (start < 0) throw new Error(`docs/llms-full.txt has no "# ${title}" section`);
  const end = llms.indexOf('\n# ', start + 1);
  return llms.slice(start, end < 0 ? undefined : end);
}

const stripOn = (name) => name.replace(/^on:/, '');

// First-column names of every Markdown table whose header starts with "Event".
function mdTableEvents(md) {
  const names = [];
  const lines = md.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (!/^\|\s*Event\s*\|/.test(lines[i])) continue;
    for (let j = i + 2; j < lines.length && lines[j].startsWith('|'); j++) {
      const m = lines[j].match(/^\|\s*`([^`]+)`\s*\|/);
      if (m) names.push(stripOn(m[1]));
    }
  }
  return names;
}

// First-column names of every HTML table whose first header cell is "Event".
function tplTableEvents(tpl) {
  const names = [];
  for (const table of tpl.split('</table>')) {
    if (!/<thead><tr><th>Event<\/th>/.test(table)) continue;
    for (const m of table.matchAll(/<tr><td><code>([^<]+)<\/code><\/td>/g)) names.push(stripOn(m[1]));
  }
  return names;
}

const NATIVE = new Set([
  'click', 'dblclick', 'input', 'change', 'submit', 'reset', 'keydown', 'keyup', 'keypress',
  'focus', 'blur', 'focusin', 'focusout', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout',
  'mousedown', 'mouseup', 'mousemove', 'pointerdown', 'pointerup', 'pointermove', 'scroll',
  'wheel', 'contextmenu', 'toggle', 'load', 'resize', 'close', 'cancel', 'dragstart', 'drag',
  'dragend', 'dragenter', 'dragleave', 'dragover', 'drop',
  'init', 'mounted', 'updated', 'unmounted', 'error',
]);

// `on:<event>=` listeners in examples, minus native DOM and lifecycle events.
function listenerEvents(text) {
  return [...text.matchAll(/(?<=\s)on:([a-z][\w:-]*?)(?:\.[\w.]+)?=/g)]
    .map((m) => m[1])
    .filter((name) => !NATIVE.has(name));
}

// Backticked namespaced event names in prose, such as `tree:drop`.
function namespacedMentions(text) {
  return [...text.matchAll(/`(?:on:)?((?:nojs|accordion|dnd|split|stepper|table|tree):[a-z][\w-]*)`/g)]
    .map((m) => m[1]);
}

function docFiles() {
  const files = ['README.md', 'docs/README.md', 'docs/llms.txt', 'docs/llms-full.txt', 'docs/index.html'];
  for (const dir of ['docs/md', 'docs/pages']) {
    for (const f of fs.readdirSync(path.join(root, dir))) files.push(path.join(dir, f));
  }
  const walk = (dir) => fs.readdirSync(path.join(root, dir), { withFileTypes: true }).forEach((d) => {
    const rel = path.join(dir, d.name);
    if (d.isDirectory()) walk(rel);
    else if (rel.endsWith('.html')) files.push(rel);
  });
  walk('docs/examples');
  return files.filter((f) => fs.existsSync(path.join(root, f)));
}

const expectAllDispatched = (file, names, valid) => {
  const unknown = names.filter((n) => !valid.has(n));
  expect([file, unknown]).toEqual([file, []]);
};

// ── Tests ───────────────────────────────────────────────────────────

describe('Element docs name the dispatched events', () => {
  test('the source scan finds the dispatched events', () => {
    expect(scanProblems).toEqual([]);
    expect(Object.keys(dispatched).sort()).toEqual(Object.keys(DOCS).sort());
    expect([...dispatched.accordion]).toEqual(['nojs:accordion-change']);
    expect(dispatched.stepper).toEqual(new Set(['nojs:stepper-change', 'nojs:stepper-complete', 'stepper:validation-blocked']));
  });

  describe.each(Object.keys(DOCS))('%s', (element) => {
    const { md, llms, tpl } = DOCS[element];
    const own = dispatched[element];

    test.each([
      [md, () => read(md)],
      ['docs/llms-full.txt § ' + llms, () => llmsSection(llms)],
    ])('%s documents exactly the dispatched events', (file, text) => {
      const names = mdTableEvents(text());
      expectAllDispatched(file, names, own);
      const missing = [...own].filter((n) => !names.includes(n));
      expect([file, missing]).toEqual([file, []]);
    });

    test(`${tpl} names only dispatched events`, () => {
      expectAllDispatched(tpl, tplTableEvents(read(tpl)), own);
    });
  });

  test.each(docFiles())('%s listens only to dispatched events', (file) => {
    const text = read(file);
    expectAllDispatched(file, listenerEvents(text), allDispatched);
    expectAllDispatched(file, namespacedMentions(text), allDispatched);
  });

  test('names from before v1.15.0 are not dispatched', () => {
    const old = ['accordion-change', 'drag-start', 'drag-end', 'drag-enter', 'drag-leave', 'drag-over',
      'drop', 'reorder', 'receive', 'remove', 'step-change', 'step-complete'];
    expect(old.filter((n) => allDispatched.has(n))).toEqual([]);
  });
});

describe('Documented listeners run their statements', () => {
  beforeAll(() => {
    NoJS.use(NoJSElements);
    global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('on:nojs:stepper-change and on:nojs:stepper-complete', () => {
    document.body.innerHTML =
      '<div state="{ changes: 0, done: 0 }">' +
      '<div stepper stepper-nav="false" on:nojs:stepper-change="changes = changes + 1" on:nojs:stepper-complete="done = done + 1">' +
      '<div step>One</div><div step>Two</div>' +
      '</div></div>';
    NoJS.processTree(document.body);
    const outer = NoJS.findContext(document.body.firstElementChild);
    const ctx = NoJS.findContext(document.querySelector('[step]'));
    ctx.$stepper.next();
    ctx.$stepper.next();
    expect(outer.changes).toBe(1);
    expect(outer.done).toBe(1);
  });

  test('on:nojs:accordion-change', () => {
    document.body.innerHTML =
      '<div state="{ last: -1 }">' +
      '<div accordion="multi" on:nojs:accordion-change="last = $event.detail.index">' +
      '<details><summary>A</summary><p>A</p></details>' +
      '<details><summary>B</summary><p>B</p></details>' +
      '</div></div>';
    NoJS.processTree(document.body);
    const second = document.querySelectorAll('details')[1];
    second.open = true;
    second.dispatchEvent(new Event('toggle'));
    expect(NoJS.findContext(document.body.firstElementChild).last).toBe(1);
  });
});
