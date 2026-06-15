import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';

// ─── Install the plugin once before all tests ────────────────────────
beforeAll(() => {
  NoJS.use(NoJSElements);
});

// ─── Test helper: create a stepper with N steps ──────────────────────
function setupStepper(stepCount = 3, attrs = {}) {
  const parent = document.createElement('div');
  parent.setAttribute('state', attrs.state || '{}');

  const el = document.createElement('div');
  el.setAttribute('stepper', attrs.stepper || '');

  for (const [k, v] of Object.entries(attrs)) {
    if (k !== 'state' && k !== 'stepper') {
      el.setAttribute(k, v);
    }
  }

  for (let i = 0; i < stepCount; i++) {
    const step = document.createElement('div');
    step.setAttribute('step', '');
    if (attrs[`step-${i}-label`]) {
      step.setAttribute('step-label', attrs[`step-${i}-label`]);
    }
    if (attrs[`step-${i}-validate`]) {
      step.setAttribute('step-validate', attrs[`step-${i}-validate`]);
    }
    if (attrs[`step-${i}-html`]) {
      step.innerHTML = attrs[`step-${i}-html`];
    }
    step.textContent = step.textContent || `Step ${i + 1} content`;
    el.appendChild(step);
  }

  parent.appendChild(el);
  document.body.appendChild(parent);
  NoJS.processTree(parent);
  return { parent, el, ctx: parent.__ctx };
}

// =======================================================================
//  STEPPER DIRECTIVE TESTS
// =======================================================================

describe('Stepper Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-stepper]').forEach(s => s.remove());
  });

  test('1 -- sets role=group and aria-label on container', () => {
    const { el } = setupStepper(2);
    expect(el.getAttribute('role')).toBe('group');
    expect(el.getAttribute('aria-label')).toBe('Stepper');
  });

  test('2 -- custom aria-label on container', () => {
    const { el } = setupStepper(2, { 'aria-label': 'Checkout' });
    expect(el.getAttribute('aria-label')).toBe('Checkout');
  });
});

// =======================================================================
//  STEP DIRECTIVE TESTS
// =======================================================================

describe('Step Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-stepper]').forEach(s => s.remove());
  });

  test('3 -- sets role=tabpanel on each step', () => {
    const { el } = setupStepper(3);
    const steps = el.querySelectorAll('[step]');
    steps.forEach(step => {
      expect(step.getAttribute('role')).toBe('tabpanel');
    });
  });
});

// =======================================================================
//  PROGRESS INDICATOR TESTS
// =======================================================================

describe('Stepper Progress Indicator', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-stepper]').forEach(s => s.remove());
  });

  test('4 -- indicator has correct structure and roles', () => {
    const { el } = setupStepper(3);
    const indicator = el.querySelector('.nojs-stepper-indicator');
    expect(indicator).not.toBeNull();
    expect(indicator.getAttribute('role')).toBe('tablist');

    const items = indicator.querySelectorAll('.nojs-stepper-indicator-item');
    expect(items.length).toBe(3);
    items.forEach(item => {
      expect(item.getAttribute('role')).toBe('tab');
    });
  });

  test('5 -- first indicator item has aria-selected=true', () => {
    const { el } = setupStepper(3);
    const items = el.querySelectorAll('.nojs-stepper-indicator-item');
    expect(items[0].getAttribute('aria-selected')).toBe('true');
    expect(items[1].getAttribute('aria-selected')).toBe('false');
    expect(items[2].getAttribute('aria-selected')).toBe('false');
  });

  test('6 -- uses step-label attribute for indicator text', () => {
    const { el } = setupStepper(2, {
      'step-0-label': 'Account',
      'step-1-label': 'Payment',
    });
    const items = el.querySelectorAll('.nojs-stepper-indicator-item');
    expect(items[0].textContent).toContain('Account');
    expect(items[1].textContent).toContain('Payment');
  });

  test('7 -- generates separators between indicator items', () => {
    const { el } = setupStepper(3);
    const separators = el.querySelectorAll('.nojs-stepper-separator');
    expect(separators.length).toBe(2); // 3 steps = 2 separators
    separators.forEach(sep => {
      expect(sep.getAttribute('aria-hidden')).toBe('true');
    });
  });

  test('8 -- stepper-indicator=false hides indicator', () => {
    const { el } = setupStepper(2, { 'stepper-indicator': 'false' });
    const indicator = el.querySelector('.nojs-stepper-indicator');
    expect(indicator).toBeNull();
  });
});

