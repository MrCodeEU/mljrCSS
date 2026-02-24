<script lang="ts">
  import { Dock } from '$lib';
  import type { DockItem } from '$lib';

  const items: DockItem[] = [
    { id: 'home', label: 'Home', icon: 'mdi:home', active: true },
    { id: 'search', label: 'Search', icon: 'mdi:magnify' },
    { id: 'notifications', label: 'Notifications', icon: 'mdi:bell', badge: 5 },
    { id: 'profile', label: 'Profile', icon: 'mdi:account-circle' },
    { id: 'settings', label: 'Settings', icon: 'mdi:cog', dividerBefore: true },
  ];

  let lastClicked = $state('');
</script>

<div class="mljr-space-y-8">
  <!-- Default Dock -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Default Dock</h3>
    <div style="padding: 2rem; background: var(--mljr-bg-secondary); border-radius: var(--mljr-radius-md); display: flex; align-items: center; justify-content: center;">
      <Dock
        {items}
        onItemClick={(item) => lastClicked = item.label}
      />
    </div>
    {#if lastClicked}
      <p class="mljr-text-sm mljr-mt-2">Clicked: <strong>{lastClicked}</strong></p>
    {/if}
  </section>

  <!-- Frosted Glass Dock -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Frosted Glass Variant</h3>
    <div style="padding: 2rem; background: linear-gradient(135deg, var(--mljr-primary-100), var(--mljr-secondary-100)); border-radius: var(--mljr-radius-md); display: flex; align-items: center; justify-content: center;">
      <Dock
        {items}
        variant="frosted"
      />
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-space-y-4">
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Small</p>
        <Dock items={items.slice(0, 4)} size="sm" />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Medium (Default)</p>
        <Dock items={items.slice(0, 4)} size="md" />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Large</p>
        <Dock items={items.slice(0, 4)} size="lg" />
      </div>
    </div>
  </section>

  <!-- No Labels + Zoom -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Icons Only with Zoom Effect</h3>
    <div style="padding: 2rem; background: var(--mljr-bg-secondary); border-radius: var(--mljr-radius-md); display: flex; align-items: center; justify-content: center;">
      <Dock
        {items}
        showLabels={false}
        zoom={true}
      />
    </div>
    <p class="mljr-text-muted mljr-text-sm mljr-mt-2">Hover to see zoom effect</p>
  </section>

  <!-- Full Width Variant -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Full Width</h3>
    <Dock
      {items}
      variant="full"
    />
  </section>
</div>
