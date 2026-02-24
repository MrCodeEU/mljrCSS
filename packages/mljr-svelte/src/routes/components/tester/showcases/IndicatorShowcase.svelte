<script lang="ts">
  import { Indicator, Avatar, Badge, Button, Card, Icon } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Indicator</h3>
    <div class="mljr-flex mljr-gap-6 mljr-flex-wrap">
      <Indicator>
        <Avatar initials="JD" />
        {#snippet indicator()}
          <span class="mljr-badge mljr-badge-error mljr-badge-sm mljr-badge-solid">3</span>
        {/snippet}
      </Indicator>

      <Indicator position="top-left">
        <Avatar initials="AB" />
        {#snippet indicator()}
          <span class="mljr-badge mljr-badge-success mljr-badge-sm mljr-badge-solid">✓</span>
        {/snippet}
      </Indicator>

      <Indicator position="bottom-right">
        <Avatar initials="CD" />
        {#snippet indicator()}
          <span class="mljr-badge mljr-badge-warning mljr-badge-sm mljr-badge-solid">!</span>
        {/snippet}
      </Indicator>
    </div>
  </section>

  <!-- Dot Indicators -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Dot Indicators</h3>
    <div class="mljr-flex mljr-gap-6 mljr-flex-wrap">
      {#each ['primary', 'success', 'warning', 'error', 'secondary', 'info'] as const as color}
        <Indicator {color} dot position="top-right">
          <div class="mljr-w-14 mljr-h-14 mljr-bg-secondary mljr-rounded-xl mljr-flex mljr-items-center mljr-justify-center mljr-text-xs mljr-text-muted mljr-capitalize">
            {color}
          </div>
        </Indicator>
      {/each}
    </div>
  </section>

  <!-- Ping Animation -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Ping Animation (Online Status)</h3>
    <div class="mljr-flex mljr-gap-6 mljr-flex-wrap">
      <Indicator color="success" dot ping position="bottom-right">
        <Avatar initials="JD" />
      </Indicator>
      <Indicator color="warning" dot ping position="bottom-right">
        <Avatar initials="AB" />
      </Indicator>
      <Indicator color="error" dot ping position="bottom-right">
        <Avatar initials="CD" />
      </Indicator>
    </div>
    <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Online, Away, Busy</p>
  </section>

  <!-- Positions -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">All Positions</h3>
    <div class="mljr-flex mljr-gap-6 mljr-flex-wrap">
      {#each ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const as pos}
        <div class="mljr-text-center">
          <Indicator color="primary" dot position={pos}>
            <div class="mljr-w-14 mljr-h-14 mljr-bg-secondary mljr-rounded-xl"></div>
          </Indicator>
          <p class="mljr-text-xs mljr-text-muted mljr-mt-2">{pos}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Dot Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Dot Sizes</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-8">
      {#each ['sm', 'md', 'lg'] as const as size}
        <div class="mljr-text-center">
          <Indicator color="primary" dot {size} position="top-right">
            <div class="mljr-w-14 mljr-h-14 mljr-bg-secondary mljr-rounded-xl"></div>
          </Indicator>
          <p class="mljr-text-xs mljr-text-muted mljr-mt-2">{size}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Real-world: Nav Icons with Badges -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Notification Icons</h3>
    <Card>
      <div class="mljr-flex mljr-gap-6">
        <Indicator position="top-right">
          <Button variant="ghost" size="sm">
            <Icon icon="mdi:bell" size={24} />
          </Button>
          {#snippet indicator()}
            <span class="mljr-badge mljr-badge-error mljr-badge-xs mljr-badge-solid">5</span>
          {/snippet}
        </Indicator>

        <Indicator color="success" dot ping position="top-right">
          <Button variant="ghost" size="sm">
            <Icon icon="mdi:message" size={24} />
          </Button>
        </Indicator>

        <Indicator position="top-right">
          <Button variant="ghost" size="sm">
            <Icon icon="mdi:cart" size={24} />
          </Button>
          {#snippet indicator()}
            <span class="mljr-badge mljr-badge-primary mljr-badge-xs mljr-badge-solid">12</span>
          {/snippet}
        </Indicator>
      </div>
    </Card>
  </section>
</div>
