import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';

// ─── Install the plugin once before all tests ────────────────────────
beforeAll(() => {
  NoJS.use(NoJSElements);
});

afterEach(() => {
  document.body.innerHTML = '';
  jest.useRealTimers();
});

function mount(html) {
  jest.useFakeTimers();
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.appendChild(host);
  NoJS.processTree(host);
  jest.runAllTimers();
  return host;
}

const formState = (form) => NoJS.findContext(form).$form;

function type(el, value) {
  el.value = value;
  el.dispatchEvent(new Event('input', { bubbles: true }));
}

function blur(el) {
  el.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
}

function errorWrappers() {
  return [...document.querySelectorAll('div[style="display: contents;"]')];
}

// ═══════════════════════════════════════════════════════════════════════
//  Error templates on fields inside <form validate>
// ═══════════════════════════════════════════════════════════════════════

describe('Error template on a field inside <form validate>', () => {
  test('typing renders the template once, with $rule and $error', () => {
    const host = mount(`<div state="{}"><form validate>
      <input id="email" name="email" validate="required|email" error="#tpl-email">
      <template id="tpl-email"><em class="err" bind="$rule + ': ' + $error"></em></template>
      <button type="submit">Go</button>
    </form></div>`);
    const email = host.querySelector('#email');

    type(email, 'x');

    const rendered = host.querySelectorAll('em.err');
    expect(rendered).toHaveLength(1);
    expect(rendered[0].textContent).toBe('email: Invalid email');
    expect(errorWrappers()).toHaveLength(1);
    // Rendered after the <template>, not after the field
    expect(host.querySelector('#tpl-email').nextElementSibling).toBe(errorWrappers()[0]);
    expect(email.nextElementSibling).toBe(host.querySelector('#tpl-email'));
  });

  test('typing does not render the template when validate-on is focusout', () => {
    const host = mount(`<div state="{}"><form validate validate-on="focusout">
      <input id="email" name="email" validate="required|email" error="#tpl-email">
      <template id="tpl-email"><em class="err" bind="$rule + ': ' + $error"></em></template>
    </form></div>`);
    const email = host.querySelector('#email');

    type(email, 'x');
    expect(host.querySelectorAll('em.err')).toHaveLength(0);
    expect(errorWrappers()).toHaveLength(0);

    blur(email);
    const rendered = host.querySelectorAll('em.err');
    expect(rendered).toHaveLength(1);
    expect(rendered[0].textContent).toBe('email: Invalid email');
  });

  test('typing then clearing shows one copy with the current error', () => {
    const host = mount(`<div state="{}"><form validate>
      <input id="name" name="name" validate="required" error="#tpl-name">
      <template id="tpl-name"><span class="err" bind="$error"></span></template>
    </form></div>`);
    const name = host.querySelector('#name');

    type(name, 'a');
    expect(host.querySelectorAll('span.err')).toHaveLength(0);

    type(name, '');
    const rendered = host.querySelectorAll('span.err');
    expect(rendered).toHaveLength(1);
    expect(rendered[0].textContent).toBe('Required');
  });

  test('a v1.21.1 template that reads err.message still renders, once', () => {
    const host = mount(`<div state="{}"><form validate>
      <input id="name" name="name" validate="required" error="#tpl-legacy">
      <template id="tpl-legacy"><span class="err" bind="err.message"></span></template>
    </form></div>`);
    const name = host.querySelector('#name');

    type(name, 'a');
    type(name, '');

    const rendered = host.querySelectorAll('span.err');
    expect(rendered).toHaveLength(1);
    expect(rendered[0].textContent).toBe('Required');
  });

  test('a standalone field outside a form still renders its template with err.message', () => {
    const host = mount(`<div state="{}">
      <input id="solo" validate="required" error="#tpl-solo">
      <template id="tpl-solo"><span class="err" bind="err.message"></span></template>
    </div>`);
    const solo = host.querySelector('#solo');

    type(solo, 'a');
    expect(host.querySelectorAll('span.err')).toHaveLength(0);

    type(solo, '');
    const rendered = host.querySelectorAll('span.err');
    expect(rendered).toHaveLength(1);
    expect(rendered[0].textContent).toBe('Required');
    expect(solo.nextElementSibling.contains(rendered[0])).toBe(true);
    expect(solo.getAttribute('aria-invalid')).toBe('true');
  });
});

// ═══════════════════════════════════════════════════════════════════════
//  Empty values and min / max / url (validate-empty opt-in)
// ═══════════════════════════════════════════════════════════════════════

