<script lang="ts">
  import { Textarea, Card } from '$lib';

  let basic = $state('');
  let withLabel = $state('');
  let withPlaceholder = $state('');
  let withHelper = $state('');
  let errorValue = $state('');
  let successValue = $state('This is a valid message!');
  let disabledValue = $state('This textarea is disabled');
  let readonlyValue = $state('This textarea is read-only');
  let message = $state('');
  let feedback = $state('');
  let notes = $state('');
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Textarea</h3>
    <div class="mljr-space-y-2">
      <Textarea bind:value={basic} />
      <p class="mljr-text-xs mljr-text-muted">
        Character count: {basic.length}
      </p>
    </div>
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label</h3>
    <Textarea label="Message" bind:value={withLabel} />
  </section>

  <!-- With Placeholder -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Placeholder</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-4">
      <Textarea placeholder="Enter your message..." bind:value={withPlaceholder} />
      <Textarea
        label="Comments"
        placeholder="Share your thoughts..."
        bind:value={withPlaceholder}
      />
    </div>
  </section>

  <!-- With Helper Text -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Helper Text</h3>
    <Textarea
      label="Description"
      helperText="Provide a detailed description (max 500 characters)"
      bind:value={withHelper}
    />
  </section>

  <!-- States -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">States</h3>
    <div class="mljr-space-y-3">
      <Textarea
        label="Error State"
        error={true}
        errorText="This field cannot be empty"
        bind:value={errorValue}
      />

      <Textarea
        label="Success State"
        success={true}
        bind:value={successValue}
      />

      <Textarea label="Disabled" disabled bind:value={disabledValue} />

      <Textarea label="Read Only" readonly bind:value={readonlyValue} />
    </div>
  </section>

  <!-- Rows -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Rows</h3>
    <div class="mljr-space-y-3">
      <Textarea label="2 Rows (Compact)" rows={2} placeholder="Compact textarea" />
      <Textarea label="4 Rows (Default)" rows={4} placeholder="Standard textarea" />
      <Textarea label="8 Rows (Expanded)" rows={8} placeholder="Large textarea" />
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-space-y-3">
      <Textarea size="sm" label="Small" placeholder="Small textarea" />
      <Textarea label="Medium (Default)" placeholder="Medium textarea" />
      <Textarea size="lg" label="Large" placeholder="Large textarea" />
    </div>
  </section>

  <!-- Resize Options -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Resize Options</h3>
    <div class="mljr-space-y-3">
      <Textarea
        label="Resize Both (Default)"
        placeholder="Can be resized in both directions"
        style="resize: both;"
      />
      <Textarea
        label="Resize Vertical"
        placeholder="Can only be resized vertically"
        style="resize: vertical;"
      />
      <Textarea
        label="Resize Horizontal"
        placeholder="Can only be resized horizontally"
        style="resize: horizontal;"
      />
      <Textarea
        label="No Resize"
        placeholder="Cannot be resized"
        style="resize: none;"
      />
    </div>
  </section>

  <!-- With Character Count -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Character Counter</h3>
    <div class="mljr-space-y-2">
      <Textarea
        label="Tweet"
        placeholder="What's happening?"
        maxlength={280}
        bind:value={message}
      />
      <div class="mljr-flex mljr-justify-between mljr-text-xs mljr-text-muted">
        <span>Max 280 characters</span>
        <span class="{message.length > 280 ? 'mljr-text-error-600' : ''}">
          {message.length} / 280
        </span>
      </div>
    </div>
  </section>

  <!-- Full Width -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Full Width</h3>
    <Textarea
      label="Full Width Textarea"
      placeholder="This textarea spans the full width"
    />
  </section>

  <!-- Required Field -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Required Field</h3>
    <Textarea
      label="Required Message"
      placeholder="This field is required"
      required
      helperText="Please enter a message"
    />
  </section>

  <!-- Form Examples -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Form Examples</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-4">
      <!-- Contact Form -->
      <Card>
        <h4 class="mljr-h5 mljr-mb-4">Contact Form</h4>
        <div class="mljr-space-y-3">
          <Textarea
            label="Your Message"
            placeholder="Tell us how we can help..."
            rows={5}
            required
            bind:value={message}
          />
          <div class="mljr-text-xs mljr-text-muted">
            {message.length} characters
          </div>
        </div>
      </Card>

      <!-- Feedback Form -->
      <Card>
        <h4 class="mljr-h5 mljr-mb-4">Feedback Form</h4>
        <div class="mljr-space-y-3">
          <Textarea
            label="Your Feedback"
            placeholder="We'd love to hear your thoughts..."
            helperText="Please be specific and constructive"
            rows={5}
            bind:value={feedback}
          />
          <div class="mljr-text-xs mljr-text-muted">
            {feedback.split(/\s+/).filter(Boolean).length} words
          </div>
        </div>
      </Card>
    </div>
  </section>

  <!-- Auto-growing Textarea -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Notes Section</h3>
    <Card>
      <Textarea
        label="Notes"
        placeholder="Add your notes here..."
        helperText="Your notes are automatically saved"
        rows={3}
        bind:value={notes}
      />
    </Card>
  </section>
</div>
