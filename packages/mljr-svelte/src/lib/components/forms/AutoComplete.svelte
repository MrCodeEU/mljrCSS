<script lang="ts">
  import type { Snippet } from 'svelte';

  export interface AutoCompleteOption {
    label: string;
    value: string;
    group?: string;
    icon?: string;
    description?: string;
    disabled?: boolean;
  }

  interface Props {
    /** Current selected value(s). Pass [] for multiple mode, '' for single mode */
    value?: string | string[];
    /** All available options */
    options?: AutoCompleteOption[] | string[];
    /** Allow multiple selections */
    multiple?: boolean;
    /** Input placeholder */
    placeholder?: string;
    /** Disabled state */
    disabled?: boolean;
    /** Allow values not in the options list */
    allowCustom?: boolean;
    /** Max number of options to show */
    maxOptions?: number;
    /** Whether to show a clear button */
    clearable?: boolean;
    /** Label */
    label?: string;
    /** Helper text */
    helperText?: string;
    /** Error state */
    error?: boolean;
    /** Error message */
    errorMessage?: string;
    /** Additional CSS class */
    class?: string;
    /** No results message */
    noResultsText?: string;
    /** Custom option snippet */
    optionContent?: Snippet<[AutoCompleteOption]>;
    /** Change callback */
    onChange?: (value: string | string[]) => void;
  }

  let {
    value = $bindable(''),
    options = [],
    multiple = false,
    placeholder = 'Search...',
    disabled = false,
    allowCustom = false,
    maxOptions = 20,
    clearable = true,
    label,
    helperText,
    error = false,
    errorMessage = '',
    class: className = '',
    noResultsText = 'No results found',
    optionContent,
    onChange,
  }: Props = $props();

  // Normalize options to AutoCompleteOption[]
  const normalizedOptions = $derived(
    (options as Array<string | AutoCompleteOption>).map(opt =>
      typeof opt === 'string' ? { label: opt, value: opt } : opt
    )
  );

  let inputValue = $state('');
  let open = $state(false);
  let highlightedIndex = $state(-1);
  let inputEl: HTMLInputElement | undefined = $state();
  let containerEl: HTMLElement | undefined = $state();
  const dropdownId = `mljr-autocomplete-${Math.random().toString(36).slice(2, 8)}`;

  const selectedValues = $derived(
    multiple ? (value as string[]) : (value ? [value as string] : [])
  );

  const filteredOptions = $derived(() => {
    if (!inputValue) return normalizedOptions.slice(0, maxOptions);
    const q = inputValue.toLowerCase();
    return normalizedOptions
      .filter(opt => opt.label.toLowerCase().includes(q) || opt.value.toLowerCase().includes(q))
      .slice(0, maxOptions);
  });

  const groupedOptions = $derived(() => {
    const opts = filteredOptions();
    const groups: Record<string, AutoCompleteOption[]> = {};
    for (const opt of opts) {
      const g = opt.group || '';
      if (!groups[g]) groups[g] = [];
      groups[g].push(opt);
    }
    return groups;
  });

  const hasGroups = $derived(filteredOptions().some(o => o.group));

  function isSelected(optionValue: string): boolean {
    return selectedValues.includes(optionValue);
  }

  function selectOption(opt: AutoCompleteOption) {
    if (opt.disabled) return;

    if (multiple) {
      const arr = value as string[];
      if (isSelected(opt.value)) {
        value = arr.filter(v => v !== opt.value);
      } else {
        value = [...arr, opt.value];
      }
      inputValue = '';
      onChange?.(value);
    } else {
      value = opt.value;
      inputValue = opt.label;
      open = false;
      onChange?.(value);
    }
  }

  function removeSelected(val: string) {
    if (!multiple) return;
    value = (value as string[]).filter(v => v !== val);
    onChange?.(value);
  }

  function clearAll() {
    value = multiple ? [] : '';
    inputValue = '';
    onChange?.(value);
  }

  function getLabelForValue(val: string): string {
    return normalizedOptions.find(o => o.value === val)?.label ?? val;
  }

  function handleInput() {
    open = true;
    highlightedIndex = -1;
  }

  function handleFocus() {
    open = true;
  }

  function handleKeydown(e: KeyboardEvent) {
    const opts = filteredOptions();

    if (e.key === 'Escape') {
      open = false;
      inputEl?.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      open = true;
      highlightedIndex = Math.min(highlightedIndex + 1, opts.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedIndex = Math.max(highlightedIndex - 1, -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && opts[highlightedIndex]) {
        selectOption(opts[highlightedIndex]);
      } else if (allowCustom && inputValue.trim()) {
        selectOption({ label: inputValue.trim(), value: inputValue.trim() });
      }
    } else if (e.key === 'Backspace' && !inputValue && multiple) {
      const arr = value as string[];
      if (arr.length > 0) {
        value = arr.slice(0, -1);
        onChange?.(value);
      }
    }
  }

  function highlightText(text: string): string {
    if (!inputValue) return text;
    const idx = text.toLowerCase().indexOf(inputValue.toLowerCase());
    if (idx < 0) return text;
    return (
      text.slice(0, idx) +
      `<mark class="mljr-autocomplete-highlight">${text.slice(idx, idx + inputValue.length)}</mark>` +
      text.slice(idx + inputValue.length)
    );
  }

  // Close dropdown when clicking outside
  $effect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerEl && !containerEl.contains(e.target as Node)) {
        open = false;
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  // Sync inputValue with single selection label
  $effect(() => {
    if (!multiple && value) {
      const opt = normalizedOptions.find(o => o.value === (value as string));
      if (opt && !open) {
        inputValue = opt.label;
      }
    }
  });
</script>

<div class="mljr-autocomplete {className}" bind:this={containerEl}>
  {#if label}
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="mljr-label" for={dropdownId}>{label}</label>
  {/if}

  <!-- Selected chips (multiple mode) -->
  {#if multiple && selectedValues.length > 0}
    <div class="mljr-autocomplete-chips">
      {#each selectedValues as val}
        <span class="mljr-chip mljr-chip-primary mljr-chip-sm mljr-chip-removable">
          {getLabelForValue(val)}
          <button
            type="button"
            class="mljr-chip-remove"
            onclick={() => removeSelected(val)}
            aria-label="Remove {getLabelForValue(val)}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </span>
      {/each}
    </div>
  {/if}

  <!-- Input wrapper -->
  <div class="mljr-autocomplete-input-wrapper">
    <input
      bind:this={inputEl}
      type="text"
      class="mljr-input mljr-w-full {error ? 'mljr-input-error' : ''}"
      style={clearable && (inputValue || selectedValues.length > 0) ? 'padding-right: 2.25rem;' : ''}
      {placeholder}
      {disabled}
      bind:value={inputValue}
      oninput={handleInput}
      onfocus={handleFocus}
      onkeydown={handleKeydown}
      role="combobox"
      aria-expanded={open}
      aria-controls={dropdownId}
      aria-autocomplete="list"
      aria-haspopup="listbox"
      autocomplete="off"
    />
    {#if clearable && (inputValue || selectedValues.length > 0) && !disabled}
      <button
        type="button"
        class="mljr-autocomplete-clear"
        onclick={clearAll}
        aria-label="Clear selection"
        tabindex="-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </button>
    {/if}
  </div>

  <!-- Dropdown -->
  {#if open && !disabled}
    <div id={dropdownId} class="mljr-autocomplete-dropdown" role="listbox" aria-label={label ?? placeholder}>
      {#if filteredOptions().length === 0}
        <div class="mljr-autocomplete-no-results">
          {noResultsText}
          {#if allowCustom && inputValue.trim()}
            <br />
            <button
              type="button"
              class="mljr-btn mljr-btn-ghost mljr-mt-2"
              onclick={() => selectOption({ label: inputValue.trim(), value: inputValue.trim() })}
            >
              Add "{inputValue.trim()}"
            </button>
          {/if}
        </div>
      {:else if hasGroups}
        {#each Object.entries(groupedOptions()) as [group, groupOpts]}
          {#if group}
            <div class="mljr-autocomplete-group-header">{group}</div>
          {/if}
          {#each groupOpts as opt, i}
            {@const globalIndex = filteredOptions().indexOf(opt)}
            <button
              type="button"
              class="mljr-autocomplete-option"
              class:mljr-autocomplete-option-selected={isSelected(opt.value)}
              class:mljr-autocomplete-option-highlighted={globalIndex === highlightedIndex}
              onmouseenter={() => highlightedIndex = globalIndex}
              onmousedown={(e) => { e.preventDefault(); selectOption(opt); }}
              role="option"
              aria-selected={isSelected(opt.value)}
              aria-disabled={opt.disabled}
              disabled={opt.disabled}
            >
              {#if optionContent}
                {@render optionContent(opt)}
              {:else}
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                <span>{@html highlightText(opt.label)}</span>
                {#if opt.description}
                  <span style="font-size: var(--mljr-text-xs); color: var(--mljr-text-muted); margin-left: auto;">{opt.description}</span>
                {/if}
              {/if}
              {#if isSelected(opt.value)}
                <span class="mljr-autocomplete-option-checkmark" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              {/if}
            </button>
          {/each}
        {/each}
      {:else}
        {#each filteredOptions() as opt, i}
          <button
            type="button"
            class="mljr-autocomplete-option"
            class:mljr-autocomplete-option-selected={isSelected(opt.value)}
            class:mljr-autocomplete-option-highlighted={i === highlightedIndex}
            onmouseenter={() => highlightedIndex = i}
            onmousedown={(e) => { e.preventDefault(); selectOption(opt); }}
            role="option"
            aria-selected={isSelected(opt.value)}
            aria-disabled={opt.disabled}
            disabled={opt.disabled}
          >
            {#if optionContent}
              {@render optionContent(opt)}
            {:else}
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              <span>{@html highlightText(opt.label)}</span>
              {#if opt.description}
                <span style="font-size: var(--mljr-text-xs); color: var(--mljr-text-muted); margin-left: auto;">{opt.description}</span>
              {/if}
            {/if}
            {#if isSelected(opt.value)}
              <span class="mljr-autocomplete-option-checkmark" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            {/if}
          </button>
        {/each}
      {/if}
    </div>
  {/if}

  <!-- Helper/Error text -->
  {#if error && errorMessage}
    <p class="mljr-input-error-text" style="color: var(--mljr-error); font-size: var(--mljr-text-xs); margin-top: 0.25rem;">{errorMessage}</p>
  {:else if helperText}
    <p class="mljr-input-hint" style="color: var(--mljr-text-muted); font-size: var(--mljr-text-xs); margin-top: 0.25rem;">{helperText}</p>
  {/if}
</div>
