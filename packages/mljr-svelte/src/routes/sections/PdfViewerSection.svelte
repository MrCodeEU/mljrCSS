<script lang="ts">
  import { PdfViewer } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';

  // Public domain PDF samples
  const samplePdf = 'https://www.w3.org/WAI/WCAG21/wcag21.pdf';
  const smallPdf = 'https://pdfobject.com/pdf/sample.pdf';
</script>

<div class="mljr-space-y-8">
  <!-- Basic viewer -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Basic PDF Viewer</h3>
    <PdfViewer src={smallPdf} title="Sample PDF" height="400px" />
    <CodeExample code={`<PdfViewer src="/documents/file.pdf" title="Annual Report" />`} />
  </div>

  <!-- Custom height -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Tall Viewer (600px)</h3>
    <PdfViewer src={smallPdf} title="Technical Specification" height="600px" />
    <CodeExample code={`<PdfViewer src="/docs/spec.pdf" height="600px" />`} />
  </div>

  <!-- Without toolbar -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Without Toolbar</h3>
    <PdfViewer src={smallPdf} showToolbar={false} height="300px" />
    <CodeExample code={`<PdfViewer src="/report.pdf" showToolbar={false} />`} />
  </div>

  <!-- Download only, no new tab -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Download Only (no Open button)</h3>
    <PdfViewer src={smallPdf} title="Confidential Report" allowNewTab={false} height="350px" />
    <CodeExample code={`<PdfViewer src="/report.pdf" allowNewTab={false} />`} />
  </div>

  <!-- No download, no new tab -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">View Only (no download or open)</h3>
    <PdfViewer src={smallPdf} title="View Only Document" allowDownload={false} allowNewTab={false} height="350px" />
    <CodeExample code={`<PdfViewer src="/doc.pdf" allowDownload={false} allowNewTab={false} />`} />
  </div>

  <div class="mljr-alert mljr-alert-info">
    <strong>Browser support:</strong> PDF viewing uses the browser's native PDF renderer.
    A fallback with download links is shown when inline PDF is not supported (e.g. some mobile browsers).
  </div>
</div>
