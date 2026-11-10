// Safe internals accessor — tolerates older cores missing internals or a member.
export function _internal(NoJS, key) {
  const i = NoJS && NoJS.internals;
  return i && typeof i[key] !== 'undefined' ? i[key] : undefined;
}

// Record the context a real (non-stub) Elements directive bound against, so the
// install/init re-bind pass can tell a correctly bound node from one bound to a
// core stub or to an orphan context.
export function _markBound(el, ctx) {
  el.__nojsElBoundCtx = ctx;
}
