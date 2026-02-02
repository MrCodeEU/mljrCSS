<script lang="ts">
  interface Props {
    variant?: 'text' | 'title' | 'avatar' | 'card' | 'button' | 'image' | 'custom';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'primary' | 'secondary' | 'accent';
    pulse?: boolean;
    static?: boolean;
    circle?: boolean;
    showAccents?: boolean;
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
    showAccents = true,
    width,
    height,
    class: className = '',
  }: Props = $props();

  const skeletonClasses = $derived(
    [
      'mljr-skeleton',
      variant !== 'custom' && `mljr-skeleton-${variant}`,
      variant !== 'custom' && variant !== 'text' && variant !== 'title' && size !== 'md' && `mljr-skeleton-${variant}-${size}`,
      variant === 'text' && size !== 'md' && `mljr-skeleton-text-${size}`,
      color !== 'primary' && `mljr-skeleton-${color}`,
      pulse && 'mljr-skeleton-pulse',
      isStatic && 'mljr-skeleton-static',
      circle && 'mljr-skeleton-circle',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  const styles = $derived({
    width: width || undefined,
    height: height || undefined,
  });

  // Show accents on larger variants
  const shouldShowAccents = $derived(
    showAccents && (variant === 'card' || variant === 'image' || variant === 'button')
  );
</script>

<div
  class={skeletonClasses}
  style:width={styles.width}
  style:height={styles.height}
  aria-hidden="true"
>
  <!-- Detroit shimmer effect -->
  {#if !isStatic && !pulse}
    <span class="mljr-skeleton-shimmer"></span>
  {/if}
  <!-- HUD corner accents -->
  {#if shouldShowAccents}
    <span class="mljr-skeleton-accent-tl"></span>
    <span class="mljr-skeleton-accent-br"></span>
  {/if}
</div>
