<script lang="ts">
  interface Props {
    /** Image source URL (loaded lazily when in viewport) */
    src: string;
    /** Alt text */
    alt?: string;
    /** Optional low-res placeholder URL (shown blurred while loading) */
    placeholder?: string;
    /** Width (number → px, string → passed as-is) */
    width?: number | string;
    /** Height (number → px, string → passed as-is) */
    height?: number | string;
    /** Aspect ratio helper: '16/9', '4/3', '1/1' */
    aspectRatio?: string;
    /** Additional CSS class */
    class?: string;
    /** Called when the image finishes loading */
    onLoad?: () => void;
  }

  let {
    src,
    alt = '',
    placeholder = '',
    width,
    height,
    aspectRatio = '',
    class: className = '',
    onLoad,
  }: Props = $props();

  let container: HTMLElement | undefined = $state();
  let inView = $state(false);
  let loaded = $state(false);

  const widthPx = $derived(
    width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined
  );
  const heightPx = $derived(
    height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined
  );

  const containerStyle = $derived(
    [widthPx && `width: ${widthPx}`, heightPx && `height: ${heightPx}`]
      .filter(Boolean)
      .join('; ')
  );

  $effect(() => {
    if (!container || typeof IntersectionObserver === 'undefined') {
      inView = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          inView = true;
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  });

  const skeletonStyle = $derived(heightPx ? `height: ${heightPx}` : '');
</script>

<div
  bind:this={container}
  class="mljr-lazy-img {className}"
  style={containerStyle || undefined}
>
  {#if !inView}
    {#if placeholder}
      <!-- svelte-ignore a11y_missing_attribute -->
      <img src={placeholder} class="mljr-lazy-img-placeholder" draggable="false" aria-hidden="true" />
    {:else}
      <div class="mljr-lazy-img-skeleton" style={skeletonStyle || undefined}></div>
    {/if}
  {:else}
    {#if placeholder && !loaded}
      <!-- svelte-ignore a11y_missing_attribute -->
      <img src={placeholder} class="mljr-lazy-img-placeholder" draggable="false" aria-hidden="true" />
    {/if}
    <img
      {src}
      {alt}
      class="mljr-lazy-img-actual {loaded ? 'mljr-lazy-img-loaded' : ''}"
      draggable="false"
      onload={() => { loaded = true; onLoad?.(); }}
    />
  {/if}
</div>