// =======================================================================
//  STEP VISIBILITY TESTS
// =======================================================================

describe('Step Visibility', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-stepper]').forEach(s => s.remove());
  });

  test('9 -- only active step visible after navigation, others hidden/inert', () => {
    const { el, ctx } = setupStepper(3);
    const steps = el.querySelectorAll('[step]');

    // Navigate to step 1 and back to 0 to trigger _updateView after init
    ctx.$stepper.next();
    ctx.$stepper.prev();

    // First step active
    expect(steps[0].getAttribute('aria-hidden')).toBe('false');
    expect(steps[0].hasAttribute('inert')).toBe(false);

    // Others hidden
    expect(steps[1].getAttribute('aria-hidden')).toBe('true');
    expect(steps[1].hasAttribute('inert')).toBe(true);
    expect(steps[2].getAttribute('aria-hidden')).toBe('true');
    expect(steps[2].hasAttribute('inert')).toBe(true);
  });

  test('10 -- initial step tracked via stepper expression value', () => {
    const { el, ctx } = setupStepper(3, { stepper: '1' });

    // The $stepper API correctly tracks the initial step
    expect(ctx.$stepper.current).toBe(1);

    // Navigate forward then back to verify visibility after _updateView
    ctx.$stepper.next();
    ctx.$stepper.prev();

    const steps = el.querySelectorAll('[step]');
    expect(steps[0].getAttribute('aria-hidden')).toBe('true');
    expect(steps[1].getAttribute('aria-hidden')).toBe('false');
    expect(steps[2].getAttribute('aria-hidden')).toBe('true');
  });

  test('11 -- clamps initial step to valid range', () => {
    const { ctx } = setupStepper(3, { stepper: '99' });

    // Should clamp to last step (index 2)
    expect(ctx.$stepper.current).toBe(2);
    expect(ctx.$stepper.isLast).toBe(true);
  });
});

// =======================================================================
//  NAVIGATION API TESTS
// =======================================================================

describe('Stepper Navigation API ($stepper)', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-stepper]').forEach(s => s.remove());
  });

  test('12 -- $stepper.next() advances to next step', () => {
    const { el, ctx } = setupStepper(3);
    const steps = el.querySelectorAll('[step]');

    const result = ctx.$stepper.next();
    expect(result).toBe(true);
    expect(ctx.$stepper.current).toBe(1);

    expect(steps[0].getAttribute('aria-hidden')).toBe('true');
    expect(steps[1].getAttribute('aria-hidden')).toBe('false');
    expect(steps[2].getAttribute('aria-hidden')).toBe('true');
  });

  test('13 -- $stepper.next() returns false at last step', () => {
    const { ctx } = setupStepper(2);
    ctx.$stepper.next(); // go to step 1 (last)
    const result = ctx.$stepper.next();
    expect(result).toBe(false);
    expect(ctx.$stepper.current).toBe(1);
  });

  test('14 -- $stepper.prev() goes to previous step', () => {
    const { ctx } = setupStepper(3);
    ctx.$stepper.next(); // step 1
    const result = ctx.$stepper.prev();
    expect(result).toBe(true);
    expect(ctx.$stepper.current).toBe(0);
  });

  test('15 -- $stepper.prev() returns false at first step', () => {
    const { ctx } = setupStepper(3);
    const result = ctx.$stepper.prev();
    expect(result).toBe(false);
    expect(ctx.$stepper.current).toBe(0);
  });

  test('16 -- $stepper.goTo(index) jumps to specific step', () => {
    const { el, ctx } = setupStepper(4, { 'stepper-mode': 'free' });
    const steps = el.querySelectorAll('[step]');

    const result = ctx.$stepper.goTo(2);
    expect(result).toBe(true);
    expect(ctx.$stepper.current).toBe(2);

    expect(steps[0].getAttribute('aria-hidden')).toBe('true');
    expect(steps[2].getAttribute('aria-hidden')).toBe('false');
  });

  test('17 -- $stepper.goTo() out of range returns false', () => {
    const { ctx } = setupStepper(3, { 'stepper-mode': 'free' });
    expect(ctx.$stepper.goTo(-1)).toBe(false);
    expect(ctx.$stepper.goTo(5)).toBe(false);
    expect(ctx.$stepper.current).toBe(0);
  });

  test('18 -- $stepper.isFirst and isLast update after navigation', () => {
    const { ctx } = setupStepper(3);
    expect(ctx.$stepper.isFirst).toBe(true);
    expect(ctx.$stepper.isLast).toBe(false);

    ctx.$stepper.next();
    expect(ctx.$stepper.isFirst).toBe(false);
    expect(ctx.$stepper.isLast).toBe(false);

    ctx.$stepper.next();
    expect(ctx.$stepper.isFirst).toBe(false);
    expect(ctx.$stepper.isLast).toBe(true);
  });
});

