import NoJSElements from '../src/index.js';
import { FACTS_DEBOUNCE_MS, PENDING_ATTR, collectFacts } from '../src/validate/host.js';
import { checkStepValidationGate, hostFormValid } from '../src/stepper/validation.js';
import { ENGINE_API } from '../src/validate/engine.js';

// Host backend of `validate` (NoJS-Server compiled sites, ADR-028 §5 and
// HOST-API.md "Compiled validate"): reports facts through host.exec, runs
// no validator, applies novalidate and the submit auto-disable from the
// server-rendered data-nj-form-state marker.

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
      if (raw == null || raw === '') return null;
      try { return JSON.parse(raw); } catch { return null; }
    },
    watch: jest.fn((el, attr, cb) => {
      watchers.push({ el, attr, cb });
      return () => {};
    }),
    onDispose(el, fn) { disposers.push(fn); },
    dispose() { disposers.splice(0).reverse().forEach((fn) => fn()); },
    // Fire watchers as the integrator does after an envelope.
    fireWatchers() { for (const w of watchers) w.cb(w.el.getAttribute(w.attr), null); },
    watchers,
  };
}

const state = (s) => JSON.stringify({ valid: false, submitting: false, pending: false, reset: 0, ...s });
const flushMicrotasks = async () => { for (let i = 0; i < 5; i++) await Promise.resolve(); };

let registrar;
let host;

beforeEach(() => {
  jest.useFakeTimers({ doNotFake: ['queueMicrotask', 'nextTick'] });
  registrar = createHostRegistrar();
  NoJSElements.install(registrar);
  host = createHost();
});

afterEach(() => {
  host.dispose();
  document.body.innerHTML = '';
  jest.useRealTimers();
});

function mount(html) {
  document.body.innerHTML = html;
  const form = document.querySelector('form');
  return form;
}

function initValidate(el) {
  registrar.directives.get('validate').init(el, host);
}

function type(el, value) {
  el.value = value;
  el.dispatchEvent(new Event('input', { bubbles: true }));
}

function focusout(el) {
  el.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
}

// The integrator's next envelope: the morph drops PENDING_ATTR (the server
// never renders it) and may update the marker.
async function envelope(form, marker) {
  form.removeAttribute(PENDING_ATTR);
  if (marker !== undefined) form.setAttribute('data-nj-form-state', marker);
  await flushMicrotasks();
}

const FORM = (extra = '', fields = '') => `
  <form validate data-nj-validate="vk-1" data-nj-form-state='${state()}' ${extra}>
    ${fields || `
    <input name="name" required>
    <input name="email" type="email">
    <input class="unnamed">`}
    <button type="submit" id="go">Go</button>
  </form>`;

