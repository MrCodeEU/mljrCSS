<script module lang="ts">
  export interface NavRailItem {
    id: string;
    label: string;
    icon: string;
    href?: string;
    active?: boolean;
    badge?: number | string;
    onClick?: () => void;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from '../layout/Icon.svelte';

  interface Props {
    /** Navigation items */
    items?: NavRailItem[];
    /** Bottom items (shown in footer) */
    footerItems?: NavRailItem[];
    /** Whether rail is expanded (shows full labels next to icons) */
    expanded?: boolean;
    /** Whether to show labels under icons */
    showLabels?: boolean;
    /** Custom header snippet */
    header?: Snippet;
    /** Additional CSS class */
    class?: string;
    /** Toggle expand callback */
    onToggle?: (expanded: boolean) => void;
    /** Item click callback */
    onItemClick?: (item: NavRailItem) => void;
  }

  let {
    items = [],
    footerItems = [],
    expanded = $bindable(false),
    showLabels = true,
    header,
    class: className = '',
    onToggle,
    onItemClick,
  }: Props = $props();

  function handleItemClick(item: NavRailItem) {
    item.onClick?.();
    onItemClick?.(item);
  }

  function toggleExpand() {
    expanded = !expanded;
    onToggle?.(expanded);
  }

  const railClasses = $derived(
    [
      'mljr-nav-rail',
      expanded && 'mljr-nav-rail-expanded',
      showLabels && !expanded && 'mljr-nav-rail-labeled',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<nav class={railClasses} aria-label="Navigation rail">
  <!-- Header/Logo area -->
  {#if header}
    <div class="mljr-nav-rail-header">
      {@render header()}
    </div>
  {/if}

  <!-- Toggle button -->
  <button
    type="button"
    class="mljr-nav-rail-toggle"
    onclick={toggleExpand}
    aria-label={expanded ? 'Collapse navigation' : 'Expand navigation'}
    title={expanded ? 'Collapse' : 'Expand'}
  >
    <Icon icon={expanded ? 'mdi:chevron-left' : 'mdi:chevron-right'} size={20} />
  </button>

  <div class="mljr-nav-rail-divider"></div>

  <!-- Main items -->
  {#each items as item}
    {#if item.href}
      <a
        href={item.href}
        class="mljr-nav-rail-item"
        class:mljr-nav-rail-item-active={item.active}
        aria-current={item.active ? 'page' : undefined}
        onclick={() => handleItemClick(item)}
        title={!showLabels || (!expanded && !showLabels) ? item.label : undefined}
      >
        <span class="mljr-nav-rail-icon">
          <Icon icon={item.icon} size={22} />
        </span>
        {#if showLabels || expanded}
          <span class="mljr-nav-rail-label">{item.label}</span>
        {/if}
        {#if item.badge}
          <span class="mljr-nav-rail-item-badge">{item.badge}</span>
        {/if}
      </a>
    {:else}
      <button
        type="button"
        class="mljr-nav-rail-item"
        class:mljr-nav-rail-item-active={item.active}
        aria-current={item.active ? 'page' : undefined}
        onclick={() => handleItemClick(item)}
        title={!showLabels && !expanded ? item.label : undefined}
      >
        <span class="mljr-nav-rail-icon">
          <Icon icon={item.icon} size={22} />
        </span>
        {#if showLabels || expanded}
          <span class="mljr-nav-rail-label">{item.label}</span>
        {/if}
        {#if item.badge}
          <span class="mljr-nav-rail-item-badge">{item.badge}</span>
        {/if}
      </button>
    {/if}
  {/each}

  <!-- Footer items -->
  {#if footerItems.length > 0}
    <div class="mljr-nav-rail-footer">
      {#each footerItems as item}
        {#if item.href}
          <a
            href={item.href}
            class="mljr-nav-rail-item"
            class:mljr-nav-rail-item-active={item.active}
            onclick={() => handleItemClick(item)}
          >
            <span class="mljr-nav-rail-icon">
              <Icon icon={item.icon} size={22} />
            </span>
            {#if showLabels || expanded}
              <span class="mljr-nav-rail-label">{item.label}</span>
            {/if}
          </a>
        {:else}
          <button
            type="button"
            class="mljr-nav-rail-item"
            class:mljr-nav-rail-item-active={item.active}
            onclick={() => handleItemClick(item)}
          >
            <span class="mljr-nav-rail-icon">
              <Icon icon={item.icon} size={22} />
            </span>
            {#if showLabels || expanded}
              <span class="mljr-nav-rail-label">{item.label}</span>
            {/if}
          </button>
        {/if}
      {/each}
    </div>
  {/if}
</nav>
