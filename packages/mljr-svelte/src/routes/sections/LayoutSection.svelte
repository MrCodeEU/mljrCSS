<script lang="ts">
  import { Card, Button, ThemeToggle, LanguageToggle, CodeExample } from '$lib';
</script>

<section id="layout" class="mljr-mb-8">
  <Card title="Cards" description="Card component examples">
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-lg:grid-cols-3 mljr-gap-6">
      <Card title="Default Card" description="A simple card with header">
        <p>This is a basic card component with a title and description.</p>
      </Card>

      <Card title="Primary Card" variant="primary" shadow>
        <p>A card with primary accent border and gradient background.</p>
      </Card>

      <Card title="Secondary Card" variant="secondary" shadow="lg">
        <p>A card with secondary (purple) variant using watered-down solid colors.</p>
      </Card>

      <Card title="Accent Card" variant="accent" shadow>
        <p>A card with accent (teal) variant and subtle gradient.</p>
      </Card>

      <Card title="Success Card" variant="success" shadow>
        <p>A card with success (green) variant for positive actions.</p>
      </Card>

      <Card title="Warning Card" variant="warning" shadow>
        <p>A card with warning (amber) variant for cautionary messages.</p>
      </Card>

      <Card title="Error Card" variant="error" shadow>
        <p>A card with error (red) variant for critical information.</p>
      </Card>

      <Card title="Info Card" variant="info" shadow>
        <p>A card with info (blue) variant for informational content.</p>
      </Card>

      <Card
        title="Interactive Card"
        description="Click me!"
        interactive
        onclick={() => alert('Card clicked!')}
      >
        <p>This card is interactive and can be clicked.</p>
      </Card>

      <Card title="Card with Footer" shadow>
        <p>This card has a custom footer with actions.</p>

        {#snippet footer()}
          <div class="mljr-flex mljr-gap-2">
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">Save</Button>
          </div>
        {/snippet}
      </Card>

      <Card compact shadow>
        {#snippet header()}
          <div class="mljr-flex mljr-items-center mljr-gap-3">
            <div class="mljr-w-10 mljr-h-10 mljr-rounded-full mljr-bg-primary" style="background: var(--mljr-primary-500);"></div>
            <div>
              <h3 class="mljr-card-title">Compact Card</h3>
              <p class="mljr-text-sm mljr-text-muted">Custom header</p>
            </div>
          </div>
        {/snippet}
        <p>A compact card with custom header content.</p>
      </Card>
    </div>
  </Card>

  <!-- Color Palette -->
  <Card title="Color Palette" description="Primary, secondary, and accent color scales" class="mljr-mt-6">
    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">Primary (Warm Orange)</h4>
      <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
        {#each [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as shade}
          <div class="mljr-text-center">
            <div
              class="color-swatch"
              style="background-color: var(--mljr-primary-{shade});"
            ></div>
            <span class="mljr-text-xs">{shade}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">Secondary (Soft Purple)</h4>
      <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
        {#each [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as shade}
          <div class="mljr-text-center">
            <div
              class="color-swatch"
              style="background-color: var(--mljr-secondary-{shade});"
            ></div>
            <span class="mljr-text-xs">{shade}</span>
          </div>
        {/each}
      </div>
    </div>

    <div>
      <h4 class="mljr-h5 mljr-mb-3">Accent (Soft Teal)</h4>
      <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
        {#each [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as shade}
          <div class="mljr-text-center">
            <div
              class="color-swatch"
              style="background-color: var(--mljr-accent-{shade});"
            ></div>
            <span class="mljr-text-xs">{shade}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="mljr-mt-6">
      <h4 class="mljr-h5 mljr-mb-3">Semantic Colors</h4>
      <div class="mljr-flex mljr-flex-wrap mljr-gap-4">
        <div class="mljr-text-center">
          <div class="color-swatch" style="background-color: var(--mljr-success);"></div>
          <span class="mljr-text-xs">Success</span>
        </div>
        <div class="mljr-text-center">
          <div class="color-swatch" style="background-color: var(--mljr-warning);"></div>
          <span class="mljr-text-xs">Warning</span>
        </div>
        <div class="mljr-text-center">
          <div class="color-swatch" style="background-color: var(--mljr-error);"></div>
          <span class="mljr-text-xs">Error</span>
        </div>
        <div class="mljr-text-center">
          <div class="color-swatch" style="background-color: var(--mljr-info);"></div>
          <span class="mljr-text-xs">Info</span>
        </div>
      </div>
    </div>
  </Card>

  <CodeExample code={`// Default Card
<Card title="Default Card" description="A simple card">
  <p>Card content here</p>
</Card>

// Card with variants
<Card title="Primary Card" variant="primary" shadow>
  <p>Primary accent card</p>
</Card>

// Interactive Card
<Card title="Clickable" interactive onclick={() => alert('Clicked!')}>
  <p>This card is interactive</p>
</Card>

// Card with footer
<Card title="With Footer">
  <p>Content</p>
  {#snippet footer()}
    <Button variant="primary">Save</Button>
  {/snippet}
</Card>`} />

  <!-- Theme & Language Toggles -->
  <Card title="ThemeToggle" description="Switch between light, dark, and system theme" class="mljr-mt-6">
    <div class="mljr-flex mljr-flex-wrap mljr-gap-8 mljr-items-start">
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-3">Default (dropdown)</p>
        <ThemeToggle variant="default" />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-3">Simple toggle</p>
        <ThemeToggle variant="simple" />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-3">Segmented control</p>
        <ThemeToggle variant="segmented" />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-3">With labels</p>
        <ThemeToggle variant="segmented" showLabels />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-3">Large</p>
        <ThemeToggle variant="segmented" size="lg" showLabels />
      </div>
    </div>
    <CodeExample code={`<ThemeToggle variant="default" />
<ThemeToggle variant="simple" />
<ThemeToggle variant="segmented" showLabels />`} language="svelte" />
  </Card>

  <Card title="LanguageToggle" description="Switch between supported locales" class="mljr-mt-6">
    <div class="mljr-flex mljr-gap-4 mljr-items-center">
      <LanguageToggle />
    </div>
    <CodeExample code={`<LanguageToggle />`} language="svelte" />
  </Card>
</section>

<style>
  .mljr-w-10 {
    width: 2.5rem;
  }
  .mljr-h-10 {
    height: 2.5rem;
  }
  /* Color swatches - rounded squares */
  .color-swatch {
    width: 3rem;
    height: 3rem;
    border-radius: 12px;
    box-shadow: var(--mljr-clay-shadow-sm);
    margin-bottom: 0.25rem;
  }
</style>
