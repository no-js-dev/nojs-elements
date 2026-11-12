import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _validityMap, _rulePriority, resetValidateState } from '../src/validate/state.js';
import { _internal } from '../src/_compat.js';
import { registerValidation } from '../src/validate/index.js';

// ─── Install the plugin once before all tests ────────────────────────
beforeAll(() => {
  NoJS.use(NoJSElements);
});

// ─── Helper: build a validated form ─────────────────────────────────
function setupForm(opts = {}) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('state', JSON.stringify(opts.state || {}));

  const form = document.createElement('form');
  form.setAttribute('validate', opts.rules || '');
  if (opts.validateOn) form.setAttribute('validate-on', opts.validateOn);
  if (opts.errorClass) form.setAttribute('error-class', opts.errorClass);

  const fields = opts.fields || [
    { tag: 'input', name: 'email', type: 'email', attrs: {} },
  ];

  for (const fieldDef of fields) {
    const field = document.createElement(fieldDef.tag || 'input');
    if (fieldDef.name) field.name = fieldDef.name;
    if (fieldDef.type) field.type = fieldDef.type;
    if (fieldDef.required) field.setAttribute('required', '');
    if (fieldDef.validate) field.setAttribute('validate', fieldDef.validate);
    if (fieldDef.validateOn) field.setAttribute('validate-on', fieldDef.validateOn);
    if (fieldDef.validateIf) field.setAttribute('validate-if', fieldDef.validateIf);
    if (fieldDef.errorClass) field.setAttribute('error-class', fieldDef.errorClass);
    if (fieldDef.as) field.setAttribute('as', fieldDef.as);
    if (fieldDef.value !== undefined) field.value = fieldDef.value;
    if (fieldDef.min !== undefined) field.setAttribute('min', fieldDef.min);
    if (fieldDef.max !== undefined) field.setAttribute('max', fieldDef.max);
    if (fieldDef.attrs) {
      for (const [k, v] of Object.entries(fieldDef.attrs)) {
        field.setAttribute(k, v);
      }
    }
    form.appendChild(field);
  }

  // Add a submit button
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Submit';
  form.appendChild(submitBtn);

  wrapper.appendChild(form);
  document.body.appendChild(wrapper);
  NoJS.processTree(wrapper);

  return { wrapper, form };
}

// ─── Helper: build a standalone validated field ─────────────────────
function setupField(rules, opts = {}) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('state', JSON.stringify(opts.state || {}));

  const input = document.createElement('input');
  input.setAttribute('validate', rules);
  if (opts.name) input.name = opts.name;
  if (opts.type) input.type = opts.type;
  if (opts.error) input.setAttribute('error', opts.error);

  wrapper.appendChild(input);
  document.body.appendChild(wrapper);
  NoJS.processTree(wrapper);
  return { wrapper, input };
}

// ─── Helper: get $form from context ─────────────────────────────────
function getFormContext(form) {
  const ctx = NoJS.findContext(form);
  return ctx?.$form;
}

// =======================================================================
//  VALIDATION REGISTRATION TESTS
// =======================================================================

describe('Validation Registration', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    resetValidateState();
    jest.useRealTimers();
  });

  test('1 - registerValidation registers validate directive', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [{ tag: 'input', name: 'name', type: 'text' }],
    });
    jest.runAllTimers();

    // Form should have novalidate set by the validate directive
    expect(form.getAttribute('novalidate')).toBe('');
  });

  test('2 - removeCoreDirective is called for validate', () => {
    // If core directive was not removed, registration would fail.
    // The fact that beforeAll succeeded and forms process correctly proves it was called.
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [{ tag: 'input', name: 'test', type: 'text' }],
    });
    jest.runAllTimers();
    expect(form.hasAttribute('novalidate')).toBe(true);
  });
});

// =======================================================================
//  $FORM CONTEXT SHAPE TESTS
// =======================================================================

describe('$form Context Shape', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    resetValidateState();
    jest.useRealTimers();
  });

  test('3 - $form is created on the context', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [{ tag: 'input', name: 'username', type: 'text' }],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form).toBeTruthy();
  });

  test('4 - $form has valid property', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [{ tag: 'input', name: 'f', type: 'text' }],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect(typeof $form.valid).toBe('boolean');
  });

  test('5 - $form has dirty property (initially false)', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [{ tag: 'input', name: 'f', type: 'text' }],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.dirty).toBe(false);
  });

  test('6 - $form has touched property (initially false)', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [{ tag: 'input', name: 'f', type: 'text' }],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.touched).toBe(false);
  });

  test('7 - $form has submitting property (initially false)', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [{ tag: 'input', name: 'f', type: 'text' }],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.submitting).toBe(false);
  });

  test('8 - $form has pending property (initially false)', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [{ tag: 'input', name: 'f', type: 'text' }],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.pending).toBe(false);
  });

  test('9 - $form has errors object', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [{ tag: 'input', name: 'f', type: 'text' }],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect(typeof $form.errors).toBe('object');
  });

  test('10 - $form has values object with field values', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'username', type: 'text', value: 'john' },
      ],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.values).toBeTruthy();
    expect($form.values.username).toBe('john');
  });

  test('11 - $form has firstError (null when valid)', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [{ tag: 'input', name: 'f', type: 'text', value: 'ok' }],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.firstError).toBeNull();
  });

  test('12 - $form has errorCount (0 when valid)', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [{ tag: 'input', name: 'f', type: 'text', value: 'ok' }],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.errorCount).toBe(0);
  });

  test('13 - $form has fields object', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [{ tag: 'input', name: 'email', type: 'email' }],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.fields).toBeTruthy();
    expect($form.fields.email).toBeTruthy();
  });

  test('14 - $form has reset function', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [{ tag: 'input', name: 'f', type: 'text' }],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect(typeof $form.reset).toBe('function');
  });
});

