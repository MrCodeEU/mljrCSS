<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Icon } from '$lib';

  type TabsVariant = 'default' | 'pills' | 'bordered';

  export interface Tab {
    id: string;
    label: string;
    disabled?: boolean;
    /** Counter badge to display */
    badge?: string | number;
    /** Whether this tab can be closed */
    closable?: boolean;
  }

  interface Props {
    tabs: Tab[];
    activeTab?: string;
    variant?: TabsVariant;
    secondary?: boolean;
    /** Enable horizontal scrolling for many tabs */
    scrollable?: boolean;
    /** Show close buttons on closable tabs */
    showClose?: boolean;
    class?: string;
    children?: Snippet<[{ activeTab: string }]>;
    onchange?: (tabId: string) => void;
    /** Callback when tab is closed */
    onclose?: (tabId: string) => void;
  }

  let {
    tabs,
    activeTab = $bindable(tabs[0]?.id ?? ''),
    variant = 'default',
    secondary = false,
    scrollable = false,
    showClose = false,
    class: className = '',
    children,
    onchange,
    onclose,
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
      scrollable && 'mljr-tabs-scrollable',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  function handleTabClick(tabId: string) {
    activeTab = tabId;
    onchange?.(tabId);
  }

  function handleTabClose(e: Event, tabId: string) {
    e.stopPropagation();
    onclose?.(tabId);
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
      <div
        role="tab"
        class="mljr-tab"
        class:mljr-tab-active={activeTab === tab.id}
        class:mljr-tab-closable={showClose && tab.closable}
        aria-selected={activeTab === tab.id}
        aria-controls={`panel-${tab.id}`}
        aria-disabled={tab.disabled}
        id={`tab-${tab.id}`}
        tabindex={tab.disabled ? -1 : activeTab === tab.id ? 0 : -1}
        onclick={() => !tab.disabled && handleTabClick(tab.id)}
        onkeydown={(e) => {
          if (tab.disabled) return;
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTabClick(tab.id); }
          else handleKeydown(e, index);
        }}
      >
        <span class="mljr-tab-label">{tab.label}</span>
        {#if tab.badge}
          <span class="mljr-tab-badge">{tab.badge}</span>
        {/if}
        {#if showClose && tab.closable}
          <button
            type="button"
            class="mljr-tab-close"
            onclick={(e) => handleTabClose(e, tab.id)}
            aria-label="Close tab"
          >
            <Icon icon="mdi:close" size={14} />
          </button>
        {/if}
      </div>
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
