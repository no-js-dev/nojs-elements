import NoJS from '../../NoJS/src/index.js';
import NoJSElements from '../src/index.js';
import { registerTableReorder } from '../src/table/reorder.js';
import { checkStepValidationGate, touchAllFields, dispatchValidationBlocked } from '../src/stepper/validation.js';

// ─── Install the plugin once before all tests ────────────────────────
beforeAll(() => {
  NoJS.use(NoJSElements);
  // Register table-reorder (not yet wired into table/index.js)
  registerTableReorder(NoJS);
});

// =======================================================================
//  TABLE + DND INTEGRATION
// =======================================================================

describe('Table + DnD: table-reorder directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    jest.useRealTimers();
  });

  function setupReorderTable(opts = {}) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', JSON.stringify(opts.state || { rows: ['A', 'B', 'C'] }));

    const table = document.createElement('table');
    table.setAttribute('table-reorder', '');
    if (opts.handleSel) table.setAttribute('table-reorder-handle', opts.handleSel);
    if (opts.dragClass) table.setAttribute('table-reorder-drag-class', opts.dragClass);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = 'Name';
    headerRow.appendChild(th);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const items = opts.items || ['A', 'B', 'C'];
    for (const item of items) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.textContent = item;
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    wrapper.appendChild(table);
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);

    return { wrapper, table, tbody };
  }

  test('1 - table-reorder registers as a directive (priority 15)', () => {
    const { table, tbody } = setupReorderTable();
    const rows = tbody.querySelectorAll('tr');
    // Rows should be set up as draggable
    expect(rows[0].draggable).toBe(true);
    expect(rows[1].draggable).toBe(true);
    expect(rows[2].draggable).toBe(true);
  });

  test('2 - rows have aria-grabbed=false initially', () => {
    const { tbody } = setupReorderTable();
    const rows = tbody.querySelectorAll('tr');
    for (const row of rows) {
      expect(row.getAttribute('aria-grabbed')).toBe('false');
    }
  });

  test('3 - only applies to TABLE elements', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');
    const div = document.createElement('div');
    div.setAttribute('table-reorder', '');
    wrapper.appendChild(div);
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);

    // Non-table element should not get row setup — no error thrown
    expect(div.draggable).toBeFalsy();
  });

  test('4 - dragstart on row applies drag class', () => {
    const { tbody } = setupReorderTable();
    const row = tbody.querySelectorAll('tr')[0];

    const evt = new Event('dragstart', { bubbles: true });
    evt.dataTransfer = { effectAllowed: '', setData: jest.fn() };
    row.dispatchEvent(evt);

    expect(row.classList.contains('nojs-row-dragging')).toBe(true);
    expect(row.getAttribute('aria-grabbed')).toBe('true');
  });

  test('5 - custom drag class is used', () => {
    const { tbody } = setupReorderTable({ dragClass: 'my-row-drag' });
    const row = tbody.querySelectorAll('tr')[0];

    const evt = new Event('dragstart', { bubbles: true });
    evt.dataTransfer = { effectAllowed: '', setData: jest.fn() };
    row.dispatchEvent(evt);

    expect(row.classList.contains('my-row-drag')).toBe(true);
  });

  test('6 - dragend cleans up drag state', () => {
    const { tbody } = setupReorderTable();
    const row = tbody.querySelectorAll('tr')[0];

    const startEvt = new Event('dragstart', { bubbles: true });
    startEvt.dataTransfer = { effectAllowed: '', setData: jest.fn() };
    row.dispatchEvent(startEvt);
    expect(row.classList.contains('nojs-row-dragging')).toBe(true);

    row.dispatchEvent(new Event('dragend', { bubbles: true }));
    expect(row.classList.contains('nojs-row-dragging')).toBe(false);
    expect(row.getAttribute('aria-grabbed')).toBe('false');
  });

  test('7 - dispatches table:reorder event on drop', () => {
    const { table, tbody } = setupReorderTable({ items: ['A', 'B'] });
    const rows = tbody.querySelectorAll('tr');
    const handler = jest.fn();
    table.addEventListener('table:reorder', handler);

    // Start drag on first row
    const startEvt = new Event('dragstart', { bubbles: true });
    startEvt.dataTransfer = { effectAllowed: '', setData: jest.fn() };
    rows[0].dispatchEvent(startEvt);

    // Drop on second row (simulate mouse below midpoint)
    const dropEvt = new Event('drop', { bubbles: true, cancelable: true });
    dropEvt.clientY = 999; // below midpoint
    dropEvt.dataTransfer = null;
    Object.defineProperty(dropEvt, 'preventDefault', { value: jest.fn() });
    Object.defineProperty(dropEvt, 'stopPropagation', { value: jest.fn() });

    // Mock getBoundingClientRect for the drop target
    rows[1].getBoundingClientRect = () => ({ top: 0, height: 40, bottom: 40, left: 0, width: 100, right: 100 });
    rows[1].dispatchEvent(dropEvt);

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toHaveProperty('from');
    expect(handler.mock.calls[0][0].detail).toHaveProperty('to');
  });

  test('8 - dispose removes event listeners', () => {
    const { table, tbody } = setupReorderTable();
    const row = tbody.querySelectorAll('tr')[0];
    const removeSpy = jest.spyOn(row, 'removeEventListener');

    if (row.__disposers) {
      row.__disposers.forEach(fn => fn());
    }

    const removedEvents = removeSpy.mock.calls.map(c => c[0]);
    expect(removedEvents).toContain('dragstart');
    expect(removedEvents).toContain('dragover');
    expect(removedEvents).toContain('drop');
    expect(removedEvents).toContain('dragend');
    removeSpy.mockRestore();
  });
});

