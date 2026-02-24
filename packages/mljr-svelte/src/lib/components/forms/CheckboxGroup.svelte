<script lang="ts">
  import { Checkbox } from '$lib';

  export interface CheckboxOption {
    /** Unique value for this option */
    value: string;
    /** Display label */
    label: string;
    /** Whether this option is disabled */
    disabled?: boolean;
    /** Helper text for this option */
    helperText?: string;
  }

  interface Props {
    /** Array of checkbox options */
    options: CheckboxOption[];
    /** Currently selected values */
    value?: string[];
    /** Group label */
    label?: string;
    /** Helper text for the entire group */
    helperText?: string;
    /** Display direction */
    direction?: 'horizontal' | 'vertical';
    /** Whether all checkboxes are disabled */
    disabled?: boolean;
    /** Show "Select All" checkbox */
    showSelectAll?: boolean;
    /** Label for "Select All" checkbox */
    selectAllLabel?: string;
    /** Maximum number of selections allowed (0 = unlimited) */
    maxSelections?: number;
    /** Callback when value changes */
    onchange?: (values: string[]) => void;
    /** Additional CSS classes */
    class?: string;
  }

  let {
    options,
    value = $bindable([]),
    label,
    helperText,
    direction = 'vertical',
    disabled = false,
    showSelectAll = false,
    selectAllLabel = 'Select All',
    maxSelections = 0,
    onchange,
    class: className = '',
  }: Props = $props();

  let allSelected = $derived(
    options.filter((opt) => !opt.disabled).every((opt) => value.includes(opt.value))
  );

  let someSelected = $derived(
    value.length > 0 && !allSelected
  );

  function handleCheckboxChange(optionValue: string, checked: boolean) {
    if (checked) {
      // Check if we've hit max selections
      if (maxSelections > 0 && value.length >= maxSelections) {
        return;
      }
      value = [...value, optionValue];
    } else {
      value = value.filter((v) => v !== optionValue);
    }
    onchange?.(value);
  }

  function handleSelectAll(checked: boolean) {
    if (checked) {
      // Select all non-disabled options
      value = options.filter((opt) => !opt.disabled).map((opt) => opt.value);
    } else {
      // Deselect all
      value = [];
    }
    onchange?.(value);
  }

  function isChecked(optionValue: string): boolean {
    return value.includes(optionValue);
  }

  function isDisabled(option: CheckboxOption): boolean {
    return disabled || option.disabled || false;
  }

  function isMaxed(option: CheckboxOption): boolean {
    if (maxSelections === 0) return false;
    return !value.includes(option.value) && value.length >= maxSelections;
  }
</script>

<div class="mljr-checkbox-group mljr-checkbox-group-{direction} {className}">
  {#if label}
    <div class="mljr-checkbox-group-label">{label}</div>
  {/if}

  {#if showSelectAll}
    <div class="mljr-checkbox-group-select-all">
      <Checkbox
        checked={allSelected}
        indeterminate={someSelected}
        disabled={disabled}
        onchange={(e) => handleSelectAll((e.target as HTMLInputElement).checked)}
      >
        {selectAllLabel}
      </Checkbox>
    </div>
    <div class="mljr-checkbox-group-divider"></div>
  {/if}

  <div class="mljr-checkbox-group-options">
    {#each options as option (option.value)}
      <div class="mljr-checkbox-group-option">
        <Checkbox
          checked={isChecked(option.value)}
          disabled={isDisabled(option) || isMaxed(option)}
          onchange={(e) => handleCheckboxChange(option.value, (e.target as HTMLInputElement).checked)}
        >
          <div class="mljr-checkbox-option-content">
            <span class="mljr-checkbox-option-label">{option.label}</span>
            {#if option.helperText}
              <span class="mljr-checkbox-option-helper">{option.helperText}</span>
            {/if}
          </div>
        </Checkbox>
      </div>
    {/each}
  </div>

  {#if helperText}
    <div class="mljr-checkbox-group-helper">{helperText}</div>
  {/if}

  {#if maxSelections > 0}
    <div class="mljr-checkbox-group-counter">
      {value.length} / {maxSelections} selected
    </div>
  {/if}
</div>

<style>
  .mljr-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-3);
  }

  .mljr-checkbox-group-label {
    font-size: var(--mljr-text-sm);
    font-weight: 600;
    color: var(--mljr-text);
    margin-bottom: var(--mljr-space-1);
  }

  .mljr-checkbox-group-select-all {
    padding-bottom: var(--mljr-space-2);
  }

  .mljr-checkbox-group-divider {
    height: 1px;
    background: var(--mljr-border);
    margin: var(--mljr-space-2) 0;
  }

  .mljr-checkbox-group-options {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-3);
  }

  .mljr-checkbox-group-horizontal .mljr-checkbox-group-options {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--mljr-space-4);
  }

  .mljr-checkbox-group-option {
    display: flex;
    align-items: flex-start;
  }

  .mljr-checkbox-option-content {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-1);
  }

  .mljr-checkbox-option-label {
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text);
  }

  .mljr-checkbox-option-helper {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-secondary);
    line-height: 1.4;
  }

  .mljr-checkbox-group-helper {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-secondary);
    margin-top: var(--mljr-space-1);
  }

  .mljr-checkbox-group-counter {
    font-size: var(--mljr-text-xs);
    font-weight: 500;
    color: var(--mljr-primary-600);
    margin-top: var(--mljr-space-1);
  }
</style>
