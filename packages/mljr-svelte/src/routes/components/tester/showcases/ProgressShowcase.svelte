<script lang="ts">
  import { Progress, Button, Card } from '$lib';

  let value = $state(50);
  let indeterminate = $state(false);

  function increaseProgress() {
    if (value < 100) value += 10;
  }

  function decreaseProgress() {
    if (value > 0) value -= 10;
  }

  function resetProgress() {
    value = 0;
  }
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Progress</h3>
    <Progress value={50} />
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label</h3>
    <Progress label="Loading..." value={75} />
  </section>

  <!-- Variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Variants</h3>
    <div class="mljr-space-y-3">
      <Progress label="Primary (Default)" value={60} />
      <Progress label="Secondary" variant="secondary" value={60} />
      <Progress label="Success" variant="success" value={60} />
      <Progress label="Warning" variant="warning" value={60} />
      <Progress label="Error" variant="error" value={60} />
      <Progress label="Info" variant="secondary" value={60} />
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-space-y-3">
      <Progress label="Small" size="sm" value={50} />
      <Progress label="Medium (Default)" value={50} />
      <Progress label="Large" size="lg" value={50} />
    </div>
  </section>

  <!-- Show Percentage -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Percentage</h3>
    <div class="mljr-space-y-3">
      <Progress value={25} showLabel />
      <Progress value={50} showLabel />
      <Progress value={75} showLabel />
      <Progress value={100} showLabel />
    </div>
  </section>

  <!-- Indeterminate -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Indeterminate (Loading)</h3>
    <div class="mljr-space-y-3">
      <Progress indeterminate />
      <Progress indeterminate variant="secondary" />
      <Progress indeterminate variant="success" />
    </div>
  </section>

  <!-- Interactive Demo -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Interactive Demo</h3>
    <Card>
      <div class="mljr-space-y-4">
        <Progress
          label="Upload Progress"
          value={value}
          showLabel
        />
        <div class="mljr-flex mljr-gap-2">
          <Button size="sm" variant="outline-primary" onclick={decreaseProgress}>
            -10%
          </Button>
          <Button size="sm" variant="outline-primary" onclick={increaseProgress}>
            +10%
          </Button>
          <Button size="sm" variant="ghost" onclick={resetProgress}>
            Reset
          </Button>
        </div>
      </div>
    </Card>
  </section>

  <!-- Progress States -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Progress States</h3>
    <div class="mljr-space-y-3">
      <Progress label="Not Started" value={0} showLabel />
      <Progress label="In Progress" value={45} showLabel variant="secondary" />
      <Progress label="Almost Done" value={90} showLabel variant="warning" />
      <Progress label="Complete" value={100} showLabel variant="success" />
    </div>
  </section>

  <!-- Multiple Progress Bars -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Multiple Progress Bars</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Project Completion</h4>
      <div class="mljr-space-y-4">
        <div>
          <div class="mljr-flex mljr-justify-between mljr-mb-1">
            <span class="mljr-text-sm">Frontend Development</span>
            <span class="mljr-text-sm mljr-text-muted">85%</span>
          </div>
          <Progress value={85} variant="primary" />
        </div>
        <div>
          <div class="mljr-flex mljr-justify-between mljr-mb-1">
            <span class="mljr-text-sm">Backend Development</span>
            <span class="mljr-text-sm mljr-text-muted">60%</span>
          </div>
          <Progress value={60} variant="secondary" />
        </div>
        <div>
          <div class="mljr-flex mljr-justify-between mljr-mb-1">
            <span class="mljr-text-sm">Testing</span>
            <span class="mljr-text-sm mljr-text-muted">40%</span>
          </div>
          <Progress value={40} variant="warning" />
        </div>
        <div>
          <div class="mljr-flex mljr-justify-between mljr-mb-1">
            <span class="mljr-text-sm">Documentation</span>
            <span class="mljr-text-sm mljr-text-muted">25%</span>
          </div>
          <Progress value={25} variant="secondary" />
        </div>
      </div>
    </Card>
  </section>

  <!-- File Upload Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">File Upload Example</h3>
    <Card>
      <div class="mljr-space-y-3">
        <div class="mljr-flex mljr-items-center mljr-gap-3">
          <div class="mljr-text-2xl">📄</div>
          <div class="mljr-flex-1">
            <div class="mljr-flex mljr-justify-between mljr-mb-1">
              <span class="mljr-text-sm mljr-font-medium">document.pdf</span>
              <span class="mljr-text-xs mljr-text-muted">2.4 MB</span>
            </div>
            <Progress value={65} size="sm" variant="success" />
          </div>
        </div>

        <div class="mljr-flex mljr-items-center mljr-gap-3">
          <div class="mljr-text-2xl">🖼️</div>
          <div class="mljr-flex-1">
            <div class="mljr-flex mljr-justify-between mljr-mb-1">
              <span class="mljr-text-sm mljr-font-medium">image.png</span>
              <span class="mljr-text-xs mljr-text-muted">5.1 MB</span>
            </div>
            <Progress value={30} size="sm" variant="secondary" />
          </div>
        </div>

        <div class="mljr-flex mljr-items-center mljr-gap-3">
          <div class="mljr-text-2xl">🎬</div>
          <div class="mljr-flex-1">
            <div class="mljr-flex mljr-justify-between mljr-mb-1">
              <span class="mljr-text-sm mljr-font-medium">video.mp4</span>
              <span class="mljr-text-xs mljr-text-muted">45.2 MB</span>
            </div>
            <Progress indeterminate size="sm" />
          </div>
        </div>
      </div>
    </Card>
  </section>
</div>
