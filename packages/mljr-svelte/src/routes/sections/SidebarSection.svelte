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
          <Sidebar
            categories={demoCategories}
            bind:open={demoSidebarOpen}
            contained
          />
          
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
