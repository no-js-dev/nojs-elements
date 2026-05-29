<style>
  .stepper-demo { margin-bottom: 2rem; }
  .step-content { padding: 1.5rem; background: var(--white); border-radius: 8px; margin-top: 1rem; }
  .step-content h3 { margin-top: 0; }
  .form-group { margin-bottom: 1rem; }
  .form-group label { display: block; margin-bottom: 0.25rem; font-weight: 600; }
  .form-group input {
    width: 100%; padding: 0.5rem; border: 1px solid var(--border);
    border-radius: 4px; font-size: 1rem; box-sizing: border-box;
  }
  .summary-row { padding: 0.5rem 0; border-bottom: 1px solid var(--border); }
  .summary-label { font-weight: 600; color: var(--text-muted); }
  .btn-secondary { background: var(--border); color: var(--text-secondary); border-color: var(--border); }
  .btn-group { margin-top: 1rem; display: flex; gap: 0.5rem; }
  .nojs-stepper-nav {
    margin-top: 1rem;
  }
  .nojs-stepper-nav button {
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.5rem 1.25rem;
    border-radius: 4px;
    font-size: 0.95rem;
    cursor: pointer;
  }
</style>

<div class="route-header">
  <span class="route-badge">Navigation</span>
  <h1>Stepper</h1>
  <p>Multi-step forms and wizards with built-in validation and navigation.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Multi-step wizard with built-in progress indicator, validation, and navigation. Supports linear mode (validates before advancing) and free mode (jump to any step). Exposes a <code>$stepper</code> context API for custom navigation controls.</p>

  <h3>Stepper Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>stepper</code></td><td>number (0-based)</td><td><code>0</code></td><td>Initial step index</td></tr>
      <tr><td><code>stepper-mode</code></td><td><code>"linear"</code> | <code>"free"</code></td><td><code>"linear"</code></td><td>Navigation mode. Linear validates before advancing; free allows clicking any step</td></tr>
      <tr><td><code>stepper-nav</code></td><td><code>"true"</code> | <code>"false"</code></td><td><code>"true"</code></td><td>Show or hide the built-in Previous/Next buttons</td></tr>
      <tr><td><code>stepper-indicator</code></td><td><code>"true"</code> | <code>"false"</code></td><td><code>"true"</code></td><td>Show or hide the progress indicator bar</td></tr>
    </tbody>
  </table>

  <h3>Step Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>step</code></td><td>boolean attr</td><td><em>required</em></td><td>Marks an element as a step panel</td></tr>
      <tr><td><code>step-label</code></td><td>string</td><td><code>"Step N"</code></td><td>Custom label shown in the progress indicator</td></tr>
      <tr><td><code>step-validate</code></td><td>expression</td><td>--</td><td>Expression that must be truthy for the step to pass validation (linear mode)</td></tr>
    </tbody>
  </table>

  <h3><code>$stepper</code> Context API</h3>
  <table class="docs-table">
    <thead><tr><th>Member</th><th>Type</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>$stepper.next()</code></td><td>method</td><td>Advance to the next step (validates in linear mode). Returns <code>false</code> if validation fails</td></tr>
      <tr><td><code>$stepper.prev()</code></td><td>method</td><td>Go back to the previous step. Returns <code>false</code> if already on the first step</td></tr>
      <tr><td><code>$stepper.goTo(index)</code></td><td>method</td><td>Jump to a specific step. In linear mode, validates all intermediate steps forward</td></tr>
      <tr><td><code>$stepper.current</code></td><td>number</td><td>Current step index (0-based)</td></tr>
      <tr><td><code>$stepper.total</code></td><td>number</td><td>Total number of steps</td></tr>
      <tr><td><code>$stepper.isFirst</code></td><td>boolean</td><td><code>true</code> when on the first step</td></tr>
      <tr><td><code>$stepper.isLast</code></td><td>boolean</td><td><code>true</code> when on the last step</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Adds <code>role="group"</code> and <code>aria-label</code> on the container, <code>role="tablist"</code> on the indicator, <code>role="tab"</code> with <code>aria-selected</code> on each indicator item, <code>role="tabpanel"</code> on each step, <code>aria-controls</code>/<code>aria-labelledby</code> linking tabs to panels, and <code>aria-hidden</code>/<code>inert</code> on inactive steps. Arrow keys navigate the indicator in free mode.</p>

