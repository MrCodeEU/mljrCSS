<script lang="ts">
  import { CheckboxGroup, Card, Button } from '$lib';
  import type { CheckboxOption } from '$lib';

  const fruits: CheckboxOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' },
  ];

  const permissions: CheckboxOption[] = [
    { value: 'read', label: 'Read', helperText: 'View all resources' },
    { value: 'write', label: 'Write', helperText: 'Create and edit resources' },
    { value: 'delete', label: 'Delete', helperText: 'Remove resources permanently' },
    { value: 'admin', label: 'Admin', helperText: 'Full administrative access' },
  ];

  const skills: CheckboxOption[] = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'css', label: 'CSS/Tailwind' },
    { value: 'node', label: 'Node.js', disabled: true },
  ];

  let selected1 = $state<string[]>([]);
  let selected2 = $state<string[]>(['read']);
  let selected3 = $state<string[]>(['js', 'ts', 'svelte']);
  let selected4 = $state<string[]>([]);
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Checkbox Group</h3>
    <div class="mljr-space-y-2">
      <CheckboxGroup options={fruits} bind:value={selected1} label="Favorite Fruits" />
      {#if selected1.length > 0}
        <p class="mljr-text-xs mljr-text-muted">Selected: {selected1.join(', ')}</p>
      {/if}
    </div>
  </section>

  <!-- Horizontal -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Horizontal Layout</h3>
    <CheckboxGroup
      options={fruits.slice(0, 4)}
      direction="horizontal"
      label="Choose fruits"
    />
  </section>

  <!-- With Helper Text -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Per-Option Helper Text</h3>
    <CheckboxGroup
      options={permissions}
      bind:value={selected2}
      label="User Permissions"
      helperText="Select the permissions for this user role"
    />
  </section>

  <!-- With Select All -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Select All</h3>
    <CheckboxGroup
      options={fruits}
      bind:value={selected4}
      label="Select All Example"
      showSelectAll
    />
  </section>

  <!-- Max Selections -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Max Selections (pick 3)</h3>
    <div class="mljr-space-y-2">
      <CheckboxGroup
        options={skills}
        bind:value={selected3}
        label="Top Skills"
        maxSelections={3}
        helperText="Select up to 3 skills"
      />
      <p class="mljr-text-xs mljr-text-muted">{selected3.length}/3 selected</p>
    </div>
  </section>

  <!-- Disabled -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled</h3>
    <CheckboxGroup
      options={fruits.slice(0, 3)}
      value={['apple']}
      label="Fruits (disabled)"
      disabled
    />
  </section>

  <!-- Form Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Survey Form Example</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Developer Survey</h4>
      <div class="mljr-space-y-6">
        <CheckboxGroup
          options={skills}
          bind:value={selected3}
          label="Technologies you use"
          helperText="Select all that apply"
          showSelectAll
        />
        <CheckboxGroup
          options={[
            { value: 'frontend', label: 'Frontend' },
            { value: 'backend', label: 'Backend' },
            { value: 'fullstack', label: 'Full Stack' },
            { value: 'devops', label: 'DevOps' },
          ]}
          direction="horizontal"
          label="Your role(s)"
        />
        <Button variant="primary">Submit Survey</Button>
      </div>
    </Card>
  </section>
</div>
