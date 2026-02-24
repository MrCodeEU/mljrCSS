<script lang="ts">
  import type { Snippet } from 'svelte';

  type Animation = 'none' | 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'flip';

  interface Props {
    /** IntersectionObserver threshold (0–1). Default: 0.1 */
    threshold?: number;
    /** Root margin around the viewport. Default: '0px' */
    rootMargin?: string;
    /** Only trigger the animation once. Default: true */
    once?: boolean;
    /** Scroll animation to apply when element enters viewport */
    animation?: Animation;
    /** Animation duration in ms. Default: 600 */
    duration?: number;
    /** Animation delay in ms. Default: 0 */
    delay?: number;
    /** Called when element enters the viewport */
    onEnter?: () => void;
    /** Called when element leaves the viewport (only when once=false) */
    onLeave?: () => void;
    /** Additional CSS class */
    class?: string;
    children?: Snippet;
  }

  let {
    threshold = 0.1,
    rootMargin = '0px',
    once = true,
    animation = 'fade',
    duration = 600,
    delay = 0,
    onEnter,
    onLeave,
    class: className = '',
    children,
  }: Props = $props();

  let el: HTMLElement | undefined = $state();
  let visible = $state(false);

  $effect(() => {
    if (!el || typeof IntersectionObserver === 'undefined') {
      visible = true; // fallback: show immediately if API unavailable
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible = true;
            onEnter?.();
            if (once) observer.disconnect();
          } else {
            if (!once) {
              visible = false;
              onLeave?.();
            }
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  });

  const elClass = $derived(
    [
      'mljr-inview',
      animation !== 'none' && `mljr-inview-${animation}`,
      visible && 'mljr-inview-visible',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  const elStyle = $derived(
    `--mljr-inview-duration: ${duration}ms; --mljr-inview-delay: ${delay}ms`
  );
</script>

<div bind:this={el} class={elClass} style={elStyle}>
  {@render children?.()}
</div>
