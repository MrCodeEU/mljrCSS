<script lang="ts">
  import { Indicator, Avatar, Button, Icon, CodeExample } from '$lib';

  const codeExample = `<script>
  import { Indicator, Avatar, Icon } from 'mljr-svelte';
<\/script>

<!-- Notification badge -->
<Indicator position="top-right" color="error">
  <Icon icon="mdi:bell" size={32} />
  {#snippet indicator()}
    5
  {/snippet}
</Indicator>

<!-- Status dot -->
<Indicator position="bottom-right" color="success" dot ping>
  <Avatar src="/avatar.jpg" />
</Indicator>

<!-- Different positions -->
<Indicator position="top-left" color="primary">
  <Button>Inbox</Button>
  {#snippet indicator()}
    12
  {/snippet}
</Indicator>`;
</script>

<div class="indicator-section">
  <div class="mljr-mb-6">
    <p class="mljr-text-lg mljr-text-muted">
      Add notification badges, status indicators, or markers to any element. Supports multiple
      positions, colors, and animations.
    </p>
  </div>

  <div class="examples-grid">
    <!-- Positions -->
    <div class="example-card full-width">
      <h3 class="example-title">All Positions</h3>
      <div class="positions-grid">
        <div class="position-demo">
          <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Top Left</p>
          <Indicator position="top-left" color="primary">
            <div class="demo-box">
              <Icon icon="mdi:image" size={32} />
            </div>
            {#snippet indicator()}
              1
            {/snippet}
          </Indicator>
        </div>

        <div class="position-demo">
          <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Top Center</p>
          <Indicator position="top-center" color="secondary">
            <div class="demo-box">
              <Icon icon="mdi:image" size={32} />
            </div>
            {#snippet indicator()}
              2
            {/snippet}
          </Indicator>
        </div>

        <div class="position-demo">
          <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Top Right</p>
          <Indicator position="top-right" color="error">
            <div class="demo-box">
              <Icon icon="mdi:image" size={32} />
            </div>
            {#snippet indicator()}
              3
            {/snippet}
          </Indicator>
        </div>

        <div class="position-demo">
          <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Bottom Left</p>
          <Indicator position="bottom-left" color="success">
            <div class="demo-box">
              <Icon icon="mdi:image" size={32} />
            </div>
            {#snippet indicator()}
              4
            {/snippet}
          </Indicator>
        </div>

        <div class="position-demo">
          <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Bottom Center</p>
          <Indicator position="bottom-center" color="warning">
            <div class="demo-box">
              <Icon icon="mdi:image" size={32} />
            </div>
            {#snippet indicator()}
              5
            {/snippet}
          </Indicator>
        </div>

        <div class="position-demo">
          <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Bottom Right</p>
          <Indicator position="bottom-right" color="info">
            <div class="demo-box">
              <Icon icon="mdi:image" size={32} />
            </div>
            {#snippet indicator()}
              6
            {/snippet}
          </Indicator>
        </div>
      </div>
    </div>

    <!-- Colors -->
    <div class="example-card full-width">
      <h3 class="example-title">Color Variants</h3>
      <div class="colors-grid">
        <Indicator color="primary">
          <Button variant="outline-primary">Primary</Button>
          {#snippet indicator()}
            5
          {/snippet}
        </Indicator>

        <Indicator color="secondary">
          <Button variant="outline-secondary">Secondary</Button>
          {#snippet indicator()}
            12
          {/snippet}
        </Indicator>

        <Indicator color="success">
          <Button variant="ghost">Success</Button>
          {#snippet indicator()}
            3
          {/snippet}
        </Indicator>

        <Indicator color="warning">
          <Button variant="ghost">Warning</Button>
          {#snippet indicator()}
            99
          {/snippet}
        </Indicator>

        <Indicator color="error">
          <Button variant="ghost">Error</Button>
          {#snippet indicator()}
            !
          {/snippet}
        </Indicator>

        <Indicator color="info">
          <Button variant="ghost">Info</Button>
          {#snippet indicator()}
            7
          {/snippet}
        </Indicator>
      </div>
    </div>

    <!-- Sizes -->
    <div class="example-card">
      <h3 class="example-title">Sizes</h3>
      <div class="sizes-grid">
        <Indicator size="sm" color="primary">
          <Button size="sm">Small</Button>
          {#snippet indicator()}
            9
          {/snippet}
        </Indicator>

        <Indicator size="md" color="primary">
          <Button>Medium</Button>
          {#snippet indicator()}
            9
          {/snippet}
        </Indicator>

        <Indicator size="lg" color="primary">
          <Button size="lg">Large</Button>
          {#snippet indicator()}
            9
          {/snippet}
        </Indicator>
      </div>
    </div>

    <!-- Dot Indicators -->
    <div class="example-card">
      <h3 class="example-title">Status Dots</h3>
      <div class="dots-grid">
        <Indicator position="bottom-right" color="success" dot>
          <Avatar initials="US" />
        </Indicator>

        <Indicator position="bottom-right" color="warning" dot>
          <Avatar initials="AW" />
        </Indicator>

        <Indicator position="bottom-right" color="error" dot>
          <Avatar initials="OF" />
        </Indicator>
      </div>
      <p class="mljr-text-sm mljr-text-muted mljr-mt-3">
        Success = Online, Warning = Away, Error = Offline
      </p>
    </div>

    <!-- Ping Animation -->
    <div class="example-card full-width">
      <h3 class="example-title">Ping Animation</h3>
      <div class="ping-grid">
        <Indicator position="top-right" color="error" ping>
          <Button variant="outline-primary">
            <Icon icon="mdi:bell" size={20} />
            Notifications
          </Button>
          {#snippet indicator()}
            3
          {/snippet}
        </Indicator>

        <Indicator position="bottom-right" color="success" dot ping>
          <Avatar initials="ON" />
        </Indicator>

        <Indicator position="top-right" color="warning" ping>
          <div class="demo-box-lg">
            <Icon icon="mdi:message-text" size={48} />
          </div>
          {#snippet indicator()}
            !
          {/snippet}
        </Indicator>
      </div>
    </div>

    <!-- Use Cases -->
    <div class="example-card full-width">
      <h3 class="example-title">Common Use Cases</h3>
      <div class="use-cases">
        <div class="use-case">
          <h4>🔔 Notifications</h4>
          <Indicator color="error">
            <Button variant="ghost">
              <Icon icon="mdi:bell" size={20} />
            </Button>
            {#snippet indicator()}
              5
            {/snippet}
          </Indicator>
        </div>

        <div class="use-case">
          <h4>✉️ Unread Messages</h4>
          <Indicator color="primary">
            <Button variant="ghost">
              <Icon icon="mdi:message" size={20} />
            </Button>
            {#snippet indicator()}
              12
            {/snippet}
          </Indicator>
        </div>

        <div class="use-case">
          <h4>🟢 Online Status</h4>
          <Indicator position="bottom-right" color="success" dot ping>
            <Avatar initials="ON" />
          </Indicator>
        </div>

        <div class="use-case">
          <h4>🛒 Cart Items</h4>
          <Indicator color="secondary">
            <Button variant="ghost">
              <Icon icon="mdi:cart" size={20} />
            </Button>
            {#snippet indicator()}
              3
            {/snippet}
          </Indicator>
        </div>
      </div>
    </div>

    <!-- Code Example -->
    <div class="example-card full-width">
      <h3 class="example-title">Usage Example</h3>
      <CodeExample code={codeExample} language="svelte" />
    </div>
  </div>
</div>

<style>
  .indicator-section {
    max-width: 100%;
  }

  .examples-grid {
    display: grid;
    gap: var(--mljr-space-6);
  }

  .example-card {
    padding: var(--mljr-space-6);
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-shadow);
  }

  .example-card.full-width {
    grid-column: 1 / -1;
  }

  .example-title {
    font-size: var(--mljr-text-lg);
    font-weight: 600;
    color: var(--mljr-text);
    margin-bottom: var(--mljr-space-4);
  }

  .positions-grid,
  .colors-grid,
  .sizes-grid,
  .dots-grid,
  .ping-grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--mljr-space-6);
    align-items: center;
    justify-content: center;
  }

  .position-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .demo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-md);
    border: 2px solid var(--mljr-border);
    color: var(--mljr-text-secondary);
  }

  .demo-box-lg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-lg);
    border: 2px solid var(--mljr-border);
    color: var(--mljr-text-secondary);
  }

  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--mljr-space-4);
  }

  .use-case {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--mljr-space-3);
    padding: var(--mljr-space-4);
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-md);
    text-align: center;
  }

  .use-case h4 {
    font-size: var(--mljr-text-base);
    font-weight: 600;
    color: var(--mljr-text);
    margin: 0;
  }
</style>
