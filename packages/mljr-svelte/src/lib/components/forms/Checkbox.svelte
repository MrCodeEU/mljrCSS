<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { Icon } from '$lib';

  interface Props extends Omit<HTMLInputAttributes, 'type'> {
    label?: string;
    children?: Snippet;
    secondary?: boolean;
    indeterminate?: boolean;
    /** Custom icon when checked */
    checkedIcon?: string;
    /** Custom icon when unchecked */
    uncheckedIcon?: string;
    /** Custom icon when indeterminate */
    indeterminateIcon?: string;
  }

  let {
    label = '',
    children,
    secondary = false,
    indeterminate = false,
    checkedIcon,
    uncheckedIcon,
    indeterminateIcon,
    checked = $bindable(false),
    id,
    class: className = '',
    ...restProps
  }: Props = $props();

  let checkboxId = $derived(id || `checkbox-${Math.random().toString(36).slice(2, 9)}`);
  let hasCustomIcons = $derived(!!(checkedIcon || uncheckedIcon || indeterminateIcon));

  let wrapperClasses = $derived(
    [
      'mljr-checkbox',
      secondary && 'mljr-checkbox-secondary',
      hasCustomIcons && 'mljr-checkbox-custom-icons',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  let inputRef: HTMLInputElement | undefined = $state();

  $effect(() => {
    if (inputRef && !hasCustomIcons) {
      inputRef.indeterminate = indeterminate;
    }
  });

  function getCurrentIcon() {
    if (indeterminate && indeterminateIcon) {
      return indeterminateIcon;
    }
    if (checked && checkedIcon) {
      return checkedIcon;
    }
    if (!checked && uncheckedIcon) {
      return uncheckedIcon;
    }
    // Defaults
    if (indeterminate) return 'mdi:minus-box';
    if (checked) return 'mdi:checkbox-marked';
    return 'mdi:checkbox-blank-outline';
  }
</script>

<label class={wrapperClasses}>
  <input
    bind:this={inputRef}
    type="checkbox"
    id={checkboxId}
    class="mljr-checkbox-input"
    class:mljr-checkbox-input-hidden={hasCustomIcons}
    bind:checked
    {...restProps}
  />
  {#if hasCustomIcons}
    <span class="mljr-checkbox-custom-icon" class:indeterminate>
      <Icon icon={getCurrentIcon()} size={20} />
    </span>
  {/if}
  {#if children}
    {@render children()}
  {:else if label}
    <span class="mljr-checkbox-label">{label}</span>
  {/if}
</label>

<style>
  .mljr-checkbox-custom-icons {
    position: relative;
  }

  .mljr-checkbox-input-hidden {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .mljr-checkbox-custom-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--mljr-text-secondary);
    transition: color var(--mljr-transition-fast);
    cursor: pointer;
  }

  .mljr-checkbox:has(.mljr-checkbox-input:checked) .mljr-checkbox-custom-icon {
    color: var(--mljr-primary-600);
  }

  .mljr-checkbox-secondary:has(.mljr-checkbox-input:checked) .mljr-checkbox-custom-icon {
    color: var(--mljr-secondary-600);
  }

  .mljr-checkbox-custom-icon.indeterminate {
    color: var(--mljr-warning);
  }

  .mljr-checkbox:has(.mljr-checkbox-input:disabled) .mljr-checkbox-custom-icon {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
