<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Position of the indicator */
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
    /** Color variant */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
    /** Show as dot or with content */
    dot?: boolean;
    /** Ping animation */
    ping?: boolean;
    /** Size */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    class?: string;
    /** Content to wrap */
    children?: Snippet;
    /** Indicator content */
    indicator?: Snippet;
  }

  let {
    position = 'top-right',
    color = 'primary',
    dot = false,
    ping = false,
    size = 'md',
    class: className = '',
    children,
    indicator,
  }: Props = $props();
</script>

<div class="mljr-indicator mljr-indicator-{position} {className}">
  {#if children}
    <div class="mljr-indicator-content">
      {@render children()}
    </div>
  {/if}

  <span
    class="mljr-indicator-marker mljr-indicator-{color} mljr-indicator-{size}"
    class:mljr-indicator-dot={dot}
    class:mljr-indicator-ping={ping}
  >
    {#if !dot && indicator}
      {@render indicator()}
    {/if}
  </span>
</div>

<style>
  .mljr-indicator {
    position: relative;
    display: inline-flex;
  }

  .mljr-indicator-content {
    position: relative;
    z-index: 1;
  }

  .mljr-indicator-marker {
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: var(--mljr-text-xs);
    font-weight: 600;
    color: white;
    border-radius: var(--mljr-radius-full);
    z-index: 2;
  }

  /* Sizes */
  .mljr-indicator-sm {
    min-width: 1rem;
    height: 1rem;
    padding: 0 var(--mljr-space-1);
    font-size: var(--mljr-text-2xs);
  }

  .mljr-indicator-sm.mljr-indicator-dot {
    width: 0.5rem;
    height: 0.5rem;
    min-width: 0.5rem;
    padding: 0;
  }

  .mljr-indicator-md {
    min-width: 1.25rem;
    height: 1.25rem;
    padding: 0 var(--mljr-space-1);
  }

  .mljr-indicator-md.mljr-indicator-dot {
    width: 0.75rem;
    height: 0.75rem;
    min-width: 0.75rem;
    padding: 0;
  }

  .mljr-indicator-lg {
    min-width: 1.5rem;
    height: 1.5rem;
    padding: 0 var(--mljr-space-2);
    font-size: var(--mljr-text-sm);
  }

  .mljr-indicator-lg.mljr-indicator-dot {
    width: 1rem;
    height: 1rem;
    min-width: 1rem;
    padding: 0;
  }

  /* Colors */
  .mljr-indicator-primary {
    background: var(--mljr-primary-600);
  }

  .mljr-indicator-secondary {
    background: var(--mljr-secondary-600);
  }

  .mljr-indicator-success {
    background: var(--mljr-success-600);
  }

  .mljr-indicator-warning {
    background: var(--mljr-warning-600);
  }

  .mljr-indicator-error {
    background: var(--mljr-error-600);
  }

  .mljr-indicator-info {
    background: var(--mljr-info-600);
  }

  /* Positions */
  .mljr-indicator-top-left .mljr-indicator-marker {
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }

  .mljr-indicator-top-right .mljr-indicator-marker {
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }

  .mljr-indicator-bottom-left .mljr-indicator-marker {
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
  }

  .mljr-indicator-bottom-right .mljr-indicator-marker {
    bottom: 0;
    right: 0;
    transform: translate(50%, 50%);
  }

  .mljr-indicator-top-center .mljr-indicator-marker {
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .mljr-indicator-bottom-center .mljr-indicator-marker {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
  }

  /* Ping animation */
  .mljr-indicator-ping::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--mljr-radius-full);
    background: inherit;
    animation: mljr-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  @keyframes mljr-ping {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
</style>
