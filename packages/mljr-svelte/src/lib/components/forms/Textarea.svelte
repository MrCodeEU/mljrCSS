<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  type TextareaSize = 'sm' | 'md' | 'lg';

  interface Props extends Omit<HTMLTextareaAttributes, 'size' | 'value'> {
    label?: string;
    helperText?: string;
    errorText?: string;
    size?: TextareaSize;
    error?: boolean;
    success?: boolean;
    required?: boolean;
    maxLength?: number;
    showCount?: boolean;
    autoResize?: boolean;
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
    maxLength = 0,
    showCount = false,
    autoResize = false,
    value = $bindable(''),
    id,
    class: className = '',
    rows = 4,
    ...restProps
  }: Props = $props();

  let textareaId = $derived(id || `textarea-${Math.random().toString(36).slice(2, 9)}`);
  let textareaElement = $state<HTMLTextAreaElement | null>(null);

  const sizeClasses: Record<TextareaSize, string> = {
    sm: 'mljr-textarea-sm',
    md: '',
    lg: 'mljr-textarea-lg',
  };

  let textareaClasses = $derived(
    [
      'mljr-textarea',
      sizeClasses[size],
      error && 'mljr-textarea-error',
      success && 'mljr-textarea-success',
      autoResize && 'mljr-textarea-auto-resize',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  let labelClasses = $derived(
    ['mljr-textarea-label', required && 'mljr-textarea-label-required'].filter(Boolean).join(' ')
  );

  let charCount = $derived(value?.length || 0);
  let isOverLimit = $derived(maxLength > 0 && charCount > maxLength);
  let isNearLimit = $derived(maxLength > 0 && charCount > maxLength * 0.9 && !isOverLimit);

  function handleInput() {
    if (autoResize && textareaElement) {
      textareaElement.style.height = 'auto';
      textareaElement.style.height = textareaElement.scrollHeight + 'px';
    }
  }

  $effect(() => {
    if (autoResize && textareaElement && value) {
      handleInput();
    }
  });
</script>

<div class="mljr-textarea-wrapper">
  {#if label}
    <label for={textareaId} class={labelClasses}>
      {label}
    </label>
  {/if}

  <textarea
    id={textareaId}
    class={textareaClasses}
    bind:value
    bind:this={textareaElement}
    aria-invalid={error}
    aria-describedby={errorText ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
    oninput={handleInput}
    {rows}
    maxlength={maxLength}
    {...restProps}
  ></textarea>

  {#if showCount || maxLength > 0}
    <div class="mljr-textarea-footer">
      {#if errorText}
        <p id="{textareaId}-error" class="mljr-textarea-error-text">{errorText}</p>
      {:else if helperText}
        <p id="{textareaId}-helper" class="mljr-textarea-helper">{helperText}</p>
      {:else}
        <span></span>
      {/if}
      
      {#if showCount || maxLength > 0}
        <span class="mljr-textarea-count" class:mljr-textarea-count-warning={isNearLimit} class:mljr-textarea-count-error={isOverLimit}>
          {charCount}{maxLength > 0 ? `/${maxLength}` : ''}
        </span>
      {/if}
    </div>
  {:else if errorText}
    <p id="{textareaId}-error" class="mljr-textarea-error-text">{errorText}</p>
  {:else if helperText}
    <p id="{textareaId}-helper" class="mljr-textarea-helper">{helperText}</p>
  {/if}
</div>
