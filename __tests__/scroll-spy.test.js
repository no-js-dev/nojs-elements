import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _spyGroups, _spyElements } from '../src/scroll-spy/state.js';

// ─── Mock IntersectionObserver (jsdom does not provide it) ───────────
class MockIntersectionObserver {
  constructor(callback, options) {
    this._callback = callback;
    this._options = options;
    this._observing = new Set();
    MockIntersectionObserver._instances.push(this);
  }
  observe(el) { this._observing.add(el); }
  unobserve(el) { this._observing.delete(el); }
  disconnect() { this._observing.clear(); }
  _trigger(entries) { this._callback(entries, this); }
  static _instances = [];
  static _reset() { MockIntersectionObserver._instances = []; }
}

beforeAll(() => {
  global.IntersectionObserver = MockIntersectionObserver;
  NoJS.use(NoJSElements);
});

afterAll(() => {
  delete global.IntersectionObserver;
});

// ─── Helper: create a spy element and its target section ─────────────
function setupSpyLink(opts = {}) {
  const parent = document.createElement('div');
  parent.setAttribute('state', opts.state || '{}');

  // Create target sections
  const sections = [];
  const ids = opts.sectionIds || ['section-1'];
  for (const id of ids) {
    const section = document.createElement('section');
    section.id = id;
    section.textContent = `Content of ${id}`;
    document.body.appendChild(section);
    sections.push(section);
  }

  // Create spy elements
  const spies = [];
  for (const id of ids) {
    let spy;
    if (opts.useButton) {
      spy = document.createElement('button');
      spy.setAttribute('spy', `#${id}`);
      spy.textContent = id;
    } else {
      spy = document.createElement('a');
      spy.setAttribute('href', `#${id}`);
      spy.textContent = id;
      // The spy directive is matched by the 'spy' attr on non-<a> elements,
      // but <a> elements get it from the parent container's directive processing.
      // For <a> elements, we explicitly add the spy attr to trigger the directive.
      spy.setAttribute('spy', '');
    }

    if (opts.offset) spy.setAttribute('spy-offset', opts.offset);
    if (opts.threshold) spy.setAttribute('spy-threshold', opts.threshold);

    parent.appendChild(spy);
    spies.push(spy);
  }

  document.body.appendChild(parent);
  NoJS.processTree(parent);

  return { parent, spies, sections };
}

// =======================================================================
//  SCROLL SPY DIRECTIVE TESTS
// =======================================================================

