<script lang="ts">
  import { ThemeToggle, Card } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Default Dropdown -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Default (Dropdown)</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-4">
      <ThemeToggle variant="default" />
      <span class="mljr-text-sm mljr-text-muted">Dropdown with light/dark/system options</span>
    </div>
  </section>

  <!-- Simple Toggle -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Simple Toggle</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-4">
      <ThemeToggle variant="simple" />
      <span class="mljr-text-sm mljr-text-muted">Single click to toggle light/dark</span>
    </div>
  </section>

  <!-- Segmented Control -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Segmented (3-way)</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-4">
      <ThemeToggle variant="segmented" />
      <span class="mljr-text-sm mljr-text-muted">Choose between light, dark, and system</span>
    </div>
  </section>

  <!-- With Labels -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Labels</h3>
    <div class="mljr-space-y-3">
      <div class="mljr-flex mljr-items-center mljr-gap-4">
        <ThemeToggle variant="simple" showLabels />
        <span class="mljr-text-sm mljr-text-muted">Simple with label</span>
      </div>
      <div class="mljr-flex mljr-items-center mljr-gap-4">
        <ThemeToggle variant="segmented" showLabels />
        <span class="mljr-text-sm mljr-text-muted">Segmented with labels</span>
      </div>
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-6">
      <div class="mljr-text-center">
        <ThemeToggle variant="simple" size="sm" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-1">sm</p>
      </div>
      <div class="mljr-text-center">
        <ThemeToggle variant="simple" size="md" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-1">md</p>
      </div>
      <div class="mljr-text-center">
        <ThemeToggle variant="simple" size="lg" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-1">lg</p>
      </div>
    </div>
  </section>

  <!-- In Navbar Context -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">In Navbar Context</h3>
    <Card>
      <div class="mljr-flex mljr-items-center mljr-justify-between">
        <div class="mljr-flex mljr-items-center mljr-gap-3">
          <div class="mljr-w-8 mljr-h-8 mljr-bg-gradient-primary mljr-rounded-lg"></div>
          <span class="mljr-font-bold">MyApp</span>
        </div>
        <nav class="mljr-flex mljr-items-center mljr-gap-4">
          <a href="." class="mljr-text-sm mljr-text-muted hover:mljr-text-primary-500">Home</a>
          <a href="." class="mljr-text-sm mljr-text-muted hover:mljr-text-primary-500">Docs</a>
          <ThemeToggle variant="simple" size="sm" />
        </nav>
      </div>
    </Card>
  </section>

  <!-- Settings Panel Context -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">In Settings Panel</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Appearance</h4>
      <div class="mljr-space-y-4">
        <div class="mljr-flex mljr-items-center mljr-justify-between">
          <div>
            <p class="mljr-font-medium mljr-text-sm">Theme</p>
            <p class="mljr-text-xs mljr-text-muted">Choose your preferred color mode</p>
          </div>
          <ThemeToggle variant="segmented" showLabels />
        </div>
      </div>
    </Card>
  </section>
</div>
