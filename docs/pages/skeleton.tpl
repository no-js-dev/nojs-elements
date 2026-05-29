<style>
  .skeleton-demo { margin-bottom: 2rem; }
  .card-layout {
    display: flex; gap: 1rem; padding: 1.5rem;
    background: var(--surface); border: 1px solid var(--border); border-radius: 8px;
  }
  .card-avatar { flex-shrink: 0; }
  .card-body { flex: 1; }
  .card-body h3 { margin: 0 0 0.75rem 0; }
  .content-text { line-height: 1.6; }
  .content-text h2 { margin-top: 0; }
</style>

<div class="route-header">
  <span class="route-badge">Feedback</span>
  <h1>Skeleton</h1>
  <p>Placeholder shimmer effects for loading states.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Placeholder shimmer effects for loading states. Displays a shimmer animation over any element while a reactive expression is truthy. When the expression becomes falsy, the skeleton fades out and reveals the real content underneath.</p>

  <h3>Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>skeleton</code></td><td>expression</td><td><em>required</em></td><td>Reactive expression — shows the skeleton placeholder while truthy</td></tr>
      <tr><td><code>skeleton-type</code></td><td><code>"text"</code> | <code>"circle"</code> | <code>"rect"</code></td><td><code>"text"</code></td><td>Shape of the placeholder. <code>text</code> renders full-width rounded bars, <code>circle</code> renders a circular placeholder, <code>rect</code> renders a rectangular placeholder</td></tr>
      <tr><td><code>skeleton-lines</code></td><td>number</td><td>—</td><td>Number of simulated text lines to generate. Each line is a shimmer bar; the last line is 60% width for a natural look</td></tr>
      <tr><td><code>skeleton-size</code></td><td>number | string</td><td>—</td><td>Explicit dimension (width and height) for <code>circle</code> or <code>rect</code> types. Appends <code>px</code> if the value is a bare number</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Adds <code>aria-busy="true"</code> on the element while the skeleton is active. Children are hidden from interaction via <code>pointer-events: none</code> while loading. <code>aria-busy</code> is removed when the skeleton deactivates.</p>

</section>

<!-- Text Skeleton -->
<section class="demo-section">
  <h2>Text Skeleton</h2>
  <p>Toggle loading state to show or hide the skeleton placeholder.</p>
  <div class="demo-tabbed" state="{ showCode: false, loading: true, countdown: 3 }" on:mounted="const tick = () => { if(countdown > 0) { countdown--; setTimeout(tick, 1000); } else { loading = false; } }; setTimeout(tick, 1000)">
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
      <div show="loading">
        <div class="content-text">
          <h2 skeleton="loading">Welcome to NoJS Elements</h2>
          <p skeleton="loading">This is the real content that appears when loading is complete. NoJS Elements provides a rich set of UI components that work with simple HTML attributes.</p>
        </div>
        <p style="text-align:center; color: var(--text-dim); margin-top: 0.5rem;" bind="'Loading... ' + countdown + 's'"></p>
      </div>
      <div show="!loading" style="text-align:center;">
        <div class="content-text">
          <h2>Welcome to NoJS Elements</h2>
          <p>This is the real content that appears when loading is complete. NoJS Elements provides a rich set of UI components that work with simple HTML attributes.</p>
        </div>
        <button class="btn btn-primary" on:click="loading = true; countdown = 3; const tick = () => { if(countdown > 0) { countdown--; setTimeout(tick, 1000); } else { loading = false; } }; setTimeout(tick, 1000)">Play Again</button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span>