// =======================================================================
//  FIELD VALIDATION TESTS
// =======================================================================

describe('Field Validation', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    resetValidateState();
    jest.useRealTimers();
  });

  test('15 - required rule: empty field is invalid', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'name', type: 'text', validate: 'required', value: '' },
      ],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.valid).toBe(false);
  });

  test('16 - required rule: non-empty field is valid', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'name', type: 'text', validate: 'required', value: 'John' },
      ],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.valid).toBe(true);
  });

  test('17 - email rule: invalid email is caught', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'email', type: 'text', validate: 'email', value: 'not-an-email' },
      ],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.valid).toBe(false);
  });

  test('18 - email rule: valid email passes', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'email', type: 'text', validate: 'email', value: 'user@example.com' },
      ],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.valid).toBe(true);
  });

  test('19 - min rule: value below minimum is invalid', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'age', type: 'number', validate: 'min:18', value: '10' },
      ],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.valid).toBe(false);
  });

  test('20 - max rule: value above maximum is invalid', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'qty', type: 'number', validate: 'max:100', value: '200' },
      ],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.valid).toBe(false);
  });

  test('21 - multiple rules: required|email on empty field', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'email', type: 'text', validate: 'required|email', value: '' },
      ],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.valid).toBe(false);
  });

  test('22 - all fields valid means $form.valid is true', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'name', type: 'text', validate: 'required', value: 'John' },
        { tag: 'input', name: 'email', type: 'text', validate: 'email', value: 'a@b.com' },
      ],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.valid).toBe(true);
  });
});

// =======================================================================
//  VALIDATE-ON TRIGGER TESTS
// =======================================================================

describe('Validate-on Triggers', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    resetValidateState();
    jest.useRealTimers();
  });

  test('23 - validate-on="submit" on form: errors only show after submit', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      validateOn: 'submit',
      fields: [
        { tag: 'input', name: 'name', type: 'text', validate: 'required', value: '' },
      ],
    });
    jest.runAllTimers();

    // Field is invalid but no error shown yet (not touched/dirty)
    let $form = getFormContext(form);
    expect($form.valid).toBe(false);
    expect($form.errorCount).toBe(0); // errors only show for interacted fields

    // Submit the form
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    jest.runAllTimers();

    $form = getFormContext(form);
    expect($form.touched).toBe(true);
    expect($form.errorCount).toBe(1);
  });

  test('24 - validate-on="input" triggers validation on input event', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'name', type: 'text', validate: 'required', validateOn: 'input', value: '' },
      ],
    });
    jest.runAllTimers();

    const input = form.querySelector('input[name="name"]');

    // Type into the field
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    jest.runAllTimers();

    let $form = getFormContext(form);
    // After input event, field becomes dirty
    expect($form.dirty).toBe(true);
  });
});

// =======================================================================
//  FORM DIRTY / TOUCHED STATE TESTS
// =======================================================================

describe('Form Dirty / Touched State', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    resetValidateState();
    jest.useRealTimers();
  });

  test('25 - typing in a field sets dirty=true', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'f', type: 'text', value: '' },
      ],
    });
    jest.runAllTimers();

    const input = form.querySelector('input[name="f"]');
    input.value = 'hello';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.dirty).toBe(true);
  });

  test('26 - focusout on a field sets touched=true', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'f', type: 'text', value: '' },
      ],
    });
    jest.runAllTimers();

    const input = form.querySelector('input[name="f"]');
    input.dispatchEvent(new Event('focusout', { bubbles: true }));
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.touched).toBe(true);
  });

  test('27 - errors object only shows for interacted fields', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'required_f', type: 'text', validate: 'required', value: '' },
      ],
    });
    jest.runAllTimers();

    let $form = getFormContext(form);
    // Field invalid but NOT interacted — no error in errors object
    expect($form.valid).toBe(false);
    expect(Object.keys($form.errors).length).toBe(0);

    // Touch the field
    const input = form.querySelector('input[name="required_f"]');
    input.dispatchEvent(new Event('focusout', { bubbles: true }));
    jest.runAllTimers();

    $form = getFormContext(form);
    expect($form.errors.required_f).toBeTruthy();
    expect($form.errorCount).toBe(1);
  });
});

// =======================================================================
//  FORM RESET TESTS
// =======================================================================

describe('Form Reset', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    resetValidateState();
    jest.useRealTimers();
  });

  test('28 - $form.reset() clears dirty and touched', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'f', type: 'text', value: '' },
      ],
    });
    jest.runAllTimers();

    const input = form.querySelector('input[name="f"]');
    input.value = 'modified';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('focusout', { bubbles: true }));
    jest.runAllTimers();

    let $form = getFormContext(form);
    expect($form.dirty).toBe(true);
    expect($form.touched).toBe(true);

    // Reset
    $form.reset();
    jest.runAllTimers();

    $form = getFormContext(form);
    expect($form.dirty).toBe(false);
    expect($form.touched).toBe(false);
  });
});

// =======================================================================
//  AUTO-DISABLE SUBMIT BUTTON TESTS
// =======================================================================

