<script lang="ts">
  import type { Snippet } from 'svelte';

  interface FileInfo {
    file: File;
    id: string;
    progress: number;
    error?: string;
  }

  interface Props {
    label?: string;
    hint?: string;
    multiple?: boolean;
    accept?: string;
    maxSize?: number; // in bytes
    maxFiles?: number;
    disabled?: boolean;
    files?: FileInfo[];
    showPreview?: boolean;
    children?: Snippet;
    onFilesSelect?: (files: FileList) => void;
    onFileRemove?: (file: FileInfo) => void;
    id?: string;
    class?: string;
  }

  let {
    label = 'Drop files here or click to upload',
    hint = '',
    multiple = false,
    accept = '',
    maxSize = 0,
    maxFiles = 0,
    disabled = false,
    files = $bindable([]),
    showPreview = false,
    children,
    onFilesSelect,
    onFileRemove,
    id,
    class: className = '',
    ...restProps
  }: Props = $props();

  let uploadId = $derived(id || `file-upload-${Math.random().toString(36).slice(2, 9)}`);
  let isDragging = $state(false);
  let inputElement = $state<HTMLInputElement | null>(null);

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (!disabled) {
      isDragging = true;
    }
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    
    if (disabled) return;
    
    const droppedFiles = e.dataTransfer?.files;
    if (droppedFiles) {
      processFiles(droppedFiles);
    }
  }

  function handleFileSelect(e: Event) {
    const target = e.target as HTMLInputElement;
    const selectedFiles = target.files;
    if (selectedFiles) {
      processFiles(selectedFiles);
    }
  }

  function processFiles(fileList: FileList) {
    if (maxFiles > 0 && files.length + fileList.length > maxFiles) {
      return;
    }

    const newFiles: FileInfo[] = Array.from(fileList).map(file => {
      const fileInfo: FileInfo = {
        file,
        id: Math.random().toString(36).slice(2, 9),
        progress: 0,
      };

      if (maxSize > 0 && file.size > maxSize) {
        fileInfo.error = `File too large (max ${formatFileSize(maxSize)})`;
      }

      return fileInfo;
    });

    files = [...files, ...newFiles];
    onFilesSelect?.(fileList);
  }

  function removeFile(fileToRemove: FileInfo) {
    files = files.filter(f => f.id !== fileToRemove.id);
    onFileRemove?.(fileToRemove);
  }

  function getFileIcon(type: string): string {
    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'video';
    if (type.startsWith('audio/')) return 'audio';
    if (type.includes('pdf')) return 'pdf';
    return 'file';
  }
</script>

<div class="mljr-file-upload {className}">
  <div
    class="mljr-file-upload-zone"
    class:mljr-file-upload-zone-dragging={isDragging}
    class:mljr-file-upload-zone-disabled={disabled}
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    ondrop={handleDrop}
    role="button"
    tabindex="0"
    aria-label="File upload drop zone"
  >
    <input
      id={uploadId}
      type="file"
      class="mljr-file-upload-input"
      {multiple}
      {accept}
      {disabled}
      onchange={handleFileSelect}
      bind:this={inputElement}
      {...restProps}
    />
    
    {#if children}
      {@render children()}
    {:else}
      <svg class="mljr-file-upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
      <p class="mljr-file-upload-text">{label}</p>
      {#if hint}
        <p class="mljr-file-upload-hint">{hint}</p>
      {/if}
    {/if}
  </div>

  {#if files.length > 0}
    <div class="mljr-file-list">
      {#each files as file (file.id)}
        <div class="mljr-file-item" class:mljr-file-item-error={file.error}>
          <div class="mljr-file-item-icon">
            {#if getFileIcon(file.file.type) === 'image'}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            {/if}
          </div>
          <div class="mljr-file-item-info">
            <div class="mljr-file-item-name">{file.file.name}</div>
            <div class="mljr-file-item-size">{formatFileSize(file.file.size)}</div>
            {#if file.error}
              <div class="mljr-file-item-error-text">{file.error}</div>
            {:else if file.progress < 100}
              <div class="mljr-file-item-progress">
                <div class="mljr-file-item-progress-bar" style="width: {file.progress}%"></div>
              </div>
            {/if}
          </div>
          <button
            type="button"
            class="mljr-file-item-remove"
            onclick={() => removeFile(file)}
            aria-label="Remove file"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      {/each}
    </div>
  {/if}

  {#if showPreview && files.some(f => f.file.type.startsWith('image/'))}
    <div class="mljr-file-upload-preview">
      {#each files.filter(f => f.file.type.startsWith('image/')) as file (file.id)}
        <div class="mljr-file-upload-preview-item">
          <img src={URL.createObjectURL(file.file)} alt={file.file.name} />
          <button
            type="button"
            class="mljr-file-upload-preview-remove"
            onclick={() => removeFile(file)}
            aria-label="Remove image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>
