<script lang="ts">
  import {
    Card,
    Menu,
    Tabs,
    Breadcrumb,
    Pagination,
    CodeExample,
    type MenuItem,
    type Tab,
    type BreadcrumbItem,
  } from '$lib';

  let currentPage = $state(1);
  let jumpToPage = $state(1);
  let itemsPerPage = $state(10);

  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'lucide:layout-dashboard',
      href: '#dashboard',
      active: true,
    },
    {
      label: 'Projects',
      icon: 'lucide:folder',
      badge: '12',
      submenu: [
        { label: 'Active Projects', href: '#active', active: false },
        { label: 'Archived Projects', href: '#archived' },
        { label: 'Templates', href: '#templates' },
      ],
    },
    {
      label: 'Team',
      icon: 'lucide:users',
      submenu: [
        { label: 'Members', href: '#members' },
        { label: 'Roles', href: '#roles' },
        { label: 'Invitations', href: '#invitations', badge: '3' },
      ],
    },
    {
      label: 'Settings',
      icon: 'lucide:settings',
      href: '#settings',
    },
    {
      label: 'Help',
      icon: 'lucide:help-circle',
      href: '#help',
      disabled: true,
    },
  ];

  const horizontalMenuItems: MenuItem[] = [
    { label: 'Home', icon: 'lucide:home', href: '#home', active: true },
    { label: 'Products', icon: 'lucide:package', href: '#products' },
    { label: 'Services', icon: 'lucide:briefcase', href: '#services' },
    { label: 'About', icon: 'lucide:info', href: '#about' },
    { label: 'Contact', icon: 'lucide:mail', href: '#contact' },
  ];

  const tabItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' },
  ];

  let activeTab = $state('overview');

  // Scrollable tabs example
  const scrollableTabs: Tab[] = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' },
    { id: 'all-days', label: 'All Days' },
  ];
  let scrollableActiveTab = $state('monday');

  // Tabs with badges example
  const badgeTabs: Tab[] = [
    { id: 'inbox', label: 'Inbox', badge: 12 },
    { id: 'unread', label: 'Unread', badge: 5 },
    { id: 'drafts', label: 'Drafts', badge: 3 },
    { id: 'sent', label: 'Sent' },
  ];
  let badgeActiveTab = $state('inbox');

  // Closable tabs example
  let closableTabs = $state<Tab[]>([
    { id: 'file1', label: 'index.html', closable: true },
    { id: 'file2', label: 'styles.css', closable: true },
    { id: 'file3', label: 'script.js', closable: true },
    { id: 'file4', label: 'README.md', closable: false },
  ]);
  let closableActiveTab = $state('file1');

  function handleTabClose(tabId: string) {
    const index = closableTabs.findIndex((t) => t.id === tabId);
    if (index === -1) return;

    // If closing active tab, switch to another tab
    if (closableActiveTab === tabId) {
      const newIndex = index === closableTabs.length - 1 ? index - 1 : index + 1;
      if (newIndex >= 0 && newIndex < closableTabs.length) {
        closableActiveTab = closableTabs[newIndex].id;
      }
    }

    // Remove the tab
    closableTabs = closableTabs.filter((t) => t.id !== tabId);
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Components', href: '/docs/components' },
    { label: 'Navigation', href: '/docs/components/navigation' },
  ];

  // Breadcrumb with icons
  const iconBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: 'lucide:home' },
    { label: 'Products', href: '/products', icon: 'lucide:package' },
    { label: 'Electronics', href: '/products/electronics', icon: 'lucide:monitor' },
    { label: 'Laptops', icon: 'lucide:laptop' },
  ];

  // Dynamic breadcrumbs
  let dynamicBreadcrumbs = $state<BreadcrumbItem[]>([
    { label: 'Home', href: '#' },
    { label: 'Level 1', href: '#' },
  ]);

  function addBreadcrumbLevel() {
    dynamicBreadcrumbs = [
      ...dynamicBreadcrumbs,
      { label: `Level ${dynamicBreadcrumbs.length}`, href: '#' },
    ];
  }

  function removeBreadcrumbLevel() {
    if (dynamicBreadcrumbs.length > 1) {
      dynamicBreadcrumbs = dynamicBreadcrumbs.slice(0, -1);
    }
  }

  // Long breadcrumb for truncation
  const longBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Subcategory', href: '/products/category/subcategory' },
    { label: 'Brand', href: '/products/category/subcategory/brand' },
    { label: 'Model', href: '/products/category/subcategory/brand/model' },
    { label: 'Variant', href: '/products/category/subcategory/brand/model/variant' },
    { label: 'Details' },
  ];