// =======================================================================
//  nojs:stepper-change EVENT TESTS
// =======================================================================

describe('Stepper nojs:stepper-change Event', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-stepper]').forEach(s => s.remove());
  });

  test('19 -- dispatches nojs:stepper-change on initial render', () => {
    const parent = document.createElement('div');
    parent.setAttribute('state', '{}');
    const el = document.createElement('div');
    el.setAttribute('stepper', '');

    for (let i = 0; i < 2; i++) {
      const step = document.createElement('div');
      step.setAttribute('step', '');
      step.textContent = `Step ${i + 1}`;
      el.appendChild(step);
    }
    parent.appendChild(el);

    let detail = null;
    el.addEventListener('nojs:stepper-change', (e) => { detail = e.detail; });

    document.body.appendChild(parent);
    NoJS.processTree(parent);

    expect(detail).not.toBeNull();
    expect(detail.current).toBe(0);
    expect(detail.total).toBe(2);
  });

  test('20 -- dispatches nojs:stepper-change on next()', () => {
    const { el, ctx } = setupStepper(3);
    let detail = null;
    el.addEventListener('nojs:stepper-change', (e) => { detail = e.detail; });

    ctx.$stepper.next();
    expect(detail).not.toBeNull();
    expect(detail.current).toBe(1);
    expect(detail.total).toBe(3);
  });

  test('21 -- dispatches nojs:stepper-change on prev()', () => {
    const { el, ctx } = setupStepper(3);
    ctx.$stepper.next();

    let detail = null;
    el.addEventListener('nojs:stepper-change', (e) => { detail = e.detail; });

    ctx.$stepper.prev();
    expect(detail).not.toBeNull();
    expect(detail.current).toBe(0);
  });

  test('22 -- dispatches nojs:stepper-change on goTo()', () => {
    const { el, ctx } = setupStepper(4, { 'stepper-mode': 'free' });
    let detail = null;
    el.addEventListener('nojs:stepper-change', (e) => { detail = e.detail; });

    ctx.$stepper.goTo(3);
    expect(detail).not.toBeNull();
    expect(detail.current).toBe(3);
    expect(detail.total).toBe(4);
  });
});

// =======================================================================
//  INDICATOR ARIA TESTS
// =======================================================================

