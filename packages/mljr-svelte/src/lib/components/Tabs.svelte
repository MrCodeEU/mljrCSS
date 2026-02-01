<script lang="ts">
  import type { Snippet } from 'svelte';

  type TabsVariant = 'default' | 'pills' | 'bordered';

  interface Tab {
    id: string;
    label: string;
    disabled?: boolean;
  }

  interface Props {
    tabs: Tab[];
    activeTab?: string;
    variant?: TabsVariant;
    secondary?: boolean;
    class?: string;
    children?: Snippet<[{ activeTab: string }]>;
    onchange?: (tabId: string) => void;
  }

  let {
    tabs,
    activeTab = $bindable(tabs[0]?.id ?? ''),
    variant = 'default',
    secondary = false,
    class: className = '',
    children,
    onchange,
  }: Props = $props();

  const variantClasses: Record<TabsVariant, string> = {
    default: '',
    pills: 'mljr-tabs-pills',
    bordered: 'mljr-tabs-bordered',
  };

  let tabsClasses = $derived(
    [
      'mljr-tabs',
      variantClasses[variant],
      secondary && 'mljr-tabs-secondary',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  function handleTabClick(tabId: string) {
    activeTab = tabId;
    onchange?.(tabId);
  }

  function handleKeydown(e: KeyboardEvent, index: number) {
    const enabledTabs = tabs.filter((t) => !t.disabled);
    const currentIndex = enabledTabs.findIndex((t) => t.id === tabs[index].id);

    let newIndex: number | undefined;

    if (e.key === 'ArrowRight') {
      newIndex = (currentIndex + 1) % enabledTabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = enabledTabs.length - 1;
    }

    if (newIndex !== undefined) {
      e.preventDefault();
      handleTabClick(enabledTabs[newIndex].id);
    }
  }
</script>

<div class={tabsClasses}>
  <div class="mljr-tabs-list" role="tablist">
    {#each tabs as tab, index (tab.id)}
      <button
        type="button"
        role="tab"
        class="mljr-tab"
        class:mljr-tab-active={activeTab === tab.id}
        aria-selected={activeTab === tab.id}
        aria-controls={`panel-${tab.id}`}
        id={`tab-${tab.id}`}
        tabindex={activeTab === tab.id ? 0 : -1}
        disabled={tab.disabled}
        onclick={() => handleTabClick(tab.id)}
        onkeydown={(e) => handleKeydown(e, index)}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <div class="mljr-tabs-content">
    {#each tabs as tab (tab.id)}
      <div
        role="tabpanel"
        id={`panel-${tab.id}`}
        aria-labelledby={`tab-${tab.id}`}
        class="mljr-tabs-panel"
        class:mljr-tabs-panel-active={activeTab === tab.id}
        hidden={activeTab !== tab.id}
      >
        {#if activeTab === tab.id && children}
          {@render children({ activeTab })}
        {/if}
      </div>
    {/each}
  </div>
</div>
