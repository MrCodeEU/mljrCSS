<script lang="ts">
  import { Card, Sidebar, Button, CodeExample } from '$lib';

  let demoSidebarOpen = $state(true);

  const demoCategories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      items: [
        { id: 'installation', label: 'Installation', href: '#installation' },
        { id: 'quickstart', label: 'Quick Start', href: '#quickstart', active: true },
        { id: 'examples', label: 'Examples', href: '#examples' },
      ]
    },
    {
      id: 'components',
      name: 'Components',
      items: [
        { id: 'button', label: 'Button', href: '#button' },
        { id: 'card', label: 'Card', href: '#card' },
        { id: 'input', label: 'Input', href: '#input' },
        { id: 'modal', label: 'Modal', href: '#modal' },
      ]
    },
  ];
</script>

<section id="sidebar" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-gap-6">
    <Card title="Collapsible Sidebar Demo" description="Click the toggle button to show/hide">
      <div class="demo-container">
        <Button onclick={() => demoSidebarOpen = !demoSidebarOpen}>
          {demoSidebarOpen ? 'Close' : 'Open'} Sidebar
        </Button>
        
        <div class="demo-wrapper">
          <!-- Real Sidebar Component Demo -->
          <div class="demo-sidebar-wrapper" style="width: {demoSidebarOpen ? '280px' : '0'};">
            <Sidebar 
              categories={demoCategories} 
              bind:open={demoSidebarOpen}
            />
          </div>
          
          <!-- Demo Content -->
          <div class="demo-content">
            <h4 class="mljr-h4">Main Content</h4>
            <p class="mljr-text-secondary">This area adjusts when sidebar toggles.</p>
            <p class="mljr-text-sm mljr-text-muted mljr-mt-4">
              State: {demoSidebarOpen ? 'Open' : 'Closed'}
            </p>
          </div>
        </div>
      </div>
    </Card>

    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <Card title="Features" description="Claymorphism sidebar capabilities">
        <ul class="feature-list">
          <li>✓ Fully collapsible with smooth animation</li>
          <li>✓ Claymorphic elevated cards</li>
          <li>✓ Thick claymorphism scrollbar (24px)</li>
          <li>✓ Rounded corners & soft shadows</li>
          <li>✓ Mobile overlay with backdrop blur</li>
          <li>✓ Open/close button with lift effect</li>
          <li>✓ Dark mode enhanced shadows</li>
        </ul>
      </Card>

      <Card title="Usage" description="Simple implementation">
        <CodeExample code={`<Sidebar
  categories={categories}
  bind:open={sidebarOpen}
  showOverlay={true}
/>`} />
      </Card>
    </div>
  </div>

  <CodeExample code={`let sidebarOpen = $state(true);

// Example categories structure:

const categories = [
  {
    id: 'section',
    name: 'Section Name',
    items: [
      { id: 'item1', label: 'Item 1', href: '#item1' },
      { id: 'item2', label: 'Item 2', href: '#item2', active: true },
    ]
  }
];

<Button onclick={() => sidebarOpen = !sidebarOpen}>
  Toggle Sidebar
</Button>

<Sidebar
  {categories}
  bind:open={sidebarOpen}
  showOverlay={true}
/>

// Fixed sidebar (always visible on desktop)
<Sidebar
  {categories}
  fixed
  defaultOpen={true}
/>`} />
</section>

