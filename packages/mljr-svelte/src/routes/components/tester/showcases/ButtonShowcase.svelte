<script lang="ts">
  import { Button, Icon } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Variants</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline-primary">Outline Primary</Button>
      <Button variant="outline-secondary">Outline Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-items-center mljr-gap-3">
      <Button size="xs" variant="primary">Extra Small</Button>
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium (Default)</Button>
      <Button size="lg" variant="primary">Large</Button>
      <Button size="xl" variant="primary">Extra Large</Button>
    </div>
  </section>

  <!-- With Icons -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Icons</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Button variant="primary">
        <Icon icon="mdi:plus" size={20} />
        Add Item
      </Button>
      <Button variant="secondary">
        <Icon icon="mdi:download" size={20} />
        Download
      </Button>
      <Button variant="outline-primary">
        <Icon icon="mdi:heart" size={20} />
        Like
      </Button>
      <Button variant="ghost">
        Settings
        <Icon icon="mdi:cog" size={20} />
      </Button>
    </div>
  </section>

  <!-- States -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">States</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Button variant="primary">Normal</Button>
      <Button variant="primary" disabled>Disabled</Button>
      <Button variant="primary" loading>Loading</Button>
      <Button variant="outline-primary" disabled>Disabled Outline</Button>
    </div>
  </section>

  <!-- Full Width -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Full Width</h3>
    <div class="mljr-space-y-3">
      <Button variant="primary" block>Full Width Primary</Button>
      <Button variant="secondary" block>Full Width Secondary</Button>
      <Button variant="outline-primary" block>
        <Icon icon="mdi:login" size={20} />
        Full Width with Icon
      </Button>
    </div>
  </section>

  <!-- Icon Only -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Icon Only</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Button variant="primary" size="sm">
        <Icon icon="mdi:heart" size={16} />
      </Button>
      <Button variant="primary">
        <Icon icon="mdi:star" size={20} />
      </Button>
      <Button variant="primary" size="lg">
        <Icon icon="mdi:bookmark" size={24} />
      </Button>
      <Button variant="outline-primary">
        <Icon icon="mdi:share" size={20} />
      </Button>
      <Button variant="ghost">
        <Icon icon="mdi:dots-vertical" size={20} />
      </Button>
    </div>
  </section>

  <!-- Group -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Button Group</h3>
    <div class="mljr-flex mljr-gap-0">
      <Button variant="outline-primary" style="border-radius: 8px 0 0 8px; border-right: none;">
        Left
      </Button>
      <Button variant="outline-primary" style="border-radius: 0; border-right: none;">
        Middle
      </Button>
      <Button variant="outline-primary" style="border-radius: 0 8px 8px 0;">
        Right
      </Button>
    </div>
  </section>
</div>