describe('Auto-Disable Submit', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    resetValidateState();
    jest.useRealTimers();
  });

  test('29 - submit button is disabled when form is invalid', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'f', type: 'text', validate: 'required', value: '' },
      ],
    });
    jest.runAllTimers();

    const btn = form.querySelector('button[type="submit"]');
    expect(btn.disabled).toBe(true);
  });

  test('30 - submit button is enabled when form is valid', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'f', type: 'text', validate: 'required', value: 'filled' },
      ],
    });
    jest.runAllTimers();

    const btn = form.querySelector('button[type="submit"]');
    expect(btn.disabled).toBe(false);
  });
});

// =======================================================================
//  PER-FIELD CONTEXT ($field) TESTS
// =======================================================================

describe('Per-field Context', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    resetValidateState();
    jest.useRealTimers();
  });

  test('31 - $form.fields contains per-field state', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'username', type: 'text', validate: 'required', value: 'test' },
      ],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.fields.username).toBeTruthy();
    expect($form.fields.username.valid).toBe(true);
    expect($form.fields.username.dirty).toBe(false);
    expect($form.fields.username.touched).toBe(false);
  });

  test('32 - per-field error is set when field is invalid', () => {
    jest.useFakeTimers();
    const { form } = setupForm({
      fields: [
        { tag: 'input', name: 'email', type: 'text', validate: 'email', value: 'bad' },
      ],
    });
    jest.runAllTimers();

    const $form = getFormContext(form);
    expect($form.fields.email.valid).toBe(false);
    expect($form.fields.email.error).toBeTruthy();
  });
});

// =======================================================================
//  STATE MODULE TESTS
// =======================================================================

describe('Validate State Module', () => {
  test('33 - _validityMap is an array of tuples', () => {
    expect(Array.isArray(_validityMap)).toBe(true);
    expect(_validityMap.length).toBeGreaterThan(0);
    // Each entry is [string, string|null]
    for (const entry of _validityMap) {
      expect(entry.length).toBe(2);
      expect(typeof entry[0]).toBe('string');
    }
  });

  test('34 - _rulePriority is an array of rule names', () => {
    expect(Array.isArray(_rulePriority)).toBe(true);
    expect(_rulePriority).toContain('required');
    expect(_rulePriority).toContain('email');
    expect(_rulePriority).toContain('min');
    expect(_rulePriority).toContain('max');
  });

  test('35 - resetValidateState does not throw', () => {
    expect(() => resetValidateState()).not.toThrow();
  });
});

// =======================================================================
//  MODEL + VALIDATE-ON TESTS
//  Per-field validate-on listeners must not wipe a `model` field's value,
//  and fields without `model` must keep their v1.21.1 listener order.
// =======================================================================

