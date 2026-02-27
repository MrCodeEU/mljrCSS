<script lang="ts">
  import type { Snippet } from 'svelte';
  import { untrack } from 'svelte';
  const browser = typeof window !== 'undefined';

  type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

  interface Props {
    open?: boolean;
    title?: string;
    description?: string;
    size?: ModalSize;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    showClose?: boolean;
    /** Enable focus trap to keep focus within modal */
    trapFocus?: boolean;
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
    trapFocus = true,
    class: className = '',
    header,
    footer,
    children,
    onclose,
  }: Props = $props();

  // Modal stack for nested modals support
  let modalStack = $state<symbol[]>([]);
  let modalId = Symbol('modal');
  let modalElement = $state<HTMLElement | null>(null);
  let lastFocusedElement: Element | null = null;

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
    // Only close if this is the topmost modal
    if (closeOnBackdrop && e.target === e.currentTarget && isTopModal()) {
      handleClose();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    // Only handle Escape if this is the topmost modal
    if (closeOnEscape && e.key === 'Escape' && isTopModal()) {
      e.preventDefault();
      e.stopPropagation();
      handleClose();
    }
  }

  function isTopModal(): boolean {
    return modalStack[modalStack.length - 1] === modalId;
  }

  // Focus trap: Get all focusable elements within modal
  function getFocusableElements(): HTMLElement[] {
    if (!modalElement) return [];

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    return Array.from(modalElement.querySelectorAll(focusableSelectors));
  }

  function handleFocusTrap(e: KeyboardEvent) {
    if (!trapFocus || !isTopModal()) return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab: moving backwards
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: moving forwards
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }

  // Portal action - teleports the element to document.body
  function portal(node: HTMLElement) {
    if (!browser) return;

    // Move the node to body
    document.body.appendChild(node);

    return {
      destroy() {
        // Remove from body when component is destroyed
        if (node.parentNode === document.body) {
          document.body.removeChild(node);
        }
      }
    };
  }

  $effect(() => {
    if (!browser) return;

    if (open) {
      // Save the currently focused element
      lastFocusedElement = document.activeElement;

      // Add this modal to the stack (untracked to avoid reactive loop)
      untrack(() => {
        modalStack = [...modalStack, modalId];
        if (modalStack.length === 1) {
          document.body.style.overflow = 'hidden';
        }
      });

      // Add event listeners
      document.addEventListener('keydown', handleKeydown);
      if (trapFocus) {
        document.addEventListener('keydown', handleFocusTrap);
      }

      // Focus the modal after a brief delay
      setTimeout(() => {
        if (modalElement && trapFocus) {
          const focusableElements = getFocusableElements();
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          } else {
            modalElement.focus();
          }
        }
      }, 100);
    } else {
      // Remove this modal from the stack (untracked to avoid reactive loop)
      untrack(() => {
        modalStack = modalStack.filter((id) => id !== modalId);
        if (modalStack.length === 0) {
          document.body.style.overflow = '';
        }
      });

      // Restore focus to the element that was focused before opening modal
      if (lastFocusedElement && lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    }

    return () => {
      // Cleanup on destroy
      untrack(() => {
        modalStack = modalStack.filter((id) => id !== modalId);
        if (modalStack.length === 0) {
          document.body.style.overflow = '';
        }
      });
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keydown', handleFocusTrap);
    };
  });
</script>

{#if open}
  {@const stackIndex = modalStack.indexOf(modalId)}
  {@const zIndex = 1000 + stackIndex * 10}
  <div
    class="mljr-modal-backdrop"
    data-state="open"
    onclick={handleBackdropClick}
    role="presentation"
    style="z-index: {zIndex}"
    use:portal
  >
    <div
      bind:this={modalElement}
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
