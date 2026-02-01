<script lang="ts">
  import type { Snippet } from 'svelte';

  type CardVariant = 'default' | 'primary' | 'secondary';

  interface Props {
    variant?: CardVariant;
    title?: string;
    description?: string;
    shadow?: boolean | 'sm' | 'md' | 'lg';
    interactive?: boolean;
    compact?: boolean;
    class?: string;
    header?: Snippet;
    footer?: Snippet;
    children?: Snippet;
    onclick?: () => void;
  }

  let {
    variant = 'default',
    title = '',
    description = '',
    shadow = false,
    interactive = false,
    compact = false,
    class: className = '',
    header,
    footer,
    children,
    onclick,
  }: Props = $props();

  const variantClasses: Record<CardVariant, string> = {
    default: '',
    primary: 'mljr-card-primary',
    secondary: 'mljr-card-secondary',
  };

  let shadowClass = $derived(
    typeof shadow === 'string'
      ? `mljr-card-shadow-${shadow}`
      : shadow
        ? 'mljr-card-shadow'
        : ''
  );

  let classes = $derived(
    [
      'mljr-card',
      variantClasses[variant],
      shadowClass,
      interactive && 'mljr-card-interactive',
      compact && 'mljr-card-compact',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  let hasHeader = $derived(!!header || !!title || !!description);
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  class={classes}
  role={interactive ? 'button' : undefined}
  tabindex={interactive ? 0 : undefined}
  onclick={interactive ? onclick : undefined}
  onkeydown={interactive ? (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onclick?.();
    }
  } : undefined}
>
  {#if hasHeader}
    <div class="mljr-card-header">
      {#if header}
        {@render header()}
      {:else}
        {#if title}
          <h3 class="mljr-card-title">{title}</h3>
        {/if}
        {#if description}
          <p class="mljr-card-description">{description}</p>
        {/if}
      {/if}
    </div>
  {/if}

  {#if children}
    <div class="mljr-card-body">
      {@render children()}
    </div>
  {/if}

  {#if footer}
    <div class="mljr-card-footer">
      {@render footer()}
    </div>
  {/if}
</div>
