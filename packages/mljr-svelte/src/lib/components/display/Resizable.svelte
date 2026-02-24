<script lang="ts">
  import type { Snippet } from 'svelte';
  import { untrack } from 'svelte';

  interface Props {
    direction?: 'horizontal' | 'vertical';
    /** Initial split percentage (0-100) */
    initialSplit?: number;
    /** Minimum panel size as percentage */
    minSize?: number;
    /** Maximum panel size as percentage */
    maxSize?: number;
    onresize?: (split: number) => void;
    panelA?: Snippet;
    panelB?: Snippet;
    class?: string;
  }

  let {
    direction = 'horizontal',
    initialSplit = 50,
    minSize = 10,
    maxSize = 90,
    onresize,
    panelA,
    panelB,
    class: className = '',
  }: Props = $props();

  // untrack: intentionally capture initial split value only
  let split = $state(untrack(() => initialSplit));
  let dragging = $state(false);
  let containerEl = $state<HTMLElement | null>(null);

  function clamp(val: number, min: number, max: number) {
    return Math.max(min, Math.min(max, val));
  }

  function onPointerDown(e: PointerEvent) {
    e.preventDefault();
    dragging = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragging || !containerEl) return;

    const rect = containerEl.getBoundingClientRect();
    let newSplit: number;

    if (direction === 'horizontal') {
      newSplit = ((e.clientX - rect.left) / rect.width) * 100;
    } else {
      newSplit = ((e.clientY - rect.top) / rect.height) * 100;
    }

    split = clamp(newSplit, minSize, maxSize);
    onresize?.(split);
  }

  function onPointerUp() {
    dragging = false;
  }

  function onKeydown(e: KeyboardEvent) {
    const step = 5;
    const isHorizontal = direction === 'horizontal';
    if ((isHorizontal && e.key === 'ArrowRight') || (!isHorizontal && e.key === 'ArrowDown')) {
      e.preventDefault();
      split = clamp(split + step, minSize, maxSize);
      onresize?.(split);
    } else if ((isHorizontal && e.key === 'ArrowLeft') || (!isHorizontal && e.key === 'ArrowUp')) {
      e.preventDefault();
      split = clamp(split - step, minSize, maxSize);
      onresize?.(split);
    }
  }

  let containerClass = $derived(
    ['mljr-resizable', direction === 'vertical' ? 'mljr-resizable-vertical' : '', className]
      .filter(Boolean)
      .join(' ')
  );

  let handleClass = $derived(
    direction === 'horizontal'
      ? 'mljr-resizable-handle mljr-resizable-handle-horizontal'
      : 'mljr-resizable-handle mljr-resizable-handle-vertical'
  );

  let panelAStyle = $derived(
    direction === 'horizontal'
      ? `width: ${split}%; flex-shrink: 0;`
      : `height: ${split}%; flex-shrink: 0;`
  );

  let panelBStyle = $derived(
    direction === 'horizontal'
      ? `flex: 1 1 0; width: 0;`
      : `flex: 1 1 0; height: 0;`
  );
</script>

<div bind:this={containerEl} class={containerClass}>
  <div class="mljr-resizable-panel" style={panelAStyle}>
    {@render panelA?.()}
  </div>

  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- role="separator" with aria-valuenow is a focusable splitter per ARIA spec -->
  <div
    class={handleClass}
    data-dragging={dragging}
    role="separator"
    aria-orientation={direction}
    aria-valuenow={Math.round(split)}
    aria-valuemin={minSize}
    aria-valuemax={maxSize}
    tabindex="0"
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    onkeydown={onKeydown}
  ></div>

  <div class="mljr-resizable-panel" style={panelBStyle}>
    {@render panelB?.()}
  </div>
</div>
