<script lang="ts">
  import { Chip, Icon } from '$lib';

  let selected = $state<string[]>([]);

  function handleSelect(value: string) {
    if (selected.includes(value)) {
      selected = selected.filter(v => v !== value);
    } else {
      selected = [...selected, value];
    }
  }
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Chips</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
      <Chip>Default</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="secondary">Secondary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="error">Error</Chip>
      <Chip variant="accent">Accent</Chip>
    </div>
  </section>

  <!-- Outline Style -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Outline Style</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
      <Chip variant="outline">Outline Default</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="secondary">Secondary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="error">Error</Chip>
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-items-center mljr-gap-3">
      <Chip variant="primary" size="sm">Small</Chip>
      <Chip variant="primary">Medium (Default)</Chip>
      <Chip variant="primary" size="lg">Large</Chip>
    </div>
  </section>

  <!-- With Icons -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Icons</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
      <Chip variant="primary">
        <Icon icon="mdi:star" size={16} />
        Featured
      </Chip>
      <Chip variant="success">
        <Icon icon="mdi:check" size={16} />
        Verified
      </Chip>
      <Chip variant="warning">
        <Icon icon="mdi:clock" size={16} />
        Pending
      </Chip>
      <Chip variant="error">
        <Icon icon="mdi:close" size={16} />
        Failed
      </Chip>
      <Chip variant="accent">
        <Icon icon="mdi:information" size={16} />
        Info
      </Chip>
    </div>
  </section>

  <!-- Removable/Dismissible -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Removable Chips</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
      <Chip variant="primary" removable>React</Chip>
      <Chip variant="secondary" removable>Vue</Chip>
      <Chip variant="success" removable>Svelte</Chip>
      <Chip variant="accent" removable>Angular</Chip>
    </div>
  </section>

  <!-- Clickable -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Clickable Chips</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
      <Chip variant="primary" onclick={() => alert('React clicked')}>
        React
      </Chip>
      <Chip variant="secondary" onclick={() => alert('Vue clicked')}>
        Vue
      </Chip>
      <Chip variant="success" onclick={() => alert('Svelte clicked')}>
        Svelte
      </Chip>
    </div>
  </section>

  <!-- Selectable Chips -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Selectable Chips (Filter)</h3>
    <div class="mljr-space-y-3">
      <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
        <Chip
          variant={selected.includes('javascript') ? 'primary' : 'default'}
          onclick={() => handleSelect('javascript')}
        >
          JavaScript
        </Chip>
        <Chip
          variant={selected.includes('typescript') ? 'primary' : 'default'}
          onclick={() => handleSelect('typescript')}
        >
          TypeScript
        </Chip>
        <Chip
          variant={selected.includes('python') ? 'primary' : 'default'}
          onclick={() => handleSelect('python')}
        >
          Python
        </Chip>
        <Chip
          variant={selected.includes('rust') ? 'primary' : 'default'}
          onclick={() => handleSelect('rust')}
        >
          Rust
        </Chip>
        <Chip
          variant={selected.includes('go') ? 'primary' : 'default'}
          onclick={() => handleSelect('go')}
        >
          Go
        </Chip>
      </div>
      <p class="mljr-text-xs mljr-text-muted">
        Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
      </p>
    </div>
  </section>

  <!-- With Avatar/Image -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Avatar/Icon</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
      <Chip variant="primary">
        <div class="mljr-w-5 mljr-h-5 mljr-bg-gradient-primary mljr-rounded-full"></div>
        User 1
      </Chip>
      <Chip variant="secondary">
        <div class="mljr-w-5 mljr-h-5 mljr-bg-gradient-secondary mljr-rounded-full"></div>
        User 2
      </Chip>
      <Chip variant="success">
        <div class="mljr-w-5 mljr-h-5 mljr-bg-gradient-success mljr-rounded-full"></div>
        User 3
      </Chip>
    </div>
  </section>

  <!-- Tags Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Tags/Labels</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
      <Chip variant="primary" size="sm">Frontend</Chip>
      <Chip variant="secondary" size="sm">Backend</Chip>
      <Chip variant="success" size="sm">Mobile</Chip>
      <Chip variant="accent" size="sm">DevOps</Chip>
      <Chip variant="warning" size="sm">Design</Chip>
      <Chip variant="error" size="sm">Security</Chip>
    </div>
  </section>

  <!-- Status Chips -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Status Indicators</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
      <Chip variant="success">
        <Icon icon="mdi:check-circle" size={16} />
        Active
      </Chip>
      <Chip variant="warning">
        <Icon icon="mdi:pause-circle" size={16} />
        Paused
      </Chip>
      <Chip variant="error">
        <Icon icon="mdi:close-circle" size={16} />
        Stopped
      </Chip>
      <Chip variant="accent">
        <Icon icon="mdi:information-outline" size={16} />
        Pending
      </Chip>
    </div>
  </section>

  <!-- Multi-line Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">In Content</h3>
    <p class="mljr-text-secondary">
      This project uses
      <Chip variant="primary" size="sm">React</Chip>,
      <Chip variant="secondary" size="sm">TypeScript</Chip>, and
      <Chip variant="success" size="sm">Tailwind CSS</Chip>
      to build modern web applications with great developer experience.
    </p>
  </section>
</div>
