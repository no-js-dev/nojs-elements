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

// An Elements container with no context above it (no `state`) keeps a context
// of its own on its element, so its children share it. The mark lets a
// <form validate> inside such a container keep a $form of its own.
export function _markOwnContext(el) {
  el.__nojsElOwnCtx = true;
}

export function _ownsContext(el) {
  return el.__nojsElOwnCtx === true;
}