<span class="ln"> 2</span>  <span class="hl-attr">state</span><span class="hl-op">=</span><span class="hl-str">"{ loading: true, countdown: 3 }"</span>
<span class="ln"> 3</span>  <span class="hl-attr">on:mounted</span><span class="hl-op">=</span><span class="hl-str">"const tick = () =&gt; {</span>
<span class="ln"> 4</span>    <span class="hl-str">if(countdown &gt; 0) { countdown--;</span>
<span class="ln"> 5</span>    <span class="hl-str">setTimeout(tick, 1000); }</span>
<span class="ln"> 6</span>    <span class="hl-str">else { loading = false; }</span>
<span class="ln"> 7</span>  <span class="hl-str">}; setTimeout(tick, 1000)"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 8</span>
<span class="ln"> 9</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">show</span><span class="hl-op">=</span><span class="hl-str">"loading"</span><span class="hl-tag">&gt;</span>
<span class="ln">10</span>    <span class="hl-tag">&lt;h2</span> <span class="hl-attr">skeleton</span><span class="hl-op">=</span><span class="hl-str">"loading"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Welcome</span><span class="hl-tag">&lt;/h2&gt;</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;p</span> <span class="hl-attr">skeleton</span><span class="hl-op">=</span><span class="hl-str">"loading"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Content...</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;p</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"'Loading... ' + countdown + 's'"</span><span class="hl-tag">&gt;&lt;/p&gt;</span>
<span class="ln">13</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">14</span>
<span class="ln">15</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">show</span><span class="hl-op">=</span><span class="hl-str">"!loading"</span><span class="hl-tag">&gt;</span>
<span class="ln">16</span>    <span class="hl-tag">&lt;h2&gt;</span><span class="hl-expr">Welcome to NoJS Elements</span><span class="hl-tag">&lt;/h2&gt;</span>
<span class="ln">17</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Content loaded!</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">18</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">on:click</span><span class="hl-op">=</span><span class="hl-str">"loading = true;</span>
<span class="ln">19</span>      <span class="hl-str">countdown = 3; /* restart */"</span><span class="hl-tag">&gt;</span>
<span class="ln">20</span>      <span class="hl-expr">Play Again</span>
<span class="ln">21</span>    <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">22</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">23</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Multi-line Skeleton -->
<section class="demo-section">
  <h2>Multi-line Skeleton</h2>
  <p>Renders multiple shimmer lines for paragraph placeholders.</p>
  <div class="demo-tabbed" state="{ showCode: false, loading: true }">
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
      <div skeleton="loading" skeleton-lines="4">
        <p>This content is hidden behind 4 skeleton lines while loading. When the loading state becomes false, this paragraph will be revealed.</p>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln">1</span><span class="hl-tag">&lt;div</span>
<span class="ln">2</span>  <span class="hl-attr">skeleton</span><span class="hl-op">=</span><span class="hl-str">"loading"</span>
<span class="ln">3</span>  <span class="hl-attr">skeleton-lines</span><span class="hl-op">=</span><span class="hl-str">"4"</span><span class="hl-tag">&gt;</span>
<span class="ln">4</span>  <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">This content is hidden</span>
<span class="ln">5</span>     <span class="hl-expr">behind 4 skeleton lines</span>
<span class="ln">6</span>     <span class="hl-expr">while loading.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">7</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Circle Skeleton -->
<section class="demo-section">
  <h2>Circle Skeleton</h2>
  <p>Circular skeleton placeholder for avatars and profile images.</p>
  <div class="demo-tabbed" state="{ showCode: false, loading: true }">
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
      <div skeleton="loading" skeleton-type="circle" skeleton-size="80">
        <img src="https://placehold.co/80" alt="Avatar" style="border-radius: 50%;" />
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln">1</span><span class="hl-tag">&lt;div</span>
<span class="ln">2</span>  <span class="hl-attr">skeleton</span><span class="hl-op">=</span><span class="hl-str">"loading"</span>
<span class="ln">3</span>  <span class="hl-attr">skeleton-type</span><span class="hl-op">=</span><span class="hl-str">"circle"</span>
<span class="ln">4</span>  <span class="hl-attr">skeleton-size</span><span class="hl-op">=</span><span class="hl-str">"80"</span><span class="hl-tag">&gt;</span>
<span class="ln">5</span>  <span class="hl-tag">&lt;img</span> <span class="hl-attr">src</span><span class="hl-op">=</span><span class="hl-str">"avatar.png"</span>
<span class="ln">6</span>       <span class="hl-attr">alt</span><span class="hl-op">=</span><span class="hl-str">"Avatar"</span> <span class="hl-tag">/&gt;</span>
<span class="ln">7</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Rect Skeleton -->
<section class="demo-section">
  <h2>Rectangle Skeleton</h2>
  <p>Rectangular skeleton placeholder for cards and images.</p>
  <div class="demo-tabbed" state="{ showCode: false, loading: true }">
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
      <div skeleton="loading" skeleton-type="rect" skeleton-size="200">
        <div style="width: 200px; height: 200px; background: #E2E8F0; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          <span>Image Placeholder</span>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln">1</span><span class="hl-tag">&lt;div</span>
