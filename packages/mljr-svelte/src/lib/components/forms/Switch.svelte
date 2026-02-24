<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { Icon } from '$lib';

  interface Props extends Omit<HTMLInputAttributes, 'type'> {
    label?: string;
    secondary?: boolean;
    /** Icon to show when checked (on state) */
    onIcon?: string;
    /** Icon to show when unchecked (off state) */
    offIcon?: string;
    /** Label to show when checked */
    onLabel?: string;
    /** Label to show when unchecked */
    offLabel?: string;
  }

  let {
    label = '',
    secondary = false,
    onIcon,
    offIcon,
    onLabel,
    offLabel,
    checked = $bindable(false),
    id,
    class: className = '',
    ...restProps
  }: Props = $props();

  let switchId = $derived(id || `switch-${Math.random().toString(36).slice(2, 9)}`);

  let wrapperClasses = $derived(
    [
      'mljr-switch',
      secondary && 'mljr-switch-secondary',
      (onIcon || offIcon) && 'mljr-switch-with-icons',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  const displayLabel = $derived(() => {
    if (onLabel && offLabel) {
      return checked ? onLabel : offLabel;
    }
    return label;
  });
</script>

<label class={wrapperClasses}>
  <input
    type="checkbox"
    id={switchId}
    class="mljr-switch-input"
    role="switch"
    aria-checked={checked}
    bind:checked
    {...restProps}
  />
  <span class="mljr-switch-track">
    {#if onIcon && checked}
      <span class="mljr-switch-icon">
        <Icon icon={onIcon} size={12} />
      </span>
    {/if}
    {#if offIcon && !checked}
      <span class="mljr-switch-icon">
        <Icon icon={offIcon} size={12} />
      </span>
    {/if}
  </span>
  {#if displayLabel()}
    <span class="mljr-switch-label">{displayLabel()}</span>
  {/if}
</label>
