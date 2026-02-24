<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Mask shape */
    shape?:
      | 'circle'
      | 'squircle'
      | 'hexagon'
      | 'triangle'
      | 'star'
      | 'heart'
      | 'pentagon'
      | 'diamond'
      | 'decagon';
    /** Additional CSS classes */
    class?: string;
    /** Content to mask */
    children?: Snippet;
  }

  let {
    shape = 'circle',
    class: className = '',
    children,
  }: Props = $props();
</script>

<div class="mljr-mask mljr-mask-{shape} {className}">
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .mljr-mask {
    position: relative;
    display: inline-block;
    overflow: hidden;
  }

  .mljr-mask > :global(*) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Circle */
  .mljr-mask-circle {
    border-radius: var(--mljr-radius-full);
  }

  /* Squircle (super ellipse) */
  .mljr-mask-squircle {
    border-radius: 20%;
  }

  /* Hexagon */
  .mljr-mask-hexagon {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  }

  /* Triangle */
  .mljr-mask-triangle {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }

  /* Star */
  .mljr-mask-star {
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
  }

  /* Heart */
  .mljr-mask-heart {
    clip-path: polygon(
      50% 100%,
      0% 50%,
      0% 30%,
      15% 10%,
      35% 10%,
      50% 25%,
      65% 10%,
      85% 10%,
      100% 30%,
      100% 50%
    );
  }

  /* Pentagon */
  .mljr-mask-pentagon {
    clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
  }

  /* Diamond */
  .mljr-mask-diamond {
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }

  /* Decagon */
  .mljr-mask-decagon {
    clip-path: polygon(
      50% 0%,
      80% 10%,
      100% 35%,
      100% 70%,
      80% 90%,
      50% 100%,
      20% 90%,
      0% 70%,
      0% 35%,
      20% 10%
    );
  }
</style>
