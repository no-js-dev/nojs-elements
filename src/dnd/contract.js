// ─── NoJS-Server attribute contract for dnd (ADR-021 §2) ──────────────
//
// Read by the NoJS-Server compiler from the plugin object's `contract`.
// Undeclared attributes default to `literal` (preserved verbatim).
//
// - drag:  the dragged value. Evaluated server-side and delivered as a
//          sealed reference; the browser echoes it back as `$drag`.
// - drop:  the drop statement. Compiled to a server action; its implicit
//          variables become schema-validated payload members.
// - *-disabled / drop-max: evaluated server-side, delivered as JSON values.
// - $source.list / $target.list: bound by the server at action time, never
//   by the client. With a `drag` source and a `drop` target core's values
//   are null for both (see __tests__/dnd.test.js).
// - drag-list: `list` makes the server render the rows of the array at its
//   path through the row template (one display:contents wrapper per item,
//   as core) and compile index edits (move / insert / remove) to actions.
//   Each row's item is delivered sealed: it is the `$drag` a drop zone or
//   another list receives.
// - drag-multiple: client-only selection; a selection drag sends the
//   selected items' sealed references.

const SOURCE_TARGET_EL = "it is a DOM element; client mechanics never send DOM nodes";

export const dndContract = {
  drag: {
    attrs: {
      drag: { type: "expression", deliver: "sealed" },
      "drag-disabled": "expression",
      "drag-type": "literal",
      "drag-effect": "literal",
      "drag-handle": "literal",
      "drag-image": "literal",
      "drag-image-offset": "literal",
      "drag-class": "literal",
      "drag-ghost-class": "literal",
      "drag-group": "literal",
    },
  },
  drop: {
    attrs: {
      drop: "statement",
      "drop-disabled": "expression",
      "drop-max": "expression",
      "drop-accept": "literal",
      "drop-effect": "literal",
      "drop-class": "literal",
      "drop-reject-class": "literal",
      "drop-sort": "literal",
      "drop-placeholder": "literal",
      "drop-placeholder-class": "literal",
    },
    implicit: {
      $drag: { sealed: true },
      $dragType: { schema: { type: "string", maxLength: 256 } },
      $dragEffect: { schema: { type: "string", maxLength: 32 } },
      $dropIndex: { schema: { type: "integer", minimum: 0, maximum: 1000000 } },
      $source: {
        schema: {
          type: "object",
          properties: { index: { type: ["integer", "null"], minimum: 0 } },
          required: ["index"],
          additionalProperties: false,
        },
        members: { el: SOURCE_TARGET_EL },
        fixed: { list: null },
      },
      $target: {
        schema: {
          type: "object",
          properties: { index: { type: "integer", minimum: 0 } },
          required: ["index"],
          additionalProperties: false,
        },
        members: { el: SOURCE_TARGET_EL },
        fixed: { list: null },
      },
      $el: { unavailable: SOURCE_TARGET_EL },
    },
  },
  "drag-list": {
    attrs: {
      "drag-list": "path",
      template: "literal",
      "drag-list-item": "literal",
      "drag-list-key": "literal",
      "drag-list-copy": "literal",
      "drag-list-remove": "literal",
      "drag-disabled": "expression",
      "drop-disabled": "expression",
      "drop-max": "expression",
      "drag-type": "literal",
      "drag-class": "literal",
      "drop-accept": "literal",
      "drop-class": "literal",
      "drop-reject-class": "literal",
      "drop-settle-class": "literal",
      "drop-empty-class": "literal",
      "drop-sort": "literal",
      "drop-placeholder": "literal",
      "drop-placeholder-class": "literal",
    },
    list: {
      path: "drag-list",
      template: "template",
      item: "drag-list-item",
      itemDefault: "item",
      wrapper: { tag: "div", attrs: { style: "display: contents;" } },
    },
  },
  "drag-multiple": {
    attrs: {
      "drag-multiple": "literal",
      "drag-multiple-class": "literal",
    },
  },
};
