<script lang="ts">
  import LayoutSection from '../../sections/LayoutSection.svelte';
  import HeroComponentSection from '../../sections/HeroComponentSection.svelte';
  import SidebarSection from '../../sections/SidebarSection.svelte';
  import BackgroundSection from '../../sections/BackgroundSection.svelte';
  import GradientsSection from '../../sections/GradientsSection.svelte';
  import FooterSection from '../../sections/FooterSection.svelte';
  import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>Layout - MLJR CSS</title>
</svelte:head>

<div class="docs-content">
  <div class="docs-sections">
    <section id="layout" class="docs-section">
      <h2 class="docs-section-title">{m.section_layout()}</h2>
      <div class="docs-section-body"><LayoutSection /></div>
    </section>

    <section id="hero" class="docs-section">
      <h2 class="docs-section-title">Hero Section</h2>
      <div class="docs-section-body"><HeroComponentSection /></div>
    </section>

    <section id="sidebar-section" class="docs-section">
      <h2 class="docs-section-title">{m.section_sidebar()}</h2>
      <div class="docs-section-body"><SidebarSection /></div>
    </section>

    <section id="background-section" class="docs-section">
      <h2 class="docs-section-title">{m.section_background()}</h2>
      <div class="docs-section-body"><BackgroundSection /></div>
    </section>

    <section id="gradients" class="docs-section">
      <h2 class="docs-section-title">{m.section_gradients()}</h2>
      <div class="docs-section-body"><GradientsSection /></div>
    </section>

    <section id="footer-section" class="docs-section">
      <h2 class="docs-section-title">{m.section_footer()}</h2>
      <div class="docs-section-body"><FooterSection /></div>
    </section>
  </div>
</div>
