<script lang="ts">
  import { ChipInput } from '$lib';

  let tags = $state(['javascript', 'typescript']);
  let technologies = $state(['react', 'svelte']);
  let emails = $state<string[]>([]);
  let maxTags = $state<string[]>(['alpha', 'beta', 'gamma']);
  let errorInput = $state<string[]>([]);

  function validateEmail(value: string): string | null {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(value)) return 'Invalid email address';
    return null;
  }
</script>

<div class="mljr-space-y-8">
  <!-- Basic Chip Input -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Tag Input</h3>
    <ChipInput
      bind:value={tags}
      label="Tags"
      placeholder="Add tag..."
      helperText="Press Enter or comma to add a tag"
    />
    <p class="mljr-text-sm mljr-mt-2">
      Values: <strong>{tags.join(', ') || '(none)'}</strong>
    </p>
  </section>

  <!-- Chip Variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Chip Color Variants</h3>
    <div class="mljr-space-y-4">
      <ChipInput
        value={['primary', 'chip']}
        chipVariant="primary"
        label="Primary chips"
        placeholder="Add..."
      />
      <ChipInput
        value={['secondary', 'chip']}
        chipVariant="secondary"
        label="Secondary chips"
        placeholder="Add..."
      />
      <ChipInput
        value={['accent', 'chip']}
        chipVariant="accent"
        label="Accent chips"
        placeholder="Add..."
      />
    </div>
  </section>

  <!-- Email Validation -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Validation (Email)</h3>
    <ChipInput
      bind:value={emails}
      label="Email addresses"
      placeholder="Enter email..."
      helperText="Only valid email addresses are accepted"
      validate={validateEmail}
    />
    <p class="mljr-text-sm mljr-mt-2">
      Emails: <strong>{emails.join(', ') || '(none)'}</strong>
    </p>
  </section>

  <!-- Max Limit -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Max Limit (3 tags)</h3>
    <ChipInput
      bind:value={maxTags}
      label="Limit 3 tags"
      placeholder="Add tag..."
      max={3}
      helperText="Maximum 3 tags allowed"
    />
  </section>

  <!-- Technologies (secondary) -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Technologies (Secondary Variant)</h3>
    <ChipInput
      bind:value={technologies}
      label="Technologies used"
      placeholder="Add technology..."
      chipVariant="secondary"
      helperText="Press Enter, comma, or Tab to add"
      separators={['Enter', ',', 'Tab']}
    />
  </section>

  <!-- Error State -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Error State</h3>
    <ChipInput
      bind:value={errorInput}
      label="Required field"
      placeholder="Add tags..."
      error={true}
      errorMessage="At least one tag is required"
    />
  </section>

  <!-- Disabled -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled State</h3>
    <ChipInput
      value={['readonly', 'tag']}
      label="Disabled input"
      disabled={true}
    />
  </section>
</div>
