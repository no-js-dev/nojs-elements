// ─── NoJS-Server attribute contract for the UI directives (ADR-021 §2) ─
//
// Read by the NoJS-Server compiler from the plugin object's `contract`.
// Every UI attribute not listed here is a literal (preserved verbatim):
// ids, positions, modes, delays, CSS classes and selectors are read as
// text by both backends. Only the attributes core evaluates as
// expressions are declared; the server evaluates them at render and
// delivers the JSON value, which the host backend reads with host.value.

export const uiContract = {
  // `sort` is also a core loop companion: declaring the directive keeps the
  // attribute on a table header, where core leaves it for this plugin.
  sort: { attrs: { sort: "literal", "sort-type": "literal", "sort-default": "literal" } },
  tooltip: { attrs: { "tooltip-disabled": "expression" } },
  "tab-disabled": { attrs: { "tab-disabled": "expression" } },
  skeleton: { attrs: { skeleton: "expression" } },
  step: { attrs: { "step-validate": "expression" } },
  // Message text on buttons, links and on:click elements (core shows it on
  // click); a watched expression on any other element.
  toast: { attrs: { toast: { type: "expression", literalOn: ["button", "a", "[on:click]"] } } },
};
