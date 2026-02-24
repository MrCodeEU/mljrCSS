<script lang="ts">
  import NavigationSection from '../../sections/NavigationSection.svelte';
  import NavigationRailSection from '../../sections/NavigationRailSection.svelte';
  import DockSection from '../../sections/DockSection.svelte';
  import NavbarSection from '../../sections/NavbarSection.svelte';
  import UnifiedNavSection from '../../sections/UnifiedNavSection.svelte';
  import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>Navigation - MLJR CSS</title>
</svelte:head>

<div class="docs-content">
  <div class="docs-sections">
    <section id="navigation" class="docs-section">
      <h2 class="docs-section-title">Navigation Components</h2>
      <div class="docs-section-body"><NavigationSection /></div>
    </section>

    <section id="navigation-rail" class="docs-section">
      <h2 class="docs-section-title">Navigation Rail</h2>
      <div class="docs-section-body"><NavigationRailSection /></div>
    </section>

    <section id="dock" class="docs-section">
      <h2 class="docs-section-title">Dock</h2>
      <div class="docs-section-body"><DockSection /></div>
    </section>

    <section id="navbar-section" class="docs-section">
      <h2 class="docs-section-title">{m.section_navbar()}</h2>
      <div class="docs-section-body"><NavbarSection /></div>
    </section>

    <section id="unified-nav-section" class="docs-section">
      <div class="docs-section-body"><UnifiedNavSection /></div>
    </section>
  </div>
</div>
