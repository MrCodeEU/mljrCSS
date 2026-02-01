<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'type'> {
    label?: string;
    secondary?: boolean;
  }

  let {
    label = '',
    secondary = false,
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
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );
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
  {#if label}
    <span class="mljr-switch-label">{label}</span>
  {/if}
</label>
