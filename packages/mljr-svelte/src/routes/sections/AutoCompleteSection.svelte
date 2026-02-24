<script lang="ts">
  import { AutoComplete } from '$lib';
  import type { AutoCompleteOption } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';

  const fruits = [
    'Apple', 'Apricot', 'Avocado', 'Banana', 'Blueberry', 'Cherry',
    'Coconut', 'Date', 'Fig', 'Grape', 'Guava', 'Kiwi', 'Lemon',
    'Lime', 'Mango', 'Melon', 'Orange', 'Papaya', 'Peach', 'Pear',
    'Pineapple', 'Plum', 'Pomegranate', 'Raspberry', 'Strawberry',
  ];

  const countries: AutoCompleteOption[] = [
    { value: 'de', label: 'Germany', group: 'Europe' },
    { value: 'fr', label: 'France', group: 'Europe' },
    { value: 'uk', label: 'United Kingdom', group: 'Europe' },
    { value: 'es', label: 'Spain', group: 'Europe' },
    { value: 'us', label: 'United States', group: 'Americas' },
    { value: 'ca', label: 'Canada', group: 'Americas' },
    { value: 'br', label: 'Brazil', group: 'Americas' },
    { value: 'jp', label: 'Japan', group: 'Asia' },
    { value: 'cn', label: 'China', group: 'Asia' },
    { value: 'in', label: 'India', group: 'Asia' },
  ];

  let selectedFruit = $state('');
  let selectedCountry = $state('');
  let selectedFruits = $state<string[]>([]);
</script>

<section id="autocomplete" class="mljr-mb-12">
  <h2 class="mljr-h2 mljr-mb-2">AutoComplete</h2>
  <p class="mljr-text-muted mljr-mb-8">Searchable input with dynamic suggestions and keyboard navigation.</p>

  <div class="mljr-space-y-8">
    <!-- Basic -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Basic AutoComplete</h3>
      <div style="max-width: 360px;">
        <AutoComplete
          options={fruits}
          bind:value={selectedFruit}
          label="Select a fruit"
          placeholder="Type to search..."
          helperText="Start typing to filter options"
        />
      </div>
      {#if selectedFruit}
        <p class="mljr-text-sm mljr-mt-2">Selected: <strong>{selectedFruit}</strong></p>
      {/if}
    </div>

    <CodeExample
      code={`<AutoComplete
  options={['Apple', 'Banana', 'Cherry']}
  bind:value={selected}
  label="Pick a fruit"
  placeholder="Type to search..."
/>`}
      language="svelte"
    />

    <!-- Grouped Options -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">With Grouped Options</h3>
      <div style="max-width: 360px;">
        <AutoComplete
          options={countries}
          bind:value={selectedCountry}
          label="Select a country"
          placeholder="Search countries..."
        />
      </div>
      {#if selectedCountry}
        <p class="mljr-text-sm mljr-mt-2">Selected: <strong>{selectedCountry}</strong></p>
      {/if}
    </div>

    <!-- Multiple Selection -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Multiple Selection</h3>
      <div style="max-width: 400px;">
        <AutoComplete
          options={fruits}
          bind:value={selectedFruits}
          multiple={true}
          label="Favorite fruits"
          placeholder="Add fruits..."
          helperText="Select multiple fruits"
        />
      </div>
      {#if selectedFruits.length > 0}
        <p class="mljr-text-sm mljr-mt-2">Selected: <strong>{selectedFruits.join(', ')}</strong></p>
      {/if}
    </div>

    <!-- Allow Custom Values -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Allow Custom Values</h3>
      <div style="max-width: 360px;">
        <AutoComplete
          options={fruits}
          allowCustom={true}
          label="Fruit or custom value"
          placeholder="Type and press Enter..."
          helperText="Type any value - not just from the list"
        />
      </div>
    </div>
  </div>
</section>
