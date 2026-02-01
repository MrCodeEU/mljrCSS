<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  type ButtonVariant =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'outline-primary'
    | 'outline-secondary'
    | 'ghost'
    | 'link'
    | 'danger'
    | 'success';

  type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  interface Props extends HTMLButtonAttributes {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    block?: boolean;
    icon?: boolean;
    children?: Snippet;
  }

  let {
    variant = 'default',
    size = 'md',
    loading = false,
    block = false,
    icon = false,
    disabled = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const variantClasses: Record<ButtonVariant, string> = {
    default: 'mljr-btn',
    primary: 'mljr-btn mljr-btn-primary',
    secondary: 'mljr-btn mljr-btn-secondary',
    'outline-primary': 'mljr-btn mljr-btn-outline-primary',
    'outline-secondary': 'mljr-btn mljr-btn-outline-secondary',
    ghost: 'mljr-btn mljr-btn-ghost',
    link: 'mljr-btn mljr-btn-link',
    danger: 'mljr-btn mljr-btn-danger',
    success: 'mljr-btn mljr-btn-success',
  };

  const sizeClasses: Record<ButtonSize, string> = {
    xs: 'mljr-btn-xs',
    sm: 'mljr-btn-sm',
    md: '',
    lg: 'mljr-btn-lg',
    xl: 'mljr-btn-xl',
  };

  let classes = $derived(
    [
      variantClasses[variant],
      sizeClasses[size],
      block && 'mljr-btn-block',
      icon && 'mljr-btn-icon',
      loading && 'mljr-btn-loading',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<button
  class={classes}
  disabled={disabled || loading}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</button>
