// ════════════════════════════════════════════════════════════════════════
//  One directive body, two backends (NoJS-Server ADR-021 §7)
//
//  `defineDirective(NoJS, name, { priority, subtree, init })` returns the
//  definition to pass to `NoJS.directive(name, …)`. `init` runs as
//  `init(el, expr, be)` on both backends:
//  - core:  `expr` is core's directive expression; `be.host` is null and
//           `be.dispose(fn)` pushes onto `el.__disposers`, exactly as the
//           modules did before (`be.disposeOn(node, fn)`: onto `node`'s).
//  - host:  `expr` is the attribute text the server rendered (a literal,
//           or the delivered JSON value of an `expression` attribute);
//           `be.host` is the host API and `be.dispose(fn)` registers with
//           `host.onDispose`. `be.disposeOn(node, fn)` registers on the
//           directive element too: the host owns disposers per directive,
//           so a re-init releases what the directive set up on descendants.
//
//  `subtree: true` tells the NoJS-Server plugin host that the directive
//  restructures or annotates its element's descendants: a morph keeps that
//  subtree while the server markup is unchanged and re-initializes the
//  directive when it changed. Core ignores the flag.
// ════════════════════════════════════════════════════════════════════════

import { isHostBackend } from "./_host.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

export function defineDirective(NoJS, name, { priority, subtree = false, init: body }) {
  if (isHostBackend(NoJS)) {
    return {
      priority,
      subtree,
      init(el, host) {
        const dispose = (fn) => host.onDispose(el, fn);
        body(el, el.getAttribute(name) ?? "", {
          host,
          dispose,
          disposeOn: (_node, fn) => dispose(fn),
        });
      },
    };
  }
  return {
    priority,
    init(el, _name, expr) {
      body(el, expr, {
        host: null,
        dispose: (fn) => addDisposer(el, fn),
        disposeOn: addDisposer,
      });
    },
  };
}
