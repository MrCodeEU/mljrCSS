<script lang="ts">
  import { Card, FileUpload, CodeExample } from '$lib';

  let files1 = $state([]);
  let files2 = $state([]);
  let files3 = $state([]);
</script>

<section id="file-upload" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6">
    <Card title="Basic File Upload" description="Simple drag and drop upload">
      <FileUpload
        label="Drop files here or click to upload"
        hint="Supports any file type"
        bind:files={files1}
      />
    </Card>

    <Card title="Image Upload with Preview" description="Image preview support">
      <FileUpload
        label="Drop images here or click to upload"
        hint="JPG, PNG, GIF up to 5MB"
        accept="image/*"
        maxSize={5 * 1024 * 1024}
        showPreview
        bind:files={files2}
      />
    </Card>

    <Card title="Multiple Files" description="Upload multiple files">
      <FileUpload
        label="Drop multiple files here"
        hint="You can upload up to 5 files"
        multiple
        maxFiles={5}
        bind:files={files3}
      />
    </Card>

    <Card title="Disabled State" description="Disabled upload zone">
      <FileUpload
        label="Upload disabled"
        hint="Cannot upload at this time"
        disabled
      />
    </Card>
  </div>

  <CodeExample code={`// Component usage
<FileUpload
  label="Drop files here or click to upload"
  hint="Supports any file type"
  bind:files
/>

<FileUpload
  label="Drop images here"
  hint="JPG, PNG, GIF up to 5MB"
  accept="image/*"
  maxSize={5 * 1024 * 1024}
  showPreview
  bind:files
/>

<FileUpload
  label="Drop multiple files"
  hint="Up to 5 files"
  multiple
  maxFiles={5}
  bind:files
/>

<FileUpload
  label="Upload disabled"
  disabled
/>`} />
</section>
