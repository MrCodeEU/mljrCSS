<script lang="ts">
  import ButtonsSection from '../../sections/ButtonsSection.svelte';
  import ChipSection from '../../sections/ChipSection.svelte';
  import CopyButtonSection from '../../sections/CopyButtonSection.svelte';
  import ApiDoc from '../../ApiDoc.svelte';
  import * as m from '$lib/paraglide/messages';

  const buttonProps = [
    { name: 'variant', type: "'default' | 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary' | 'ghost' | 'link' | 'danger' | 'success'", default: "'default'", description: 'Visual style of the button.' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size of the button.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a loading spinner and disables the button.' },
    { name: 'block', type: 'boolean', default: 'false', description: 'Makes the button full width.' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Alias for block.' },
    { name: 'icon', type: 'boolean', default: 'false', description: 'Square icon-only button (equal padding on all sides).' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes.' },
    { name: '...restProps', type: 'HTMLButtonAttributes', default: '—', description: 'All standard HTML button attributes (type, onclick, aria-*, etc.).' },
  ];

  const buttonSlots = [
    { name: 'children', description: 'Button label and/or icon content.' },
  ];

  const buttonExample = `<script>
  import { Button } from '@mljr/svelte';
<\/script>

<!-- Variants -->
<Button variant="primary">Primary</Button>
<Button variant="danger">Delete</Button>
<Button variant="outline-secondary">Cancel</Button>

<!-- Sizes -->
<Button variant="primary" size="lg">Large</Button>
<Button variant="primary" size="sm">Small</Button>

<!-- States -->
<Button variant="primary" loading>Saving…</Button>
<Button variant="primary" disabled>Disabled</Button>

<!-- Full width -->
<Button variant="primary" block>Submit form</Button>`;

  const chipProps = [
    { name: 'label', type: 'string', default: "''", description: 'Text label displayed in the chip.' },
    { name: 'variant', type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'", default: "'default'", description: 'Color variant.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the chip.' },
    { name: 'removable', type: 'boolean', default: 'false', description: 'Shows a close button to remove the chip.' },
    { name: 'selected', type: 'boolean', default: 'false', description: 'Toggles selected/active visual state.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
  ];

  const chipEvents = [
    { name: 'onremove', type: '() => void', description: 'Fired when the close button is clicked (requires removable=true).' },
    { name: 'onclick', type: '() => void', description: 'Fired when the chip is clicked.' },
  ];
</script>

<svelte:head>
  <title>Buttons & Chips - MLJR CSS</title>
</svelte:head>

<div class="docs-content">
  <div class="docs-sections">
    <section id="buttons" class="docs-section">
      <h2 class="docs-section-title">{m.section_buttons()}</h2>
      <div class="docs-section-body">
        <ApiDoc
          description="A clay-morphism styled button with 9 variants, 5 sizes, and built-in loading/disabled states. Extends all standard HTML button attributes."
          props={buttonProps}
          slots={buttonSlots}
          example={buttonExample}
        />
      </div>
      <div class="docs-section-body" style="margin-top: var(--mljr-space-6);">
        <ButtonsSection />
      </div>
    </section>

    <section id="chip" class="docs-section">
      <h2 class="docs-section-title">{m.section_chips()}</h2>
      <div class="docs-section-body">
        <ApiDoc
          description="Compact tag/chip component for displaying categories, filters, or selections. Supports removable and selectable interaction modes."
          props={chipProps}
          events={chipEvents}
          exampleTitle="💻 Chip Usage"
          example={`<script>
  import { Chip } from '@mljr/svelte';
<\/script>

<Chip label="Design" variant="primary" />
<Chip label="Remove me" removable onremove={() => console.log('removed')} />
<Chip label="Active" selected />
<Chip label="React" variant="secondary" size="sm" />`}
        />
      </div>
      <div class="docs-section-body" style="margin-top: var(--mljr-space-6);">
        <ChipSection />
      </div>
    </section>

    <section id="copy-button" class="docs-section">
      <h2 class="docs-section-title">Copy Button</h2>
      <div class="docs-section-body"><CopyButtonSection /></div>
    </section>
  </div>
</div>
