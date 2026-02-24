<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Hero variant */
    variant?: 'default' | 'centered' | 'split' | 'minimal';
    /** Main heading */
    title?: string;
    /** Subtitle/description */
    subtitle?: string;
    /** Background image URL */
    backgroundImage?: string;
    /** Background overlay opacity (0-1) */
    overlayOpacity?: number;
    /** Use gradient background */
    gradient?: boolean;
    /** Gradient colors (primary, secondary, or custom) */
    gradientColor?: 'primary' | 'secondary' | 'accent' | 'custom';
    /** Custom gradient CSS */
    customGradient?: string;
    /** Minimum height */
    minHeight?: string;
    /** Text alignment */
    align?: 'left' | 'center' | 'right';
    /** Show decorative pattern */
    pattern?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Content slot */
    children?: Snippet;
    /** Action buttons slot */
    actions?: Snippet;
    /** Media slot (for images, videos) */
    media?: Snippet;
  }

  let {
    variant = 'default',
    title,
    subtitle,
    backgroundImage,
    overlayOpacity = 0.6,
    gradient = false,
    gradientColor = 'primary',
    customGradient,
    minHeight = '500px',
    align = 'left',
    pattern = false,
    class: className = '',
    children,
    actions,
    media,
  }: Props = $props();

  const gradients: Record<string, string> = {
    primary: 'linear-gradient(135deg, var(--mljr-primary-600) 0%, var(--mljr-primary-800) 100%)',
    secondary: 'linear-gradient(135deg, var(--mljr-secondary-600) 0%, var(--mljr-secondary-800) 100%)',
    accent: 'linear-gradient(135deg, var(--mljr-accent-600) 0%, var(--mljr-accent-800) 100%)',
  };

  const backgroundStyle = $derived(() => {
    if (backgroundImage) {
      return `background-image: url(${backgroundImage});`;
    }
    if (gradient) {
      const grad = gradientColor === 'custom'
        ? (customGradient || 'linear-gradient(135deg, var(--mljr-primary-600) 0%, var(--mljr-secondary-600) 100%)')
        : gradients[gradientColor];
      return `background: ${grad};`;
    }
    return '';
  });
</script>

<section
  class="mljr-hero mljr-hero-{variant} mljr-hero-align-{align} {className}"
  style="{backgroundStyle()}; min-height: {minHeight};"
>
  {#if backgroundImage && overlayOpacity > 0}
    <div class="mljr-hero-overlay" style="opacity: {overlayOpacity};"></div>
  {/if}

  {#if pattern}
    <div class="mljr-hero-pattern"></div>
  {/if}

  <div class="mljr-hero-container">
    <div class="mljr-hero-content">
      {#if title}
        <h1 class="mljr-hero-title">{title}</h1>
      {/if}

      {#if subtitle}
        <p class="mljr-hero-subtitle">{subtitle}</p>
      {/if}

      {#if children}
        <div class="mljr-hero-body">
          {@render children()}
        </div>
      {/if}

      {#if actions}
        <div class="mljr-hero-actions">
          {@render actions()}
        </div>
      {/if}
    </div>

    {#if media && (variant === 'split' || variant === 'default')}
      <div class="mljr-hero-media">
        {@render media()}
      </div>
    {/if}
  </div>
</section>

<style>
  .mljr-hero {
    position: relative;
    width: 100%;
    background-color: var(--mljr-bg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
  }

  .mljr-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%);
    pointer-events: none;
  }

  .mljr-hero-pattern {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle at 2px 2px, var(--mljr-border) 1px, transparent 0);
    background-size: 40px 40px;
    opacity: 0.15;
    pointer-events: none;
  }

  .mljr-hero-container {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--mljr-space-16) var(--mljr-space-6);
    display: grid;
    gap: var(--mljr-space-12);
    align-items: center;
    z-index: 1;
  }

  .mljr-hero-content {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-6);
  }

  .mljr-hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    color: var(--mljr-text);
    margin: 0;
  }

  .mljr-hero-subtitle {
    font-size: clamp(1.125rem, 2vw, 1.5rem);
    line-height: 1.6;
    color: var(--mljr-text-secondary);
    margin: 0;
    max-width: 60ch;
  }

  .mljr-hero-body {
    color: var(--mljr-text);
    line-height: 1.6;
  }

  .mljr-hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--mljr-space-4);
    margin-top: var(--mljr-space-2);
  }

  .mljr-hero-media {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Centered variant */
  .mljr-hero-centered .mljr-hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .mljr-hero-centered .mljr-hero-content {
    align-items: center;
  }

  .mljr-hero-centered .mljr-hero-subtitle {
    max-width: 70ch;
  }

  .mljr-hero-centered .mljr-hero-actions {
    justify-content: center;
  }

  /* Split variant */
  .mljr-hero-split .mljr-hero-container {
    grid-template-columns: 1fr 1fr;
  }

  /* Default variant */
  .mljr-hero-default .mljr-hero-container {
    grid-template-columns: 1fr 1fr;
  }

  /* Minimal variant */
  .mljr-hero-minimal .mljr-hero-container {
    grid-template-columns: 1fr;
    padding: var(--mljr-space-12) var(--mljr-space-6);
  }

  .mljr-hero-minimal .mljr-hero-title {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  /* Alignment */
  .mljr-hero-align-center .mljr-hero-content {
    text-align: center;
    align-items: center;
  }

  .mljr-hero-align-right .mljr-hero-content {
    text-align: right;
    align-items: flex-end;
  }

  .mljr-hero-align-center .mljr-hero-actions {
    justify-content: center;
  }

  .mljr-hero-align-right .mljr-hero-actions {
    justify-content: flex-end;
  }

  /* Background image/gradient styles */
  .mljr-hero[style*="background-image"],
  .mljr-hero[style*="background:"] {
    color: white;
  }

  .mljr-hero[style*="background-image"] .mljr-hero-title,
  .mljr-hero[style*="background:"] .mljr-hero-title {
    color: white;
  }

  .mljr-hero[style*="background-image"] .mljr-hero-subtitle,
  .mljr-hero[style*="background:"] .mljr-hero-subtitle {
    color: rgba(255, 255, 255, 0.9);
  }

  .mljr-hero[style*="background-image"] .mljr-hero-body,
  .mljr-hero[style*="background:"] .mljr-hero-body {
    color: rgba(255, 255, 255, 0.95);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .mljr-hero-split .mljr-hero-container,
    .mljr-hero-default .mljr-hero-container {
      grid-template-columns: 1fr;
    }

    .mljr-hero-media {
      order: -1;
    }

    .mljr-hero-container {
      padding: var(--mljr-space-12) var(--mljr-space-4);
    }
  }
</style>
