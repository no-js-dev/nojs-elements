import { readFileSync } from 'fs';
import { resolve } from 'path';
import {
  ENGINE_API,
  VALIDITY_MAP,
  VALIDITY_FLAGS,
  RULE_PRIORITY,
  DEFAULT_MESSAGES,
  FALLBACK_NATIVE_MESSAGES,
  applyEvent,
  bindingMode,
  canSubmit,
  collectValues,
  emptyInteraction,
  emulateNative,
  evaluateForm,
  isEmptyValue,
  isShown,
  pickError,
  resolveMessage,
  ruleErrors,
  skipsEmpty,
  submitEnabled,
  templateFor,
  triggersFor,
  validateValue,
} from '../src/validate/engine.js';

// Pure validation engine (NoJS-Server ADR-028 §3). These tests call it
// directly with plain data: no DOM, no NoJS.

function field(overrides = {}) {
  return {
    name: 'f',
    type: 'text',
    rules: null,
    error: null,
    messages: {},
    validateOn: null,
    validateEmpty: null,
    errorClass: null,
    as: null,
    ...overrides,
  };
}

function form(fields, overrides = {}) {
  return { validateOn: null, validateEmpty: null, errorClass: null, fields, ...overrides };
}

function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    Object.values(value).forEach(deepFreeze);
  }
  return value;
}

