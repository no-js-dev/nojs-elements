<style>
  /* ─── Breadcrumb-specific ───────────────────── */
  .breadcrumb-demo {
    padding: 1rem;
  }
  .breadcrumb-demo nav {
    padding: 0.75rem 1rem;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--surface);
  }
</style>

<div class="route-header">
  <span class="route-badge">Navigation</span>
  <h1>Breadcrumb</h1>
  <p>Accessible breadcrumb trails from manual child elements or automatic route tracking via the NoJS router.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Generates an accessible breadcrumb trail from either manually declared child elements or automatic route tracking. Builds a semantic <code>&lt;ol&gt;</code> with <code>&lt;li&gt;</code> items, marks the last crumb as the current page, and separates items with a CSS pseudo-element.</p>

  <h3>Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>breadcrumb</code></td><td>string (on container)</td><td>&mdash;</td><td>Declares the element as a breadcrumb container. On child elements, sets a custom label.</td></tr>
    </tbody>
  </table>

  <h3>Label Priority</h3>
  <table class="docs-table">
    <thead><tr><th>Priority</th><th>Source</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td>1</td><td><code>breadcrumb</code> attribute</td><td>Highest priority — custom label set via the attribute</td></tr>
      <tr><td>2</td><td><code>title</code> attribute</td><td>Second priority — fallback to the title attribute</td></tr>
      <tr><td>3</td><td>Text content</td><td>Fallback — uses the element's text content</td></tr>
    </tbody>
  </table>

  <h3>CSS Custom Properties</h3>
  <table class="docs-table">
    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>--nojs-breadcrumb-separator</code></td><td><code>" / "</code></td><td>Content of the separator between crumbs</td></tr>
      <tr><td><code>--nojs-breadcrumb-gap</code></td><td><code>0.5em</code></td><td>Spacing between crumbs and separators</td></tr>
      <tr><td><code>--nojs-breadcrumb-active-color</code></td><td><code>inherit</code></td><td>Text color of the current (last) crumb</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Applies <code>aria-label="Breadcrumb"</code> on <code>&lt;nav&gt;</code> containers. Uses semantic <code>&lt;ol&gt;</code> / <code>&lt;li&gt;</code> structure. Marks the last crumb with <code>aria-current="page"</code> and renders it as non-clickable text.</p>

</section>

<!-- Manual Mode -->
<section class="demo-section">
  <h2>Manual Mode</h2>
  <p>Provide child <code>&lt;a&gt;</code> elements inside the container. The element reads them, hides the originals, and generates a structured breadcrumb.</p>
  <div class="demo-tabbed" state="{ showCode: false }">
    <div class="demo-tabbed-bar">
      <div class="demo-tabbed-dots"><span></span><span></span><span></span></div>
      <div class="demo-tabbed-tabs">
        <button class-active="!showCode" on:click="showCode = false">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
          Preview
        </button>
        <button class-active="showCode" on:click="showCode = true">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Code
        </button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-example" show="!showCode">
      <div class="breadcrumb-demo">
        <nav breadcrumb>
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Widgets</a>
        </nav>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln">1</span><span class="hl-tag">&lt;nav</span> <span class="hl-attr">breadcrumb</span><span class="hl-tag">&gt;</span>
<span class="ln">2</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"/"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Home</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln">3</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"/products"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Products</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln">4</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"/products/widgets"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Widgets</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln">5</span><span class="hl-tag">&lt;/nav&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Custom Labels -->
<section class="demo-section">
  <h2>Custom Labels</h2>
  <p>Override crumb labels using the <code>breadcrumb</code> or <code>title</code> attribute on child elements.</p>
  <div class="demo-tabbed" state="{ showCode: false }">
    <div class="demo-tabbed-bar">
      <div class="demo-tabbed-dots"><span></span><span></span><span></span></div>
      <div class="demo-tabbed-tabs">
        <button class-active="!showCode" on:click="showCode = false">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
          Preview
        </button>
        <button class-active="showCode" on:click="showCode = true">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Code
        </button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-example" show="!showCode">
      <div class="breadcrumb-demo">
        <nav breadcrumb>
          <a href="#" breadcrumb="Home Page">Home</a>
          <a href="#" title="Documentation">Docs</a>
          <a href="#">API Reference</a>
        </nav>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln">1</span><span class="hl-tag">&lt;nav</span> <span class="hl-attr">breadcrumb</span><span class="hl-tag">&gt;</span>
<span class="ln">2</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"/"</span> <span class="hl-attr">breadcrumb</span><span class="hl-op">=</span><span class="hl-str">"Home Page"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Home</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln">3</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"/docs"</span> <span class="hl-attr">title</span><span class="hl-op">=</span><span class="hl-str">"Documentation"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Docs</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln">4</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"/docs/api"</span><span class="hl-tag">&gt;</span><span class="hl-expr">API Reference</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln">5</span><span class="hl-tag">&lt;/nav&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Custom Separator -->
<section class="demo-section">
  <h2>Custom Separator</h2>
  <p>Use CSS custom properties to change the separator character and spacing.</p>
  <div class="demo-tabbed" state="{ showCode: false }">
    <div class="demo-tabbed-bar">
      <div class="demo-tabbed-dots"><span></span><span></span><span></span></div>
      <div class="demo-tabbed-tabs">
        <button class-active="!showCode" on:click="showCode = false">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
          Preview
        </button>
        <button class-active="showCode" on:click="showCode = true">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Code
        </button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-example" show="!showCode">
      <div class="breadcrumb-demo">
        <nav breadcrumb style="--nojs-breadcrumb-separator: '\203A'; --nojs-breadcrumb-gap: 0.75em;">
          <a href="#">Home</a>
          <a href="#">Dashboard</a>
          <a href="#">Analytics</a>
        </nav>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln">1</span><span class="hl-tag">&lt;nav</span> <span class="hl-attr">breadcrumb</span>
<span class="ln">2</span>  <span class="hl-attr">style</span><span class="hl-op">=</span><span class="hl-str">"--nojs-breadcrumb-separator: '\203A';
<span class="ln">3</span>         --nojs-breadcrumb-gap: 0.75em;"</span><span class="hl-tag">&gt;</span>
<span class="ln">4</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"/"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Home</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln">5</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"/dashboard"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Dashboard</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln">6</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"/dashboard/analytics"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Analytics</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln">7</span><span class="hl-tag">&lt;/nav&gt;</span></pre>
      </div>
    </div>
  </div>
</section>


</div>
