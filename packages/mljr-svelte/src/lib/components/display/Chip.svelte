<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import Icon from '../layout/Icon.svelte';

  type ChipVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'outline';
  type ChipSize = 'sm' | 'md' | 'lg';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    variant?: ChipVariant;
    size?: ChipSize;
    removable?: boolean;
    disabled?: boolean;
    icon?: string;
    iconPosition?: 'left' | 'right';
    children?: Snippet;
    onRemove?: () => void;
  }

  let {
    variant = 'default',
    size = 'md',
    removable = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    children,
    onRemove,
    class: className = '',
    ...restProps
  }: Props = $props();

  const iconSizes: Record<ChipSize, number> = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  const variantClasses: Record<ChipVariant, string> = {
    default: '',
    primary: 'mljr-chip-primary',
    secondary: 'mljr-chip-secondary',
    accent: 'mljr-chip-accent',
    success: 'mljr-chip-success',
    warning: 'mljr-chip-warning',
    error: 'mljr-chip-error',
    outline: 'mljr-chip-outline',
  };

  const sizeClasses: Record<ChipSize, string> = {
    sm: 'mljr-chip-sm',
    md: '',
    lg: 'mljr-chip-lg',
  };

  let chipClasses = $derived(
    [
      'mljr-chip',
      variantClasses[variant],
      sizeClasses[size],
      removable && 'mljr-chip-removable',
      disabled && 'mljr-chip-disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  function handleRemove(e: MouseEvent) {
    e.stopPropagation();
    onRemove?.();
  }
</script>

<span class={chipClasses} {...restProps}>
  {#if icon && iconPosition === 'left'}
    <Icon {icon} size={iconSizes[size]} class="mljr-chip-icon" />
  {/if}
  {#if children}
    {@render children()}
  {/if}
  {#if icon && iconPosition === 'right'}
    <Icon {icon} size={iconSizes[size]} class="mljr-chip-icon" />
  {/if}
  {#if removable}
    <button
      type="button"
      class="mljr-chip-remove"
      onclick={handleRemove}
      aria-label="Remove"
      {disabled}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  {/if}
</span>
