<script lang="ts">
  import type { Snippet } from 'svelte';
  import { browser } from '$app/environment';

  type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

  interface Props {
    open?: boolean;
    title?: string;
    description?: string;
    size?: ModalSize;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    showClose?: boolean;
    class?: string;
    header?: Snippet;
    footer?: Snippet;
    children?: Snippet;
    onclose?: () => void;
  }

  let {
    open = $bindable(false),
    title = '',
    description = '',
    size = 'md',
    closeOnBackdrop = true,
    closeOnEscape = true,
    showClose = true,
    class: className = '',
    header,
    footer,
    children,
    onclose,
  }: Props = $props();

  const sizeClasses: Record<ModalSize, string> = {
    sm: 'mljr-modal-sm',
    md: '',
    lg: 'mljr-modal-lg',
    xl: 'mljr-modal-xl',
    full: 'mljr-modal-full',
  };

  let modalClasses = $derived(
    ['mljr-modal', sizeClasses[size], className].filter(Boolean).join(' ')
  );

  function handleClose() {
    open = false;
    onclose?.();
  }

  function handleBackdropClick(e: MouseEvent) {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      handleClose();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (closeOnEscape && e.key === 'Escape') {
      handleClose();
    }
  }

  $effect(() => {
    if (!browser) return;

    if (open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeydown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

{#if open}
  <div
    class="mljr-modal-backdrop"
    data-state="open"
    onclick={handleBackdropClick}
    role="presentation"
  >
    <div
      class={modalClasses}
      data-state="open"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
      tabindex="-1"
    >
      {#if header || title || showClose}
        <div class="mljr-modal-header">
          <div>
            {#if header}
              {@render header()}
            {:else}
              {#if title}
                <h2 id="modal-title" class="mljr-modal-title">{title}</h2>
              {/if}
              {#if description}
                <p id="modal-description" class="mljr-modal-description">{description}</p>
              {/if}
            {/if}
          </div>
          {#if showClose}
            <button
              type="button"
              class="mljr-modal-close"
              onclick={handleClose}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
              </svg>
            </button>
          {/if}
        </div>
      {/if}

      {#if children}
        <div class="mljr-modal-body">
          {@render children()}
        </div>
      {/if}

      {#if footer}
        <div class="mljr-modal-footer">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}
