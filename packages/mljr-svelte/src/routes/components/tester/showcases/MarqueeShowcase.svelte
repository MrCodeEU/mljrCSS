<script lang="ts">
  import { Marquee, Badge } from '$lib';

  const techItems = [
    'Svelte 5', 'TypeScript', 'TailwindCSS', 'Vite', 'pnpm', 'Vitest', 'Playwright', 'Turborepo',
  ];
</script>

<div class="mljr-space-y-8">
  <!-- Default -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Default Text Marquee (with gradient fade)</h3>
    <Marquee items={techItems} />
  </section>

  <!-- Reverse -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Reversed Direction</h3>
    <Marquee items={techItems} reverse={true} gradient={false} duration={15} />
  </section>

  <!-- Custom Chips -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Item Snippet (Chips)</h3>
    <Marquee items={techItems} duration={25} pauseOnHover={true}>
      {#snippet children(item)}
        <span class="mljr-chip mljr-chip-primary mljr-chip-sm">{item}</span>
      {/snippet}
    </Marquee>
    <p class="mljr-text-muted mljr-text-sm mljr-mt-2">Hover to pause</p>
  </section>

  <!-- Badge Row -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Badge Variant</h3>
    <Marquee items={techItems} pauseOnHover={true}>
      {#snippet children(item)}
        <Badge variant="secondary">{item}</Badge>
      {/snippet}
    </Marquee>
  </section>

  <!-- Dual Row -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Dual Row (Opposite Directions)</h3>
    <div class="mljr-space-y-2">
      <Marquee items={techItems} duration={20} />
      <Marquee items={[...techItems].reverse()} duration={20} reverse={true} />
    </div>
  </section>

  <!-- No gradient, faster -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Fast, No Gradient, Separator</h3>
    <Marquee items={techItems} gradient={false} duration={8} separator="•" />
  </section>
</div>
