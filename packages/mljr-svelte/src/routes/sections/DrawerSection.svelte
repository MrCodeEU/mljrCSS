<script lang="ts">
  import { Card, Drawer, Button, CodeExample } from '$lib';

  let drawerRight = $state(false);
  let drawerLeft = $state(false);
  let drawerBottom = $state(false);
  let drawerSizes = $state(false);
</script>

<section id="drawer" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6">
    <Card title="Drawer Positions" description="Open from different sides">
      <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
        <Button onclick={() => drawerLeft = true}>Open Left</Button>
        <Button onclick={() => drawerRight = true}>Open Right</Button>
        <Button onclick={() => drawerBottom = true}>Open Bottom</Button>
      </div>
    </Card>

    <Card title="Drawer Sizes" description="Different width options">
      <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
        <Button variant="secondary" onclick={() => drawerSizes = true}>Show Sizes</Button>
      </div>
    </Card>
  </div>

  <!-- Left Drawer -->
  <Drawer
    bind:open={drawerLeft}
    position="left"
    title="Left Drawer"
  >
    <p>This drawer slides in from the left side.</p>
    <p class="mljr-mt-4">Perfect for navigation menus!</p>
  </Drawer>

  <!-- Right Drawer -->
  <Drawer
    bind:open={drawerRight}
    position="right"
    title="Right Drawer"
  >
    <p>This drawer slides in from the right side.</p>
    <p class="mljr-mt-4">Great for settings panels or details.</p>
  </Drawer>

  <!-- Bottom Drawer -->
  <Drawer
    bind:open={drawerBottom}
    position="bottom"
    title="Bottom Drawer"
  >
    <p>This drawer slides up from the bottom.</p>
    <p class="mljr-mt-4">Useful for mobile actions or forms.</p>
  </Drawer>

  <!-- Sizes Drawer -->
  <Drawer
    bind:open={drawerSizes}
    title="Choose a Size"
  >
    <div class="mljr-flex mljr-flex-col mljr-gap-3">
      <p>Drawers support multiple sizes:</p>
      <ul class="mljr-list-disc mljr-pl-5 mljr-space-y-1 mljr-text-secondary">
        <li>Small (300px)</li>
        <li>Medium (400px) - default</li>
        <li>Large (600px)</li>
        <li>Extra Large (800px)</li>
        <li>Full (100%)</li>
      </ul>
    </div>
  </Drawer>

  <CodeExample code={`let drawerOpen = $state(false);

<Button onclick={() => drawerOpen = true}>Open Drawer</Button>

<Drawer
  bind:open={drawerOpen}
  position="right"
  title="Drawer Title"
  size="md"
>
  <p>Drawer content goes here.</p>
  
  {#snippet footer()}
    <Button onclick={() => drawerOpen = false}>Close</Button>
  {/snippet}
</Drawer>`} />
</section>
