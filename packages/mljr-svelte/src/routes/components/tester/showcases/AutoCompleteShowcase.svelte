<script lang="ts">
  import { AutoComplete } from '$lib';
  import type { AutoCompleteOption } from '$lib';

  const fruits = [
    'Apple', 'Apricot', 'Avocado', 'Banana', 'Blueberry', 'Cherry',
    'Coconut', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Lime', 'Mango',
    'Melon', 'Orange', 'Papaya', 'Peach', 'Pear', 'Pineapple',
    'Plum', 'Pomegranate', 'Raspberry', 'Strawberry', 'Watermelon',
  ];

  const countries: AutoCompleteOption[] = [
    { value: 'de', label: 'Germany', group: 'Europe' },
    { value: 'fr', label: 'France', group: 'Europe' },
    { value: 'uk', label: 'United Kingdom', group: 'Europe' },
    { value: 'es', label: 'Spain', group: 'Europe' },
    { value: 'it', label: 'Italy', group: 'Europe' },
    { value: 'us', label: 'United States', group: 'Americas' },
    { value: 'ca', label: 'Canada', group: 'Americas' },
    { value: 'br', label: 'Brazil', group: 'Americas' },
    { value: 'jp', label: 'Japan', group: 'Asia' },
    { value: 'cn', label: 'China', group: 'Asia' },
    { value: 'in', label: 'India', group: 'Asia' },
  ];

  let singleValue = $state('');
  let multipleValue = $state<string[]>([]);
  let countryValue = $state('');
  let customValue = $state('');
</script>

<div class="mljr-space-y-8">
  <!-- Single Select -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Single Selection</h3>
    <div style="max-width: 360px;">
      <AutoComplete
        options={fruits}
        bind:value={singleValue}
        label="Favorite fruit"
        placeholder="Type to search..."
        helperText="Start typing to filter"
      />
    </div>
    {#if singleValue}
      <p class="mljr-text-sm mljr-mt-2">Selected: <strong>{singleValue}</strong></p>
    {/if}
  </section>

  <!-- Grouped Options -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Grouped Options</h3>
    <div style="max-width: 360px;">
      <AutoComplete
        options={countries}
        bind:value={countryValue}
        label="Country"
        placeholder="Search countries..."
      />
    </div>
    {#if countryValue}
      <p class="mljr-text-sm mljr-mt-2">Selected: <strong>{countryValue}</strong></p>
    {/if}
  </section>

  <!-- Multiple Selection -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Multiple Selection</h3>
    <div style="max-width: 400px;">
      <AutoComplete
        options={fruits}
        bind:value={multipleValue}
        multiple={true}
        label="Favorite fruits (multiple)"
        placeholder="Add fruits..."
        helperText="Select multiple items"
      />
    </div>
    {#if multipleValue.length > 0}
      <p class="mljr-text-sm mljr-mt-2">Selected: <strong>{multipleValue.join(', ')}</strong></p>
    {/if}
  </section>

  <!-- Allow Custom Values -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Allow Custom Values</h3>
    <div style="max-width: 360px;">
      <AutoComplete
        options={fruits}
        bind:value={customValue}
        allowCustom={true}
        label="Fruit or custom"
        placeholder="Type anything..."
        helperText="Not limited to the list"
      />
    </div>
    {#if customValue}
      <p class="mljr-text-sm mljr-mt-2">Value: <strong>{customValue}</strong></p>
    {/if}
  </section>

  <!-- Error State -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Error State</h3>
    <div style="max-width: 360px;">
      <AutoComplete
        options={fruits}
        label="Required field"
        placeholder="Select an option..."
        error={true}
        errorMessage="Please select a value"
      />
    </div>
  </section>

  <!-- Disabled -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled</h3>
    <div style="max-width: 360px;">
      <AutoComplete
        options={fruits}
        value="Banana"
        label="Disabled input"
        placeholder="Type to search..."
        disabled={true}
      />
    </div>
  </section>
</div>
