<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
  type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    position?: DrawerPosition;
    size?: DrawerSize;
    title?: string;
    showClose?: boolean;
    seamless?: boolean;
    noOverlay?: boolean;
    children?: Snippet;
    footer?: Snippet;
    onClose?: () => void;
  }

  let {
    open = $bindable(false),
    position = 'right',
    size = 'md',
    title = '',
    showClose = true,
    seamless = false,
    noOverlay = false,
    children,
    footer,
    onClose,
    class: className = '',
    ...restProps
  }: Props = $props();

  const sizeClasses: Record<DrawerSize, string> = {
    sm: 'mljr-drawer-sm',
    md: '',
    lg: 'mljr-drawer-lg',
    xl: 'mljr-drawer-xl',
    full: 'mljr-drawer-full',
  };

  let drawerClasses = $derived(
    [
      'mljr-drawer',
      `mljr-drawer-${position}`,
      sizeClasses[size],
      seamless && 'mljr-drawer-seamless',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  function handleClose() {
    open = false;
    onClose?.();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      handleClose();
    }
  }

  function handleOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  {#if !noOverlay}
    <div
      class="mljr-drawer-overlay"
      onclick={handleOverlayClick}
      role="presentation"
    ></div>
  {/if}
  
  <div
    class={drawerClasses}
    role="dialog"
    aria-modal="true"
    aria-labelledby={title ? 'drawer-title' : undefined}
    {...restProps}
  >
    {#if title || showClose}
      <div class="mljr-drawer-header">
        {#if title}
          <h2 id="drawer-title" class="mljr-drawer-title">{title}</h2>
        {:else}
          <span></span>
        {/if}
        
        {#if showClose}
          <button
            type="button"
            class="mljr-drawer-close"
            onclick={handleClose}
            aria-label="Close drawer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        {/if}
      </div>
    {/if}

    <div class="mljr-drawer-body">
      {#if children}
        {@render children()}
      {/if}
    </div>

    {#if footer}
      <div class="mljr-drawer-footer">
        {@render footer()}
      </div>
    {/if}
  </div>
{/if}
