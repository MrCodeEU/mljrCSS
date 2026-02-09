<script lang="ts">
  import { Card, CodeExample } from '$lib';

  let rangeValue = $state(50);
  let numberValue = $state(5);
  let searchValue = $state('');
</script>

<section id="advanced-inputs" class="mljr-mb-8">
  <Card title="Advanced Input Types" description="Range sliders, number inputs, search, and file uploads">
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <!-- Range Slider -->
      <div>
        <h4 class="mljr-h5 mljr-mb-3">Range Slider</h4>
        <div class="mljr-mb-4">
          <label class="mljr-label" for="volume-range">Volume: {rangeValue}%</label>
          <input
            id="volume-range"
            type="range"
            class="mljr-range"
            min="0"
            max="100"
            bind:value={rangeValue}
          />
        </div>
        <div class="mljr-mb-4">
          <label class="mljr-label" for="secondary-range">Secondary Slider</label>
          <input
            id="secondary-range"
            type="range"
            class="mljr-range mljr-range-secondary"
            min="0"
            max="100"
            value="60"
          />
        </div>
      </div>

      <!-- Number Input -->
      <div>
        <h4 class="mljr-h5 mljr-mb-3">Number Input with Spinner</h4>
        <label class="mljr-label" for="quantity-input">Quantity</label>
        <div class="mljr-number-input" style="max-width: 150px;">
          <button class="mljr-number-btn mljr-number-btn-decrement" onclick={() => numberValue = Math.max(0, numberValue - 1)} aria-label="Decrease quantity">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
            </svg>
          </button>
          <input
            id="quantity-input"
            type="number"
            class="mljr-input"
            bind:value={numberValue}
            min="0"
          />
          <button class="mljr-number-btn mljr-number-btn-increment" onclick={() => numberValue++} aria-label="Increase quantity">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Search Input -->
      <div>
        <h4 class="mljr-h5 mljr-mb-3">Search Input</h4>
        <div class="mljr-search">
          <svg class="mljr-search-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
          </svg>
          <input
            type="search"
            class="mljr-input mljr-search-input"
            placeholder="Search..."
            bind:value={searchValue}
          />
          {#if searchValue}
            <button class="mljr-search-clear" onclick={() => searchValue = ''} aria-label="Clear search">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          {/if}
        </div>
      </div>

      <!-- Color Picker -->
      <div>
        <h4 class="mljr-h5 mljr-mb-3">Color Picker</h4>
        <div class="mljr-color-picker">
          <input type="color" class="mljr-color-input" value="#0080ff" />
          <span class="mljr-text-sm">Select a color</span>
        </div>
      </div>

      <!-- File Input -->
      <div>
        <h4 class="mljr-h5 mljr-mb-3">File Input</h4>
        <div class="mljr-file-input">
          <input type="file" />
          <div class="mljr-file-input-label">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>Choose File</span>
          </div>
        </div>
      </div>

      <!-- Drop Zone -->
      <div>
        <h4 class="mljr-h5 mljr-mb-3">Drop Zone</h4>
        <div class="mljr-drop-zone">
          <svg class="mljr-drop-zone-icon" width="48" height="48" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
          </svg>
          <p class="mljr-drop-zone-text">Drop files here or click to upload</p>
          <p class="mljr-drop-zone-hint">PNG, JPG up to 10MB</p>
          <input type="file" style="display:none" />
        </div>
      </div>
    </div>

    <CodeExample code={`// Range Slider
&lt;input type="range" class="mljr-range" min="0" max="100" bind:value={rangeValue} /&gt;

// Secondary Range
&lt;input type="range" class="mljr-range mljr-range-secondary" /&gt;

// Number Input with Spinner
&lt;div class="mljr-number-input"&gt;
  &lt;button class="mljr-number-btn mljr-number-btn-decrement"&gt;-&lt;/button&gt;
  &lt;input type="number" class="mljr-input" bind:value={numberValue} /&gt;
  &lt;button class="mljr-number-btn mljr-number-btn-increment"&gt;+&lt;/button&gt;
&lt;/div&gt;

// Search Input
&lt;div class="mljr-search"&gt;
  &lt;svg class="mljr-search-icon"&gt;...&lt;/svg&gt;
  &lt;input type="search" class="mljr-input mljr-search-input" placeholder="Search..." /&gt;
&lt;/div&gt;

// Color Picker
&lt;div class="mljr-color-picker"&gt;
  &lt;input type="color" class="mljr-color-input" value="#0080ff" /&gt;
&lt;/div&gt;

// File Input
&lt;div class="mljr-file-input"&gt;
  &lt;input type="file" /&gt;
  &lt;div class="mljr-file-input-label"&gt;
    &lt;span&gt;Choose File&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;

// Drop Zone
&lt;div class="mljr-drop-zone"&gt;
  &lt;p class="mljr-drop-zone-text"&gt;Drop files here&lt;/p&gt;
  &lt;p class="mljr-drop-zone-hint"&gt;PNG, JPG up to 10MB&lt;/p&gt;
  &lt;input type="file" /&gt;
&lt;/div&gt;`} />
  </Card>
</section>
