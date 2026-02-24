<script lang="ts">
  import { browser } from '$app/environment';
  import { toastStore, type ToastPosition } from '../../stores/toast.svelte';

  interface Props {
    position?: ToastPosition;
  }

  let {
    position = 'top-right',
  }: Props = $props();

  // Set position in store when it changes
  $effect(() => {
    toastStore.setPosition(position);
  });

  // Portal action - teleports the element to document.body
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

  const icons = {
    info: `<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>`,
    success: `<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>`,
    warning: `<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>`,
    error: `<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>`,
  };

  let containerClasses = $derived(
    `mljr-toast-container mljr-toast-container-${toastStore.position}`
  );
</script>

{#if toastStore.toasts.length > 0}
  <div class={containerClasses} use:portal aria-live="polite" aria-atomic="true">
    {#each toastStore.toasts as toast (toast.id)}
      <div
        class="mljr-toast mljr-toast-{toast.type}"
        class:mljr-toast-exit={toast.exiting}
        role="alert"
      >
        <div class="mljr-toast-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {@html icons[toast.type]}
          </svg>
        </div>
        <div class="mljr-toast-content">
          {#if toast.title}
            <div class="mljr-toast-title">{toast.title}</div>
          {/if}
          <div class="mljr-toast-message">{toast.message}</div>
          {#if toast.actions && toast.actions.length > 0}
            <div class="mljr-toast-actions">
              {#each toast.actions as action}
                <button
                  type="button"
                  class="mljr-toast-action-btn"
                  onclick={() => {
                    action.onClick();
                    toastStore.dismiss(toast.id);
                  }}
                >
                  {action.label}
                </button>
              {/each}
            </div>
          {/if}
        </div>
        {#if toast.dismissible}
          <button
            type="button"
            class="mljr-toast-close"
            onclick={() => toastStore.dismiss(toast.id)}
            aria-label="Dismiss"
          >
            <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
            </svg>
          </button>
        {/if}
        {#if toast.duration && toast.duration > 0}
          <div
            class="mljr-toast-progress"
            style="animation-duration: {toast.duration}ms"
          ></div>
        {/if}
      </div>
    {/each}
  </div>
{/if}