describe('model with validate-on', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    resetValidateState();
  });

  function mount(html) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);
    return wrapper;
  }

  async function render(html) {
    const wrapper = mount(html);
    NoJS.processTree(wrapper);
    await Promise.resolve();
    return wrapper.querySelector('form');
  }

  function type(input, value) {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function blur(input) {
    input.dispatchEvent(new Event('focusout', { bubbles: true }));
  }

  function pick(select, value) {
    select.value = value;
    select.dispatchEvent(new Event('input', { bubbles: true }));
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  const loginForm = (emailOn, passwordOn = '') => `
    <form validate state="{ email: '', password: '' }">
      <input name="email" model="email" type="text" validate="required|email" ${emailOn}>
      <input name="password" model="password" type="password" validate="required" ${passwordOn}>
      <button type="submit">Log In</button>
    </form>`;

  test('36 - validate-on="blur" keeps the typed value in the input and the model', async () => {
    const form = await render(loginForm('validate-on="blur"'));
    const email = form.querySelector('[name="email"]');
    const password = form.querySelector('[name="password"]');

    type(email, 'a@b.com');
    expect(email.value).toBe('a@b.com');
    blur(email);
    type(password, 'secret');
    blur(password);

    const ctx = NoJS.findContext(form);
    expect(email.value).toBe('a@b.com');
    expect(password.value).toBe('secret');
    expect(ctx.email).toBe('a@b.com');
    expect(ctx.password).toBe('secret');
    expect(ctx.$form.valid).toBe(true);
    expect(ctx.$form.values).toEqual({ email: 'a@b.com', password: 'secret' });
    expect(form.querySelector('button').disabled).toBe(false);
  });

  test('37 - validate-on="input" keeps the typed value on every keystroke', async () => {
    const form = await render(loginForm('validate-on="input"', 'validate-on="input"'));
    const email = form.querySelector('[name="email"]');
    const ctx = NoJS.findContext(form);

    for (const partial of ['a', 'a@', 'a@b', 'a@b.com']) {
      type(email, partial);
      expect(email.value).toBe(partial);
      expect(ctx.email).toBe(partial);
    }
    expect(ctx.$form.fields.email.valid).toBe(true);
  });

  test('38 - form-level validate-on keeps model values', async () => {
    const form = await render(`
      <form validate validate-on="blur" state="{ email: '' }">
        <input name="email" model="email" validate="required|email">
        <button type="submit">Go</button>
      </form>`);
    const email = form.querySelector('[name="email"]');

    type(email, 'x@y.io');
    blur(email);

    expect(email.value).toBe('x@y.io');
    expect(NoJS.findContext(form).email).toBe('x@y.io');
  });

  test('39 - state on an ancestor element keeps model values', async () => {
    const form = await render(`
      <div state="{ email: '' }">
        <form validate>
          <input name="email" model="email" validate="required|email" validate-on="blur">
        </form>
      </div>`);
    const email = form.querySelector('[name="email"]');

    type(email, 'a@b.com');
    blur(email);

    expect(email.value).toBe('a@b.com');
    expect(NoJS.findContext(email).email).toBe('a@b.com');
  });

  test('40 - invalid typed value is kept, reported on blur and blocks submit', async () => {
    const form = await render(loginForm('validate-on="blur"'));
    const email = form.querySelector('[name="email"]');
    const ctx = NoJS.findContext(form);

    type(email, 'bad');
    expect(email.value).toBe('bad');
    expect(ctx.$form.errors.email).toBeUndefined();

    blur(email);
    expect(email.value).toBe('bad');
    expect(ctx.email).toBe('bad');
    expect(ctx.$form.valid).toBe(false);
    expect(ctx.$form.errors.email).toBe('Invalid email');
    expect(email.getAttribute('aria-invalid')).toBe('true');
    expect(form.querySelector('button').disabled).toBe(true);
  });

  test('41 - setting the model from state still updates the input', async () => {
    const form = await render(loginForm('validate-on="blur"'));
    const email = form.querySelector('[name="email"]');
    const ctx = NoJS.findContext(form);

    ctx.email = 'set@from.state';
    await new Promise((r) => setTimeout(r, 0));
    expect(email.value).toBe('set@from.state');

    type(email, 'typed@after.io');
    expect(email.value).toBe('typed@after.io');
    expect(ctx.email).toBe('typed@after.io');
  });

  test('42 - checkbox with model keeps the user choice', async () => {
    const form = await render(`
      <form validate validate-on="blur" state="{ agree: false }">
        <input name="agree" type="checkbox" model="agree" validate="required">
      </form>`);
    const box = form.querySelector('[name="agree"]');
    const ctx = NoJS.findContext(form);

    box.click();
    expect(box.checked).toBe(true);
    expect(ctx.agree).toBe(true);
    box.click();
    expect(box.checked).toBe(false);
    expect(ctx.agree).toBe(false);
  });

  test('43 - select and radio with model keep the user choice', async () => {
    const form = await render(`
      <form validate validate-on="input" state="{ size: 'a', color: 'red' }">
        <select name="size" model="size" validate="required">
          <option value="a">A</option><option value="b">B</option>
        </select>
        <input type="radio" name="color" value="red" model="color">
        <input type="radio" name="color" value="blue" model="color">
      </form>`);
    const select = form.querySelector('select');
    const blue = form.querySelector('[value="blue"]');
    const ctx = NoJS.findContext(form);

    pick(select, 'b');
    expect(select.value).toBe('b');
    expect(ctx.size).toBe('b');
    expect(ctx.$form.values.size).toBe('b');

    blue.click();
    expect(blue.checked).toBe(true);
    expect(ctx.color).toBe('blue');
  });

  test('44 - without model, on:input reads $form for the current keystroke', async () => {
    const form = await render(`
      <form validate state="{ log: '' }">
        <input name="email" validate="required|email" validate-on="input"
               on:input="log = log + ($form.valid ? 'T' : 'F')">
      </form>`);
    const email = form.querySelector('[name="email"]');
    const ctx = NoJS.findContext(form);

    for (const partial of ['a', 'a@', 'a@b.c', 'a@b.co']) type(email, partial);
    expect(ctx.log).toBe('FFTT');
  });

  test('45 - without model, on:focusout reads touched state and errors', async () => {
    const form = await render(`
      <form validate state="{ seen: '' }">
        <input name="email" validate="required|email" validate-on="blur"
               on:focusout="seen = $form.fields.email.touched + ':' + ($form.errors.email || '-')">
      </form>`);
    const email = form.querySelector('[name="email"]');

    blur(email);
    expect(NoJS.findContext(form).seen).toBe('true:Required');
  });

  test('46 - without model, aria-invalid follows typing in a blur field', async () => {
    const form = await render(`
      <form validate>
        <input name="email" validate="required|email" validate-on="blur">
      </form>`);
    const email = form.querySelector('[name="email"]');

    type(email, 'bad');
    expect(email.getAttribute('aria-invalid')).toBe('true');
    type(email, 'a@b.com');
    expect(email.hasAttribute('aria-invalid')).toBe(false);
  });

  test('47 - fields without model are never re-bound', async () => {
    const wrapper = mount(`
      <form validate validate-on="blur">
        <input name="email" validate="required|email">
      </form>`);
    const email = wrapper.querySelector('[name="email"]');
    NoJS.processTree(wrapper);
    const addSpy = jest.spyOn(email, 'addEventListener');
    await Promise.resolve();
    expect(addSpy).not.toHaveBeenCalled();
    addSpy.mockRestore();
  });

  test('48 - a form disposed before the microtask re-binds nothing', async () => {
    const wrapper = mount(loginForm('validate-on="blur"'));
    const email = wrapper.querySelector('[name="email"]');
    NoJS.processTree(wrapper);
    const addSpy = jest.spyOn(email, 'addEventListener');
    _internal(NoJS, 'disposeTree')(wrapper.querySelector('form'));
    await Promise.resolve();
    expect(addSpy).not.toHaveBeenCalled();
    addSpy.mockRestore();
  });


  // ── select/checkbox/radio: `model` syncs on change, validation on input ──

  const choiceForm = (on) => `
    <form validate ${on} state="{ size: 'a', agree: false, color: 'red' }">
      <select name="size" model="size" validate="required" error-class="bad">
        <option value="">-</option><option value="a">A</option><option value="b">B</option>
      </select>
      <input name="agree" type="checkbox" model="agree">
      <input type="radio" name="color" value="red" model="color">
      <input type="radio" name="color" value="blue" model="color">
    </form>`;

  const fire = (field, type) => field.dispatchEvent(new Event(type, { bubbles: true }));

  // Every form validation pass adds or removes the field's error-class once.
  function countRuns(field) {
    const add = jest.spyOn(field.classList, 'add');
    const remove = jest.spyOn(field.classList, 'remove');
    return {
      get runs() {
        return [...add.mock.calls, ...remove.mock.calls].filter(([c]) => c === 'bad').length;
      },
      reset() { add.mockClear(); remove.mockClear(); },
      restore() { add.mockRestore(); remove.mockRestore(); },
    };
  }

  test('49 - a script-dispatched input on a model select validates, keeps the pick and syncs the model', async () => {
    const form = await render(choiceForm('validate-on="input"'));
    const select = form.querySelector('select');
    const ctx = NoJS.findContext(form);
    const counter = countRuns(select);

    select.value = 'b';
    fire(select, 'input');
    expect(counter.runs).toBe(1);
    expect(ctx.$form.values.size).toBe('b');
    expect(ctx.$form.fields.size.dirty).toBe(true);
    expect(select.value).toBe('b');
    expect(ctx.size).toBe('b');

    fire(select, 'change');
    expect(ctx.size).toBe('b');
    expect(select.value).toBe('b');
    counter.restore();
  });

  test('50 - a script-dispatched input on a model checkbox or radio validates, keeps the pick and syncs the model', async () => {
    const form = await render(choiceForm('validate-on="input"'));
    const box = form.querySelector('[name="agree"]');
    const red = form.querySelector('[value="red"]');
    const blue = form.querySelector('[value="blue"]');
    const ctx = NoJS.findContext(form);

    box.checked = true;
    fire(box, 'input');
    expect(ctx.$form.values.agree).toBe(true);
    expect(box.checked).toBe(true);
    expect(ctx.agree).toBe(true);
    fire(box, 'change');
    expect(ctx.agree).toBe(true);

    blue.checked = true;
    fire(blue, 'input');
    expect(ctx.$form.values.color).toBe('blue');
    expect(blue.checked).toBe(true);
    expect(red.checked).toBe(false);
    expect(ctx.color).toBe('blue');
    fire(blue, 'change');
    expect(ctx.color).toBe('blue');
  });

  test('51 - a pick firing input then change validates once', async () => {
    const form = await render(choiceForm('validate-on="input"'));
    const select = form.querySelector('select');
    const box = form.querySelector('[name="agree"]');
    const ctx = NoJS.findContext(form);
    const counter = countRuns(select);

    pick(select, 'b');
    expect(counter.runs).toBe(1);
    expect(ctx.size).toBe('b');

    counter.reset();
    box.click();
    expect(counter.runs).toBe(1);
    expect(box.checked).toBe(true);
    expect(ctx.agree).toBe(true);
    counter.restore();
  });

  test('52 - a change-only dispatch syncs the model without validating, as in v1.21.1', async () => {
    const form = await render(choiceForm('validate-on="input"'));
    const select = form.querySelector('select');
    const ctx = NoJS.findContext(form);
    const before = ctx.$form.values.size;
    const counter = countRuns(select);

    select.value = 'b';
    fire(select, 'change');
    expect(counter.runs).toBe(0);
    expect(ctx.size).toBe('b');
    expect(ctx.$form.values.size).toBe(before);
    counter.restore();
  });

  test('52b - another field validating later does not revert a script-dispatched pick', async () => {
    const form = await render(choiceForm('validate-on="input"'));
    const select = form.querySelector('select');
    const box = form.querySelector('[name="agree"]');
    const ctx = NoJS.findContext(form);

    select.value = 'b';
    fire(select, 'input');
    box.checked = true;
    fire(box, 'input');
    expect(select.value).toBe('b');
    expect(ctx.size).toBe('b');
    expect(ctx.$form.values.size).toBe('b');
    expect(ctx.agree).toBe(true);
  });

  test('52c - an input on an unchecked radio leaves the model alone', async () => {
    const form = await render(choiceForm('validate-on="input"'));
    const blue = form.querySelector('[value="blue"]');
    const ctx = NoJS.findContext(form);

    fire(blue, 'input');
    expect(ctx.color).toBe('red');
    expect(form.querySelector('[value="red"]').checked).toBe(true);
  });

  test('52d - an if-gated model is left alone, as core leaves it', async () => {
    const form = await render(`
      <form validate validate-on="input" state="{ agree: false, on: false }">
        <input name="agree" type="checkbox" model="agree" if="on">
      </form>`);
    const box = form.querySelector('[name="agree"]');
    const ctx = NoJS.findContext(form);
    expect(box.__gatedDirs.some((d) => d.name === 'model')).toBe(true);

    box.checked = true;
    fire(box, 'input');
    expect(ctx.agree).toBe(false);
    expect(ctx.$form.values.agree).toBe(true);
  });

  // A picked model select must get exactly the feedback a plain select gets
  // (the v1.21.1 code path) for every validate-on value.
  test.each([
    ['input'], ['blur'], ['focusout'], ['submit'], ['input blur'],
  ])('53 - validate-on="%s" gives a model select the same feedback as a plain one', async (on) => {
    const wrapper = mount(['model="size"', ''].map((m) => `
      <form validate validate-on="${on}" state="{ size: 'a' }">
        <select name="size" ${m} validate="required">
          <option value="">-</option><option value="a" selected>A</option>
        </select>
      </form>`).join(''));
    NoJS.processTree(wrapper);
    await Promise.resolve();
    const [model, plain] = wrapper.querySelectorAll('select');
    const feedback = (f) => {
      const form = NoJS.findContext(f.form).$form;
      return {
        aria: f.getAttribute('aria-invalid'),
        error: form.errors.size,
        valid: form.fields.size.valid,
        dirty: form.fields.size.dirty,
        touched: form.fields.size.touched,
      };
    };

    for (const f of [model, plain]) pick(f, '');
    expect(feedback(model)).toEqual(feedback(plain));
    expect(model.value).toBe('');
    expect(NoJS.findContext(model).size).toBe('');

    for (const f of [model, plain]) blur(f);
    expect(feedback(model)).toEqual(feedback(plain));
    expect(model.value).toBe('');
  });
});

