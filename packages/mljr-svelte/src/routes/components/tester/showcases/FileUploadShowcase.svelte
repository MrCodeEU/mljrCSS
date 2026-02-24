<script lang="ts">
  import { FileUpload, Button, Icon, Card, Progress } from '$lib';

  let selectedFiles1 = $state<File[]>([]);
  let selectedFiles2 = $state<File[]>([]);
  let imageFilesList = $state<File[]>([]);
  let uploading = $state(false);
  let uploadProgress = $state(0);

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function simulateUpload() {
    uploading = true;
    uploadProgress = 0;
    const interval = setInterval(() => {
      uploadProgress += 10;
      if (uploadProgress >= 100) {
        clearInterval(interval);
        uploading = false;
      }
    }, 300);
  }
</script>

<div class="mljr-space-y-8">
  <!-- Basic File Upload -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic File Upload</h3>
    <FileUpload onFilesSelect={(fl) => { selectedFiles1 = Array.from(fl); }} />
    {#if selectedFiles1.length > 0}
      <div class="mljr-mt-3 mljr-space-y-2">
        {#each selectedFiles1 as file}
          <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-text-sm">
            <Icon icon="mdi:file" size={16} />
            <span>{file.name}</span>
            <span class="mljr-text-muted">({formatSize(file.size)})</span>
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <!-- Multiple Files -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Multiple Files</h3>
    <FileUpload multiple onFilesSelect={(fl) => { selectedFiles2 = Array.from(fl); }} />
    {#if selectedFiles2.length > 0}
      <div class="mljr-mt-3 mljr-space-y-2">
        {#each selectedFiles2 as file}
          <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-text-sm mljr-p-2 mljr-bg-secondary mljr-rounded-lg">
            <Icon icon="mdi:file-document" size={20} />
            <div class="mljr-flex-1">
              <div>{file.name}</div>
              <div class="mljr-text-xs mljr-text-muted">{formatSize(file.size)}</div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <!-- Accept Specific Types -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Accept Specific File Types</h3>
    <div class="mljr-space-y-3">
      <div>
        <p class="mljr-text-sm mljr-font-medium mljr-mb-2">Images Only</p>
        <FileUpload
          accept="image/*"
          multiple
          label="Drop images here or click to browse"
          onFilesSelect={(fl) => { imageFilesList = Array.from(fl); }}
        />
      </div>
      <div>
        <p class="mljr-text-sm mljr-font-medium mljr-mb-2">PDF Only</p>
        <FileUpload
          accept=".pdf"
          label="Drop PDF files here or click to browse"
        />
      </div>
      <div>
        <p class="mljr-text-sm mljr-font-medium mljr-mb-2">Documents</p>
        <FileUpload
          accept=".doc,.docx,.pdf,.txt"
          multiple
          label="Drop documents here or click to browse"
        />
      </div>
    </div>
  </section>

  <!-- With Max Size -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Max File Size</h3>
    <FileUpload
      multiple
      maxSize={5 * 1024 * 1024}
      label="Max 5MB per file"
      hint="Files larger than 5MB will be rejected"
    />
  </section>

  <!-- Disabled -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled</h3>
    <FileUpload disabled label="Upload disabled" />
  </section>

  <!-- With Upload Progress -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Upload Progress</h3>
    <Card>
      <div class="mljr-space-y-4">
        <FileUpload onFilesSelect={(fl) => { selectedFiles1 = Array.from(fl); }} />
        {#if selectedFiles1.length > 0}
          <div class="mljr-space-y-3">
            {#each selectedFiles1 as file}
              <div class="mljr-space-y-1">
                <div class="mljr-flex mljr-items-center mljr-justify-between mljr-text-sm">
                  <div class="mljr-flex mljr-items-center mljr-gap-2">
                    <Icon icon="mdi:file" size={16} />
                    <span>{file.name}</span>
                  </div>
                  <span class="mljr-text-muted">{formatSize(file.size)}</span>
                </div>
                {#if uploading}
                  <Progress value={uploadProgress} size="sm" variant="primary" />
                {/if}
              </div>
            {/each}
            <Button
              variant="primary"
              size="sm"
              onclick={simulateUpload}
              disabled={uploading}
            >
              {uploading ? `Uploading ${uploadProgress}%...` : 'Upload Files'}
            </Button>
          </div>
        {/if}
      </div>
    </Card>
  </section>

  <!-- Avatar Upload -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Avatar Upload</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-4">
      <div class="mljr-relative mljr-w-24 mljr-h-24">
        <div class="mljr-w-24 mljr-h-24 mljr-bg-gradient-primary mljr-rounded-full mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-text-2xl mljr-font-bold">
          JD
        </div>
        <label class="mljr-absolute mljr-bottom-0 mljr-right-0 mljr-w-8 mljr-h-8 mljr-bg-primary-500 mljr-rounded-full mljr-flex mljr-items-center mljr-justify-center mljr-cursor-pointer hover:mljr-bg-primary-600 mljr-transition-colors">
          <Icon icon="mdi:camera" size={16} class="mljr-text-white" />
          <input type="file" accept="image/*" class="mljr-hidden" />
        </label>
      </div>
      <div>
        <p class="mljr-font-medium mljr-mb-1">Profile Photo</p>
        <p class="mljr-text-sm mljr-text-muted">JPG, PNG or GIF. Max 2MB.</p>
      </div>
    </div>
  </section>

  <!-- Simple Button Style Upload -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Simple Upload</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-3">
      <FileUpload label="Choose File" onFilesSelect={(fl) => { selectedFiles1 = Array.from(fl); }} />
      <span class="mljr-text-sm mljr-text-muted">
        {selectedFiles1.length > 0 ? selectedFiles1[0].name : 'No file chosen'}
      </span>
    </div>
  </section>
</div>
