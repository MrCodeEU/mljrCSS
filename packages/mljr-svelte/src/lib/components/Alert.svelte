<script lang="ts">
  import type { Snippet } from 'svelte';

  type AlertVariant =
    | 'default'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'primary'
    | 'secondary';

  interface Props {
    variant?: AlertVariant;
    title?: string;
    dismissible?: boolean;
    solid?: boolean;
    class?: string;
    children?: Snippet;
    onclose?: () => void;
  }

  let {
    variant = 'default',
    title = '',
    dismissible = false,
    solid = false,
    class: className = '',
    children,
    onclose,
  }: Props = $props();

  let visible = $state(true);

  const variantClasses: Record<AlertVariant, string> = {
    default: 'mljr-alert-default',
    info: 'mljr-alert-info',
    success: 'mljr-alert-success',
    warning: 'mljr-alert-warning',
    error: 'mljr-alert-error',
    primary: 'mljr-alert-primary',
    secondary: 'mljr-alert-secondary',
  };

  const solidClasses: Record<AlertVariant, string> = {
    default: 'mljr-alert-default',
    info: 'mljr-alert-info-solid',
    success: 'mljr-alert-success-solid',
    warning: 'mljr-alert-warning-solid',
    error: 'mljr-alert-error-solid',
    primary: 'mljr-alert-primary-solid',
    secondary: 'mljr-alert-secondary-solid',
  };

  let classes = $derived(
    [
      'mljr-alert',
      solid ? solidClasses[variant] : variantClasses[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  function handleClose() {
    visible = false;
    onclose?.();
  }
</script>

{#if visible}
  <div class={classes} role="alert">
    <div class="mljr-alert-content">
      {#if title}
        <div class="mljr-alert-title">{title}</div>
      {/if}
      {#if children}
        <div class="mljr-alert-description">
          {@render children()}
        </div>
      {/if}
    </div>
    {#if dismissible}
      <button
        type="button"
        class="mljr-alert-close"
        onclick={handleClose}
        aria-label="Close"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    {/if}
  </div>
{/if}