</script>

<section id="navigation" class="mljr-mb-8">
  <Card title="Menu - Vertical Navigation" description="Vertical menu with nested submenus and icons">
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <div>
        <h4 class="mljr-h5 mljr-mb-3">Default Size</h4>
        <Menu items={menuItems} />
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Small Size</h4>
        <Menu items={menuItems} size="sm" />
      </div>
    </div>

    <CodeExample code={`<script>
  import { Menu } from 'mljr-svelte';

  const menuItems = [
    {
      label: 'Dashboard',
      icon: 'lucide:layout-dashboard',
      href: '#dashboard',
      active: true,
    },
    {
      label: 'Projects',
      icon: 'lucide:folder',
      badge: '12',
      submenu: [
        { label: 'Active Projects', href: '#active' },
        { label: 'Archived Projects', href: '#archived' },
      ],
    },
    {
      label: 'Settings',
      icon: 'lucide:settings',
      href: '#settings',
    },
  ];
<\/script>

<Menu items={menuItems} />
<Menu items={menuItems} size="sm" />
<Menu items={menuItems} size="lg" />`} />
  </Card>

  <Card title="Menu - Horizontal Navigation" description="Horizontal menu layout">
    <div>
      <h4 class="mljr-h5 mljr-mb-3">Horizontal Menu</h4>
      <Menu items={horizontalMenuItems} orientation="horizontal" />
    </div>

    <CodeExample code={`<Menu
  items={horizontalMenuItems}
  orientation="horizontal"
/>`} />
  </Card>

  <Card title="Tabs" description="Tab navigation for content sections">
    <div>
      <Tabs tabs={tabItems} activeTab={activeTab} onchange={(id) => (activeTab = id)} />

      <div class="mljr-mt-4 mljr-p-4 mljr-rounded-lg mljr-bg-secondary">
        <p class="mljr-text">Active tab: <strong>{activeTab}</strong></p>
      </div>
    </div>

    <CodeExample code={`<script>
  import { Tabs } from 'mljr-svelte';

  const tabItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports', label: 'Reports' },
  ];

  let activeTab = $state('overview');
<\/script>

<Tabs
  items={tabItems}
  activeTab={activeTab}
  onchange={(id) => (activeTab = id)}
/>`} />
  </Card>

  <Card
    title="Tabs - Scrollable"
    description="Enable horizontal scrolling for many tabs"
  >
    <div>
      <h4 class="mljr-h5 mljr-mb-3">Scrollable Tabs</h4>
      <Tabs
        tabs={scrollableTabs}
        bind:activeTab={scrollableActiveTab}
        scrollable
      />

      <div class="mljr-mt-4 mljr-p-4 mljr-rounded-lg mljr-bg-secondary">
        <p class="mljr-text">Selected day: <strong>{scrollableActiveTab}</strong></p>
      </div>
    </div>

    <CodeExample code={`<script>
  import { Tabs, type Tab } from 'mljr-svelte';

  const scrollableTabs: Tab[] = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' },
    { id: 'all-days', label: 'All Days' },
  ];

  let activeTab = $state('monday');
<\/script>

<Tabs
  tabs={scrollableTabs}
  bind:activeTab
  scrollable
/>`} />
  </Card>

  <Card
    title="Tabs - With Badges"
    description="Display counter badges on tabs"
  >
    <div>
      <h4 class="mljr-h5 mljr-mb-3">Tabs with Counter Badges</h4>
      <Tabs
        tabs={badgeTabs}
        bind:activeTab={badgeActiveTab}
      />

      <div class="mljr-mt-4 mljr-p-4 mljr-rounded-lg mljr-bg-secondary">
        <p class="mljr-text">Active mailbox: <strong>{badgeActiveTab}</strong></p>
      </div>
    </div>

    <CodeExample code={`<script>
  import { Tabs, type Tab } from 'mljr-svelte';

  const badgeTabs: Tab[] = [
    { id: 'inbox', label: 'Inbox', badge: 12 },
    { id: 'unread', label: 'Unread', badge: 5 },
    { id: 'drafts', label: 'Drafts', badge: 3 },
    { id: 'sent', label: 'Sent' },
  ];

  let activeTab = $state('inbox');
<\/script>

<Tabs
  tabs={badgeTabs}
  bind:activeTab
/>`} />
  </Card>

  <Card
    title="Tabs - With Close Buttons"
    description="Closable tabs with close button handling"
  >
    <div>
      <h4 class="mljr-h5 mljr-mb-3">Closable Tabs (like editor tabs)</h4>
      <Tabs
        tabs={closableTabs}
        bind:activeTab={closableActiveTab}
        showClose
        onclose={handleTabClose}
      />

      <div class="mljr-mt-4 mljr-p-4 mljr-rounded-lg mljr-bg-secondary">
        <p class="mljr-text">Open files: <strong>{closableTabs.length}</strong></p>
        <p class="mljr-text mljr-mt-2">
          Active file: <strong>{closableTabs.find((t) => t.id === closableActiveTab)?.label}</strong>
        </p>
      </div>
    </div>

    <CodeExample code={`<script>
  import { Tabs, type Tab } from 'mljr-svelte';

  let tabs = $state<Tab[]>([
    { id: 'file1', label: 'index.html', closable: true },
    { id: 'file2', label: 'styles.css', closable: true },
    { id: 'file3', label: 'script.js', closable: true },
    { id: 'file4', label: 'README.md', closable: false },
  ]);

  let activeTab = $state('file1');

  function handleTabClose(tabId: string) {
    const index = tabs.findIndex((t) => t.id === tabId);
    if (index === -1) return;

    // Switch to another tab if closing active tab
    if (activeTab === tabId) {
      const newIndex = index === tabs.length - 1 ? index - 1 : index + 1;
      if (newIndex >= 0) {
        activeTab = tabs[newIndex].id;
      }
    }

    // Remove the tab
    tabs = tabs.filter((t) => t.id !== tabId);
  }
<\/script>

<Tabs
  tabs={tabs}
  bind:activeTab
  showClose
  onclose={handleTabClose}
/>`} />
  </Card>

  <Card title="Breadcrumbs" description="Hierarchical navigation trail">
    <div class="mljr-space-y-6">
      <div>
        <h4 class="mljr-h5 mljr-mb-3">Default Breadcrumb</h4>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">With Icons</h4>
        <Breadcrumb items={iconBreadcrumbs} />
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Dynamic Updates</h4>
        <Breadcrumb items={dynamicBreadcrumbs} />
        <div class="mljr-flex mljr-gap-2 mljr-mt-3">
          <button onclick={addBreadcrumbLevel} class="mljr-btn mljr-btn-sm mljr-btn-primary">
            Add Level
          </button>
          <button onclick={removeBreadcrumbLevel} class="mljr-btn mljr-btn-sm mljr-btn-outline-primary">
            Remove Level
          </button>
        </div>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Truncation (Max 4 Items)</h4>
        <Breadcrumb items={longBreadcrumbs} maxItems={4} />
        <p class="mljr-text-sm mljr-text-muted mljr-mt-2">
          Full path has {longBreadcrumbs.length} items, showing first and last 3 with ellipsis
        </p>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Custom Separator</h4>
        <Breadcrumb items={breadcrumbItems} separator=">" />
      </div>
    </div>

    <CodeExample code={`<script>
  import { Breadcrumb, type BreadcrumbItem } from 'mljr-svelte';

  // Basic breadcrumb
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Navigation' },
  ];

  // With icons
  const iconItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: 'lucide:home' },
    { label: 'Products', href: '/products', icon: 'lucide:package' },
    { label: 'Laptops', icon: 'lucide:laptop' },
  ];

  // Dynamic breadcrumbs
  let dynamicItems = $state<BreadcrumbItem[]>([
    { label: 'Home', href: '#' },
    { label: 'Level 1', href: '#' },
  ]);

  function addLevel() {
    dynamicItems = [...dynamicItems, { label: \`Level \${dynamicItems.length}\`, href: '#' }];
  }

  // Long breadcrumb for truncation
  const longItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Subcategory', href: '/products/category/subcategory' },
    { label: 'Brand', href: '/products/category/subcategory/brand' },
    { label: 'Details' },
  ];
<\/script>

<!-- Default -->
<Breadcrumb items={items} />

<!-- With icons -->
<Breadcrumb items={iconItems} />

<!-- Dynamic updates -->
<Breadcrumb items={dynamicItems} />
<button onclick={addLevel}>Add Level</button>

<!-- Truncation (shows max 4 items with ellipsis) -->
<Breadcrumb items={longItems} maxItems={4} />

<!-- Custom separator -->
<Breadcrumb items={items} separator=">" />`} />
  </Card>

  <Card title="Pagination" description="Page navigation controls">
    <div class="mljr-space-y-6">
      <div>
        <h4 class="mljr-h5 mljr-mb-3">Default Pagination</h4>
        <Pagination bind:currentPage totalPages={20} />
        <p class="mljr-text-sm mljr-text-muted mljr-mt-2">Current page: {currentPage}</p>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">With Jump To Page</h4>
        <Pagination bind:currentPage={jumpToPage} totalPages={50} showJumpTo />
        <p class="mljr-text-sm mljr-text-muted mljr-mt-2">Current page: {jumpToPage}</p>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">With Items Per Page</h4>
        <Pagination
          bind:currentPage
          totalPages={Math.ceil(500 / itemsPerPage)}
          bind:itemsPerPage
          showItemsPerPage
        />
        <p class="mljr-text-sm mljr-text-muted mljr-mt-2">
          Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, 500)}
          of 500 items ({itemsPerPage} per page)
        </p>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Complete Example (All Features)</h4>
        <Pagination
          bind:currentPage
          totalPages={Math.ceil(500 / itemsPerPage)}
          bind:itemsPerPage
          showJumpTo
          showItemsPerPage
          variant="secondary"
        />
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Small Size</h4>
        <Pagination bind:currentPage totalPages={15} size="sm" />
      </div>
    </div>

    <CodeExample code={`<script>
  import { Pagination } from 'mljr-svelte';

  let currentPage = $state(1);
  let itemsPerPage = $state(10);
<\/script>

<!-- Basic pagination -->
<Pagination bind:currentPage totalPages={20} />

<!-- With jump to page -->
<Pagination
  bind:currentPage
  totalPages={50}
  showJumpTo
/>

<!-- With items per page selector -->
<Pagination
  bind:currentPage
  totalPages={Math.ceil(500 / itemsPerPage)}
  bind:itemsPerPage
  showItemsPerPage
  itemsPerPageOptions={[5, 10, 20, 50, 100]}
/>

<!-- All features combined -->
<Pagination
  bind:currentPage
  totalPages={Math.ceil(500 / itemsPerPage)}
  bind:itemsPerPage
  showJumpTo
  showItemsPerPage
  variant="secondary"
  size="sm"
/>`} />
  </Card>
</section>
