<script module lang="ts">
  export interface DockItem {
    id: string;
    label: string;
    icon: string;
    href?: string;
    active?: boolean;
    badge?: number | string;
    dividerBefore?: boolean;
    onClick?: () => void;
  }
</script>

<script lang="ts">
  import Icon from '../layout/Icon.svelte';

  interface Props {
    /** Navigation items */
    items?: DockItem[];
    /** Whether dock is fixed to the bottom of the viewport */
    fixed?: boolean;
    /** Whether to show item labels */
    showLabels?: boolean;
    /** Visual variant */
    variant?: 'default' | 'frosted' | 'full';
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Enable macOS-like zoom effect */
    zoom?: boolean;
    /** Additional CSS class */
    class?: string;
    /** Item click callback */
    onItemClick?: (item: DockItem) => void;
  }

  let {
    items = [],
    fixed = false,
    showLabels = true,
    variant = 'default',
    size = 'md',
    zoom = false,
    class: className = '',
    onItemClick,
  }: Props = $props();

  const dockClasses = $derived(
    [
      'mljr-dock',
      fixed && 'mljr-dock-fixed',
      variant === 'frosted' && 'mljr-dock-frosted',
      variant === 'full' && 'mljr-dock-full',
      size === 'sm' && 'mljr-dock-sm',
      size === 'lg' && 'mljr-dock-lg',
      !showLabels && 'mljr-dock-no-labels',
      zoom && 'mljr-dock-zoom',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  const iconSizes: Record<string, number> = {
    sm: 18,
    md: 22,
    lg: 26,
  };

  function handleClick(item: DockItem) {
    item.onClick?.();
    onItemClick?.(item);
  }
</script>

<nav class={dockClasses} aria-label="Dock navigation">
  {#each items as item}
    {#if item.dividerBefore}
      <div class="mljr-dock-divider" role="separator"></div>
    {/if}

    {#if item.href}
      <a
        href={item.href}
        class="mljr-dock-item"
        class:mljr-dock-item-active={item.active}
        aria-current={item.active ? 'page' : undefined}
        onclick={() => handleClick(item)}
        title={!showLabels ? item.label : undefined}
      >
        <span class="mljr-dock-icon-wrapper">
          <Icon icon={item.icon} size={iconSizes[size]} />
        </span>
        {#if showLabels}
          <span class="mljr-dock-label">{item.label}</span>
        {/if}
        {#if item.badge}
          <span class="mljr-dock-badge">{item.badge}</span>
        {/if}
      </a>
    {:else}
      <button
        type="button"
        class="mljr-dock-item"
        class:mljr-dock-item-active={item.active}
        aria-current={item.active ? 'page' : undefined}
        onclick={() => handleClick(item)}
        title={!showLabels ? item.label : undefined}
      >
        <span class="mljr-dock-icon-wrapper">
          <Icon icon={item.icon} size={iconSizes[size]} />
        </span>
        {#if showLabels}
          <span class="mljr-dock-label">{item.label}</span>
        {/if}
        {#if item.badge}
          <span class="mljr-dock-badge">{item.badge}</span>
        {/if}
      </button>
    {/if}
  {/each}
</nav>