describe('Empty values without validate-empty (v1.21.1 default)', () => {
  test('min:N fails an empty field, max:N and url as today', () => {
    const host = mount(`<div state="{}"><form validate>
      <input name="age" type="number" validate="min:1">
      <input name="cap" type="number" validate="max:120">
      <input name="site" validate="url">
      <button type="submit">Go</button>
    </form></div>`);
    const f = formState(host.querySelector('form'));
    expect(f.fields.age.error).toBe('Minimum value is 1');
    expect(f.fields.cap.error).toBeNull();
    expect(f.fields.site.error).toBe('Invalid URL');
    expect(f.valid).toBe(false);
    expect(host.querySelector('button').disabled).toBe(true);
  });

  test('validate-empty="check" keeps the default', () => {
    const host = mount(`<div state="{}"><form validate validate-empty="check">
      <input name="age" type="number" validate="min:1">
      <input name="site" validate="url">
    </form></div>`);
    const f = formState(host.querySelector('form'));
    expect(f.fields.age.error).toBe('Minimum value is 1');
    expect(f.fields.site.error).toBe('Invalid URL');
  });

  test('a standalone field keeps failing min and url when empty', () => {
    const host = mount(`<div state="{}">
      <input id="age" validate="min:1">
      <input id="site" validate="url">
    </div>`);
    const age = host.querySelector('#age');
    const site = host.querySelector('#site');
    type(age, '');
    type(site, '');
    expect(age.getAttribute('aria-invalid')).toBe('true');
    expect(site.getAttribute('aria-invalid')).toBe('true');
  });
});

describe('Empty values with validate-empty="skip"', () => {
  test('on the form: empty fields pass min, max and url', () => {
    const host = mount(`<div state="{}"><form validate validate-empty="skip">
      <input name="age" type="number" validate="min:18">
      <input name="cap" type="number" validate="max:-1">
      <input name="site" validate="url">
      <input name="note" validate="min:1">
      <button type="submit">Go</button>
    </form></div>`);
    const form = host.querySelector('form');
    const note = form.querySelector('[name="note"]');
    type(note, '   ');
    const f = formState(form);
    expect(f.fields.age.error).toBeNull();
    expect(f.fields.cap.error).toBeNull();
    expect(f.fields.site.error).toBeNull();
    expect(f.fields.note.error).toBeNull();
    expect(f.valid).toBe(true);
    expect(host.querySelector('button').disabled).toBe(false);
  });

  test('non-empty values are still checked', () => {
    const host = mount(`<div state="{}"><form validate validate-empty="skip">
      <input name="age" type="number" validate="min:18">
      <input name="cap" type="number" validate="max:120">
      <input name="site" validate="url">
    </form></div>`);
    const form = host.querySelector('form');
    type(form.querySelector('[name="age"]'), '5');
    type(form.querySelector('[name="cap"]'), '200');
    type(form.querySelector('[name="site"]'), 'not a url');
    const f = formState(form);
    expect(f.fields.age.error).toBe('Minimum value is 18');
    expect(f.fields.cap.error).toBe('Maximum value is 120');
    expect(f.fields.site.error).toBe('Invalid URL');
  });

  test('required still fails an empty field', () => {
    const host = mount(`<div state="{}"><form validate validate-empty="skip">
      <input name="age" type="number" validate="required|min:18">
    </form></div>`);
    const f = formState(host.querySelector('form'));
    expect(f.fields.age.error).toBe('Required');
    expect(f.valid).toBe(false);
  });

  test('a field validate-empty="check" overrides the form', () => {
    const host = mount(`<div state="{}"><form validate validate-empty="skip">
      <input name="age" type="number" validate="min:1" validate-empty="check">
      <input name="site" validate="url">
    </form></div>`);
    const f = formState(host.querySelector('form'));
    expect(f.fields.age.error).toBe('Minimum value is 1');
    expect(f.fields.site.error).toBeNull();
  });

  test('on a field inside a form without the attribute', () => {
    const host = mount(`<div state="{}"><form validate>
      <input name="age" type="number" validate="min:1" validate-empty="skip">
      <input name="other" type="number" validate="min:1">
    </form></div>`);
    const f = formState(host.querySelector('form'));
    expect(f.fields.age.error).toBeNull();
    expect(f.fields.other.error).toBe('Minimum value is 1');
  });

  test('on a standalone field: empty passes, non-empty is checked', () => {
    const host = mount(`<div state="{}">
      <input id="age" validate="min:18" validate-empty="skip" error="#tpl-age">
      <template id="tpl-age"><span class="err" bind="err.message"></span></template>
      <input id="site" validate="url" validate-empty="skip">
    </div>`);
    const age = host.querySelector('#age');
    const site = host.querySelector('#site');

    type(age, '');
    type(site, '');
    expect(age.hasAttribute('aria-invalid')).toBe(false);
    expect(site.hasAttribute('aria-invalid')).toBe(false);
    expect(host.querySelectorAll('span.err')).toHaveLength(0);

    type(age, '5');
    expect(age.getAttribute('aria-invalid')).toBe('true');
    expect(host.querySelector('span.err').textContent).toBe('Minimum value is 18');
  });
});
