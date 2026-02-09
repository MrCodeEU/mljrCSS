<script lang="ts">
  import type { Snippet } from 'svelte';

  type Variant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

  interface TimelineItem {
    title: string;
    description?: string;
    date?: string;
    variant?: Variant;
    icon?: string;
  }

  interface Props {
    items: TimelineItem[];
    class?: string;
  }

  let {
    items,
    class: className = '',
  }: Props = $props();

  const variantColors: Record<Variant, string> = {
    default: 'var(--mljr-gray-400)',
    primary: 'var(--mljr-primary-500)',
    secondary: 'var(--mljr-secondary-500)',
    success: 'var(--mljr-success)',
    warning: 'var(--mljr-warning)',
    error: 'var(--mljr-error)',
  };

  let timelineClasses = $derived(
    ['mljr-timeline', className].filter(Boolean).join(' ')
  );
</script>

<div class={timelineClasses}>
  {#each items as item, index}
    <div class="mljr-timeline-item">
      <div class="mljr-timeline-marker" style="--marker-color: {variantColors[item.variant || 'default']}">
        {#if item.icon}
          {@html item.icon}
        {/if}
      </div>

      <div class="mljr-timeline-content">
        {#if item.date}
          <span class="mljr-timeline-date">{item.date}</span>
        {/if}
        <h4 class="mljr-timeline-title">{item.title}</h4>
        {#if item.description}
          <p class="mljr-timeline-description">{item.description}</p>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .mljr-timeline {
    position: relative;
    padding-left: 2rem;
  }

  .mljr-timeline::before {
    content: '';
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
    bottom: 0.5rem;
    width: 2px;
    background: var(--mljr-border);
    border-radius: 1px;
  }

  .mljr-timeline-item {
    position: relative;
    padding-bottom: 1.5rem;
  }

  .mljr-timeline-item:last-child {
    padding-bottom: 0;
  }

  .mljr-timeline-marker {
    position: absolute;
    left: -2rem;
    top: 0.25rem;
    width: 1rem;
    height: 1rem;
    background: var(--marker-color, var(--mljr-gray-400));
    border-radius: var(--mljr-radius-full);
    border: 3px solid var(--mljr-bg);
    box-shadow: var(--mljr-clay-shadow-xs);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.5rem;
  }

  .mljr-timeline-content {
    background: var(--mljr-frosted-bg);
    padding: var(--mljr-space-4);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .mljr-timeline-date {
    display: block;
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-muted);
    margin-bottom: 0.25rem;
  }

  .mljr-timeline-title {
    font-size: var(--mljr-text-base);
    font-weight: 600;
    color: var(--mljr-text);
    margin: 0;
  }

  .mljr-timeline-description {
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-secondary);
    margin: 0.5rem 0 0;
    line-height: var(--mljr-leading-relaxed);
  }
</style>
