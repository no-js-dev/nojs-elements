import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { _treeState } from '../src/tree/state.js';

// ─── Install the plugin once before all tests ────────────────────────
beforeAll(() => {
  NoJS.use(NoJSElements);
});

// ─── Helper: build a tree with branches and subtrees ─────────────────
function setupTree(opts = {}) {
  const parent = document.createElement('div');
  parent.setAttribute('state', opts.state || '{}');

  const tree = document.createElement('ul');
  tree.setAttribute('tree', '');
  if (opts.treeIcon !== undefined) tree.setAttribute('tree-icon', opts.treeIcon);

  // Branch A — with subtree
  const branchA = document.createElement('li');
  branchA.setAttribute('branch', opts.branchAExpr || '');
  branchA.textContent = 'Alpha';

  const subtreeA = document.createElement('ul');
  subtreeA.setAttribute('subtree', '');

  const leafA1 = document.createElement('li');
  leafA1.textContent = 'Alpha-1';
  subtreeA.appendChild(leafA1);

  const leafA2 = document.createElement('li');
  leafA2.textContent = 'Alpha-2';
  subtreeA.appendChild(leafA2);

  branchA.appendChild(subtreeA);
  tree.appendChild(branchA);

  // Branch B — with subtree
  const branchB = document.createElement('li');
  branchB.setAttribute('branch', '');
  branchB.textContent = 'Beta';

  const subtreeB = document.createElement('ul');
  subtreeB.setAttribute('subtree', '');

  const leafB1 = document.createElement('li');
  leafB1.textContent = 'Beta-1';
  subtreeB.appendChild(leafB1);

  branchB.appendChild(subtreeB);
  tree.appendChild(branchB);

  // Branch C — no subtree (leaf)
  const branchC = document.createElement('li');
  branchC.setAttribute('branch', '');
  branchC.textContent = 'Charlie';
  tree.appendChild(branchC);

  parent.appendChild(tree);
  document.body.appendChild(parent);
  NoJS.processTree(parent);

  return { parent, tree, branchA, subtreeA, leafA1, leafA2, branchB, subtreeB, leafB1, branchC };
}

// ─── Helper: flush microtasks for queueMicrotask in branch init ──────
async function flushMicrotasks() {
  await new Promise(resolve => setTimeout(resolve, 0));
}

// =======================================================================
//  TREE DIRECTIVE TESTS
// =======================================================================

describe('Tree Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tree]').forEach(s => s.remove());
  });

  test('1 — sets role="tree" on container', async () => {
    const { tree } = setupTree();
    await flushMicrotasks();
    expect(tree.getAttribute('role')).toBe('tree');
  });

  test('2 — tree-icon="false" sets data-tree-icon attribute', async () => {
    const { tree } = setupTree({ treeIcon: 'false' });
    await flushMicrotasks();
    expect(tree.getAttribute('data-tree-icon')).toBe('false');
  });
});

// =======================================================================
//  BRANCH DIRECTIVE TESTS
// =======================================================================

describe('Branch Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tree]').forEach(s => s.remove());
  });

  test('3 — sets role="treeitem" on branch elements', async () => {
    const { branchA, branchB, branchC } = setupTree();
    await flushMicrotasks();
    expect(branchA.getAttribute('role')).toBe('treeitem');
    expect(branchB.getAttribute('role')).toBe('treeitem');
    expect(branchC.getAttribute('role')).toBe('treeitem');
  });

  test('4 — sets aria-expanded="false" by default on branches', async () => {
    const { branchA, branchB } = setupTree();
    await flushMicrotasks();
    expect(branchA.getAttribute('aria-expanded')).toBe('false');
    expect(branchB.getAttribute('aria-expanded')).toBe('false');
  });

  test('5 — branch="expanded" starts expanded', async () => {
    const { branchA } = setupTree({ branchAExpr: 'expanded' });
    await flushMicrotasks();
    expect(branchA.getAttribute('aria-expanded')).toBe('true');
  });

  test('6 — first branch has tabindex="0" (roving tabindex)', async () => {
    const { branchA, branchB, branchC } = setupTree();
    await flushMicrotasks();
    expect(branchA.getAttribute('tabindex')).toBe('0');
    expect(branchB.getAttribute('tabindex')).toBe('-1');
    expect(branchC.getAttribute('tabindex')).toBe('-1');
  });
});

// =======================================================================
//  SUBTREE DIRECTIVE TESTS
// =======================================================================

