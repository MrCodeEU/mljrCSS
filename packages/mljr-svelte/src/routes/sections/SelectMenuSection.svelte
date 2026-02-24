<script lang="ts">
  import { Card, SelectMenu, type SelectOption, CodeExample } from '$lib';

  const frameworks: SelectOption[] = [
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'solid', label: 'SolidJS' },
    { value: 'qwik', label: 'Qwik' },
  ];

  const countries: SelectOption[] = [
    { value: 'at', label: 'Austria' },
    { value: 'de', label: 'Germany' },
    { value: 'ch', label: 'Switzerland' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'us', label: 'United States' },
    { value: 'fr', label: 'France' },
    { value: 'it', label: 'Italy' },
    { value: 'es', label: 'Spain' },
    { value: 'nl', label: 'Netherlands' },
    { value: 'pl', label: 'Poland' },
  ];

  const roles: SelectOption[] = [
    { value: 'admin', label: 'Administrator' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer (read-only)', disabled: true },
  ];

  let singleValue = $state('');
  let searchableValue = $state('');
  let multiValue = $state<string[]>([]);
  let countryValue = $state('');
  let roleValue = $state('admin');
  let errorValue = $state('');
</script>

<section id="select-menu" class="mljr-mb-8">
  <h2 class="mljr-h2 mljr-mb-2">SelectMenu</h2>
  <p class="mljr-text-muted mljr-mb-8">Enhanced dropdown with search/filter and multi-select support.</p>

  <div class="mljr-space-y-6">
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <!-- Basic -->
      <Card title="Basic Select" description="Single value selection">
        <SelectMenu
          label="Framework"
          options={frameworks}
          bind:value={singleValue}
          placeholder="Choose a framework"
        />
        <p class="mljr-text-sm mljr-text-muted mljr-mt-2">Selected: {singleValue || '—'}</p>
      </Card>

      <!-- Searchable -->
      <Card title="Searchable" description="Filter options by typing">
        <SelectMenu
          label="Country"
          options={countries}
          bind:value={countryValue}
          placeholder="Search countries…"
          searchable
          helperText="Start typing to filter"
        />
        <p class="mljr-text-sm mljr-text-muted mljr-mt-2">Selected: {countryValue || '—'}</p>
      </Card>

      <!-- Multi-select -->
      <Card title="Multi-Select" description="Select multiple values">
        <SelectMenu
          label="Frameworks"
          options={frameworks}
          bind:value={multiValue}
          placeholder="Pick frameworks…"
          multiple
          searchable
          helperText="You can select multiple options"
        />
        <p class="mljr-text-sm mljr-text-muted mljr-mt-2">Selected: {multiValue.join(', ') || '—'}</p>
      </Card>

      <!-- Disabled option -->
      <Card title="With Disabled Option" description="Some options can be disabled">
        <SelectMenu
          label="User Role"
          options={roles}
          bind:value={roleValue}
          helperText="Viewer role is currently unavailable"
        />
        <p class="mljr-text-sm mljr-text-muted mljr-mt-2">Selected: {roleValue || '—'}</p>
      </Card>

      <!-- Error state -->
      <Card title="Error State" description="Validation error feedback">
        <SelectMenu
          label="Required Field"
          options={frameworks}
          bind:value={errorValue}
          placeholder="Select one"
          error={!errorValue}
          errorMessage="Please select a framework"
          required
        />
      </Card>

      <!-- Disabled -->
      <Card title="Disabled" description="Non-interactive state">
        <SelectMenu
          label="Disabled Select"
          options={frameworks}
          value="svelte"
          disabled
        />
      </Card>
    </div>

    <CodeExample code={`<script>
  import { SelectMenu } from 'mljr-svelte';
  let value = $state('');
  let multiValue = $state([]);

  const options = [
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ];
<\/script>

<!-- Basic -->
<SelectMenu label="Framework" {options} bind:value placeholder="Choose…" />

<!-- Searchable -->
<SelectMenu label="Country" {options} bind:value searchable />

<!-- Multi-select -->
<SelectMenu label="Frameworks" {options} bind:value={multiValue} multiple searchable />`}
      language="svelte"
    />
  </div>
</section>
