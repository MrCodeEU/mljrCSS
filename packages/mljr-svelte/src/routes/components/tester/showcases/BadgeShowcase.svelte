<script lang="ts">
  import { Badge, Button, Avatar, Icon } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Variants</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Badge>Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  </section>

  <!-- Solid Style -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Solid Style</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Badge variant="primary" solid>Primary</Badge>
      <Badge variant="secondary" solid>Secondary</Badge>
      <Badge variant="success" solid>Success</Badge>
      <Badge variant="warning" solid>Warning</Badge>
      <Badge variant="error" solid>Error</Badge>
      <Badge variant="info" solid>Info</Badge>
    </div>
  </section>

  <!-- Outline Style -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Outline Style</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Badge variant="primary" outline>Primary</Badge>
      <Badge variant="secondary" outline>Secondary</Badge>
      <Badge variant="success" outline>Success</Badge>
      <Badge variant="warning" outline>Warning</Badge>
      <Badge variant="error" outline>Error</Badge>
      <Badge variant="info" outline>Info</Badge>
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-items-center mljr-gap-3">
      <Badge variant="primary" size="sm">Small</Badge>
      <Badge variant="primary">Medium (Default)</Badge>
      <Badge variant="primary" size="lg">Large</Badge>
    </div>
  </section>

  <!-- With Dot -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Status Dot</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="warning" dot>Away</Badge>
      <Badge variant="error" dot>Offline</Badge>
      <Badge variant="info" dot>Busy</Badge>
      <Badge variant="primary" dot>Active</Badge>
    </div>
  </section>

  <!-- Pill Style -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Pill Style</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Badge variant="primary" solid>Primary</Badge>
      <Badge variant="secondary" solid>Secondary</Badge>
      <Badge variant="success" solid>Success</Badge>
      <Badge variant="warning" solid>Warning</Badge>
      <Badge variant="error" solid>Error</Badge>
    </div>
  </section>

  <!-- With Icons -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Icons</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Badge variant="success">
        <Icon icon="mdi:check" size={14} />
        Verified
      </Badge>
      <Badge variant="warning">
        <Icon icon="mdi:alert" size={14} />
        Pending
      </Badge>
      <Badge variant="error">
        <Icon icon="mdi:close" size={14} />
        Failed
      </Badge>
      <Badge variant="info">
        <Icon icon="mdi:information" size={14} />
        Info
      </Badge>
      <Badge variant="primary">
        <Icon icon="mdi:star" size={14} />
        Featured
      </Badge>
    </div>
  </section>

  <!-- Numbers -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Numeric Badges</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Badge variant="primary" solid>1</Badge>
      <Badge variant="secondary" solid>23</Badge>
      <Badge variant="error" solid>99+</Badge>
      <Badge variant="success" solid>12</Badge>
      <Badge variant="warning">New</Badge>
    </div>
  </section>

  <!-- On Components -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">On Buttons and Elements</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-4 mljr-items-center">
      <div class="mljr-relative mljr-inline-block">
        <Button variant="primary">
          Messages
        </Button>
        <Badge
          variant="error"
          solid
          class="mljr-absolute mljr--top-2 mljr--right-2"
        >
          5
        </Badge>
      </div>

      <div class="mljr-relative mljr-inline-block">
        <Button variant="outline-primary">
          <Icon icon="mdi:bell" size={20} />
          Notifications
        </Button>
        <Badge
          variant="error"
          solid
          class="mljr-absolute mljr--top-2 mljr--right-2"
        >
          99+
        </Badge>
      </div>

      <div class="mljr-relative mljr-inline-block">
        <Avatar initials="JD" size="lg" />
        <Badge
          variant="success"
          dot
          class="mljr-absolute mljr-bottom-0 mljr-right-0"
        >
        </Badge>
      </div>
    </div>
  </section>

  <!-- Tags/Labels -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">As Tags/Labels</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
      <Badge variant="primary" outline>JavaScript</Badge>
      <Badge variant="secondary" outline>TypeScript</Badge>
      <Badge variant="success" outline>Svelte</Badge>
      <Badge variant="info" outline>CSS</Badge>
      <Badge variant="warning" outline>HTML</Badge>
      <Badge variant="primary" outline>React</Badge>
      <Badge variant="secondary" outline>Vue</Badge>
      <Badge variant="error" outline>Angular</Badge>
    </div>
  </section>
</div>
