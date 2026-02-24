<script lang="ts">
  import type { Snippet } from 'svelte';

  type ChipVariant = 'default' | 'primary' | 'secondary' | 'accent';

  interface Props {
    /** Current chip values */
    value?: string[];
    /** Placeholder text for the input */
    placeholder?: string;
    /** Whether the input is disabled */
    disabled?: boolean;
    /** Maximum number of chips allowed */
    max?: number;
    /** Whether the input is in an error state */
    error?: boolean;
    /** Error message */
    errorMessage?: string;
    /** Chip color variant */
    chipVariant?: ChipVariant;
    /** Separator keys to trigger chip addition */
    separators?: string[];
    /** Whether to allow duplicate values */
    allowDuplicates?: boolean;
    /** Custom validator function */
    validate?: (value: string) => string | null;
    /** Label for the input */
    label?: string;
    /** Helper text */
    helperText?: string;
    /** Input name attribute */
    name?: string;
    /** Additional CSS class */
    class?: string;
    /** Chip icon snippet */
    chipIcon?: Snippet<[string]>;
    /** Callback when chips change */
    onChange?: (chips: string[]) => void;
  }

  let {
    value = $bindable([]),
    placeholder = 'Add tag...',
    disabled = false,
    max,
    error = false,
    errorMessage = '',
    chipVariant = 'primary',
    separators = ['Enter', ','],
    allowDuplicates = false,
    validate,
    label,
    helperText,
    name,
    class: className = '',
    chipIcon,
    onChange,
  }: Props = $props();

  let inputValue = $state('');
  let validationError = $state<string | null>(null);
  let inputEl: HTMLInputElement | undefined = $state();
  let isFocused = $state(false);

  function addChip(chipValue: string) {
    const trimmed = chipValue.trim();
    if (!trimmed) return;

    // Check max
    if (max !== undefined && value.length >= max) {
      validationError = `Maximum ${max} tags allowed`;
      return;
    }

    // Check duplicates
    if (!allowDuplicates && value.includes(trimmed)) {
      validationError = 'Duplicate tag';
      return;
    }

    // Custom validation
    if (validate) {
      const errMsg = validate(trimmed);
      if (errMsg) {
        validationError = errMsg;
        return;
      }
    }

    validationError = null;
    value = [...value, trimmed];
    inputValue = '';
    onChange?.(value);
  }

  function removeChip(index: number) {
    if (disabled) return;
    value = value.filter((_, i) => i !== index);
    onChange?.(value);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (separators.includes(e.key)) {
      e.preventDefault();
      addChip(inputValue);
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      removeChip(value.length - 1);
    }
  }

  function handleBlur() {
    isFocused = false;
    if (inputValue.trim()) {
      addChip(inputValue);
    }
  }

  function handlePaste(e: ClipboardEvent) {
    const text = e.clipboardData?.getData('text');
    if (!text) return;
    e.preventDefault();
    const chips = text.split(/[,\n\t]+/).map(s => s.trim()).filter(Boolean);
    chips.forEach(chip => addChip(chip));
  }

  function focusInput() {
    inputEl?.focus();
  }

  const variantClasses: Record<ChipVariant, string> = {
    default: 'mljr-chip',
    primary: 'mljr-chip mljr-chip-primary',
    secondary: 'mljr-chip mljr-chip-secondary',
    accent: 'mljr-chip mljr-chip-accent',
  };

  const hasError = $derived(error || !!validationError);
  const displayError = $derived(validationError || errorMessage);
</script>

<div class="chip-input-wrapper {className}">
  {#if label}
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <span class="mljr-label" role="presentation">{label}</span>
  {/if}

  <!-- Input container -->
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div
    class="chip-input-container mljr-input"
    class:chip-input-focused={isFocused}
    class:chip-input-error={hasError}
    class:chip-input-disabled={disabled}
    onclick={focusInput}
    role="none"
    style="height: auto; min-height: 2.5rem; padding: 0.375rem 0.625rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.375rem; cursor: text;"
  >
    <!-- Chips -->
    {#each value as chip, index}
      <span class="{variantClasses[chipVariant]} mljr-chip-sm mljr-chip-removable" style="display: inline-flex; align-items: center; gap: 0.25rem;">
        {#if chipIcon}
          {@render chipIcon(chip)}
        {/if}
        {chip}
        {#if !disabled}
          <button
            type="button"
            class="mljr-chip-remove"
            onclick={(e) => { e.stopPropagation(); removeChip(index); }}
            aria-label="Remove {chip}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        {/if}
      </span>
    {/each}

    <!-- Text input -->
    {#if !disabled && (max === undefined || value.length < max)}
      <input
        bind:this={inputEl}
        bind:value={inputValue}
        type="text"
        {placeholder}
        {name}
        {disabled}
        onkeydown={handleKeydown}
        onfocus={() => isFocused = true}
        onblur={handleBlur}
        onpaste={handlePaste}
        class="chip-input-field"
        style="flex: 1; min-width: 80px; background: transparent; border: none; outline: none; padding: 0; font-size: inherit; font-family: inherit; color: inherit;"
        aria-label={placeholder}
        autocomplete="off"
      />
    {/if}
  </div>

  <!-- Helper/Error text -->
  {#if displayError && hasError}
    <p class="mljr-input-error-text" style="color: var(--mljr-error); font-size: var(--mljr-text-xs); margin-top: 0.25rem;">
      {displayError}
    </p>
  {:else if helperText}
    <p class="mljr-input-hint" style="color: var(--mljr-text-muted); font-size: var(--mljr-text-xs); margin-top: 0.25rem;">
      {helperText}
    </p>
  {/if}

  <!-- Hidden native input for form submission -->
  {#each value as chip}
    <input type="hidden" {name} value={chip} />
  {/each}
</div>

<style>
  .chip-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .chip-input-container {
    cursor: text;
  }

  .chip-input-focused {
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.15);
    border-color: var(--mljr-primary-400) !important;
  }

  .chip-input-error {
    border-color: var(--mljr-error) !important;
  }

  .chip-input-error.chip-input-focused {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
  }

  .chip-input-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
