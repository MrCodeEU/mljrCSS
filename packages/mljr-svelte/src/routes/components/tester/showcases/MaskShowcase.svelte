<script lang="ts">
  import { Mask, Card } from '$lib';

  const shapes = ['circle', 'squircle', 'hexagon', 'triangle', 'star', 'heart', 'pentagon', 'diamond', 'decagon'] as const;
</script>

<div class="mljr-space-y-8">
  <!-- All Shapes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">All Shapes</h3>
    <div class="mljr-grid mljr-grid-cols-3 mljr-md:grid-cols-5 mljr-gap-6">
      {#each shapes as shape}
        <div class="mljr-text-center">
          <Mask {shape}>
            <div class="mljr-w-20 mljr-h-20 mljr-bg-gradient-primary mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-text-xs mljr-font-bold">
              {shape.slice(0, 3)}
            </div>
          </Mask>
          <p class="mljr-text-xs mljr-text-muted mljr-mt-2 mljr-capitalize">{shape}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- With Images -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Gradient Images</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-4">
      <Mask shape="squircle">
        <div class="mljr-w-24 mljr-h-24" style="background: linear-gradient(135deg, #f97316, #f59e0b)"></div>
      </Mask>
      <Mask shape="hexagon">
        <div class="mljr-w-24 mljr-h-24" style="background: linear-gradient(135deg, #14b8a6, #06b6d4)"></div>
      </Mask>
      <Mask shape="star">
        <div class="mljr-w-24 mljr-h-24" style="background: linear-gradient(135deg, #a855f7, #ec4899)"></div>
      </Mask>
      <Mask shape="heart">
        <div class="mljr-w-24 mljr-h-24" style="background: linear-gradient(135deg, #ef4444, #f97316)"></div>
      </Mask>
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Different Sizes</h3>
    <div class="mljr-flex mljr-items-end mljr-gap-4">
      {#each [12, 16, 20, 24, 32] as size}
        <div class="mljr-text-center">
          <Mask shape="squircle">
            <div class="mljr-bg-gradient-primary" style="width: {size * 4}px; height: {size * 4}px"></div>
          </Mask>
          <p class="mljr-text-xs mljr-text-muted mljr-mt-1">{size * 4}px</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Avatar Gallery -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Team Gallery</h3>
    <Card>
      <div class="mljr-grid mljr-grid-cols-4 mljr-gap-4">
        {#each [
          { initials: 'JD', shape: 'squircle', color: '#f97316' },
          { initials: 'AB', shape: 'hexagon', color: '#14b8a6' },
          { initials: 'CD', shape: 'star', color: '#a855f7' },
          { initials: 'EF', shape: 'circle', color: '#ef4444' },
        ] as member}
          <div class="mljr-text-center">
            <Mask shape={member.shape as 'circle' | 'squircle' | 'hexagon' | 'triangle' | 'star' | 'heart' | 'pentagon' | 'diamond' | 'decagon'}>
              <div
                class="mljr-w-16 mljr-h-16 mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-font-bold"
                style="background: {member.color}"
              >
                {member.initials}
              </div>
            </Mask>
            <p class="mljr-text-xs mljr-text-muted mljr-mt-1 mljr-capitalize">{member.shape}</p>
          </div>
        {/each}
      </div>
    </Card>
  </section>
</div>
