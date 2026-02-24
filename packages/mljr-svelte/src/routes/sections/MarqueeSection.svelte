<script lang="ts">
  import { Marquee, Badge, Avatar } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';

  const techItems = [
    'Svelte 5', 'TypeScript', 'TailwindCSS', 'Vite', 'Vitest', 'pnpm', 'Turborepo', 'Playwright',
  ];

  const brandItems = [
    { name: 'Apple', color: '#555' },
    { name: 'Google', color: '#4285f4' },
    { name: 'Microsoft', color: '#00a4ef' },
    { name: 'Meta', color: '#0082fb' },
    { name: 'Amazon', color: '#ff9900' },
  ];
</script>

<section id="marquee" class="mljr-mb-12">
  <h2 class="mljr-h2 mljr-mb-2">Marquee</h2>
  <p class="mljr-text-muted mljr-mb-8">Auto-scrolling content strip for logos, text, or custom content.</p>

  <div class="mljr-space-y-8">
    <!-- Basic Text -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Text Marquee</h3>
      <Marquee items={techItems} />
    </div>

    <CodeExample
      code={`<Marquee items={['Svelte 5', 'TypeScript', 'TailwindCSS', 'Vite']} />`}
      language="svelte"
    />

    <!-- Reverse -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Reverse Direction (No Gradient)</h3>
      <Marquee items={techItems} reverse={true} gradient={false} duration={15} />
    </div>

    <!-- Custom Items with Snippet -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Custom Item Content</h3>
      <Marquee items={techItems} duration={25}>
        {#snippet children(item)}
          <span class="mljr-chip mljr-chip-primary mljr-chip-sm">
            {item}
          </span>
        {/snippet}
      </Marquee>
    </div>

    <!-- Pause on Hover -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Pause on Hover</h3>
      <Marquee items={techItems} pauseOnHover={true} duration={12}>
        {#snippet children(item)}
          <Badge variant="secondary">{item}</Badge>
        {/snippet}
      </Marquee>
      <p class="mljr-text-muted mljr-text-sm mljr-mt-2">Hover to pause the marquee</p>
    </div>

    <!-- Dual Row (opposite directions) -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Dual Row</h3>
      <div class="mljr-space-y-2">
        <Marquee items={techItems} duration={20} />
        <Marquee items={[...techItems].reverse()} duration={20} reverse={true} />
      </div>
    </div>
  </div>
</section>
