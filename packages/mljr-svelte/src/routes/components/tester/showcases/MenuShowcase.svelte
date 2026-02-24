<script lang="ts">
  import { Menu, Card } from '$lib';
  import type { MenuItem } from '$lib';

  const navItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'mdi:view-dashboard', href: '#', active: true },
    { label: 'Projects', icon: 'mdi:folder', href: '#', badge: '12' },
    { label: 'Team', icon: 'mdi:account-group', href: '#' },
    { label: 'Analytics', icon: 'mdi:chart-line', href: '#' },
    { label: 'Settings', icon: 'mdi:cog', href: '#' },
  ];

  const settingsItems: MenuItem[] = [
    {
      label: 'Account',
      icon: 'mdi:account',
      submenu: [
        { label: 'Profile', href: '#' },
        { label: 'Password', href: '#' },
        { label: 'Notifications', href: '#', badge: '3' },
      ]
    },
    {
      label: 'Workspace',
      icon: 'mdi:briefcase',
      submenu: [
        { label: 'General', href: '#' },
        { label: 'Members', href: '#' },
        { label: 'Billing', href: '#' },
      ]
    },
    { label: 'Integrations', icon: 'mdi:puzzle', href: '#' },
    { label: 'API Keys', icon: 'mdi:key', href: '#' },
    { label: 'Danger Zone', icon: 'mdi:alert', href: '#', disabled: true },
  ];

  const contextItems: MenuItem[] = [
    { label: 'Edit', icon: 'mdi:pencil', onclick: () => {} },
    { label: 'Duplicate', icon: 'mdi:content-copy', onclick: () => {} },
    { label: 'Move to...', icon: 'mdi:folder-move', onclick: () => {} },
    { label: 'Delete', icon: 'mdi:delete', onclick: () => {} },
  ];

  const horizontalItems: MenuItem[] = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Products', href: '#', active: true },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' },
  ];
</script>

<div class="mljr-space-y-8">
  <!-- Basic Vertical -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Vertical Menu</h3>
    <div class="mljr-max-w-xs">
      <Menu items={navItems} />
    </div>
  </section>

  <!-- Horizontal -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Horizontal Menu</h3>
    <Menu items={horizontalItems} orientation="horizontal" />
  </section>

  <!-- With Submenus -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Submenus</h3>
    <div class="mljr-max-w-xs">
      <Menu items={settingsItems} />
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-grid mljr-grid-cols-3 mljr-gap-4">
      <div>
        <p class="mljr-text-xs mljr-text-muted mljr-mb-2">Small</p>
        <Menu items={navItems.slice(0, 3)} size="sm" />
      </div>
      <div>
        <p class="mljr-text-xs mljr-text-muted mljr-mb-2">Medium (default)</p>
        <Menu items={navItems.slice(0, 3)} size="md" />
      </div>
      <div>
        <p class="mljr-text-xs mljr-text-muted mljr-mb-2">Large</p>
        <Menu items={navItems.slice(0, 3)} size="lg" />
      </div>
    </div>
  </section>

  <!-- Context Menu Style -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Context Menu Style</h3>
    <div class="mljr-inline-block">
      <Card>
        <Menu items={contextItems} size="sm" />
      </Card>
    </div>
  </section>

  <!-- Sidebar Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sidebar Navigation</h3>
    <Card>
      <div class="mljr-flex mljr-gap-6">
        <div class="mljr-w-48 mljr-border-r mljr-border-muted mljr-pr-4">
          <p class="mljr-text-xs mljr-text-muted mljr-font-medium mljr-uppercase mljr-mb-2 mljr-tracking-wider">Navigation</p>
          <Menu items={navItems} />
        </div>
        <div class="mljr-flex-1">
          <h4 class="mljr-h5 mljr-mb-2">Dashboard</h4>
          <p class="mljr-text-sm mljr-text-muted">Main content area</p>
        </div>
      </div>
    </Card>
  </section>
</div>
