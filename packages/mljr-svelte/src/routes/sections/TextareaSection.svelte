<script lang="ts">
  import { Card, Textarea, CodeExample } from '$lib';

  let value1 = $state('');
  let value2 = $state('This is a read-only textarea with some content.');
  let value3 = $state('');
  let value4 = $state('');
</script>

<section id="textarea" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6">
    <Card title="Basic Textarea" description="Simple textarea with label">
      <Textarea
        label="Description"
        placeholder="Enter your description here..."
        bind:value={value1}
        helperText="Write a brief description"
        rows={4}
      />
    </Card>

    <Card title="Textarea Sizes" description="Different size options">
      <div class="mljr-flex mljr-flex-col mljr-gap-4">
        <Textarea
          label="Small"
          size="sm"
          placeholder="Small textarea"
          rows={2}
        />
        <Textarea
          label="Medium (default)"
          placeholder="Medium textarea"
          rows={2}
        />
        <Textarea
          label="Large"
          size="lg"
          placeholder="Large textarea"
          rows={2}
        />
      </div>
    </Card>

    <Card title="Textarea States" description="Validation states">
      <div class="mljr-flex mljr-flex-col mljr-gap-4">
        <Textarea
          label="Error State"
          placeholder="Enter text..."
          error
          errorText="This field is required"
          rows={3}
        />
        <Textarea
          label="Success State"
          value="Valid content entered"
          success
          rows={3}
        />
        <Textarea
          label="Disabled"
          value="This textarea is disabled"
          disabled
          rows={3}
        />
        <Textarea
          label="Read-only"
          value={value2}
          readonly
          rows={3}
        />
      </div>
    </Card>

    <Card title="With Character Count" description="Track character limit">
      <div class="mljr-flex mljr-flex-col mljr-gap-4">
        <Textarea
          label="Bio"
          placeholder="Tell us about yourself..."
          bind:value={value3}
          maxLength={200}
          showCount
          rows={4}
        />
        <Textarea
          label="Feedback"
          placeholder="Your feedback is important..."
          bind:value={value4}
          maxLength={500}
          showCount
          helperText="Maximum 500 characters"
          rows={4}
        />
      </div>
    </Card>

    <Card title="Auto-resize" description="Textarea grows with content">
      <Textarea
        label="Auto-resizing Textarea"
        placeholder="Type here to see the textarea grow..."
        autoResize
        helperText="The textarea will automatically adjust its height"
        rows={3}
      />
    </Card>

    <Card title="Required Field" description="With required indicator">
      <Textarea
        label="Comments"
        placeholder="Enter your comments..."
        required
        helperText="This field is required"
        rows={4}
      />
    </Card>
  </div>

  <CodeExample code={`<!-- Basic -->
<Textarea
  label="Description"
  placeholder="Enter your description..."
  bind:value
  helperText="Write a brief description"
  rows={4}
/>

<!-- Sizes -->
<Textarea label="Small" size="sm" rows={2} />
<Textarea label="Medium" rows={2} />
<Textarea label="Large" size="lg" rows={2} />

<!-- States -->
<Textarea label="Error" error errorText="Required" />
<Textarea label="Success" value="Valid" success />
<Textarea label="Disabled" value="..." disabled />
<Textarea label="Readonly" value="..." readonly />

<!-- Character Count -->
<Textarea
  label="Bio"
  bind:value
  maxLength={200}
  showCount
  rows={4}
/>

<!-- Auto-resize -->
<Textarea
  label="Auto-resize"
  autoResize
  rows={3}
/>`} />
</section>
