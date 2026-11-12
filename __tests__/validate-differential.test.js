import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { registerValidate as registerEngineBacked } from '../src/validate/element.js';
import { registerValidate as registerLegacy } from './fixtures/validate-element-legacy.js';

// Differential test: the engine-backed directive (src/validate/element.js on
// top of src/validate/engine.js) against a frozen copy of the directive as
// it shipped before the engine extraction (release-1.23 92c0034,
// __tests__/fixtures/validate-element-legacy.js). A seeded generator builds
// forms from every attribute the directive reads and drives them with
// random interaction scripts; after every step both implementations must
// produce the same $form, the same `as` aliases, the same markup (aria-invalid,
// error classes, error-template wrappers, novalidate, disabled buttons) and
// the same submit veto.

beforeAll(() => {
  NoJS.use(NoJSElements);
  NoJS.validator('even', (value) => Number(value) % 2 === 0 || 'Must be even');
  NoJS.validator('sameAs', (value, other, all) => value === (all && all[other]) || `Must match ${other}`);
  NoJS.validator('truthy', (value) => (value ? true : 0));
});

afterEach(() => {
  document.body.innerHTML = '';
  jest.useRealTimers();
});

// ── Seeded PRNG (mulberry32) ─────────────────────────────────────────
function prng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = (rand, list) => list[Math.floor(rand() * list.length)];
const maybe = (rand, p = 0.5) => rand() < p;

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function attrs(map) {
  return Object.entries(map)
    .filter(([, v]) => v !== null && v !== undefined)
    .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`))
    .join('');
}

const RULES = ['required', 'email', 'url', 'min:3', 'max:10', 'min:18', 'custom:even', 'even',
  'sameAs:f0', 'truthy', 'unknownrule', 'required|email', 'min:2|max:5', 'url|required'];
const VALIDATE_ON = [null, null, 'input', 'focusout', 'blur', 'submit', 'blur input', 'input focusout', ''];
const VALIDATE_IF = [null, null, null, 'flag', '!flag', 'true', 'false', 'f0 && f0.valid', 'missing.deep'];
const VALIDATE_EMPTY = [null, null, 'skip', ''];
const ERROR_CLASS = [null, null, 'bad', 'is-invalid shake'];
const ERROR = [null, null, 'Generic message', '#tpl-a', '#tpl-b', '#missing-tpl'];
const ERROR_RULE = [null, null, 'Rule message', '#tpl-b', '#tpl-a'];

const TEXT_VALUES = ['', 'a', 'ab', 'abc', '4', '7', '12', '20', 'x@y.z', 'not-an-email',
  'https://e.com', '  ', 'Hello', '100', '-3'];

function genField(rand, i) {
  const kind = pick(rand, ['text', 'text', 'text', 'email', 'number', 'url', 'checkbox', 'radio', 'select', 'textarea']);
  const name = `f${i}`;
  const common = {
    validate: maybe(rand, 0.85) ? pick(rand, RULES) : null,
    'validate-on': pick(rand, VALIDATE_ON),
    'validate-if': pick(rand, VALIDATE_IF),
    'validate-empty': pick(rand, VALIDATE_EMPTY),
    'error-class': pick(rand, ERROR_CLASS),
    error: pick(rand, ERROR),
    'error-required': pick(rand, ERROR_RULE),
    'error-min': pick(rand, ERROR_RULE),
    'error-email': pick(rand, [null, null, 'Bad email', '#tpl-a']),
    as: maybe(rand, 0.4) ? name : null,
    required: maybe(rand, 0.3) ? true : null,
  };
  if (kind === 'checkbox') {
    return { kind, name, html: `<input type="checkbox" name="${name}"${attrs(common)}>` };
  }
  if (kind === 'radio') {
    const a = attrs(common);
    return {
      kind, name,
      html: `<input type="radio" name="${name}" value="a"${a}><input type="radio" name="${name}" value="b"${attrs({ 'validate-on': common['validate-on'] })}>`,
    };
  }
  if (kind === 'select') {
    return {
      kind, name,
      html: `<select name="${name}"${attrs(common)}><option value=""></option><option value="a">a</option><option value="4">4</option></select>`,
    };
  }
  if (kind === 'textarea') {
    return { kind, name, html: `<textarea name="${name}"${attrs({ ...common, minlength: maybe(rand, 0.3) ? 3 : null })}></textarea>` };
  }
  const native = {
    minlength: maybe(rand, 0.2) ? 3 : null,
    maxlength: maybe(rand, 0.15) ? 5 : null,
    pattern: maybe(rand, 0.15) ? '[a-z]+' : null,
    min: kind === 'number' && maybe(rand, 0.4) ? 5 : null,
    max: kind === 'number' && maybe(rand, 0.4) ? 50 : null,
  };
  const value = maybe(rand, 0.3) ? pick(rand, TEXT_VALUES) : null;
  return {
    kind, name,
    html: `<input type="${kind}" name="${name}"${attrs({ ...common, ...native, value })}>`,
  };
}

function genForm(rand) {
  const count = 1 + Math.floor(rand() * 4);
  const fields = Array.from({ length: count }, (_, i) => genField(rand, i));
  const formAttrs = {
    'validate-on': pick(rand, [null, null, null, 'input', 'focusout', 'submit', 'blur']),
    'error-class': pick(rand, [null, 'invalid']),
    'validate-empty': pick(rand, [null, null, 'skip']),
  };
  const extras = [
    maybe(rand, 0.2) ? '<input class="unnamed">' : '',
    maybe(rand, 0.2) ? '<input type="hidden" name="h" value="x">' : '',
  ].join('');
  const buttons = [
    '<button type="submit" class="b1">Go</button>',
    maybe(rand, 0.3) ? '<button class="b2" auto-disable="off">Plain</button>' : '',
    maybe(rand, 0.2) ? '<button class="b3" disabled="custom">Custom</button>' : '',
    maybe(rand, 0.2) ? '<input type="submit" class="b4" value="ok">' : '',
  ].join('');
  const html = `
    <div state="{ flag: true }">
      <form validate${attrs(formAttrs)}>${fields.map((f) => f.html).join('')}${extras}${buttons}</form>
      <template id="tpl-a"><b class="ta" bind="$rule + ': ' + $error"></b></template>
      <section><template id="tpl-b"><i class="tb" bind="err.message"></i></template></section>
    </div>`;
  return { html, fields };
}

function genScript(rand, fields, length) {
  const steps = [];
  for (let i = 0; i < length; i++) {
    const roll = rand();
    const field = pick(rand, fields);
    if (roll < 0.5) steps.push({ op: 'edit', field: field.name, kind: field.kind, value: pick(rand, TEXT_VALUES), pickB: maybe(rand) });
    else if (roll < 0.68) steps.push({ op: 'focusout', field: field.name });
    else if (roll < 0.75) steps.push({ op: 'change', field: field.name });
    else if (roll < 0.85) steps.push({ op: 'submit' });
    else if (roll < 0.9) steps.push({ op: 'reset' });
    else if (roll < 0.95) steps.push({ op: 'endSubmit' });
    else steps.push({ op: 'flag' });
  }
  return steps;
}

// ── Running a case against one implementation ────────────────────────
function controlOf(root, name) {
  return root.querySelector(`[name="${name}"]`);
}

function fire(el, type) {
  el.dispatchEvent(new Event(type, { bubbles: true }));
}

function runStep(root, step) {
  const form = root.querySelector('form');
  const ctx = NoJS.findContext(form);
  switch (step.op) {
    case 'edit': {
      const el = controlOf(root, step.field);
      if (step.kind === 'checkbox') {
        el.checked = !el.checked;
      } else if (step.kind === 'radio') {
        const radios = root.querySelectorAll(`[name="${step.field}"]`);
        (step.pickB ? radios[1] : radios[0]).checked = true;
      } else if (step.kind === 'select') {
        el.value = step.pickB ? '4' : step.value === '' ? '' : 'a';
      } else {
        el.value = step.value;
      }
      fire(el, 'input');
      if (['checkbox', 'radio', 'select'].includes(step.kind)) fire(el, 'change');
      return null;
    }
    case 'focusout':
      controlOf(root, step.field).dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
      return null;
    case 'change':
      fire(controlOf(root, step.field), 'change');
      return null;
    case 'submit': {
      const evt = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(evt);
      return evt.defaultPrevented;
    }
    case 'reset':
      ctx.$form.reset();
      return null;
    case 'endSubmit':
      ctx.$form.endSubmit();
      return null;
    case 'flag':
      ctx.flag = !ctx.flag;
      return null;
    default:
      throw new Error(`unknown op ${step.op}`);
  }
}

function plain(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function snapshot(root, fields, vetoed) {
  const form = root.querySelector('form');
  const ctx = NoJS.findContext(form);
  const aliases = {};
  for (const f of fields) aliases[f.name] = plain(ctx[f.name]);
  return {
    form: plain(ctx.$form),
    aliases,
    html: root.innerHTML,
    disabled: [...form.querySelectorAll('button, input[type="submit"]')].map((b) => b.disabled),
    vetoed,
  };
}

function runCase(register, { html, fields }, script) {
  register(NoJS);
  document.body.innerHTML = '';
  jest.useFakeTimers();
  const root = document.createElement('div');
  root.innerHTML = html;
  document.body.appendChild(root);
  NoJS.processTree(root);
  jest.runAllTimers();
  const trace = [snapshot(root, fields, null)];
  for (const step of script) {
    let vetoed = null;
    let error = null;
    try {
      vetoed = runStep(root, step);
    } catch (e) {
      error = String(e && e.message);
    }
    jest.runAllTimers();
    trace.push({ ...snapshot(root, fields, vetoed), error });
  }
  jest.useRealTimers();
  document.body.innerHTML = '';
  return trace;
}

// What the corpus exercised (asserted below, so a generator change that
// stops producing errors, templates or vetoes fails loudly).
const seen = {
  ariaInvalid: 0, errorClass: 0, templateA: 0, templateB: 0, errorShown: 0,
  hiddenError: 0, vetoed: 0, submitted: 0, disabled: 0, enabled: 0, thrown: 0,
};

function tally(trace) {
  for (const s of trace) {
    if (s.html.includes('aria-invalid="true"')) seen.ariaInvalid++;
    if (/\sclass="[^"]*\b(bad|invalid|shake)\b/.test(s.html)) seen.errorClass++;
    if (s.html.includes('aria-live="polite"><b class="ta"')) seen.templateA++;
    if (s.html.includes('aria-live="polite"><i class="tb"')) seen.templateB++;
    if (s.form && s.form.errorCount > 0) seen.errorShown++;
    if (s.form && !s.form.valid && s.form.errorCount === 0) seen.hiddenError++;
    if (s.vetoed === true) seen.vetoed++;
    if (s.vetoed === false) seen.submitted++;
    if (s.disabled.includes(true)) seen.disabled++;
    if (s.disabled.includes(false)) seen.enabled++;
    if (s.error) seen.thrown++;
  }
}

function compare(caseDef, script, label) {
  const legacy = runCase(registerLegacy, caseDef, script);
  tally(legacy);
  const engine = runCase(registerEngineBacked, caseDef, script);
  for (let i = 0; i < legacy.length; i++) {
    try {
      expect(engine[i]).toEqual(legacy[i]);
    } catch (e) {
      e.message = `${label}, step ${i} (${i ? JSON.stringify(script[i - 1]) : 'initial'})\n${caseDef.html}\n${e.message}`;
      throw e;
    }
  }
  return legacy.length;
}

// ═══════════════════════════════════════════════════════════════════════

describe('validate: engine-backed directive vs the pre-engine directive', () => {
  afterAll(() => registerEngineBacked(NoJS));

  test('NoJS-Server validate-form fixture markup and interactions', () => {
    const html = `
      <div state="{ name: '', email: '', age: '', submits: 0 }">
        <form id="signup" validate error-class="invalid" on:submit.prevent="submits++; $form.endSubmit()">
          <input id="name" name="name" model="name" validate="required" error-required="Name is required">
          <span id="name-error" if="$form.fields.name?.touched && $form.fields.name?.error" bind="$form.fields.name.error"></span>
          <input id="email" name="email" model="email" validate="required|email" validate-on="focusout" error="#tpl-email">
          <input id="age" name="age" type="number" model="age" validate="min:18" error-min="Adults only">
          <span id="age-error" if="$form.fields.age?.error" bind="$form.fields.age.error"></span>
          <button id="submit" type="submit">Sign up</button>
        </form>
        <template id="tpl-email"><em class="email-error" bind="$rule + ': ' + $error"></em></template>
        <p id="form-state" bind="'valid: ' + $form.valid + ' / errors: ' + $form.errorCount + ' / first: ' + ($form.firstError ?? 'none')"></p>
        <p id="submits" bind="'submits: ' + submits"></p>
      </div>`;
    const fields = [{ name: 'name' }, { name: 'email' }, { name: 'age' }];
    const script = [
      { op: 'edit', field: 'name', kind: 'text', value: 'Ana' },
      { op: 'edit', field: 'name', kind: 'text', value: '' },
      { op: 'edit', field: 'email', kind: 'text', value: 'not-an-email' },
      { op: 'focusout', field: 'email' },
      { op: 'edit', field: 'age', kind: 'number', value: '12' },
      { op: 'edit', field: 'name', kind: 'text', value: 'Ana' },
      { op: 'edit', field: 'email', kind: 'text', value: 'ana@example.com' },
      { op: 'focusout', field: 'email' },
      { op: 'edit', field: 'age', kind: 'number', value: '30' },
      { op: 'submit' },
    ];
    expect(compare({ html, fields }, script, 'validate-form')).toBe(script.length + 1);
  });

  test('standalone fields outside any validated form', () => {
    const rand = prng(7);
    let steps = 0;
    for (let n = 0; n < 40; n++) {
      const rules = pick(rand, RULES);
      const skip = pick(rand, VALIDATE_EMPTY);
      const html = `
        <div state="{}">
          <form><input name="f0"${attrs({ validate: rules, 'validate-empty': skip, error: '#tpl-c' })}><button>Go</button></form>
          <input name="f1"${attrs({ validate: pick(rand, RULES), error: maybe(rand) ? '#tpl-c' : null })}>
          <template id="tpl-c"><span class="tc" bind="err.message"></span></template>
        </div>`;
      const fields = [{ name: 'f0', kind: 'text' }, { name: 'f1', kind: 'text' }];
      const script = Array.from({ length: 6 }, () => ({
        op: 'edit', field: pick(rand, ['f0', 'f1']), kind: 'text', value: pick(rand, TEXT_VALUES),
      }));
      const caseDef = { html, fields };
      // runStep reads `form` for ctx: the plain <form> above has no validate,
      // so snapshot through the wrapper's context.
      steps += compare(caseDef, script, `standalone #${n}`);
    }
    expect(steps).toBe(40 * 7);
  });

  test('generated corpus: 400 forms x 12 random steps', () => {
    const rand = prng(20261112);
    let steps = 0;
    for (let n = 0; n < 400; n++) {
      const caseDef = genForm(rand);
      const script = genScript(rand, caseDef.fields, 12);
      steps += compare(caseDef, script, `case #${n}`);
    }
    expect(steps).toBe(400 * 13);
  });

  test('the corpus exercised every display path', () => {
    // eslint-disable-next-line no-console
    if (process.env.VALIDATE_DIFF_STATS) console.log(seen);
    for (const [key, count] of Object.entries(seen)) {
      if (key === 'thrown') continue;
      expect([key, count > 0]).toEqual([key, true]);
    }
  });
});