describe('Stepper Indicator ARIA', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-stepper]').forEach(s => s.remove());
  });

  test('23 -- active indicator has aria-selected=true', () => {
    const { el, ctx } = setupStepper(3);
    const items = el.querySelectorAll('.nojs-stepper-indicator-item');

    expect(items[0].getAttribute('aria-selected')).toBe('true');

    ctx.$stepper.next();
    expect(items[0].getAttribute('aria-selected')).toBe('false');
    expect(items[1].getAttribute('aria-selected')).toBe('true');
  });

  test('24 -- completed steps have data-completed attribute', () => {
    const { el, ctx } = setupStepper(3);
    const items = el.querySelectorAll('.nojs-stepper-indicator-item');

    ctx.$stepper.next();
    expect(items[0].hasAttribute('data-completed')).toBe(true);
    expect(items[1].hasAttribute('data-completed')).toBe(false);

    ctx.$stepper.next();
    expect(items[0].hasAttribute('data-completed')).toBe(true);
    expect(items[1].hasAttribute('data-completed')).toBe(true);
    expect(items[2].hasAttribute('data-completed')).toBe(false);
  });

  test('25 -- roving tabindex on indicator items', () => {
    const { el, ctx } = setupStepper(3);
    const items = el.querySelectorAll('.nojs-stepper-indicator-item');

    expect(items[0].getAttribute('tabindex')).toBe('0');
    expect(items[1].getAttribute('tabindex')).toBe('-1');
    expect(items[2].getAttribute('tabindex')).toBe('-1');

    ctx.$stepper.next();
    expect(items[0].getAttribute('tabindex')).toBe('-1');
    expect(items[1].getAttribute('tabindex')).toBe('0');
    expect(items[2].getAttribute('tabindex')).toBe('-1');
  });
});

// =======================================================================
//  LINEAR MODE TESTS
// =======================================================================

describe('Stepper Linear Mode', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-stepper]').forEach(s => s.remove());
  });

  test('26 -- linear mode blocks next() if step-validate fails', () => {
    const { ctx } = setupStepper(3, {
      state: '{ valid: false }',
      'step-0-validate': 'valid',
    });

    const result = ctx.$stepper.next();
    expect(result).toBe(false);
    expect(ctx.$stepper.current).toBe(0);
  });

  test('27 -- linear mode allows next() if step-validate passes', () => {
    const { ctx } = setupStepper(3, {
      state: '{ valid: true }',
      'step-0-validate': 'valid',
    });

    const result = ctx.$stepper.next();
    expect(result).toBe(true);
    expect(ctx.$stepper.current).toBe(1);
  });

  test('28 -- linear mode goTo() validates all intermediate steps', () => {
    const { ctx } = setupStepper(4, {
      state: '{ valid: false }',
      'step-0-validate': 'valid',
    });

    const result = ctx.$stepper.goTo(3);
    expect(result).toBe(false);
    expect(ctx.$stepper.current).toBe(0);
  });

  test('29 -- linear mode prev() does not require validation', () => {
    const { ctx } = setupStepper(3, {
      state: '{ valid: true }',
      'step-0-validate': 'valid',
    });

    ctx.$stepper.next(); // go to step 1
    expect(ctx.$stepper.current).toBe(1);

    const result = ctx.$stepper.prev();
    expect(result).toBe(true);
    expect(ctx.$stepper.current).toBe(0);
  });

  test('30 -- linear mode indicator items NOT clickable', () => {
    const { el } = setupStepper(3);
    const items = el.querySelectorAll('.nojs-stepper-indicator-item');
    items.forEach(item => {
      expect(item.hasAttribute('data-clickable')).toBe(false);
    });
  });
});

// =======================================================================
//  FREE MODE TESTS
// =======================================================================

describe('Stepper Free Mode', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-stepper]').forEach(s => s.remove());
  });

  test('31 -- free mode indicator items are clickable', () => {
    const { el } = setupStepper(3, { 'stepper-mode': 'free' });
    const items = el.querySelectorAll('.nojs-stepper-indicator-item');
    items.forEach(item => {
      expect(item.hasAttribute('data-clickable')).toBe(true);
    });
  });

  test('32 -- clicking indicator item in free mode navigates', () => {
    const { el, ctx } = setupStepper(3, { 'stepper-mode': 'free' });
    const items = el.querySelectorAll('.nojs-stepper-indicator-item');

    items[2].click();
    expect(ctx.$stepper.current).toBe(2);

    items[0].click();
    expect(ctx.$stepper.current).toBe(0);
  });

  test('33 -- free mode goTo() skips validation', () => {
    const { ctx } = setupStepper(3, {
      'stepper-mode': 'free',
      state: '{ valid: false }',
      'step-0-validate': 'valid',
    });

    const result = ctx.$stepper.goTo(2);
    expect(result).toBe(true);
    expect(ctx.$stepper.current).toBe(2);
  });
});

