<script lang="ts">
  import { Background, Card, Button } from '$lib';

  let pattern = $state<'crosses' | 'dots' | 'lines' | 'none'>('crosses');
  let opacity = $state(0.12);
  let size = $state(32);
  let spacing = $state(0);
</script>

<div class="mljr-space-y-8">
  <!-- Pattern Examples -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Background Patterns</h3>
    <div class="mljr-grid mljr-grid-cols-2 mljr-gap-4">
      {#each (['crosses', 'dots', 'lines', 'none'] as const) as pat}
        <div class="mljr-relative mljr-h-32 mljr-rounded-xl mljr-border mljr-overflow-hidden mljr-bg-surface">
          <Background pattern={pat} fixed={false} opacity={0.15} />
          <div class="mljr-absolute mljr-inset-0 mljr-flex mljr-items-center mljr-justify-center">
            <span class="mljr-text-sm mljr-font-medium mljr-capitalize mljr-bg-surface/80 mljr-px-3 mljr-py-1 mljr-rounded-lg">{pat}</span>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Opacity Variations -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Opacity Variations</h3>
    <div class="mljr-grid mljr-grid-cols-3 mljr-gap-4">
      {#each [0.05, 0.15, 0.3] as op}
        <div class="mljr-relative mljr-h-28 mljr-rounded-xl mljr-border mljr-overflow-hidden mljr-bg-surface">
          <Background pattern="crosses" fixed={false} opacity={op} />
          <div class="mljr-absolute mljr-inset-0 mljr-flex mljr-items-center mljr-justify-center">
            <span class="mljr-text-sm mljr-font-medium mljr-bg-surface/80 mljr-px-2 mljr-py-1 mljr-rounded">
              {op}
            </span>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Size Variations -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Size Variations</h3>
    <div class="mljr-grid mljr-grid-cols-3 mljr-gap-4">
      {#each [16, 32, 64] as sz}
        <div class="mljr-relative mljr-h-28 mljr-rounded-xl mljr-border mljr-overflow-hidden mljr-bg-surface">
          <Background pattern="dots" fixed={false} size={sz} opacity={0.15} />
          <div class="mljr-absolute mljr-inset-0 mljr-flex mljr-items-center mljr-justify-center">
            <span class="mljr-text-sm mljr-font-medium mljr-bg-surface/80 mljr-px-2 mljr-py-1 mljr-rounded">
              size={sz}
            </span>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Custom Colors -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Colors</h3>
    <div class="mljr-grid mljr-grid-cols-2 mljr-gap-4">
      <div class="mljr-relative mljr-h-32 mljr-rounded-xl mljr-overflow-hidden" style="background: #1e1b4b">
        <Background pattern="crosses" fixed={false} color="#818cf8" opacity={0.2} />
        <div class="mljr-absolute mljr-inset-0 mljr-flex mljr-items-center mljr-justify-center">
          <span class="mljr-text-sm mljr-font-medium mljr-text-white">Indigo Theme</span>
        </div>
      </div>
      <div class="mljr-relative mljr-h-32 mljr-rounded-xl mljr-overflow-hidden" style="background: #052e16">
        <Background pattern="dots" fixed={false} color="#4ade80" opacity={0.2} />
        <div class="mljr-absolute mljr-inset-0 mljr-flex mljr-items-center mljr-justify-center">
          <span class="mljr-text-sm mljr-font-medium mljr-text-white">Forest Theme</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Interactive Demo -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Interactive Playground</h3>
    <Card>
      <div class="mljr-space-y-4 mljr-mb-4">
        <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
          {#each (['crosses', 'dots', 'lines', 'none'] as const) as pat}
            <Button
              variant={pattern === pat ? 'primary' : 'outline-primary'}
              size="sm"
              onclick={() => { pattern = pat; }}
            >
              {pat}
            </Button>
          {/each}
        </div>

        <div class="mljr-space-y-2">
          <span class="mljr-text-sm mljr-font-medium">Opacity: {opacity}</span>
          <input type="range" min="0.02" max="0.5" step="0.01" bind:value={opacity} class="mljr-w-full" />
        </div>

        <div class="mljr-space-y-2">
          <span class="mljr-text-sm mljr-font-medium">Size: {size}px</span>
          <input type="range" min="8" max="80" step="4" bind:value={size} class="mljr-w-full" />
        </div>

        <div class="mljr-space-y-2">
          <span class="mljr-text-sm mljr-font-medium">Spacing: {spacing}px</span>
          <input type="range" min="0" max="32" step="2" bind:value={spacing} class="mljr-w-full" />
        </div>
      </div>

      <div class="mljr-relative mljr-h-48 mljr-rounded-xl mljr-border mljr-overflow-hidden mljr-bg-surface">
        <Background {pattern} fixed={false} {opacity} {size} {spacing} />
        <div class="mljr-absolute mljr-inset-0 mljr-flex mljr-items-center mljr-justify-center">
          <div class="mljr-text-center mljr-bg-surface/80 mljr-px-4 mljr-py-2 mljr-rounded-lg">
            <p class="mljr-font-medium">Pattern: {pattern}</p>
            <p class="mljr-text-sm mljr-text-muted">Opacity: {opacity} · Size: {size}px</p>
          </div>
        </div>
      </div>
    </Card>
  </section>

  <!-- Hero Section Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Hero Section Usage</h3>
    <div class="mljr-relative mljr-rounded-2xl mljr-overflow-hidden mljr-bg-gradient-primary mljr-p-12 mljr-text-center mljr-text-white">
      <Background pattern="crosses" fixed={false} color="white" opacity={0.1} />
      <div class="mljr-relative mljr-z-10">
        <h2 class="mljr-h2 mljr-mb-3">Beautiful Hero Section</h2>
        <p class="mljr-text-lg mljr-opacity-90 mljr-mb-6">Background patterns add subtle texture to your design</p>
        <Button variant="secondary">Get Started</Button>
      </div>
    </div>
  </section>
</div>
