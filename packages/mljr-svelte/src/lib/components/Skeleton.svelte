<script lang="ts">
  interface Props {
    variant?: 'text' | 'title' | 'avatar' | 'card' | 'button' | 'image' | 'custom';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'primary' | 'secondary';
    pulse?: boolean;
    static?: boolean;
    circle?: boolean;
    width?: string;
    height?: string;
    class?: string;
  }

  let {
    variant = 'text',
    size = 'md',
    color = 'primary',
    pulse = false,
    static: isStatic = false,
    circle = false,
    width,
    height,
    class: className = '',
  }: Props = $props();

  // Size class applies to avatar variants and text variant
  function getSizeClass(): string {
    if (size === 'md' || variant === 'custom' || variant === 'title') {
      return '';
    }
    if (variant === 'text') {
      return `mljr-skeleton-text-${size}`;
    }
    // For avatar, card, button, image variants
    return `mljr-skeleton-${variant}-${size}`;
  }

  const skeletonClasses = $derived(
    [
      'mljr-skeleton',
      variant !== 'custom' && `mljr-skeleton-${variant}`,
      getSizeClass(),
      color !== 'primary' && `mljr-skeleton-${color}`,
      pulse && 'mljr-skeleton-pulse',
      isStatic && 'mljr-skeleton-static',
      circle && 'mljr-skeleton-circle',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div
  class={skeletonClasses}
  style:width={width}
  style:height={height}
  aria-hidden="true"
>
  <!-- Shimmer effect -->
  {#if !isStatic && !pulse}
    <span class="mljr-skeleton-shimmer"></span>
  {/if}
</div>
