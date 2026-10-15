// Safe internals accessor — tolerates older cores missing internals or a member.
export function _internal(NoJS, key) {
  const i = NoJS && NoJS.internals;
  return i && typeof i[key] !== 'undefined' ? i[key] : undefined;
}
