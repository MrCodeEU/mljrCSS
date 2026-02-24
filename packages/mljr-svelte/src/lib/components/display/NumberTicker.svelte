<script lang="ts">
  import { untrack } from 'svelte';

  type TickerSize = 'sm' | 'md' | 'lg' | 'xl';
  type TickerColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  type EasingFn = (t: number) => number;

  interface Props {
    /** Target value to animate to */
    value: number;
    /** Starting value */
    from?: number;
    /** Animation duration in ms */
    duration?: number;
    /** Decimal places */
    decimals?: number;
    /** Text before number */
    prefix?: string;
    /** Text after number */
    suffix?: string;
    size?: TickerSize;
    color?: TickerColor;
    /** Easing function name */
    easing?: 'linear' | 'easeOut' | 'easeIn' | 'easeInOut';
    class?: string;
  }

  const easings: Record<string, EasingFn> = {
    linear: (t) => t,
    easeOut: (t) => 1 - Math.pow(1 - t, 3),
    easeIn: (t) => t * t * t,
    easeInOut: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  };

  let {
    value,
    from = 0,
    duration = 1000,
    decimals = 0,
    prefix = '',
    suffix = '',
    size = 'md',
    color = 'default',
    easing = 'easeOut',
    class: className = '',
  }: Props = $props();

  // displayValue uses $state for template reactivity; plain lets for rAF internals
  // untrack: intentionally capture initial value of `from` prop only
  let displayValue = $state(untrack(() => from));
  // ariaValue is updated only when animation ends to avoid flooding aria-live every frame
  let ariaValue = $state(untrack(() => from));
  let rafId: number;
  let animStartTime = 0;
  let animStartValue = 0;
  let animTargetValue = 0;

  function animate(timestamp: number) {
    if (!animStartTime) animStartTime = timestamp;
    const progress = Math.min((timestamp - animStartTime) / duration, 1);
    const easedProgress = easings[easing]?.(progress) ?? progress;
    displayValue = animStartValue + (animTargetValue - animStartValue) * easedProgress;
    if (progress < 1) {
      rafId = requestAnimationFrame(animate);
    } else {
      displayValue = animTargetValue;
      ariaValue = animTargetValue;
    }
  }

  function startAnimation(to: number, startFrom: number) {
    if (rafId) cancelAnimationFrame(rafId);
    animStartTime = 0;
    animStartValue = startFrom;
    animTargetValue = to;
    rafId = requestAnimationFrame(animate);
  }

  // Single effect: reactive on `value` only; read displayValue without creating a dep
  $effect(() => {
    const target = value;
    const current = untrack(() => displayValue);
    startAnimation(target, current);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  });

  let formatted = $derived(
    new Intl.NumberFormat(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(displayValue)
  );

  let classes = $derived(
    ['mljr-number-ticker', `mljr-number-ticker-${size}`, `mljr-number-ticker-${color}`, className]
      .filter(Boolean)
      .join(' ')
  );
</script>

<span class={classes}>
  {#if prefix}
    <span class="mljr-number-ticker-prefix">{prefix}</span>
  {/if}
  <span class="mljr-number-ticker-value" aria-hidden="true">{formatted}</span>
  {#if suffix}
    <span class="mljr-number-ticker-suffix">{suffix}</span>
  {/if}
  <!-- Visually-hidden live region updated only when animation ends, avoiding per-frame announcements -->
  <span
    class="mljr-sr-only"
    aria-live="polite"
    aria-atomic="true"
  >{prefix}{new Intl.NumberFormat(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(ariaValue)}{suffix}</span>
</span>
