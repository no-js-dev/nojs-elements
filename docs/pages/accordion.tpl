<style>
  /* ─── Accordion-specific ────────────────────── */
  .accordion-demo {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
  }
  .accordion-demo details {
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--surface);
  }
  .accordion-demo details summary {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
  }
  .accordion-demo details p {
    padding: 0 1rem 0.75rem;
    margin: 0;
    font-size: 0.875rem;
    color: var(--text-muted);
  }
</style>

<div class="route-header">
  <span class="route-badge">Disclosure</span>
  <h1>Accordion</h1>
  <p>Animated expand/collapse groups built on native <code>&lt;details&gt;</code> / <code>&lt;summary&gt;</code> elements with single or multi mode.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Adds animated expand/collapse behavior to groups of native <code>&lt;details&gt;</code> / <code>&lt;summary&gt;</code> elements. Because it builds on top of HTML disclosure widgets, the accordion works without JavaScript as a progressive enhancement.</p>

  <h3>Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>accordion</code></td><td><code>"single"</code> | <code>"multi"</code></td><td><code>"single"</code></td><td>Controls whether one or multiple sections can be open simultaneously</td></tr>
    </tbody>
  </table>

  <h3>Events</h3>
  <table class="docs-table">
    <thead><tr><th>Event</th><th>Bubbles</th><th>Detail</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>accordion-change</code></td><td>Yes</td><td><code>{ element, open, index }</code></td><td>Dispatched on the accordion container when a section opens or closes</td></tr>
    </tbody>
  </table>

  <h3>CSS Custom Properties</h3>
  <table class="docs-table">
    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>--nojs-accordion-duration</code></td><td><code>0.3s</code></td><td>Duration of the open/close transition</td></tr>
      <tr><td><code>--nojs-accordion-easing</code></td><td><code>ease</code></td><td>Easing function for the transition</td></tr>
      <tr><td><code>--nojs-accordion-gap</code></td><td><code>0</code></td><td>Gap between <code>&lt;details&gt;</code> elements</td></tr>
    </tbody>
  </table>

  <h3>Keyboard Navigation</h3>
  <table class="docs-table">
    <thead><tr><th>Key</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td><kbd>ArrowDown</kbd> / <kbd>ArrowRight</kbd></td><td>Move focus to next summary (wraps)</td></tr>
      <tr><td><kbd>ArrowUp</kbd> / <kbd>ArrowLeft</kbd></td><td>Move focus to previous summary (wraps)</td></tr>
      <tr><td><kbd>Home</kbd></td><td>Move focus to first summary</td></tr>
      <tr><td><kbd>End</kbd></td><td>Move focus to last summary</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Toggle the focused section</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Applies <code>role="group"</code> on the accordion container. Native <code>&lt;details&gt;</code> / <code>&lt;summary&gt;</code> semantics provide built-in disclosure behavior. Keyboard navigation between summaries via arrow keys, Home, and End.</p>

</section>

<!-- Single Mode -->
<section class="demo-section">
  <h2>Single Mode (Default)</h2>
  <p>Only one section can be open at a time. Opening a new section closes the current one.</p>
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
      <div class="accordion-demo">
        <div accordion>
          <details open>
            <summary>What is NoJS?</summary>
            <p>NoJS is an HTML-first reactive framework that replaces JavaScript with declarative HTML attributes.</p>
          </details>
          <details>
            <summary>Do I need a build step?</summary>
            <p>No. Include one script tag and start writing directives. No build step, no bundler, no configuration.</p>
          </details>
          <details>
            <summary>Is it accessible?</summary>
            <p>Yes. NoJS Elements use semantic HTML and ARIA attributes. The accordion builds on native details/summary elements.</p>
          </details>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">accordion</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;details</span> <span class="hl-attr">open</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>    <span class="hl-tag">&lt;summary&gt;</span><span class="hl-expr">What is NoJS?</span><span class="hl-tag">&lt;/summary&gt;</span>