describe('Subtree Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tree]').forEach(s => s.remove());
  });

  test('7 — sets role="group" on subtree', async () => {
    const { subtreeA, subtreeB } = setupTree();
    await flushMicrotasks();
    expect(subtreeA.getAttribute('role')).toBe('group');
    expect(subtreeB.getAttribute('role')).toBe('group');
  });

  test('8 — subtree is hidden when branch is collapsed', async () => {
    const { subtreeA } = setupTree();
    await flushMicrotasks();
    expect(subtreeA.getAttribute('aria-hidden')).toBe('true');
  });

  test('9 — subtree is visible when branch starts expanded', async () => {
    const { subtreeA } = setupTree({ branchAExpr: 'expanded' });
    await flushMicrotasks();
    expect(subtreeA.getAttribute('aria-hidden')).toBe('false');
  });
});

// =======================================================================
//  CLICK INTERACTION TESTS
// =======================================================================

describe('Tree Click Interaction', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tree]').forEach(s => s.remove());
  });

  test('10 — clicking branch toggles subtree visibility', async () => {
    const { branchA, subtreeA } = setupTree();
    await flushMicrotasks();

    expect(branchA.getAttribute('aria-expanded')).toBe('false');
    expect(subtreeA.getAttribute('aria-hidden')).toBe('true');

    // Click to expand
    branchA.click();
    expect(branchA.getAttribute('aria-expanded')).toBe('true');
    expect(subtreeA.getAttribute('aria-hidden')).toBe('false');

    // Click to collapse
    branchA.click();
    expect(branchA.getAttribute('aria-expanded')).toBe('false');
    expect(subtreeA.getAttribute('aria-hidden')).toBe('true');
  });

  test('11 — clicking branch without subtree does not throw', async () => {
    const { branchC } = setupTree();
    await flushMicrotasks();

    expect(() => {
      branchC.click();
    }).not.toThrow();
  });
});

// =======================================================================
//  KEYBOARD NAVIGATION TESTS
// =======================================================================

