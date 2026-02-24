<script lang="ts">
  import { Skeleton, Card, Button } from '$lib';

  let loading = $state(true);

  function toggleLoading() {
    loading = !loading;
  }
</script>

<div class="mljr-space-y-8">
  <!-- Basic Skeleton -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Skeleton</h3>
    <Skeleton />
  </section>

  <!-- Variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Variants</h3>
    <div class="mljr-space-y-3">
      <Skeleton variant="text" />
      <Skeleton variant="image" />
      <Skeleton variant="avatar" class="mljr-w-12 mljr-h-12" />
    </div>
  </section>

  <!-- Different Widths -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Different Widths</h3>
    <div class="mljr-space-y-2">
      <Skeleton width="100%" />
      <Skeleton width="75%" />
      <Skeleton width="50%" />
      <Skeleton width="25%" />
    </div>
  </section>

  <!-- Different Heights -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Different Heights</h3>
    <div class="mljr-flex mljr-items-end mljr-gap-3">
      <Skeleton height="20px" class="mljr-w-24" />
      <Skeleton height="40px" class="mljr-w-24" />
      <Skeleton height="60px" class="mljr-w-24" />
      <Skeleton height="80px" class="mljr-w-24" />
      <Skeleton height="100px" class="mljr-w-24" />
    </div>
  </section>

  <!-- Text Loading Pattern -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Text Loading Pattern</h3>
    <div class="mljr-space-y-2">
      <Skeleton width="100%" />
      <Skeleton width="95%" />
      <Skeleton width="90%" />
      <Skeleton width="60%" />
    </div>
  </section>

  <!-- Avatar + Text -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Avatar with Text</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-3">
      <Skeleton variant="avatar" class="mljr-w-12 mljr-h-12" />
      <div class="mljr-flex-1 mljr-space-y-2">
        <Skeleton width="40%" />
        <Skeleton width="60%" />
      </div>
    </div>
  </section>

  <!-- Card Loading -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Card Loading</h3>
    <Card>
      <Skeleton variant="image" height="200px" class="mljr-mb-4" />
      <Skeleton width="60%" class="mljr-mb-2" />
      <Skeleton width="100%" class="mljr-mb-1" />
      <Skeleton width="100%" class="mljr-mb-1" />
      <Skeleton width="80%" />
    </Card>
  </section>

  <!-- List Loading -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">List Loading</h3>
    <Card>
      <div class="mljr-space-y-4">
        {#each Array(4) as _}
          <div class="mljr-flex mljr-items-center mljr-gap-3">
            <Skeleton variant="avatar" class="mljr-w-10 mljr-h-10" />
            <div class="mljr-flex-1 mljr-space-y-2">
              <Skeleton width="30%" />
              <Skeleton width="50%" />
            </div>
          </div>
        {/each}
      </div>
    </Card>
  </section>

  <!-- Grid Loading -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Grid Loading</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-3 mljr-gap-4">
      {#each Array(6) as _}
        <Card>
          <Skeleton variant="image" height="150px" class="mljr-mb-3" />
          <Skeleton width="70%" class="mljr-mb-2" />
          <Skeleton width="100%" class="mljr-mb-1" />
          <Skeleton width="90%" />
        </Card>
      {/each}
    </div>
  </section>

  <!-- Table Loading -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Table Loading</h3>
    <Card>
      <div class="mljr-space-y-3">
        {#each Array(5) as _}
          <div class="mljr-flex mljr-gap-4">
            <Skeleton width="20%" />
            <Skeleton width="30%" />
            <Skeleton width="25%" />
            <Skeleton width="25%" />
          </div>
        {/each}
      </div>
    </Card>
  </section>

  <!-- Interactive Demo -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Interactive Demo</h3>
    <div class="mljr-space-y-4">
      <Button variant="primary" onclick={toggleLoading}>
        {loading ? 'Show Content' : 'Show Loading'}
      </Button>

      <Card>
        {#if loading}
          <div class="mljr-space-y-4">
            <div class="mljr-flex mljr-items-center mljr-gap-3">
              <Skeleton variant="avatar" class="mljr-w-16 mljr-h-16" />
              <div class="mljr-flex-1 mljr-space-y-2">
                <Skeleton width="40%" />
                <Skeleton width="60%" />
              </div>
            </div>
            <Skeleton variant="image" height="200px" />
            <div class="mljr-space-y-2">
              <Skeleton width="100%" />
              <Skeleton width="95%" />
              <Skeleton width="90%" />
              <Skeleton width="70%" />
            </div>
          </div>
        {:else}
          <div class="mljr-space-y-4">
            <div class="mljr-flex mljr-items-center mljr-gap-3">
              <div class="mljr-w-16 mljr-h-16 mljr-bg-gradient-primary mljr-rounded-full"></div>
              <div>
                <div class="mljr-font-medium">John Doe</div>
                <div class="mljr-text-sm mljr-text-muted">Software Engineer</div>
              </div>
            </div>
            <div class="mljr-aspect-video mljr-bg-gradient-secondary mljr-rounded-lg mljr-flex mljr-items-center mljr-justify-center">
              <span class="mljr-text-white mljr-text-xl">Content Image</span>
            </div>
            <p class="mljr-text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>
        {/if}
      </Card>
    </div>
  </section>

  <!-- Profile Card Loading -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Profile Card Loading</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-4">
      <Card>
        <div class="mljr-text-center">
          <Skeleton variant="avatar" class="mljr-w-24 mljr-h-24 mljr-mx-auto mljr-mb-4" />
          <Skeleton width="50%" class="mljr-mx-auto mljr-mb-2" />
          <Skeleton width="70%" class="mljr-mx-auto mljr-mb-4" />
          <div class="mljr-flex mljr-gap-2 mljr-justify-center">
            <Skeleton width="80px" height="36px" />
            <Skeleton width="80px" height="36px" />
          </div>
        </div>
      </Card>

      <Card>
        <div class="mljr-text-center">
          <div class="mljr-w-24 mljr-h-24 mljr-mx-auto mljr-mb-4 mljr-bg-gradient-primary mljr-rounded-full"></div>
          <h4 class="mljr-h5 mljr-mb-1">Jane Smith</h4>
          <p class="mljr-text-sm mljr-text-muted mljr-mb-4">Product Designer</p>
          <div class="mljr-flex mljr-gap-2 mljr-justify-center">
            <button class="mljr-btn mljr-btn-primary mljr-btn-sm">Follow</button>
            <button class="mljr-btn mljr-btn-outline-primary mljr-btn-sm">Message</button>
          </div>
        </div>
      </Card>
    </div>
  </section>
</div>
