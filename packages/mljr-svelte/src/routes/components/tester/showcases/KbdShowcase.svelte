<script lang="ts">
  import { Kbd, Card } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Single Keys -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Single Keys</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
      <Kbd key="Ctrl" />
      <Kbd key="Alt" />
      <Kbd key="Shift" />
      <Kbd key="Meta" />
      <Kbd key="Enter" />
      <Kbd key="Escape" />
      <Kbd key="Tab" />
      <Kbd key="Delete" />
      <Kbd key="Backspace" />
      <Kbd key="ArrowUp" />
      <Kbd key="ArrowDown" />
      <Kbd key="ArrowLeft" />
      <Kbd key="ArrowRight" />
    </div>
  </section>

  <!-- Key Combinations -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Key Combinations</h3>
    <div class="mljr-space-y-3">
      <div class="mljr-flex mljr-items-center mljr-gap-3">
        <Kbd keys={['Ctrl', 'C']} />
        <span class="mljr-text-sm mljr-text-muted">Copy</span>
      </div>
      <div class="mljr-flex mljr-items-center mljr-gap-3">
        <Kbd keys={['Ctrl', 'V']} />
        <span class="mljr-text-sm mljr-text-muted">Paste</span>
      </div>
      <div class="mljr-flex mljr-items-center mljr-gap-3">
        <Kbd keys={['Ctrl', 'Z']} />
        <span class="mljr-text-sm mljr-text-muted">Undo</span>
      </div>
      <div class="mljr-flex mljr-items-center mljr-gap-3">
        <Kbd keys={['Ctrl', 'Shift', 'Z']} />
        <span class="mljr-text-sm mljr-text-muted">Redo</span>
      </div>
      <div class="mljr-flex mljr-items-center mljr-gap-3">
        <Kbd keys={['Ctrl', 'K']} />
        <span class="mljr-text-sm mljr-text-muted">Open Command Palette</span>
      </div>
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-flex mljr-items-end mljr-gap-4">
      <div class="mljr-text-center">
        <Kbd key="Ctrl" size="sm" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-1">sm</p>
      </div>
      <div class="mljr-text-center">
        <Kbd key="Ctrl" size="md" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-1">md</p>
      </div>
      <div class="mljr-text-center">
        <Kbd key="Ctrl" size="lg" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-1">lg</p>
      </div>
    </div>
  </section>

  <!-- In Context -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">In Context</h3>
    <div class="mljr-space-y-2">
      <p class="mljr-text-sm">
        Press <Kbd key="Ctrl" size="sm" /> + <Kbd key="K" size="sm" /> to open the command palette.
      </p>
      <p class="mljr-text-sm">
        Use <Kbd key="ArrowUp" size="sm" /> and <Kbd key="ArrowDown" size="sm" /> to navigate.
      </p>
      <p class="mljr-text-sm">
        Press <Kbd key="Enter" size="sm" /> to confirm your selection.
      </p>
    </div>
  </section>

  <!-- Keyboard Shortcuts Reference -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Shortcuts Reference Card</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Keyboard Shortcuts</h4>
      <div class="mljr-space-y-3">
        {#each [
          { keys: ['Ctrl', 'N'], desc: 'New file' },
          { keys: ['Ctrl', 'O'], desc: 'Open file' },
          { keys: ['Ctrl', 'S'], desc: 'Save' },
          { keys: ['Ctrl', 'Shift', 'P'], desc: 'Command palette' },
          { keys: ['Ctrl', 'F'], desc: 'Find in file' },
          { keys: ['Ctrl', 'G'], desc: 'Go to line' },
          { keys: ['Ctrl', 'W'], desc: 'Close tab' },
        ] as shortcut}
          <div class="mljr-flex mljr-items-center mljr-justify-between">
            <span class="mljr-text-sm">{shortcut.desc}</span>
            <Kbd keys={shortcut.keys} size="sm" />
          </div>
        {/each}
      </div>
    </Card>
  </section>
</div>
