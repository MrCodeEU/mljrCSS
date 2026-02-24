<script lang="ts">
  import { Tabs } from '$lib';
  import HeroSection from './sections/HeroSection.svelte';

  // Forms
  import FormsSection from './sections/FormsSection.svelte';
  import TextareaSection from './sections/TextareaSection.svelte';
  import RadioSection from './sections/RadioSection.svelte';
  import CheckboxGroupSection from './sections/CheckboxGroupSection.svelte';
  import RadioGroupSection from './sections/RadioGroupSection.svelte';
  import FileUploadSection from './sections/FileUploadSection.svelte';
  import AdvancedInputsSection from './sections/AdvancedInputsSection.svelte';
  import TimePickerSection from './sections/TimePickerSection.svelte';
  import PinInputSection from './sections/PinInputSection.svelte';
  import NewInputsSection from './sections/NewInputsSection.svelte';
  import ChipInputSection from './sections/ChipInputSection.svelte';
  import AutoCompleteSection from './sections/AutoCompleteSection.svelte';
  import SelectMenuSection from './sections/SelectMenuSection.svelte';
  import NumberInputSection from './sections/NumberInputSection.svelte';

  // Buttons
  import ButtonsSection from './sections/ButtonsSection.svelte';
  import ChipSection from './sections/ChipSection.svelte';
  import CopyButtonSection from './sections/CopyButtonSection.svelte';

  // Data
  import DataSection from './sections/DataSection.svelte';
  import TreeViewSection from './sections/TreeViewSection.svelte';
  import StepperSection from './sections/StepperSection.svelte';
  import DataGraphsSection from './sections/DataGraphsSection.svelte';
  import CalendarSection from './sections/CalendarSection.svelte';

  // Feedback
  import FeedbackSection from './sections/FeedbackSection.svelte';
  import NewComponentsSection from './sections/NewComponentsSection.svelte';
  import SwapSection from './sections/SwapSection.svelte';
  import IndicatorSection from './sections/IndicatorSection.svelte';
  import MaskSection from './sections/MaskSection.svelte';
  import EmptyStateSection from './sections/EmptyStateSection.svelte';
  import CarouselSection from './sections/CarouselSection.svelte';
  import CountdownSection from './sections/CountdownSection.svelte';

  // Overlays
  import ModalSection from './sections/ModalSection.svelte';
  import DrawerSection from './sections/DrawerSection.svelte';
  import AdditionalComponentsSection from './sections/AdditionalComponentsSection.svelte';

  // Navigation
  import NavigationSection from './sections/NavigationSection.svelte';
  import NavigationRailSection from './sections/NavigationRailSection.svelte';
  import DockSection from './sections/DockSection.svelte';
  import NavbarSection from './sections/NavbarSection.svelte';
  import UnifiedNavSection from './sections/UnifiedNavSection.svelte';

  // Layout
  import LayoutSection from './sections/LayoutSection.svelte';
  import HeroComponentSection from './sections/HeroComponentSection.svelte';
  import SidebarSection from './sections/SidebarSection.svelte';
  import BackgroundSection from './sections/BackgroundSection.svelte';
  import GradientsSection from './sections/GradientsSection.svelte';
  import FooterSection from './sections/FooterSection.svelte';

  // Media
  import MarqueeSection from './sections/MarqueeSection.svelte';
  import ImageCompareSection from './sections/ImageCompareSection.svelte';
  import AudioVisualizerSection from './sections/AudioVisualizerSection.svelte';
  import VideoPlayerSection from './sections/VideoPlayerSection.svelte';
  import DropZoneSection from './sections/DropZoneSection.svelte';
  import ScrollRevealSection from './sections/ScrollRevealSection.svelte';
  import LazyLoadSection from './sections/LazyLoadSection.svelte';
  import VirtualListSection from './sections/VirtualListSection.svelte';

  // Text & Content
  import AnimatedHeadlineSection from './sections/AnimatedHeadlineSection.svelte';
  import TableOfContentSection from './sections/TableOfContentSection.svelte';
  import DiffViewerSection from './sections/DiffViewerSection.svelte';
  import IconSection from './sections/IconSection.svelte';

  // Integration
  import RichTextEditorSection from './sections/RichTextEditorSection.svelte';
  import MapEmbedSection from './sections/MapEmbedSection.svelte';
  import PdfViewerSection from './sections/PdfViewerSection.svelte';
  import TurnstileSection from './sections/TurnstileSection.svelte';
  import CookieBannerSection from './sections/CookieBannerSection.svelte';
  import LegalPagesSection from './sections/LegalPagesSection.svelte';

  import * as m from '$lib/paraglide/messages';

  const categoryTabs = [
    { id: 'forms',       label: 'Forms' },
    { id: 'buttons',     label: 'Buttons & Chips' },
    { id: 'data',        label: 'Data Display' },
    { id: 'feedback',    label: 'Feedback' },
    { id: 'overlays',    label: 'Overlays' },
    { id: 'navigation',  label: 'Navigation' },
    { id: 'layout',      label: 'Layout' },
    { id: 'media',       label: 'Media' },
    { id: 'text',        label: 'Text & Content' },
    { id: 'integration', label: 'Integration' },
  ];

  let activeCategory = $state('forms');