describe('Scroll Spy Directive', () => {
  beforeEach(() => {
    MockIntersectionObserver._reset();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-scroll-spy]').forEach(s => s.remove());
    // Clean up state
    for (const [root, group] of _spyGroups) {
      if (group.observer) group.observer.disconnect();
      if (group.mutObserver) group.mutObserver.disconnect();
    }
    _spyGroups.clear();
    _spyElements.clear();
    MockIntersectionObserver._reset();
  });

  // ─── Target resolution ────────────────────────────────────────────

  test('1 — <a href="#section"> resolves target from href', () => {
    const { spies } = setupSpyLink({ sectionIds: ['section-1'] });
    expect(_spyElements.has(spies[0])).toBe(true);
    const groupRoot = _spyElements.get(spies[0]);
    const group = _spyGroups.get(groupRoot);
    expect(group.spyEntries[0].targetId).toBe('section-1');
  });

  test('2 — <button spy="#section"> resolves target from spy attribute', () => {
    const { spies } = setupSpyLink({ sectionIds: ['section-1'], useButton: true });
    expect(_spyElements.has(spies[0])).toBe(true);
    const groupRoot = _spyElements.get(spies[0]);
    const group = _spyGroups.get(groupRoot);
    expect(group.spyEntries[0].targetId).toBe('section-1');
  });

  test('3 — spy without hash prefix resolves target directly', () => {
    const parent = document.createElement('div');
    parent.setAttribute('state', '{}');

    const section = document.createElement('section');
    section.id = 'no-hash';
    document.body.appendChild(section);

    const btn = document.createElement('button');
    btn.setAttribute('spy', 'no-hash');
    parent.appendChild(btn);
    document.body.appendChild(parent);
    NoJS.processTree(parent);

    expect(_spyElements.has(btn)).toBe(true);
    const groupRoot = _spyElements.get(btn);
    const group = _spyGroups.get(groupRoot);
    expect(group.spyEntries.find(e => e.el === btn).targetId).toBe('no-hash');
  });

  // ─── Active state ─────────────────────────────────────────────────

  test('4 — .active class added when target becomes visible', () => {
    const { spies, sections } = setupSpyLink({ sectionIds: ['section-1'] });

    // Find the IntersectionObserver instance and trigger it
    const observer = MockIntersectionObserver._instances[MockIntersectionObserver._instances.length - 1];
    expect(observer).toBeDefined();

    // Simulate section becoming visible
    observer._trigger([{
      target: sections[0],
      isIntersecting: true,
    }]);

    expect(spies[0].classList.contains('active')).toBe(true);
  });

  test('5 — aria-current="true" set when target is visible', () => {
    const { spies, sections } = setupSpyLink({ sectionIds: ['section-1'] });

    const observer = MockIntersectionObserver._instances[MockIntersectionObserver._instances.length - 1];
    observer._trigger([{
      target: sections[0],
      isIntersecting: true,
    }]);

    expect(spies[0].getAttribute('aria-current')).toBe('true');
  });

  test('6 — .active class removed when target leaves viewport', () => {
    const { spies, sections } = setupSpyLink({ sectionIds: ['section-1'] });

    const observer = MockIntersectionObserver._instances[MockIntersectionObserver._instances.length - 1];

    // First make visible
    observer._trigger([{
      target: sections[0],
      isIntersecting: true,
    }]);
    expect(spies[0].classList.contains('active')).toBe(true);

    // Then make invisible
    observer._trigger([{
      target: sections[0],
      isIntersecting: false,
    }]);
    expect(spies[0].classList.contains('active')).toBe(false);
  });

  test('7 — aria-current removed when target leaves viewport', () => {
    const { spies, sections } = setupSpyLink({ sectionIds: ['section-1'] });

    const observer = MockIntersectionObserver._instances[MockIntersectionObserver._instances.length - 1];
    observer._trigger([{
      target: sections[0],
      isIntersecting: true,
    }]);
    expect(spies[0].getAttribute('aria-current')).toBe('true');

    observer._trigger([{
      target: sections[0],
      isIntersecting: false,
    }]);
    expect(spies[0].hasAttribute('aria-current')).toBe(false);
  });

  // ─── Only one active at a time ────────────────────────────────────

  test('8 — only one spy active at a time (topmost wins)', () => {
    const { spies, sections } = setupSpyLink({
      sectionIds: ['section-1', 'section-2', 'section-3'],
    });

    const observer = MockIntersectionObserver._instances[MockIntersectionObserver._instances.length - 1];

    // Mock getBoundingClientRect for ordering
    sections[0].getBoundingClientRect = () => ({ top: 100 });
    sections[1].getBoundingClientRect = () => ({ top: 200 });
    sections[2].getBoundingClientRect = () => ({ top: 300 });

    // All three visible
    observer._trigger([
      { target: sections[0], isIntersecting: true },
      { target: sections[1], isIntersecting: true },
      { target: sections[2], isIntersecting: true },
    ]);

    // Topmost (section-1) should be active
    expect(spies[0].classList.contains('active')).toBe(true);
    expect(spies[1].classList.contains('active')).toBe(false);
    expect(spies[2].classList.contains('active')).toBe(false);
  });

  test('9 — when topmost leaves, next visible becomes active', () => {
    const { spies, sections } = setupSpyLink({
      sectionIds: ['section-1', 'section-2'],
    });

    const observer = MockIntersectionObserver._instances[MockIntersectionObserver._instances.length - 1];

    sections[0].getBoundingClientRect = () => ({ top: 100 });
    sections[1].getBoundingClientRect = () => ({ top: 200 });

    // Both visible
    observer._trigger([
      { target: sections[0], isIntersecting: true },
      { target: sections[1], isIntersecting: true },
    ]);
    expect(spies[0].classList.contains('active')).toBe(true);

    // First leaves viewport
    observer._trigger([
      { target: sections[0], isIntersecting: false },
    ]);

    // section-2 still visible, should now be active
    sections[1].getBoundingClientRect = () => ({ top: 50 });
    expect(spies[1].classList.contains('active')).toBe(true);
    expect(spies[0].classList.contains('active')).toBe(false);
  });

  // ─── Config: spy-offset and spy-threshold ─────────────────────────

  test('10 — spy-offset is parsed and applied to rootMargin', () => {
    setupSpyLink({ sectionIds: ['section-1'], offset: '100' });

    const observer = MockIntersectionObserver._instances[MockIntersectionObserver._instances.length - 1];
    expect(observer._options.rootMargin).toBe('-100px 0px 0px 0px');
  });

  test('11 — spy-offset defaults to 0 when not specified', () => {
    setupSpyLink({ sectionIds: ['section-1'] });

    const observer = MockIntersectionObserver._instances[MockIntersectionObserver._instances.length - 1];
    expect(observer._options.rootMargin).toBe('-0px 0px 0px 0px');
  });

  test('12 — spy-threshold is parsed and applied to observer', () => {
    setupSpyLink({ sectionIds: ['section-1'], threshold: '0.5' });

    const observer = MockIntersectionObserver._instances[MockIntersectionObserver._instances.length - 1];
    expect(observer._options.threshold).toBe(0.5);
  });

  test('13 — spy-threshold defaults to 0.1 when not specified', () => {
    setupSpyLink({ sectionIds: ['section-1'] });

    const observer = MockIntersectionObserver._instances[MockIntersectionObserver._instances.length - 1];
    expect(observer._options.threshold).toBe(0.1);
  });

  test('14 — spy-threshold clamps invalid values to 0.1', () => {
    setupSpyLink({ sectionIds: ['section-1'], threshold: '2.0' });

    const observer = MockIntersectionObserver._instances[MockIntersectionObserver._instances.length - 1];
    expect(observer._options.threshold).toBe(0.1);
  });

  test('15 — spy-offset with non-numeric value defaults to 0', () => {
    setupSpyLink({ sectionIds: ['section-1'], offset: 'abc' });

    const observer = MockIntersectionObserver._instances[MockIntersectionObserver._instances.length - 1];
    expect(observer._options.rootMargin).toBe('-0px 0px 0px 0px');
  });

  // ─── State registration ───────────────────────────────────────────

  test('16 — spy element is registered in _spyElements', () => {
    const { spies } = setupSpyLink({ sectionIds: ['section-1'] });
    expect(_spyElements.has(spies[0])).toBe(true);
  });

  test('17 — multiple spies share the same group', () => {
    const { spies } = setupSpyLink({ sectionIds: ['section-1', 'section-2'] });
    const root1 = _spyElements.get(spies[0]);
    const root2 = _spyElements.get(spies[1]);
    expect(root1).toBe(root2);

    const group = _spyGroups.get(root1);
    expect(group.spyEntries.length).toBe(2);
  });

  // ─── Cleanup ──────────────────────────────────────────────────────

  test('18 — cleanup disconnects observer and removes state', () => {
    const { spies } = setupSpyLink({ sectionIds: ['section-1'] });
    const groupRoot = _spyElements.get(spies[0]);
    const group = _spyGroups.get(groupRoot);
    const observer = group.observer;
    const disconnectSpy = jest.spyOn(observer, 'disconnect');

    // Trigger disposers
    if (spies[0].__disposers) {
      spies[0].__disposers.forEach(fn => fn());
    }

    expect(_spyElements.has(spies[0])).toBe(false);
    // Group should be removed since it was the only spy
    expect(_spyGroups.has(groupRoot)).toBe(false);
    expect(disconnectSpy).toHaveBeenCalled();
  });

  test('19 — removing one spy from group does not destroy the group', () => {
    const { spies } = setupSpyLink({ sectionIds: ['section-1', 'section-2'] });
    const groupRoot = _spyElements.get(spies[0]);

    // Dispose only the first spy
    if (spies[0].__disposers) {
      spies[0].__disposers.forEach(fn => fn());
    }

    expect(_spyElements.has(spies[0])).toBe(false);
    expect(_spyElements.has(spies[1])).toBe(true);
    // Group still exists
    expect(_spyGroups.has(groupRoot)).toBe(true);
    const group = _spyGroups.get(groupRoot);
    expect(group.spyEntries.length).toBe(1);
  });

  test('20 — cleanup deactivates spy element', () => {
    const { spies, sections } = setupSpyLink({ sectionIds: ['section-1'] });

    // Activate
    const observer = MockIntersectionObserver._instances[MockIntersectionObserver._instances.length - 1];
    observer._trigger([{ target: sections[0], isIntersecting: true }]);
    expect(spies[0].classList.contains('active')).toBe(true);

    // Dispose
    if (spies[0].__disposers) {
      spies[0].__disposers.forEach(fn => fn());
    }

    expect(spies[0].classList.contains('active')).toBe(false);
    expect(spies[0].hasAttribute('aria-current')).toBe(false);
  });

  // ─── Edge cases ───────────────────────────────────────────────────

  test('21 — no active spy when no sections are visible', () => {
    const { spies, sections } = setupSpyLink({
      sectionIds: ['section-1', 'section-2'],
    });

    const observer = MockIntersectionObserver._instances[MockIntersectionObserver._instances.length - 1];

    // All leave viewport
    observer._trigger([
      { target: sections[0], isIntersecting: false },
      { target: sections[1], isIntersecting: false },
    ]);

    expect(spies[0].classList.contains('active')).toBe(false);
    expect(spies[1].classList.contains('active')).toBe(false);
  });

  test('22 — style injection happens only once', () => {
    setupSpyLink({ sectionIds: ['s1'] });
    const before = document.querySelectorAll('style[data-nojs-scroll-spy]').length;

    setupSpyLink({ sectionIds: ['s2'] });
    const after = document.querySelectorAll('style[data-nojs-scroll-spy]').length;

    expect(after).toBe(before);
  });
});
