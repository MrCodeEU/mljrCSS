<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type EmptyStateVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  type EmptyStateSize = 'sm' | 'md' | 'lg';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    icon?: string;
    variant?: EmptyStateVariant;
    size?: EmptyStateSize;
    compact?: boolean;
    bordered?: boolean;
    card?: boolean;
    children?: Snippet;
    actions?: Snippet;
  }

  let {
    title = '',
    description = '',
    icon = '',
    variant = 'default',
    size = 'md',
    compact = false,
    bordered = false,
    card = false,
    children,
    actions,
    class: className = '',
    ...restProps
  }: Props = $props();

  const variantClasses: Record<EmptyStateVariant, string> = {
    default: '',
    primary: 'mljr-empty-state-primary',
    secondary: 'mljr-empty-state-secondary',
    accent: 'mljr-empty-state-accent',
    success: 'mljr-empty-state-success',
    warning: 'mljr-empty-state-warning',
    error: 'mljr-empty-state-error',
  };

  const sizeClasses: Record<EmptyStateSize, string> = {
    sm: 'mljr-empty-state-sm',
    md: '',
    lg: 'mljr-empty-state-lg',
  };

  let emptyStateClasses = $derived(
    [
      'mljr-empty-state',
      variantClasses[variant],
      sizeClasses[size],
      compact && 'mljr-empty-state-compact',
      bordered && 'mljr-empty-state-bordered',
      card && 'mljr-empty-state-card',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  function getDefaultIcon(): string {
    switch (variant) {
      case 'success': return '✓';
      case 'warning': return '!';
      case 'error': return '✕';
      default: return '◯';
    }
  }
</script>

<div class={emptyStateClasses} {...restProps}>
  {#if children}
    {@render children()}
  {:else}
    {#if icon || variant}
      <div class="mljr-empty-state-icon">
        {#if icon}
          <span>{icon}</span>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
          </svg>
        {/if}
      </div>
    {/if}

    <div class="mljr-empty-state-content">
      {#if title}
        <h3 class="mljr-empty-state-title">{title}</h3>
      {/if}
      
      {#if description}
        <p class="mljr-empty-state-description">{description}</p>
      {/if}
      
      {#if actions}
        <div class="mljr-empty-state-actions">
          {@render actions()}
        </div>
      {/if}
    </div>
  {/if}
</div>
