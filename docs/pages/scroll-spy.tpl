<style>
  /* ─── Scroll Spy-specific ───────────────────── */
  .spy-demo-layout {
    display: flex;
    gap: 1.5rem;
    padding: 1rem;
  }
  .spy-demo-nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: sticky;
    top: 80px;
    align-self: flex-start;
    min-width: 140px;
  }
  .spy-demo-nav a {
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--text-muted);
    text-decoration: none;
    border-left: 2px solid transparent;
    transition: color 0.15s, border-color 0.15s, background 0.15s;
  }
  .spy-demo-nav a:hover {
    color: var(--primary);
    background: var(--primary-surface);
  }
  .spy-demo-nav a.active {
    color: var(--primary);
    border-left-color: var(--primary);
    font-weight: 600;
  }
  .spy-demo-content {
    flex: 1;
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 1rem;
    scroll-behavior: smooth;
  }
  .spy-demo-content section {
    min-height: 200px;
    padding: 1rem 0;
  }
  .spy-demo-content section + section {
    border-top: 1px solid var(--border);
  }
  .spy-demo-content h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text);
    margin: 0 0 0.5rem;
  }
  .spy-demo-content p {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin: 0;
  }
</style>

<div class="route-header">
  <span class="route-badge">Navigation</span>
  <h1>Scroll Spy</h1>
  <p>Highlights navigation links based on which section of the page is currently visible in the viewport.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>As the user scrolls, the spy element pointing to the topmost visible section receives an <code>.active</code> class and <code>aria-current="true"</code>. Only one spy element is active at a time within a group.</p>

  <h3>Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>spy</code></td><td>string</td><td>&mdash;</td><td>Target section ID (with or without <code>#</code> prefix). For <code>&lt;a&gt;</code> elements, <code>href</code> is used instead.</td></tr>
      <tr><td><code>spy-offset</code></td><td>number</td><td><code>0</code></td><td>Pixel offset from the top of the viewport. Use to compensate for fixed headers.</td></tr>
      <tr><td><code>spy-threshold</code></td><td>number (0&ndash;1)</td><td><code>0.1</code></td><td>Fraction of the target section that must be visible to trigger activation.</td></tr>
    </tbody>
  </table>

  <h3>CSS Classes</h3>
  <table class="docs-table">
    <thead><tr><th>Class</th><th>When Applied</th></tr></thead>
    <tbody>
      <tr><td><code>.active</code></td><td>On the spy element whose target section is the topmost visible section</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>The active spy element receives <code>aria-current="true"</code>. When deactivated, <code>aria-current</code> is removed entirely. No roles are injected on spy elements or target sections.</p>

</section>

<!-- Anchor Links -->
<section class="demo-section">
  <h2>Anchor Links</h2>
  <p>For <code>&lt;a&gt;</code> elements, the target section is read from the <code>href</code> attribute. Scroll the content panel to see the active link change.</p>
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
      <div class="spy-demo-layout">
        <nav class="spy-demo-nav">
          <a href="#spy-intro">Introduction</a>
          <a href="#spy-features">Features</a>
          <a href="#spy-install">Installation</a>
          <a href="#spy-api">API</a>
        </nav>
        <div class="spy-demo-content">
          <section id="spy-intro">
            <h3>Introduction</h3>
            <p>Welcome to the introduction section. Scroll down to see the active navigation link change as each section comes into view.</p>
          </section>
          <section id="spy-features">
            <h3>Features</h3>
            <p>This section describes the features. The scroll spy automatically highlights the corresponding nav link.</p>
          </section>
          <section id="spy-install">
            <h3>Installation</h3>
            <p>Installation instructions go here. The spy uses IntersectionObserver for efficient scroll detection.</p>
          </section>
          <section id="spy-api">
            <h3>API</h3>
            <p>API reference section. Only one spy element is active at a time within a group.</p>
          </section>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;nav&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"#introduction"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Introduction</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln"> 3</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"#features"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Features</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln"> 4</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"#installation"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Installation</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln"> 5</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"#api"</span><span class="hl-tag">&gt;</span><span class="hl-expr">API</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln"> 6</span><span class="hl-tag">&lt;/nav&gt;</span>
<span class="ln"> 7</span>
<span class="ln"> 8</span><span class="hl-tag">&lt;section</span> <span class="hl-attr">id</span><span class="hl-op">=</span><span class="hl-str">"introduction"</span><span class="hl-tag">&gt;</span>...<span class="hl-tag">&lt;/section&gt;</span>
<span class="ln"> 9</span><span class="hl-tag">&lt;section</span> <span class="hl-attr">id</span><span class="hl-op">=</span><span class="hl-str">"features"</span><span class="hl-tag">&gt;</span>...<span class="hl-tag">&lt;/section&gt;</span>
<span class="ln">10</span><span class="hl-tag">&lt;section</span> <span class="hl-attr">id</span><span class="hl-op">=</span><span class="hl-str">"installation"</span><span class="hl-tag">&gt;</span>...<span class="hl-tag">&lt;/section&gt;</span>
<span class="ln">11</span><span class="hl-tag">&lt;section</span> <span class="hl-attr">id</span><span class="hl-op">=</span><span class="hl-str">"api"</span><span class="hl-tag">&gt;</span>...<span class="hl-tag">&lt;/section&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Button Spies -->
<section class="demo-section">
  <h2>Button Spies</h2>
  <p>For non-anchor elements, use the <code>spy</code> attribute to specify the target section ID.</p>
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
      <p style="padding: 0.5rem 1rem; font-size: 0.8125rem; color: var(--text-dim);">Buttons use the <code>spy</code> attribute instead of <code>href</code> to specify the target section.</p>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln">1</span><span class="hl-tag">&lt;nav&gt;</span>
<span class="ln">2</span>  <span class="hl-tag">&lt;button</span> <span class="hl-attr">spy</span><span class="hl-op">=</span><span class="hl-str">"#introduction"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Introduction</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">3</span>  <span class="hl-tag">&lt;button</span> <span class="hl-attr">spy</span><span class="hl-op">=</span><span class="hl-str">"#features"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Features</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">4</span>  <span class="hl-tag">&lt;button</span> <span class="hl-attr">spy</span><span class="hl-op">=</span><span class="hl-str">"#installation"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Installation</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">5</span><span class="hl-tag">&lt;/nav&gt;</span>
<span class="ln">6</span>
<span class="ln">7</span><span class="hl-tag">&lt;section</span> <span class="hl-attr">id</span><span class="hl-op">=</span><span class="hl-str">"introduction"</span><span class="hl-tag">&gt;</span>...<span class="hl-tag">&lt;/section&gt;</span>
<span class="ln">8</span><span class="hl-tag">&lt;section</span> <span class="hl-attr">id</span><span class="hl-op">=</span><span class="hl-str">"features"</span><span class="hl-tag">&gt;</span>...<span class="hl-tag">&lt;/section&gt;</span>
<span class="ln">9</span><span class="hl-tag">&lt;section</span> <span class="hl-attr">id</span><span class="hl-op">=</span><span class="hl-str">"installation"</span><span class="hl-tag">&gt;</span>...<span class="hl-tag">&lt;/section&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Offset for Fixed Headers -->
<section class="demo-section">
  <h2>Offset for Fixed Headers</h2>
  <p>Use <code>spy-offset</code> to shift the detection zone downward and compensate for fixed headers.</p>
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
      <p style="padding: 0.5rem 1rem; font-size: 0.8125rem; color: var(--text-dim);">The offset value is applied as a negative <code>rootMargin</code> on the IntersectionObserver, pushing the detection boundary down.</p>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-comment">&lt;!-- Compensate for an 80px fixed header --&gt;</span>
<span class="ln"> 2</span><span class="hl-tag">&lt;nav&gt;</span>
<span class="ln"> 3</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"#section1"</span> <span class="hl-attr">spy-offset</span><span class="hl-op">=</span><span class="hl-str">"80"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Section 1</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln"> 4</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"#section2"</span> <span class="hl-attr">spy-offset</span><span class="hl-op">=</span><span class="hl-str">"80"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Section 2</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln"> 5</span>  <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"#section3"</span> <span class="hl-attr">spy-offset</span><span class="hl-op">=</span><span class="hl-str">"80"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Section 3</span><span class="hl-tag">&lt;/a&gt;</span>
<span class="ln"> 6</span><span class="hl-tag">&lt;/nav&gt;</span></pre>
      </div>
    </div>
  </div>
</section>


</div>