</section>

<!-- Linear Stepper -->
<section class="demo-section">
  <h2>Linear Stepper</h2>
  <p>Steps must be completed in order. Required fields are validated before advancing.</p>
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
      <div state="{ name: '', email: '', street: '', city: '' }">
        <div stepper>
          <div step step-label="Personal Info">
            <div class="step-content">
              <h3>Personal Information</h3>
              <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" model="name" required placeholder="Enter your name" />
              </div>
              <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" model="email" required placeholder="Enter your email" />
              </div>
            </div>
          </div>

          <div step step-label="Address">
            <div class="step-content">
              <h3>Address Details</h3>
              <div class="form-group">
                <label for="street">Street</label>
                <input type="text" id="street" model="street" required placeholder="Enter your street" />
              </div>
              <div class="form-group">
                <label for="city">City</label>
                <input type="text" id="city" model="city" required placeholder="Enter your city" />
              </div>
            </div>
          </div>

          <div step step-label="Review">
            <div class="step-content">
              <h3>Review Your Info</h3>
              <div class="summary-row">
                <span class="summary-label">Name:</span>
                <span bind="name"></span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Email:</span>
                <span bind="email"></span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Street:</span>
                <span bind="street"></span>
              </div>
              <div class="summary-row">
                <span class="summary-label">City:</span>
                <span bind="city"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">state</span><span class="hl-op">=</span><span class="hl-str">"{ name: '', email: '', street: '', city: '' }"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">stepper</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>
