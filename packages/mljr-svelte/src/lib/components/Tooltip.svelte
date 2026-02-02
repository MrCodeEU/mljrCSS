<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    variant?: 'primary' | 'secondary' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    delay?: number;
    class?: string;
  }

  let {
    children,
    content,
    position = 'top',
    variant = 'primary',
    size = 'md',
    delay = 0,
    class: className = '',
  }: Props = $props();

  let isVisible = $state(false);
  let delayTimer: ReturnType<typeof setTimeout> | undefined = $state();

  const tooltipClasses = $derived(
    [
      'mljr-tooltip',
      `mljr-tooltip-${position}`,
      variant !== 'primary' && `mljr-tooltip-${variant}`,
      size !== 'md' && `mljr-tooltip-${size}`,
      isVisible && 'mljr-tooltip-visible',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  function show() {
    if (delay > 0) {
      delayTimer = setTimeout(() => {
        isVisible = true;
      }, delay);
    } else {
      isVisible = true;
    }
  }

  function hide() {
    if (delayTimer) {
      clearTimeout(delayTimer);
      delayTimer = undefined;
    }
    isVisible = false;
  }
</script>

<div
  class={tooltipClasses}
  onmouseenter={show}
  onmouseleave={hide}
  onfocusin={show}
  onfocusout={hide}
  role="presentation"
>
  {@render children()}
  <div class="mljr-tooltip-content" role="tooltip" aria-hidden={!isVisible}>
    <!-- HUD corner accents -->
    <span class="mljr-tooltip-accent-tl"></span>
    <span class="mljr-tooltip-accent-br"></span>
    {content}
  </div>
</div>
