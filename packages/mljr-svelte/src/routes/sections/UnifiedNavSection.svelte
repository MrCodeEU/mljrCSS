<script lang="ts">
  import { Card, CodeExample } from '$lib';

  const categories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      items: [
        { id: 'installation', label: 'Installation', href: '#', active: true },
        { id: 'quickstart', label: 'Quick Start', href: '#' },
        { id: 'examples', label: 'Examples', href: '#' },
      ]
    },
    {
      id: 'components',
      name: 'Components',
      items: [
        { id: 'button', label: 'Button', href: '#' },
        { id: 'card', label: 'Card', href: '#' },
        { id: 'input', label: 'Input', href: '#' },
      ]
    },
  ];

  const topLinks = [
    { label: 'Home', href: '#' },
    { label: 'Docs', href: '#' },
    { label: 'About', href: '#' },
  ];
</script>

<section id="unified-nav-section" class="mljr-mb-8">
  <Card title="UnifiedNav" description="Combined sidebar and navbar with floating claymorphic design">
    <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6">
      <!-- Features -->
      <Card title="Features" description="What makes UnifiedNav special">
        <ul class="feature-list">
          <li>
            <strong>Floating Pill Design</strong>
            <span class="feature-desc">Claymorphic 3D appearance with soft shadows</span>
          </li>
          <li>
            <strong>Seamless Integration</strong>
            <span class="feature-desc">Sidebar and top navbar work as one unit</span>
          </li>
          <li>
            <strong>Left & Right Positions</strong>
            <span class="feature-desc">Sidebar can be on either side</span>
          </li>
          <li>
            <strong>Responsive</strong>
            <span class="feature-desc">Adapts to mobile with overlay menu</span>
          </li>
          <li>
            <strong>Built-in Theme Toggle</strong>
            <span class="feature-desc">Dark/light mode switch included</span>
          </li>
          <li>
            <strong>Smooth Animations</strong>
            <span class="feature-desc">Slide transitions and hover effects</span>
          </li>
        </ul>
      </Card>

      <!-- Props -->
      <Card title="Props" description="Configuration options">
        <div class="props-list">
          <div class="prop-item">
            <code>categories</code>
            <span class="prop-type">NavCategory[]</span>
            <span class="prop-desc">Sidebar navigation categories</span>
          </div>
          <div class="prop-item">
            <code>topLinks</code>
            <span class="prop-type">{'{'} label: string; href: string {'}'}[]</span>
            <span class="prop-desc">Top navbar quick links</span>
          </div>
          <div class="prop-item">
            <code>position</code>
            <span class="prop-type">'left' | 'right'</span>
            <span class="prop-desc">Sidebar position (default: 'left')</span>
          </div>
          <div class="prop-item">
            <code>open</code>
            <span class="prop-type">boolean</span>
            <span class="prop-desc">Sidebar open state (bindable)</span>
          </div>
          <div class="prop-item">
            <code>isMobile</code>
            <span class="prop-type">boolean</span>
            <span class="prop-desc">Mobile mode trigger</span>
          </div>
          <div class="prop-item">
            <code>logo</code>
            <span class="prop-type">Snippet</span>
            <span class="prop-desc">Logo content for navbar</span>
          </div>
        </div>
      </Card>
    </div>

    <!-- Position Examples -->
    <div class="mljr-mt-6">
      <h4 class="mljr-h5 mljr-mb-3">Position Variants</h4>
      <div class="demo-container">
        <div class="demo-label">Left Position (default)</div>
        <div class="demo-visual left-demo">
          <div class="demo-topbar">
            <span class="demo-toggle">☰</span>
            <span class="demo-logo">🎨 Logo</span>
            <span class="demo-links">[Links]</span>
            <span class="demo-actions">🌙</span>
          </div>
          <div class="demo-sidebar left">
            <div class="demo-category">
              <div class="demo-cat-title">Category</div>
              <div class="demo-item">Item 1</div>
              <div class="demo-item">Item 2</div>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-container">
        <div class="demo-label">Right Position</div>
        <div class="demo-visual right-demo">
          <div class="demo-topbar">
            <span class="demo-toggle">☰</span>
            <span class="demo-logo">🎨 Logo</span>
            <span class="demo-links">[Links]</span>
            <span class="demo-actions">🌙</span>
          </div>
          <div class="demo-sidebar right">
            <div class="demo-category">
              <div class="demo-cat-title">Category</div>
              <div class="demo-item">Item 1</div>
              <div class="demo-item">Item 2</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Usage Code -->
    <CodeExample code={`&lt;script&gt;
  import { UnifiedNav } from 'mljr-svelte';

  let sidebarOpen = $state(true);
  let isMobile = $state(false);

  const categories = [
    {
      id: 'nav',
      name: 'Navigation',
      items: [
        { id: 'home', label: 'Home', href: '/' },
        { id: 'about', label: 'About', href: '/about' },
      ]
    }
  ];

  const topLinks = [
    { label: 'Docs', href: '#docs' },
    { label: 'Examples', href: '#examples' },
  ];
&lt;/script&gt;

&lt;!-- Left sidebar (default) --&gt;
&lt;UnifiedNav
  {categories}
  {topLinks}
  bind:open={sidebarOpen}
  {isMobile}
&gt;
  {#snippet logo()}
    &lt;a href="/"&gt;MyLogo&lt;/a&gt;
  {/snippet}
&lt;/UnifiedNav&gt;

&lt;!-- Right sidebar --&gt;
&lt;UnifiedNav
  {categories}
  {topLinks}
  position="right"
  bind:open={sidebarOpen}
  {isMobile}
&gt;
  {#snippet logo()}
    &lt;a href="/"&gt;MyLogo&lt;/a&gt;
  {/snippet}
&lt;/UnifiedNav&gt;`} />
  </Card>
