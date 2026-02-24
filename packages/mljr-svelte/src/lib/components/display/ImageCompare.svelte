<script lang="ts">
  interface Props {
    /** Before image source URL */
    before: string;
    /** After image source URL */
    after: string;
    /** Alt text for before image */
    beforeAlt?: string;
    /** Alt text for after image */
    afterAlt?: string;
    /** Label shown over before image */
    beforeLabel?: string;
    /** Label shown over after image */
    afterLabel?: string;
    /** Initial slider position (0–100) */
    initialPosition?: number;
    /** Vertical compare mode */
    vertical?: boolean;
    /** Additional CSS class */
    class?: string;
  }

  let {
    before,
    after,
    beforeAlt = 'Before',
    afterAlt = 'After',
    beforeLabel = 'Before',
    afterLabel = 'After',
    initialPosition = 50,
    vertical = false,
    class: className = '',
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  let position = $state(initialPosition);
  let dragging = $state(false);
  let containerEl: HTMLElement | undefined = $state();

  function getPositionFromEvent(e: MouseEvent | TouchEvent): number {
    if (!containerEl) return 50;

    const rect = containerEl.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    if (vertical) {
      const y = clientY - rect.top;
      return Math.max(0, Math.min(100, (y / rect.height) * 100));
    } else {
      const x = clientX - rect.left;
      return Math.max(0, Math.min(100, (x / rect.width) * 100));
    }
  }

  function startDrag(e: MouseEvent | TouchEvent) {
    dragging = true;
    position = getPositionFromEvent(e);
  }

  function onMove(e: MouseEvent | TouchEvent) {
    if (!dragging) return;
    e.preventDefault();
    position = getPositionFromEvent(e);
  }

  function stopDrag() {
    dragging = false;
  }

  // Keyboard support
  function handleKeydown(e: KeyboardEvent) {
    const step = e.shiftKey ? 10 : 1;
    if (vertical) {
      if (e.key === 'ArrowUp') { e.preventDefault(); position = Math.max(0, position - step); }
      if (e.key === 'ArrowDown') { e.preventDefault(); position = Math.min(100, position + step); }
    } else {
      if (e.key === 'ArrowLeft') { e.preventDefault(); position = Math.max(0, position - step); }
      if (e.key === 'ArrowRight') { e.preventDefault(); position = Math.min(100, position + step); }
    }
  }

  const posStyle = $derived(`--mljr-compare-pos: ${position}%`);
  const containerClass = $derived(
    ['mljr-img-compare', vertical && 'mljr-img-compare-vertical', dragging && 'mljr-img-compare-dragging', className]
      .filter(Boolean)
      .join(' ')
  );
</script>

<svelte:window
  onmousemove={onMove}
  onmouseup={stopDrag}
  ontouchmove={onMove}
  ontouchend={stopDrag}
/>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  bind:this={containerEl}
  class={containerClass}
  style={posStyle}
  onmousedown={startDrag}
  ontouchstart={startDrag}
  onkeydown={handleKeydown}
  tabindex="0"
  role="slider"
  aria-valuenow={Math.round(position)}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Image comparison slider"
>
  <!-- Before image (full) -->
  <div class="mljr-img-compare-before">
    <img src={before} alt={beforeAlt} draggable="false" />
  </div>

  <!-- After image (clipped) -->
  <div class="mljr-img-compare-after">
    <img src={after} alt={afterAlt} draggable="false" />
  </div>

  <!-- Spacer image to define the container's height -->
  <img src={before} alt="" aria-hidden="true" draggable="false" style="visibility: hidden; display: block; width: 100%; height: auto;" />

  <!-- Divider handle -->
  <div class="mljr-img-compare-handle" aria-hidden="true">
    <div class="mljr-img-compare-knob">
      {#if vertical}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      {/if}
    </div>
  </div>

  <!-- Labels -->
  {#if beforeLabel}
    <span class="mljr-img-compare-label mljr-img-compare-label-before">{beforeLabel}</span>
  {/if}
  {#if afterLabel}
    <span class="mljr-img-compare-label mljr-img-compare-label-after">{afterLabel}</span>
  {/if}
</div>
