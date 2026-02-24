<script lang="ts">
  import { Icon } from '$lib';

  export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
  }

  interface Props {
    /** Array of options */
    options: SelectOption[];
    /** Selected value(s) */
    value?: string | string[];
    /** Label for the select */
    label?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Helper text */
    helperText?: string;
    /** Error state */
    error?: boolean;
    /** Error message */
    errorMessage?: string;
    /** Enable search/filter */
    searchable?: boolean;
    /** Enable multi-select */
    multiple?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Required field */
    required?: boolean;
    /** Callback when value changes */
    onchange?: (value: string | string[]) => void;
    /** Additional CSS classes */
    class?: string;
  }

  let {
    options,
    value = $bindable(undefined),
    label,
    placeholder = 'Select an option',
    helperText,
    error = false,
    errorMessage,
    searchable = false,
    multiple = false,
    disabled = false,
    required = false,
    onchange,
    class: className = '',
  }: Props = $props();

  let isOpen = $state(false);
  let searchQuery = $state('');
  let selectedValues = $state<string[]>([]);

  // Initialize selected values
  $effect(() => {
    if (multiple && Array.isArray(value)) {
      selectedValues = value;
    } else if (!multiple && typeof value === 'string') {
      selectedValues = value ? [value] : [];
    } else {
      selectedValues = [];
    }
  });

  const filteredOptions = $derived(() => {
    if (!searchable || !searchQuery) return options;
    const query = searchQuery.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) || opt.value.toLowerCase().includes(query)
    );
  });

  const displayText = $derived(() => {
    if (selectedValues.length === 0) return placeholder;
    if (multiple) {
      return selectedValues
        .map((val) => options.find((opt) => opt.value === val)?.label)
        .filter(Boolean)
        .join(', ');
    }
    return options.find((opt) => opt.value === selectedValues[0])?.label || placeholder;
  });

  function toggleOption(optionValue: string) {
    if (multiple) {
      if (selectedValues.includes(optionValue)) {
        selectedValues = selectedValues.filter((v) => v !== optionValue);
      } else {
        selectedValues = [...selectedValues, optionValue];
      }
      value = selectedValues as any;
      onchange?.(selectedValues);
    } else {
      selectedValues = [optionValue];
      value = optionValue as any;
      onchange?.(optionValue);
      isOpen = false;
    }
  }

  function clearSelection() {
    selectedValues = [];
    value = (multiple ? [] : '') as any;
    onchange?.(multiple ? [] : '');
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.mljr-select-menu')) {
      isOpen = false;
      searchQuery = '';
    }
  }

  $effect(() => {
    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="mljr-select-menu {className}" class:mljr-select-menu-disabled={disabled}>
  {#if label}
    <span class="mljr-select-menu-label">
      {label}
      {#if required}<span class="mljr-select-menu-required">*</span>{/if}
    </span>
  {/if}

  <div class="mljr-select-menu-wrapper">
    <button
      type="button"
      class="mljr-select-menu-trigger"
      class:mljr-select-menu-error={error}
      class:mljr-select-menu-open={isOpen}
      {disabled}
      onclick={() => (isOpen = !isOpen)}
    >
      <span class="mljr-select-menu-value" class:mljr-select-menu-placeholder={selectedValues.length === 0}>
        {displayText()}
      </span>
      <Icon icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} size={20} />
    </button>
    {#if selectedValues.length > 0 && !disabled}
      <button
        type="button"
        class="mljr-select-menu-clear"
        onclick={clearSelection}
        aria-label="Clear selection"
      >
        <Icon icon="mdi:close-circle" size={16} />
      </button>
    {/if}

    {#if isOpen}
      <div class="mljr-select-menu-dropdown">
        {#if searchable}
          <div class="mljr-select-menu-search">
            <Icon icon="mdi:magnify" size={18} />
            <input
              type="text"
              placeholder="Search..."
              bind:value={searchQuery}
              class="mljr-select-menu-search-input"
            />
          </div>
        {/if}

        <div class="mljr-select-menu-options">
          {#each filteredOptions() as option (option.value)}
            <button
              type="button"
              class="mljr-select-menu-option"
              class:mljr-select-menu-option-selected={selectedValues.includes(option.value)}
              class:mljr-select-menu-option-disabled={option.disabled}
              disabled={option.disabled}
              onclick={() => !option.disabled && toggleOption(option.value)}
            >
              {#if multiple}
                <div class="mljr-select-menu-checkbox" class:checked={selectedValues.includes(option.value)}>
                  {#if selectedValues.includes(option.value)}
                    <Icon icon="mdi:check" size={14} />
                  {/if}
                </div>
              {/if}
              <span class="mljr-select-menu-option-label">{option.label}</span>
              {#if !multiple && selectedValues.includes(option.value)}
                <Icon icon="mdi:check" size={18} />
              {/if}
            </button>
          {:else}
            <div class="mljr-select-menu-empty">No options found</div>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  {#if error && errorMessage}
    <span class="mljr-select-menu-error-message">{errorMessage}</span>
  {:else if helperText}
    <span class="mljr-select-menu-helper">{helperText}</span>
  {/if}
</div>

<style>
  .mljr-select-menu {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-2);
    position: relative;
  }

  .mljr-select-menu-label {
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text);
  }

  .mljr-select-menu-required {
    color: var(--mljr-error);
    margin-left: var(--mljr-space-1);
  }

  .mljr-select-menu-wrapper {
    position: relative;
  }

  .mljr-select-menu-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--mljr-space-2);
    padding: var(--mljr-space-3) var(--mljr-space-4);
    background: var(--mljr-bg);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-md);
    box-shadow: var(--mljr-clay-inset-sm);
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text);
    cursor: pointer;
    transition: all var(--mljr-transition-fast);
    text-align: left;
  }

  .mljr-select-menu-trigger:hover:not(:disabled) {
    border-color: var(--mljr-primary-600);
  }

  .mljr-select-menu-trigger:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .mljr-select-menu-error {
    border-color: var(--mljr-error);
  }

  .mljr-select-menu-open {
    border-color: var(--mljr-primary-600);
  }

  .mljr-select-menu-value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mljr-select-menu-placeholder {
    color: var(--mljr-text-secondary);
  }

  .mljr-select-menu-icons {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-1);
    color: var(--mljr-text-secondary);
  }

  .mljr-select-menu-clear {
    position: absolute;
    right: 36px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    padding: 0;
    background: none;
    border: none;
    color: var(--mljr-text-secondary);
    cursor: pointer;
    transition: color var(--mljr-transition-fast);
    z-index: 1;
  }

  .mljr-select-menu-clear:hover {
    color: var(--mljr-error);
  }

  .mljr-select-menu-dropdown {
    position: absolute;
    top: calc(100% + var(--mljr-space-2));
    left: 0;
    right: 0;
    z-index: 1000;
    background: var(--mljr-bg);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-shadow);
    max-height: 300px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .mljr-select-menu-search {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
    padding: var(--mljr-space-3) var(--mljr-space-4);
    border-bottom: 1px solid var(--mljr-border);
    color: var(--mljr-text-secondary);
  }

  .mljr-select-menu-search-input {
    flex: 1;
    border: none;
    background: none;
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text);
    outline: none;
  }

  .mljr-select-menu-options {
    overflow-y: auto;
    padding: var(--mljr-space-2);
  }

  .mljr-select-menu-option {
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--mljr-space-3);
    padding: var(--mljr-space-3) var(--mljr-space-3);
    background: none;
    border: none;
    border-radius: var(--mljr-radius-sm);
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text);
    cursor: pointer;
    transition: background var(--mljr-transition-fast);
    text-align: left;
  }

  .mljr-select-menu-option:hover:not(:disabled) {
    background: var(--mljr-bg-secondary);
  }

  .mljr-select-menu-option-selected {
    background: var(--mljr-primary-100);
    color: var(--mljr-primary-700);
  }

  .mljr-select-menu-option-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .mljr-select-menu-option-label {
    flex: 1;
  }

  .mljr-select-menu-checkbox {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--mljr-border);
    border-radius: var(--mljr-radius-sm);
    background: var(--mljr-bg);
    transition: all var(--mljr-transition-fast);
  }

  .mljr-select-menu-checkbox.checked {
    background: var(--mljr-primary-600);
    border-color: var(--mljr-primary-600);
    color: white;
  }

  .mljr-select-menu-empty {
    padding: var(--mljr-space-4);
    text-align: center;
    color: var(--mljr-text-secondary);
    font-size: var(--mljr-text-sm);
  }

  .mljr-select-menu-helper {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-secondary);
  }

  .mljr-select-menu-error-message {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-error);
  }
</style>
