<script lang="ts">
  import type { Snippet } from 'svelte';
  import { browser } from '$app/environment';

  interface Props {
    items: Array<{ id: string; content: Snippet }>;
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
    items,
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

  function goToSlide(index: number) {
    if (index >= 0 && index < items.length) {
      currentIndex = index;
      resetAutoplay();
    }
  }

  function nextSlide() {
    if (currentIndex < items.length - 1) {
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
      currentIndex = items.length - 1;
    }
    resetAutoplay();
  }

  function resetAutoplay() {
    if (autoplay && !isPaused) {
      clearTimeout(autoplayTimer);
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
    }
  }

  $effect(() => {
    if (autoplay && !isPaused && browser) {
      autoplayTimer = setTimeout(nextSlide, interval);
      return () => clearTimeout(autoplayTimer);
    }
  });
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={carouselClasses}
  role="region"
  aria-label="Carousel"
  aria-roledescription="carousel"
  tabindex="0"
  onkeydown={handleKeydown}
  onmouseenter={() => (isPaused = true)}
  onmouseleave={() => {
    isPaused = false;
    resetAutoplay();
  }}
>
  <div
    class="mljr-carousel-inner"
    style={variant !== 'fade' ? `transform: translateX(-${currentIndex * 100}%)` : undefined}
  >
    {#each items as item, index (item.id)}
      <div
        class="mljr-carousel-item"
        class:active={variant === 'fade' && index === currentIndex}
        role="group"
        aria-roledescription="slide"
        aria-label={`Slide ${index + 1} of ${items.length}`}
        aria-hidden={index !== currentIndex}
      >
        {@render item.content()}
      </div>
    {/each}
  </div>

  {#if showControls && items.length > 1}
    <button
      type="button"
      class="mljr-carousel-btn mljr-carousel-btn-prev"
      onclick={prevSlide}
      aria-label="Previous slide"
      disabled={!loop && currentIndex === 0}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <button
      type="button"
      class="mljr-carousel-btn mljr-carousel-btn-next"
      onclick={nextSlide}
      aria-label="Next slide"
      disabled={!loop && currentIndex === items.length - 1}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  {/if}

  {#if showIndicators && items.length > 1}
    <div class={indicatorClasses} role="tablist" aria-label="Carousel navigation">
      {#each items as item, index (item.id)}
        <button
          type="button"
          class="mljr-carousel-indicator"
          class:active={index === currentIndex}
          onclick={() => goToSlide(index)}
          role="tab"
          aria-selected={index === currentIndex}
          aria-label={`Go to slide ${index + 1}`}
          aria-controls={`carousel-item-${item.id}`}
        ></button>
      {/each}
    </div>
  {/if}
</div>
