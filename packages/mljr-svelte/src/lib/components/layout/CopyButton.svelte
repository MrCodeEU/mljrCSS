<script lang="ts">
  import { Icon } from '$lib';

  interface Props {
    /** The text content to copy to clipboard */
    text: string;
    /** Button variant */
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline-primary';
    /** Size of the button */
    size?: 'sm' | 'md' | 'lg';
    /** Success message to show */
    successMessage?: string;
    /** Duration to show success state in ms */
    successDuration?: number;
    /** Custom icon for default state */
    icon?: string;
    /** Custom icon for success state */
    successIcon?: string;
    /** Show text label next to icon */
    label?: string;
    /** Success label to show */
    successLabel?: string;
    /** Additional CSS classes */
    class?: string;
  }

  let {
    text,
    variant = 'ghost',
    size = 'md',
    successMessage = 'Copied!',
    successDuration = 2000,
    icon = 'mdi:content-copy',
    successIcon = 'mdi:check',
    label,
    successLabel,
    class: className = '',
  }: Props = $props();

  let copied = $state(false);
  let timeoutId: number | undefined;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;

      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Reset after duration
      timeoutId = setTimeout(() => {
        copied = false;
      }, successDuration) as unknown as number;
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }

  // Cleanup timeout on unmount
  $effect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  });

  const sizeClasses = {
    sm: 'mljr-btn-sm',
    md: '',
    lg: 'mljr-btn-lg',
  };
</script>

<button
  type="button"
  class="mljr-btn mljr-btn-{variant} {sizeClasses[size]} copy-button {className}"
  onclick={copyToClipboard}
  aria-label={copied ? successMessage : 'Copy to clipboard'}
  title={copied ? successMessage : 'Copy to clipboard'}
>
  {#if copied}
    <Icon icon={successIcon} size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
    {#if successLabel}
      <span class="copy-button-label">{successLabel}</span>
    {/if}
  {:else}
    <Icon icon={icon} size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
    {#if label}
      <span class="copy-button-label">{label}</span>
    {/if}
  {/if}
</button>

<style>
  .copy-button {
    display: inline-flex;
    align-items: center;
    gap: var(--mljr-space-2);
    transition: all var(--mljr-transition-fast);
  }

  .copy-button-label {
    font-size: inherit;
  }
</style>