// =======================================================================
//  TREE + DND INTEGRATION
// =======================================================================

describe('Tree + DnD: tree-drag-mode directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    jest.useRealTimers();
  });

  function setupTree(mode = 'both', opts = {}) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', JSON.stringify(opts.state || {}));

    const tree = document.createElement('ul');
    tree.setAttribute('tree', '');
    tree.setAttribute('role', 'tree');
    tree.setAttribute('tree-drag-mode', mode);

    const items = opts.items || ['Node A', 'Node B', 'Node C'];
    for (const label of items) {
      const li = document.createElement('li');
      li.setAttribute('role', 'treeitem');
      li.setAttribute('branch', '');
      li.textContent = label;
      tree.appendChild(li);
    }

    wrapper.appendChild(tree);
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);

    return { wrapper, tree };
  }

  test('9 - tree-drag-mode registers and makes treeitems draggable', () => {
    const { tree } = setupTree('both');
    const items = tree.querySelectorAll('[role="treeitem"]');
    for (const item of items) {
      expect(item.draggable).toBe(true);
    }
  });

  test('10 - mode="reparent" is accepted (no error)', () => {
    expect(() => setupTree('reparent')).not.toThrow();
    const { tree } = setupTree('reparent');
    const items = tree.querySelectorAll('[role="treeitem"]');
    expect(items[0].draggable).toBe(true);
  });

  test('11 - mode="reorder" is accepted', () => {
    expect(() => setupTree('reorder')).not.toThrow();
  });

  test('12 - mode="both" is accepted', () => {
    expect(() => setupTree('both')).not.toThrow();
  });

  test('13 - invalid mode does not make items draggable', () => {
    const { tree } = setupTree('invalid');
    const items = tree.querySelectorAll('[role="treeitem"]');
    // With invalid mode, the directive returns early — items should not be draggable
    for (const item of items) {
      expect(item.draggable).toBeFalsy();
    }
  });

  test('14 - tree-drag-disabled prevents draggability', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');

    const tree = document.createElement('ul');
    tree.setAttribute('tree', '');
    tree.setAttribute('role', 'tree');
    tree.setAttribute('tree-drag-mode', 'both');

    const li = document.createElement('li');
    li.setAttribute('role', 'treeitem');
    li.setAttribute('branch', '');
    li.setAttribute('tree-drag-disabled', '');
    li.textContent = 'Locked Node';
    tree.appendChild(li);

    wrapper.appendChild(tree);
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);

    expect(li.draggable).toBe(false);
  });

  test('15 - dragstart on treeitem dispatches tree:drag-start', () => {
    const { tree } = setupTree('both');
    const item = tree.querySelector('[role="treeitem"]');
    const handler = jest.fn();
    item.addEventListener('tree:drag-start', handler);

    const evt = new Event('dragstart', { bubbles: true });
    evt.dataTransfer = { effectAllowed: '', setData: jest.fn() };
    item.dispatchEvent(evt);

    expect(handler).toHaveBeenCalled();
    expect(item.classList.contains('nojs-dragging')).toBe(true);
  });

  test('16 - dragend on treeitem removes drag class', () => {
    const { tree } = setupTree('both');
    const item = tree.querySelector('[role="treeitem"]');

    const startEvt = new Event('dragstart', { bubbles: true });
    startEvt.dataTransfer = { effectAllowed: '', setData: jest.fn() };
    item.dispatchEvent(startEvt);
    expect(item.classList.contains('nojs-dragging')).toBe(true);

    item.dispatchEvent(new Event('dragend', { bubbles: true }));
    expect(item.classList.contains('nojs-dragging')).toBe(false);
  });

  test('17 - dispose removes all tree-drag event listeners', () => {
    const { tree } = setupTree('both');
    const removeSpy = jest.spyOn(tree, 'removeEventListener');

    if (tree.__disposers) {
      tree.__disposers.forEach(fn => fn());
    }

    const removedEvents = removeSpy.mock.calls.map(c => c[0]);
    expect(removedEvents).toContain('dragstart');
    expect(removedEvents).toContain('dragover');
    expect(removedEvents).toContain('dragenter');
    expect(removedEvents).toContain('dragleave');
    expect(removedEvents).toContain('drop');
    expect(removedEvents).toContain('dragend');
    removeSpy.mockRestore();
  });
});

