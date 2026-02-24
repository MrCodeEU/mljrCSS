<script lang="ts">
  import { CopyButton, CodeExample } from '$lib';

  const codeExample = `<script>
  import { CopyButton } from 'mljr-svelte';
<\/script>

<!-- Basic usage -->
<CopyButton text="Hello, World!" />

<!-- With label -->
<CopyButton text="npm install mljr-svelte" label="Copy" />

<!-- Primary variant with custom success message -->
<CopyButton
  text="const foo = 'bar';"
  variant="primary"
  successMessage="Code copied!"
/>

<!-- Small size with success label -->
<CopyButton
  text="secret-api-key-123"
  size="sm"
  label="Copy API Key"
  successLabel="Copied!"
/>

<!-- Custom icons -->
<CopyButton
  text="Custom content"
  icon="mdi:clipboard-text"
  successIcon="mdi:clipboard-check"
  variant="outline-primary"
/>`;

  const exampleCode = `// Example code to copy
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`;
</script>

<div class="copy-button-section">
  <div class="mljr-mb-6">
    <p class="mljr-text-lg mljr-text-muted">
      Copy text to clipboard with visual feedback. Perfect for code snippets, API keys, or any text
      content users need to copy.
    </p>
  </div>

  <div class="examples-grid">
    <!-- Basic Usage -->
    <div class="example-card">
      <h3 class="example-title">Basic Usage</h3>
      <div class="example-demo">
        <CopyButton text="Hello, World!" />
        <CopyButton text="Copy this text" label="Copy" />
      </div>
    </div>

    <!-- Variants -->
    <div class="example-card">
      <h3 class="example-title">Variants</h3>
      <div class="example-demo">
        <CopyButton text="Primary variant" variant="primary" label="Primary" />
        <CopyButton text="Secondary variant" variant="secondary" label="Secondary" />
        <CopyButton text="Ghost variant" variant="ghost" label="Ghost" />
        <CopyButton text="Outline variant" variant="outline-primary" label="Outline" />
      </div>
    </div>

    <!-- Sizes -->
    <div class="example-card">
      <h3 class="example-title">Sizes</h3>
      <div class="example-demo">
        <CopyButton text="Small button" size="sm" label="Small" />
        <CopyButton text="Medium button" size="md" label="Medium" />
        <CopyButton text="Large button" size="lg" label="Large" />
      </div>
    </div>

    <!-- With Success Labels -->
    <div class="example-card">
      <h3 class="example-title">With Success Labels</h3>
      <div class="example-demo">
        <CopyButton
          text="npm install mljr-svelte"
          label="Copy command"
          successLabel="Copied!"
          variant="primary"
        />
        <CopyButton
          text="secret-api-key-123456"
          label="Copy API Key"
          successLabel="✓ Copied"
          variant="outline-primary"
        />
      </div>
    </div>

    <!-- Code Example Use Case -->
    <div class="example-card full-width">
      <h3 class="example-title">Code Snippet Example</h3>
      <div class="code-preview">
        <div class="code-header">
          <span class="code-title">example.js</span>
          <CopyButton text={exampleCode} size="sm" successMessage="Code copied to clipboard!" />
        </div>
        <pre class="code-block"><code>{exampleCode}</code></pre>
      </div>
    </div>

    <!-- Custom Icons -->
    <div class="example-card">
      <h3 class="example-title">Custom Icons</h3>
      <div class="example-demo">
        <CopyButton
          text="Text with custom icons"
          icon="mdi:clipboard-text"
          successIcon="mdi:clipboard-check"
          label="Copy"
          variant="secondary"
        />
        <CopyButton
          text="Another example"
          icon="mdi:content-copy"
          successIcon="mdi:check-circle"
          label="Duplicate"
        />
      </div>
    </div>

    <!-- Code Example -->
    <div class="example-card full-width">
      <h3 class="example-title">Usage Example</h3>
      <CodeExample code={codeExample} language="svelte" />
    </div>
  </div>
</div>

<style>
  .copy-button-section {
    max-width: 100%;
  }

  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--mljr-space-6);
  }

  .example-card {
    padding: var(--mljr-space-6);
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-shadow);
  }

  .example-card.full-width {
    grid-column: 1 / -1;
  }

  .example-title {
    font-size: var(--mljr-text-lg);
    font-weight: 600;
    color: var(--mljr-text);
    margin-bottom: var(--mljr-space-4);
  }

  .example-demo {
    display: flex;
    flex-wrap: wrap;
    gap: var(--mljr-space-3);
    align-items: center;
  }

  .code-preview {
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-md);
    overflow: hidden;
    border: 1px solid var(--mljr-border);
  }

  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--mljr-space-3) var(--mljr-space-4);
    background: var(--mljr-bg);
    border-bottom: 1px solid var(--mljr-border);
  }

  .code-title {
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text-secondary);
    font-family: var(--mljr-font-mono);
  }

  .code-block {
    margin: 0;
    padding: var(--mljr-space-4);
    font-family: var(--mljr-font-mono);
    font-size: var(--mljr-text-sm);
    line-height: 1.6;
    overflow-x: auto;
    color: var(--mljr-text);
  }

  .code-block code {
    font-family: inherit;
  }
</style>
