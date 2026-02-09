<script lang="ts">
  import Icon from './Icon.svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'type' | 'value' | 'oninput'> {
    /** Input value */
    value?: string;
    /** Input label */
    label?: string;
    /** Helper text */
    helper?: string;
    /** Error message */
    error?: string;
    /** Whether the field is required */
    required?: boolean;
    /** Disable the input */
    disabled?: boolean;
    /** Show validation status icon */
    showValidation?: boolean;
    /** Allow multiple emails (comma-separated) */
    multiple?: boolean;
    /** Validate on blur */
    validateOnBlur?: boolean;
    /** Custom validation function */
    validator?: (email: string) => boolean;
    /** Callback when validation status changes */
    onvalidation?: (isValid: boolean, email: string) => void;
    /** Callback when value changes */
    onvaluechange?: (value: string) => void;
  }

  let {
    value = $bindable(''),
    label,
    helper,
    error,
    required = false,
    disabled = false,
    showValidation = true,
    multiple = false,
    validateOnBlur = true,
    validator,
    onvalidation,
    onvaluechange,
    class: className = '',
    ...rest
  }: Props = $props();

  let touched = $state(false);
  let isFocused = $state(false);

  // RFC 5322 compliant regex (simplified)
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  // Multiple emails regex
  const MULTIPLE_EMAILS_REGEX = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\s*,\s*)*[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  function validateEmail(email: string): boolean {
    if (!email) return !required;
    
    const regex = multiple ? MULTIPLE_EMAILS_REGEX : EMAIL_REGEX;
    const basicValid = regex.test(email);
    
    if (!basicValid) return false;
    if (validator) return validator(email);
    
    return true;
  }

  let isValid = $derived(validateEmail(value));
  let hasError = $derived(!!error || (touched && validateOnBlur && !isValid && value.length > 0));

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    onvaluechange?.(value);
    onvalidation?.(isValid, value);
  }

  function handleBlur() {
    isFocused = false;
    touched = true;
    onvalidation?.(isValid, value);
  }

  function handleFocus() {
    isFocused = true;
  }

  function getValidationIcon(): string {
    if (!showValidation || !value) return '';
    return isValid ? 'ph:check-circle' : 'ph:warning-circle';
  }

  function getValidationClass(): string {
    if (!value) return '';
    return isValid ? 'valid' : 'invalid';
  }

  function clearInput() {
    value = '';
    onvaluechange?.('');
    onvalidation?.(true, '');
  }
</script>

<div 
  class="mljr-email-input {className}" 
  class:has-error={hasError}
  class:is-valid={isValid && value}
  class:is-focused={isFocused}
  class:is-disabled={disabled}
>
  {#if label}
    <label class="mljr-email-label" for={rest.id}>
      {label}
      {#if required}
        <span class="mljr-email-required">*</span>
      {/if}
    </label>
  {/if}

  <div class="mljr-email-wrapper">
    <span class="mljr-email-icon">
      <Icon icon="ph:envelope" size={20} />
    </span>

    <input
      type="email"
      class="mljr-email-field"
      bind:value
      {disabled}
      {required}
      oninput={handleInput}
      onblur={handleBlur}
      onfocus={handleFocus}
      {multiple}
      {...rest}
    />

    {#if value}
      <button
        type="button"
        class="mljr-email-clear"
        onclick={clearInput}
        aria-label="Clear email"
      >
        <Icon icon="ph:x" size={16} />
      </button>
    {/if}

    {#if showValidation && value}
      <span class="mljr-email-validation {getValidationClass()}">
        <Icon icon={getValidationIcon()} size={18} />
      </span>
    {/if}
  </div>

  {#if hasError}
    <span class="mljr-email-error">
      <Icon icon="ph:warning" size={14} />
      {error || (multiple ? 'Please enter valid email addresses separated by commas' : 'Please enter a valid email address')}
    </span>
  {:else if helper}
    <span class="mljr-email-helper">{helper}</span>
  {/if}
</div>

<style>
  .mljr-email-input {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-2);
  }

  .mljr-email-label {
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text);
  }

  .mljr-email-required {
    color: var(--mljr-error-500);
    margin-left: var(--mljr-space-1);
  }

  .mljr-email-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--mljr-bg);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-inset-sm);
    transition: all var(--mljr-transition-fast);
  }

  .mljr-email-wrapper:focus-within {
    border-color: var(--mljr-primary-400);
    box-shadow: var(--mljr-clay-inset-sm), 0 0 0 3px var(--mljr-primary-100);
  }

  .has-error .mljr-email-wrapper {
    border-color: var(--mljr-error-400);
  }

  .has-error .mljr-email-wrapper:focus-within {
    box-shadow: var(--mljr-clay-inset-sm), 0 0 0 3px var(--mljr-error-100);
  }

  .is-valid .mljr-email-wrapper {
    border-color: var(--mljr-success-400);
  }

  .is-valid .mljr-email-wrapper:focus-within {
    box-shadow: var(--mljr-clay-inset-sm), 0 0 0 3px var(--mljr-success-100);
  }

  .is-disabled .mljr-email-wrapper {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .mljr-email-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--mljr-space-3);
    color: var(--mljr-text-muted);
    flex-shrink: 0;
  }

  .mljr-email-field {
    flex: 1;
    padding: var(--mljr-space-3) 0;
    background: transparent;
    border: none;
    color: var(--mljr-text);
    font-size: var(--mljr-text-base);
    min-width: 0;
  }

  .mljr-email-field:focus {
    outline: none;
  }

  .mljr-email-field::placeholder {
    color: var(--mljr-text-muted);
  }

  .mljr-email-field:disabled {
    cursor: not-allowed;
  }

  .mljr-email-clear {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--mljr-space-2);
    margin: var(--mljr-space-1);
    background: transparent;
    border: none;
    border-radius: var(--mljr-radius-full);
    color: var(--mljr-text-muted);
    cursor: pointer;
    transition: all var(--mljr-transition-fast);
  }

  .mljr-email-clear:hover {
    background: var(--mljr-bg-secondary);
    color: var(--mljr-error-500);
  }

  .mljr-email-validation {
    display: flex;
    align-items: center;
    padding-right: var(--mljr-space-3);
    flex-shrink: 0;
  }

  .mljr-email-validation.valid {
    color: var(--mljr-success-500);
  }

  .mljr-email-validation.invalid {
    color: var(--mljr-error-500);
  }

  .mljr-email-helper {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-muted);
  }

  .mljr-email-error {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-1);
    font-size: var(--mljr-text-xs);
    color: var(--mljr-error-500);
  }
</style>
