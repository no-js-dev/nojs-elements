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

  test('a 1.21.1 template that reads err.message still renders, once', () => {
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
