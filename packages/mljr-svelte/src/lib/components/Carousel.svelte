<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  
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
  let carouselInnerRef: HTMLDivElement | undefined = $state();
  let slideCount = $state(0);

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

  onMount(() => {
    if (carouselInnerRef) {
      slideCount = carouselInnerRef.children.length;
    }
  });

  $effect(() => {
    if (carouselInnerRef) {
      slideCount = carouselInnerRef.children.length;
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

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
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
    bind:this={carouselInnerRef}
    class="mljr-carousel-inner"
    style={variant !== 'fade' ? `transform: translateX(-${currentIndex * 100}%)` : undefined}
  >
    {@render children()}
  </div>

  {#if showControls && slideCount > 1}
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
      disabled={!loop && currentIndex === slideCount - 1}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
        ></button>
      {/each}
    </div>
  {/if}
</div>