<span class="ln"> 4</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">NoJS is an HTML-first reactive framework...</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 5</span>  <span class="hl-tag">&lt;/details&gt;</span>
<span class="ln"> 6</span>  <span class="hl-tag">&lt;details&gt;</span>
<span class="ln"> 7</span>    <span class="hl-tag">&lt;summary&gt;</span><span class="hl-expr">Do I need a build step?</span><span class="hl-tag">&lt;/summary&gt;</span>
<span class="ln"> 8</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">No. Include one script tag...</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 9</span>  <span class="hl-tag">&lt;/details&gt;</span>
<span class="ln">10</span>  <span class="hl-tag">&lt;details&gt;</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;summary&gt;</span><span class="hl-expr">Is it accessible?</span><span class="hl-tag">&lt;/summary&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Yes. NoJS Elements use semantic HTML...</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">13</span>  <span class="hl-tag">&lt;/details&gt;</span>
<span class="ln">14</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Multi Mode -->
<section class="demo-section">
  <h2>Multi Mode</h2>
  <p>Multiple sections can be open simultaneously. Each section toggles independently.</p>
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
      <div class="accordion-demo">
        <div accordion="multi">
          <details>
            <summary>Filters</summary>
            <p>Filter controls go here. Multiple sections can be open at the same time.</p>
          </details>
          <details>
            <summary>Sort Options</summary>
            <p>Sort controls go here. Open this alongside Filters.</p>
          </details>
          <details>
            <summary>View Settings</summary>
            <p>View settings go here. All three can be open simultaneously.</p>
          </details>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">accordion</span><span class="hl-op">=</span><span class="hl-str">"multi"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;details&gt;</span>
<span class="ln"> 3</span>    <span class="hl-tag">&lt;summary&gt;</span><span class="hl-expr">Filters</span><span class="hl-tag">&lt;/summary&gt;</span>
<span class="ln"> 4</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Filter controls here.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 5</span>  <span class="hl-tag">&lt;/details&gt;</span>
<span class="ln"> 6</span>  <span class="hl-tag">&lt;details&gt;</span>
<span class="ln"> 7</span>    <span class="hl-tag">&lt;summary&gt;</span><span class="hl-expr">Sort Options</span><span class="hl-tag">&lt;/summary&gt;</span>
<span class="ln"> 8</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Sort controls here.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 9</span>  <span class="hl-tag">&lt;/details&gt;</span>
<span class="ln">10</span>  <span class="hl-tag">&lt;details&gt;</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;summary&gt;</span><span class="hl-expr">View Settings</span><span class="hl-tag">&lt;/summary&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">View settings here.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">13</span>  <span class="hl-tag">&lt;/details&gt;</span>
<span class="ln">14</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Nested Accordions -->
<section class="demo-section">
  <h2>Nested Accordions</h2>
  <p>Accordions can be nested. Each level manages its own open/close state independently.</p>
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
      <div class="accordion-demo">
        <div accordion>
          <details>
            <summary>Category A</summary>
            <div accordion="multi">
              <details>
                <summary>Subcategory A.1</summary>
                <p>Content for subcategory A.1</p>
              </details>
              <details>
                <summary>Subcategory A.2</summary>
                <p>Content for subcategory A.2</p>
              </details>
            </div>
          </details>
          <details>
            <summary>Category B</summary>
            <p>Content for Category B.</p>
          </details>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">accordion</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;details&gt;</span>
<span class="ln"> 3</span>    <span class="hl-tag">&lt;summary&gt;</span><span class="hl-expr">Category A</span><span class="hl-tag">&lt;/summary&gt;</span>
<span class="ln"> 4</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">accordion</span><span class="hl-op">=</span><span class="hl-str">"multi"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 5</span>      <span class="hl-tag">&lt;details&gt;</span>
<span class="ln"> 6</span>        <span class="hl-tag">&lt;summary&gt;</span><span class="hl-expr">Subcategory A.1</span><span class="hl-tag">&lt;/summary&gt;</span>
<span class="ln"> 7</span>        <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Content A.1</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 8</span>      <span class="hl-tag">&lt;/details&gt;</span>
<span class="ln"> 9</span>      <span class="hl-tag">&lt;details&gt;</span>
<span class="ln">10</span>        <span class="hl-tag">&lt;summary&gt;</span><span class="hl-expr">Subcategory A.2</span><span class="hl-tag">&lt;/summary&gt;</span>
<span class="ln">11</span>        <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Content A.2</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">12</span>      <span class="hl-tag">&lt;/details&gt;</span>
<span class="ln">13</span>    <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">14</span>  <span class="hl-tag">&lt;/details&gt;</span>
<span class="ln">15</span>  <span class="hl-tag">&lt;details&gt;</span>
<span class="ln">16</span>    <span class="hl-tag">&lt;summary&gt;</span><span class="hl-expr">Category B</span><span class="hl-tag">&lt;/summary&gt;</span>
<span class="ln">17</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Content for Category B.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">18</span>  <span class="hl-tag">&lt;/details&gt;</span>
<span class="ln">19</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>


</div>