</script>

<svelte:head>
  <title>MLJR CSS - Component Library</title>
  <meta name="description" content="A TailwindCSS-based CSS framework with Svelte 5 components featuring Claymorphism design" />
</svelte:head>

<HeroSection />

<div class="component-browser">
  <Tabs tabs={categoryTabs} bind:activeTab={activeCategory} variant="pills" scrollable />

  <div class="docs-sections">
    {#if activeCategory === 'forms'}
      <section id="forms" class="docs-section">
        <h2 class="docs-section-title">{m.section_forms()}</h2>
        <div class="docs-section-body"><FormsSection /></div>
      </section>
      <section id="textarea" class="docs-section">
        <h2 class="docs-section-title">{m.section_textarea()}</h2>
        <div class="docs-section-body"><TextareaSection /></div>
      </section>
      <section id="radio" class="docs-section">
        <h2 class="docs-section-title">{m.section_radio()}</h2>
        <div class="docs-section-body"><RadioSection /></div>
      </section>
      <section id="checkbox-group" class="docs-section">
        <h2 class="docs-section-title">Checkbox Group</h2>
        <div class="docs-section-body"><CheckboxGroupSection /></div>
      </section>
      <section id="radio-group" class="docs-section">
        <h2 class="docs-section-title">Radio Group</h2>
        <div class="docs-section-body"><RadioGroupSection /></div>
      </section>
      <section id="file-upload" class="docs-section">
        <h2 class="docs-section-title">{m.section_file_upload()}</h2>
        <div class="docs-section-body"><FileUploadSection /></div>
      </section>
      <section id="advanced-inputs" class="docs-section">
        <h2 class="docs-section-title">{m.section_advanced_inputs()}</h2>
        <div class="docs-section-body"><AdvancedInputsSection /></div>
      </section>
      <section id="time-picker" class="docs-section">
        <h2 class="docs-section-title">Time Picker</h2>
        <div class="docs-section-body"><TimePickerSection /></div>
      </section>
      <section id="pin-input" class="docs-section">
        <h2 class="docs-section-title">PIN Input</h2>
        <div class="docs-section-body"><PinInputSection /></div>
      </section>
      <section id="new-inputs" class="docs-section">
        <h2 class="docs-section-title">{m.section_new_inputs()}</h2>
        <div class="docs-section-body"><NewInputsSection /></div>
      </section>
      <section id="chip-input" class="docs-section">
        <h2 class="docs-section-title">Chip Input (Tag Input)</h2>
        <div class="docs-section-body"><ChipInputSection /></div>
      </section>
      <section id="autocomplete" class="docs-section">
        <h2 class="docs-section-title">AutoComplete</h2>
        <div class="docs-section-body"><AutoCompleteSection /></div>
      </section>
      <section id="select-menu" class="docs-section">
        <h2 class="docs-section-title">SelectMenu</h2>
        <div class="docs-section-body"><SelectMenuSection /></div>
      </section>
      <section id="number-input" class="docs-section">
        <h2 class="docs-section-title">Number Input &amp; Time Range</h2>
        <div class="docs-section-body"><NumberInputSection /></div>
      </section>

    {:else if activeCategory === 'buttons'}
      <section id="buttons" class="docs-section">
        <h2 class="docs-section-title">{m.section_buttons()}</h2>
        <div class="docs-section-body"><ButtonsSection /></div>
      </section>
      <section id="chip" class="docs-section">
        <h2 class="docs-section-title">{m.section_chips()}</h2>
        <div class="docs-section-body"><ChipSection /></div>
      </section>
      <section id="copy-button" class="docs-section">
        <h2 class="docs-section-title">Copy Button</h2>
        <div class="docs-section-body"><CopyButtonSection /></div>
      </section>

    {:else if activeCategory === 'data'}
      <section id="data" class="docs-section">
        <h2 class="docs-section-title">{m.section_data_display()}</h2>
        <div class="docs-section-body"><DataSection /></div>
      </section>
      <section id="tree-view" class="docs-section">
        <h2 class="docs-section-title">Tree View</h2>
        <div class="docs-section-body"><TreeViewSection /></div>
      </section>
      <section id="stepper" class="docs-section">
        <h2 class="docs-section-title">{m.section_stepper()}</h2>
        <div class="docs-section-body"><StepperSection /></div>
      </section>
      <section id="data-graphs" class="docs-section">
        <h2 class="docs-section-title">Data Graphs</h2>
        <div class="docs-section-body"><DataGraphsSection /></div>
      </section>
      <section id="calendar" class="docs-section">
        <h2 class="docs-section-title">Calendar</h2>
        <div class="docs-section-body"><CalendarSection /></div>
      </section>

    {:else if activeCategory === 'feedback'}
      <section id="feedback" class="docs-section">
        <h2 class="docs-section-title">{m.section_feedback()}</h2>
        <div class="docs-section-body"><FeedbackSection /></div>
      </section>
      <section id="display-components" class="docs-section">
        <h2 class="docs-section-title">{m.section_display_feedback()}</h2>
        <div class="docs-section-body"><NewComponentsSection /></div>
      </section>
      <section id="swap" class="docs-section">
        <h2 class="docs-section-title">Swap</h2>
        <div class="docs-section-body"><SwapSection /></div>
      </section>
      <section id="indicator" class="docs-section">
        <h2 class="docs-section-title">Indicator</h2>
        <div class="docs-section-body"><IndicatorSection /></div>
      </section>
      <section id="mask" class="docs-section">
        <h2 class="docs-section-title">Mask</h2>
        <div class="docs-section-body"><MaskSection /></div>
      </section>
      <section id="empty-state" class="docs-section">
        <h2 class="docs-section-title">{m.section_empty_state()}</h2>
        <div class="docs-section-body"><EmptyStateSection /></div>
      </section>
      <section id="carousel" class="docs-section">
        <h2 class="docs-section-title">{m.section_carousel()}</h2>
        <div class="docs-section-body"><CarouselSection /></div>
      </section>
      <section id="countdown" class="docs-section">
        <h2 class="docs-section-title">Countdown Timer</h2>
        <div class="docs-section-body"><CountdownSection /></div>
      </section>

    {:else if activeCategory === 'overlays'}
      <section id="modal" class="docs-section">
        <h2 class="docs-section-title">{m.section_modal()}</h2>
        <div class="docs-section-body"><ModalSection /></div>
      </section>
      <section id="drawer" class="docs-section">
        <h2 class="docs-section-title">{m.section_drawer()}</h2>
        <div class="docs-section-body"><DrawerSection /></div>
      </section>
      <section id="additional-components" class="docs-section">
        <h2 class="docs-section-title">{m.section_additional()}</h2>
        <div class="docs-section-body"><AdditionalComponentsSection /></div>
      </section>

    {:else if activeCategory === 'navigation'}
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

    {:else if activeCategory === 'layout'}
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

    {:else if activeCategory === 'media'}
      <section id="marquee" class="docs-section">
        <h2 class="docs-section-title">Marquee</h2>
        <div class="docs-section-body"><MarqueeSection /></div>
      </section>
      <section id="image-compare" class="docs-section">
        <h2 class="docs-section-title">Image Compare</h2>
        <div class="docs-section-body"><ImageCompareSection /></div>
      </section>
      <section id="audio-visualizer" class="docs-section">
        <h2 class="docs-section-title">Audio Visualizer</h2>
        <div class="docs-section-body"><AudioVisualizerSection /></div>
      </section>
      <section id="video-player" class="docs-section">
        <h2 class="docs-section-title">Video Player</h2>
        <div class="docs-section-body"><VideoPlayerSection /></div>
      </section>
      <section id="drop-zone" class="docs-section">
        <h2 class="docs-section-title">Drop Zone (Advanced File Upload)</h2>
        <div class="docs-section-body"><DropZoneSection /></div>
      </section>
      <section id="scroll-reveal" class="docs-section">
        <h2 class="docs-section-title">Scroll Reveal (InView)</h2>
        <div class="docs-section-body"><ScrollRevealSection /></div>
      </section>
      <section id="lazy-load" class="docs-section">
        <h2 class="docs-section-title">Lazy Loading</h2>
        <div class="docs-section-body"><LazyLoadSection /></div>
      </section>
      <section id="virtual-list" class="docs-section">
        <h2 class="docs-section-title">VirtualList &amp; Resizable</h2>
        <div class="docs-section-body"><VirtualListSection /></div>
      </section>

    {:else if activeCategory === 'text'}
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

    {:else if activeCategory === 'integration'}
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
    {/if}
  </div>
</div>

<style>
  .component-browser {
    margin-top: var(--mljr-space-12);
  }

  .docs-sections {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-8);
    margin-top: var(--mljr-space-8);
  }
</style>
