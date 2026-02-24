<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Whether the swap is active (showing second element) */
    active?: boolean;
    /** Animation type */
    animation?: 'rotate' | 'flip' | 'fade' | 'none';
    /** Callback when active state changes */
    onchange?: (active: boolean) => void;
    /** Additional CSS classes */
    class?: string;
    /** First element (default state) */
    on?: Snippet;
    /** Second element (active state) */
    off?: Snippet;
  }

  let {
    active = $bindable(false),
    animation = 'rotate',
    onchange,
    class: className = '',
    on,
    off,
  }: Props = $props();

  function toggle() {
    active = !active;
    onchange?.(active);
  }
</script>

<button
  type="button"
  class="mljr-swap mljr-swap-{animation} {className}"
  class:mljr-swap-active={active}
  onclick={toggle}
>
  <div class="mljr-swap-on">
    {#if on}
      {@render on()}
    {/if}
  </div>
  <div class="mljr-swap-off">
    {#if off}
      {@render off()}
    {/if}
  </div>
</button>

<style>
  .mljr-swap {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;
  }

  .mljr-swap-on,
  .mljr-swap-off {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Rotate animation */
  .mljr-swap-rotate .mljr-swap-on,
  .mljr-swap-rotate .mljr-swap-off {
    transition: transform var(--mljr-transition-base), opacity var(--mljr-transition-base);
  }

  .mljr-swap-rotate .mljr-swap-off {
    position: absolute;
    transform: rotate(90deg);
    opacity: 0;
  }

  .mljr-swap-rotate.mljr-swap-active .mljr-swap-on {
    transform: rotate(-90deg);
    opacity: 0;
  }

  .mljr-swap-rotate.mljr-swap-active .mljr-swap-off {
    transform: rotate(0deg);
    opacity: 1;
  }

  /* Flip animation */
  .mljr-swap-flip {
    perspective: 1000px;
  }

  .mljr-swap-flip .mljr-swap-on,
  .mljr-swap-flip .mljr-swap-off {
    transition: transform var(--mljr-transition-base), opacity var(--mljr-transition-base);
    backface-visibility: hidden;
  }

  .mljr-swap-flip .mljr-swap-off {
    position: absolute;
    transform: rotateY(180deg);
    opacity: 0;
  }

  .mljr-swap-flip.mljr-swap-active .mljr-swap-on {
    transform: rotateY(-180deg);
    opacity: 0;
  }

  .mljr-swap-flip.mljr-swap-active .mljr-swap-off {
    transform: rotateY(0deg);
    opacity: 1;
  }

  /* Fade animation */
  .mljr-swap-fade .mljr-swap-on,
  .mljr-swap-fade .mljr-swap-off {
    transition: opacity var(--mljr-transition-base);
  }

  .mljr-swap-fade .mljr-swap-off {
    position: absolute;
    opacity: 0;
  }

  .mljr-swap-fade.mljr-swap-active .mljr-swap-on {
    opacity: 0;
  }

  .mljr-swap-fade.mljr-swap-active .mljr-swap-off {
    opacity: 1;
  }

  /* None animation */
  .mljr-swap-none .mljr-swap-off {
    display: none;
  }

  .mljr-swap-none.mljr-swap-active .mljr-swap-on {
    display: none;
  }

  .mljr-swap-none.mljr-swap-active .mljr-swap-off {
    display: flex;
  }
</style>
