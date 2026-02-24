<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Legend text */
    legend?: string;
    /** Disabled state for all inputs inside */
    disabled?: boolean;
    /** Additional CSS class */
    class?: string;
    /** Custom legend content */
    legendContent?: Snippet;
    /** Fieldset content */
    children?: Snippet;
  }

  let {
    legend,
    disabled = false,
    class: className = '',
    legendContent,
    children,
  }: Props = $props();
</script>

<fieldset class="mljr-fieldset {className}" {disabled}>
  {#if legend || legendContent}
    <legend class="mljr-fieldset-legend">
      {#if legendContent}
        {@render legendContent()}
      {:else}
        {legend}
      {/if}
    </legend>
  {/if}

  {#if children}
    <div class="mljr-fieldset-content">
      {@render children()}
    </div>
  {/if}
</fieldset>

<style>
  .mljr-fieldset {
    margin: 0;
    padding: var(--mljr-space-6);
    border: 2px solid var(--mljr-border);
    border-radius: var(--mljr-radius-xl);
    background: var(--mljr-bg-secondary);
    box-shadow: var(--mljr-clay-shadow-sm);
    transition: all var(--mljr-transition-fast);
  }

  .mljr-fieldset:focus-within {
    border-color: var(--mljr-primary-300);
    box-shadow: var(--mljr-clay-shadow);
  }

  .mljr-fieldset-legend {
    padding: var(--mljr-space-2) var(--mljr-space-4);
    font-size: var(--mljr-text-base);
    font-weight: 700;
    color: var(--mljr-text);
    background: linear-gradient(135deg, var(--mljr-bg) 0%, var(--mljr-bg-secondary) 100%);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-shadow-xs);
    border: 1px solid var(--mljr-border);
  }

  .mljr-fieldset-content {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-4);
    margin-top: var(--mljr-space-4);
  }

  .mljr-fieldset:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--mljr-bg-tertiary);
  }

  .mljr-fieldset:disabled .mljr-fieldset-legend {
    opacity: 0.7;
  }
</style>
