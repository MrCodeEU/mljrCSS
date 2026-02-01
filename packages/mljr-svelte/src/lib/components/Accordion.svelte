<script lang="ts">
  import type { Snippet } from 'svelte';

  type AccordionVariant = 'default' | 'flush' | 'separated';

  interface AccordionItem {
    id: string;
    title: string;
    content: string | Snippet;
    disabled?: boolean;
  }

  interface Props {
    items: AccordionItem[];
    multiple?: boolean;
    variant?: AccordionVariant;
    primary?: boolean;
    secondary?: boolean;
    class?: string;
    defaultOpen?: string[];
    onchange?: (openItems: string[]) => void;
  }

  let {
    items,
    multiple = false,
    variant = 'default',
    primary = false,
    secondary = false,
    class: className = '',
    defaultOpen = [],
    onchange,
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  // defaultOpen is intentionally only used for initial state
  let openItems = $state<Set<string>>(new Set(defaultOpen));

  const variantClasses: Record<AccordionVariant, string> = {
    default: '',
    flush: 'mljr-accordion-flush',
    separated: 'mljr-accordion-separated',
  };

  let accordionClasses = $derived(
    [
      'mljr-accordion',
      variantClasses[variant],
      primary && 'mljr-accordion-primary',
      secondary && 'mljr-accordion-secondary',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  function toggleItem(itemId: string) {
    const newOpenItems = new Set(openItems);

    if (openItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      if (!multiple) {
        newOpenItems.clear();
      }
      newOpenItems.add(itemId);
    }

    openItems = newOpenItems;
    onchange?.(Array.from(openItems));
  }

  function isOpen(itemId: string): boolean {
    return openItems.has(itemId);
  }
</script>

<div class={accordionClasses}>
  {#each items as item (item.id)}
    {@const itemOpen = isOpen(item.id)}
    <div
      class="mljr-accordion-item"
      class:mljr-accordion-item-open={itemOpen}
    >
      <button
        type="button"
        class="mljr-accordion-trigger"
        aria-expanded={itemOpen}
        aria-controls={`content-${item.id}`}
        id={`trigger-${item.id}`}
        disabled={item.disabled}
        onclick={() => toggleItem(item.id)}
      >
        <span>{item.title}</span>
        <svg
          class="mljr-accordion-icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M3.204 5.587a.5.5 0 0 1 .796-.083L8 9.293l4-3.79a.5.5 0 0 1 .708.708l-4.354 4.126a.5.5 0 0 1-.708 0L3.292 6.211a.5.5 0 0 1-.088-.624z"/>
        </svg>
      </button>
      <div
        id={`content-${item.id}`}
        role="region"
        aria-labelledby={`trigger-${item.id}`}
        class="mljr-accordion-content"
        class:mljr-accordion-content-open={itemOpen}
        class:mljr-accordion-content-closed={!itemOpen}
      >
        <div class="mljr-accordion-body">
          {#if typeof item.content === 'string'}
            {item.content}
          {:else}
            {@render item.content()}
          {/if}
        </div>
      </div>
    </div>
  {/each}
</div>
