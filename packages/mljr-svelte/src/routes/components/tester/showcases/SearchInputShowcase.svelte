<script lang="ts">
  import { SearchInput, Card, Badge } from '$lib';

  let value1 = $state('');
  let value2 = $state('');
  let value3 = $state('');
  let isLoading = $state(false);
  let searchResults = $state<string[]>([]);

  const sampleData = [
    'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
    'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'
  ];

  function handleSearch(val: string) {
    if (!val) {
      searchResults = [];
      return;
    }
    isLoading = true;
    setTimeout(() => {
      searchResults = sampleData.filter(item =>
        item.toLowerCase().includes(val.toLowerCase())
      );
      isLoading = false;
    }, 600);
  }
</script>

<div class="mljr-space-y-8">
  <!-- Basic Search -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Search</h3>
    <SearchInput bind:value={value1} />
    {#if value1}
      <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Query: "{value1}"</p>
    {/if}
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label</h3>
    <SearchInput
      label="Search products"
      placeholder="Search by name or SKU..."
      bind:value={value2}
    />
  </section>

  <!-- Loading State -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Loading State</h3>
    <SearchInput
      label="Search fruits"
      placeholder="Type to search..."
      loading={isLoading}
      bind:value={value3}
      onsearch={handleSearch}
    />
    {#if searchResults.length > 0}
      <div class="mljr-mt-3 mljr-flex mljr-flex-wrap mljr-gap-2">
        {#each searchResults as result}
          <Badge variant="secondary">{result}</Badge>
        {/each}
      </div>
    {:else if value3 && !isLoading}
      <p class="mljr-text-sm mljr-text-muted mljr-mt-2">No results found for "{value3}"</p>
    {/if}
  </section>

  <!-- Not Clearable -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Without Clear Button</h3>
    <SearchInput
      placeholder="Search without clear..."
      clearable={false}
    />
  </section>

  <!-- Disabled -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled</h3>
    <SearchInput
      placeholder="Search disabled"
      disabled
    />
  </section>

  <!-- In a Card as Search Bar -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Site Search Example</h3>
    <Card>
      <div class="mljr-space-y-4">
        <SearchInput
          placeholder="Search documentation, components, guides..."
          onsearch={(v) => { value1 = v; }}
        />
        <div class="mljr-text-sm mljr-text-muted">
          <strong>Popular searches:</strong>
          <span class="mljr-ml-2">Button, Card, Modal, Navbar, Form</span>
        </div>
      </div>
    </Card>
  </section>
</div>
