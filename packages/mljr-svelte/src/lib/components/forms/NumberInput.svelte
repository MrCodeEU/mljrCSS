<script lang="ts">
  type Size = 'sm' | 'md' | 'lg';

  interface Props {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    readonly?: boolean;
    size?: Size;
    placeholder?: string;
    onchange?: (value: number) => void;
    class?: string;
  }

  let {
    value = $bindable(0),
    min,
    max,
    step = 1,
    disabled = false,
    readonly = false,
    size = 'md',
    placeholder = '0',
    onchange,
    class: className = '',
  }: Props = $props();

  const sizeClasses: Record<Size, string> = {
    sm: 'mljr-number-input-sm',
    md: '',
    lg: 'mljr-number-input-lg',
  };

  let containerClasses = $derived(
    [
      'mljr-number-input',
      sizeClasses[size],
      disabled ? 'mljr-number-input-disabled' : '',
      readonly ? 'mljr-number-input-readonly' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  let canDecrement = $derived(
    !disabled && !readonly && (min === undefined || value > min)
  );

  let canIncrement = $derived(
    !disabled && !readonly && (max === undefined || value < max)
  );

  function clamp(v: number): number {
    let result = v;
    if (min !== undefined) result = Math.max(min, result);
    if (max !== undefined) result = Math.min(max, result);
    return result;
  }

  function decrement() {
    if (!canDecrement) return;
    value = clamp(value - step);
    onchange?.(value);
  }

  function increment() {
    if (!canIncrement) return;
    value = clamp(value + step);
    onchange?.(value);
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const parsed = parseFloat(target.value);
    if (!isNaN(parsed)) {
      value = clamp(parsed);
      onchange?.(value);
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      increment();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      decrement();
    }
  }
</script>

<div class={containerClasses}>
  <button
    class="mljr-number-input-btn mljr-number-input-decrement"
    onclick={decrement}
    disabled={!canDecrement}
    aria-label="Decrease value"
    tabindex="-1"
    type="button"
  >
    −
  </button>

  <input
    type="number"
    class="mljr-number-input-field"
    {value}
    {min}
    {max}
    {step}
    {disabled}
    {readonly}
    {placeholder}
    oninput={handleInput}
    onkeydown={handleKeydown}
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
  />

  <button
    class="mljr-number-input-btn mljr-number-input-increment"
    onclick={increment}
    disabled={!canIncrement}
    aria-label="Increase value"
    tabindex="-1"
    type="button"
  >
    +
  </button>
</div>
