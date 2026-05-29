// =======================================================================
//  CDN ENTRY (cdn.js) TESTS
//  Covers ELEM-34 finding #27: auto-install must not be a one-shot check.
//  When Elements loads before core (or both async), it should retry and
//  still install once core appears.
// =======================================================================

describe('cdn auto-install', () => {
  let originalNoJS;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetModules();
    originalNoJS = window.NoJS;
    delete window.NoJS;
    delete window.NoJSElements;
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    if (originalNoJS === undefined) delete window.NoJS;
    else window.NoJS = originalNoJS;
    delete window.NoJSElements;
  });

  test('1 -- installs immediately when core is already present', () => {
    const use = jest.fn();
    window.NoJS = { use };

    jest.isolateModules(() => {
      require('../src/cdn.js');
    });

    expect(window.NoJSElements).toBeDefined();
    expect(use).toHaveBeenCalledTimes(1);
    expect(use).toHaveBeenCalledWith(window.NoJSElements);
  });

  test('2 -- defers and installs once core appears later (polling)', () => {
    // Core NOT present at import time.
    jest.isolateModules(() => {
      require('../src/cdn.js');
    });

    expect(window.NoJSElements).toBeDefined();

    // Core arrives after the fact.
    const use = jest.fn();
    window.NoJS = { use };

    // Poll tick installs it.
    jest.advanceTimersByTime(50);
    expect(use).toHaveBeenCalledTimes(1);
    expect(use).toHaveBeenCalledWith(window.NoJSElements);

    // Subsequent ticks must not double-install.
    jest.advanceTimersByTime(500);
    expect(use).toHaveBeenCalledTimes(1);
  });

  test('3 -- stops polling after the bounded number of attempts', () => {
    jest.isolateModules(() => {
      require('../src/cdn.js');
    });

    // Core never appears. Exhaust the poll budget.
    jest.advanceTimersByTime(60_000);

    // Core arrives far too late — polling has already stopped.
    const use = jest.fn();
    window.NoJS = { use };
    jest.advanceTimersByTime(1_000);
    expect(use).not.toHaveBeenCalled();
  });
});
