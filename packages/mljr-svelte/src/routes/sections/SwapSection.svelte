<script lang="ts">
  import { Swap, CodeExample, Icon } from '$lib';

  let swap1 = $state(false);
  let swap2 = $state(false);
  let swap3 = $state(false);
  let swap4 = $state(false);

  const codeExample = `<script>
  import { Swap, Icon } from 'mljr-svelte';

  let active = $state(false);
<\/script>

<!-- Basic swap with icons -->
<Swap bind:active animation="rotate">
  {#snippet on()}
    <Icon icon="mdi:play" size={24} />
  {/snippet}
  {#snippet off()}
    <Icon icon="mdi:pause" size={24} />
  {/snippet}
</Swap>

<!-- Flip animation -->
<Swap bind:active animation="flip">
  {#snippet on()}
    <Icon icon="mdi:heart-outline" size={32} />
  {/snippet}
  {#snippet off()}
    <Icon icon="mdi:heart" size={32} />
  {/snippet}
</Swap>

<!-- Fade animation -->
<Swap bind:active animation="fade">
  {#snippet on()}
    <Icon icon="mdi:moon-waning-crescent" size={24} />
  {/snippet}
  {#snippet off()}
    <Icon icon="mdi:white-balance-sunny" size={24} />
  {/snippet}
</Swap>`;
</script>

<div class="swap-section">
  <div class="mljr-mb-6">
    <p class="mljr-text-lg mljr-text-muted">
      Toggle between two states with smooth animations. Perfect for interactive icons, theme
      toggles, or any two-state UI elements.
    </p>
  </div>

  <div class="examples-grid">
    <!-- Rotate Animation -->
    <div class="example-card">
      <h3 class="example-title">Rotate Animation</h3>
      <div class="example-demo">
        <Swap bind:active={swap1} animation="rotate">
          {#snippet on()}
            <Icon icon="mdi:play-circle" size={48} />
          {/snippet}
          {#snippet off()}
            <Icon icon="mdi:pause-circle" size={48} />
          {/snippet}
        </Swap>
        <p class="mljr-text-sm mljr-text-muted mljr-mt-2">
          Click to toggle: {swap1 ? 'Paused' : 'Playing'}
        </p>
      </div>
    </div>

    <!-- Flip Animation -->
    <div class="example-card">
      <h3 class="example-title">Flip Animation</h3>
      <div class="example-demo">
        <Swap bind:active={swap2} animation="flip">
          {#snippet on()}
            <Icon icon="mdi:heart-outline" size={48} />
          {/snippet}
          {#snippet off()}
            <Icon icon="mdi:heart" size={48} />
          {/snippet}
        </Swap>
        <p class="mljr-text-sm mljr-text-muted mljr-mt-2">
          {swap2 ? 'Liked ❤️' : 'Click to like'}
        </p>
      </div>
    </div>

    <!-- Fade Animation -->
    <div class="example-card">
      <h3 class="example-title">Fade Animation</h3>
      <div class="example-demo">
        <Swap bind:active={swap3} animation="fade">
          {#snippet on()}
            <Icon icon="mdi:moon-waning-crescent" size={48} />
          {/snippet}
          {#snippet off()}
            <Icon icon="mdi:white-balance-sunny" size={48} />
          {/snippet}
        </Swap>
        <p class="mljr-text-sm mljr-text-muted mljr-mt-2">
          {swap3 ? 'Dark Mode' : 'Light Mode'}
        </p>
      </div>
    </div>

    <!-- No Animation -->
    <div class="example-card">
      <h3 class="example-title">No Animation (Instant)</h3>
      <div class="example-demo">
        <Swap bind:active={swap4} animation="none">
          {#snippet on()}
            <Icon icon="mdi:volume-high" size={48} />
          {/snippet}
          {#snippet off()}
            <Icon icon="mdi:volume-off" size={48} />
          {/snippet}
        </Swap>
        <p class="mljr-text-sm mljr-text-muted mljr-mt-2">
          {swap4 ? 'Muted' : 'Playing'}
        </p>
      </div>
    </div>

    <!-- Use Cases -->
    <div class="example-card full-width">
      <h3 class="example-title">Common Use Cases</h3>
      <div class="use-cases">
        <div class="use-case">
          <h4>🎵 Media Controls</h4>
          <Swap animation="rotate" class="use-case-swap">
            {#snippet on()}
              <Icon icon="mdi:play" size={32} />
            {/snippet}
            {#snippet off()}
              <Icon icon="mdi:pause" size={32} />
            {/snippet}
          </Swap>
        </div>

        <div class="use-case">
          <h4>👁️ Visibility Toggle</h4>
          <Swap animation="fade" class="use-case-swap">
            {#snippet on()}
              <Icon icon="mdi:eye" size={32} />
            {/snippet}
            {#snippet off()}
              <Icon icon="mdi:eye-off" size={32} />
            {/snippet}
          </Swap>
        </div>

        <div class="use-case">
          <h4>⭐ Favorite</h4>
          <Swap animation="flip" class="use-case-swap">
            {#snippet on()}
              <Icon icon="mdi:star-outline" size={32} />
            {/snippet}
            {#snippet off()}
              <Icon icon="mdi:star" size={32} />
            {/snippet}
          </Swap>
        </div>

        <div class="use-case">
          <h4>🔔 Notifications</h4>
          <Swap animation="rotate" class="use-case-swap">
            {#snippet on()}
              <Icon icon="mdi:bell" size={32} />
            {/snippet}
            {#snippet off()}
              <Icon icon="mdi:bell-off" size={32} />
            {/snippet}
          </Swap>
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
  .swap-section {
    max-width: 100%;
  }

  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

  .example-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--mljr-space-3);
    padding: var(--mljr-space-6);
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-md);
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

  .use-case :global(.use-case-swap) {
    color: var(--mljr-primary-600);
  }
</style>
