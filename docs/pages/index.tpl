<style>
  /* ─── Hero (matching NoJS core landing) ─────── */
  .home-hero {
    background: linear-gradient(180deg, var(--code-bg), var(--code-surface));
    min-height: calc(100vh - var(--header-h));
    padding: calc(var(--header-h) + 60px) 80px 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    text-align: center;
  }
  .home-hero .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 100px;
    background: #0EA5E91A;
    border: 1px solid #0EA5E966;
    font-family: var(--font-heading);
    font-size: 13px;
    font-weight: 600;
    color: var(--primary);
  }
  .home-hero .badge svg {
    width: 16px;
    height: 16px;
  }
  .home-hero h1 {
    font-family: var(--font-heading);
    font-size: 72px;
    font-weight: bold;
    letter-spacing: -2px;
    line-height: 1.1;
    color: var(--white);
    max-width: 900px;
    white-space: pre-line;
  }
  .home-hero p {
    font-family: var(--font-body);
    font-size: 20px;
    color: var(--text-dim);
    line-height: 1.6;
    max-width: 700px;
  }
  .home-hero-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 8px;
  }
  .home-hero-cta .btn-primary {
    background: var(--primary);
    color: #fff;
    padding: 14px 32px;
    font-size: 16px;
    font-family: var(--font-heading);
    font-weight: 600;
    border-radius: var(--radius);
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: none;
  }
  .home-hero-cta .btn-primary:hover { background: var(--primary-dark); }
  .home-hero-cta .btn-outline {
    background: transparent;
    color: #CBD5E1;
    padding: 14px 32px;
    font-size: 16px;
    font-family: var(--font-heading);
    font-weight: 600;
    border: 1px solid #475569;
    border-radius: var(--radius);
    text-decoration: none;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .home-hero-cta .btn-outline:hover { border-color: var(--text-dim); color: #E2E8F0; }

  /* ─── Install snippet ──────────────────────── */
  .home-hero-install {
    background: var(--code-surface);
    border: 1px solid #334155;
    border-radius: var(--radius-lg);
    overflow: hidden;
    width: 480px;
    max-width: 100%;
    margin-top: 8px;
  }
  .home-hero-install-tabs {
    display: flex;
    background: var(--code-bg);
  }
  .home-hero-install-tabs span {
    padding: 10px 18px;
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--primary);
    background: var(--code-surface);
  }
  .home-hero-install-code {
    padding: 14px 20px;
    text-align: left;
  }
  .home-hero-install-code pre {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 13px;
    color: #E2E8F0;
    margin: 0;
    white-space: pre;
    overflow-x: auto;
  }
  .home-hero-install-code .hl-tag { color: #F47067; }
  .home-hero-install-code .hl-attr { color: #79C0FF; }
  .home-hero-install-code .hl-punct { color: #E2E8F0; }
  .home-hero-install-code .hl-string { color: #A5D6FF; }

  @media (max-width: 900px) {
    .home-hero { padding: calc(var(--header-h) + 40px) 24px 60px; }
    .home-hero h1 { font-size: 48px; }
    .home-hero-install { width: auto; max-width: 100%; }
  }
  @media (max-width: 640px) {
    .home-hero { min-height: auto; padding: calc(var(--header-h) + 32px) 20px 48px; }
    .home-hero h1 { font-size: 36px; letter-spacing: -1px; }
    .home-hero p { font-size: 16px; }
    .home-hero-cta { flex-direction: column; width: 100%; }
    .home-hero-cta .btn-primary,
    .home-hero-cta .btn-outline { width: 100%; text-align: center; justify-content: center; }
    .home-hero-install { width: 100%; }
    .home-hero-install-code pre { font-size: 11px; }
  }
  .home-grid-header {
    text-align: center;
    padding: 3rem 2.5rem 0;
    max-width: 1100px;
    margin: 0 auto;
  }
  .home-grid-header h2 {
    font-family: var(--font-heading);
    font-size: 28px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.5px;
  }
  .home-grid-header p {
    font-size: 15px;
    color: var(--text-muted);
    margin-top: 0.5rem;
  }
  .home-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
    padding: 1.5rem 2.5rem 3rem;
    max-width: 1100px;
    margin: 0 auto;
  }
  .card {
    background: var(--surface);
    border-radius: var(--radius-lg);
    padding: 1.25rem 1.5rem;
    border: 1px solid var(--border);
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    display: block;
  }
  .card:hover {
    border-color: var(--primary);
    box-shadow: 0 1px 4px var(--primary-light);
  }
  .card:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
  .card h2 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: var(--text);
  }
  .card p {
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.5;
  }
  .card-placeholder {
    border-style: dashed;
    cursor: default;
  }
  .card-placeholder:hover {
    border-color: var(--border);
    box-shadow: none;
  }
  .card-placeholder h2 { color: var(--text-dim); }
  .card-placeholder p { color: var(--text-dim); }
  .card .tag {
    display: inline-block;
    padding: 0.15rem 0.5rem;
    background: var(--primary-surface);
    color: var(--primary-dark);
    border-radius: var(--radius-sm);
    font-size: 0.7rem;
    font-weight: 600;
    margin-top: 0.75rem;
    letter-spacing: 0.02em;
  }
</style>

<section class="home-hero">
  <span class="badge">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
    Element Plugins
  </span>
  <h1>Declarative UI components with zero JavaScript.</h1>
  <p>Tooltips, modals, dropdowns, tabs, and more. Fully accessible, keyboard-navigable, and built for No.JS.</p>
  <div class="home-hero-cta">
    <a class="btn-primary" route="/getting-started">Get Started</a>
    <a class="btn-outline" href="https://github.com/ErickXavier/nojs-elements" target="_blank">
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      View on GitHub
    </a>
  </div>
  <div class="home-hero-install">
    <div class="home-hero-install-tabs"><span>CDN</span></div>
    <div class="home-hero-install-code">
      <pre><span class="hl-tag">&lt;script</span> <span class="hl-attr">src</span><span class="hl-punct">=</span><span class="hl-string">"https://cdn.no-js.dev/"</span><span class="hl-tag">&gt;&lt;/script&gt;</span>
<span class="hl-tag">&lt;script</span> <span class="hl-attr">src</span><span class="hl-punct">=</span><span class="hl-string">"https://cdn-elements.no-js.dev/"</span><span class="hl-tag">&gt;&lt;/script&gt;</span></pre>
    </div>
  </div>
</section>

<div class="home-grid-header">
  <h2>12 Ready-to-Use Components</h2>
  <p>Drop them into any No.JS project with a single attribute.</p>
</div>

<div class="home-grid">
  <a class="card" route="/dnd">
    <h2>Drag & Drop</h2>
    <p>Sortable lists, Kanban transfers, multi-select, typed zones, and placeholders.</p>
    <span class="tag">drag · drop · drag-list · drag-multiple</span>
  </a>

  <a class="card" route="/dropdown">
    <h2>Dropdown</h2>
    <p>Accessible dropdown menus with keyboard navigation and position variants.</p>
    <span class="tag">dropdown · dropdown-toggle · dropdown-item</span>
  </a>

  <a class="card" route="/modal">
    <h2>Modal</h2>
    <p>Dialog overlays with focus trapping, nested stacking, and backdrop control.</p>
    <span class="tag">modal · modal-open · modal-close</span>
  </a>

  <a class="card" route="/popover">
    <h2>Popover</h2>
    <p>Rich interactive content panels toggled by click, with positioning and light dismiss.</p>
    <span class="tag">popover · popover-trigger · popover-dismiss</span>
  </a>

  <a class="card" route="/skeleton">
    <h2>Skeleton</h2>
    <p>Placeholder shimmer effects with text, circle, and rectangle variants.</p>
    <span class="tag">skeleton · skeleton-type · skeleton-lines</span>
  </a>

  <a class="card" route="/split">
    <h2>Split Pane</h2>
    <p>Resizable split containers with draggable gutters and constraints.</p>
    <span class="tag">split · pane · pane-size</span>
  </a>

  <a class="card" route="/stepper">
    <h2>Stepper</h2>
    <p>Multi-step wizards with linear validation and progress indicators.</p>
    <span class="tag">stepper · step · $stepper</span>
  </a>

  <a class="card" route="/table">
    <h2>Sortable Table</h2>
    <p>Column sorting with type-aware comparison and fixed headers.</p>
    <span class="tag">sortable · sort · sort-type</span>
  </a>

  <a class="card" route="/tabs">
    <h2>Tabs</h2>
    <p>Tabbed navigation with positions, disabled tabs, and keyboard support.</p>
    <span class="tag">tabs · tab · panel</span>
  </a>

  <a class="card" route="/toast">
    <h2>Toast</h2>
    <p>Notification toasts with types, positions, and declarative API.</p>
    <span class="tag">toast · toast-type · toast-container</span>
  </a>

  <a class="card" route="/tooltip">
    <h2>Tooltip</h2>
    <p>Passive text hints on hover/focus with positioning, delay, and reactive disable.</p>
    <span class="tag">tooltip · tooltip-position · tooltip-disabled</span>
  </a>

  <a class="card" route="/tree">
    <h2>Tree</h2>
    <p>Collapsible tree views with nested branches and keyboard navigation.</p>
    <span class="tag">tree · branch · subtree</span>
  </a>

</div>
