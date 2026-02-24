<script lang="ts">
  import { DropZone } from '$lib';
  import type { DropZoneFile } from '$lib';

  let files: DropZoneFile[] = $state([]);

  async function simulateUpload(file: File, onProgress: (pct: number) => void): Promise<void> {
    return new Promise((resolve) => {
      let pct = 0;
      const interval = setInterval(() => {
        pct += Math.random() * 30;
        if (pct >= 100) {
          onProgress(100);
          clearInterval(interval);
          resolve();
        } else {
          onProgress(Math.round(pct));
        }
      }, 120);
    });
  }
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic</h3>
    <DropZone bind:files />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Images with Preview</h3>
    <DropZone accept="image/*" maxFiles={4} maxSize={5 * 1024 * 1024} />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Simulated Upload</h3>
    <DropZone uploadFn={simulateUpload} autoUpload />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Single PDF, Disabled</h3>
    <div class="mljr-grid mljr-gap-4" style="grid-template-columns: 1fr 1fr;">
      <DropZone accept=".pdf" multiple={false} maxFiles={1} />
      <DropZone disabled />
    </div>
  </section>
</div>
