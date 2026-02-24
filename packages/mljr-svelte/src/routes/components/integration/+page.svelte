<script lang="ts">
  import RichTextEditorSection from '../../sections/RichTextEditorSection.svelte';
  import MapEmbedSection from '../../sections/MapEmbedSection.svelte';
  import PdfViewerSection from '../../sections/PdfViewerSection.svelte';
  import TurnstileSection from '../../sections/TurnstileSection.svelte';
  import CookieBannerSection from '../../sections/CookieBannerSection.svelte';
  import LegalPagesSection from '../../sections/LegalPagesSection.svelte';
</script>

<svelte:head>
  <title>Integration & Legal - MLJR CSS</title>
</svelte:head>

<div class="docs-content">
  <div class="docs-sections">
    <section id="rich-text-editor" class="docs-section">
      <h2 class="docs-section-title">Rich Text Editor</h2>
      <div class="docs-section-body"><RichTextEditorSection /></div>
    </section>

    <section id="map-embed" class="docs-section">
      <h2 class="docs-section-title">Map Embed</h2>
      <div class="docs-section-body"><MapEmbedSection /></div>
    </section>

    <section id="pdf-viewer" class="docs-section">
      <h2 class="docs-section-title">PDF Viewer</h2>
      <div class="docs-section-body"><PdfViewerSection /></div>
    </section>

    <section id="turnstile" class="docs-section">
      <h2 class="docs-section-title">Turnstile (CAPTCHA)</h2>
      <div class="docs-section-body"><TurnstileSection /></div>
    </section>

    <section id="cookie-banner" class="docs-section">
      <h2 class="docs-section-title">Cookie Banner (GDPR)</h2>
      <div class="docs-section-body"><CookieBannerSection /></div>
    </section>

    <section id="legal-pages" class="docs-section">
      <h2 class="docs-section-title">Legal Pages (Impressum, Datenschutz, About)</h2>
      <div class="docs-section-body"><LegalPagesSection /></div>
    </section>
  </div>
</div>
