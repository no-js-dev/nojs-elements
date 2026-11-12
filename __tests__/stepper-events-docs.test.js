import fs from 'fs';
import path from 'path';
import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';

// Every event the stepper docs name must be one the stepper dispatches.

const root = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

function mdEvents(md) {
  return [...md.matchAll(/^\| `([a-z][\w:-]*)` \|(?: [^|]+ \|)? `\{[^`]*\}` \|/gm)].map((m) => m[1]);
}

function stepperSection(llms) {
  const start = llms.indexOf('\n# Stepper\n');
  return llms.slice(start, llms.indexOf('\n# ', start + 1));
}

function tplEvents(tpl) {
  const table = tpl.slice(tpl.indexOf('<h3>Events</h3>'));
  const body = table.slice(0, table.indexOf('</table>'));
  return [...body.matchAll(/<tr><td><code>([^<]+)<\/code><\/td>/g)].map((m) => m[1]);
}

beforeAll(() => {
  NoJS.use(NoJSElements);
  global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
});

afterEach(() => {
  document.body.innerHTML = '';
});

function dispatchedTypes() {
  const types = new Set();
  const original = EventTarget.prototype.dispatchEvent;
  const spy = jest.spyOn(EventTarget.prototype, 'dispatchEvent').mockImplementation(function (e) {
    types.add(e.type);
    return original.call(this, e);
  });

  document.body.innerHTML =
    '<div state="{}"><div stepper stepper-nav="false">' +
    '<div step stepper-validate><form validate><input name="a" validate="required"></form></div>' +
    '<div step><p>Two</p></div>' +
    '</div></div>';
  NoJS.processTree(document.body);
  const ctx = NoJS.findContext(document.querySelector('[step]'));
  ctx.$stepper.next();                      // blocked by the invalid form
  const input = document.querySelector('input');
  input.value = 'x';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  ctx.$stepper.next();                      // change
  ctx.$stepper.next();                      // complete
  spy.mockRestore();
  return types;
}

describe('Stepper docs name the dispatched events', () => {
  test.each([
    ['docs/md/stepper.md', () => mdEvents(read('docs/md/stepper.md'))],
    ['docs/llms-full.txt', () => mdEvents(stepperSection(read('docs/llms-full.txt')))],
    ['docs/pages/stepper.tpl', () => tplEvents(read('docs/pages/stepper.tpl'))],
  ])('%s', (_file, documented) => {
    const names = documented();
    expect(names).toEqual(expect.arrayContaining(['nojs:stepper-change', 'nojs:stepper-complete', 'stepper:validation-blocked']));
    const types = dispatchedTypes();
    for (const name of names) expect([name, types.has(name)]).toEqual([name, true]);
  });

  test('on:nojs:stepper-change and on:nojs:stepper-complete run their statements', () => {
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

  test('the pre-v1.15.0 names step-change and step-complete are not dispatched', () => {
    const types = dispatchedTypes();
    expect(types.has('step-change')).toBe(false);
    expect(types.has('step-complete')).toBe(false);
  });
});
