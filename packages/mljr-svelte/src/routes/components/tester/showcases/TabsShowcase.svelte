<script lang="ts">
  import { Tabs, Icon, Badge, type Tab } from '$lib';

  let activeTab = $state('tab1');
  let verticalTab = $state('profile');
  let scrollableTab = $state('tab1');
  let closableTab = $state('tab1');

  const basicTabs: Tab[] = [
    { id: 'tab1', label: 'Overview' },
    { id: 'tab2', label: 'Details' },
    { id: 'tab3', label: 'Settings' }
  ];

  const iconTabs: Tab[] = [
    { id: 'home', label: 'Home' },
    { id: 'profile', label: 'Profile' },
    { id: 'settings', label: 'Settings' },
    { id: 'notifications', label: 'Notifications' }
  ];

  const badgeTabs: Tab[] = [
    { id: 'all', label: 'All', badge: '24' },
    { id: 'active', label: 'Active', badge: '12' },
    { id: 'pending', label: 'Pending', badge: '8' },
    { id: 'completed', label: 'Completed', badge: '4' }
  ];

  const scrollableTabs: Tab[] = Array.from({ length: 12 }, (_, i) => ({
    id: `tab${i + 1}`,
    label: `Tab ${i + 1}`
  }));

  let dynamicTabs = $state<Tab[]>([
    { id: 'tab1', label: 'Tab 1', closable: true },
    { id: 'tab2', label: 'Tab 2', closable: true },
    { id: 'tab3', label: 'Tab 3', closable: true }
  ]);

  function handleTabClose(tabId: string) {
    dynamicTabs = dynamicTabs.filter(t => t.id !== tabId);
    if (closableTab === tabId) {
      closableTab = dynamicTabs[0]?.id || '';
    }
  }

  function addNewTab() {
    const newId = `tab${dynamicTabs.length + 1}`;
    dynamicTabs = [
      ...dynamicTabs,
      { id: newId, label: `Tab ${dynamicTabs.length + 1}`, closable: true }
    ];
    closableTab = newId;
  }
</script>

