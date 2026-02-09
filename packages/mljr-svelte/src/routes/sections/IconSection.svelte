<script lang="ts">
  import { Card, Icon, CodeExample } from '$lib';

  const iconSizes = [16, 20, 24, 32, 48];
  const iconColors = ['#F97316', '#14B8A6', '#8B5CF6', '#EF4444', '#10B981'];
</script>

<section id="icons" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-gap-6">
    <Card title="Icon Component" description="Universal icons using Iconify (200,000+ icons)">
      <div class="icon-showcase">
        <div class="icon-grid">
          <div class="icon-item">
            <Icon icon="ph:house" size={32} />
            <span class="icon-label">ph:house</span>
          </div>
          <div class="icon-item">
            <Icon icon="ph:user" size={32} />
            <span class="icon-label">ph:user</span>
          </div>
          <div class="icon-item">
            <Icon icon="ph:gear" size={32} />
            <span class="icon-label">ph:gear</span>
          </div>
          <div class="icon-item">
            <Icon icon="ph:bell" size={32} />
            <span class="icon-label">ph:bell</span>
          </div>
          <div class="icon-item">
            <Icon icon="ph:heart" size={32} />
            <span class="icon-label">ph:heart</span>
          </div>
          <div class="icon-item">
            <Icon icon="ph:star" size={32} />
            <span class="icon-label">ph:star</span>
          </div>
          <div class="icon-item">
            <Icon icon="mdi:home" size={32} />
            <span class="icon-label">mdi:home</span>
          </div>
          <div class="icon-item">
            <Icon icon="mdi:account" size={32} />
            <span class="icon-label">mdi:account</span>
          </div>
        </div>
      </div>
    </Card>

    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <Card title="Icon Sizes" description="From small to large">
        <div class="size-demo">
          {#each iconSizes as size}
            <div class="size-item">
              <Icon icon="ph:star" {size} />
              <span class="size-label">{size}px</span>
            </div>
          {/each}
        </div>
      </Card>

      <Card title="Icon Colors" description="Custom colors">
        <div class="color-demo">
          {#each iconColors as color}
            <div class="color-item">
              <Icon icon="ph:circle" size={32} {color} />
              <span class="color-label">{color}</span>
            </div>
          {/each}
        </div>
      </Card>
    </div>

    <Card title="Icon Transformations" description="Flip and rotate">
      <div class="transform-demo">
        <div class="transform-item">
          <Icon icon="ph:arrow-right" size={32} />
          <span class="transform-label">Normal</span>
        </div>
        <div class="transform-item">
          <Icon icon="ph:arrow-right" size={32} hFlip />
          <span class="transform-label">Horizontal Flip</span>
        </div>
        <div class="transform-item">
          <Icon icon="ph:arrow-right" size={32} vFlip />
          <span class="transform-label">Vertical Flip</span>
        </div>
        <div class="transform-item">
          <Icon icon="ph:arrow-right" size={32} rotate={1} />
          <span class="transform-label">Rotate 90°</span>
        </div>
        <div class="transform-item">
          <Icon icon="ph:arrow-right" size={32} rotate={2} />
          <span class="transform-label">Rotate 180°</span>
        </div>
      </div>
    </Card>
  </div>

  <CodeExample code={`import { Icon } from 'mljr-svelte';

<!-- Basic usage -->
<Icon icon="ph:house" />

<!-- With size and color -->
<Icon icon="ph:star" size={32} color="#F97316" />

<!-- Transformations -->
<Icon icon="ph:arrow-right" hFlip />
<Icon icon="ph:arrow-right" rotate={2} />

<!-- Icon sets available: ph (Phosphor), mdi (Material), fa (FontAwesome), etc. -->`} />
</section>

<style>
  .icon-showcase {
    padding: var(--mljr-space-4);
  }

  .icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: var(--mljr-space-6);
  }

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--mljr-space-2);
    padding: var(--mljr-space-4);
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-shadow-xs);
  }

  .icon-label {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-muted);
    font-family: monospace;
  }

  .size-demo {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: var(--mljr-space-4);
    padding: var(--mljr-space-4);
  }

  .size-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--mljr-space-2);
  }

  .size-label {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-muted);
  }

  .color-demo {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: var(--mljr-space-4);
    padding: var(--mljr-space-4);
  }

  .color-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--mljr-space-2);
  }

  .color-label {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-muted);
    font-family: monospace;
  }

  .transform-demo {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: var(--mljr-space-4);
    padding: var(--mljr-space-4);
  }

  .transform-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--mljr-space-2);
  }

  .transform-label {
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-secondary);
  }
</style>
