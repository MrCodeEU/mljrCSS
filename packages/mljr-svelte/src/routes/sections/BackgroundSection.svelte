<script lang="ts">
  import { Card, Button, CodeExample } from '$lib';
  import Background from '$lib/components/Background.svelte';
  import { themeStore } from '$lib/stores/theme.svelte';

  let activePattern = $state('crosses');
  let activeOpacity = $state(0.15);
  let activeSize = $state(24);
  let activeSpacing = $state(16);
  let activeFixed = $state(false);
</script>

<section id="background" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-gap-6">
    <!-- Live Demo Card - Background is contained within this card -->
    <Card title="Live Demo" description="Try different patterns and settings">
      <div class="demo-area">
        <!-- The Background component stays within this container -->
        {#if activePattern !== 'none'}
          <div class="demo-background-container">
            <Background 
              pattern={activePattern as any} 
              opacity={activeOpacity} 
              size={activeSize}
              spacing={activeSpacing}
              fixed={false}
            />
          </div>
        {/if}
        
        <div class="demo-content">
          <p class="demo-text">Background Pattern Demo</p>
          <p class="demo-subtext">The pattern stays within this card!</p>
        </div>
      </div>

      <div class="pattern-controls">
        <div class="control-group">
          <span class="control-label">Pattern</span>
          <div class="button-group">
            <Button 
              variant={activePattern === 'crosses' ? 'primary' : 'secondary'}
              size="sm"
              onclick={() => activePattern = 'crosses'}
            >
              Crosses
            </Button>
            <Button 
              variant={activePattern === 'dots' ? 'primary' : 'secondary'}
              size="sm"
              onclick={() => activePattern = 'dots'}
            >
              Dots
            </Button>
            <Button 
              variant={activePattern === 'lines' ? 'primary' : 'secondary'}
              size="sm"
              onclick={() => activePattern = 'lines'}
            >
              Lines
            </Button>
            <Button 
              variant={activePattern === 'none' ? 'primary' : 'secondary'}
              size="sm"
              onclick={() => activePattern = 'none'}
            >
              None
            </Button>
          </div>
        </div>

        <div class="control-row">
          <div class="control-group half">
            <label class="control-label" for="opacity-control">Opacity: {Math.round(activeOpacity * 100)}%</label>
            <input 
              id="opacity-control"
              type="range" 
              min="0.05" 
              max="0.5" 
              step="0.05"
              value={activeOpacity}
              oninput={(e) => activeOpacity = parseFloat(e.currentTarget.value)}
              class="range-input"
            />
          </div>

          <div class="control-group half">
            <label class="control-label" for="size-control">Size: {activeSize}px</label>
            <input 
              id="size-control"
              type="range" 
              min="16" 
              max="64" 
              step="4"
              value={activeSize}
              oninput={(e) => activeSize = parseInt(e.currentTarget.value)}
              class="range-input"
            />
          </div>
        </div>

        <div class="control-group">
          <label class="control-label" for="spacing-control">
            Spacing: {activeSpacing}px
            <span class="mljr-text-xs mljr-text-muted mljr-ml-2">Gap between pattern elements (tile size = {activeSize + activeSpacing}px)</span>
          </label>
          <input 
            id="spacing-control"
            type="range" 
            min="0" 
            max="48" 
            step="4"
            value={activeSpacing}
            oninput={(e) => activeSpacing = parseInt(e.currentTarget.value)}
            class="range-input"
          />
        </div>
      </div>
    </Card>

    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <Card title="Theme Responsive" description="Automatically adapts to light/dark mode">
        <div class="theme-demo">
          <p class="mljr-mb-4">Current theme: <strong>{themeStore.resolvedTheme}</strong></p>
          <div class="color-comparison">
            <div class="color-box light-box">
              <span class="color-label">Light Mode</span>
              <span class="color-value">Warm Brown</span>
              <span class="color-hex">rgba(100, 60, 30, 0.25)</span>
            </div>
            <div class="color-box dark-box">
              <span class="color-label">Dark Mode</span>
              <span class="color-value">Light Cream</span>
              <span class="color-hex">rgba(255, 200, 150, 0.45)</span>
            </div>
          </div>
          <Button 
            variant="primary" 
            onclick={() => themeStore.toggleTheme()}
            class="mljr-mt-4"
          >
            Toggle Theme
          </Button>
        </div>
      </Card>

      <Card title="Usage" description="Simple implementation">
        <CodeExample code={`import { Background } from 'mljr-svelte';

<!-- Fixed background (default) -->
<Background 
  pattern="crosses"
  opacity={0.15}
  size={24}
  spacing={4}
/>

<!-- Relative/container background -->
<Background 
  pattern="dots"
  opacity={0.12}
  size={32}
  fixed={false}
/>

<!-- Custom colors -->
<Background 
  pattern="crosses"
  lightColor="rgba(100, 60, 30, 0.25)"
  darkColor="rgba(255, 200, 150, 0.45)"
/>`} />
      </Card>
    </div>

    <Card title="Pattern Previews" description="Visual examples of each pattern">
      <div class="pattern-previews">
        <div class="pattern-preview">
          <div class="preview-box crosses-preview">
            <svg viewBox="0 0 40 40" class="preview-svg">
              <line x1="20" y1="12" x2="20" y2="28" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
              <line x1="12" y1="20" x2="28" y2="20" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="preview-label">Crosses</span>
        </div>
        
        <div class="pattern-preview">
          <div class="preview-box dots-preview">
            <svg viewBox="0 0 40 40" class="preview-svg">
              <circle cx="20" cy="20" r="6" fill="currentColor"/>
            </svg>
          </div>
          <span class="preview-label">Dots</span>
        </div>
        
        <div class="pattern-preview">
          <div class="preview-box lines-preview">
            <svg viewBox="0 0 40 40" class="preview-svg">
              <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" stroke-width="3"/>
            </svg>
          </div>
          <span class="preview-label">Lines</span>
        </div>
      </div>
    </Card>
  </div>

  <CodeExample code={`// Fixed background (default)
<Background 
  pattern="crosses"
  opacity={0.15}
  size={24}
  spacing={16}
/>

// Relative/container background
<Background 
  pattern="dots"
  opacity={0.12}
  size={32}
  fixed={false}
/>

// Custom colors
<Background 
  pattern="lines"
  lightColor="rgba(100, 60, 30, 0.25)"
  darkColor="rgba(255, 200, 150, 0.45)"
/>

// Pattern options: crosses | dots | lines`} />
</section>

<style>
  .demo-area {
    position: relative;
    height: 160px;
    border-radius: var(--mljr-radius-xl);
    background: var(--mljr-bg);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--mljr-clay-inset-sm);
    margin-bottom: var(--mljr-space-6);
  }

  .demo-background-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  .demo-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: var(--mljr-space-4);
  }

  .demo-text {
    font-size: var(--mljr-text-xl);
    font-weight: 700;
    color: var(--mljr-text);
    margin: 0 0 var(--mljr-space-2) 0;
  }

  .demo-subtext {
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-muted);
    margin: 0;
  }

  .pattern-controls {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-5);
  }

  .control-group {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-2);
  }

  .control-group.half {
    flex: 1;
  }

  .control-row {
    display: flex;
    gap: var(--mljr-space-4);
  }

  .control-label {
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text-secondary);
  }

  .button-group {
    display: flex;
    flex-wrap: wrap;
    gap: var(--mljr-space-2);
  }

  .range-input {
    width: 100%;
    height: 8px;
    border-radius: var(--mljr-radius-full);
    background: var(--mljr-bg-tertiary);
    outline: none;
    -webkit-appearance: none;
    box-shadow: var(--mljr-clay-inset-sm);
  }

  .range-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: var(--mljr-radius-full);
    background: var(--mljr-gradient-primary);
    cursor: pointer;
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .range-input::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: var(--mljr-radius-full);
    background: var(--mljr-gradient-primary);
    cursor: pointer;
    border: none;
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .theme-demo {
    display: flex;
    flex-direction: column;
  }

  .color-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--mljr-space-4);
  }

  .color-box {
    padding: var(--mljr-space-4);
    border-radius: var(--mljr-radius-lg);
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-1);
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .light-box {
    background: linear-gradient(135deg, #faf8f5 0%, #f5f0eb 100%);
    color: rgba(100, 60, 30, 0.9);
  }

  .dark-box {
    background: linear-gradient(135deg, #2a2520 0%, #1c1917 100%);
    color: rgba(255, 200, 150, 0.9);
  }

  .color-label {
    font-size: var(--mljr-text-xs);
    font-weight: 700;
    text-transform: uppercase;
  }

  .color-value {
    font-size: var(--mljr-text-sm);
    font-weight: 600;
  }

  .color-hex {
    font-size: var(--mljr-text-xs);
    opacity: 0.7;
  }

  .pattern-previews {
    display: flex;
    gap: var(--mljr-space-6);
    justify-content: center;
    flex-wrap: wrap;
  }

  .pattern-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--mljr-space-2);
  }

  .preview-box {
    width: 80px;
    height: 80px;
    border-radius: var(--mljr-radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--mljr-clay-shadow);
  }

  .crosses-preview {
    background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
    color: #f97316;
  }

  .dots-preview {
    background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
    color: #a855f7;
  }

  .lines-preview {
    background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
    color: #14b8a6;
  }

  .preview-svg {
    width: 40px;
    height: 40px;
  }

  .preview-label {
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text-secondary);
  }

  @media (max-width: 640px) {
    .color-comparison {
      grid-template-columns: 1fr;
    }
    
    .control-row {
      flex-direction: column;
    }
  }
</style>
