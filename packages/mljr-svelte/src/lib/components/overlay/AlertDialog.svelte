<script lang="ts">
  import type { Snippet } from 'svelte';
  const browser = typeof window !== 'undefined';

  type AlertDialogVariant = 'default' | 'danger' | 'warning';

  interface Props {
    open?: boolean;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: AlertDialogVariant;
    onconfirm?: () => void;
    oncancel?: () => void;
    children?: Snippet;
  }

  let {
    open = $bindable(false),
    title = '',
    description = '',
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'default',
    onconfirm,
    oncancel,
    children,
  }: Props = $props();

  // Unique ID per instance to avoid aria-labelledby collisions
  const uid = Math.random().toString(36).slice(2, 9);
  const titleId = `alert-dialog-title-${uid}`;
  const descId = `alert-dialog-description-${uid}`;

  let dialogElement = $state<HTMLElement | null>(null);

  const variantIcons: Record<AlertDialogVariant, string> = {
    default: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    danger: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  };

  const confirmButtonVariants: Record<AlertDialogVariant, string> = {
    default: 'mljr-btn mljr-btn-primary',
    danger: 'mljr-btn mljr-btn-danger',
    warning: 'mljr-btn mljr-btn-primary',
  };

  function handleConfirm() {
    open = false;
    onconfirm?.();
  }

  function handleCancel() {
    open = false;
    oncancel?.();
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  }

  // Only handle Escape — Enter is left to the focused button natively
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  }

  function portal(node: HTMLElement) {
    if (!browser) return;
    document.body.appendChild(node);
    return {
      destroy() {
        if (node.parentNode === document.body) {
          document.body.removeChild(node);
        }
      }
    };
  }

  $effect(() => {
    if (!browser) return;

    if (open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeydown);

      setTimeout(() => {
        dialogElement?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeydown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

{#if open}
  <div
    class="mljr-alert-dialog-overlay"
    onclick={handleBackdropClick}
    role="presentation"
    use:portal
  >
    <div
      bind:this={dialogElement}
      class="mljr-alert-dialog"
      data-variant={variant}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descId : undefined}
      tabindex="-1"
    >
      <div class="mljr-alert-dialog-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d={variantIcons[variant]} />
        </svg>
      </div>

      {#if title}
        <h2 id={titleId} class="mljr-alert-dialog-title">{title}</h2>
      {/if}

      {#if description}
        <p id={descId} class="mljr-alert-dialog-description">{description}</p>
      {/if}

      {#if children}
        <div class="mljr-alert-dialog-body">
          {@render children()}
        </div>
      {/if}

      <div class="mljr-alert-dialog-actions">
        <button type="button" class="mljr-btn mljr-btn-outline-secondary" onclick={handleCancel}>
          {cancelLabel}
        </button>
        <button type="button" class={confirmButtonVariants[variant]} onclick={handleConfirm}>
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
{/if}
