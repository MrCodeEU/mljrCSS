<script lang="ts">
  import { themeStore } from '$lib';
  import { onMount } from 'svelte';
  import '../app.css';

  let { children } = $props();

  onMount(() => {
    themeStore.initialize();
  });
</script>

<svelte:head>
  <title>MLJR CSS - Component Showcase</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
</svelte:head>

{@render children()}

<style>
  :global(body) {
    font-family: 'Inter', system-ui, sans-serif;
  }
  :global(code, pre) {
    font-family: 'JetBrains Mono', monospace;
  }
</style>
