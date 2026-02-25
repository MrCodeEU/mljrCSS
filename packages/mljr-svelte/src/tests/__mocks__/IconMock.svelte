<script module lang="ts">
  // Stub exports matching @iconify/svelte named exports
  export async function loadIcon(_icon: string): Promise<null> {
    return null;
  }
  export function addCollection() {}
  export function addIcon() {}
  export function iconExists() { return false; }
  export function listIcons() { return []; }
</script>

<script lang="ts">
  let { icon = '', width, height, class: className = '', ...rest } = $props();
</script>

<span class="iconify {className}" data-icon={icon}></span>
