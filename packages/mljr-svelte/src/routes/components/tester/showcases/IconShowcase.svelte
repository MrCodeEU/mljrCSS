<script lang="ts">
  import { Icon } from '$lib';

  const commonIcons = [
    'mdi:home', 'mdi:account', 'mdi:star', 'mdi:check', 'mdi:close',
    'mdi:heart', 'mdi:settings', 'mdi:magnify', 'mdi:bell', 'mdi:email',
    'mdi:phone', 'mdi:calendar', 'mdi:clock', 'mdi:map-marker', 'mdi:lock',
  ];

  const sizes = [16, 20, 24, 32, 48];

  const colors = [
    { name: 'Primary', color: 'var(--mljr-primary-500)' },
    { name: 'Secondary', color: 'var(--mljr-secondary-500)' },
    { name: 'Success', color: 'var(--mljr-success)' },
    { name: 'Warning', color: 'var(--mljr-warning)' },
    { name: 'Error', color: 'var(--mljr-error)' },
  ];
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Common Icons (mdi prefix)</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-4">
      {#each commonIcons as icon}
        <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-1" style="min-width:70px;">
          <Icon {icon} size={28} />
          <span class="mljr-text-xs mljr-text-muted" style="font-size:0.65rem;text-align:center;">{icon.replace('mdi:', '')}</span>
        </div>
      {/each}
    </div>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Size Variants</h3>
    <div class="mljr-flex mljr-items-end mljr-gap-6 mljr-flex-wrap">
      {#each sizes as size}
        <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-1">
          <Icon icon="mdi:star" {size} />
          <span class="mljr-text-xs mljr-text-muted">{size}px</span>
        </div>
      {/each}
    </div>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Color Variants</h3>
    <div class="mljr-flex mljr-gap-6 mljr-flex-wrap">
      {#each colors as { name, color }}
        <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-1">
          <Icon icon="mdi:heart" size={32} {color} />
          <span class="mljr-text-xs mljr-text-muted">{name}</span>
        </div>
      {/each}
    </div>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Transformations</h3>
    <div class="mljr-flex mljr-gap-6 mljr-items-center mljr-flex-wrap">
      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-1">
        <Icon icon="mdi:arrow-right" size={32} />
        <span class="mljr-text-xs mljr-text-muted">Normal</span>
      </div>
      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-1">
        <Icon icon="mdi:arrow-right" size={32} hFlip={true} />
        <span class="mljr-text-xs mljr-text-muted">hFlip</span>
      </div>
      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-1">
        <Icon icon="mdi:arrow-right" size={32} vFlip={true} />
        <span class="mljr-text-xs mljr-text-muted">vFlip</span>
      </div>
      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-1">
        <Icon icon="mdi:arrow-right" size={32} rotate={1} />
        <span class="mljr-text-xs mljr-text-muted">rotate 90°</span>
      </div>
      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-1">
        <Icon icon="mdi:arrow-right" size={32} rotate={2} />
        <span class="mljr-text-xs mljr-text-muted">rotate 180°</span>
      </div>
      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-1">
        <Icon icon="mdi:arrow-right" size={32} rotate={3} />
        <span class="mljr-text-xs mljr-text-muted">rotate 270°</span>
      </div>
    </div>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Other Icon Sets</h3>
    <div class="mljr-flex mljr-gap-6 mljr-flex-wrap">
      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-1">
        <Icon icon="ph:sun" size={32} />
        <span class="mljr-text-xs mljr-text-muted">ph:sun</span>
      </div>
      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-1">
        <Icon icon="lucide:github" size={32} />
        <span class="mljr-text-xs mljr-text-muted">lucide:github</span>
      </div>
      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-1">
        <Icon icon="logos:svelte-icon" size={32} />
        <span class="mljr-text-xs mljr-text-muted">logos:svelte-icon</span>
      </div>
      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-1">
        <Icon icon="tabler:brand-typescript" size={32} />
        <span class="mljr-text-xs mljr-text-muted">tabler:brand-typescript</span>
      </div>
    </div>
  </section>
</div>
