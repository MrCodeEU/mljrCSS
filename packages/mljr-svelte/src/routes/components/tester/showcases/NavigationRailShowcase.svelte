<script lang="ts">
  import { NavigationRail } from '$lib';
  import type { NavRailItem } from '$lib';

  const mainItems: NavRailItem[] = [
    { id: 'home', label: 'Home', icon: 'mdi:home', active: true },
    { id: 'explore', label: 'Explore', icon: 'mdi:compass' },
    { id: 'notifications', label: 'Notifications', icon: 'mdi:bell', badge: 3 },
    { id: 'messages', label: 'Messages', icon: 'mdi:message' },
    { id: 'bookmarks', label: 'Bookmarks', icon: 'mdi:bookmark' },
  ];

  const footerItems: NavRailItem[] = [
    { id: 'settings', label: 'Settings', icon: 'mdi:cog' },
    { id: 'profile', label: 'Profile', icon: 'mdi:account-circle' },
  ];

  let activeId = $state('home');
  let expanded = $state(false);
  let lastClicked = $state('');

  const activeItems: NavRailItem[] = mainItems.map(item => ({
    ...item,
    active: item.id === activeId,
  }));
</script>

<div class="mljr-space-y-8">
  <!-- Collapsed (icon-only) -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Collapsed (Icon + Label)</h3>
    <div style="display: flex; height: 380px; border: 1px solid var(--mljr-border); border-radius: var(--mljr-radius-md); overflow: hidden;">
      <NavigationRail
        items={mainItems}
        footerItems={footerItems}
        showLabels={true}
        onItemClick={(item) => lastClicked = item.label}
      />
      <div style="flex: 1; padding: 1.5rem; background: var(--mljr-bg-secondary);">
        <p class="mljr-text-muted mljr-text-sm">Main content area</p>
        {#if lastClicked}
          <p class="mljr-mt-2 mljr-text-sm">Clicked: <strong>{lastClicked}</strong></p>
        {/if}
      </div>
    </div>
  </section>

  <!-- Expandable Rail -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Expandable Navigation Rail</h3>
    <div style="display: flex; height: 380px; border: 1px solid var(--mljr-border); border-radius: var(--mljr-radius-md); overflow: hidden;">
      <NavigationRail
        items={mainItems}
        footerItems={footerItems}
        bind:expanded
        onToggle={(v) => expanded = v}
      />
      <div style="flex: 1; padding: 1.5rem; background: var(--mljr-bg-secondary);">
        <p class="mljr-text-muted mljr-text-sm">Content area</p>
        <p class="mljr-text-sm mljr-mt-2">Rail is: <strong>{expanded ? 'Expanded' : 'Collapsed'}</strong></p>
      </div>
    </div>
  </section>

  <!-- No Labels -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Icon Only (No Labels)</h3>
    <div style="display: flex; height: 320px; border: 1px solid var(--mljr-border); border-radius: var(--mljr-radius-md); overflow: hidden;">
      <NavigationRail
        items={mainItems}
        showLabels={false}
      />
      <div style="flex: 1; padding: 1.5rem; background: var(--mljr-bg-secondary);">
        <p class="mljr-text-muted mljr-text-sm">Hover over icons for tooltips</p>
      </div>
    </div>
  </section>
</div>
