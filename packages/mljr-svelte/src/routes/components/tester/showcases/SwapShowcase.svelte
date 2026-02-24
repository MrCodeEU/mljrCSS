<script lang="ts">
  import { Swap, Icon, Card } from '$lib';

  let active1 = $state(false);
  let active2 = $state(false);
  let active3 = $state(false);
  let active4 = $state(false);
  let menuOpen = $state(false);
  let liked = $state(false);
  let bookmarked = $state(false);
</script>

<div class="mljr-space-y-8">
  <!-- Rotate Animation -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Rotate Animation</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-4">
      <Swap animation="rotate" bind:active={active1}>
        {#snippet on()}
          <Icon icon="mdi:close" size={32} class="mljr-text-error-500" />
        {/snippet}
        {#snippet off()}
          <Icon icon="mdi:check" size={32} class="mljr-text-success-500" />
        {/snippet}
      </Swap>
      <span class="mljr-text-sm mljr-text-muted">Active: {active1}</span>
    </div>
  </section>

  <!-- Flip Animation -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Flip Animation</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-4">
      <Swap animation="flip" bind:active={active2}>
        {#snippet on()}
          <Icon icon="mdi:eye-off" size={32} class="mljr-text-muted" />
        {/snippet}
        {#snippet off()}
          <Icon icon="mdi:eye" size={32} class="mljr-text-primary-500" />
        {/snippet}
      </Swap>
      <span class="mljr-text-sm mljr-text-muted">{active2 ? 'Hidden' : 'Visible'}</span>
    </div>
  </section>

  <!-- Fade Animation -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Fade Animation</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-4">
      <Swap animation="fade" bind:active={active3}>
        {#snippet on()}
          <Icon icon="mdi:pause" size={32} class="mljr-text-warning-500" />
        {/snippet}
        {#snippet off()}
          <Icon icon="mdi:play" size={32} class="mljr-text-success-500" />
        {/snippet}
      </Swap>
      <span class="mljr-text-sm mljr-text-muted">{active3 ? 'Paused' : 'Playing'}</span>
    </div>
  </section>

  <!-- No Animation -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">No Animation</h3>
    <Swap animation="none" bind:active={active4}>
      {#snippet on()}
        <Icon icon="mdi:volume-off" size={32} class="mljr-text-muted" />
      {/snippet}
      {#snippet off()}
        <Icon icon="mdi:volume-high" size={32} class="mljr-text-primary-500" />
      {/snippet}
    </Swap>
  </section>

  <!-- Practical Examples -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Practical Examples</h3>
    <Card>
      <div class="mljr-flex mljr-flex-wrap mljr-gap-6">
        <!-- Hamburger Menu -->
        <div class="mljr-text-center">
          <Swap animation="rotate" bind:active={menuOpen}>
            {#snippet on()}
              <Icon icon="mdi:close" size={28} />
            {/snippet}
            {#snippet off()}
              <Icon icon="mdi:menu" size={28} />
            {/snippet}
          </Swap>
          <p class="mljr-text-xs mljr-text-muted mljr-mt-1">Menu Toggle</p>
        </div>

        <!-- Like Button -->
        <div class="mljr-text-center">
          <Swap animation="flip" bind:active={liked}>
            {#snippet on()}
              <Icon icon="mdi:heart" size={28} class="mljr-text-error-500" />
            {/snippet}
            {#snippet off()}
              <Icon icon="mdi:heart-outline" size={28} class="mljr-text-muted" />
            {/snippet}
          </Swap>
          <p class="mljr-text-xs mljr-text-muted mljr-mt-1">{liked ? 'Liked' : 'Like'}</p>
        </div>

        <!-- Bookmark -->
        <div class="mljr-text-center">
          <Swap animation="fade" bind:active={bookmarked}>
            {#snippet on()}
              <Icon icon="mdi:bookmark" size={28} class="mljr-text-primary-500" />
            {/snippet}
            {#snippet off()}
              <Icon icon="mdi:bookmark-outline" size={28} class="mljr-text-muted" />
            {/snippet}
          </Swap>
          <p class="mljr-text-xs mljr-text-muted mljr-mt-1">{bookmarked ? 'Saved' : 'Save'}</p>
        </div>

        <!-- Dark Mode -->
        <div class="mljr-text-center">
          <Swap animation="rotate">
            {#snippet on()}
              <Icon icon="mdi:weather-night" size={28} class="mljr-text-primary-500" />
            {/snippet}
            {#snippet off()}
              <Icon icon="mdi:weather-sunny" size={28} class="mljr-text-warning-500" />
            {/snippet}
          </Swap>
          <p class="mljr-text-xs mljr-text-muted mljr-mt-1">Theme</p>
        </div>
      </div>
    </Card>
  </section>
</div>
