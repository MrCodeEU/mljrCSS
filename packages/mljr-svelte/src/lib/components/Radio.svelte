<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  type RadioSize = 'sm' | 'md' | 'lg';
  type RadioColor = 'primary' | 'secondary' | 'accent';

  interface Props extends Omit<HTMLInputAttributes, 'size'> {
    label?: string;
    size?: RadioSize;
    color?: RadioColor;
    error?: boolean;
    group?: string;
    value?: string;
  }

  let {
    label = '',
    size = 'md',
    color = 'primary',
    error = false,
    group = $bindable(''),
    value = '',
    id,
    class: className = '',
    ...restProps
  }: Props = $props();

  let radioId = $derived(id || `radio-${Math.random().toString(36).slice(2, 9)}`);

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
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<label class={radioClasses}>
  <input
    id={radioId}
    type="radio"
    class="mljr-radio-input"
    bind:group
    {value}
    {...restProps}
  />
  {#if label}
    <span class="mljr-radio-label">{label}</span>
  {/if}
</label>