</section>

<style>
  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-3);
  }

  .feature-list li {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-1);
    padding: var(--mljr-space-3);
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-md);
    box-shadow: var(--mljr-clay-shadow-xs);
  }

  .feature-list strong {
    color: var(--mljr-text);
    font-size: var(--mljr-text-sm);
  }

  .feature-desc {
    color: var(--mljr-text-secondary);
    font-size: var(--mljr-text-xs);
  }

  .props-list {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-2);
  }

  .prop-item {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-1);
    padding: var(--mljr-space-3);
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-md);
    box-shadow: var(--mljr-clay-shadow-xs);
  }

  .prop-item code {
    font-family: ui-monospace, monospace;
    font-size: var(--mljr-text-sm);
    color: var(--mljr-primary-600);
    font-weight: 600;
  }

  .prop-type {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-secondary-600);
    font-family: ui-monospace, monospace;
  }

  .prop-desc {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-secondary);
  }

  .demo-container {
    margin-bottom: var(--mljr-space-4);
  }

  .demo-label {
    font-size: var(--mljr-text-sm);
    font-weight: 600;
    color: var(--mljr-text);
    margin-bottom: var(--mljr-space-2);
  }

  .demo-visual {
    position: relative;
    height: 200px;
    background: linear-gradient(145deg, var(--mljr-bg-secondary) 0%, var(--mljr-bg-tertiary) 100%);
    border-radius: var(--mljr-radius-xl);
    padding: var(--mljr-space-4);
    overflow: hidden;
    box-shadow: var(--mljr-clay-inset-sm);
  }

  .demo-topbar {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
    padding: var(--mljr-space-2) var(--mljr-space-3);
    background: linear-gradient(145deg, var(--mljr-bg) 0%, var(--mljr-bg-secondary) 100%);
    border-radius: var(--mljr-radius-lg);
    box-shadow:
      4px 4px 12px rgba(0, 0, 0, 0.1),
      -2px -2px 6px rgba(255, 255, 255, 0.6);
  }

  .demo-toggle {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-md);
    box-shadow: var(--mljr-clay-shadow-xs);
  }

  .demo-logo {
    font-weight: 700;
  }

  .demo-links {
    flex: 1;
    text-align: center;
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-secondary);
  }

  .demo-actions {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-md);
    box-shadow: var(--mljr-clay-shadow-xs);
  }

  .demo-sidebar {
    position: absolute;
    top: 70px;
    width: 140px;
    padding: var(--mljr-space-3);
    background: linear-gradient(145deg, var(--mljr-bg) 0%, var(--mljr-bg-secondary) 100%);
    border-radius: var(--mljr-radius-lg);
    box-shadow:
      4px 4px 12px rgba(0, 0, 0, 0.1),
      -2px -2px 6px rgba(255, 255, 255, 0.6);
  }

  .demo-sidebar.left {
    left: var(--mljr-space-4);
  }

  .demo-sidebar.right {
    right: var(--mljr-space-4);
  }

  .demo-category {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-1);
  }

  .demo-cat-title {
    font-size: var(--mljr-text-xs);
    font-weight: 700;
    text-transform: uppercase;
    color: var(--mljr-text-muted);
    margin-bottom: var(--mljr-space-1);
  }

  .demo-item {
    padding: var(--mljr-space-1) var(--mljr-space-2);
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-md);
    font-size: var(--mljr-text-xs);
    box-shadow: var(--mljr-clay-shadow-xs);
  }
</style>
