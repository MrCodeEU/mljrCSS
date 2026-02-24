<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { Icon } from '$lib';

  type RadioSize = 'sm' | 'md' | 'lg';
  type RadioColor = 'primary' | 'secondary' | 'accent';

  interface Props extends Omit<HTMLInputAttributes, 'size'> {
    label?: string;
    children?: Snippet;
    size?: RadioSize;
    color?: RadioColor;
    error?: boolean;
    group?: string;
    value?: string;
    /** Custom icon when selected */
    checkedIcon?: string;
    /** Custom icon when not selected */
    uncheckedIcon?: string;
  }

  let {
    label = '',
    children,
    size = 'md',
    color = 'primary',
    error = false,
    group = $bindable(''),
    value = '',
    checkedIcon,
    uncheckedIcon,
    id,
    class: className = '',
    ...restProps
  }: Props = $props();

  let radioId = $derived(id || `radio-${Math.random().toString(36).slice(2, 9)}`);
  let hasCustomIcons = $derived(!!(checkedIcon || uncheckedIcon));
  let isChecked = $derived(group === value);

  const sizeClasses: Record<RadioSize, string> = {
    sm: 'mljr-radio-sm',
    md: '',
    lg: 'mljr-radio-lg',
  };

  const colorClasses: Record<RadioColor, string> = {
    primary: '',
    secondary: 'mljr-radio-secondary',
    accent: 'mljr-radio-accent',
  };

  let radioClasses = $derived(
    [
      'mljr-radio',
      sizeClasses[size],
      colorClasses[color],
      error && 'mljr-radio-error',
      hasCustomIcons && 'mljr-radio-custom-icons',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  function getCurrentIcon() {
    if (isChecked && checkedIcon) {
      return checkedIcon;
    }
    if (!isChecked && uncheckedIcon) {
      return uncheckedIcon;
    }
    // Defaults
    if (isChecked) return 'mdi:radiobox-marked';
    return 'mdi:radiobox-blank';
  }
</script>

<label class={radioClasses}>
  <input
    id={radioId}
    type="radio"
    class="mljr-radio-input"
    class:mljr-radio-input-hidden={hasCustomIcons}
    bind:group
    {value}
    {...restProps}
  />
  {#if hasCustomIcons}
    <span class="mljr-radio-custom-icon">
      <Icon icon={getCurrentIcon()} size={20} />
    </span>
  {/if}
  {#if children}
    {@render children()}
  {:else if label}
    <span class="mljr-radio-label">{label}</span>
  {/if}
</label>

<style>
  .mljr-radio-custom-icons {
    position: relative;
  }

  .mljr-radio-input-hidden {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .mljr-radio-custom-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--mljr-text-secondary);
    transition: color var(--mljr-transition-fast);
    cursor: pointer;
  }

  .mljr-radio:has(.mljr-radio-input:checked) .mljr-radio-custom-icon {
    color: var(--mljr-primary-600);
  }

  .mljr-radio-secondary:has(.mljr-radio-input:checked) .mljr-radio-custom-icon {
    color: var(--mljr-secondary-600);
  }

  .mljr-radio-accent:has(.mljr-radio-input:checked) .mljr-radio-custom-icon {
    color: var(--mljr-accent-600);
  }

  .mljr-radio:has(.mljr-radio-input:disabled) .mljr-radio-custom-icon {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