<span class="ln"> 4</span>    <span class="hl-cmt">&lt;!-- Step 1: Personal Info --&gt;</span>
<span class="ln"> 5</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">step</span> <span class="hl-attr">step-label</span><span class="hl-op">=</span><span class="hl-str">"Personal Info"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 6</span>      <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Personal Information</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln"> 7</span>      <span class="hl-tag">&lt;label&gt;</span><span class="hl-expr">Full Name</span><span class="hl-tag">&lt;/label&gt;</span>
<span class="ln"> 8</span>      <span class="hl-tag">&lt;input</span> <span class="hl-attr">type</span><span class="hl-op">=</span><span class="hl-str">"text"</span>
<span class="ln"> 9</span>        <span class="hl-attr">model</span><span class="hl-op">=</span><span class="hl-str">"name"</span> <span class="hl-attr">required</span> <span class="hl-tag">/&gt;</span>
<span class="ln">10</span>      <span class="hl-tag">&lt;label&gt;</span><span class="hl-expr">Email Address</span><span class="hl-tag">&lt;/label&gt;</span>
<span class="ln">11</span>      <span class="hl-tag">&lt;input</span> <span class="hl-attr">type</span><span class="hl-op">=</span><span class="hl-str">"email"</span>
<span class="ln">12</span>        <span class="hl-attr">model</span><span class="hl-op">=</span><span class="hl-str">"email"</span> <span class="hl-attr">required</span> <span class="hl-tag">/&gt;</span>
<span class="ln">13</span>    <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">14</span>
<span class="ln">15</span>    <span class="hl-cmt">&lt;!-- Step 2: Address --&gt;</span>
<span class="ln">16</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">step</span> <span class="hl-attr">step-label</span><span class="hl-op">=</span><span class="hl-str">"Address"</span><span class="hl-tag">&gt;</span>
<span class="ln">17</span>      <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Address Details</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln">18</span>      <span class="hl-tag">&lt;label&gt;</span><span class="hl-expr">Street</span><span class="hl-tag">&lt;/label&gt;</span>
<span class="ln">19</span>      <span class="hl-tag">&lt;input</span> <span class="hl-attr">type</span><span class="hl-op">=</span><span class="hl-str">"text"</span>
<span class="ln">20</span>        <span class="hl-attr">model</span><span class="hl-op">=</span><span class="hl-str">"street"</span> <span class="hl-attr">required</span> <span class="hl-tag">/&gt;</span>
<span class="ln">21</span>      <span class="hl-tag">&lt;label&gt;</span><span class="hl-expr">City</span><span class="hl-tag">&lt;/label&gt;</span>
<span class="ln">22</span>      <span class="hl-tag">&lt;input</span> <span class="hl-attr">type</span><span class="hl-op">=</span><span class="hl-str">"text"</span>
<span class="ln">23</span>        <span class="hl-attr">model</span><span class="hl-op">=</span><span class="hl-str">"city"</span> <span class="hl-attr">required</span> <span class="hl-tag">/&gt;</span>
<span class="ln">24</span>    <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">25</span>
<span class="ln">26</span>    <span class="hl-cmt">&lt;!-- Step 3: Review --&gt;</span>
<span class="ln">27</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">step</span> <span class="hl-attr">step-label</span><span class="hl-op">=</span><span class="hl-str">"Review"</span><span class="hl-tag">&gt;</span>
<span class="ln">28</span>      <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Review Your Info</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln">29</span>      <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Name: </span><span class="hl-tag">&lt;span</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"name"</span><span class="hl-tag">&gt;&lt;/span&gt;&lt;/p&gt;</span>
<span class="ln">30</span>      <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Email: </span><span class="hl-tag">&lt;span</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"email"</span><span class="hl-tag">&gt;&lt;/span&gt;&lt;/p&gt;</span>
<span class="ln">31</span>      <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Street: </span><span class="hl-tag">&lt;span</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"street"</span><span class="hl-tag">&gt;&lt;/span&gt;&lt;/p&gt;</span>
<span class="ln">32</span>      <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">City: </span><span class="hl-tag">&lt;span</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"city"</span><span class="hl-tag">&gt;&lt;/span&gt;&lt;/p&gt;</span>
<span class="ln">33</span>    <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">34</span>
<span class="ln">35</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">36</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Free Mode Stepper -->
<section class="demo-section">
  <h2>Free Mode Stepper</h2>
  <p>Click any step indicator to jump directly to that step.</p>
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
      <div stepper stepper-mode="free">
        <div step step-label="Account">
          <div class="step-content">
            <h3>Account Setup</h3>
            <p>Configure your account username and password.</p>
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" placeholder="Choose a username" />
            </div>
          </div>
        </div>

        <div step step-label="Profile">
          <div class="step-content">
            <h3>Profile Details</h3>
            <p>Add your profile information and bio.</p>
            <div class="form-group">
              <label for="bio">Bio</label>
              <input type="text" id="bio" placeholder="Tell us about yourself" />
            </div>
          </div>
        </div>

        <div step step-label="Review">
          <div class="step-content">
            <h3>Review</h3>
            <p>Review your account and profile details before submitting.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">stepper</span> <span class="hl-attr">stepper-mode</span><span class="hl-op">=</span><span class="hl-str">"free"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>
