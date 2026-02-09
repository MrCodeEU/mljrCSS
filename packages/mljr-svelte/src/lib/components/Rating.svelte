<script lang="ts">
  type Size = 'sm' | 'md' | 'lg';

  interface Props {
    value?: number;
    max?: number;
    readonly?: boolean;
    size?: Size;
    showValue?: boolean;
    onchange?: (value: number) => void;
    class?: string;
  }

  let {
    value = $bindable(0),
    max = 5,
    readonly = false,
    size = 'md',
    showValue = false,
    onchange,
    class: className = '',
  }: Props = $props();

  let hoverValue = $state(0);

  const sizeClasses: Record<Size, string> = {
    sm: 'mljr-rating-sm',
    md: '',
    lg: 'mljr-rating-lg',
  };

  function handleClick(index: number) {
    if (!readonly) {
      value = index;
      onchange?.(index);
    }
  }

  function handleMouseEnter(index: number) {
    if (!readonly) {
      hoverValue = index;
    }
  }

  function handleMouseLeave() {
    hoverValue = 0;
  }

  let ratingClasses = $derived(
    ['mljr-rating', sizeClasses[size], readonly ? 'mljr-rating-readonly' : '', className]
      .filter(Boolean)
      .join(' ')
  );

  function isActive(index: number): boolean {
    return index <= (hoverValue || value);
  }
</script>

<div class={ratingClasses} role="group" aria-label="Rating">
  {#each Array(max) as _, i}
    {@const index = i + 1}
    <button
      type="button"
      class="mljr-rating-star"
      class:active={isActive(index)}
      onclick={() => handleClick(index)}
      onmouseenter={() => handleMouseEnter(index)}
      onmouseleave={handleMouseLeave}
      disabled={readonly}
      aria-label={`Rate ${index} out of ${max}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </button>
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
