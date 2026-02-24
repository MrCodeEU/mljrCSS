<script lang="ts">
  import { RichTextEditor } from '$lib';

  let content1 = $state('<p>Start typing here...</p>');
  let content2 = $state('<p>This is a <strong>read-only</strong> rich text editor. You cannot edit this content.</p>');
  let content3 = $state('');
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Default (md size)</h3>
    <RichTextEditor bind:value={content1} placeholder="Write something..." showCount={true} />
    <details class="mljr-mt-2">
      <summary class="mljr-text-xs mljr-text-muted mljr-cursor-pointer">HTML output</summary>
      <pre class="mljr-text-xs mljr-mt-1 mljr-p-2" style="background:var(--mljr-bg-secondary);border-radius:var(--mljr-radius-sm);overflow:auto;">{content1}</pre>
    </details>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Small Size</h3>
    <RichTextEditor size="sm" placeholder="Compact editor..." />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Large Size with Word Count</h3>
    <RichTextEditor size="lg" placeholder="Large editor with word count..." showCount={true} />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Read-Only</h3>
    <RichTextEditor value={content2} readonly={true} />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled</h3>
    <RichTextEditor value="<p>This editor is disabled.</p>" disabled={true} />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Empty with Custom Placeholder</h3>
    <RichTextEditor bind:value={content3} placeholder="Describe your project in detail..." showCount={true} />
  </section>
</div>