// ═══════════════════════════════════════════════════════════════════════
describe('constants', () => {
  test('API version and frozen tables', () => {
    expect(ENGINE_API).toBe(1);
    expect(Object.isFrozen(VALIDITY_MAP)).toBe(true);
    expect(Object.isFrozen(RULE_PRIORITY)).toBe(true);
    expect(VALIDITY_FLAGS).toEqual([
      'valueMissing', 'typeMismatch', 'tooShort', 'tooLong',
      'patternMismatch', 'rangeUnderflow', 'rangeOverflow', 'stepMismatch',
    ]);
    expect(VALIDITY_MAP.find(([f]) => f === 'typeMismatch')[1]).toBeNull();
    expect(RULE_PRIORITY.indexOf('required')).toBe(0);
    expect(DEFAULT_MESSAGES.min(3)).toBe('Minimum value is 3');
    expect(DEFAULT_MESSAGES.max(9)).toBe('Maximum value is 9');
  });

  test('the module source passes the NoJS-Server server purity rules', () => {
    const src = readFileSync(resolve(__dirname, '../src/validate/engine.js'), 'utf8');
    for (const re of [/\bdocument\b/, /\bwindow\b/, /\bnavigator\b/, /\blocalStorage\b/, /\bsessionStorage\b/,
      /\bsetTimeout\b/, /\bsetInterval\b/, /\bsetImmediate\b/, /(?<!ctx\.)\bfetch\s*\(/, /\bprocess\b/,
      /\bimport\s*\(/, /^\s*(?:export\s+)?(?:let|var)\s+[A-Za-z_$][A-Za-z0-9_$]*\s*=/m,
      /\bMath\.random\s*\(/, /\bDate\.now\s*\(/, /\bnew\s+Date\s*\(/, /^\s*import\s/m]) {
      expect([String(re), re.test(src)]).toEqual([String(re), false]);
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════
describe('rules', () => {
  const run = (rules, value, extra = {}) =>
    ruleErrors(form([]), field({ rules, ...extra.field }), { value, native: extra.native }, extra.all || {}, extra.validators);

  test('isEmptyValue', () => {
    expect(isEmptyValue(null)).toBe(true);
    expect(isEmptyValue(undefined)).toBe(true);
    expect(isEmptyValue('  ')).toBe(true);
    expect(isEmptyValue(0)).toBe(false);
    expect(isEmptyValue('x')).toBe(false);
  });

  test('required', () => {
    expect(run('required', '')).toEqual([{ rule: 'required', message: 'Required' }]);
    expect(run('required', '   ')).toEqual([{ rule: 'required', message: 'Required' }]);
    expect(run('required', 'x')).toEqual([]);
  });

  test('email', () => {
    expect(run('email', 'nope')).toEqual([{ rule: 'email', message: 'Invalid email' }]);
    expect(run('email', 'a@b.co')).toEqual([]);
    expect(run('email', '')).toEqual([]);
  });

  test('url fails on an empty value unless validate-empty="skip"', () => {
    expect(run('url', 'https://x.y')).toEqual([]);
    expect(run('url', 'nope')).toEqual([{ rule: 'url', message: 'Invalid URL' }]);
    expect(run('url', '')).toEqual([{ rule: 'url', message: 'Invalid URL' }]);
    expect(run('url', '', { field: { validateEmpty: 'skip' } })).toEqual([]);
  });

  test('min / max compare numbers; "" is 0 unless skipped', () => {
    expect(run('min:18', '12')).toEqual([{ rule: 'min', message: 'Minimum value is 18' }]);
    expect(run('min:18', '18')).toEqual([]);
    expect(run('min:18', '')).toEqual([{ rule: 'min', message: 'Minimum value is 18' }]);
    expect(run('max:5', '6')).toEqual([{ rule: 'max', message: 'Maximum value is 5' }]);
    expect(run('max:5', '5')).toEqual([]);
    expect(run('min:1|max:5', '', { field: { validateEmpty: 'skip' } })).toEqual([]);
  });

  test('validate-empty: field attribute wins over the form, even empty', () => {
    expect(skipsEmpty({ validateEmpty: 'skip' }, field())).toBe(true);
    expect(skipsEmpty({ validateEmpty: 'skip' }, field({ validateEmpty: '' }))).toBe(false);
    expect(skipsEmpty({ validateEmpty: null }, field({ validateEmpty: 'skip' }))).toBe(true);
    expect(skipsEmpty(null, field())).toBe(false);
    const spec = form([], { validateEmpty: 'skip' });
    expect(ruleErrors(spec, field({ rules: 'min:3' }), { value: '' }, {})).toEqual([]);
    expect(ruleErrors(spec, field({ rules: 'required' }), { value: '' }, {})).toHaveLength(1);
  });

  test('unknown and empty rule names are ignored; spaces around rules are trimmed', () => {
    expect(run('unknown|', 'x')).toEqual([]);
    expect(run(' required | email ', '')).toEqual([{ rule: 'required', message: 'Required' }]);
  });

  test('custom validators: core signature, override built-ins, any truthy non-true fails', () => {
    const calls = [];
    const validators = {
      range: (v, lo, hi, all) => { calls.push([v, lo, hi, all]); return Number(v) >= Number(lo) && Number(v) <= Number(hi) || 'out'; },
      required: () => 'custom required',
      num: () => 42,
      ok: () => true,
      falsy: () => '',
    };
    const all = { f: '9', g: 'x' };
    expect(run('range:1:5', '9', { validators, all })).toEqual([{ rule: 'range', message: 'out' }]);
    expect(calls[0]).toEqual(['9', '1', '5', all]);
    expect(run('required', 'filled', { validators })).toEqual([{ rule: 'required', message: 'custom required' }]);
    expect(run('num', 'x', { validators })).toEqual([{ rule: 'num', message: 42 }]);
    expect(run('ok|falsy', 'x', { validators })).toEqual([]);
  });

  test('custom:name calls the validator with (value, allValues)', () => {
    const seen = [];
    const validators = { even: (v, all) => { seen.push([v, all]); return Number(v) % 2 === 0 || 'odd'; } };
    expect(run('custom:even', '3', { validators, all: { a: 1 } })).toEqual([{ rule: 'custom', message: 'odd' }]);
    expect(seen).toEqual([['3', { a: 1 }]]);
    expect(run('custom:missing', '3', { validators })).toEqual([]);
    expect(run('custom', '3', { validators })).toEqual([]);
    expect(run('custom:even', '4', { validators })).toEqual([]);
  });

  test('validators may be a getter, read per call', () => {
    let n = 0;
    const getter = () => { n++; return { x: () => 'bad' }; };
    expect(ruleErrors(form([]), field({ rules: 'x' }), { value: '' }, {}, getter)).toHaveLength(1);
    expect(n).toBe(1);
    expect(ruleErrors(form([]), field({ rules: 'x' }), { value: '' }, {}, () => null)).toEqual([]);
  });

  test('a thenable result fails closed and is reported', () => {
    const promise = { then() {} };
    const asyncRules = [];
    const errors = ruleErrors(form([]), field({ rules: 'remote|custom:remote' }), { value: 'x' }, {},
      { remote: () => promise }, (rule) => asyncRules.push(rule));
    expect(errors.map((e) => e.rule)).toEqual(['remote', 'custom']);
    expect(errors[0].message).toBe(promise);
    expect(asyncRules).toEqual(['remote', 'custom']);
    const viaCustom = [];
    ruleErrors(form([]), field({ rules: 'custom:remote' }), { value: 'x' }, {}, { remote: () => promise }, (r) => viaCustom.push(r));
    expect(viaCustom).toEqual(['custom']);
  });

  test('native flags map to rule names; typeMismatch takes the field type; rules shadow flags', () => {
    const native = { flags: ['valueMissing', 'typeMismatch', 'tooShort', 'stepMismatch'], message: 'Native says no' };
    const errors = ruleErrors(form([]), field({ type: 'email', rules: 'required' }), { value: '', native }, {});
    expect(errors).toEqual([
      { rule: 'required', message: 'Required' },
      { rule: 'email', message: 'Native says no' },
      { rule: 'minlength', message: 'Native says no' },
      { rule: 'step', message: 'Native says no' },
    ]);
    expect(ruleErrors(form([]), field(), { value: '', native: { flags: [], message: 'x' } }, {})).toEqual([]);
    expect(ruleErrors(form([]), field(), { value: '', native: null }, {})).toEqual([]);
    const all = VALIDITY_FLAGS.slice();
    expect(ruleErrors(form([]), field({ type: 'url' }), { value: 'x', native: { flags: all, message: 'm' } }, {})
      .map((e) => e.rule)).toEqual(['required', 'url', 'minlength', 'maxlength', 'pattern', 'min', 'max', 'step']);
  });
});

// ═══════════════════════════════════════════════════════════════════════
describe('messages, templates and priority', () => {
  test('error-<rule> > error (not a template) > default', () => {
    const f = field({ messages: { required: 'Need it' }, error: 'Generic' });
    expect(resolveMessage(f, 'required', 'Required')).toBe('Need it');
    expect(resolveMessage(f, 'email', 'Invalid email')).toBe('Generic');
    expect(resolveMessage(field({ error: '#tpl' }), 'email', 'Invalid email')).toBe('Invalid email');
    expect(resolveMessage(field({ messages: { required: '' } }), 'required', 'Required')).toBe('Required');
    expect(resolveMessage(field({ messages: undefined }), 'required', 'Required')).toBe('Required');
  });

  test('a per-rule template selector is also the message, as the directive always did', () => {
    expect(resolveMessage(field({ messages: { min: '#tpl' } }), 'min', 'x')).toBe('#tpl');
  });

  test('rule names are matched lowercase (HTML attribute names)', () => {
    expect(resolveMessage(field({ messages: { minlength: 'Too short' } }), 'minLength', 'x')).toBe('Too short');
  });

  test('templateFor: per-rule selector, else generic selector', () => {
    expect(templateFor(field({ messages: { required: '#a' }, error: '#b' }), 'required')).toBe('#a');
    expect(templateFor(field({ messages: { required: 'text' }, error: '#b' }), 'required')).toBe('#b');
    expect(templateFor(field({ error: 'text' }), 'required')).toBeNull();
    expect(templateFor(field({ messages: undefined, error: null }), 'required')).toBeNull();
  });

  test('pickError sorts by priority, unknown rules last, stable on ties', () => {
    const f = field({ messages: { min: 'Too small' } });
    expect(pickError([], f)).toBeNull();
    expect(pickError([
      { rule: 'zeta', message: 'z' }, { rule: 'min', message: 'm' }, { rule: 'email', message: 'e' },
    ], f)).toEqual({ rule: 'email', message: 'e' });
    expect(pickError([{ rule: 'b', message: 'B' }, { rule: 'a', message: 'A' }], f)).toEqual({ rule: 'b', message: 'B' });
    expect(pickError([{ rule: 'min', message: 'm' }], f)).toEqual({ rule: 'min', message: 'Too small' });
  });

  test('validateValue: first failing rule in rule order, no native flags', () => {
    expect(validateValue('', 'min:3|required', {})).toBe('Minimum value is 3');
    expect(validateValue('', 'min:3|required', {}, true)).toBe('Required');
    expect(validateValue('ok', 'required|email', {})).toBe('Invalid email');
    expect(validateValue('a@b.c', 'required|email|url', {})).toBe('Invalid URL');
    expect(validateValue('5', 'max:9|min:1', {})).toBeNull();
    expect(validateValue('4', 'max:3', {})).toBe('Maximum value is 3');
    expect(validateValue('x', 'mine', {}, false, { mine: (v, all) => (all.k ? 'has k' : true) })).toBeNull();
    expect(validateValue('x', 'mine', { k: 1 }, false, { mine: (v, all) => (all.k ? 'has k' : true) })).toBe('has k');
    expect(validateValue('3', 'custom:even', {}, false, { even: (v) => Number(v) % 2 === 0 || 'odd' })).toBe('odd');
    const hits = [];
    expect(validateValue('x', 'later', {}, false, () => ({ later: () => ({ then() {} }) }), (r) => hits.push(r))).toEqual({ then: expect.any(Function) });
    expect(hits).toEqual(['later']);
  });
});

// ═══════════════════════════════════════════════════════════════════════
describe('triggers and display gating', () => {
  test('triggersFor: field, else form, else input + focusout; empty counts as absent', () => {
    expect(triggersFor(form([]), field({ validateOn: 'blur  submit' }))).toEqual(['blur', 'submit']);
    expect(triggersFor(form([], { validateOn: 'submit' }), field())).toEqual(['submit']);
    expect(triggersFor(form([], { validateOn: 'submit' }), field({ validateOn: '' }))).toEqual(['submit']);
    expect(triggersFor(null, field())).toEqual(['input', 'focusout']);
    const a = triggersFor(form([]), field());
    a.push('x');
    expect(triggersFor(form([]), field())).toEqual(['input', 'focusout']);
  });

  test('bindingMode: explicit flag, else any validate-on present', () => {
    expect(bindingMode(form([field()]))).toBe('form');
    expect(bindingMode(form([field({ validateOn: '' })]))).toBe('field');
    expect(bindingMode(form([field()], { validateOn: 'input' }))).toBe('field');
    expect(bindingMode(form([field({ validateOn: 'input' })], { perField: false }))).toBe('form');
    expect(bindingMode(form([], { perField: true }))).toBe('field');
  });

  test('isShown: legacy (no validate-on) shows on touched or dirty', () => {
    const spec = form([]);
    expect(isShown(spec, field(), false, false)).toBe(false);
    expect(isShown(spec, field(), true, false)).toBe(true);
    expect(isShown(spec, field(), false, true)).toBe(true);
  });

  test.each([
    ['input', false, true, true],
    ['input', true, false, false],
    ['focusout', true, false, true],
    ['focusout', false, true, false],
    ['blur', true, false, true],
    ['submit', true, false, true],
    ['submit', false, true, false],
    ['', true, false, true],   // empty: default triggers, but not legacy
    ['', false, true, true],
    ['change', true, true, false],
  ])('isShown with validate-on="%s" touched=%s dirty=%s → %s', (on, touched, dirtied, expected) => {
    expect(isShown(form([]), field({ validateOn: on }), touched, dirtied)).toBe(expected);
  });

  test('isShown uses the form validate-on when the field has none', () => {
    expect(isShown(form([], { validateOn: 'submit' }), field(), false, true)).toBe(false);
    expect(isShown(form([], { validateOn: 'submit' }), field(), true, false)).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════════
describe('applyEvent', () => {
  const legacy = form([field({ name: 'a' }), field({ name: 'b' })]);
  const perField = form([
    field({ name: 'a', validateOn: 'focusout' }),
    field({ name: 'b', validateOn: 'blur' }),
    field({ name: 'c', validateOn: 'submit' }),
  ]);

  test('emptyInteraction', () => {
    expect(emptyInteraction()).toEqual({ touched: [], dirty: [], formTouched: false, formDirty: false, submitting: false });
  });

  test('legacy mode: input/change mark dirty, focusout touched; unnamed targets only flip the form flags', () => {
    let s = applyEvent(legacy, null, { trigger: 'input', field: 'a' });
    expect(s).toEqual({ touched: [], dirty: ['a'], formTouched: false, formDirty: true, submitting: false });
    s = applyEvent(legacy, s, { trigger: 'change', field: 'a' });
    expect(s.dirty).toEqual(['a']);
    s = applyEvent(legacy, s, { trigger: 'focusout', field: 'b' });
    expect(s.touched).toEqual(['b']);
    expect(s.formTouched).toBe(true);
    const unnamed = applyEvent(legacy, emptyInteraction(), { trigger: 'focusout' });
    expect(unnamed).toEqual({ ...emptyInteraction(), formTouched: true });
    expect(applyEvent(legacy, s, { trigger: 'keydown', field: 'a' })).toEqual(s);
  });

  test('per-field mode: focusout touches, blur also dirties, change is not listened', () => {
    let s = applyEvent(perField, emptyInteraction(), { trigger: 'focusout', field: 'a' });
    expect(s).toMatchObject({ touched: ['a'], dirty: [] });
    s = applyEvent(perField, s, { trigger: 'focusout', field: 'b' });
    expect(s).toMatchObject({ touched: ['a', 'b'], dirty: ['b'], formDirty: true });
    s = applyEvent(perField, s, { trigger: 'focusout', field: 'c' });
    expect(s.touched).toEqual(['a', 'b', 'c']);
    s = applyEvent(perField, s, { trigger: 'input', field: 'c' });
    expect(s.dirty).toEqual(['b', 'c']);
    expect(applyEvent(perField, s, { trigger: 'change', field: 'a' })).toEqual(s);
  });

  test('per-field mode: unknown or missing field changes nothing; triggers override', () => {
    const s = emptyInteraction();
    expect(applyEvent(perField, s, { trigger: 'input', field: 'zzz' })).toEqual(s);
    expect(applyEvent(perField, s, { trigger: 'input' })).toEqual(s);
    expect(applyEvent(perField, s, { trigger: 'focusout', field: 'a', triggers: ['blur'] }))
      .toMatchObject({ touched: ['a'], dirty: ['a'] });
    expect(applyEvent(perField, s, { trigger: 'focusout', field: 'zzz', triggers: ['focusout'] }))
      .toMatchObject({ touched: ['zzz'] });
  });

  test('submit lifecycle', () => {
    let s = applyEvent(perField, emptyInteraction(), { trigger: 'submit' });
    expect(s).toMatchObject({ touched: ['a', 'b', 'c'], formTouched: true, submitting: false });
    s = applyEvent(perField, s, { trigger: 'submitting' });
    expect(s.submitting).toBe(true);
    s = applyEvent(perField, s, { trigger: 'endSubmit' });
    expect(s.submitting).toBe(false);
    expect(applyEvent(perField, s, { trigger: 'reset' })).toEqual(emptyInteraction());
    expect(applyEvent(perField, s, { trigger: 'init' })).toEqual(s);
    const empty = applyEvent(form([]), emptyInteraction(), { trigger: 'submit' });
    expect(empty.formTouched).toBe(true);
  });

  test('stored interactions without form flags derive them; inputs are never mutated', () => {
    const stored = deepFreeze({ touched: ['a'], dirty: [] });
    const s = applyEvent(legacy, stored, { trigger: 'input', field: 'a' });
    expect(s).toEqual({ touched: ['a'], dirty: ['a'], formTouched: true, formDirty: true, submitting: false });
    expect(applyEvent(legacy, deepFreeze({ touched: 'x', dirty: null }), { trigger: 'init' }))
      .toEqual(emptyInteraction());
    expect(() => applyEvent(deepFreeze(perField), stored, { trigger: 'submit' })).not.toThrow();
  });
});

// ═══════════════════════════════════════════════════════════════════════
describe('evaluateForm', () => {
  test('values: checkbox checked, radio checked value or "", later controls win', () => {
    const spec = form([
      field({ name: 'c', type: 'checkbox' }),
      field({ name: 'r', type: 'radio' }),
      field({ name: 'r', type: 'radio' }),
      field({ name: 'r2', type: 'radio' }),
      field({ name: 't' }),
      field({ name: 't' }),
      field({ name: 'k', type: 'text', kind: 'checkbox' }),
    ]);
    const facts = [
      { value: 'on', checked: true },
      { value: 'a', checked: false },
      { value: 'b', checked: true },
      { value: 'x', checked: false },
      { value: 'first' },
      { value: 'second' },
      { value: 'on' },
    ];
    expect(collectValues(spec, facts)).toEqual({ c: true, r: 'b', r2: '', t: 'second', k: false });
  });

  test('initial evaluation (nothing touched): invalid, no shown errors', () => {
    const spec = form([
      field({ name: 'name', rules: 'required', messages: { required: 'Name is required' } }),
      field({ name: 'age', type: 'number', rules: 'min:18', messages: { min: 'Adults only' } }),
    ], { errorClass: 'invalid' });
    const { form: f, display, aliases, warnings } = evaluateForm(spec, { name: { value: '' }, age: { value: '' } }, null, {});
    expect(f).toEqual({
      valid: false, dirty: false, touched: false, submitting: false, pending: false,
      errors: {}, values: { name: '', age: '' }, firstError: null, errorCount: 0,
      fields: {
        name: { valid: false, dirty: false, touched: false, error: 'Name is required', value: '' },
        age: { valid: false, dirty: false, touched: false, error: 'Adults only', value: '' },
      },
    });
    expect(display.map((d) => [d.name, d.invalid, d.shown, d.errorClass])).toEqual([
      ['name', true, false, 'invalid'], ['age', true, false, 'invalid'],
    ]);
    expect(aliases).toEqual({});
    expect(warnings).toEqual([]);
  });

  test('shown errors, firstError, errorCount, templates, aliases', () => {
    const spec = form([
      field({ name: 'a', rules: 'required', error: '#tpl', as: 'fa', errorClass: 'bad' }),
      field({ name: 'b', rules: 'email', messages: { email: 'Bad email' } }),
      field({ name: 'c', rules: 'required', validateOn: 'submit' }),
    ]);
    const interaction = { touched: [], dirty: ['a', 'b', 'c'] };
    const { form: f, display, aliases } = evaluateForm(spec,
      [{ value: '' }, { value: 'x' }, { value: '' }], interaction, {});
    expect(f.errors).toEqual({ a: 'Required', b: 'Bad email' });
    expect(f.errorCount).toBe(2);
    expect(f.firstError).toBe('Required');
    expect(f.dirty).toBe(true);
    expect(display[0]).toMatchObject({ shown: true, template: '#tpl', errorClass: 'bad', as: 'fa', error: { rule: 'required', message: 'Required' } });
    expect(display[1]).toMatchObject({ shown: true, template: null });
    expect(display[2]).toMatchObject({ invalid: true, shown: false, template: null });
    expect(aliases.fa).toBe(f.fields.a);
    expect(display[0].entry).toBe(f.fields.a);
  });

  test('validate-if false excludes the field (valid, no error), boolean or lazy function', () => {
    const spec = form([
      field({ name: 'a', rules: 'required', as: 'x' }),
      field({ name: 'b', rules: 'required' }),
    ]);
    const order = [];
    const { form: f, display } = evaluateForm(spec, [
      { value: '', validateIf: false },
      { value: '', validateIf: () => { order.push('b-if'); return 0; } },
    ], { touched: ['a', 'b'] }, {}, { onField: (i) => order.push(`field-${i}`) });
    expect(f.valid).toBe(true);
    expect(f.fields.a).toEqual({ valid: true, dirty: false, touched: true, error: null, value: '' });
    expect(display[0]).toMatchObject({ excluded: true, shown: false, template: null, as: 'x' });
    expect(order).toEqual(['field-0', 'b-if', 'field-1']);
    expect(evaluateForm(spec, [{ value: '', validateIf: true }, { value: 'x' }], null, {}).form.valid).toBe(false);
  });

  test('the same alias on two controls: the last one wins', () => {
    const spec = form([field({ name: 'a', as: 'x' }), field({ name: 'b', as: 'x', rules: 'required' })]);
    const r = evaluateForm(spec, [{ value: '' }, { value: '' }], null, {});
    expect(r.aliases.x).toBe(r.form.fields.b);
  });

  test('missing facts default to an empty value; facts by name', () => {
    const spec = form([field({ name: 'a', rules: 'required' })]);
    expect(evaluateForm(spec, [], null, {}).form.fields.a.error).toBe('Required');
    expect(evaluateForm(spec, null, null, {}).form.values).toEqual({ a: '' });
    expect(evaluateForm(spec, { a: { value: 'x' } }, null, {}).form.valid).toBe(true);
  });

  test('custom validators receive the values; thenables become warnings', () => {
    const spec = form([
      field({ name: 'p', rules: 'required' }),
      field({ name: 'q', rules: 'same:p|later' }),
    ]);
    const validators = {
      same: (v, other, all) => v === all[other] || 'Mismatch',
      later: () => Promise.resolve(true),
    };
    const r = evaluateForm(spec, [{ value: 'x' }, { value: 'y' }], null, validators);
    expect(r.form.fields.q.error).toBe('Mismatch');
    expect(r.warnings).toEqual([{ code: 'VALIDATE_ASYNC_UNSUPPORTED', field: 'q', rule: 'later' }]);
    expect(r.form.valid).toBe(false);
  });

  test('submit state passes through; canSubmit / submitEnabled', () => {
    const spec = form([field({ name: 'a' })]);
    const r = evaluateForm(spec, [{ value: 'x' }], { touched: [], dirty: [], submitting: true }, {});
    expect(r.form.submitting).toBe(true);
    expect(canSubmit(r.form)).toBe(true);
    expect(submitEnabled(r.form)).toBe(false);
    expect(canSubmit({ valid: true, pending: true })).toBe(false);
    expect(canSubmit({ valid: false, pending: false })).toBe(false);
    expect(submitEnabled({ valid: true, pending: false, submitting: false })).toBe(true);
  });

  test('deterministic and side-effect free: same output twice, frozen inputs accepted', () => {
    const spec = deepFreeze(form([
      field({ name: 'a', rules: 'required|email', messages: { email: 'E' } }),
      field({ name: 'b', type: 'checkbox', rules: 'truthy' }),
    ], { validateOn: 'input' }));
    const facts = deepFreeze([{ value: 'nope' }, { value: 'on', checked: false }]);
    const interaction = deepFreeze({ touched: ['a'], dirty: ['a', 'b'], formTouched: true, formDirty: true, submitting: false });
    const validators = deepFreeze({ truthy: (v, all) => (all.b ? true : 'Check it') });
    const one = evaluateForm(spec, facts, interaction, validators);
    const two = evaluateForm(spec, facts, interaction, validators);
    expect(one).toEqual(two);
    expect(one.form.errors).toEqual({ a: 'E', b: 'Check it' });
  });

  test('native facts feed the errors; error class falls back to the form', () => {
    const spec = form([field({ name: 'e', type: 'email' })], { errorClass: 'invalid' });
    const r = evaluateForm(spec, [{ value: 'x', native: { flags: ['typeMismatch'], message: 'Enter an email' } }],
      { touched: ['e'] }, {});
    expect(r.form.errors).toEqual({ e: 'Enter an email' });
    expect(r.display[0].errorClass).toBe('invalid');
    expect(evaluateForm(form([field({ name: 'e' })]), [{ value: '' }], null, {}).display[0].errorClass).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════════════════
describe('emulateNative', () => {
  const emu = (overrides, facts) => emulateNative(field(overrides), facts);

  test('valid and empty values', () => {
    expect(emu({}, { value: 'x' })).toBeNull();
    expect(emu({ native: { minlength: '3' } }, { value: '' })).toBeNull();
    expect(emu({ native: { required: true } }, { value: 'x' })).toBeNull();
    expect(emu({ native: { required: true } }, { value: null })).toEqual({
      flags: ['valueMissing'], message: FALLBACK_NATIVE_MESSAGES.valueMissing,
    });
  });

  test('required on checkboxes and radios reads checked', () => {
    expect(emu({ type: 'checkbox', native: { required: true } }, { value: 'on', checked: false }).flags).toEqual(['valueMissing']);
    expect(emu({ type: 'checkbox', native: { required: true, minlength: '9' } }, { value: 'on', checked: true })).toBeNull();
    expect(emu({ type: 'radio', native: { required: true } }, { value: 'a', checked: false }).flags).toEqual(['valueMissing']);
  });

  test('email and url type mismatches', () => {
    expect(emu({ type: 'email' }, { value: 'nope' })).toEqual({ flags: ['typeMismatch'], message: 'Please enter an email address.' });
    expect(emu({ type: 'email' }, { value: 'a@b' })).toBeNull();
    expect(emu({ type: 'email', native: { multiple: true } }, { value: 'a@b.c, d@e.f' })).toBeNull();
    expect(emu({ type: 'email', native: { multiple: true } }, { value: 'a@b.c, nope' }).flags).toEqual(['typeMismatch']);
    expect(emu({ type: 'email' }, { value: 'a@b.c, d@e.f' }).flags).toEqual(['typeMismatch']);
    expect(emu({ type: 'url' }, { value: 'nope' })).toEqual({ flags: ['typeMismatch'], message: 'Please enter a URL.' });
    expect(emu({ type: 'url' }, { value: 'https://e.com' })).toBeNull();
  });

  test('length counts code points; messages carry the numbers', () => {
    expect(emu({ native: { minlength: '3' } }, { value: 'ab' })).toEqual({
      flags: ['tooShort'],
      message: 'Please lengthen this text to 3 characters or more (you are currently using 2 characters).',
    });
    expect(emu({ native: { minlength: '3' } }, { value: '😀😀😀' })).toBeNull();
    expect(emu({ native: { maxlength: '2' } }, { value: 'abc' }).message).toMatch(/shorten this text to 2 .* using 3/);
    expect(emu({ native: { minlength: '', maxlength: '' } }, { value: 'abc' })).toBeNull();
  });

  test('pattern matches the whole value; an invalid pattern constrains nothing', () => {
    expect(emu({ native: { pattern: '[a-z]+' } }, { value: 'abc' })).toBeNull();
    expect(emu({ native: { pattern: '[a-z]+' } }, { value: 'abc1' })).toEqual({ flags: ['patternMismatch'], message: 'Please match the requested format.' });
    expect(emu({ native: { pattern: 'a|b' } }, { value: 'ab' }).flags).toEqual(['patternMismatch']);
    expect(emu({ native: { pattern: '(' } }, { value: 'x' })).toBeNull();
    expect(emu({ type: 'number', native: { pattern: 'x' } }, { value: '5' })).toBeNull();
  });

  test('number: type, range and step', () => {
    expect(emu({ type: 'number' }, { value: 'abc' })).toEqual({ flags: ['typeMismatch'], message: 'Please enter a number.' });
    expect(emu({ type: 'number' }, { value: '  ' }).flags).toEqual(['typeMismatch']);
    expect(emu({ type: 'number', native: { min: '5' } }, { value: '3' })).toEqual({ flags: ['rangeUnderflow'], message: 'Value must be greater than or equal to 5.' });
    expect(emu({ type: 'number', native: { max: '5' } }, { value: '7' })).toEqual({ flags: ['rangeOverflow'], message: 'Value must be less than or equal to 5.' });
    expect(emu({ type: 'number', native: { min: '', max: '' } }, { value: '7' })).toBeNull();
    expect(emu({ type: 'number', native: { step: '2' } }, { value: '3' }).flags).toEqual(['stepMismatch']);
    expect(emu({ type: 'number', native: { step: '2' } }, { value: '4' })).toBeNull();
    expect(emu({ type: 'number', native: { step: '2', min: '1' } }, { value: '3' })).toBeNull();
    expect(emu({ type: 'number', native: { step: '0.1' } }, { value: '0.3' })).toBeNull();
    expect(emu({ type: 'number', native: { step: '0.1' } }, { value: '0.35' }).flags).toEqual(['stepMismatch']);
    expect(emu({ type: 'number', native: { step: 'any' } }, { value: '0.35' })).toBeNull();
    expect(emu({ type: 'number', native: { step: '0' } }, { value: '0.35' })).toBeNull();
    expect(emu({ type: 'number', native: { step: '2', min: 'x' } }, { value: '4' })).toBeNull();
  });

  test('several flags: all reported, the first one gives the message', () => {
    const r = emu({ type: 'email', native: { minlength: '10', pattern: '[0-9]+' } }, { value: 'nope' });
    expect(r.flags).toEqual(['typeMismatch', 'tooShort', 'patternMismatch']);
    expect(r.message).toBe('Please enter an email address.');
  });
});
