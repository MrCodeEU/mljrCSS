<script lang="ts">
  import { Spinner, Card, Button } from '$lib';
  type SpinnerVariant = 'circle' | 'ring' | 'pulse' | 'dots' | 'bars' | 'orbit';

  let loading = $state(false);

  function simulateLoad() {
    loading = true;
    setTimeout(() => {
      loading = false;
    }, 3000);
  }
</script>

<div class="mljr-space-y-8">
  <!-- Variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Variants</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-items-center mljr-gap-6">
      <div class="mljr-text-center">
        <Spinner variant="circle" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Circle</p>
      </div>
      <div class="mljr-text-center">
        <Spinner variant="ring" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Ring</p>
      </div>
      <div class="mljr-text-center">
        <Spinner variant="pulse" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Pulse</p>
      </div>
      <div class="mljr-text-center">
        <Spinner variant="dots" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Dots</p>
      </div>
      <div class="mljr-text-center">
        <Spinner variant="bars" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Bars</p>
      </div>
      <div class="mljr-text-center">
        <Spinner variant="orbit" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Orbit</p>
      </div>
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-items-center mljr-gap-6">
      <div class="mljr-text-center">
        <Spinner size="xs" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">XS</p>
      </div>
      <div class="mljr-text-center">
        <Spinner size="sm" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Small</p>
      </div>
      <div class="mljr-text-center">
        <Spinner />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Medium</p>
      </div>
      <div class="mljr-text-center">
        <Spinner size="lg" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Large</p>
      </div>
      <div class="mljr-text-center">
        <Spinner size="xl" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">XL</p>
      </div>
    </div>
  </section>

  <!-- Colors -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Colors</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-items-center mljr-gap-6">
      <div class="mljr-text-center">
        <Spinner color="primary" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Primary</p>
      </div>
      <div class="mljr-text-center">
        <Spinner color="secondary" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Secondary</p>
      </div>
    </div>
  </section>

  <!-- With Text -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Text</h3>
    <div class="mljr-space-y-4">
      <div class="mljr-flex mljr-items-center mljr-gap-3">
        <Spinner size="sm" />
        <span class="mljr-text-secondary">Loading...</span>
      </div>
      <div class="mljr-flex mljr-items-center mljr-gap-3">
        <Spinner size="sm" variant="dots" />
        <span class="mljr-text-secondary">Please wait...</span>
      </div>
      <div class="mljr-flex mljr-items-center mljr-gap-3">
        <Spinner size="sm" variant="bars" />
        <span class="mljr-text-secondary">Processing...</span>
      </div>
    </div>
  </section>

  <!-- In Buttons -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">In Buttons</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Button variant="primary" disabled>
        <Spinner size="xs" />
        Loading...
      </Button>
      <Button variant="secondary" disabled>
        <Spinner size="xs" variant="ring" color="secondary" />
        Processing
      </Button>
      <Button variant="outline-primary" disabled>
        <Spinner size="xs" variant="dots" />
        Please wait
      </Button>
    </div>
  </section>

  <!-- In Cards -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">In Cards</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-4">
      <Card>
        <div class="mljr-flex mljr-flex-col mljr-items-center mljr-justify-center mljr-py-8">
          <Spinner size="lg" />
          <p class="mljr-mt-4 mljr-text-secondary">Loading content...</p>
        </div>
      </Card>

      <Card>
        <div class="mljr-flex mljr-flex-col mljr-items-center mljr-justify-center mljr-py-8">
          <Spinner size="lg" variant="orbit" />
          <p class="mljr-mt-4 mljr-text-secondary">Fetching data...</p>
        </div>
      </Card>
    </div>
  </section>

  <!-- Loading State Demo -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Loading State Demo</h3>
    <Card>
      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-4">
        {#if loading}
          <div class="mljr-py-8">
            <Spinner size="xl" variant="ring" />
            <p class="mljr-mt-4 mljr-text-center mljr-text-secondary">
              Simulating 3-second load...
            </p>
          </div>
        {:else}
          <Button variant="primary" onclick={simulateLoad}>
            Start Loading
          </Button>
        {/if}
      </div>
    </Card>
  </section>

  <!-- Size Comparison -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Size Comparison (Ring Variant)</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-items-end mljr-gap-6">
      <Spinner size="xs" variant="ring" />
      <Spinner size="sm" variant="ring" />
      <Spinner variant="ring" />
      <Spinner size="lg" variant="ring" />
      <Spinner size="xl" variant="ring" />
    </div>
  </section>

  <!-- All Variants at Different Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">All Variants (Large Size)</h3>
    <div class="mljr-grid mljr-grid-cols-2 mljr-md:grid-cols-3 mljr-lg:grid-cols-6 mljr-gap-6">
      {#each ['circle', 'ring', 'pulse', 'dots', 'bars', 'orbit'] as variant}
        <div class="mljr-text-center mljr-p-4 mljr-bg-secondary mljr-rounded-lg">
          <Spinner variant={variant as SpinnerVariant} size="lg" />
          <p class="mljr-text-xs mljr-text-muted mljr-mt-2 mljr-capitalize">
            {variant}
          </p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Dark Background -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">On Dark Background</h3>
    <div class="mljr-p-8 mljr-bg-gray-900 mljr-rounded-lg">
      <div class="mljr-flex mljr-flex-wrap mljr-items-center mljr-gap-6">
        {#each ['circle', 'ring', 'pulse', 'dots', 'bars', 'orbit'] as variant}
          <div class="mljr-text-center">
            <Spinner variant={variant as SpinnerVariant} />
          </div>
        {/each}
      </div>
    </div>
  </section>
</div>
