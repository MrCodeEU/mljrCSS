<script lang="ts">
  import { Radio } from '$lib';

  export interface RadioOption {
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
    /** Array of radio options */
    options: RadioOption[];
    /** Currently selected value */
    value?: string;
    /** Radio button name (required for grouping) */
    name: string;
    /** Group label */
    label?: string;
    /** Helper text for the entire group */
    helperText?: string;
    /** Display direction */
    direction?: 'horizontal' | 'vertical';
    /** Whether all radios are disabled */
    disabled?: boolean;
    /** Show error state */
    error?: boolean;
    /** Error message */
    errorMessage?: string;
    /** Callback when value changes */
    onchange?: (value: string) => void;
    /** Additional CSS classes */
    class?: string;
  }

  let {
    options,
    value = $bindable(''),
    name,
    label,
    helperText,
    direction = 'vertical',
    disabled = false,
    error = false,
    errorMessage,
    onchange,
    class: className = '',
  }: Props = $props();

  function handleRadioChange(optionValue: string) {
    value = optionValue;
    onchange?.(optionValue);
  }

  function isDisabled(option: RadioOption): boolean {
    return disabled || option.disabled || false;
  }
</script>

<div
  class="mljr-radio-group mljr-radio-group-{direction} {className}"
  class:mljr-radio-group-error={error}
>
  {#if label}
    <div class="mljr-radio-group-label">{label}</div>
  {/if}

  <div class="mljr-radio-group-options">
    {#each options as option (option.value)}
      <div class="mljr-radio-group-option">
        <Radio
          {name}
          value={option.value}
          bind:group={value}
          disabled={isDisabled(option)}
          onchange={() => handleRadioChange(option.value)}
        >
          <div class="mljr-radio-option-content">
            <span class="mljr-radio-option-label">{option.label}</span>
            {#if option.helperText}
              <span class="mljr-radio-option-helper">{option.helperText}</span>
            {/if}
          </div>
        </Radio>
      </div>
    {/each}
  </div>

  {#if error && errorMessage}
    <div class="mljr-radio-group-error-message">{errorMessage}</div>
  {:else if helperText}
    <div class="mljr-radio-group-helper">{helperText}</div>
  {/if}
</div>

<style>
  .mljr-radio-group {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-3);
  }

  .mljr-radio-group-label {
    font-size: var(--mljr-text-sm);
    font-weight: 600;
    color: var(--mljr-text);
    margin-bottom: var(--mljr-space-1);
  }

  .mljr-radio-group-options {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-3);
  }

  .mljr-radio-group-horizontal .mljr-radio-group-options {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--mljr-space-4);
  }

  .mljr-radio-group-option {
    display: flex;
    align-items: flex-start;
  }

  .mljr-radio-option-content {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-1);
  }

  .mljr-radio-option-label {
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text);
  }

  .mljr-radio-option-helper {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-secondary);
    line-height: 1.4;
  }

  .mljr-radio-group-helper {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-secondary);
    margin-top: var(--mljr-space-1);
  }

  .mljr-radio-group-error .mljr-radio-group-label {
    color: var(--mljr-error);
  }

  .mljr-radio-group-error-message {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-error);
    margin-top: var(--mljr-space-1);
  }
</style>
