<script lang="ts">
  export interface DropZoneFile {
    id: string;
    file: File;
    preview?: string;       // data URL for images
    progress: number;       // 0–100
    status: 'idle' | 'uploading' | 'complete' | 'error';
    error?: string;
  }

  interface Props {
    /** Accepted MIME types / extensions (e.g. "image/*,.pdf") */
    accept?: string;
    /** Maximum file size in bytes (default: 10MB) */
    maxSize?: number;
    /** Maximum number of files (default: unlimited) */
    maxFiles?: number;
    /** Allow multiple files */
    multiple?: boolean;
    /** Disabled */
    disabled?: boolean;
    /** Bindable list of files */
    files?: DropZoneFile[];
    /** Called when files are added (after validation) */
    onFilesAdded?: (newFiles: DropZoneFile[]) => void;
    /** Called when a file is removed */
    onFileRemoved?: (file: DropZoneFile) => void;
    /** Optional upload function. Return progress updates via callback, resolves when done. */
    uploadFn?: (file: File, onProgress: (pct: number) => void) => Promise<void>;
    /** Whether to auto-start upload when files are added */
    autoUpload?: boolean;
    /** Additional CSS class */
    class?: string;
  }

  let {
    accept = '*',
    maxSize = 10 * 1024 * 1024,
    maxFiles = 0,
    multiple = true,
    disabled = false,
    files = $bindable([]),
    onFilesAdded,
    onFileRemoved,
    uploadFn,
    autoUpload = false,
    class: className = '',
  }: Props = $props();

  let dragging = $state(false);
  let inputEl: HTMLInputElement | undefined = $state();
  let errorMsg = $state('');
  let dragCounter = 0; // track nested drag events

  function formatSize(bytes: number) {
    if (bytes < 1024)       return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function getExt(name: string) {
    return name.split('.').pop()?.toUpperCase().slice(0, 4) ?? 'FILE';
  }

  function isImageFile(file: File) {
    return file.type.startsWith('image/');
  }

  function makePreview(file: File): Promise<string | undefined> {
    if (!isImageFile(file)) return Promise.resolve(undefined);
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  }

  function validateFile(file: File): string | null {
    if (maxSize > 0 && file.size > maxSize) {
      return `${file.name} exceeds the max size of ${formatSize(maxSize)}.`;
    }
    if (accept && accept !== '*') {
      const types = accept.split(',').map(t => t.trim().toLowerCase());
      const matches = types.some(t => {
        if (t.endsWith('/*')) return file.type.startsWith(t.slice(0, -1));
        if (t.startsWith('.')) return file.name.toLowerCase().endsWith(t);
        return file.type === t;
      });
      if (!matches) return `${file.name}: unsupported file type.`;
    }
    return null;
  }

  async function addFiles(fileList: FileList | File[]) {
    errorMsg = '';
    const arr = Array.from(fileList);

    if (maxFiles > 0 && files.length + arr.length > maxFiles) {
      errorMsg = `Cannot add more than ${maxFiles} file${maxFiles === 1 ? '' : 's'}.`;
      return;
    }

    const added: DropZoneFile[] = [];
    for (const file of arr) {
      const err = validateFile(file);
      if (err) { errorMsg = err; continue; }
      const preview = await makePreview(file);
      const item: DropZoneFile = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
        preview,
        progress: 0,
        status: 'idle',
      };
      added.push(item);
    }

    if (added.length) {
      files = [...files, ...added];
      onFilesAdded?.(added);
      if (autoUpload && uploadFn) {
        for (const item of added) {
          uploadFile(item);
        }
      }
    }
  }

  async function uploadFile(item: DropZoneFile) {
    if (!uploadFn) return;
    item.status = 'uploading';
    files = [...files]; // trigger reactivity
    try {
      await uploadFn(item.file, (pct) => {
        item.progress = pct;
        files = [...files];
      });
      item.progress = 100;
      item.status = 'complete';
    } catch (err) {
      item.status = 'error';
      item.error = (err as Error).message || 'Upload failed';
    }
    files = [...files];
  }

  function removeFile(item: DropZoneFile) {
    files = files.filter(f => f.id !== item.id);
    onFileRemoved?.(item);
  }

  function clearAll() {
    files = [];
    errorMsg = '';
  }

  /* ── Drag events ── */
  function onDragEnter(event: DragEvent) {
    event.preventDefault();
    dragCounter++;
    dragging = true;
  }

  function onDragLeave(event: DragEvent) {
    event.preventDefault();
    dragCounter--;
    if (dragCounter === 0) dragging = false;
  }

  function onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();
    dragging = false;
    dragCounter = 0;
    if (disabled || !event.dataTransfer?.files.length) return;
    addFiles(event.dataTransfer.files);
  }

  function onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      addFiles(input.files);
      input.value = '';
    }
  }

  function openFilePicker() {
    if (!disabled) inputEl?.click();
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openFilePicker();
    }
  }
