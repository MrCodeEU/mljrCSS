<script lang="ts">
  import { RadialProgress, Card } from '$lib';

  let progress = $state(65);
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Radial Progress</h3>
    <div class="mljr-flex mljr-gap-6 mljr-flex-wrap">
      <RadialProgress value={25} />
      <RadialProgress value={50} />
      <RadialProgress value={75} />
      <RadialProgress value={100} />
    </div>
  </section>

  <!-- Variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Variants</h3>
    <div class="mljr-flex mljr-gap-6 mljr-flex-wrap">
      <RadialProgress value={70} variant="primary" />
      <RadialProgress value={70} variant="secondary" />
      <RadialProgress value={70} variant="accent" />
      <RadialProgress value={70} variant="success" />
      <RadialProgress value={70} variant="warning" />
      <RadialProgress value={70} variant="error" />
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-flex mljr-items-end mljr-gap-6">
      <RadialProgress value={60} size="sm" />
      <RadialProgress value={60} size="md" />
      <RadialProgress value={60} size="lg" />
      <RadialProgress value={60} size="xl" />
    </div>
  </section>

  <!-- Without Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Without Percentage Label</h3>
    <div class="mljr-flex mljr-gap-6">
      <RadialProgress value={45} showLabel={false} variant="primary" />
      <RadialProgress value={80} showLabel={false} variant="success" />
    </div>
  </section>

  <!-- Custom Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Label</h3>
    <div class="mljr-flex mljr-gap-6">
      <RadialProgress value={3} max={5} label="3/5" size="lg" variant="primary" />
      <RadialProgress value={8} max={10} label="8 / 10" size="lg" variant="success" />
    </div>
  </section>

  <!-- Stroke Width -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Stroke Widths</h3>
    <div class="mljr-flex mljr-gap-6">
      <div class="mljr-text-center">
        <RadialProgress value={70} strokeWidth={4} />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-1">Thin (4)</p>
      </div>
      <div class="mljr-text-center">
        <RadialProgress value={70} strokeWidth={8} />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-1">Default (8)</p>
      </div>
      <div class="mljr-text-center">
        <RadialProgress value={70} strokeWidth={14} />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-1">Thick (14)</p>
      </div>
    </div>
  </section>

  <!-- Interactive -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Interactive Demo</h3>
    <Card>
      <div class="mljr-flex mljr-items-center mljr-gap-8">
        <RadialProgress value={progress} size="xl" variant="primary" />
        <div class="mljr-flex-1 mljr-space-y-4">
          <div class="mljr-space-y-1">
            <span class="mljr-text-sm mljr-font-medium">Progress: {progress}%</span>
            <input type="range" min="0" max="100" bind:value={progress} class="mljr-w-full" />
          </div>
          <div class="mljr-grid mljr-grid-cols-3 mljr-gap-2">
            {#each [25, 50, 75, 100] as val}
              <button
                onclick={() => { progress = val; }}
                class="mljr-btn mljr-btn-outline-primary mljr-btn-sm"
              >{val}%</button>
            {/each}
          </div>
        </div>
      </div>
    </Card>
  </section>

  <!-- Dashboard Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Dashboard Metrics</h3>
    <div class="mljr-grid mljr-grid-cols-2 mljr-md:grid-cols-4 mljr-gap-4">
      {#each [
        { label: 'CPU Usage', value: 73, variant: 'warning' },
        { label: 'Memory', value: 48, variant: 'primary' },
        { label: 'Storage', value: 92, variant: 'error' },
        { label: 'Uptime', value: 99, variant: 'success' },
      ] as metric}
        <Card class="mljr-text-center">
          <RadialProgress value={metric.value} variant={metric.variant as 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'} />
          <p class="mljr-text-sm mljr-font-medium mljr-mt-3">{metric.label}</p>
        </Card>
      {/each}
    </div>
  </section>
</div>
