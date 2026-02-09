<script lang="ts">
  interface BreadcrumbItem {
    label: string;
    href?: string;
  }

  interface Props {
    items: BreadcrumbItem[];
    separator?: string;
    class?: string;
  }

  let {
    items,
    separator = '/',
    class: className = '',
  }: Props = $props();

  let breadcrumbClasses = $derived(
    ['mljr-breadcrumb', className].filter(Boolean).join(' ')
  );
</script>

<nav class={breadcrumbClasses} aria-label="Breadcrumb">
  {#each items as item, index}
    <div class="mljr-breadcrumb-item" class:mljr-breadcrumb-item-active={index === items.length - 1}>
      {#if item.href && index !== items.length - 1}
        <a href={item.href} class="mljr-breadcrumb-link">{item.label}</a>
      {:else}
        <span class="mljr-breadcrumb-link" aria-current={index === items.length - 1 ? 'page' : undefined}>
          {item.label}
        </span>
      {/if}
    </div>
    {#if index < items.length - 1}
      <span class="mljr-breadcrumb-separator" aria-hidden="true">{separator}</span>
    {/if}
  {/each}
</nav>
