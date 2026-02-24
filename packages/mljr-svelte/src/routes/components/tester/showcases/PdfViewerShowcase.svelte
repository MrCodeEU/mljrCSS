<script lang="ts">
  import { PdfViewer } from '$lib';

  const samplePdf = 'https://www.w3.org/WAI/WCAG21/wcag21.pdf';
  const anotherPdf = 'https://www.africau.edu/images/default/sample.pdf';
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Default PDF Viewer (with toolbar)</h3>
    <p class="mljr-text-sm mljr-text-muted mljr-mb-3">
      The viewer shows a fallback placeholder if the browser does not support inline PDF rendering.
    </p>
    <PdfViewer
      src={anotherPdf}
      title="Sample PDF Document"
      height="450px"
    />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Without Toolbar</h3>
    <PdfViewer
      src={anotherPdf}
      title="No Toolbar"
      height="300px"
      showToolbar={false}
    />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Without Download / Open in Tab</h3>
    <PdfViewer
      src={anotherPdf}
      title="Restricted PDF"
      height="300px"
      allowDownload={false}
      allowNewTab={false}
    />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">WCAG 2.1 Specification (large PDF)</h3>
    <PdfViewer
      src={samplePdf}
      title="WCAG 2.1 Specification"
      height="500px"
    />
  </section>
</div>
