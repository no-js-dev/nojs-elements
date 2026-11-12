// Elements loaded after core initialized the page (a late or async script):
// core already bound every [validate] node against its stub. Each test loads a
// fresh core (stub registered), initializes the DOM, then installs Elements.

let NoJS;
let NoJSElements;
let warnSpy;

beforeEach(() => {
  jest.isolateModules(() => {
    NoJS = require('../../NoJS/src/index.js').default;
    NoJSElements = require('../src/index.js').default;
  });
  warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
});

afterEach(() => {
  document.body.innerHTML = '';
  warnSpy.mockRestore();
});

const tick = () => new Promise((r) => setTimeout(r, 10));

const type = (field, value) => {
  field.value = value;
  field.dispatchEvent(new Event('input', { bubbles: true }));
};

const warned = (text) => warnSpy.mock.calls.some((args) => args.join(' ').includes(text));

async function lateLoad(html) {
  document.body.innerHTML = html;
  await NoJS.init(document.body);
  warnSpy.mockClear();
  NoJS.use(NoJSElements);
  await tick();
}

const IF_FORM = (formAttrs = '') =>
  `<form validate ${formAttrs}>` +
  '<input name="email" validate="required|email">' +
  '<p if="$form.errors.email"><span class="msg">Enter a valid email</span></p>' +
  '</form>';

describe('Late install: if inside a <form validate>', () => {
  test.each([
    ['state on an ancestor', `<div state="{ sent: false }">${IF_FORM()}</div>`],
    ['state on the form', IF_FORM('state="{ sent: false }"')],
  ])('1 - if="$form.errors.x" keeps its content (%s)', async (_label, html) => {
    await lateLoad(html);
    const input = document.querySelector('input');
    const p = document.querySelector('p');

    type(input, 'bad');
    expect(p.querySelector('.msg')?.textContent).toBe('Enter a valid email');
    type(input, 'a@b.co');
    expect(p.querySelector('.msg')).toBeNull();
    type(input, 'bad again');
    expect(p.querySelector('.msg')?.textContent).toBe('Enter a valid email');
  });

  test('2 - an each loop inside the form keeps re-rendering', async () => {
    await lateLoad(
      '<div state="{ items: [\'a\', \'b\'] }">' +
      '<form validate><input name="x" validate="required">' +
      '<ul><li each="item in items" bind="item"></li></ul>' +
      '</form></div>'
    );
    const ctx = NoJS.findContext(document.querySelector('form'));
    ctx.items = ['c', 'a', 'b'];
    await tick();
    expect([...document.querySelectorAll('li')].map((li) => li.textContent).join(',')).toBe('c,a,b');
  });

  test('3 - an on:submit handler on the form keeps working', async () => {
    await lateLoad(IF_FORM('state="{ sent: false }" on:submit.prevent="sent = true"'));
    const form = document.querySelector('form');
    type(form.querySelector('input'), 'a@b.co');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(NoJS.findContext(form).sent).toBe(true);
  });

  test('4 - the core stub no longer blocks a valid native submit', async () => {
    await lateLoad(`<div state="{}">${IF_FORM()}</div>`);
    const form = document.querySelector('form');
    type(form.querySelector('input'), 'a@b.co');
    const e = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(e);
    expect(e.defaultPrevented).toBe(false);
    expect(warned('Form submission blocked')).toBe(false);
  });

  test('5 - an invalid submit is still blocked by the real directive', async () => {
    await lateLoad(`<div state="{}">${IF_FORM()}</div>`);
    const form = document.querySelector('form');
    const e = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(e);
    expect(e.defaultPrevented).toBe(true);
    expect(NoJS.findContext(form).$form.touched).toBe(true);
  });

  test('6 - $form is the real plugin object, and the plugin init hook leaves it alone', async () => {
    await lateLoad(`<div state="{}">${IF_FORM()}</div>`);
    const form = document.querySelector('form');
    const $form = NoJS.findContext(form).$form;
    expect(typeof $form.valid).toBe('boolean');
    expect($form.fields.email).toBeTruthy();
    expect(Object.isFrozen($form.fields.email)).toBe(false);

    const disposers = form.__disposers;
    NoJSElements.init(NoJS);
    expect(form.__disposers).toBe(disposers);
    expect(NoJS.findContext(form).$form).toBe($form);
  });

  test('7 - without any state, $form bindings work and the lost if content is reported', async () => {
    await lateLoad(
      '<form validate><input name="email" validate="required|email">' +
      '<span class="count" bind="$form.errorCount"></span>' +
      '<p if="$form.errors.email"><span class="msg">Enter a valid email</span></p>' +
      '</form>'
    );
    type(document.querySelector('input'), 'bad');
    await tick();
    expect(document.querySelector('.count').textContent).toBe('1');
    expect(warned('state')).toBe(true);
  });

  test('8 - a standalone field keeps no stub $form on its context', async () => {
    await lateLoad('<div state="{}"><input name="solo" validate="required"></div>');
    const input = document.querySelector('input');
    expect(NoJS.findContext(input).$form).toBeFalsy();
    expect(input.__nojsElBoundCtx).toBe(NoJS.findContext(input));
  });

  test('9 - without a recognizable stub listener the form is processed again, as before', async () => {
    document.body.innerHTML = `<div state="{}">${IF_FORM()}</div>`;
    await NoJS.init(document.body);
    const form = document.querySelector('form');
    form.__disposers = form.__disposers.filter((fn) => !String(fn).includes('"submit"'));
    NoJS.use(NoJSElements);
    await tick();
    expect(form.__nojsElBoundCtx).toBe(NoJS.findContext(form));
    expect(typeof NoJS.findContext(form).$form.valid).toBe('boolean');
  });
});
