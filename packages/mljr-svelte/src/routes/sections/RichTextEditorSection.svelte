<script lang="ts">
  import { RichTextEditor } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';

  let content1 = $state('<p>Start editing this <strong>rich text</strong> content…</p>');
  let content2 = $state('');
  let content3 = $state('<h2>Meeting Notes</h2><p>Attendees: <em>Alice, Bob, Carol</em></p><ul><li>Reviewed Q1 goals</li><li>Discussed roadmap</li><li>Next steps defined</li></ul>');
  let content4 = $state('<p>Read-only content that cannot be modified.</p>');
</script>

<div class="mljr-space-y-8">
  <!-- Basic editor -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Basic Editor</h3>
    <RichTextEditor bind:value={content1} placeholder="Start typing…" />
    {#if content1}
      <div class="mljr-alert mljr-alert-info mljr-mt-3" style="font-size: 0.8125rem;">
        <strong>HTML output:</strong> <code style="word-break: break-all;">{content1}</code>
      </div>
    {/if}
    <CodeExample code={`<script lang="ts">
  let content = $state('');
<\/script>
<RichTextEditor bind:value={content} placeholder="Start typing…" />`} />
  </div>

  <!-- Sizes -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Sizes</h3>
    <div class="mljr-space-y-4">
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Small</p>
        <RichTextEditor size="sm" placeholder="Small editor…" />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Medium (default)</p>
        <RichTextEditor placeholder="Medium editor…" />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Large</p>
        <RichTextEditor size="lg" placeholder="Large editor…" />
      </div>
    </div>
    <CodeExample code={`<RichTextEditor size="sm" />
<RichTextEditor size="md" />  <!-- default -->
<RichTextEditor size="lg" />`} />
  </div>

  <!-- With word/char count -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">With Word & Character Count</h3>
    <RichTextEditor bind:value={content2} placeholder="Start writing to see the count…" showCount />
    <CodeExample code={`<RichTextEditor bind:value showCount />`} />
  </div>

  <!-- Pre-populated content -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Pre-populated Content</h3>
    <RichTextEditor bind:value={content3} />
    <CodeExample code={`<RichTextEditor bind:value={html} />`} />
  </div>

  <!-- Read-only -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Read-only</h3>
    <RichTextEditor bind:value={content4} readonly />
    <CodeExample code={`<RichTextEditor readonly bind:value={html} />`} />
  </div>

  <!-- Disabled -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Disabled</h3>
    <RichTextEditor value="<p>This editor is disabled.</p>" disabled />
    <CodeExample code={`<RichTextEditor disabled />`} />
  </div>

  <!-- With change handler -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">With Change Handler</h3>
    <RichTextEditor
      placeholder="Type something…"
      onchange={(html) => console.log('Changed:', html)}
    />
    <CodeExample code={`<RichTextEditor onchange={(html) => console.log(html)} />`} />
  </div>

  <!-- Keyboard shortcuts info -->
  <div class="mljr-alert mljr-alert-info">
    <strong>Keyboard shortcuts:</strong> Ctrl+B = Bold · Ctrl+I = Italic · Ctrl+U = Underline · Ctrl+Z = Undo · Ctrl+Y = Redo
  </div>
</div>