describe('Tree Keyboard Navigation', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tree]').forEach(s => s.remove());
  });

  test('12 — ArrowRight expands collapsed branch', async () => {
    const { branchA, subtreeA } = setupTree();
    await flushMicrotasks();

    expect(branchA.getAttribute('aria-expanded')).toBe('false');

    branchA.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(branchA.getAttribute('aria-expanded')).toBe('true');
    expect(subtreeA.getAttribute('aria-hidden')).toBe('false');
  });

  test('13 — ArrowRight on expanded branch focuses first child', async () => {
    const { branchA, leafA1 } = setupTree({ branchAExpr: 'expanded' });
    await flushMicrotasks();

    const focusSpy = jest.spyOn(leafA1, 'focus');
    branchA.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  test('14 — ArrowLeft collapses expanded branch', async () => {
    const { branchA, subtreeA } = setupTree({ branchAExpr: 'expanded' });
    await flushMicrotasks();

    expect(branchA.getAttribute('aria-expanded')).toBe('true');
    branchA.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(branchA.getAttribute('aria-expanded')).toBe('false');
    expect(subtreeA.getAttribute('aria-hidden')).toBe('true');
  });

  test('15 — ArrowLeft on child focuses parent branch', async () => {
    const { branchA, leafA1 } = setupTree({ branchAExpr: 'expanded' });
    await flushMicrotasks();

    const focusSpy = jest.spyOn(branchA, 'focus');
    leafA1.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  test('16 — ArrowDown moves to next visible item', async () => {
    const { branchA, branchB } = setupTree();
    await flushMicrotasks();

    const focusSpy = jest.spyOn(branchB, 'focus');
    branchA.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  test('17 — ArrowUp moves to previous visible item', async () => {
    const { branchA, branchB } = setupTree();
    await flushMicrotasks();

    const focusSpy = jest.spyOn(branchA, 'focus');
    branchB.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  test('18 — Space toggles branch expansion', async () => {
    const { branchA, subtreeA } = setupTree();
    await flushMicrotasks();

    branchA.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(branchA.getAttribute('aria-expanded')).toBe('true');
    expect(subtreeA.getAttribute('aria-hidden')).toBe('false');
  });

  test('19 — Home key focuses first visible item', async () => {
    const { branchA, branchC } = setupTree();
    await flushMicrotasks();

    const focusSpy = jest.spyOn(branchA, 'focus');
    branchC.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  test('20 — End key focuses last visible item', async () => {
    const { branchA, branchC } = setupTree();
    await flushMicrotasks();

    const focusSpy = jest.spyOn(branchC, 'focus');
    branchA.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });
});

// =======================================================================
//  TYPEAHEAD TESTS
// =======================================================================

describe('Tree Typeahead', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tree]').forEach(s => s.remove());
    _treeState.typeahead = '';
    if (_treeState.typeaheadTimer) {
      clearTimeout(_treeState.typeaheadTimer);
      _treeState.typeaheadTimer = null;
    }
  });

  test('21 — typing character focuses matching branch', async () => {
    const { branchA, branchB } = setupTree();
    await flushMicrotasks();

    // Type "b" to jump to Beta
    const focusSpy = jest.spyOn(branchB, 'focus');
    branchA.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', bubbles: true }));
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  test('22 — typeahead accumulates characters', async () => {
    const { branchA } = setupTree();
    await flushMicrotasks();

    branchA.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', bubbles: true }));
    expect(_treeState.typeahead).toBe('c');

    branchA.dispatchEvent(new KeyboardEvent('keydown', { key: 'h', bubbles: true }));
    expect(_treeState.typeahead).toBe('ch');
  });

  test('23 — typeahead resets after timeout', async () => {
    const { branchA } = setupTree();
    await flushMicrotasks();

    // Switch to fake timers AFTER microtasks resolved
    jest.useFakeTimers();

    branchA.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
    expect(_treeState.typeahead).toBe('a');

    jest.advanceTimersByTime(600);
    expect(_treeState.typeahead).toBe('');

    jest.useRealTimers();
  });

  test('24 — typeahead ignores ctrl/alt/meta key combos', async () => {
    const { branchA } = setupTree();
    await flushMicrotasks();

    branchA.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', ctrlKey: true, bubbles: true }));
    expect(_treeState.typeahead).toBe('');

    branchA.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', altKey: true, bubbles: true }));
    expect(_treeState.typeahead).toBe('');

    branchA.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', metaKey: true, bubbles: true }));
    expect(_treeState.typeahead).toBe('');
  });
});

// =======================================================================
//  STYLE INJECTION TESTS
// =======================================================================

describe('Tree Style Injection', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tree]').forEach(s => s.remove());
  });

  test('25 — injects styles exactly once', async () => {
    setupTree();
    await flushMicrotasks();

    const styles = document.querySelectorAll('style[data-nojs-tree]');
    expect(styles.length).toBe(1);
    expect(styles[0].textContent).toContain('.nojs-tree');
    expect(styles[0].textContent).toContain('.nojs-branch');
    expect(styles[0].textContent).toContain('.nojs-subtree');

    // Setup another tree — should not inject again
    const tree2 = document.createElement('ul');
    tree2.setAttribute('tree', '');
    document.body.appendChild(tree2);
    NoJS.processTree(tree2);
    await flushMicrotasks();

    expect(document.querySelectorAll('style[data-nojs-tree]').length).toBe(1);
  });
});


// =======================================================================
//  LEAF NODE INTERACTION TESTS
// =======================================================================

describe('Tree Leaf Nodes Interaction', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tree]').forEach(s => s.remove());
  });

  test('27 — clicking leaf node selects it', async () => {
    const { leafA1 } = setupTree({ branchAExpr: 'expanded' });
    await flushMicrotasks();

    expect(leafA1.classList.contains('nojs-branch-selected')).toBe(false);
    expect(leafA1.getAttribute('aria-selected')).not.toBe('true');

    leafA1.click();
    expect(leafA1.classList.contains('nojs-branch-selected')).toBe(true);
    expect(leafA1.getAttribute('aria-selected')).toBe('true');
  });

  test('28 — ArrowDown on leaf node moves focus to next visible item', async () => {
    const { leafA1, leafA2 } = setupTree({ branchAExpr: 'expanded' });
    await flushMicrotasks();

    const focusSpy = jest.spyOn(leafA2, 'focus');
    leafA1.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  test('29 — ArrowUp on leaf node moves focus to previous visible item', async () => {
    const { branchA, leafA1 } = setupTree({ branchAExpr: 'expanded' });
    await flushMicrotasks();

    const focusSpy = jest.spyOn(branchA, 'focus');
    leafA1.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });
});

// =======================================================================
//  CLEANUP TESTS
// =======================================================================

describe('Tree Cleanup', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-tree]').forEach(s => s.remove());
  });

  test('26 — ArrowUp at first visible item does not throw', async () => {
    const { branchA } = setupTree();
    await flushMicrotasks();

    expect(() => {
      branchA.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    }).not.toThrow();
  });
});
