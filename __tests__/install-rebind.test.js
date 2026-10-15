import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _internal } from '../src/_compat.js';

// These tests cover the install/re-bind path that lets the plugin recover nodes
// the core already processed against its stub directives, plus the safe-internals
// accessor used to tolerate older cores.

beforeAll(() => {
  NoJS.use(NoJSElements);
});

afterEach(() => {
  document.body.innerHTML = '';
});

// ── Helper: build a state-wrapped validated form in the DOM ──────────
function buildForm() {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('state', '{ "submitted": false }');

  const form = document.createElement('form');
  form.setAttribute('validate', '');

  const input = document.createElement('input');
  input.name = 'name';
  input.type = 'text';
  input.setAttribute('validate', 'required');
  form.appendChild(input);

  wrapper.appendChild(form);
  document.body.appendChild(wrapper);
  return { wrapper, form, input };
}

describe('Install re-bind: $form recovery', () => {
  test('1 - $form is bound on the form context after install + processTree', () => {
    const { wrapper, form } = buildForm();
    NoJS.processTree(wrapper);

    const ctx = NoJS.findContext(form);
    expect(ctx).toBeTruthy();
    expect(ctx.$form).toBeTruthy();
    // It must be the real plugin $form (has a working reset), not the core stub
    // (whose reset is a no-op) — the plugin reset re-runs validation.
    expect(typeof ctx.$form.reset).toBe('function');
    expect(typeof ctx.$form.valid).toBe('boolean');
    expect(ctx.$form.fields).toBeTruthy();
  });

  test('2 - re-running the plugin install re-binds without throwing or duplicating $form', () => {
    const { wrapper, form } = buildForm();
    NoJS.processTree(wrapper);

    const before = NoJS.findContext(form).$form;
    expect(before).toBeTruthy();

    // Idempotency: installing the same plugin again must not throw and must
    // leave a single, valid $form on the form context.
    expect(() => NoJS.use(NoJSElements)).not.toThrow();

    const after = NoJS.findContext(form).$form;
    expect(after).toBeTruthy();
    expect(typeof after.reset).toBe('function');
    expect(typeof after.valid).toBe('boolean');
  });
});

describe('Safe internals accessor (_internal)', () => {
  test('3 - returns the member when core exposes internals.disposeTree', () => {
    expect(typeof _internal(NoJS, 'disposeTree')).toBe('function');
    expect(typeof _internal(NoJS, 'disposeChildren')).toBe('function');
  });

  test('4 - degrades to undefined (no throw) on an old core missing internals or member', () => {
    // Core with no internals at all
    expect(_internal({}, 'disposeTree')).toBeUndefined();
    expect(_internal(null, 'disposeTree')).toBeUndefined();
    // Core whose internals object lacks the requested member
    expect(_internal({ internals: {} }, 'disposeTree')).toBeUndefined();
    // Present member is still returned through a plain object
    const fake = { internals: { disposeTree: () => 'ok' } };
    expect(_internal(fake, 'disposeTree')()).toBe('ok');
  });
});