// =======================================================================
//  FORMS WITHOUT validate-on: model choice controls (ELEM-86)
// =======================================================================

describe('model choice controls in a form without validate-on', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    resetValidateState();
  });

  async function render(html) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);
    await Promise.resolve();
    return wrapper.querySelector('form');
  }

  const fire = (field, type) => field.dispatchEvent(new Event(type, { bubbles: true }));

  const choiceForm = `
    <form validate state="{ size: 'a', agree: false, color: 'red', name: '' }">
      <select name="size" model="size" validate="required">
        <option value="">-</option><option value="a">A</option><option value="b">B</option>
      </select>
      <input name="agree" type="checkbox" model="agree">
      <input type="radio" name="color" value="red" model="color">
      <input type="radio" name="color" value="blue" model="color">
      <input name="name" model="name" validate="required">
    </form>`;

  test('54 - a picked model select keeps the pick and syncs the model', async () => {
    const form = await render(choiceForm);
    const select = form.querySelector('select');
    const ctx = NoJS.findContext(form);

    select.value = 'b';
    fire(select, 'input');
    expect(select.value).toBe('b');
    expect(ctx.size).toBe('b');
    fire(select, 'change');
    expect(select.value).toBe('b');
    expect(ctx.size).toBe('b');
    expect(ctx.$form.values.size).toBe('b');
    expect(ctx.$form.fields.size.dirty).toBe(true);
  });

  test('55 - a clicked model checkbox keeps the check and syncs the model', async () => {
    const form = await render(choiceForm);
    const box = form.querySelector('[name="agree"]');
    const ctx = NoJS.findContext(form);

    box.click();
    expect(box.checked).toBe(true);
    expect(ctx.agree).toBe(true);
    expect(ctx.$form.values.agree).toBe(true);
    box.click();
    expect(box.checked).toBe(false);
    expect(ctx.agree).toBe(false);
    expect(ctx.$form.values.agree).toBe(false);
  });

  test('56 - a clicked model radio keeps the pick and syncs the model', async () => {
    const form = await render(choiceForm);
    const red = form.querySelector('[value="red"]');
    const blue = form.querySelector('[value="blue"]');
    const ctx = NoJS.findContext(form);

    blue.click();
    expect(blue.checked).toBe(true);
    expect(red.checked).toBe(false);
    expect(ctx.color).toBe('blue');
    expect(ctx.$form.values.color).toBe('blue');
  });

  test('57 - an input on an unchecked radio leaves the model alone', async () => {
    const form = await render(choiceForm);
    const ctx = NoJS.findContext(form);

    fire(form.querySelector('[value="blue"]'), 'input');
    expect(ctx.color).toBe('red');
    expect(form.querySelector('[value="red"]').checked).toBe(true);
  });

  test('58 - an if-gated model checkbox is left alone, as core leaves it', async () => {
    const form = await render(`
      <form validate state="{ agree: false, on: false }">
        <input name="agree" type="checkbox" model="agree" if="on">
      </form>`);
    const box = form.querySelector('[name="agree"]');
    const ctx = NoJS.findContext(form);

    box.checked = true;
    fire(box, 'input');
    expect(ctx.agree).toBe(false);
    expect(ctx.$form.values.agree).toBe(true);
  });

  test('59 - text fields keep their v1.21.1 timing: one validation per input and per change', async () => {
    const form = await render(`
      <form validate error-class="bad" state="{ name: '' }">
        <input name="name" model="name" validate="required">
      </form>`);
    const name = form.querySelector('[name="name"]');
    const ctx = NoJS.findContext(form);
    const add = jest.spyOn(name.classList, 'add');
    const remove = jest.spyOn(name.classList, 'remove');
    const runs = () => [...add.mock.calls, ...remove.mock.calls].filter(([c]) => c === 'bad').length;

    name.value = 'Ada';
    fire(name, 'input');
    expect(runs()).toBe(1);
    expect(ctx.name).toBe('Ada');
    expect(ctx.$form.values.name).toBe('Ada');
    fire(name, 'change');
    expect(runs()).toBe(2);

    name.value = '';
    fire(name, 'input');
    expect(runs()).toBe(3);
    expect(ctx.$form.errors.name).toBe('Required');
    expect(name.getAttribute('aria-invalid')).toBe('true');
    add.mockRestore();
    remove.mockRestore();
  });

  test('60 - a checkbox without model still validates on click, as in v1.21.1', async () => {
    const form = await render(`
      <form validate>
        <input name="agree" type="checkbox" validate="required" required>
      </form>`);
    const box = form.querySelector('[name="agree"]');
    const ctx = NoJS.findContext(form);

    box.click();
    expect(box.checked).toBe(true);
    expect(ctx.$form.values.agree).toBe(true);
    expect(ctx.$form.valid).toBe(true);
  });

  test('61 - the docs Complete Example: a model checkbox toggles the if-gated address field', async () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div state="{ showAddress: false }">
        <form validate>
          <input name="name" validate="required" />
          <label><input type="checkbox" name="hasAddress" model="showAddress" /> Add address</label>
          <div if="showAddress">
            <input name="street" validate="required" />
          </div>
        </form>
      </div>`;
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);
    await Promise.resolve();
    const box = wrapper.querySelector('[name="hasAddress"]');

    box.click();
    expect(box.checked).toBe(true);
    expect(NoJS.findContext(box).showAddress).toBe(true);
    expect(wrapper.querySelector('[name="street"]')).not.toBeNull();
  });
});

// =======================================================================
//  validate-if exclusion clears stale feedback (ELEM-87)
// =======================================================================

describe('validate-if exclusion', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    resetValidateState();
  });

  async function render(html) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);
    await Promise.resolve();
    return wrapper;
  }

  const fire = (field, type) => field.dispatchEvent(new Event(type, { bubbles: true }));

  const form = (extra = '') => `
    <form validate error-class="bad" state="{ check: true }" ${extra}>
      <input name="code" validate="required" validate-if="check" error="#code-err">
      <template id="code-err"><span class="code-error" bind="$error"></span></template>
      <input name="other" validate="required">
    </form>`;

  test('62 - an excluded field drops aria-invalid, the error-class and the error template', async () => {
    const wrapper = await render(form());
    const code = wrapper.querySelector('[name="code"]');
    const other = wrapper.querySelector('[name="other"]');
    const ctx = NoJS.findContext(code);

    fire(code, 'input');
    fire(code, 'focusout');
    expect(code.getAttribute('aria-invalid')).toBe('true');
    expect(code.classList.contains('bad')).toBe(true);
    expect(wrapper.querySelector('.code-error')).not.toBeNull();

    ctx.check = false;
    fire(other, 'input');
    expect(ctx.$form.fields.code.valid).toBe(true);
    expect(code.hasAttribute('aria-invalid')).toBe(false);
    expect(code.classList.contains('bad')).toBe(false);
    expect(wrapper.querySelector('.code-error')).toBeNull();
  });

  test('63 - a field-level error-class is dropped too', async () => {
    const wrapper = await render(`
      <form validate state="{ check: true }">
        <input name="code" validate="required" validate-if="check" error-class="red ring">
      </form>`);
    const code = wrapper.querySelector('[name="code"]');
    const ctx = NoJS.findContext(code);

    fire(code, 'input');
    expect(code.classList.contains('red')).toBe(true);
    ctx.check = false;
    fire(code, 'input');
    expect(code.classList.contains('red')).toBe(false);
    expect(code.classList.contains('ring')).toBe(false);
    expect(code.hasAttribute('aria-invalid')).toBe(false);
  });

  test.each([['input'], ['blur']])('63b - validate-on="%s": an excluded field typed into gets no aria-invalid', async (on) => {
    const wrapper = await render(`
      <form validate validate-on="${on}" error-class="bad" state="{ check: true }">
        <input name="code" validate="required" validate-if="check">
      </form>`);
    const code = wrapper.querySelector('[name="code"]');
    const ctx = NoJS.findContext(code);

    fire(code, 'input');
    fire(code, 'focusout');
    expect(code.getAttribute('aria-invalid')).toBe('true');
    ctx.check = false;
    code.value = '';
    fire(code, 'input');
    expect(code.hasAttribute('aria-invalid')).toBe(false);
    expect(code.classList.contains('bad')).toBe(false);
    expect(ctx.$form.valid).toBe(true);
  });

  test('64 - re-including the field restores its feedback', async () => {
    const wrapper = await render(form());
    const code = wrapper.querySelector('[name="code"]');
    const ctx = NoJS.findContext(code);

    fire(code, 'input');
    ctx.check = false;
    fire(code, 'input');
    expect(code.hasAttribute('aria-invalid')).toBe(false);
    ctx.check = true;
    fire(code, 'input');
    expect(code.getAttribute('aria-invalid')).toBe('true');
    expect(code.classList.contains('bad')).toBe(true);
    expect(wrapper.querySelector('.code-error')).not.toBeNull();
  });

  test('65 - an excluded field keeps classes it did not get from validation', async () => {
    const wrapper = await render(`
      <form validate error-class="bad" state="{ check: false }">
        <input name="code" class="field" validate="required" validate-if="check">
      </form>`);
    const code = wrapper.querySelector('[name="code"]');

    fire(code, 'input');
    expect(code.className).toBe('field');
    expect(code.hasAttribute('aria-invalid')).toBe(false);
  });
});

// =======================================================================
//  auto-disable="off" opt-out (ELEM-88)
// =======================================================================

describe('auto-disable="off"', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    resetValidateState();
    jest.useRealTimers();
  });

  function render(html) {
    jest.useFakeTimers();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);
    jest.runAllTimers();
    return wrapper;
  }

  const fire = (field, type) => field.dispatchEvent(new Event(type, { bubbles: true }));
  const type = (field, value) => { field.value = value; fire(field, 'input'); };

  test('66 - without it, a submit button with bind-disabled keeps the v1.22.0 automatic state', () => {
    const wrapper = render(`
      <form validate state="{ locked: true }">
        <input name="name" validate="required" value="Ada">
        <button type="submit" bind-disabled="locked">Save</button>
      </form>`);
    const btn = wrapper.querySelector('button');
    type(wrapper.querySelector('[name="name"]'), 'Bob');
    expect(btn.disabled).toBe(false);
  });

  test('67 - a button with auto-disable="off" stays enabled while the form is invalid', () => {
    const wrapper = render(`
      <form validate>
        <input name="name" validate="required">
        <button type="submit" auto-disable="off">Save</button>
      </form>`);
    const btn = wrapper.querySelector('button');
    expect(btn.disabled).toBe(false);
    type(wrapper.querySelector('[name="name"]'), '');
    expect(btn.disabled).toBe(false);
  });

  test('68 - clicking it on an invalid form blocks the submit and reveals every error', () => {
    const wrapper = render(`
      <form validate>
        <input name="name" validate="required">
        <input name="email" validate="required|email">
        <button type="submit" auto-disable="off">Save</button>
      </form>`);
    const form = wrapper.querySelector('form');
    const onSubmit = jest.fn();
    form.addEventListener('submit', onSubmit);
    const ev = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(ev);
    const $form = NoJS.findContext(form).$form;
    expect(ev.defaultPrevented).toBe(true);
    expect(onSubmit).not.toHaveBeenCalled();
    expect($form.errors).toEqual({ name: 'Required', email: 'Required' });
    expect(wrapper.querySelector('button').disabled).toBe(false);
  });

  test('69 - its bind-disabled alone decides: disabled until the form is valid and changed', () => {
    const wrapper = render(`
      <form validate>
        <input name="name" validate="required" value="Ada">
        <button type="submit" auto-disable="off" bind-disabled="!$form.valid || !$form.dirty">Save</button>
      </form>`);
    const btn = wrapper.querySelector('button');
    const name = wrapper.querySelector('[name="name"]');
    expect(btn.disabled).toBe(true);
    type(name, 'Bob');
    expect(btn.disabled).toBe(false);
    type(name, '');
    expect(btn.disabled).toBe(true);
  });

  test('70 - it applies per button: other submit buttons stay automatic', () => {
    const wrapper = render(`
      <form validate>
        <input name="name" validate="required">
        <button type="submit" auto-disable="off" data-k="manual">A</button>
        <button type="submit" data-k="auto">B</button>
        <input type="submit" auto-disable="off" data-k="input-manual">
      </form>`);
    const [manual, auto, inputManual] = ['manual', 'auto', 'input-manual']
      .map((k) => wrapper.querySelector(`[data-k="${k}"]`));
    expect(manual.disabled).toBe(false);
    expect(inputManual.disabled).toBe(false);
    expect(auto.disabled).toBe(true);
  });

  test('71 - any other auto-disable value keeps the automatic state', () => {
    const wrapper = render(`
      <form validate>
        <input name="name" validate="required">
        <button type="submit" auto-disable="on">A</button>
        <button type="submit" auto-disable="">B</button>
      </form>`);
    for (const btn of wrapper.querySelectorAll('button')) expect(btn.disabled).toBe(true);
  });

  test('72 - it does not stop the submit from setting $form.submitting', () => {
    const wrapper = render(`
      <form validate>
        <input name="name" validate="required" value="Ada">
        <button type="submit" auto-disable="off">Save</button>
      </form>`);
    const form = wrapper.querySelector('form');
    form.addEventListener('submit', (e) => e.preventDefault());
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(NoJS.findContext(form).$form.submitting).toBe(true);
    expect(wrapper.querySelector('button').disabled).toBe(false);
  });
});

// =======================================================================
//  Custom validator signatures, as the docs describe them (ELEM-88)
// =======================================================================

describe('custom validator signatures', () => {
  const calls = [];

  beforeAll(() => {
    NoJS.validator('matchPassword', (value, allValues) => {
      calls.push(['custom', value, allValues]);
      return value === allValues.password ? null : 'Passwords do not match';
    });
    NoJS.validator('sameAs', (value, field, allValues) => {
      calls.push(['direct', value, field, allValues]);
      return value === allValues[field] ? null : `Must match ${field}`;
    });
    // The validate module reads validators when it registers.
    registerValidation(NoJS);
  });

  afterEach(() => {
    calls.length = 0;
    document.body.innerHTML = '';
    resetValidateState();
  });

  async function render(rule) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <form validate>
        <input name="password" value="secret">
        <input name="confirm" validate="required|${rule}">
      </form>`;
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);
    await Promise.resolve();
    return wrapper;
  }

  const type = (field, value) => {
    field.value = value;
    field.dispatchEvent(new Event('input', { bubbles: true }));
  };

  test('73 - custom:name calls the validator with (value, allValues)', async () => {
    const wrapper = await render('custom:matchPassword');
    const confirm = wrapper.querySelector('[name="confirm"]');
    const ctx = NoJS.findContext(confirm);

    type(confirm, 'nope');
    expect(calls.at(-1)).toEqual(['custom', 'nope', { password: 'secret', confirm: 'nope' }]);
    expect(ctx.$form.errors.confirm).toBe('Passwords do not match');
    type(confirm, 'secret');
    expect(ctx.$form.errors.confirm).toBeUndefined();
    expect(ctx.$form.valid).toBe(true);
  });

  test('74 - a validator named in the rule gets its arguments before allValues', async () => {
    const wrapper = await render('sameAs:password');
    const confirm = wrapper.querySelector('[name="confirm"]');
    const ctx = NoJS.findContext(confirm);

    type(confirm, 'nope');
    expect(calls.at(-1)).toEqual(['direct', 'nope', 'password', { password: 'secret', confirm: 'nope' }]);
    expect(ctx.$form.errors.confirm).toBe('Must match password');
    type(confirm, 'secret');
    expect(ctx.$form.valid).toBe(true);
  });
});
