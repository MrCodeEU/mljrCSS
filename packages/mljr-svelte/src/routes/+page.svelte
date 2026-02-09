<script lang="ts">
  // Import section components
  import HeroSection from './sections/HeroSection.svelte';
  import ButtonsSection from './sections/ButtonsSection.svelte';
  import FormsSection from './sections/FormsSection.svelte';
  import TextareaSection from './sections/TextareaSection.svelte';
  import RadioSection from './sections/RadioSection.svelte';
  import FileUploadSection from './sections/FileUploadSection.svelte';
  import AdvancedInputsSection from './sections/AdvancedInputsSection.svelte';
  import CarouselSection from './sections/CarouselSection.svelte';
  import NewComponentsSection from './sections/NewComponentsSection.svelte';
  import GradientsSection from './sections/GradientsSection.svelte';
  import FeedbackSection from './sections/FeedbackSection.svelte';
  import ModalSection from './sections/ModalSection.svelte';
  import DrawerSection from './sections/DrawerSection.svelte';
  import DataSection from './sections/DataSection.svelte';
  import LayoutSection from './sections/LayoutSection.svelte';
  import SidebarSection from './sections/SidebarSection.svelte';
  import BackgroundSection from './sections/BackgroundSection.svelte';
  import AdditionalComponentsSection from './sections/AdditionalComponentsSection.svelte';
  import StepperSection from './sections/StepperSection.svelte';
  import ChipSection from './sections/ChipSection.svelte';
  import EmptyStateSection from './sections/EmptyStateSection.svelte';
  import FooterSection from './sections/FooterSection.svelte';
  import NavbarSection from './sections/NavbarSection.svelte';
  import UnifiedNavSection from './sections/UnifiedNavSection.svelte';
  import NewInputsSection from './sections/NewInputsSection.svelte';
  import IconSection from './sections/IconSection.svelte';
  import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>MLJR CSS - Component Library</title>
  <meta name="description" content="A TailwindCSS-based CSS framework with Svelte 5 components featuring Claymorphism design" />
</svelte:head>

<div class="docs-content">
  <HeroSection />
  
  <div class="docs-sections">
    <!-- Form Components -->
    <section id="forms" class="docs-section">
      <h2 class="docs-section-title">{m.section_forms()}</h2>
      <FormsSection />
    </section>

    <section id="textarea" class="docs-section">
      <h2 class="docs-section-title">{m.section_textarea()}</h2>
      <TextareaSection />
    </section>

    <section id="radio" class="docs-section">
      <h2 class="docs-section-title">{m.section_radio()}</h2>
      <RadioSection />
    </section>

    <section id="file-upload" class="docs-section">
      <h2 class="docs-section-title">{m.section_file_upload()}</h2>
      <FileUploadSection />
    </section>

    <section id="advanced-inputs" class="docs-section">
      <h2 class="docs-section-title">{m.section_advanced_inputs()}</h2>
      <AdvancedInputsSection />
    </section>

    <!-- Buttons -->
    <section id="buttons" class="docs-section">
      <h2 class="docs-section-title">{m.section_buttons()}</h2>
      <ButtonsSection />
    </section>

    <!-- Chips & Tags -->
    <section id="chip" class="docs-section">
      <h2 class="docs-section-title">{m.section_chips()}</h2>
      <ChipSection />
    </section>

    <!-- Data Display -->
    <section id="data" class="docs-section">
      <h2 class="docs-section-title">{m.section_data_display()}</h2>
      <DataSection />
    </section>

    <!-- Display Components -->
    <section id="display-components" class="docs-section">
      <h2 class="docs-section-title">{m.section_display_feedback()}</h2>
      <NewComponentsSection />
    </section>

    <!-- Empty State -->
    <section id="empty-state" class="docs-section">
      <h2 class="docs-section-title">{m.section_empty_state()}</h2>
      <EmptyStateSection />
    </section>

    <!-- Carousel -->
    <section id="carousel" class="docs-section">
      <h2 class="docs-section-title">{m.section_carousel()}</h2>
      <CarouselSection />
    </section>

    <!-- Stepper -->
    <section id="stepper" class="docs-section">
      <h2 class="docs-section-title">{m.section_stepper()}</h2>
      <StepperSection />
    </section>

    <!-- Feedback -->
    <section id="feedback" class="docs-section">
      <h2 class="docs-section-title">{m.section_feedback()}</h2>
      <FeedbackSection />
    </section>

    <!-- Modals & Overlays -->
    <section id="modal" class="docs-section">
      <h2 class="docs-section-title">{m.section_modal()}</h2>
      <ModalSection />
    </section>

    <section id="drawer" class="docs-section">
      <h2 class="docs-section-title">{m.section_drawer()}</h2>
      <DrawerSection />
    </section>

    <!-- Background -->
    <section id="background-section" class="docs-section">
      <h2 class="docs-section-title">{m.section_background()}</h2>
      <BackgroundSection />
    </section>

    <!-- Navigation -->
    <section id="unified-nav-section" class="docs-section">
      <UnifiedNavSection />
    </section>
    
    <section id="navbar-section" class="docs-section">
      <h2 class="docs-section-title">{m.section_navbar()}</h2>
      <NavbarSection />
    </section>

    <!-- Layout -->
    <section id="layout" class="docs-section">
      <h2 class="docs-section-title">{m.section_layout()}</h2>
      <LayoutSection />
    </section>

    <!-- Sidebar -->
    <section id="sidebar-section" class="docs-section">
      <h2 class="docs-section-title">{m.section_sidebar()}</h2>
      <SidebarSection />
    </section>

    <!-- New Input Components -->
    <section id="new-inputs" class="docs-section">
      <h2 class="docs-section-title">{m.section_new_inputs()}</h2>
      <NewInputsSection />
    </section>

    <!-- Icons -->
    <section id="icons" class="docs-section">
      <h2 class="docs-section-title">{m.section_icons()}</h2>
      <IconSection />
    </section>

    <!-- Gradients -->
    <section id="gradients" class="docs-section">
      <h2 class="docs-section-title">{m.section_gradients()}</h2>
      <GradientsSection />
    </section>

    <!-- Footer -->
    <section id="footer-section" class="docs-section">
      <h2 class="docs-section-title">{m.section_footer()}</h2>
      <FooterSection />
    </section>

    <!-- Additional -->
    <section id="additional-components" class="docs-section">
      <h2 class="docs-section-title">{m.section_additional()}</h2>
      <AdditionalComponentsSection />
    </section>
  </div>
</div>

<style>
  .docs-content {
    max-width: 100%;
  }

  .docs-sections {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-12);
    margin-top: var(--mljr-space-8);
  }

  .docs-section {
    scroll-margin-top: 2rem;
  }

  .docs-section-title {
    font-size: var(--mljr-text-3xl);
    font-weight: 700;
    color: var(--mljr-text);
    margin-bottom: var(--mljr-space-6);
    padding-bottom: var(--mljr-space-3);
    border-bottom: 2px solid var(--mljr-border);
  }

  @media (max-width: 768px) {
    .docs-section-title {
      font-size: var(--mljr-text-2xl);
    }
  }
</style>
