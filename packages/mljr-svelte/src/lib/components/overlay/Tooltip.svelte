<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    /** Plain text content (simple tooltip) */
    content?: string;
    /** Rich content snippet (overrides content if provided) */
    richContent?: Snippet;
    position?: 'top' | 'bottom' | 'left' | 'right';
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    delay?: number;
    /** Max width for rich content tooltip */
    maxWidth?: string;
    class?: string;
  }

  let {
    children,
    content = '',
    richContent,
    position = 'top',
    variant = 'primary',
    size = 'md',
    delay = 0,
    maxWidth,
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
      richContent && 'mljr-tooltip-rich',
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
  <div
    class="mljr-tooltip-content"
    role="tooltip"
    aria-hidden={!isVisible}
    style={maxWidth ? `max-width: ${maxWidth}` : undefined}
  >
    {#if richContent}
      {@render richContent()}
    {:else}
      {content}
    {/if}
  </div>
</div>
