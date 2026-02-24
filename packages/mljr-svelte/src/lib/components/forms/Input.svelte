<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  type InputSize = 'sm' | 'md' | 'lg';

  interface Props extends Omit<HTMLInputAttributes, 'size' | 'value'> {
    label?: string;
    helperText?: string;
    errorText?: string;
    size?: InputSize;
    error?: boolean;
    success?: boolean;
    required?: boolean;
    value?: string;
  }

  let {
    label = '',
    helperText = '',
    errorText = '',
    size = 'md',
    error = false,
    success = false,
    required = false,
    value = $bindable(''),
    id,
    class: className = '',
    ...restProps
  }: Props = $props();

  let inputId = $derived(id || `input-${Math.random().toString(36).slice(2, 9)}`);

  const sizeClasses: Record<InputSize, string> = {
    sm: 'mljr-input-sm',
    md: '',
    lg: 'mljr-input-lg',
  };

  let inputClasses = $derived(
    [
      'mljr-input',
      sizeClasses[size],
      error && 'mljr-input-error',
      success && 'mljr-input-success',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  let labelClasses = $derived(
    ['mljr-label', required && 'mljr-label-required'].filter(Boolean).join(' ')
  );
</script>

<div class="mljr-form-group">
  {#if label}
    <label for={inputId} class={labelClasses}>
      {label}
    </label>
  {/if}

  <div class="mljr-input-container" class:mljr-input-container-error={error} class:mljr-input-container-success={success}>
    <input
      id={inputId}
      class={inputClasses}
      aria-invalid={error}
      aria-describedby={errorText ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
      bind:value
      {...restProps}
    />
  </div>

  {#if errorText}
    <p id="{inputId}-error" class="mljr-input-error-text">{errorText}</p>
  {:else if helperText}
    <p id="{inputId}-helper" class="mljr-input-helper">{helperText}</p>
  {/if}
</div>
