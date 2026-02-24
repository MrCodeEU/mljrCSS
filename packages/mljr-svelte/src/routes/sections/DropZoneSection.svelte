<script lang="ts">
  import { DropZone } from '$lib';
  import type { DropZoneFile } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';

  let basicFiles: DropZoneFile[] = $state([]);
  let imageFiles: DropZoneFile[] = $state([]);
  let uploadFiles: DropZoneFile[] = $state([]);

  // Simulate an upload with progress
  async function simulateUpload(file: File, onProgress: (pct: number) => void): Promise<void> {
    return new Promise((resolve) => {
      let pct = 0;
      const interval = setInterval(() => {
        pct += Math.random() * 25;
        if (pct >= 100) {
          onProgress(100);
          clearInterval(interval);
          resolve();
        } else {
          onProgress(Math.round(pct));
        }
      }, 150);
    });
  }
</script>

<div class="mljr-space-y-8">
  <!-- Basic usage -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Basic Drop Zone</h3>
    <DropZone bind:files={basicFiles} />
    <p class="mljr-text-sm mljr-text-muted mljr-mt-2">{basicFiles.length} file(s) selected</p>
    <CodeExample code={`<DropZone bind:files />`} />
  </div>

  <!-- Images only with preview -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Images Only (with Preview)</h3>
    <DropZone
      bind:files={imageFiles}
      accept="image/*"
      maxFiles={5}
      maxSize={2 * 1024 * 1024}
    />
    <CodeExample code={`<DropZone accept="image/*" maxFiles={5} maxSize={2 * 1024 * 1024} />`} />
  </div>

  <!-- With upload simulation -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">With Upload Progress</h3>
    <DropZone
      bind:files={uploadFiles}
      uploadFn={simulateUpload}
      autoUpload
    />
    <CodeExample code={`<DropZone uploadFn={uploadFn} autoUpload />`} />
  </div>

  <!-- Single file, PDF only -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Single File (PDF)</h3>
    <DropZone accept=".pdf" multiple={false} maxFiles={1} />
    <CodeExample code={`<DropZone accept=".pdf" multiple={false} maxFiles={1} />`} />
  </div>

  <!-- Disabled -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Disabled</h3>
    <DropZone disabled />
    <CodeExample code={`<DropZone disabled />`} />
  </div>
</div>