// =======================================================================
//  STEPPER + VALIDATION INTEGRATION
// =======================================================================

describe('Stepper + Validation: validation gate', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    jest.useRealTimers();
  });

  function setupStepper(opts = {}) {
    jest.useFakeTimers();

    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', JSON.stringify(opts.state || {}));

    const stepper = document.createElement('div');
    stepper.setAttribute('stepper', opts.initialStep || '0');
    if (opts.mode) stepper.setAttribute('stepper-mode', opts.mode);

    // Step 1: form with validation
    const step1 = document.createElement('div');
    step1.setAttribute('step', '');
    step1.setAttribute('step-label', 'Step 1');
    if (opts.stepperValidate !== false) {
      step1.setAttribute('stepper-validate', '');
    }

    const form = document.createElement('form');
    form.setAttribute('validate', '');

    const fields = opts.fields || [
      { name: 'email', type: 'text', validate: 'required', value: '' },
    ];

    for (const fieldDef of fields) {
      const input = document.createElement('input');
      input.name = fieldDef.name;
      input.type = fieldDef.type || 'text';
      if (fieldDef.validate) input.setAttribute('validate', fieldDef.validate);
      if (fieldDef.required) input.required = true;
      if (fieldDef.value !== undefined) input.value = fieldDef.value;
      form.appendChild(input);
    }

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Submit';
    form.appendChild(submitBtn);

    step1.appendChild(form);
    stepper.appendChild(step1);

    // Step 2: simple content
    const step2 = document.createElement('div');
    step2.setAttribute('step', '');
    step2.setAttribute('step-label', 'Step 2');
    step2.textContent = 'Step 2 content';
    stepper.appendChild(step2);

    wrapper.appendChild(stepper);
    document.body.appendChild(wrapper);
    NoJS.processTree(wrapper);
    jest.runAllTimers();

    return { wrapper, stepper, step1, step2, form };
  }

  test('18 - checkStepValidationGate returns false for invalid form', () => {
    const { step1, form } = setupStepper({
      fields: [{ name: 'name', type: 'text', validate: 'required', value: '' }],
    });

    const result = checkStepValidationGate(step1, NoJS.findContext);
    expect(result).toBe(false);
  });

  test('19 - checkStepValidationGate returns true for valid form', () => {
    const { step1 } = setupStepper({
      fields: [{ name: 'name', type: 'text', validate: 'required', value: 'John' }],
    });

    const result = checkStepValidationGate(step1, NoJS.findContext);
    expect(result).toBe(true);
  });

  test('20 - checkStepValidationGate returns true when no stepper-validate attr', () => {
    const { step1 } = setupStepper({ stepperValidate: false });
    const result = checkStepValidationGate(step1, NoJS.findContext);
    expect(result).toBe(true);
  });

  test('21 - checkStepValidationGate returns true when no form in step', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('state', '{}');
    const step = document.createElement('div');
    step.setAttribute('step', '');
    step.setAttribute('stepper-validate', '');
    step.textContent = 'No form here';
    wrapper.appendChild(step);
    document.body.appendChild(wrapper);

    const result = checkStepValidationGate(step, NoJS.findContext);
    expect(result).toBe(true);
  });

  test('22 - forward navigation is blocked when form is invalid (linear mode)', () => {
    const { stepper } = setupStepper({
      mode: 'linear',
      fields: [{ name: 'email', type: 'text', validate: 'required', value: '' }],
    });

    const ctx = NoJS.findContext(stepper);
    const $stepper = ctx.$stepper;
    expect($stepper.current).toBe(0);

    // Attempt to go forward
    const advanced = $stepper.next();
    expect(advanced).toBe(false);
    expect($stepper.current).toBe(0);
  });

  test('23 - forward navigation succeeds when form is valid', () => {
    const { stepper } = setupStepper({
      mode: 'linear',
      fields: [{ name: 'email', type: 'text', validate: 'required', value: 'test@example.com' }],
    });

    const ctx = NoJS.findContext(stepper);
    const $stepper = ctx.$stepper;
    expect($stepper.current).toBe(0);

    const advanced = $stepper.next();
    jest.runAllTimers();
    expect(advanced).toBe(true);
    expect($stepper.current).toBe(1);
  });

  test('24 - backward navigation is never blocked', () => {
    const { stepper } = setupStepper({
      mode: 'linear',
      fields: [{ name: 'email', type: 'text', validate: 'required', value: 'test@test.com' }],
    });

    const ctx = NoJS.findContext(stepper);
    const $stepper = ctx.$stepper;

    // Go forward first (valid form)
    $stepper.next();
    jest.runAllTimers();
    expect($stepper.current).toBe(1);

    // Go backward — should always work regardless of validation
    const wentBack = $stepper.prev();
    jest.runAllTimers();
    expect(wentBack).toBe(true);
    expect($stepper.current).toBe(0);
  });

  test('25 - stepper:validation-blocked event is dispatched', () => {
    const { stepper, step1, form } = setupStepper({
      mode: 'linear',
      fields: [{ name: 'name', type: 'text', validate: 'required', value: '' }],
    });

    const handler = jest.fn();
    stepper.addEventListener('stepper:validation-blocked', handler);

    const ctx = NoJS.findContext(stepper);
    ctx.$stepper.next();
    jest.runAllTimers();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail.step).toBe(step1);
    expect(handler.mock.calls[0][0].detail.form).toBe(form);
  });

  test('26 - touchAllFields dispatches focusout on all fields', () => {
    const { form } = setupStepper({
      fields: [
        { name: 'a', type: 'text', value: '' },
        { name: 'b', type: 'text', value: '' },
      ],
    });

    const inputs = form.querySelectorAll('input');
    const spies = [...inputs].map(input => {
      const spy = jest.fn();
      input.addEventListener('focusout', spy);
      return spy;
    });

    touchAllFields(form);

    for (const spy of spies) {
      expect(spy).toHaveBeenCalled();
    }
  });

  test('27 - dispatchValidationBlocked fires custom event', () => {
    const stepperEl = document.createElement('div');
    const stepEl = document.createElement('div');
    const formEl = document.createElement('form');

    const handler = jest.fn();
    stepperEl.addEventListener('stepper:validation-blocked', handler);

    dispatchValidationBlocked(stepperEl, stepEl, formEl);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail.step).toBe(stepEl);
    expect(handler.mock.calls[0][0].detail.form).toBe(formEl);
  });

  test('28 - validation gate touches fields so errors become visible', () => {
    const { stepper, form } = setupStepper({
      mode: 'linear',
      fields: [{ name: 'name', type: 'text', validate: 'required', value: '' }],
    });

    const ctx = NoJS.findContext(stepper);
    ctx.$stepper.next(); // blocked
    jest.runAllTimers();

    // After the gate blocks, $form should show the error because fields were touched
    const formCtx = NoJS.findContext(form);
    const $form = formCtx.$form;
    expect($form.errorCount).toBeGreaterThan(0);
  });
});
