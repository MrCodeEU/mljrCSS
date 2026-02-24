<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    /** URL to the PDF file */
    src: string;
    /** Display title in the toolbar */
    title?: string;
    /** Viewer height */
    height?: string;
    /** Show the toolbar */
    showToolbar?: boolean;
    /** Show a download button */
    allowDownload?: boolean;
    /** Show an open-in-new-tab button */
    allowNewTab?: boolean;
    /** Additional CSS class */
    class?: string;
  }

  let {
    src,
    title = '',
    height = '500px',
    showToolbar = true,
    allowDownload = true,
    allowNewTab = true,
    class: className = '',
  }: Props = $props();

  let supported = $state(false);
  let loading = $state(true);

  // Detect if the browser can display PDFs natively via embed
  onMount(() => {
    supported = navigator.pdfViewerEnabled ?? false;
    // Small delay so loading state shows
    setTimeout(() => { loading = false; }, 600);
  });

  const displayTitle = $derived(title || src.split('/').pop()?.replace(/\.pdf$/i, '') || 'Document');
</script>

<div class="mljr-pdf {className}" style="height: {height};">
  {#if showToolbar}
    <div class="mljr-pdf-toolbar">
      <span class="mljr-pdf-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/>
          <line x1="9" y1="9" x2="11" y2="9"/>
        </svg>
        {displayTitle}
      </span>
      <div class="mljr-pdf-actions">
        {#if allowNewTab}
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            class="mljr-pdf-action-btn"
            title="Open in new tab"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Open
          </a>
        {/if}
        {#if allowDownload}
          <a
            href={src}
            download
            class="mljr-pdf-action-btn"
            title="Download PDF"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </a>
        {/if}
      </div>
    </div>
  {/if}

  <div class="mljr-pdf-viewer" style="height: calc(100% - {showToolbar ? '2.75rem' : '0px'});">
    {#if loading}
      <div class="mljr-pdf-loading">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
        <span>Loading PDF…</span>
      </div>
    {:else if supported}
      <iframe
        src="{src}#toolbar=0&navpanes=0"
        title={displayTitle}
        loading="lazy"
        aria-label="PDF viewer: {displayTitle}"
      ></iframe>
    {:else}
      <!-- Fallback: browser doesn't support inline PDF -->
      <div class="mljr-pdf-placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/>
        </svg>
        <span class="mljr-pdf-placeholder-title">{displayTitle}</span>
        <span class="mljr-pdf-placeholder-hint">
          Your browser does not support inline PDF viewing. Click below to open or download the document.
        </span>
        <div style="display: flex; gap: 0.75rem;">
          {#if allowNewTab}
            <a href={src} target="_blank" rel="noopener noreferrer" class="mljr-pdf-download-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Open PDF
            </a>
          {/if}
          {#if allowDownload}
            <a href={src} download class="mljr-pdf-download-link" style="background: var(--mljr-secondary-500); color: white;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download
            </a>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>