<style>
  .demo-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .demo-wrapper {
    display: flex;
    border-radius: var(--mljr-radius-xl);
    overflow: hidden;
    background: var(--mljr-bg);
    min-height: 300px;
    box-shadow: var(--mljr-clay-inset-sm);
  }

  .demo-sidebar-wrapper {
    transition: width 0.3s ease;
    overflow: hidden;
    flex-shrink: 0;
  }

  .demo-sidebar {
    width: 240px;
    height: 100%;
    background: var(--mljr-bg);
    display: flex;
    flex-direction: column;
    margin: var(--mljr-space-2);
    margin-right: 0;
    border-radius: 0 var(--mljr-radius-lg) var(--mljr-radius-lg) 0;
    box-shadow: 4px 0 12px rgba(0, 0, 0, 0.05);
  }

  .demo-sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--mljr-space-3);
    margin: var(--mljr-space-2);
    margin-bottom: var(--mljr-space-1);
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-md);
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .demo-close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background: var(--mljr-bg);
    border: none;
    border-radius: var(--mljr-radius-md);
    color: var(--mljr-text-muted);
    cursor: pointer;
    box-shadow: var(--mljr-clay-btn);
    transition: all var(--mljr-transition-fast);
  }

  .demo-close-btn:hover {
    transform: translateY(-1px);
    box-shadow: var(--mljr-clay-shadow);
    color: var(--mljr-text);
  }
  
  .demo-close-btn:active {
    transform: translateY(0);
    box-shadow: var(--mljr-clay-btn-pressed);
  }

  .demo-open-btn {
    position: absolute;
    top: var(--mljr-space-3);
    left: var(--mljr-space-3);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: var(--mljr-bg);
    border: none;
    border-radius: var(--mljr-radius-lg);
    color: var(--mljr-text);
    cursor: pointer;
    box-shadow: var(--mljr-clay-shadow);
    transition: all var(--mljr-transition-fast);
  }

  .demo-open-btn:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: var(--mljr-clay-shadow-lg);
  }

  .demo-open-btn:active {
    transform: translateY(-1px);
    box-shadow: var(--mljr-clay-btn-pressed);
  }

  .demo-sidebar-nav {
    flex: 1;
    overflow-y: auto;
    padding: var(--mljr-space-2);
    margin: var(--mljr-space-2);
    margin-top: 0;
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-md);
    box-shadow: var(--mljr-clay-inset-sm);
  }

  .demo-sidebar-nav::-webkit-scrollbar {
    width: 16px;
  }

  .demo-sidebar-nav::-webkit-scrollbar-track {
    background: var(--mljr-bg-tertiary);
    border-radius: var(--mljr-radius-full);
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.08), inset -2px -2px 4px rgba(255, 255, 255, 0.5);
    margin: 4px;
  }

  .demo-sidebar-nav::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, var(--mljr-primary-300), var(--mljr-primary-500));
    border-radius: var(--mljr-radius-full);
    box-shadow: 2px 2px 4px rgba(249, 115, 22, 0.25), -1px -1px 2px rgba(255, 255, 255, 0.4);
    border: 3px solid transparent;
    background-clip: content-box;
  }

  .demo-category {
    margin-bottom: var(--mljr-space-3);
    padding: var(--mljr-space-2);
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-md);
    box-shadow: var(--mljr-clay-shadow-xs);
  }

  .demo-category:last-child {
    margin-bottom: 0;
  }

  .demo-category-title {
    font-size: var(--mljr-text-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--mljr-text-muted);
    margin-bottom: var(--mljr-space-2);
    padding-left: var(--mljr-space-2);
  }

  .demo-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .demo-link {
    display: block;
    padding: var(--mljr-space-2) var(--mljr-space-3);
    margin-bottom: var(--mljr-space-1);
    color: var(--mljr-text-secondary);
    text-decoration: none;
    border-radius: var(--mljr-radius-md);
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    background: var(--mljr-bg-secondary);
    box-shadow: var(--mljr-clay-shadow-xs);
    transition: all var(--mljr-transition-fast);
  }

  .demo-link:last-child {
    margin-bottom: 0;
  }

  .demo-link:hover {
    transform: translateX(2px);
    background: var(--mljr-bg);
    box-shadow: var(--mljr-clay-shadow-sm);
    color: var(--mljr-text);
  }

  .demo-link.active {
    background: var(--mljr-primary-100);
    color: var(--mljr-primary-700);
    box-shadow: var(--mljr-clay-shadow-xs), inset 0 0 0 1px var(--mljr-primary-300);
  }

  .demo-content {
    flex: 1;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: var(--mljr-bg);
  }

  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .feature-list li {
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-secondary);
  }

  @media (max-width: 768px) {
    .feature-list {
      grid-template-columns: 1fr;
    }
  }
</style>
