<script lang="ts">
  interface Props {
    code: string;
    title?: string;
    language?: string;
  }

  let { code, title = '💻 Code Example', language: _language = 'svelte' }: Props = $props();
  
  let isOpen = $state(false);
</script>

<div class="code-example">
  <button
    type="button"
    class="code-example-toggle"
    aria-expanded={isOpen}
    onclick={() => isOpen = !isOpen}
  >
    <span class="code-example-title">{title}</span>
    <svg
      class="code-example-icon"
      class:is-open={isOpen}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M3.204 5.587a.5.5 0 0 1 .796-.083L8 9.293l4-3.79a.5.5 0 0 1 .708.708l-4.354 4.126a.5.5 0 0 1-.708 0L3.292 6.211a.5.5 0 0 1-.088-.624z"/>
    </svg>
  </button>
  
  {#if isOpen}
    <div class="code-example-content" transition:slide={{ duration: 200 }}>
      <div class="code-block">
        <pre>{code}</pre>
      </div>
    </div>
  {/if}
</div>

<script module>
  import { slide } from 'svelte/transition';
</script>

<style>
  .code-example {
    margin-top: var(--mljr-space-6);
  }

  .code-example-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--mljr-space-3) var(--mljr-space-4);
    background: var(--mljr-bg-secondary);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-lg);
    color: var(--mljr-text);
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: var(--mljr-clay-shadow-xs);
  }

  .code-example-toggle:hover {
    background: var(--mljr-bg-tertiary);
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .code-example-toggle:active {
    box-shadow: var(--mljr-clay-inset-sm);
  }

  .code-example-icon {
    transition: transform 0.2s ease;
    color: var(--mljr-text-muted);
  }

  .code-example-icon.is-open {
    transform: rotate(180deg);
  }

  .code-example-content {
    margin-top: var(--mljr-space-2);
  }

  .code-block {
    background: var(--mljr-bg-tertiary);
    padding: var(--mljr-space-4);
    border-radius: var(--mljr-radius-md);
    overflow-x: auto;
    border: 1px solid var(--mljr-border);
  }

  .code-block pre {
    margin: 0;
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text);
    line-height: 1.5;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    white-space: pre-wrap;
    word-break: break-word;
  }
</style>
