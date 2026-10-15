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
