<script lang="ts">
  import { AvatarGroup, Card } from '$lib';
  import type { AvatarData } from '$lib';

  const team: AvatarData[] = [
    { initials: 'JD', alt: 'Jane Doe' },
    { initials: 'AB', alt: 'Alice Brown' },
    { initials: 'CD', alt: 'Charlie Davis' },
    { initials: 'EF', alt: 'Eve Foster' },
    { initials: 'GH', alt: 'Grace Hall' },
    { initials: 'IJ', alt: 'Ivan Jones' },
    { initials: 'KL', alt: 'Kate Lee' },
  ];
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic AvatarGroup</h3>
    <AvatarGroup avatars={team} />
  </section>

  <!-- With Max -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Max Visible</h3>
    <div class="mljr-space-y-3">
      <div class="mljr-flex mljr-items-center mljr-gap-4">
        <AvatarGroup avatars={team} max={3} />
        <span class="mljr-text-sm mljr-text-muted">max={3}</span>
      </div>
      <div class="mljr-flex mljr-items-center mljr-gap-4">
        <AvatarGroup avatars={team} max={5} />
        <span class="mljr-text-sm mljr-text-muted">max={5}</span>
      </div>
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-space-y-4">
      {#each (['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const) as size}
        <div class="mljr-flex mljr-items-center mljr-gap-4">
          <AvatarGroup avatars={team.slice(0, 4)} {size} />
          <span class="mljr-text-sm mljr-text-muted">{size}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Shapes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Shapes</h3>
    <div class="mljr-space-y-3">
      <div class="mljr-flex mljr-items-center mljr-gap-4">
        <AvatarGroup avatars={team.slice(0, 5)} shape="circle" />
        <span class="mljr-text-sm mljr-text-muted">circle</span>
      </div>
      <div class="mljr-flex mljr-items-center mljr-gap-4">
        <AvatarGroup avatars={team.slice(0, 5)} shape="square" />
        <span class="mljr-text-sm mljr-text-muted">square</span>
      </div>
    </div>
  </section>

  <!-- Variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Color Variants</h3>
    <div class="mljr-space-y-3">
      <AvatarGroup avatars={team.slice(0, 5)} variant="primary" />
      <AvatarGroup avatars={team.slice(0, 5)} variant="secondary" />
      <AvatarGroup avatars={team.slice(0, 5)} variant="accent" />
    </div>
  </section>

  <!-- With Ring -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Ring Border</h3>
    <AvatarGroup avatars={team} ring />
  </section>

  <!-- Real-world Examples -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Project Team Card</h3>
    <Card>
      <div class="mljr-flex mljr-items-center mljr-justify-between mljr-mb-4">
        <div>
          <h4 class="mljr-font-semibold">Design System v2.0</h4>
          <p class="mljr-text-xs mljr-text-muted">Active project</p>
        </div>
        <span class="mljr-badge mljr-badge-success mljr-badge-sm">In Progress</span>
      </div>
      <div class="mljr-flex mljr-items-center mljr-justify-between">
        <div class="mljr-flex mljr-items-center mljr-gap-2">
          <AvatarGroup avatars={team} max={4} size="sm" ring />
          <span class="mljr-text-sm mljr-text-muted">{team.length} members</span>
        </div>
        <div class="mljr-text-sm mljr-text-muted">Due: Mar 2026</div>
      </div>
    </Card>
  </section>
</div>
