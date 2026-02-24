<script lang="ts">
  type Size = 'sm' | 'md' | 'lg';

  interface Props {
    value?: number;
    max?: number;
    readonly?: boolean;
    size?: Size;
    showValue?: boolean;
    /** Allow half-star ratings (0.5, 1.5, etc.) */
    allowHalf?: boolean;
    onchange?: (value: number) => void;
    class?: string;
  }

  let {
    value = $bindable(0),
    max = 5,
    readonly = false,
    size = 'md',
    showValue = false,
    allowHalf = false,
    onchange,
    class: className = '',
  }: Props = $props();

  let hoverValue = $state(0);

  const sizeClasses: Record<Size, string> = {
    sm: 'mljr-rating-sm',
    md: '',
    lg: 'mljr-rating-lg',
  };

  function handleClick(index: number, isHalf: boolean = false) {
    if (!readonly) {
      const newValue = allowHalf && isHalf ? index - 0.5 : index;
      value = newValue;
      onchange?.(newValue);
    }
  }

  function handleMouseEnter(index: number, isHalf: boolean = false) {
    if (!readonly) {
      hoverValue = allowHalf && isHalf ? index - 0.5 : index;
    }
  }

  function handleMouseLeave() {
    hoverValue = 0;
  }

  let ratingClasses = $derived(
    ['mljr-rating', sizeClasses[size], readonly ? 'mljr-rating-readonly' : '', allowHalf && 'mljr-rating-half', className]
      .filter(Boolean)
      .join(' ')
  );

  function isActive(index: number): boolean {
    return index <= (hoverValue || value);
  }

  function isHalfActive(index: number): boolean {
    const currentValue = hoverValue || value;
    return currentValue >= index - 0.5 && currentValue < index;
  }
</script>

<div class={ratingClasses} role="group" aria-label="Rating">
  {#each Array(max) as _, i}
    {@const index = i + 1}
    <div class="mljr-rating-star-wrapper">
      {#if allowHalf}
        <button
          type="button"
          class="mljr-rating-star mljr-rating-star-half"
          class:active={isHalfActive(index)}
          onclick={() => handleClick(index, true)}
          onmouseenter={() => handleMouseEnter(index, true)}
          onmouseleave={handleMouseLeave}
          disabled={readonly}
          aria-label={`Rate ${index - 0.5} out of ${max}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <defs>
              <clipPath id="half-{index}">
                <rect x="0" y="0" width="12" height="24" />
              </clipPath>
            </defs>
            <path clip-path="url(#half-{index})" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </button>
      {/if}
      <button
        type="button"
        class="mljr-rating-star"
        class:active={isActive(index)}
        class:full={allowHalf}
        onclick={() => handleClick(index)}
        onmouseenter={() => handleMouseEnter(index)}
        onmouseleave={handleMouseLeave}
        disabled={readonly}
        aria-label={`Rate ${index} out of ${max}`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          {#if allowHalf}
            <defs>
              <clipPath id="full-{index}">
                <rect x="12" y="0" width="12" height="24" />
              </clipPath>
            </defs>
            <path clip-path="url(#full-{index})" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          {:else}
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          {/if}
        </svg>
      </button>
    </div>
  {/each}
  {#if showValue}
    <span class="mljr-rating-value">{value}/{max}</span>
  {/if}
</div>

<style>
  .mljr-rating {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  .mljr-rating-star-wrapper {
    position: relative;
    display: inline-flex;
  }

  .mljr-rating-star {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--mljr-gray-300);
    transition: all var(--mljr-transition-fast);
  }

  .mljr-rating-star:not(:disabled):hover {
    transform: scale(1.1);
  }

  .mljr-rating-star.active {
    color: var(--mljr-warning);
  }

  .mljr-rating-half .mljr-rating-star-half {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .mljr-rating-half .mljr-rating-star.full {
    position: relative;
  }

  .mljr-rating-readonly .mljr-rating-star {
    cursor: default;
  }

  .mljr-rating-sm .mljr-rating-star svg {
    width: 1rem;
    height: 1rem;
  }

  .mljr-rating-lg .mljr-rating-star svg {
    width: 2rem;
    height: 2rem;
  }

  .mljr-rating-value {
    margin-left: 0.5rem;
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-secondary);
  }
</style>
