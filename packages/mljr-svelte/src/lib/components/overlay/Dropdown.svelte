<script lang="ts">
  import type { Snippet } from 'svelte';

  type Position = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

  interface Props {
    trigger: Snippet;
    children: Snippet;
    position?: Position;
    class?: string;
  }

  let {
    trigger,
    children,
    position = 'bottom-left',
    class: className = '',
  }: Props = $props();

  let isOpen = $state(false);
  let dropdownRef: HTMLElement | undefined = $state();

  function toggle() {
    isOpen = !isOpen;
  }

  function close() {
    isOpen = false;
  }

  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
      close();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      close();
    }
  }

  $effect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeydown);
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleKeydown);
      };
    }
  });

  const positionClasses: Record<Position, string> = {
    'bottom-left': 'mljr-dropdown-bottom-left',
    'bottom-right': 'mljr-dropdown-bottom-right',
    'top-left': 'mljr-dropdown-top-left',
    'top-right': 'mljr-dropdown-top-right',
  };

  let dropdownClasses = $derived(
    ['mljr-dropdown', positionClasses[position], isOpen ? 'mljr-dropdown-open' : '', className]
      .filter(Boolean)
      .join(' ')
  );
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={dropdownClasses} bind:this={dropdownRef}>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    class="mljr-dropdown-trigger"
    onclick={toggle}
    onkeydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    }}
    role="button"
    tabindex="0"
    aria-expanded={isOpen}
    aria-haspopup="menu"
  >
    {@render trigger()}
  </div>

  {#if isOpen}
    <div class="mljr-dropdown-menu" role="menu">
      {@render children()}
    </div>
  {/if}
</div>
