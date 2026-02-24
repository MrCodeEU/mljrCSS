<script lang="ts">
  import { Card, Chip, CodeExample } from '$lib';

  let chips = $state([
    { id: 1, label: 'Svelte', variant: 'primary' },
    { id: 2, label: 'TypeScript', variant: 'secondary' },
    { id: 3, label: 'CSS', variant: 'accent' },
    { id: 4, label: 'Tailwind', variant: 'default' },
  ]);

  function removeChip(id: number) {
    chips = chips.filter(c => c.id !== id);
  }
</script>

<section id="chips" class="mljr-mb-8">
  <h2 class="mljr-h2 mljr-mb-4">Chips</h2>
  <p class="mljr-text-secondary mljr-mb-6">Compact labels, tags, and removable items.</p>

  <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6">
    <Card title="Basic Chips" description="Simple label chips">
      <div class="mljr-chip-group">
        <Chip>Default</Chip>
        <Chip variant="primary">Primary</Chip>
        <Chip variant="secondary">Secondary</Chip>
        <Chip variant="accent">Accent</Chip>
      </div>
    </Card>

    <Card title="Status Chips" description="Semantic color variants">
      <div class="mljr-chip-group">
        <Chip variant="success">Success</Chip>
        <Chip variant="warning">Warning</Chip>
        <Chip variant="error">Error</Chip>
        <Chip variant="outline">Outline</Chip>
      </div>
    </Card>

    <Card title="Chip Sizes" description="Different size options">
      <div class="mljr-flex mljr-flex-col mljr-gap-4">
        <div class="mljr-chip-group">
          <Chip size="sm">Small</Chip>
          <Chip size="sm" variant="primary">Small Primary</Chip>
        </div>
        <div class="mljr-chip-group">
          <Chip>Medium</Chip>
          <Chip variant="primary">Medium Primary</Chip>
        </div>
        <div class="mljr-chip-group">
          <Chip size="lg">Large</Chip>
          <Chip size="lg" variant="primary">Large Primary</Chip>
        </div>
      </div>
    </Card>

    <Card title="Chips with Icons" description="Chips with Iconify icons">
      <div class="mljr-chip-group mljr-mb-4">
        <Chip variant="primary" icon="mdi:language-javascript">JavaScript</Chip>
        <Chip variant="secondary" icon="mdi:language-typescript">TypeScript</Chip>
        <Chip variant="accent" icon="mdi:language-css3">CSS</Chip>
        <Chip variant="success" icon="mdi:check">Approved</Chip>
      </div>
      <div class="mljr-chip-group">
        <Chip variant="error" icon="mdi:close-circle" iconPosition="right">Rejected</Chip>
        <Chip variant="warning" icon="mdi:alert" iconPosition="right">Review</Chip>
      </div>
    </Card>

    <Card title="Removable Chips" description="Chips with remove button">
      <div class="mljr-chip-group">
        {#each chips as chip (chip.id)}
          <Chip 
            variant={chip.variant as any} 
            removable 
            onRemove={() => removeChip(chip.id)}
          >
            {chip.label}
          </Chip>
        {/each}
      </div>
      {#if chips.length === 0}
        <p class="mljr-text-sm mljr-text-muted mljr-mt-4">All chips removed!</p>
      {/if}
    </Card>
  </div>

  <CodeExample code={`// Component usage
<div class="mljr-chip-group">
  <Chip>Default</Chip>
  <Chip variant="primary">Primary</Chip>
  <Chip variant="secondary">Secondary</Chip>
  <Chip variant="accent">Accent</Chip>
</div>

<div class="mljr-chip-group">
  <Chip variant="success">Success</Chip>
  <Chip variant="warning">Warning</Chip>
  <Chip variant="error">Error</Chip>
  <Chip variant="outline">Outline</Chip>
</div>

<Chip size="sm">Small</Chip>
<Chip>Medium</Chip>
<Chip size="lg">Large</Chip>

<!-- With icons -->
<Chip variant="primary" icon="mdi:language-javascript">JavaScript</Chip>
<Chip variant="error" icon="mdi:close-circle" iconPosition="right">Rejected</Chip>

{#each chips as chip (chip.id)}
  <Chip
    variant={chip.variant}
    removable
    onRemove={() => removeChip(chip.id)}
  >
    {chip.label}
  </Chip>
{/each}`} />
</section>
