<script lang="ts">
  type Size = 'sm' | 'md' | 'lg';

  interface Props {
    minValue?: number;
    maxValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    size?: Size;
    showFloatingValue?: boolean;
    label?: string;
    class?: string;
    onchange?: (min: number, max: number) => void;
  }

  let {
    minValue = $bindable(20),
    maxValue = $bindable(80),
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    size = 'md',
    showFloatingValue = true,
    label = '',
    class: className = '',
    onchange,
  }: Props = $props();

  let isDraggingMin = $state(false);
  let isDraggingMax = $state(false);

  const sizeClasses: Record<Size, string> = {
    sm: 'mljr-range-slider-sm',
    md: '',
    lg: 'mljr-range-slider-lg',
  };

  let minPercentage = $derived(((minValue - min) / (max - min)) * 100);
  let maxPercentage = $derived(((maxValue - min) / (max - min)) * 100);

  // Compensate for thumb not reaching edges (10px = half of 20px thumb)
  let minFloatingLeft = $derived(`calc(${minPercentage}% + ${10 - 0.2 * minPercentage}px)`);
  let maxFloatingLeft = $derived(`calc(${maxPercentage}% + ${10 - 0.2 * maxPercentage}px)`);

  let sliderClasses = $derived(
    ['mljr-range-slider', sizeClasses[size], disabled ? 'mljr-range-slider-disabled' : '', className]
      .filter(Boolean)
      .join(' ')
  );

  function handleMinInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const val = parseFloat(target.value);
    if (val <= maxValue - step) {
      minValue = val;
    } else {
      minValue = maxValue - step;
      target.value = String(minValue);
    }
    onchange?.(minValue, maxValue);
  }

  function handleMaxInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const val = parseFloat(target.value);
    if (val >= minValue + step) {
      maxValue = val;
    } else {
      maxValue = minValue + step;
      target.value = String(maxValue);
    }
    onchange?.(minValue, maxValue);
  }

  let inputId = $derived(`range-slider-${Math.random().toString(36).substring(2, 9)}`);
</script>

<div class={sliderClasses}>
  {#if label}
    <div class="mljr-range-slider-header">
      <label for={inputId} class="mljr-range-slider-label">{label}</label>
      <span class="mljr-range-slider-values">{minValue} – {maxValue}</span>
    </div>
  {/if}

  <div class="mljr-range-slider-track-container">
    <div class="mljr-range-slider-track"></div>
    <div
      class="mljr-range-slider-fill"
      style="left: {minPercentage}%; width: {maxPercentage - minPercentage}%"
    ></div>

    {#if showFloatingValue}
      <div
        class="mljr-range-slider-floating"
        class:mljr-range-slider-floating-active={isDraggingMin}
        style="left: {minFloatingLeft}"
      >
        {minValue}
      </div>
      <div
        class="mljr-range-slider-floating"
        class:mljr-range-slider-floating-active={isDraggingMax}
        style="left: {maxFloatingLeft}"
      >
        {maxValue}
      </div>
    {/if}

    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <input
      id={inputId}
      type="range"
      class="mljr-range-slider-input mljr-range-slider-min"
      {min}
      {max}
      {step}
      {disabled}
      value={minValue}
      oninput={handleMinInput}
      onmousedown={() => isDraggingMin = true}
      onmouseup={() => isDraggingMin = false}
      ontouchstart={() => isDraggingMin = true}
      ontouchend={() => isDraggingMin = false}
      aria-label="{label ? label + ' ' : ''}minimum"
    />
    <input
      type="range"
      class="mljr-range-slider-input mljr-range-slider-max"
      {min}
      {max}
      {step}
      {disabled}
      value={maxValue}
      oninput={handleMaxInput}
      onmousedown={() => isDraggingMax = true}
      onmouseup={() => isDraggingMax = false}
      ontouchstart={() => isDraggingMax = true}
      ontouchend={() => isDraggingMax = false}
      aria-label="{label ? label + ' ' : ''}maximum"
    />
  </div>
</div>

<style>
  .mljr-range-slider {
    width: 100%;
  }

  .mljr-range-slider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .mljr-range-slider-label {
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text);
  }

  .mljr-range-slider-values {
    font-weight: 600;
    color: var(--mljr-primary-600);
    font-size: var(--mljr-text-sm);
  }

  .mljr-range-slider-track-container {
    position: relative;
    height: 8px;
    margin-top: 28px;
  }

  .mljr-range-slider-track {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: var(--mljr-bg-tertiary);
    border-radius: var(--mljr-radius-full);
    box-shadow: var(--mljr-clay-inset-sm);
  }

  .mljr-range-slider-fill {
    position: absolute;
    top: 0;
    height: 100%;
    background: var(--mljr-gradient-primary);
    border-radius: var(--mljr-radius-full);
  }

  .mljr-range-slider-input {
    -webkit-appearance: none;
    appearance: none;
    position: absolute;
    top: -6px;
    left: 0;
    width: 100%;
    height: 20px;
    background: transparent;
    pointer-events: none;
    outline: none;
    margin: 0;
  }

  .mljr-range-slider-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: var(--mljr-gradient-primary);
    border-radius: var(--mljr-radius-full);
    cursor: pointer;
    box-shadow: var(--mljr-clay-shadow-sm);
    pointer-events: all;
    transition: transform var(--mljr-transition-fast);
    position: relative;
    z-index: 2;
  }

  .mljr-range-slider-input::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }

  .mljr-range-slider-input::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: var(--mljr-gradient-primary);
    border: none;
    border-radius: var(--mljr-radius-full);
    cursor: pointer;
    box-shadow: var(--mljr-clay-shadow-sm);
    pointer-events: all;
  }

  /* Size variants */
  .mljr-range-slider-sm .mljr-range-slider-track-container {
    height: 6px;
  }

  .mljr-range-slider-sm .mljr-range-slider-input::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
  }

  .mljr-range-slider-sm .mljr-range-slider-input {
    top: -5px;
    height: 16px;
  }

  .mljr-range-slider-lg .mljr-range-slider-track-container {
    height: 10px;
  }

  .mljr-range-slider-lg .mljr-range-slider-input::-webkit-slider-thumb {
    width: 24px;
    height: 24px;
  }

  .mljr-range-slider-lg .mljr-range-slider-input {
    top: -7px;
    height: 24px;
  }

  /* Disabled */
  .mljr-range-slider-disabled .mljr-range-slider-input {
    opacity: 0.5;
  }

  .mljr-range-slider-disabled .mljr-range-slider-input::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  /* Floating value tooltip */
  .mljr-range-slider-floating {
    position: absolute;
    top: -32px;
    transform: translateX(-50%);
    background: var(--mljr-gradient-primary);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: var(--mljr-radius-sm);
    box-shadow: var(--mljr-clay-shadow-sm);
    white-space: nowrap;
    pointer-events: none;
    opacity: 0.85;
    transition: opacity 0.15s ease, transform 0.15s ease;
    z-index: 10;
  }

  .mljr-range-slider-floating::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: var(--mljr-primary-500);
  }

  .mljr-range-slider-floating-active {
    opacity: 1;
    transform: translateX(-50%) scale(1.1);
  }
</style>