// ═══════════════════════════════════════════════════════════════════════
describe('registration and contract', () => {
  test('host install registers the real validate directive (no pending stub)', () => {
    const form = mount(FORM());
    initValidate(form);
    expect(host.warn).not.toHaveBeenCalled();
    expect(form.hasAttribute('novalidate')).toBe(true);
  });

  test('the plugin contract names the validation engine', () => {
    expect(NoJSElements.contract.validation).toEqual({ api: ENGINE_API, engine: './validate-engine.mjs' });
  });

  test('a form without a validate action key warns and stays untouched', () => {
    document.body.innerHTML = '<form validate><input name="a"><button>Go</button></form>';
    const form = document.querySelector('form');
    initValidate(form);
    expect(host.warn).toHaveBeenCalledWith(expect.stringContaining('no validate action'));
    expect(form.hasAttribute('novalidate')).toBe(false);
    expect(form.querySelector('button').disabled).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════
describe('facts', () => {
  test('collectFacts: values per control kind, native flags of failing fields, files excluded', () => {
    mount(FORM('', `
      <input name="t" value="hi">
      <input name="req" required>
      <input name="c" type="checkbox" checked>
      <input name="r" type="radio" value="a">
      <input name="r" type="radio" value="b" checked>
      <input name="r2" type="radio" value="x" required>
      <input name="r2" type="radio" value="y">
      <select name="s"><option value="1">1</option><option value="2" selected>2</option></select>
      <textarea name="ta">txt</textarea>
      <input name="up" type="file">`));
    const { values, native } = collectFacts(document.querySelector('form'));
    expect(values).toEqual({ t: 'hi', req: '', c: true, r: 'b', r2: '', s: '2', ta: 'txt' });
    expect(Object.keys(native)).toEqual(['req', 'r2']);
    expect(native.req.flags).toEqual(['valueMissing']);
    expect(typeof native.req.message).toBe('string');
  });

  test('legacy mode: input is debounced 300 ms and reports trigger, field, values, native', () => {
    const form = mount(FORM());
    initValidate(form);
    type(form.querySelector('[name=email]'), 'nope');
    jest.advanceTimersByTime(FACTS_DEBOUNCE_MS - 1);
    expect(host.exec).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(host.exec).toHaveBeenCalledTimes(1);
    const [key, payload] = host.exec.mock.calls[0];
    expect(key).toBe('vk-1');
    expect(payload.trigger).toBe('input');
    expect(payload.field).toBe('email');
    expect(payload.values).toEqual({ name: '', email: 'nope' });
    expect(Object.keys(payload.native).sort()).toEqual(['email', 'name']);
    expect(payload.native.email.flags).toEqual(['typeMismatch']);
  });

  test('bursts on one field collapse into one dispatch with the latest trigger', () => {
    const form = mount(FORM());
    initValidate(form);
    const name = form.querySelector('[name=name]');
    type(name, 'A');
    jest.advanceTimersByTime(200);
    type(name, 'An');
    name.dispatchEvent(new Event('change', { bubbles: true }));
    jest.advanceTimersByTime(FACTS_DEBOUNCE_MS);
    expect(host.exec).toHaveBeenCalledTimes(1);
    expect(host.exec.mock.calls[0][1]).toMatchObject({ trigger: 'change', field: 'name', values: { name: 'An' } });
  });

  test('an input on another field sends the waiting one first (no dirty mark lost)', () => {
    const form = mount(FORM());
    initValidate(form);
    type(form.querySelector('[name=name]'), 'A');
    type(form.querySelector('[name=email]'), 'e');
    expect(host.exec).toHaveBeenCalledTimes(1);
    expect(host.exec.mock.calls[0][1].field).toBe('name');
    jest.advanceTimersByTime(FACTS_DEBOUNCE_MS);
    expect(host.exec).toHaveBeenCalledTimes(2);
    expect(host.exec.mock.calls[1][1].field).toBe('email');
  });

  test('focusout flushes the waiting input, then reports immediately', () => {
    const form = mount(FORM());
    initValidate(form);
    const name = form.querySelector('[name=name]');
    type(name, 'Ana');
    focusout(name);
    expect(host.exec.mock.calls.map((c) => c[1].trigger)).toEqual(['input', 'focusout']);
    jest.advanceTimersByTime(FACTS_DEBOUNCE_MS * 2);
    expect(host.exec).toHaveBeenCalledTimes(2);
  });

  test('events of unnamed or non-field elements omit `field`; native is omitted when nothing fails', () => {
    const form = mount(FORM('', '<input name="ok"><input class="x"><button type="submit" name="btn">b</button>'));
    initValidate(form);
    focusout(form.querySelector('.x'));
    focusout(form.querySelector('[name=btn]'));
    for (const [, payload] of host.exec.mock.calls) {
      expect(payload).toEqual({ trigger: 'focusout', values: { ok: '' } });
    }
  });

  test('per-field mode: listeners on named fields only, no change listener', () => {
    const form = mount(FORM('', `
      <input name="a" validate-on="focusout">
      <input name="b">
      <input class="anon">`));
    initValidate(form);
    form.querySelector('[name=a]').dispatchEvent(new Event('change', { bubbles: true }));
    type(form.querySelector('.anon'), 'x');
    focusout(form.querySelector('.anon'));
    jest.advanceTimersByTime(FACTS_DEBOUNCE_MS);
    expect(host.exec).not.toHaveBeenCalled();
    type(form.querySelector('[name=b]'), 'x');
    focusout(form.querySelector('[name=a]'));
    expect(host.exec.mock.calls.map((c) => [c[1].trigger, c[1].field])).toEqual([['input', 'b'], ['focusout', 'a']]);
  });

  test('a form-level validate-on also selects per-field listeners', () => {
    const form = mount(FORM('validate-on="submit"', '<input name="a">'));
    initValidate(form);
    form.querySelector('[name=a]').dispatchEvent(new Event('change', { bubbles: true }));
    jest.advanceTimersByTime(FACTS_DEBOUNCE_MS);
    expect(host.exec).not.toHaveBeenCalled();
  });

  test('data-nj-validate-init sends one init dispatch after init', async () => {
    const form = mount(FORM('data-nj-validate-init'));
    initValidate(form);
    expect(host.exec).not.toHaveBeenCalled();
    expect(form.hasAttribute(PENDING_ATTR)).toBe(false);
    await flushMicrotasks();
    expect(host.exec).toHaveBeenCalledTimes(1);
    const payload = host.exec.mock.calls[0][1];
    expect(payload.trigger).toBe('init');
    expect(payload).not.toHaveProperty('field');
    expect(payload.native.name.flags).toEqual(['valueMissing']);
  });

  test('a submit of the form sends waiting facts before the integrator sees the submit', () => {
    const form = mount(FORM());
    initValidate(form);
    const order = [];
    host.exec.mockImplementation((key, p) => order.push(`facts:${p.trigger}`));
    const integrator = (e) => { if (e.target === form) order.push('submit-action'); };
    document.addEventListener('submit', integrator, true);
    type(form.querySelector('[name=name]'), 'A');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    document.removeEventListener('submit', integrator, true);
    expect(order).toEqual(['facts:input', 'submit-action']);
    // another form's submit does not flush this one
    const other = document.createElement('form');
    document.body.appendChild(other);
    type(form.querySelector('[name=name]'), 'B');
    other.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(order).toHaveLength(2);
  });

  test('the plugin never blocks a submit', () => {
    const form = mount(FORM());
    initValidate(form);
    const evt = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(evt);
    expect(evt.defaultPrevented).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════
describe('auto-disable from data-nj-form-state', () => {
  const buttons = (form) => [...form.querySelectorAll('button, input[type=submit]')];

  test('initial marker drives the buttons; custom disabled and auto-disable="off" keep theirs', () => {
    const form = mount(FORM('', `
      <input name="a">
      <button type="button" id="plain">Plain</button>
      <button id="custom" disabled="customExpr">C</button>
      <button id="off" auto-disable="off">Off</button>
      <input type="submit" id="sub">`));
    initValidate(form);
    expect(form.querySelector('#go').disabled).toBe(true);
    expect(form.querySelector('#sub').disabled).toBe(true);
    expect(form.querySelector('#plain').disabled).toBe(false);
    expect(form.querySelector('#custom').getAttribute('disabled')).toBe('customExpr');
    expect(form.querySelector('#off').disabled).toBe(false);
  });

  test.each([
    [{ valid: true }, false],
    [{ valid: true, submitting: true }, true],
    [{ valid: true, pending: true }, true],
    [{ valid: false }, true],
  ])('marker %j → disabled %s', (marker, disabled) => {
    const form = mount(FORM().replace(`'${state()}'`, `'${state(marker)}'`));
    initValidate(form);
    expect(form.querySelector('#go').disabled).toBe(disabled);
  });

  test('a missing or broken marker leaves the buttons alone', () => {
    const form = mount('<form validate data-nj-validate="k" data-nj-form-state="{oops"><input name="a"><button>Go</button></form>');
    initValidate(form);
    expect(form.querySelector('button').disabled).toBe(false);
  });

  test('buttons stay clickable while facts wait or are in flight, then follow the marker', async () => {
    const form = mount(FORM());
    initValidate(form);
    const go = form.querySelector('#go');
    expect(go.disabled).toBe(true);
    type(form.querySelector('[name=name]'), 'Ana');
    expect(go.disabled).toBe(false);                 // waiting
    jest.advanceTimersByTime(FACTS_DEBOUNCE_MS);
    expect(form.hasAttribute(PENDING_ATTR)).toBe(true);
    await flushMicrotasks();
    expect(go.disabled).toBe(false);                 // in flight
    await envelope(form);                            // marker unchanged: still invalid
    expect(go.disabled).toBe(true);
    type(form.querySelector('[name=email]'), 'a@b.co');
    jest.advanceTimersByTime(FACTS_DEBOUNCE_MS);
    await envelope(form, state({ valid: true }));
    expect(go.disabled).toBe(false);
  });

  test('a morph stripping `disabled` from a button is re-applied', async () => {
    const form = mount(FORM());
    initValidate(form);
    const go = form.querySelector('#go');
    go.removeAttribute('disabled');
    await flushMicrotasks();
    expect(go.disabled).toBe(true);
  });

  test('the watcher re-applies the marker and resets the form when `reset` grows', async () => {
    const form = mount(FORM());
    initValidate(form);
    expect(host.watch).toHaveBeenCalledWith(form, 'data-nj-form-state', expect.any(Function));
    const reset = jest.spyOn(form, 'reset');
    form.setAttribute('data-nj-form-state', state({ valid: true, reset: 1 }));
    host.fireWatchers();
    expect(reset).toHaveBeenCalledTimes(1);
    expect(form.querySelector('#go').disabled).toBe(false);
    await flushMicrotasks();                         // the observer sees the same change
    expect(reset).toHaveBeenCalledTimes(1);
    form.setAttribute('data-nj-form-state', state({ valid: false, reset: 1 }));
    host.fireWatchers();
    expect(reset).toHaveBeenCalledTimes(1);
    expect(form.querySelector('#go').disabled).toBe(true);
  });

  test('no observer loop: a stable state writes nothing', async () => {
    const form = mount(FORM());
    initValidate(form);
    const spy = jest.fn();
    const mo = new MutationObserver(spy);
    mo.observe(form, { attributes: true, subtree: true });
    await flushMicrotasks();
    await flushMicrotasks();
    mo.disconnect();
    expect(spy).not.toHaveBeenCalled();
  });
});

// ═══════════════════════════════════════════════════════════════════════
describe('standalone fields and disposal', () => {
  test('a field outside any validated form reports {trigger, value} debounced', () => {
    document.body.innerHTML = '<input name="q" validate="required" data-nj-validate="vk-f">';
    const input = document.querySelector('input');
    initValidate(input);
    type(input, 'a');
    type(input, 'ab');
    jest.advanceTimersByTime(FACTS_DEBOUNCE_MS);
    expect(host.exec).toHaveBeenCalledTimes(1);
    expect(host.exec).toHaveBeenCalledWith('vk-f', { trigger: 'input', value: 'ab' });
  });

  test('a field without a key, a field inside a validated form and other tags do nothing', () => {
    document.body.innerHTML = `
      <input id="nokey" validate="required">
      <form validate data-nj-validate="k"><input id="inner" validate="required" data-nj-validate="x"></form>
      <div id="div" validate="required" data-nj-validate="y"></div>`;
    for (const id of ['nokey', 'inner', 'div']) {
      const el = document.getElementById(id);
      initValidate(el);
      type(el, 'v');
    }
    jest.advanceTimersByTime(FACTS_DEBOUNCE_MS);
    expect(host.exec).not.toHaveBeenCalled();
  });

  test('dispose removes listeners, cancels timers and disconnects the observer', async () => {
    const form = mount(FORM('data-nj-validate-init'));
    initValidate(form);
    document.body.insertAdjacentHTML('beforeend', '<input id="solo" validate data-nj-validate="s">');
    const solo = document.getElementById('solo');
    initValidate(solo);
    type(form.querySelector('[name=name]'), 'A');
    type(solo, 'x');
    host.dispose();
    jest.advanceTimersByTime(FACTS_DEBOUNCE_MS * 2);
    await flushMicrotasks();
    focusout(form.querySelector('[name=name]'));
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(host.exec).not.toHaveBeenCalled();
    const go = form.querySelector('#go');
    go.disabled = false;
    await flushMicrotasks();
    expect(go.disabled).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════
describe('stepper gate on a compiled site', () => {
  function step(marker) {
    document.body.innerHTML = `<div step stepper-validate><form validate ${marker == null ? '' : `data-nj-form-state='${marker}'`}></form></div>`;
    return document.querySelector('[step]');
  }

  test('reads validity from the marker when there is no findContext', () => {
    expect(checkStepValidationGate(step(state({ valid: true })))).toBe(true);
    expect(checkStepValidationGate(step(state({ valid: false })))).toBe(false);
    expect(checkStepValidationGate(step(null))).toBe(true);
    expect(checkStepValidationGate(step('{bad'))).toBe(true);
  });

  test('hostFormValid', () => {
    const form = document.createElement('form');
    expect(hostFormValid(form)).toBeNull();
    form.setAttribute('data-nj-form-state', 'null');
    expect(hostFormValid(form)).toBeNull();
    form.setAttribute('data-nj-form-state', '{"valid":1}');
    expect(hostFormValid(form)).toBe(true);
  });
});
