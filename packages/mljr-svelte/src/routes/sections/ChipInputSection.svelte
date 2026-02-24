<script lang="ts">
  import { Card, ChipInput, CodeExample } from '$lib';

  let tags = $state<string[]>(['svelte', 'typescript']);
  let emails = $state<string[]>([]);
  let skills = $state<string[]>(['CSS', 'JavaScript']);
  let maxTags = $state<string[]>(['one', 'two', 'three']);

  function validateEmail(value: string): string | null {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  }
</script>

<section id="chip-input" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-gap-6">

    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <!-- Basic chip input -->
      <Card title="Tags Input" description="Press Enter or comma to add tags">
        <div class="field-demo">
          <ChipInput
            bind:value={tags}
            placeholder="Add tag..."
            label="Technologies"
            helperText="Press Enter or comma to add"
          />
          {#if tags.length}
            <p class="value-display">Values: {JSON.stringify(tags)}</p>
          {/if}
        </div>
      </Card>

      <!-- Email input -->
      <Card title="Email Recipients" description="Add multiple email addresses with validation">
        <div class="field-demo">
          <ChipInput
            bind:value={emails}
            placeholder="Add email..."
            label="Send to"
            chipVariant="secondary"
            validate={validateEmail}
            helperText="Enter email addresses"
          />
          {#if emails.length}
            <p class="value-display">{emails.length} recipient(s)</p>
          {/if}
        </div>
      </Card>
    </div>

    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <!-- Skills -->
      <Card title="Skills" description="Accent colored chips">
        <div class="field-demo">
          <ChipInput
            bind:value={skills}
            placeholder="Add skill..."
            label="Your skills"
            chipVariant="accent"
          />
        </div>
      </Card>

      <!-- Max items -->
      <Card title="Limited Input" description="Maximum 3 chips allowed">
        <div class="field-demo">
          <ChipInput
            bind:value={maxTags}
            placeholder="Add item (max 3)..."
            label="Favorite colors"
            max={3}
            helperText="Maximum 3 items"
          />
        </div>
      </Card>
    </div>

    <CodeExample code={`<script lang="ts">
  import { ChipInput } from 'mljr-svelte';

  let tags = $state(['svelte', 'typescript']);
  let emails = $state([]);

  function validateEmail(value: string): string | null {
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
      return 'Invalid email address';
    }
    return null;
  }
&lt;/script&gt;

&lt;!-- Basic chip/tag input --&gt;
&lt;ChipInput
  bind:value={tags}
  placeholder="Add tag..."
  label="Technologies"
/&gt;

&lt;!-- With validation --&gt;
&lt;ChipInput
  bind:value={emails}
  placeholder="Add email..."
  validate={validateEmail}
  chipVariant="secondary"
/&gt;

&lt;!-- Limited chips --&gt;
&lt;ChipInput
  bind:value={tags}
  max={5}
  chipVariant="accent"
/&gt;`} />
  </div>
</section>

<style>
  .field-demo {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.5rem 0;
  }

  .value-display {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-muted);
    font-family: var(--mljr-font-mono);
    background: var(--mljr-bg-secondary);
    padding: 0.5rem;
    border-radius: var(--mljr-radius-md);
    margin: 0;
  }
</style>
