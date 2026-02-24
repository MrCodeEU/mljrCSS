<script lang="ts">
  import { Card, Button, Badge, Icon } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Variants</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-3 mljr-gap-4">
      <Card variant="default">
        <h4 class="mljr-h5 mljr-mb-2">Default Card</h4>
        <p class="mljr-text-secondary">
          This is a default card with subtle styling and clay shadow effect.
        </p>
      </Card>

      <Card variant="primary">
        <h4 class="mljr-h5 mljr-mb-2">Primary Card</h4>
        <p class="mljr-text-secondary">
          This is a primary card with accent border and enhanced styling.
        </p>
      </Card>

      <Card variant="secondary">
        <h4 class="mljr-h5 mljr-mb-2">Secondary Card</h4>
        <p class="mljr-text-secondary">
          This is a secondary card with alternative accent styling.
        </p>
      </Card>
    </div>
  </section>

  <!-- With Header and Footer -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Header and Footer</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-4">
      <Card>
        {#snippet header()}
          <div class="mljr-flex mljr-items-center mljr-justify-between">
            <h4 class="mljr-h5">Card Title</h4>
            <Badge variant="primary">New</Badge>
          </div>
        {/snippet}
        <p class="mljr-text-secondary">
          Card content goes here. Headers and footers are optional snippets that
          provide additional structure.
        </p>
        {#snippet footer()}
          <div class="mljr-flex mljr-justify-end mljr-gap-2">
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">Save</Button>
          </div>
        {/snippet}
      </Card>

      <Card variant="primary">
        {#snippet header()}
          <div class="mljr-flex mljr-items-center mljr-gap-2">
            <Icon icon="mdi:star" size={20} />
            <h4 class="mljr-h5">Featured Card</h4>
          </div>
        {/snippet}
        <p class="mljr-text-secondary">
          This card uses the primary variant and includes an icon in the header.
        </p>
        {#snippet footer()}
          <Button variant="outline-primary" size="sm" block>
            Learn More
          </Button>
        {/snippet}
      </Card>
    </div>
  </section>

  <!-- Interactive Cards -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Interactive Cards</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-3 mljr-gap-4">
      <Card class="mljr-cursor-pointer mljr-transition-all hover:mljr-shadow-lg hover:mljr--translate-y-1">
        <div class="mljr-flex mljr-items-center mljr-gap-3 mljr-mb-3">
          <div class="mljr-p-3 mljr-bg-primary-100 dark:mljr-bg-primary-900/30 mljr-rounded-lg">
            <Icon icon="mdi:rocket" size={24} class="mljr-text-primary-600" />
          </div>
          <h4 class="mljr-h5">Quick Start</h4>
        </div>
        <p class="mljr-text-secondary mljr-text-sm">
          Get started with our platform in minutes.
        </p>
      </Card>

      <Card class="mljr-cursor-pointer mljr-transition-all hover:mljr-shadow-lg hover:mljr--translate-y-1">
        <div class="mljr-flex mljr-items-center mljr-gap-3 mljr-mb-3">
          <div class="mljr-p-3 mljr-bg-secondary-100 dark:mljr-bg-secondary-900/30 mljr-rounded-lg">
            <Icon icon="mdi:book-open" size={24} class="mljr-text-secondary-600" />
          </div>
          <h4 class="mljr-h5">Documentation</h4>
        </div>
        <p class="mljr-text-secondary mljr-text-sm">
          Comprehensive guides and API reference.
        </p>
      </Card>

      <Card class="mljr-cursor-pointer mljr-transition-all hover:mljr-shadow-lg hover:mljr--translate-y-1">
        <div class="mljr-flex mljr-items-center mljr-gap-3 mljr-mb-3">
          <div class="mljr-p-3 mljr-bg-accent-100 dark:mljr-bg-accent-900/30 mljr-rounded-lg">
            <Icon icon="mdi:help-circle" size={24} class="mljr-text-accent-600" />
          </div>
          <h4 class="mljr-h5">Support</h4>
        </div>
        <p class="mljr-text-secondary mljr-text-sm">
          Get help from our community and team.
        </p>
      </Card>
    </div>
  </section>

  <!-- Content Examples -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Content Examples</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-4">
      <!-- Blog Post Card -->
      <Card>
        <div class="mljr-mb-4">
          <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-mb-2">
            <Badge variant="primary" outline>Technology</Badge>
            <span class="mljr-text-xs mljr-text-muted">5 min read</span>
          </div>
          <h4 class="mljr-h4 mljr-mb-2">Getting Started with Svelte 5</h4>
          <p class="mljr-text-secondary mljr-text-sm mljr-mb-3">
            Learn about the new runes API and how it simplifies state management
            in Svelte applications.
          </p>
          <div class="mljr-flex mljr-items-center mljr-gap-2">
            <div class="mljr-w-8 mljr-h-8 mljr-bg-gradient-primary mljr-rounded-full"></div>
            <div>
              <div class="mljr-text-sm mljr-font-medium">Jane Doe</div>
              <div class="mljr-text-xs mljr-text-muted">Feb 15, 2026</div>
            </div>
          </div>
        </div>
      </Card>

      <!-- Product Card -->
      <Card variant="primary">
        {#snippet header()}
          <div class="mljr-flex mljr-items-center mljr-justify-between">
            <h4 class="mljr-h5">Premium Plan</h4>
            <Badge variant="success" solid>Popular</Badge>
          </div>
        {/snippet}
        <div class="mljr-mb-4">
          <div class="mljr-flex mljr-items-baseline mljr-gap-1 mljr-mb-4">
            <span class="mljr-text-4xl mljr-font-bold">$29</span>
            <span class="mljr-text-muted">/month</span>
          </div>
          <ul class="mljr-space-y-2">
            <li class="mljr-flex mljr-items-center mljr-gap-2 mljr-text-sm">
              <Icon icon="mdi:check" size={16} class="mljr-text-success-600" />
              Unlimited projects
            </li>
            <li class="mljr-flex mljr-items-center mljr-gap-2 mljr-text-sm">
              <Icon icon="mdi:check" size={16} class="mljr-text-success-600" />
              Priority support
            </li>
            <li class="mljr-flex mljr-items-center mljr-gap-2 mljr-text-sm">
              <Icon icon="mdi:check" size={16} class="mljr-text-success-600" />
              Advanced analytics
            </li>
          </ul>
        </div>
        {#snippet footer()}
          <Button variant="primary" block>Subscribe Now</Button>
        {/snippet}
      </Card>
    </div>
  </section>

  <!-- Custom Styling -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Styling</h3>
    <Card class="mljr-bg-gradient-to-br mljr-from-primary-50 mljr-to-secondary-50 dark:mljr-from-primary-900/20 dark:mljr-to-secondary-900/20">
      <h4 class="mljr-h5 mljr-mb-2">Custom Gradient Card</h4>
      <p class="mljr-text-secondary">
        Cards accept custom classes for complete styling control. This card uses
        a gradient background.
      </p>
    </Card>
  </section>
</div>