</script>

<div class="mljr-dropzone {className}">
  <!-- Hidden file input -->
  <input
    bind:this={inputEl}
    type="file"
    {accept}
    {multiple}
    {disabled}
    style="display:none"
    onchange={onInputChange}
    aria-hidden="true"
    tabindex="-1"
  />

  <!-- Drop area -->
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  <div
    class="mljr-dropzone-area {dragging ? 'mljr-dropzone-dragging' : ''} {disabled ? 'mljr-dropzone-disabled' : ''} {errorMsg ? 'mljr-dropzone-error' : ''}"
    role="button"
    tabindex={disabled ? -1 : 0}
    aria-label="Drop files here or click to browse"
    ondragenter={onDragEnter}
    ondragleave={onDragLeave}
    ondragover={onDragOver}
    ondrop={onDrop}
    onclick={openFilePicker}
    onkeydown={onKeydown}
  >
    <!-- Upload icon -->
    <svg class="mljr-dropzone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>

    <div>
      <p class="mljr-dropzone-title">
        {dragging ? 'Drop to upload' : 'Drag & drop files here'}
      </p>
      <p class="mljr-dropzone-subtitle">or <strong>click to browse</strong></p>
    </div>

    {#if accept !== '*' || maxSize > 0 || maxFiles > 0}
      <p class="mljr-dropzone-hint">
        {[
          accept !== '*' ? `Accepts: ${accept}` : '',
          maxSize > 0 ? `Max ${formatSize(maxSize)}` : '',
          maxFiles > 0 ? `Up to ${maxFiles} file${maxFiles === 1 ? '' : 's'}` : '',
        ].filter(Boolean).join(' · ')}
      </p>
    {/if}
  </div>

  <!-- Error message -->
  {#if errorMsg}
    <p class="mljr-dropzone-error-msg" role="alert">{errorMsg}</p>
  {/if}

  <!-- File list -->
  {#if files.length > 0}
    <div class="mljr-dropzone-summary">
      <span>{files.length} file{files.length === 1 ? '' : 's'} selected</span>
      <button type="button" class="mljr-dropzone-clear-all" onclick={clearAll}>Clear all</button>
    </div>

    <div class="mljr-dropzone-files">
      {#each files as item (item.id)}
        <div class="mljr-dropzone-file mljr-dropzone-file-{item.status}">
          <!-- Thumbnail or file icon -->
          {#if item.preview}
            <img src={item.preview} alt={item.file.name} class="mljr-dropzone-thumb" />
          {:else}
            <div class="mljr-dropzone-file-icon" aria-hidden="true">{getExt(item.file.name)}</div>
          {/if}

          <!-- File info -->
          <div class="mljr-dropzone-file-info">
            <span class="mljr-dropzone-file-name">{item.file.name}</span>
            <span class="mljr-dropzone-file-size">{formatSize(item.file.size)}</span>
            {#if item.status !== 'idle'}
              <div class="mljr-dropzone-progress" aria-label="Upload progress">
                <div class="mljr-dropzone-progress-fill" style="width: {item.progress}%"></div>
              </div>
            {/if}
            <span class="mljr-dropzone-status mljr-dropzone-status-{item.status}">
              {#if item.status === 'uploading'}
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Uploading {item.progress}%
              {:else if item.status === 'complete'}
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Complete
              {:else if item.status === 'error'}
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                {item.error ?? 'Error'}
              {:else if uploadFn}
                Ready to upload
              {:else}
                Ready
              {/if}
            </span>
          </div>

          <!-- Manual upload button if uploadFn provided and not auto-upload -->
          {#if uploadFn && !autoUpload && item.status === 'idle'}
            <button
              type="button"
              class="mljr-btn mljr-btn-primary mljr-btn-sm"
              onclick={() => uploadFile(item)}
              aria-label="Upload {item.file.name}"
            >Upload</button>
          {/if}

          <!-- Remove button -->
          <button
            type="button"
            class="mljr-dropzone-remove"
            onclick={() => removeFile(item)}
            aria-label="Remove {item.file.name}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>
