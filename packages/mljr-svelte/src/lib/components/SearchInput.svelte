<script lang="ts">
  import Icon from './Icon.svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  
  // Generate unique ID for label association
  const inputId = 'search-' + Math.random().toString(36).slice(2, 9);

  interface Props extends Omit<HTMLInputAttributes, 'type' | 'value' | 'oninput'> {
    /** Input value */
    value?: string;
    /** Input label */
    label?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Show loading state */
    loading?: boolean;
    /** Show clear button */
    clearable?: boolean;
    /** Disable the input */
    disabled?: boolean;
    /** Callback when value changes */
    onsearch?: (value: string) => void;
  }

  let {
    value = $bindable(''),
    label,
    placeholder = 'Search...',
    loading = false,
    clearable = true,
    disabled = false,
    onsearch,
    class: className = '',
    ...rest
  }: Props = $props();

  let inputRef = $state<HTMLInputElement | null>(null);

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    onsearch?.(value);
  }

  function clear() {
    value = '';
    onsearch?.('');
    inputRef?.focus();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && value) {
      event.preventDefault();
      clear();
    }
  }
</script>

<div class="mljr-search {className}">
  {#if label}
    <label class="mljr-search-label" for={inputId}>{label}</label>
  {/if}
  
  <div class="mljr-search-wrapper">
    <span class="mljr-search-icon">
      {#if loading}
        <Icon icon="ph:spinner" size={20} />
      {:else}
        <Icon icon="ph:magnifying-glass" size={20} />
      {/if}
    </span>
    
    <input
      bind:this={inputRef}
      id={inputId}
      type="search"
      class="mljr-search-field"
      {placeholder}
      {disabled}
      bind:value
      oninput={handleInput}
      onkeydown={handleKeydown}
      {...rest}
    />
    
    {#if clearable && value}
      <button
        type="button"
        class="mljr-search-clear"
        onclick={clear}
        aria-label="Clear search"
      >
        <Icon icon="ph:x" size={16} />
      </button>
    {/if}
  </div>
</div>

<style>
  .mljr-search {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-2);
  }

  .mljr-search-label {
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text);
  }

  .mljr-search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--mljr-bg);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-full);
    box-shadow: var(--mljr-clay-inset-sm);
    transition: all var(--mljr-transition-fast);
  }

  .mljr-search-wrapper:focus-within {
    border-color: var(--mljr-primary-400);
    box-shadow: var(--mljr-clay-inset-sm), 0 0 0 3px var(--mljr-primary-100);
  }

  .mljr-search-icon {
    display: flex;
    align-items: center;
    padding-left: var(--mljr-space-4);
    color: var(--mljr-text-muted);
  }

  .mljr-search-icon:has(.mljr-icon-loading) {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .mljr-search-field {
    flex: 1;
    padding: var(--mljr-space-3) var(--mljr-space-4);
    background: transparent;
    border: none;
    color: var(--mljr-text);
    font-size: var(--mljr-text-base);
  }

  .mljr-search-field:focus {
    outline: none;
  }

  .mljr-search-field::placeholder {
    color: var(--mljr-text-muted);
  }

  .mljr-search-field::-webkit-search-cancel-button {
    display: none;
  }

  .mljr-search-clear {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: var(--mljr-space-2);
    padding: var(--mljr-space-2);
    background: var(--mljr-bg-secondary);
    border: none;
    border-radius: var(--mljr-radius-full);
    color: var(--mljr-text-muted);
    cursor: pointer;
    transition: all var(--mljr-transition-fast);
  }

  .mljr-search-clear:hover {
    background: var(--mljr-bg-tertiary);
    color: var(--mljr-text);
  }
</style>
