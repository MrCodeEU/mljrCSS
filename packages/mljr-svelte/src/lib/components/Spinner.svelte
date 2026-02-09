<script lang="ts">
  type Variant = 'circle' | 'ring' | 'pulse' | 'dots' | 'bars' | 'orbit';
  type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type Color = 'primary' | 'secondary';

  interface Props {
    variant?: Variant;
    size?: Size;
    color?: Color;
    label?: string;
    class?: string;
  }

  let {
    variant = 'ring',
    size = 'md',
    color = 'primary',
    label = '',
    class: className = '',
  }: Props = $props();

  const sizeClasses: Record<Size, string> = {
    xs: 'mljr-spinner-xs',
    sm: 'mljr-spinner-sm',
    md: '',
    lg: 'mljr-spinner-lg',
    xl: 'mljr-spinner-xl',
  };

  const variantClasses: Record<Variant, string> = {
    circle: 'mljr-spinner-circle',
    ring: 'mljr-spinner-ring',
    pulse: 'mljr-spinner-pulse',
    dots: 'mljr-spinner-dots',
    bars: 'mljr-spinner-bars',
    orbit: 'mljr-spinner-orbit',
  };

  const colorClasses: Record<Color, string> = {
    primary: '',
    secondary: 'mljr-spinner-secondary',
  };

  let spinnerClasses = $derived(
    ['mljr-spinner', variantClasses[variant], sizeClasses[size], colorClasses[color], className]
      .filter(Boolean)
      .join(' ')
  );

  // Whether to render child elements (for dots and bars variants)
  let needsChildren = $derived(variant === 'dots' || variant === 'bars');
  let childCount = $derived(variant === 'dots' ? 3 : variant === 'bars' ? 4 : 0);
</script>

{#if label}
  <div class="mljr-spinner-text">
    <div class={spinnerClasses} role="status" aria-label={label || 'Loading'}>
      {#if needsChildren}
        {#each Array(childCount) as _}
          <div></div>
        {/each}
      {/if}
    </div>
    <span class="mljr-spinner-label">{label}</span>
  </div>
{:else}
  <div class={spinnerClasses} role="status" aria-label="Loading">
    {#if needsChildren}
      {#each Array(childCount) as _}
        <div></div>
      {/each}
    {/if}
    <span class="mljr-sr-only">Loading...</span>
  </div>
{/if}

<style>
  .mljr-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
