<script lang="ts">
  import { Button, Card, CodeExample } from '$lib';
</script>

<section id="buttons" class="mljr-mb-8">
  <Card title="Buttons" description="Various button styles and states">
    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">Variants</h4>
      <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
        <Button>Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline-primary">Outline Primary</Button>
        <Button variant="outline-secondary">Outline Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="success">Success</Button>
      </div>
    </div>

    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">Sizes</h4>
      <div class="mljr-flex mljr-flex-wrap mljr-items-center mljr-gap-2">
        <Button variant="primary" size="xs">Extra Small</Button>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="md">Medium</Button>
        <Button variant="primary" size="lg">Large</Button>
        <Button variant="primary" size="xl">Extra Large</Button>
      </div>
    </div>

    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">States</h4>
      <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
        <Button variant="primary" loading>Loading</Button>
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="secondary" loading>Loading</Button>
      </div>
    </div>

    <div>
      <h4 class="mljr-h5 mljr-mb-3">Icon Buttons</h4>
      <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
        <Button variant="primary" icon>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
        </Button>
        <Button variant="secondary" icon>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
          </svg>
        </Button>
        <Button variant="ghost" icon>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
        </Button>
      </div>
    </div>

    <CodeExample code={`<Button>Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline-primary">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>

<!-- Sizes -->
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

<!-- States -->
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>

<!-- Icon button -->
<Button icon>
  <svg>...</svg>
</Button>`} />
  </Card>
</section>
