<script lang="ts">
  import { Card, NavigationRail, CodeExample, type NavRailItem } from '$lib';

  const navItems: NavRailItem[] = [
    { id: 'home', label: 'Home', icon: 'mdi:home', active: true },
    { id: 'explore', label: 'Explore', icon: 'mdi:compass', badge: 3 },
    { id: 'bookmarks', label: 'Bookmarks', icon: 'mdi:bookmark-outline' },
    { id: 'messages', label: 'Messages', icon: 'mdi:message-outline', badge: 12 },
    { id: 'notifications', label: 'Alerts', icon: 'mdi:bell-outline' },
  ];

  const footerItems: NavRailItem[] = [
    { id: 'settings', label: 'Settings', icon: 'mdi:cog-outline' },
    { id: 'profile', label: 'Profile', icon: 'mdi:account-circle-outline' },
  ];

  let expanded = $state(false);
</script>

<section id="navigation-rail" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-gap-6">

    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <!-- Collapsed (icon + label) -->
      <Card title="Navigation Rail" description="Compact vertical navigation with icons and labels">
        <div class="demo-container">
          <div class="demo-rail-wrapper">
            <NavigationRail
              items={navItems}
              footerItems={footerItems}
              bind:expanded
            />
            <div class="demo-content">
              <h4 class="mljr-h4">Main Content</h4>
              <p class="mljr-text-secondary" style="font-size: 0.875rem;">
                Click the toggle at the top of the rail to expand/collapse it.
              </p>
              <p style="font-size: 0.75rem; color: var(--mljr-text-muted); margin-top: 0.5rem;">
                State: {expanded ? 'Expanded' : 'Collapsed'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <!-- Features -->
      <Card title="Features" description="Navigation rail capabilities">
        <ul class="feature-list">
          <li>✓ Compact icon-only or icon+label mode</li>
          <li>✓ Expand/collapse toggle</li>
          <li>✓ Active state indicator</li>
          <li>✓ Badge support for notifications</li>
          <li>✓ Separated footer items</li>
          <li>✓ Custom header slot</li>
          <li>✓ Dark mode aware</li>
          <li>✓ Claymorphism shadows</li>
        </ul>
      </Card>
    </div>

    <CodeExample code={`<script lang="ts">
  import { NavigationRail, type NavRailItem } from 'mljr-svelte';

  const navItems: NavRailItem[] = [
    { id: 'home', label: 'Home', icon: 'mdi:home', active: true },
    { id: 'explore', label: 'Explore', icon: 'mdi:compass', badge: 3 },
    { id: 'messages', label: 'Messages', icon: 'mdi:message-outline', badge: 12 },
  ];

  const footerItems: NavRailItem[] = [
    { id: 'settings', label: 'Settings', icon: 'mdi:cog-outline' },
  ];

  let expanded = $state(false);
&lt;/script&gt;

&lt;NavigationRail
  items={navItems}
  footerItems={footerItems}
  bind:expanded
  showLabels={true}
/&gt;`} />
  </div>
</section>

<style>
  .demo-container {
    height: 400px;
    overflow: hidden;
    border-radius: var(--mljr-radius-lg);
    background: var(--mljr-bg-secondary);
  }

  .demo-rail-wrapper {
    display: flex;
    height: 100%;
  }

  .demo-content {
    flex: 1;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .feature-list li {
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-secondary);
  }
</style>
