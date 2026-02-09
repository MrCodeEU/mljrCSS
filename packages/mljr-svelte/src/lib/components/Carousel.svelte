<script lang="ts">
  import type { Snippet } from 'svelte';

  const browser = typeof window !== 'undefined';

  interface Props {
    children: Snippet;
    autoplay?: boolean;
    interval?: number;
    loop?: boolean;
    showIndicators?: boolean;
    showControls?: boolean;
    variant?: 'default' | 'fade' | 'peek';
    currentSlide?: number;
    onslidechange?: (index: number) => void;
    class?: string;
  }

  let {
    children,
    autoplay = false,
    interval = 5000,
    loop = true,
    showIndicators = true,
    showControls = true,
    variant = 'default',
    currentSlide = $bindable(0),
    onslidechange,
    class: className = '',
  }: Props = $props();

  // Core state - simplified from original
  let isPaused = $state(false);
  let slideCount = $state(0);
  let touchStart = $state(0);
  let touchEnd = $state(0);

  // Refs
  let innerRef: HTMLElement | undefined = $state();
  let autoplayTimer: ReturnType<typeof setTimeout> | undefined;

  // Derived classes
  const carouselClasses = $derived(
    [
      'mljr-carousel',
      variant === 'fade' && 'mljr-carousel-fade',
      variant === 'peek' && 'mljr-carousel-peek',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Count slides after mount
  $effect(() => {
    if (innerRef && browser) {
      // Count slides immediately without RAF for synchronous behavior
      const items = innerRef.querySelectorAll('.mljr-carousel-item');
      slideCount = items.length;

      // Clamp currentSlide if needed
      if (currentSlide >= slideCount && slideCount > 0) {
        currentSlide = 0;
      }
    }
  });

  // Autoplay effect
  $effect(() => {
    if (autoplay && !isPaused && browser && slideCount > 1) {
      autoplayTimer = setTimeout(nextSlide, interval);
      return () => {
        if (autoplayTimer) {
          clearTimeout(autoplayTimer);
        }
      };
    }
  });

  function goToSlide(index: number) {
    if (index >= 0 && index < slideCount) {
      currentSlide = index;
      onslidechange?.(index);
      resetAutoplay();
    }
  }

  function nextSlide() {
    if (currentSlide < slideCount - 1) {
      currentSlide++;
    } else if (loop) {
      currentSlide = 0;
    }
    onslidechange?.(currentSlide);
    resetAutoplay();
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
    } else if (loop) {
      currentSlide = slideCount - 1;
    }
    onslidechange?.(currentSlide);
    resetAutoplay();
  }

  function resetAutoplay() {
    if (autoplayTimer) {
      clearTimeout(autoplayTimer);
      autoplayTimer = undefined;
    }
    if (autoplay && !isPaused && browser) {
      autoplayTimer = setTimeout(nextSlide, interval);
    }
  }

  function handleTouchStart(e: TouchEvent) {
    touchStart = e.touches[0].clientX;
  }

  function handleTouchMove(e: TouchEvent) {
    touchEnd = e.touches[0].clientX;
  }

  function handleTouchEnd() {
    const diff = touchStart - touchEnd;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStart = 0;
    touchEnd = 0;
  }

  function pauseAutoplay() {
    isPaused = true;
    if (autoplayTimer) {
      clearTimeout(autoplayTimer);
      autoplayTimer = undefined;
    }
  }

  function resumeAutoplay() {
    isPaused = false;
    resetAutoplay();
  }
</script>

<div
  class={carouselClasses}
  role="region"
  aria-roledescription="carousel"
  aria-label="Image carousel"
  aria-live={autoplay ? 'polite' : 'off'}
  onmouseenter={pauseAutoplay}
  onmouseleave={resumeAutoplay}
  ontouchstart={handleTouchStart}
  ontouchmove={handleTouchMove}
  ontouchend={handleTouchEnd}
>
  <ul
    bind:this={innerRef}
    class="mljr-carousel-inner"
    style:transform={variant !== 'fade' ? `translateX(-${currentSlide * 100}%)` : undefined}
    role="list"
    aria-label="Slides"
  >
    {@render children()}
  </ul>

  {#if showControls && slideCount > 1}
    <button
      type="button"
      class="mljr-carousel-btn mljr-carousel-btn-prev"
      onclick={prevSlide}
      aria-label="Previous slide"
      disabled={!loop && currentSlide === 0}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <button
      type="button"
      class="mljr-carousel-btn mljr-carousel-btn-next"
      onclick={nextSlide}
      aria-label="Next slide"
      disabled={!loop && currentSlide === slideCount - 1}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  {/if}

  {#if showIndicators && slideCount > 1}
    <div class="mljr-carousel-indicators" role="tablist" aria-label="Slide navigation">
      {#each Array(slideCount) as _, index}
        <button
          type="button"
          class="mljr-carousel-indicator"
          class:active={index === currentSlide}
          onclick={() => goToSlide(index)}
          role="tab"
          aria-selected={index === currentSlide}
          aria-label={`Go to slide ${index + 1} of ${slideCount}`}
        ></button>
      {/each}
    </div>
  {/if}
</div>
