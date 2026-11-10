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
//   are null for both (see __tests__/dnd.test.js); drag-list sources carry
//   their list once drag-list runs on the host API.

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
};
