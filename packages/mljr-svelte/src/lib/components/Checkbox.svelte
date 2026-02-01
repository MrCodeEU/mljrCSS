<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'type'> {
    label?: string;
    secondary?: boolean;
    indeterminate?: boolean;
  }

  let {
    label = '',
    secondary = false,
    indeterminate = false,
    checked = $bindable(false),
    id,
    class: className = '',
    ...restProps
  }: Props = $props();

  let checkboxId = $derived(id || `checkbox-${Math.random().toString(36).slice(2, 9)}`);

  let wrapperClasses = $derived(
    [
      'mljr-checkbox',
      secondary && 'mljr-checkbox-secondary',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  let inputRef: HTMLInputElement | undefined = $state();

  $effect(() => {
    if (inputRef) {
      inputRef.indeterminate = indeterminate;
    }
  });
</script>

<label class={wrapperClasses}>
  <input
    bind:this={inputRef}
    type="checkbox"
    id={checkboxId}
    class="mljr-checkbox-input"
    bind:checked
    {...restProps}
  />
  {#if label}
    <span class="mljr-checkbox-label">{label}</span>
  {/if}
</label>
