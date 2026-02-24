<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Label text */
    label?: string;
    /** Associated input ID */
    for?: string;
    /** Mark as required */
    required?: boolean;
    /** Helper text below label */
    helperText?: string;
    /** Error message */
    error?: string;
    /** Disabled state */
    disabled?: boolean;
    /** Additional CSS class */
    class?: string;
    /** Custom label content */
    children?: Snippet;
  }

  let {
    label,
    for: htmlFor,
    required = false,
    helperText,
    error,
    disabled = false,
    class: className = '',
    children,
  }: Props = $props();
</script>

<div class="mljr-label-wrapper {className}" class:mljr-label-disabled={disabled} class:mljr-label-error={error}>
  {#if label || children}
    <label for={htmlFor} class="mljr-label">
      {#if children}
        {@render children()}
      {:else}
        {label}
      {/if}
      {#if required}
        <span class="mljr-label-required" aria-label="required">*</span>
      {/if}
    </label>
  {/if}

  {#if helperText && !error}
    <p class="mljr-label-helper">{helperText}</p>
  {/if}

  {#if error}
    <p class="mljr-label-error-text">{error}</p>
  {/if}
</div>

<style>
  .mljr-label-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-1);
    margin-bottom: var(--mljr-space-2);
  }

  .mljr-label {
    display: inline-flex;
    align-items: center;
    gap: var(--mljr-space-1);
    font-size: var(--mljr-text-sm);
    font-weight: 600;
    color: var(--mljr-text);
    cursor: pointer;
    transition: color var(--mljr-transition-fast);
  }

  .mljr-label-required {
    color: var(--mljr-error);
    font-weight: 700;
  }

  .mljr-label-helper {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-muted);
    margin: 0;
  }

  .mljr-label-error-text {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-error);
    font-weight: 500;
    margin: 0;
    display: flex;
    align-items: center;
    gap: var(--mljr-space-1);
  }

  .mljr-label-error-text::before {
    content: '⚠';
    font-size: var(--mljr-text-sm);
  }

  .mljr-label-disabled .mljr-label {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .mljr-label-error .mljr-label {
    color: var(--mljr-error);
  }
</style>
