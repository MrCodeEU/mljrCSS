<script lang="ts">
  import { Card, Dock, CodeExample, type DockItem } from '$lib';

  let activeItem = $state('home');

  const dockItems: DockItem[] = [
    { id: 'home', label: 'Home', icon: 'mdi:home', active: true },
    { id: 'search', label: 'Search', icon: 'mdi:magnify' },
    { id: 'favorites', label: 'Favorites', icon: 'mdi:heart-outline', badge: 5 },
    { id: 'profile', label: 'Profile', icon: 'mdi:account-circle-outline' },
  ];

  const dockWithDivider: DockItem[] = [
    { id: 'home', label: 'Home', icon: 'mdi:home', active: true },
    { id: 'explore', label: 'Explore', icon: 'mdi:compass-outline' },
    { id: 'create', label: 'Create', icon: 'mdi:plus-circle', dividerBefore: true },
    { id: 'messages', label: 'Messages', icon: 'mdi:message-outline', badge: 3, dividerBefore: true },
    { id: 'profile', label: 'Profile', icon: 'mdi:account-circle-outline' },
  ];

  const appsItems: DockItem[] = [
    { id: 'finder', label: 'Finder', icon: 'mdi:folder' },
    { id: 'chrome', label: 'Browser', icon: 'mdi:web' },
    { id: 'mail', label: 'Mail', icon: 'mdi:email', badge: 7 },
    { id: 'music', label: 'Music', icon: 'mdi:music', dividerBefore: true },
    { id: 'photos', label: 'Photos', icon: 'mdi:image' },
    { id: 'settings', label: 'Settings', icon: 'mdi:cog', dividerBefore: true },
  ];

  function handleItemClick(item: DockItem) {
    activeItem = item.id;
    // Update active state
    dockItems.forEach(i => i.active = i.id === item.id);
  }
</script>

<section id="dock" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-gap-6">

    <!-- Default Dock -->
    <Card title="Default Dock" description="Bottom navigation dock with icons and labels">
      <div class="demo-area">
        <p class="demo-hint">Bottom navigation dock with labels</p>
        <div class="demo-dock-container">
          <Dock items={dockItems} onItemClick={handleItemClick} />
        </div>
      </div>
    </Card>

    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <!-- Icons only -->
      <Card title="Icons Only" description="Compact dock without labels">
        <div class="demo-area">
          <div class="demo-dock-container">
            <Dock items={dockItems} showLabels={false} />
          </div>
        </div>
      </Card>

      <!-- With dividers -->
      <Card title="With Dividers" description="Grouped items with dividers">
        <div class="demo-area">
          <div class="demo-dock-container">
            <Dock items={dockWithDivider} />
          </div>
        </div>
      </Card>
    </div>

    <!-- macOS-style -->
    <Card title="macOS-Style Dock" description="Frosted glass variant with zoom effect">
      <div class="demo-area macos-bg">
        <div class="demo-dock-container">
          <Dock items={appsItems} variant="frosted" zoom showLabels={false} />
        </div>
      </div>
    </Card>

    <!-- Size Variants -->
    <Card title="Size Variants" description="Small, medium (default), and large docks">
      <div class="demo-area-stacked">
        <div>
          <p class="size-label">Small</p>
          <Dock items={dockItems.slice(0, 4)} size="sm" showLabels={false} />
        </div>
        <div>
          <p class="size-label">Medium (default)</p>
          <Dock items={dockItems.slice(0, 4)} size="md" />
        </div>
        <div>
          <p class="size-label">Large</p>
          <Dock items={dockItems.slice(0, 4)} size="lg" />
        </div>
      </div>
    </Card>

    <CodeExample code={`<script lang="ts">
  import { Dock, type DockItem } from 'mljr-svelte';

  const items: DockItem[] = [
    { id: 'home', label: 'Home', icon: 'mdi:home', active: true },
    { id: 'search', label: 'Search', icon: 'mdi:magnify' },
    { id: 'profile', label: 'Profile', icon: 'mdi:account-circle-outline' },
    { id: 'settings', label: 'Settings', icon: 'mdi:cog', dividerBefore: true },
  ];
&lt;/script&gt;

&lt;!-- Default dock --&gt;
&lt;Dock {items} /&gt;

&lt;!-- Fixed to bottom of viewport --&gt;
&lt;Dock {items} fixed /&gt;

&lt;!-- macOS-style frosted glass with zoom --&gt;
&lt;Dock {items} variant="frosted" zoom showLabels={false} /&gt;

&lt;!-- Icons only --&gt;
&lt;Dock {items} showLabels={false} size="sm" /&gt;`} />
  </div>
</section>

<style>
  .demo-area {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-lg);
    min-height: 120px;
    justify-content: center;
  }

  .demo-area.macos-bg {
    background: linear-gradient(
      135deg,
      var(--mljr-primary-100) 0%,
      var(--mljr-secondary-100) 100%
    );
  }

  .demo-area-stacked {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-lg);
  }

  .demo-hint {
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-muted);
    margin: 0;
  }

  .demo-dock-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .size-label {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-muted);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 0.5rem 0;
  }
</style>
