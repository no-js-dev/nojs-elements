import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _validityMap, _rulePriority, resetValidateState } from '../src/validate/state.js';

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
//  Per-field validate-on listeners must not wipe a `model` field's value.
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

  const loginForm = (emailOn, passwordOn = '') => `
    <form validate state="{ email: '', password: '' }">
      <input name="email" model="email" type="email" validate="required,email" ${emailOn}>
      <input name="password" model="password" type="password" validate="required,min:8" ${passwordOn}>
      <button type="submit">Log In</button>
    </form>`;

  test('36 - validate-on="blur" keeps the typed value in the input and the model', async () => {
    const form = await render(loginForm('validate-on="blur"'));
    const email = form.querySelector('[name="email"]');
    const password = form.querySelector('[name="password"]');

    type(email, 'a@b.com');
    expect(email.value).toBe('a@b.com');
    blur(email);
    type(password, 'longpassword');
    blur(password);

    const ctx = NoJS.findContext(form);
    expect(email.value).toBe('a@b.com');
    expect(password.value).toBe('longpassword');
    expect(ctx.email).toBe('a@b.com');
    expect(ctx.password).toBe('longpassword');
    expect(ctx.$form.valid).toBe(true);
    expect(ctx.$form.values).toEqual({ email: 'a@b.com', password: 'longpassword' });
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
  });

  test('38 - form-level validate-on keeps model values', async () => {
    const form = await render(`
      <form validate validate-on="blur" state="{ email: '' }">
        <input name="email" model="email" type="email" validate="required,email">
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
          <input name="email" model="email" type="email" validate="required,email" validate-on="blur">
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
    expect(ctx.$form.errors.email).toBeTruthy();
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

  test('42 - field listeners are re-appended after the subtree is processed', async () => {
    const wrapper = mount(loginForm('validate-on="blur"'));
    const email = wrapper.querySelector('[name="email"]');
    NoJS.processTree(wrapper);
    const addSpy = jest.spyOn(email, 'addEventListener');
    await Promise.resolve();
    expect(addSpy.mock.calls.map((c) => c[0]).sort()).toEqual(['focusout', 'input']);
    addSpy.mockRestore();
  });

  test('43 - no listener is re-added when the form is disposed first', async () => {
    const wrapper = mount(loginForm('validate-on="blur"'));
    const form = wrapper.querySelector('form');
    const email = wrapper.querySelector('[name="email"]');
    NoJS.processTree(wrapper);
    const addSpy = jest.spyOn(email, 'addEventListener');
    for (const dispose of form.__disposers) dispose();
    await Promise.resolve();
    expect(addSpy).not.toHaveBeenCalled();
    addSpy.mockRestore();
  });
});
