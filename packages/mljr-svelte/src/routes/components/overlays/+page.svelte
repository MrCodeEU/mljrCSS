<script lang="ts">
  import ModalSection from '../../sections/ModalSection.svelte';
  import DrawerSection from '../../sections/DrawerSection.svelte';
  import AdditionalComponentsSection from '../../sections/AdditionalComponentsSection.svelte';
  import ApiDoc from '../../ApiDoc.svelte';
  import * as m from '$lib/paraglide/messages';

  const modalProps = [
    { name: 'open', type: 'boolean', default: 'false', description: 'Bindable open state. Set to true to show the modal.' },
    { name: 'title', type: 'string', default: "''", description: 'Modal title shown in the header.' },
    { name: 'description', type: 'string', default: "''", description: 'Subtitle shown below the title.' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: 'Width of the modal dialog.' },
    { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Close when clicking the backdrop.' },
    { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Close when pressing Escape.' },
    { name: 'showClose', type: 'boolean', default: 'true', description: 'Show the × close button in the header.' },
    { name: 'trapFocus', type: 'boolean', default: 'true', description: 'Keep keyboard focus within the modal while open.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes on the modal element.' },
  ];

  const modalEvents = [
    { name: 'onclose', type: '() => void', description: 'Fired when the modal closes (via X button, backdrop click, or Escape).' },
  ];

  const modalSlots = [
    { name: 'header', description: 'Custom header content (replaces title/description/close button).' },
    { name: 'children', description: 'Main modal body content.' },
    { name: 'footer', description: 'Footer content (typically action buttons).' },
  ];

  const modalExample = `<script>
  import { Modal, Button } from '@mljr/svelte';
  let open = $state(false);
<\/script>

<Button variant="primary" onclick={() => open = true}>Open Modal</Button>

<Modal bind:open title="Confirm action" size="md" onclose={() => console.log('closed')}>
  <p>Are you sure you want to continue?</p>

  {#snippet footer()}
    <Button variant="outline-secondary" onclick={() => open = false}>Cancel</Button>
    <Button variant="primary" onclick={() => open = false}>Confirm</Button>
  {/snippet}
</Modal>`;
</script>

<svelte:head>
  <title>Overlays - MLJR CSS</title>
</svelte:head>

<div class="docs-content">
  <div class="docs-sections">
    <section id="modal" class="docs-section">
      <h2 class="docs-section-title">{m.section_modal()}</h2>
      <div class="docs-section-body">
        <ApiDoc
          description="An accessible modal dialog with focus trap, Escape key, backdrop click, nested modal stack support, and portal rendering. Fully customizable via header/footer snippets."
          props={modalProps}
          events={modalEvents}
          slots={modalSlots}
          example={modalExample}
          exampleTitle="💻 Modal Usage"
        />
      </div>
      <div class="docs-section-body" style="margin-top: var(--mljr-space-6);">
        <ModalSection />
      </div>
    </section>

    <section id="drawer" class="docs-section">
      <h2 class="docs-section-title">{m.section_drawer()}</h2>
      <div class="docs-section-body"><DrawerSection /></div>
    </section>

    <section id="additional-components" class="docs-section">
      <h2 class="docs-section-title">{m.section_additional()}</h2>
      <div class="docs-section-body"><AdditionalComponentsSection /></div>
    </section>
  </div>
</div>
