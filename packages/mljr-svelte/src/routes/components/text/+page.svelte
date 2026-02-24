<script lang="ts">
  import AnimatedHeadlineSection from '../../sections/AnimatedHeadlineSection.svelte';
  import TableOfContentSection from '../../sections/TableOfContentSection.svelte';
  import DiffViewerSection from '../../sections/DiffViewerSection.svelte';
  import IconSection from '../../sections/IconSection.svelte';
  import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>Text & Content - MLJR CSS</title>
</svelte:head>

<div class="docs-content">
  <div class="docs-sections">
    <section id="icons" class="docs-section">
      <h2 class="docs-section-title">{m.section_icons()}</h2>
      <div class="docs-section-body"><IconSection /></div>
    </section>

    <section id="animated-headline" class="docs-section">
      <h2 class="docs-section-title">Animated Headline</h2>
      <div class="docs-section-body"><AnimatedHeadlineSection /></div>
    </section>

    <section id="table-of-content" class="docs-section">
      <h2 class="docs-section-title">Table of Content</h2>
      <div class="docs-section-body"><TableOfContentSection /></div>
    </section>

    <section id="diff-viewer" class="docs-section">
      <h2 class="docs-section-title">Diff Viewer</h2>
      <div class="docs-section-body"><DiffViewerSection /></div>
    </section>
  </div>
</div>