<span class="ln">2</span>  <span class="hl-attr">skeleton</span><span class="hl-op">=</span><span class="hl-str">"loading"</span>
<span class="ln">3</span>  <span class="hl-attr">skeleton-type</span><span class="hl-op">=</span><span class="hl-str">"rect"</span>
<span class="ln">4</span>  <span class="hl-attr">skeleton-size</span><span class="hl-op">=</span><span class="hl-str">"200"</span><span class="hl-tag">&gt;</span>
<span class="ln">5</span>  <span class="hl-tag">&lt;div&gt;</span><span class="hl-expr">Image Placeholder</span><span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">6</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Card Layout Skeleton -->
<section class="demo-section">
  <h2>Card Layout</h2>
  <p>A realistic card combining circle, text, and multi-line skeletons.</p>
  <div class="demo-tabbed" state="{ showCode: false, loading: true }">
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
      <div class="card-layout">
        <div class="card-avatar">
          <div skeleton="loading" skeleton-type="circle" skeleton-size="48">
            <img src="https://placehold.co/48" alt="User" style="border-radius: 50%;" />
          </div>
        </div>
        <div class="card-body">
          <h3 skeleton="loading">Jane Doe</h3>
          <div skeleton="loading" skeleton-lines="3">
            <p>Software engineer with 10 years of experience building web applications. Passionate about open-source tools and developer experience.</p>
          </div>
        </div>
      </div>
      <button class="btn btn-primary" on:click="loading = !loading">Toggle Loading</button>
      <span style="margin-left: 0.75rem; font-size: 0.85rem; color: var(--text-dim);">loading: <span bind="loading ? 'true' : 'false'"></span></span>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"card-layout"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"card-avatar"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>    <span class="hl-tag">&lt;div</span>
<span class="ln"> 4</span>      <span class="hl-attr">skeleton</span><span class="hl-op">=</span><span class="hl-str">"loading"</span>
<span class="ln"> 5</span>      <span class="hl-attr">skeleton-type</span><span class="hl-op">=</span><span class="hl-str">"circle"</span>
<span class="ln"> 6</span>      <span class="hl-attr">skeleton-size</span><span class="hl-op">=</span><span class="hl-str">"48"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 7</span>      <span class="hl-tag">&lt;img</span> <span class="hl-attr">src</span><span class="hl-op">=</span><span class="hl-str">"user.png"</span> <span class="hl-tag">/&gt;</span>
<span class="ln"> 8</span>    <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln"> 9</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">10</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"card-body"</span><span class="hl-tag">&gt;</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;h3</span> <span class="hl-attr">skeleton</span><span class="hl-op">=</span><span class="hl-str">"loading"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Jane Doe</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;div</span>
<span class="ln">13</span>      <span class="hl-attr">skeleton</span><span class="hl-op">=</span><span class="hl-str">"loading"</span>
<span class="ln">14</span>      <span class="hl-attr">skeleton-lines</span><span class="hl-op">=</span><span class="hl-str">"3"</span><span class="hl-tag">&gt;</span>
<span class="ln">15</span>      <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Software engineer...</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">16</span>    <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">17</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">18</span><span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">19</span><span class="hl-tag">&lt;button</span>
<span class="ln">20</span>  <span class="hl-attr">on:click</span><span class="hl-op">=</span><span class="hl-str">"loading = !loading"</span><span class="hl-tag">&gt;</span>
<span class="ln">21</span>  <span class="hl-expr">Toggle Loading</span>
<span class="ln">22</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">23</span><span class="hl-tag">&lt;span</span>
<span class="ln">24</span>  <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"loading ? 'true' : 'false'"</span><span class="hl-tag">&gt;</span>
<span class="ln">25</span><span class="hl-tag">&lt;/span&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

</div>
