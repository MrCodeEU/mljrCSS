<script lang="ts">
  import { CopyButton, Card, Button } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Copy Button</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-3">
      <code class="mljr-bg-secondary mljr-px-3 mljr-py-1.5 mljr-rounded-lg mljr-text-sm mljr-font-mono">
        npm install @mljr/css
      </code>
      <CopyButton text="npm install @mljr/css" />
    </div>
  </section>

  <!-- Variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Variants</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <CopyButton text="primary variant" variant="primary" label="Copy" />
      <CopyButton text="secondary variant" variant="secondary" label="Copy" />
      <CopyButton text="ghost variant" variant="ghost" label="Copy" />
      <CopyButton text="outline variant" variant="outline-primary" label="Copy" />
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-3">
      <CopyButton text="small" size="sm" label="Copy" />
      <CopyButton text="medium" size="md" label="Copy" />
      <CopyButton text="large" size="lg" label="Copy" />
    </div>
  </section>

  <!-- Custom Messages -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Success Message</h3>
    <div class="mljr-flex mljr-gap-3">
      <CopyButton
        text="Hello World"
        label="Copy text"
        successLabel="Copied!"
        successMessage="Text copied to clipboard"
      />
      <CopyButton
        text="secret-api-key-12345"
        label="Copy API Key"
        successLabel="Key Copied!"
        successDuration={3000}
      />
    </div>
  </section>

  <!-- Icon Only -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Icon Only</h3>
    <CopyButton text="icon only copy" />
  </section>

  <!-- In Code Blocks -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Code Block Examples</h3>
    <div class="mljr-space-y-3">
      {#each [
        { label: 'Install CSS package', cmd: 'pnpm add @mljr/css' },
        { label: 'Install Svelte package', cmd: 'pnpm add @mljr/svelte' },
        { label: 'Import styles', cmd: "import '@mljr/css/dist/mljr.css';" },
      ] as item}
        <div class="mljr-bg-gray-900 mljr-rounded-xl mljr-overflow-hidden">
          <div class="mljr-flex mljr-items-center mljr-justify-between mljr-px-4 mljr-py-2 mljr-border-b mljr-border-white/10">
            <span class="mljr-text-xs mljr-text-white/50">{item.label}</span>
            <CopyButton text={item.cmd} variant="ghost" size="sm" class="mljr-text-white/70 hover:mljr-text-white" />
          </div>
          <div class="mljr-px-4 mljr-py-3">
            <code class="mljr-text-sm mljr-text-green-400 mljr-font-mono">{item.cmd}</code>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Copy Different Content Types -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Copy Different Content</h3>
    <Card>
      <div class="mljr-space-y-3">
        <div class="mljr-flex mljr-items-center mljr-justify-between mljr-p-3 mljr-bg-secondary mljr-rounded-lg">
          <span class="mljr-text-sm">Email: contact@mljr.dev</span>
          <CopyButton text="contact@mljr.dev" size="sm" />
        </div>
        <div class="mljr-flex mljr-items-center mljr-justify-between mljr-p-3 mljr-bg-secondary mljr-rounded-lg">
          <span class="mljr-text-sm mljr-font-mono">API Key: sk-1234...abcd</span>
          <CopyButton text="sk-1234567890abcdefghij" size="sm" label="Copy Key" successLabel="Copied!" />
        </div>
        <div class="mljr-flex mljr-items-center mljr-justify-between mljr-p-3 mljr-bg-secondary mljr-rounded-lg">
          <span class="mljr-text-sm">#F97316 (Orange)</span>
          <CopyButton text="#F97316" size="sm" label="Copy Color" />
        </div>
      </div>
    </Card>
  </section>
</div>
