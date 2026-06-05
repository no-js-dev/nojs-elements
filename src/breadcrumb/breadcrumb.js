import { _breadcrumbState } from "./state.js";
import { _injectBreadcrumbStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Resolve crumb label from an element ─────────────────────────────
// Priority: breadcrumb="label" > title="label" > textContent
function _resolveLabel(el) {
  const attrVal = el.getAttribute("breadcrumb");
  if (attrVal && attrVal.trim() !== "") return attrVal.trim();

  const titleVal = el.getAttribute("title");
  if (titleVal && titleVal.trim() !== "") return titleVal.trim();

  return (el.textContent || "").trim();
}

// ─── Capitalize first letter of a path segment ──────────────────────
function _capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ─── Build the OL structure inside the container ─────────────────────
function _buildOl(container, crumbs) {
  // Clear any previously generated OL
  const existingOl = container.querySelector("ol.nojs-breadcrumb");
  if (existingOl) existingOl.remove();

  const ol = document.createElement("ol");
  ol.classList.add("nojs-breadcrumb");

  for (let i = 0; i < crumbs.length; i++) {
    const crumb = crumbs[i];
    const li = document.createElement("li");
    const isLast = i === crumbs.length - 1;

    if (isLast) {
      // Last crumb: non-clickable, aria-current="page"
      const span = document.createElement("span");
      span.setAttribute("aria-current", "page");
      span.textContent = crumb.label;
      li.appendChild(span);
    } else {
      // Intermediate crumb: clickable link
      const a = document.createElement("a");
      a.href = crumb.href;
      a.textContent = crumb.label;
      li.appendChild(a);
    }

    ol.appendChild(li);
  }

  container.appendChild(ol);

  // Update state
  const entry = _breadcrumbState.containers.get(container);
  if (entry) entry.crumbs = crumbs;
}

// ─── Manual mode: read crumbs from child elements ───────────────────
function _buildManualCrumbs(container) {
  const crumbs = [];
  const children = Array.from(container.children);

  for (const child of children) {
    // Skip the generated OL
    if (child.tagName === "OL" && child.classList.contains("nojs-breadcrumb")) continue;

    const label = _resolveLabel(child);
    if (!label) continue;

    const href = child.getAttribute("href") || "#";
    crumbs.push({ label, href });
  }

  return crumbs;
}

// ─── Auto-track mode: generate crumbs from router path ──────────────
function _buildRouteCrumbs(path) {
  if (!path || path === "/") {
    return [{ label: "Home", href: "/", isLast: true }];
  }

  // Remove trailing slash and split
  const cleaned = path.replace(/\/+$/, "") || "/";
  const segments = cleaned.split("/").filter(Boolean);
  const crumbs = [{ label: "Home", href: "/" }];

  let cumulative = "";
  for (let i = 0; i < segments.length; i++) {
    cumulative += "/" + segments[i];
    // Capitalize and replace hyphens/underscores with spaces for display
    const label = _capitalize(segments[i].replace(/[-_]/g, " "));
    crumbs.push({ label, href: cumulative });
  }

  return crumbs;
}

// ─── Register breadcrumb directive ──────────────────────────────────
export function registerBreadcrumbDirective(NoJS) {
  NoJS.directive("breadcrumb", {
    priority: 15,
    init(el, name, expr) {
      _injectBreadcrumbStyles();

      // Ensure nav has aria-label
      if (el.tagName === "NAV" && !el.getAttribute("aria-label")) {
        el.setAttribute("aria-label", "Breadcrumb");
      }

      // Determine mode: auto-track if no child elements (or only whitespace)
      // and NoJS.router exists, otherwise manual mode
      const hasChildren = Array.from(el.children).some(
        (child) => !(child.tagName === "OL" && child.classList.contains("nojs-breadcrumb"))
      );
      const router = NoJS.router;
      const isAutoTrack = !hasChildren && router;

      // Register state
      _breadcrumbState.containers.set(el, {
        unsub: null,
        crumbs: [],
      });

      if (isAutoTrack) {
        // ─── Auto-Track Mode ──────────────────────────────────────
        const update = () => {
          const current = router.current;
          const path = current ? current.path : "/";
          const crumbs = _buildRouteCrumbs(path);
          _buildOl(el, crumbs);
        };

        // Initial render
        update();

        // Subscribe to route changes
        if (typeof router.on === "function") {
          const unsub = router.on(update);
          const entry = _breadcrumbState.containers.get(el);
          if (entry) entry.unsub = unsub;

          addDisposer(el, () => {
            if (typeof unsub === "function") unsub();
            const e = _breadcrumbState.containers.get(el);
            if (e) e.unsub = null;
          });
        }
      } else {
        // ─── Manual Mode ──────────────────────────────────────────
        // Hide the original child elements and build OL from them
        const crumbs = _buildManualCrumbs(el);

        // Hide original children (they become the data source)
        for (const child of Array.from(el.children)) {
          if (child.tagName === "OL" && child.classList.contains("nojs-breadcrumb")) continue;
          child.style.display = "none";
        }

        _buildOl(el, crumbs);
      }

      // ─── Cleanup ────────────────────────────────────────────────
      addDisposer(el, () => {
        _breadcrumbState.containers.delete(el);
      });
    },
  });
}
