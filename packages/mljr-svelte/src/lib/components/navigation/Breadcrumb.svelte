<script module lang="ts">
  export interface BreadcrumbItem {
    label: string;
    href?: string;
    /** Iconify icon name */
    icon?: string;
  }
</script>

<script lang="ts">
  import { Icon } from '$lib';

  interface Props {
    items: BreadcrumbItem[];
    separator?: string;
    /** Maximum items to show before truncating (0 = no limit) */
    maxItems?: number;
    class?: string;
  }

  let {
    items,
    separator = '/',
    maxItems = 0,
    class: className = '',
  }: Props = $props();

  let breadcrumbClasses = $derived(
    ['mljr-breadcrumb', className].filter(Boolean).join(' ')
  );

  let displayItems = $derived.by(() => {
    if (maxItems <= 0 || items.length <= maxItems) {
      return items;
    }

    // Always show first and last items, truncate middle
    const firstItems = items.slice(0, 1);
    const lastItems = items.slice(-(maxItems - 1));
    return [...firstItems, { label: '...', href: undefined }, ...lastItems];
  });
</script>

<nav class={breadcrumbClasses} aria-label="Breadcrumb">
  {#each displayItems as item, index}
    <div class="mljr-breadcrumb-item" class:mljr-breadcrumb-item-active={index === displayItems.length - 1}>
      {#if item.href && index !== displayItems.length - 1}
        <a href={item.href} class="mljr-breadcrumb-link">
          {#if item.icon}
            <Icon icon={item.icon} size={16} />
          {/if}
          {item.label}
        </a>
      {:else}
        <span class="mljr-breadcrumb-link" aria-current={index === displayItems.length - 1 ? 'page' : undefined}>
          {#if item.icon}
            <Icon icon={item.icon} size={16} />
          {/if}
          {item.label}
        </span>
      {/if}
    </div>
    {#if index < displayItems.length - 1}
      <span class="mljr-breadcrumb-separator" aria-hidden="true">{separator}</span>
    {/if}
  {/each}
</nav>