<span class="ln"> 3</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">step</span> <span class="hl-attr">step-label</span><span class="hl-op">=</span><span class="hl-str">"Account"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 4</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Account Setup</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln"> 5</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Configure your account username</span>
<span class="ln"> 6</span>       <span class="hl-expr">and password.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 7</span>    <span class="hl-tag">&lt;label&gt;</span><span class="hl-expr">Username</span><span class="hl-tag">&lt;/label&gt;</span>
<span class="ln"> 8</span>    <span class="hl-tag">&lt;input</span> <span class="hl-attr">type</span><span class="hl-op">=</span><span class="hl-str">"text"</span>
<span class="ln"> 9</span>      <span class="hl-attr">placeholder</span><span class="hl-op">=</span><span class="hl-str">"Choose a username"</span> <span class="hl-tag">/&gt;</span>
<span class="ln">10</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">11</span>
<span class="ln">12</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">step</span> <span class="hl-attr">step-label</span><span class="hl-op">=</span><span class="hl-str">"Profile"</span><span class="hl-tag">&gt;</span>
<span class="ln">13</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Profile Details</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln">14</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Add your profile information</span>
<span class="ln">15</span>       <span class="hl-expr">and bio.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">16</span>    <span class="hl-tag">&lt;label&gt;</span><span class="hl-expr">Bio</span><span class="hl-tag">&lt;/label&gt;</span>
<span class="ln">17</span>    <span class="hl-tag">&lt;input</span> <span class="hl-attr">type</span><span class="hl-op">=</span><span class="hl-str">"text"</span>
<span class="ln">18</span>      <span class="hl-attr">placeholder</span><span class="hl-op">=</span><span class="hl-str">"Tell us about yourself"</span> <span class="hl-tag">/&gt;</span>
<span class="ln">19</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">20</span>
<span class="ln">21</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">step</span> <span class="hl-attr">step-label</span><span class="hl-op">=</span><span class="hl-str">"Review"</span><span class="hl-tag">&gt;</span>
<span class="ln">22</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Review</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln">23</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Review your account and profile</span>
<span class="ln">24</span>       <span class="hl-expr">details before submitting.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">25</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">26</span>
<span class="ln">27</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Manual Navigation Stepper -->
<section class="demo-section">
  <h2>No Built-in Navigation</h2>
  <p>Navigation indicators and buttons are hidden. Use custom buttons to control the stepper.</p>
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
      <div state="{}">
        <div stepper stepper-nav="false" stepper-indicator="false">
          <div step step-label="Step 1">
            <div class="step-content">
              <h3>First Step</h3>
              <p>This is the first step with manual navigation.</p>
            </div>
          </div>

          <div step step-label="Step 2">
            <div class="step-content">
              <h3>Second Step</h3>
              <p>This is the second step with manual navigation.</p>
            </div>
          </div>

          <div step step-label="Step 3">
            <div class="step-content">
              <h3>Third Step</h3>
              <p>This is the final step with manual navigation.</p>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <button class="btn btn-secondary" on:click="$stepper.prev()">Previous</button>
          <button class="btn btn-primary" on:click="$stepper.next()">Next</button>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">stepper</span>
<span class="ln"> 2</span>  <span class="hl-attr">stepper-nav</span><span class="hl-op">=</span><span class="hl-str">"false"</span>
<span class="ln"> 3</span>  <span class="hl-attr">stepper-indicator</span><span class="hl-op">=</span><span class="hl-str">"false"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 4</span>
<span class="ln"> 5</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">step</span> <span class="hl-attr">step-label</span><span class="hl-op">=</span><span class="hl-str">"Step 1"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 6</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">First Step</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln"> 7</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">This is the first step with</span>
<span class="ln"> 8</span>       <span class="hl-expr">manual navigation.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 9</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">10</span>
<span class="ln">11</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">step</span> <span class="hl-attr">step-label</span><span class="hl-op">=</span><span class="hl-str">"Step 2"</span><span class="hl-tag">&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Second Step</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln">13</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">This is the second step with</span>
<span class="ln">14</span>       <span class="hl-expr">manual navigation.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">15</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">16</span>
<span class="ln">17</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">step</span> <span class="hl-attr">step-label</span><span class="hl-op">=</span><span class="hl-str">"Step 3"</span><span class="hl-tag">&gt;</span>
<span class="ln">18</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Third Step</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln">19</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">This is the final step with</span>
<span class="ln">20</span>       <span class="hl-expr">manual navigation.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">21</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">22</span>
<span class="ln">23</span><span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">24</span>
<span class="ln">25</span><span class="hl-cmt">&lt;!-- Custom navigation buttons --&gt;</span>
<span class="ln">26</span><span class="hl-tag">&lt;button</span> <span class="hl-attr">on:click</span><span class="hl-op">=</span><span class="hl-str">"$stepper.prev()"</span><span class="hl-tag">&gt;</span>
<span class="ln">27</span>  <span class="hl-expr">Previous</span>
<span class="ln">28</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">29</span><span class="hl-tag">&lt;button</span> <span class="hl-attr">on:click</span><span class="hl-op">=</span><span class="hl-str">"$stepper.next()"</span><span class="hl-tag">&gt;</span>
<span class="ln">30</span>  <span class="hl-expr">Next</span>
<span class="ln">31</span><span class="hl-tag">&lt;/button&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

</div>
