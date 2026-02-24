<script lang="ts">
  import Iconify from '@iconify/svelte';
  import { loadIcon } from '@iconify/svelte';
  import { onMount } from 'svelte';

  interface Props {
    /** Icon name in format "prefix:name" (e.g., "mdi:home", "ph:sun") */
    icon: string;
    /** Icon size in pixels */
    size?: number | string;
    /** Icon width (overrides size) */
    width?: number | string;
    /** Icon height (overrides size) */
    height?: number | string;
    /** Icon color (CSS color value) */
    color?: string;
    /** Additional CSS class */
    class?: string;
    /** Flip horizontally */
    hFlip?: boolean;
    /** Flip vertically */
    vFlip?: boolean;
    /** Rotate icon (0, 1, 2, 3 for 0°, 90°, 180°, 270°) */
    rotate?: 0 | 1 | 2 | 3;
    /** Whether to inline the SVG (removes width/height attributes) */
    inline?: boolean;
    /** Callback when icon fails to load */
    onError?: (error: Error) => void;
  }

  let {
    icon,
    size = 24,
    width,
    height,
    color,
    class: className = '',
    hFlip = false,
    vFlip = false,
    rotate = 0,
    inline = false,
    onError,
  }: Props = $props();

  let loaded = $state(false);
  let error = $state<Error | null>(null);

  onMount(async () => {
    try {
      const iconData = await loadIcon(icon);
      if (iconData) {
        loaded = true;
      }
    } catch (e) {
      error = e as Error;
      onError?.(e as Error);
    }
  });

  // Update loaded state when icon changes
  $effect(() => {
    loadIcon(icon).then((data) => {
      loaded = !!data;
      error = null;
    }).catch((e) => {
      error = e;
      onError?.(e);
    });
  });

  let actualWidth = $derived(width ?? size);
  let actualHeight = $derived(height ?? size);
</script>

<span 
  class="mljr-icon {className}"
  class:mljr-icon-loading={!loaded && !error}
  class:mljr-icon-error={!!error}
  style:color={color}
  style:--icon-size="{typeof actualWidth === 'number' ? actualWidth + 'px' : actualWidth}"
  role="img"
  aria-label={icon}
>
  {#if !error}
    <Iconify 
      {icon}
      width={actualWidth}
      height={actualHeight}
      {hFlip}
      {vFlip}
      {rotate}
      {inline}
    />
  {:else}
    <!-- Fallback: show a placeholder or empty space -->
    <svg 
      width={actualWidth} 
      height={actualHeight} 
      viewBox="0 0 24 24"
      class="mljr-icon-fallback"
    >
      <rect width="24" height="24" fill="currentColor" fill-opacity="0.1" rx="4"/>
      <text x="12" y="16" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.5">?</text>
    </svg>
  {/if}
</span>

<style>
  .mljr-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    flex-shrink: 0;
  }

  .mljr-icon :global(svg) {
    display: block;
  }

  .mljr-icon-loading {
    opacity: 0.5;
  }

  .mljr-icon-error {
    color: var(--mljr-text-muted);
  }

  .mljr-icon-fallback {
    color: currentColor;
  }
</style>
