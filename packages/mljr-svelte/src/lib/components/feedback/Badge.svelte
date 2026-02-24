<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from '../layout/Icon.svelte';

  type BadgeVariant =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info';

  type BadgeSize = 'sm' | 'md' | 'lg';

  interface Props {
    variant?: BadgeVariant;
    size?: BadgeSize;
    solid?: boolean;
    outline?: boolean;
    dot?: boolean;
    removable?: boolean;
    icon?: string;
    iconPosition?: 'left' | 'right';
    class?: string;
    children?: Snippet;
    onremove?: () => void;
  }

  let {
    variant = 'default',
    size = 'md',
    solid = false,
    outline = false,
    dot = false,
    removable = false,
    icon,
    iconPosition = 'left',
    class: className = '',
    children,
    onremove,
  }: Props = $props();

  const iconSizes: Record<BadgeSize, number> = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  const variantClasses: Record<BadgeVariant, string> = {
    default: 'mljr-badge-default',
    primary: 'mljr-badge-primary',
    secondary: 'mljr-badge-secondary',
    success: 'mljr-badge-success',
    warning: 'mljr-badge-warning',
    error: 'mljr-badge-error',
    info: 'mljr-badge-info',
  };

  const solidClasses: Record<BadgeVariant, string> = {
    default: 'mljr-badge-default',
    primary: 'mljr-badge-primary-solid',
    secondary: 'mljr-badge-secondary-solid',
    success: 'mljr-badge-success-solid',
    warning: 'mljr-badge-warning-solid',
    error: 'mljr-badge-error-solid',
    info: 'mljr-badge-info-solid',
  };

  const outlineClasses: Record<BadgeVariant, string> = {
    default: 'mljr-badge-outline',
    primary: 'mljr-badge-outline-primary',
    secondary: 'mljr-badge-outline-secondary',
    success: 'mljr-badge-outline',
    warning: 'mljr-badge-outline',
    error: 'mljr-badge-outline',
    info: 'mljr-badge-outline',
  };

  const sizeClasses: Record<BadgeSize, string> = {
    sm: 'mljr-badge-sm',
    md: '',
    lg: 'mljr-badge-lg',
  };

  let variantClass = $derived(
    outline
      ? outlineClasses[variant]
      : solid
        ? solidClasses[variant]
        : variantClasses[variant]
  );

  let classes = $derived(
    [
      'mljr-badge',
      variantClass,
      sizeClasses[size],
      dot && 'mljr-badge-dot',
      removable && 'mljr-badge-removable',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<span class={classes}>
  {#if icon && iconPosition === 'left'}
    <Icon {icon} size={iconSizes[size]} class="mljr-badge-icon" />
  {/if}
  {#if children}
    {@render children()}
  {/if}
  {#if icon && iconPosition === 'right'}
    <Icon {icon} size={iconSizes[size]} class="mljr-badge-icon" />
  {/if}
  {#if removable}
    <button
      type="button"
      class="mljr-badge-remove"
      onclick={onremove}
      aria-label="Remove"
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </button>
  {/if}
</span>
