<script lang="ts">
  import type { Snippet } from 'svelte';

  type Position = 'top' | 'bottom' | 'left' | 'right';
  type Size = 'sm' | 'md' | 'lg';
  type Trigger = 'hover' | 'click';

  interface Props {
    position?: Position;
    size?: Size;
    trigger?: Trigger;
    title?: string;
    showClose?: boolean;
    class?: string;
    content?: Snippet;
    footer?: Snippet;
    children: Snippet;
  }

  let {
    position = 'bottom',
    size = 'md',
    trigger = 'hover',
    title = '',
    showClose = false,
    class: className = '',
    content,
    footer,
    children,
  }: Props = $props();

  let isOpen = $state(false);
  let popoverRef: HTMLElement | undefined = $state();

  const sizeClasses: Record<Size, string> = {
    sm: 'mljr-popover-sm',
    md: '',
    lg: 'mljr-popover-lg',
  };

  const positionClasses: Record<Position, string> = {
    top: 'mljr-popover-top',
    bottom: 'mljr-popover-bottom',
    left: 'mljr-popover-left',
    right: 'mljr-popover-right',
  };

  function handleClick() {
    if (trigger === 'click') {
      isOpen = !isOpen;
    }
  }

  function handleMouseEnter() {
    if (trigger === 'hover') {
      isOpen = true;
    }
  }

  function handleMouseLeave() {
    if (trigger === 'hover') {
      isOpen = false;
    }
  }

  function close(event?: MouseEvent) {
    event?.stopPropagation();
    isOpen = false;
  }

  $effect(() => {
    if (isOpen && trigger === 'click') {
      const handler = (e: MouseEvent) => {
        if (popoverRef && !popoverRef.contains(e.target as Node)) {
          isOpen = false;
        }
      };
      // Delay to avoid immediate close from the same click
      setTimeout(() => {
        document.addEventListener('click', handler);
      }, 0);
      return () => {
        document.removeEventListener('click', handler);
      };
    }
  });

  let popoverClasses = $derived(
    ['mljr-popover', positionClasses[position], sizeClasses[size], trigger === 'click' ? 'mljr-popover-click' : '', isOpen ? 'mljr-popover-open' : '', className]
      .filter(Boolean)
      .join(' ')
  );
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={popoverClasses}
  bind:this={popoverRef}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    class="mljr-popover-trigger"
    onclick={handleClick}
    role={trigger === 'click' ? 'button' : undefined}
    tabindex={trigger === 'click' ? 0 : undefined}
    onkeydown={(e) => {
      if (trigger === 'click' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleClick();
      }
    }}
  >
    {@render children()}
  </div>

  <div class="mljr-popover-content" role="dialog" aria-modal="false">
    {#if title || showClose}
      <div class="mljr-popover-header">
        {#if title}
          <span class="mljr-popover-title">{title}</span>
        {/if}
        {#if showClose}
          <button
            type="button"
            class="mljr-popover-close"
            onclick={(e) => close(e)}
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
            </svg>
          </button>
        {/if}
      </div>
    {/if}

    {#if content}
      <div class="mljr-popover-body">
        {@render content()}
      </div>
    {/if}

    {#if footer}
      <div class="mljr-popover-footer">
        {@render footer()}
      </div>
    {/if}
  </div>
</div>
