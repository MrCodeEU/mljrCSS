<script lang="ts">
  import { SelectMenu, Card, Button } from '$lib';
  import type { SelectOption } from '$lib';

  const countries: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' },
    { value: 'ca', label: 'Canada' },
    { value: 'br', label: 'Brazil' },
    { value: 'in', label: 'India' },
    { value: 'cn', label: 'China' },
  ];

  const tags: SelectOption[] = [
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'solid', label: 'SolidJS' },
    { value: 'qwik', label: 'Qwik' },
    { value: 'astro', label: 'Astro' },
    { value: 'nuxt', label: 'Nuxt' },
    { value: 'next', label: 'Next.js' },
    { value: 'remix', label: 'Remix' },
  ];

  let country = $state('');
  let selectedTags = $state<string[]>([]);
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic SelectMenu</h3>
    <div class="mljr-space-y-2">
      <SelectMenu options={countries} bind:value={country} placeholder="Choose a country" />
      {#if country}
        <p class="mljr-text-xs mljr-text-muted">Selected: {country}</p>
      {/if}
    </div>
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label</h3>
    <SelectMenu
      options={countries}
      label="Country"
      placeholder="Select your country"
    />
  </section>

  <!-- Searchable -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Searchable</h3>
    <SelectMenu
      options={countries}
      label="Country (searchable)"
      searchable
      placeholder="Search and select..."
    />
  </section>

  <!-- Multi-select -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Multi-select</h3>
    <div class="mljr-space-y-2">
      <SelectMenu
        options={tags}
        label="Technologies"
        multiple
        searchable
        placeholder="Select frameworks..."
        bind:value={selectedTags}
      />
      {#if selectedTags.length > 0}
        <p class="mljr-text-xs mljr-text-muted">Selected: {selectedTags.join(', ')}</p>
      {/if}
    </div>
  </section>

  <!-- With Error -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Error State</h3>
    <SelectMenu
      options={countries}
      label="Country"
      placeholder="Select a country"
      error
      errorMessage="Please select a country"
    />
  </section>

  <!-- Required + Disabled -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">States</h3>
    <div class="mljr-space-y-3">
      <SelectMenu options={countries} label="Required Field" required placeholder="Select..." />
      <SelectMenu options={countries} label="Disabled" value="us" disabled />
    </div>
  </section>

  <!-- Form Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Profile Form</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Developer Profile</h4>
      <div class="mljr-space-y-4">
        <SelectMenu
          options={countries}
          label="Country"
          searchable
          required
          placeholder="Select country..."
        />
        <SelectMenu
          options={tags}
          label="Primary Stack"
          multiple
          searchable
          placeholder="Select technologies..."
        />
        <Button variant="primary" fullWidth>Save Profile</Button>
      </div>
    </Card>
  </section>
</div>
