<script lang="ts">
  import { CheckboxGroup, CodeExample, Alert, type CheckboxOption } from '$lib';

  const basicOptions: CheckboxOption[] = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
  ];

  const frameworkOptions: CheckboxOption[] = [
    { value: 'react', label: 'React', helperText: 'A JavaScript library for building user interfaces' },
    { value: 'vue', label: 'Vue.js', helperText: 'The Progressive JavaScript Framework' },
    { value: 'svelte', label: 'Svelte', helperText: 'Cybernetically enhanced web apps' },
    { value: 'angular', label: 'Angular', helperText: 'Platform for building mobile and desktop web applications', disabled: true },
  ];

  const interestOptions: CheckboxOption[] = [
    { value: 'frontend', label: 'Frontend Development' },
    { value: 'backend', label: 'Backend Development' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'devops', label: 'DevOps' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'data', label: 'Data Science' },
  ];

  let basicSelection = $state<string[]>(['html', 'css']);
  let frameworkSelection = $state<string[]>([]);
  let interestSelection = $state<string[]>([]);
  let limitedSelection = $state<string[]>([]);

  const codeExample = `<script>
  import { CheckboxGroup, type CheckboxOption } from 'mljr-svelte';

  const options: CheckboxOption[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'svelte', label: 'Svelte' },
  ];

  let selected = $state<string[]>([]);
<\/script>

<!-- Basic usage -->
<CheckboxGroup
  {options}
  bind:value={selected}
  label="Select Frameworks"
/>

<!-- With Select All -->
<CheckboxGroup
  {options}
  bind:value={selected}
  label="Technologies"
  showSelectAll={true}
  selectAllLabel="Select All Frameworks"
/>

<!-- Horizontal layout -->
<CheckboxGroup
  {options}
  bind:value={selected}
  direction="horizontal"
/>

<!-- With max selections -->
<CheckboxGroup
  {options}
  bind:value={selected}
  label="Pick up to 2"
  maxSelections={2}
/>

<!-- With helper texts -->
<CheckboxGroup
  options={[
    {
      value: 'react',
      label: 'React',
      helperText: 'A JavaScript library for building UIs'
    },
    {
      value: 'vue',
      label: 'Vue.js',
      helperText: 'The Progressive JavaScript Framework'
    }
  ]}
  bind:value={selected}
/>`;
</script>

<div class="checkbox-group-section">
  <div class="mljr-mb-6">
    <p class="mljr-text-lg mljr-text-muted">
      Manage multiple related checkboxes as a group with optional "Select All" functionality and
      maximum selection limits.
    </p>
  </div>

  <div class="examples-grid">
    <!-- Basic Usage -->
    <div class="example-card">
      <h3 class="example-title">Basic Usage</h3>
      <CheckboxGroup
        options={basicOptions}
        bind:value={basicSelection}
        label="Technologies"
        helperText="Select the technologies you know"
      />
      <Alert variant="info" class="mljr-mt-4">
        Selected: {basicSelection.length > 0 ? basicSelection.join(', ') : 'None'}
      </Alert>
    </div>

    <!-- With Select All -->
    <div class="example-card">
      <h3 class="example-title">With Select All</h3>
      <CheckboxGroup
        options={frameworkOptions}
        bind:value={frameworkSelection}
        label="JavaScript Frameworks"
        showSelectAll={true}
        selectAllLabel="Select All Frameworks"
      />
    </div>

    <!-- Horizontal Layout -->
    <div class="example-card full-width">
      <h3 class="example-title">Horizontal Layout</h3>
      <CheckboxGroup
        options={basicOptions}
        bind:value={basicSelection}
        label="Skills"
        direction="horizontal"
      />
    </div>

    <!-- Max Selections -->
    <div class="example-card">
      <h3 class="example-title">Maximum Selections</h3>
      <CheckboxGroup
        options={interestOptions}
        bind:value={limitedSelection}
        label="Pick up to 3 areas of interest"
        maxSelections={3}
        helperText="You can select a maximum of 3 options"
      />
    </div>

    <!-- With Helper Text -->
    <div class="example-card">
      <h3 class="example-title">With Helper Text</h3>
      <CheckboxGroup
        options={frameworkOptions}
        bind:value={frameworkSelection}
        label="Preferred Framework"
        helperText="Select your preferred JavaScript framework(s)"
      />
    </div>

    <!-- Disabled State -->
    <div class="example-card full-width">
      <h3 class="example-title">Disabled State</h3>
      <div class="example-row">
        <CheckboxGroup
          options={basicOptions}
          value={['html', 'css']}
          label="Locked Selection"
          disabled={true}
        />
        <CheckboxGroup
          options={frameworkOptions}
          bind:value={frameworkSelection}
          label="Some Options Disabled"
          helperText="Angular is disabled in this example"
        />
      </div>
    </div>

    <!-- With onChange Callback -->
    <div class="example-card full-width">
      <h3 class="example-title">With Change Callback</h3>
      <CheckboxGroup
        options={interestOptions}
        bind:value={interestSelection}
        label="Areas of Interest"
        showSelectAll={true}
        onchange={(values) => console.log('Selection changed:', values)}
      />
      <Alert variant="success" class="mljr-mt-4">
        Current selection ({interestSelection.length}): {interestSelection.length > 0 ? interestSelection.join(', ') : 'None'}
      </Alert>
    </div>

    <!-- Code Example -->
    <div class="example-card full-width">
      <h3 class="example-title">Usage Example</h3>
      <CodeExample code={codeExample} language="svelte" />
    </div>
  </div>
</div>

<style>
  .checkbox-group-section {
    max-width: 100%;
  }

  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--mljr-space-6);
  }

  .example-card {
    padding: var(--mljr-space-6);
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-shadow);
  }

  .example-card.full-width {
    grid-column: 1 / -1;
  }

  .example-title {
    font-size: var(--mljr-text-lg);
    font-weight: 600;
    color: var(--mljr-text);
    margin-bottom: var(--mljr-space-4);
  }

  .example-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--mljr-space-6);
  }
</style>
