import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';

// =======================================================================
//  PLUGIN ENTRY (index.js) TESTS
//  Covers ELEM-34 finding #1: plugin exposes an `init` hook so late
//  installation (after core already walked the DOM) still applies
//  Elements directives to the existing tree.
// =======================================================================

describe('NoJSElements plugin shape', () => {
  test('1 -- exposes name, install, dispose and init hooks', () => {
    expect(NoJSElements.name).toBe('nojs-elements');
    expect(typeof NoJSElements.install).toBe('function');
    expect(typeof NoJSElements.dispose).toBe('function');
    expect(typeof NoJSElements.init).toBe('function');
  });
});

describe('NoJSElements late-install init hook', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-skeleton]').forEach((s) => s.remove());
  });

  test('2 -- re-processes existing DOM that core marked declared before install', () => {
    // Simulate core having already walked an element bearing an Elements
    // directive: it would be marked `__declared` with no directive having run.
    const parent = document.createElement('div');
    parent.setAttribute('state', '{ loading: true }');
    const el = document.createElement('div');
    el.setAttribute('skeleton', 'loading');
    parent.appendChild(el);
    document.body.appendChild(parent);

    // Core walk: marks declared, nothing matched (Elements not yet installed).
    NoJS.processTree(parent);
    expect(el.__declared).toBe(true);
    expect(el.classList.contains('nojs-skeleton')).toBe(false);

    // Install Elements and run its init hook (what core calls post-init).
    NoJSElements.install(NoJS);
    NoJSElements.init(NoJS);

    // The skeleton directive should now have applied to the existing element.
    expect(el.classList.contains('nojs-skeleton')).toBe(true);
    expect(el.getAttribute('aria-busy')).toBe('true');
  });

  test('3 -- init is a no-op safe call when document.body has no Elements directives', () => {
    const div = document.createElement('div');
    div.textContent = 'plain';
    document.body.appendChild(div);
    expect(() => NoJSElements.init(NoJS)).not.toThrow();
  });
});
