<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    orientation?: 'horizontal' | 'vertical';
    variant?: 'primary' | 'secondary' | 'accent' | 'subtle';
    style?: 'gradient' | 'solid' | 'dashed';
    thickness?: 'thin' | 'default' | 'thick';
    align?: 'center' | 'left' | 'right';
    spacing?: 'sm' | 'md' | 'lg' | 'xl';
    showAccents?: boolean;
    class?: string;
  }

  let {
    children,
    orientation = 'horizontal',
    variant = 'primary',
    style = 'gradient',
    thickness = 'default',
    align = 'center',
    spacing = 'md',
    showAccents = true,
    class: className = '',
  }: Props = $props();

  const dividerClasses = $derived(
    [
      'mljr-divider',
      orientation === 'vertical' && 'mljr-divider-vertical',
      variant !== 'primary' && `mljr-divider-${variant}`,
      style !== 'gradient' && `mljr-divider-${style}`,
      thickness !== 'default' && `mljr-divider-${thickness}`,
      align !== 'center' && `mljr-divider-${align}`,
      spacing !== 'md' && `mljr-divider-${spacing}`,
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  const hasContent = $derived(!!children);
</script>

<div class={dividerClasses} role="separator" aria-orientation={orientation}>
  {#if showAccents}
    <span class="mljr-divider-accent-l"></span>
    <span class="mljr-divider-accent-r"></span>
  {/if}
  {#if hasContent}
    <span class="mljr-divider-content">
      {@render children?.()}
    </span>
  {/if}
</div>