<div class="mljr-space-y-8">
  <!-- Basic Tabs -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Tabs</h3>
    <Tabs tabs={basicTabs} bind:activeTab />
    <div class="mljr-mt-4 mljr-p-4 mljr-bg-secondary mljr-rounded-lg">
      {#if activeTab === 'tab1'}
        <h4 class="mljr-h5 mljr-mb-2">Overview</h4>
        <p class="mljr-text-secondary">
          This is the overview content. Here you can see a summary of everything.
        </p>
      {:else if activeTab === 'tab2'}
        <h4 class="mljr-h5 mljr-mb-2">Details</h4>
        <p class="mljr-text-secondary">
          This is the details section with more in-depth information.
        </p>
      {:else if activeTab === 'tab3'}
        <h4 class="mljr-h5 mljr-mb-2">Settings</h4>
        <p class="mljr-text-secondary">
          Configure your preferences and settings here.
        </p>
      {/if}
    </div>
  </section>

  <!-- With Icons -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Icons</h3>
    <Tabs tabs={iconTabs} bind:activeTab={verticalTab} />
    <div class="mljr-mt-4 mljr-p-4 mljr-bg-secondary mljr-rounded-lg">
      {#if verticalTab === 'home'}
        <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-mb-2">
          <Icon icon="mdi:home" size={24} />
          <h4 class="mljr-h5">Home</h4>
        </div>
        <p class="mljr-text-secondary">Welcome to your home page.</p>
      {:else if verticalTab === 'profile'}
        <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-mb-2">
          <Icon icon="mdi:account" size={24} />
          <h4 class="mljr-h5">Profile</h4>
        </div>
        <p class="mljr-text-secondary">Manage your profile information.</p>
      {:else if verticalTab === 'settings'}
        <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-mb-2">
          <Icon icon="mdi:cog" size={24} />
          <h4 class="mljr-h5">Settings</h4>
        </div>
        <p class="mljr-text-secondary">Configure application settings.</p>
      {:else if verticalTab === 'notifications'}
        <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-mb-2">
          <Icon icon="mdi:bell" size={24} />
          <h4 class="mljr-h5">Notifications</h4>
        </div>
        <p class="mljr-text-secondary">View and manage your notifications.</p>
      {/if}
    </div>
  </section>

  <!-- With Badges -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Badges</h3>
    <Tabs tabs={badgeTabs} bind:activeTab />
    <div class="mljr-mt-4 mljr-p-4 mljr-bg-secondary mljr-rounded-lg">
      <p class="mljr-text-secondary">
        Content for the {badgeTabs.find(t => t.id === activeTab)?.label} tab.
      </p>
    </div>
  </section>

  <!-- Scrollable Tabs -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Scrollable Tabs</h3>
    <Tabs tabs={scrollableTabs} bind:activeTab={scrollableTab} scrollable />
    <div class="mljr-mt-4 mljr-p-4 mljr-bg-secondary mljr-rounded-lg">
      <p class="mljr-text-secondary">
        Content for {scrollableTabs.find(t => t.id === scrollableTab)?.label}
      </p>
    </div>
  </section>

  <!-- Closable Tabs -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Closable Tabs</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-mb-3">
      <Tabs
        tabs={dynamicTabs}
        bind:activeTab={closableTab}
        onclose={handleTabClose}
      />
      <button
        onclick={addNewTab}
        class="mljr-p-2 mljr-rounded-lg hover:mljr-bg-secondary mljr-transition-colors"
        title="Add tab"
      >
        <Icon icon="mdi:plus" size={20} />
      </button>
    </div>
    {#if dynamicTabs.length > 0}
      <div class="mljr-p-4 mljr-bg-secondary mljr-rounded-lg">
        <p class="mljr-text-secondary">
          Content for {dynamicTabs.find(t => t.id === closableTab)?.label || 'No tab'}
        </p>
      </div>
    {:else}
      <div class="mljr-p-4 mljr-bg-secondary mljr-rounded-lg">
        <p class="mljr-text-secondary">No tabs available. Click + to add one.</p>
      </div>
    {/if}
  </section>

  <!-- Vertical Tabs -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Vertical Layout</h3>
    <div class="mljr-flex mljr-gap-4">
      <div class="mljr-w-48">
        <Tabs
          tabs={iconTabs}
          bind:activeTab={verticalTab}
        />
      </div>
      <div class="mljr-flex-1 mljr-p-4 mljr-bg-secondary mljr-rounded-lg">
        {#if verticalTab === 'home'}
          <h4 class="mljr-h5 mljr-mb-2">Home</h4>
          <p class="mljr-text-secondary">Welcome to your home page.</p>
        {:else if verticalTab === 'profile'}
          <h4 class="mljr-h5 mljr-mb-2">Profile</h4>
          <p class="mljr-text-secondary">Manage your profile information.</p>
        {:else if verticalTab === 'settings'}
          <h4 class="mljr-h5 mljr-mb-2">Settings</h4>
          <p class="mljr-text-secondary">Configure application settings.</p>
        {:else if verticalTab === 'notifications'}
          <h4 class="mljr-h5 mljr-mb-2">Notifications</h4>
          <p class="mljr-text-secondary">View and manage your notifications.</p>
        {/if}
      </div>
    </div>
  </section>

  <!-- Disabled Tab -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Disabled Tabs</h3>
    <Tabs
      tabs={[
        { id: 'tab1', label: 'Enabled' },
        { id: 'tab2', label: 'Disabled', disabled: true },
        { id: 'tab3', label: 'Enabled' }
      ]}
      bind:activeTab
    />
  </section>

  <!-- Full Width -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Full Width</h3>
    <Tabs tabs={basicTabs} bind:activeTab />
  </section>
</div>