// =======================================================================
//  NAVIGATION BUTTONS TESTS
// =======================================================================

describe('Stepper Navigation Buttons', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-stepper]').forEach(s => s.remove());
  });

  test('34 -- generates Previous and Next buttons', () => {
    const { el } = setupStepper(3);
    const navEl = el.querySelector('.nojs-stepper-nav');
    expect(navEl).not.toBeNull();
    const prevBtn = navEl.querySelector('.nojs-stepper-prev');
    const nextBtn = navEl.querySelector('.nojs-stepper-next');
    expect(prevBtn).not.toBeNull();
    expect(nextBtn).not.toBeNull();
    expect(prevBtn.textContent).toBe('Previous');
    expect(nextBtn.textContent).toBe('Next');
  });

  test('35 -- Previous button disabled on first step', () => {
    const { el } = setupStepper(3);
    const prevBtn = el.querySelector('.nojs-stepper-prev');
    expect(prevBtn.disabled).toBe(true);
  });

  test('36 -- Next button text changes to Finish on last step', () => {
    const { el, ctx } = setupStepper(2);
    const nextBtn = el.querySelector('.nojs-stepper-next');
    expect(nextBtn.textContent).toBe('Next');

    ctx.$stepper.next();
    expect(nextBtn.textContent).toBe('Finish');
  });

  test('37 -- clicking Next button advances step', () => {
    const { el, ctx } = setupStepper(3);
    const nextBtn = el.querySelector('.nojs-stepper-next');
    nextBtn.click();
    expect(ctx.$stepper.current).toBe(1);
  });

  test('38 -- clicking Previous button goes back', () => {
    const { el, ctx } = setupStepper(3);
    ctx.$stepper.next();
    const prevBtn = el.querySelector('.nojs-stepper-prev');
    prevBtn.click();
    expect(ctx.$stepper.current).toBe(0);
  });

  test('39 -- stepper-nav=false hides navigation buttons', () => {
    const { el } = setupStepper(3, { 'stepper-nav': 'false' });
    const navEl = el.querySelector('.nojs-stepper-nav');
    expect(navEl).toBeNull();
  });
});

// =======================================================================
//  STYLE INJECTION TESTS
// =======================================================================

describe('Stepper Style Injection', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-stepper]').forEach(s => s.remove());
  });

  test('40 -- injects styles exactly once', () => {
    setupStepper(2);
    const styles = document.querySelectorAll('style[data-nojs-stepper]');
    expect(styles.length).toBe(1);
    expect(styles[0].textContent).toContain('.nojs-stepper-indicator');
    expect(styles[0].textContent).toContain('.nojs-step');

    // Second stepper does not inject again
    setupStepper(2);
    expect(document.querySelectorAll('style[data-nojs-stepper]').length).toBe(1);
  });
});

// =======================================================================
//  CLEANUP TESTS
// =======================================================================

describe('Stepper Cleanup', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-stepper]').forEach(s => s.remove());
  });

  test('41 -- no [step] children does not crash', () => {
    const parent = document.createElement('div');
    parent.setAttribute('state', '{}');
    const el = document.createElement('div');
    el.setAttribute('stepper', '');
    // No [step] children
    parent.appendChild(el);
    document.body.appendChild(parent);

    // Should not throw even with no steps
    expect(() => {
      NoJS.processTree(parent);
    }).not.toThrow();

    // No indicator or nav should be generated
    expect(el.querySelector('.nojs-stepper-indicator')).toBeNull();
    expect(el.querySelector('.nojs-stepper-nav')).toBeNull();
    // $stepper should NOT be on context
    expect(parent.__ctx.$stepper).toBeUndefined();
  });
});
