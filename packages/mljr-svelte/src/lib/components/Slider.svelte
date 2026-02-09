<script lang="ts">
  type Size = 'sm' | 'md' | 'lg';

  interface Props {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    size?: Size;
    showValue?: boolean;
    showTicks?: boolean;
    showFloatingValue?: boolean;
    label?: string;
    onchange?: (value: number) => void;
    class?: string;
  }

  let {
    value = $bindable(50),
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    size = 'md',
    showValue = false,
    showTicks = false,
    showFloatingValue = false,
    label = '',
    onchange,
    class: className = '',
  }: Props = $props();

  let isDragging = $state(false);

  const sizeClasses: Record<Size, string> = {
    sm: 'mljr-slider-sm',
    md: '',
    lg: 'mljr-slider-lg',
  };

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = parseFloat(target.value);
    onchange?.(value);
  }

  let percentage = $derived(((value - min) / (max - min)) * 100);

  // Compensate for the thumb not reaching the very edges of the track.
  // At 0%: thumb center is ~10px from left. At 100%: ~10px from right.
  let floatingLeft = $derived(`calc(${percentage}% + ${10 - 0.2 * percentage}px)`);

  let sliderClasses = $derived(
    ['mljr-slider', sizeClasses[size], disabled ? 'mljr-slider-disabled' : '', className]
      .filter(Boolean)
      .join(' ')
  );

  let tickCount = $derived(Math.floor((max - min) / step) + 1);
  let inputId = $derived(`slider-${Math.random().toString(36).substring(2, 9)}`);
</script>

<div class={sliderClasses}>
  {#if label}
    <div class="mljr-slider-header">
      <label for={inputId} class="mljr-slider-label">
        {label}
      </label>
      {#if showValue}
        <span class="mljr-slider-value">{value}</span>
      {/if}
    </div>
  {/if}

  <div class="mljr-slider-track-container">
    {#if showFloatingValue}
      <div
        class="mljr-slider-floating-value"
        class:mljr-slider-floating-active={isDragging}
        style="left: {floatingLeft}"
      >
        {value}
      </div>
    {/if}

    <input
      id={inputId}
      type="range"
      class="mljr-slider-input"
      {min}
      {max}
      {step}
      {disabled}
      {value}
      oninput={handleInput}
      onmousedown={() => isDragging = true}
      onmouseup={() => isDragging = false}
      ontouchstart={() => isDragging = true}
      ontouchend={() => isDragging = false}
      style="--slider-percentage: {percentage}%"
    />

    {#if showTicks && tickCount <= 11}
      <div class="mljr-slider-ticks">
        {#each Array(tickCount) as _, i}
          <span class="mljr-slider-tick"></span>
        {/each}
      </div>
    {/if}
  </div>

  {#if showValue && !label}
    <span class="mljr-slider-value-standalone">{value}</span>
  {/if}
</div>

<style>
  .mljr-slider {
    width: 100%;
  }

  .mljr-slider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .mljr-slider-label {
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text);
  }

  .mljr-slider-value {
    font-weight: 600;
    color: var(--mljr-primary-600);
  }

  .mljr-slider-track-container {
    position: relative;
  }

  .mljr-slider-input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    background: var(--mljr-bg-tertiary);
    border-radius: var(--mljr-radius-full);
    outline: none;
    box-shadow: var(--mljr-clay-inset-sm);
  }

  .mljr-slider-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: var(--mljr-gradient-primary);
    border-radius: var(--mljr-radius-full);
    cursor: pointer;
    box-shadow: var(--mljr-clay-shadow-sm);
    transition: transform var(--mljr-transition-fast);
  }

  .mljr-slider-input::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }

  .mljr-slider-input::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: var(--mljr-gradient-primary);
    border: none;
    border-radius: var(--mljr-radius-full);
    cursor: pointer;
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .mljr-slider-sm .mljr-slider-input {
    height: 6px;
  }

  .mljr-slider-sm .mljr-slider-input::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
  }

  .mljr-slider-lg .mljr-slider-input {
    height: 10px;
  }

  .mljr-slider-lg .mljr-slider-input::-webkit-slider-thumb {
    width: 24px;
    height: 24px;
  }

  .mljr-slider-disabled .mljr-slider-input {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .mljr-slider-ticks {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin-top: 4px;
  }

  .mljr-slider-tick {
    width: 2px;
    height: 6px;
    background: var(--mljr-gray-400);
    border-radius: 1px;
  }

  .mljr-slider-value-standalone {
    display: block;
    text-align: center;
    margin-top: 0.5rem;
    font-size: var(--mljr-text-sm);
    font-weight: 600;
    color: var(--mljr-primary-600);
  }

  .mljr-slider-floating-value {
    position: absolute;
    top: -36px;
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

  .mljr-slider-floating-value::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: var(--mljr-primary-500);
  }

  .mljr-slider-floating-active {
    opacity: 1;
    transform: translateX(-50%) scale(1.1);
  }
</style>
