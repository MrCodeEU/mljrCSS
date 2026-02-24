<script lang="ts">
  import FeedbackSection from '../../sections/FeedbackSection.svelte';
  import NewComponentsSection from '../../sections/NewComponentsSection.svelte';
  import SwapSection from '../../sections/SwapSection.svelte';
  import IndicatorSection from '../../sections/IndicatorSection.svelte';
  import MaskSection from '../../sections/MaskSection.svelte';
  import EmptyStateSection from '../../sections/EmptyStateSection.svelte';
  import CarouselSection from '../../sections/CarouselSection.svelte';
  import CountdownSection from '../../sections/CountdownSection.svelte';
  import ApiDoc from '../../ApiDoc.svelte';
  import * as m from '$lib/paraglide/messages';

  const toastProps = [
    { name: 'position', type: "'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'", default: "'top-right'", description: 'Where toasts appear on screen. Synced to the global toastStore.' },
  ];

  const toastStoreApi = [
    { name: 'toastStore.show()', type: '(options: ToastOptions) => void', description: 'Displays a toast. Options: title, message, type, duration, dismissible.' },
    { name: 'toastStore.success()', type: '(message: string, title?: string) => void', description: 'Shorthand for type="success" toast.' },
    { name: 'toastStore.error()', type: '(message: string, title?: string) => void', description: 'Shorthand for type="error" toast.' },
    { name: 'toastStore.warning()', type: '(message: string, title?: string) => void', description: 'Shorthand for type="warning" toast.' },
    { name: 'toastStore.info()', type: '(message: string, title?: string) => void', description: 'Shorthand for type="info" toast.' },
  ];

  const toastExample = `<script>
  import { Toast, toastStore } from '@mljr/svelte';
<\/script>

<!-- Mount once in your layout -->
<Toast position="top-right" />

<!-- Trigger from anywhere -->
<button onclick={() => toastStore.success('Saved!', 'Success')}>
  Save
</button>
<button onclick={() => toastStore.error('Something went wrong.')}>
  Trigger Error
</button>`;
</script>

<svelte:head>
  <title>Feedback & Display - MLJR CSS</title>
</svelte:head>

<div class="docs-content">
  <div class="docs-sections">
    <section id="feedback" class="docs-section">
      <h2 class="docs-section-title">{m.section_feedback()}</h2>
      <div class="docs-section-body">
        <ApiDoc
          description="Toast notification system. Mount &lt;Toast /&gt; once in your root layout, then call toastStore methods from anywhere to display non-intrusive messages."
          props={toastProps}
          events={toastStoreApi}
          example={toastExample}
          exampleTitle="💻 Toast Usage"
        />
      </div>
      <div class="docs-section-body" style="margin-top: var(--mljr-space-6);">
        <FeedbackSection />
      </div>
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
  </div>
</div>
