<script lang="ts">
  import { Rating, Card, Icon } from '$lib';

  let value1 = $state(3);
  let value2 = $state(4);
  let value3 = $state(0);
  let halfValue = $state(3.5);
</script>

<div class="mljr-space-y-8">
  <!-- Basic Rating -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Rating</h3>
    <div class="mljr-space-y-2">
      <Rating bind:value={value1} />
      <p class="mljr-text-xs mljr-text-muted">Selected: {value1} / 5</p>
    </div>
  </section>

  <!-- Read-Only -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Read-Only</h3>
    <div class="mljr-space-y-3">
      <Rating value={1} readonly />
      <Rating value={2} readonly />
      <Rating value={3} readonly />
      <Rating value={4} readonly />
      <Rating value={5} readonly />
    </div>
  </section>

  <!-- Half Stars -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Half Stars</h3>
    <div class="mljr-space-y-2">
      <Rating value={0.5} readonly allowHalf />
      <Rating value={1.5} readonly allowHalf />
      <Rating value={2.5} readonly allowHalf />
      <Rating value={3.5} readonly allowHalf />
      <Rating value={4.5} readonly allowHalf />
      <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Half-star increments</p>
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-space-y-3">
      <Rating value={3} readonly size="sm" />
      <Rating value={3} readonly />
      <Rating value={3} readonly size="lg" />
    </div>
  </section>

  <!-- Max Count -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Different Max Values</h3>
    <div class="mljr-space-y-3">
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Out of 3</p>
        <Rating bind:value={value3} max={3} />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Out of 7</p>
        <Rating value={5} readonly max={7} />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Out of 10</p>
        <Rating value={8} readonly max={10} />
      </div>
    </div>
  </section>

  <!-- Show Value -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Show Value</h3>
    <Rating bind:value={value2} showValue />
    <p class="mljr-text-sm mljr-text-muted mljr-mt-2">Rating: {value2} / 5</p>
  </section>

  <!-- Product Review Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Product Reviews</h3>
    <Card>
      <div class="mljr-space-y-4">
        <div class="mljr-flex mljr-items-center mljr-gap-4">
          <div class="mljr-text-center">
            <div class="mljr-text-5xl mljr-font-bold">4.3</div>
            <Rating value={4.3} readonly allowHalf size="sm" />
            <div class="mljr-text-sm mljr-text-muted mljr-mt-1">128 reviews</div>
          </div>
          <div class="mljr-flex-1 mljr-space-y-2">
            {#each [{ stars: 5, pct: 60 }, { stars: 4, pct: 25 }, { stars: 3, pct: 10 }, { stars: 2, pct: 3 }, { stars: 1, pct: 2 }] as row}
              <div class="mljr-flex mljr-items-center mljr-gap-2">
                <span class="mljr-text-xs mljr-w-4">{row.stars}</span>
                <Icon icon="mdi:star" size={12} class="mljr-text-warning-400" />
                <div class="mljr-flex-1 mljr-h-2 mljr-bg-gray-200 dark:mljr-bg-gray-700 mljr-rounded-full">
                  <div
                    class="mljr-h-full mljr-bg-warning-400 mljr-rounded-full"
                    style="width: {row.pct}%"
                  ></div>
                </div>
                <span class="mljr-text-xs mljr-text-muted mljr-w-6">{row.pct}%</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </Card>
  </section>

  <!-- Individual Reviews -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Individual Reviews</h3>
    <div class="mljr-space-y-4">
      {#each [
        { name: 'John D.', rating: 5, comment: 'Absolutely love this product! Best purchase I made this year.' },
        { name: 'Sarah M.', rating: 4, comment: 'Great quality, fast shipping. Would recommend to friends.' },
        { name: 'Bob J.', rating: 3, comment: 'Decent product but could be improved in a few areas.' }
      ] as review}
        <Card>
          <div class="mljr-flex mljr-items-start mljr-gap-3">
            <div class="mljr-w-10 mljr-h-10 mljr-bg-gradient-primary mljr-rounded-full mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-font-medium mljr-text-sm">
              {review.name[0]}
            </div>
            <div class="mljr-flex-1">
              <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-mb-1">
                <span class="mljr-font-medium mljr-text-sm">{review.name}</span>
                <Rating value={review.rating} readonly size="sm" />
              </div>
              <p class="mljr-text-sm mljr-text-secondary">{review.comment}</p>
            </div>
          </div>
        </Card>
      {/each}
    </div>
  </section>

  <!-- Interactive Feedback -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Interactive Feedback Form</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Rate your experience</h4>
      <div class="mljr-space-y-3">
        <div class="mljr-flex mljr-items-center mljr-justify-between">
          <span class="mljr-text-sm">Overall Experience</span>
          <Rating bind:value={value1} />
        </div>
        <div class="mljr-flex mljr-items-center mljr-justify-between">
          <span class="mljr-text-sm">Customer Service</span>
          <Rating bind:value={value2} />
        </div>
        <div class="mljr-flex mljr-items-center mljr-justify-between">
          <span class="mljr-text-sm">Value for Money</span>
          <Rating bind:value={value3} />
        </div>
      </div>
    </Card>
  </section>
</div>
