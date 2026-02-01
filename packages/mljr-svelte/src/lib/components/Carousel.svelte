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
    indicatorStyle?: 'default' | 'diamond';
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
    indicatorStyle = 'default',
    class: className = '',
  }: Props = $props();

  let currentIndex = $state(0);
  let autoplayTimer: ReturnType<typeof setTimeout> | undefined = $state();
  let isPaused = $state(false);
  let carouselRef: HTMLDivElement | undefined = $state();
  let innerRef: HTMLDivElement | undefined = $state();
  let slideCount = $state(0);
  let touchStartX = $state(0);
  let touchEndX = $state(0);

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

  const indicatorClasses = $derived(
    [
      'mljr-carousel-indicators',
      indicatorStyle === 'diamond' && 'mljr-carousel-indicators-diamond',
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Count slides after mount and when children change
  $effect(() => {
    if (innerRef && browser) {
      // Use RAF to ensure DOM is fully rendered
      requestAnimationFrame(() => {
        if (innerRef) {
          const items = innerRef.querySelectorAll('.mljr-carousel-item');
          slideCount = items.length;
          
          // Ensure currentIndex is valid
          if (currentIndex >= slideCount && slideCount > 0) {
            currentIndex = 0;
          }
        }
      });
    }
  });

  function goToSlide(index: number) {
    if (index >= 0 && index < slideCount) {
      currentIndex = index;
      resetAutoplay();
    }
  }

  function nextSlide() {
    if (currentIndex < slideCount - 1) {
      currentIndex++;
    } else if (loop) {
      currentIndex = 0;
    }
    resetAutoplay();
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else if (loop) {
      currentIndex = slideCount - 1;
    }
    resetAutoplay();
  }

  function resetAutoplay() {
    if (autoplayTimer) {
      clearTimeout(autoplayTimer);
    }
    if (autoplay && !isPaused && browser) {
      autoplayTimer = setTimeout(nextSlide, interval);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(slideCount - 1);
    }
  }

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX;
  }

  function handleTouchMove(e: TouchEvent) {
    touchEndX = e.touches[0].clientX;
  }

  function handleTouchEnd() {
    const diff = touchStartX - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX = 0;
    touchEndX = 0;
  }

  function pauseAutoplay() {
    isPaused = true;
    if (autoplayTimer) {
      clearTimeout(autoplayTimer);
    }
  }

  function resumeAutoplay() {
    isPaused = false;
    resetAutoplay();
  }

  // Setup and cleanup autoplay
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
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  bind:this={carouselRef}
  class={carouselClasses}
  role="region"
  aria-label="Carousel"
  aria-roledescription="carousel"
  aria-live={autoplay ? 'polite' : 'off'}
  tabindex="0"
  onkeydown={handleKeydown}
  onmouseenter={pauseAutoplay}
  onmouseleave={resumeAutoplay}
  ontouchstart={handleTouchStart}
  ontouchmove={handleTouchMove}
  ontouchend={handleTouchEnd}
>
  <div
    bind:this={innerRef}
    class="mljr-carousel-inner"
    style:transform={variant !== 'fade' ? `translateX(-${currentIndex * 100}%)` : undefined}
    role="list"
    aria-label="Slides"
  >
    {@render children()}
  </div>

  {#if showControls && slideCount > 1}
    <button
      type="button"
      class="mljr-carousel-btn mljr-carousel-btn-prev"
      onclick={prevSlide}
      aria-label="Previous slide"
      aria-controls="carousel-slides"
      disabled={!loop && currentIndex === 0}
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
      aria-controls="carousel-slides"
      disabled={!loop && currentIndex === slideCount - 1}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  {/if}

  {#if showIndicators && slideCount > 1}
    <div class={indicatorClasses} role="tablist" aria-label="Carousel navigation">
      {#each Array(slideCount) as _, index}
        <button
          type="button"
          class="mljr-carousel-indicator"
          class:active={index === currentIndex}
          onclick={() => goToSlide(index)}
          role="tab"
          aria-selected={index === currentIndex}
          aria-label={`Go to slide ${index + 1}`}
          aria-controls={`slide-${index}`}
        ></button>
      {/each}
    </div>
  {/if}
</div>
