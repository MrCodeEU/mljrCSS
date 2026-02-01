<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLSelectAttributes } from 'svelte/elements';

  type SelectSize = 'sm' | 'md' | 'lg';

  interface Props extends Omit<HTMLSelectAttributes, 'size' | 'value'> {
    label?: string;
    helperText?: string;
    errorText?: string;
    size?: SelectSize;
    error?: boolean;
    required?: boolean;
    value?: string;
    children?: Snippet;
  }

  let {
    label = '',
    helperText = '',
    errorText = '',
    size = 'md',
    error = false,
    required = false,
    value = $bindable(''),
    id,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  let selectId = $derived(id || `select-${Math.random().toString(36).slice(2, 9)}`);

  const sizeClasses: Record<SelectSize, string> = {
    sm: 'mljr-select-sm',
    md: '',
    lg: 'mljr-select-lg',
  };

  let selectClasses = $derived(
    [
      'mljr-select',
      sizeClasses[size],
      error && 'mljr-select-error',
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
    <label for={selectId} class={labelClasses}>
      {label}
    </label>
  {/if}

  <div class="mljr-select-container" class:mljr-select-container-error={error}>
    <select
      id={selectId}
      class={selectClasses}
      aria-invalid={error}
      aria-describedby={errorText ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
      bind:value
      {...restProps}
    >
      {#if children}
        {@render children()}
      {/if}
    </select>
  </div>

  {#if errorText}
    <p id="{selectId}-error" class="mljr-input-error-text">{errorText}</p>
  {:else if helperText}
    <p id="{selectId}-helper" class="mljr-input-helper">{helperText}</p>
  {/if}
</div>
