<script lang="ts">
  import Icon from './Icon.svelte';
  import Slider from './Slider.svelte';

  interface Props {
    /** Selected color (hex format) */
    value?: string;
    /** Input label */
    label?: string;
    /** Show alpha channel */
    showAlpha?: boolean;
    /** Preset colors */
    presets?: string[];
    /** Show color format toggle */
    showFormat?: boolean;
    /** Additional CSS class */
    class?: string;
    /** Callback when color changes */
    onchange?: (color: string) => void;
  }

  let {
    value = $bindable('#F97316'),
    label,
    showAlpha = false,
    presets = ['#F97316', '#14B8A6', '#8B5CF6', '#EF4444', '#10B981', '#3B82F6', '#F59E0B', '#6B7280'],
    showFormat = true,
    class: className = '',
    onchange,
  }: Props = $props();

  let isOpen = $state(false);
  let format = $state<'hex' | 'rgb' | 'hsl'>('hex');
  
  // Generate unique ID for label association
  const triggerId = 'colorpicker-' + Math.random().toString(36).slice(2, 9);

  // Convert hex to RGB
  function hexToRgb(hex: string): { r: number; g: number; b: number; a: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex) ||
                   /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);
    if (!result) return null;
    
    const r = parseInt(result[1].length === 1 ? result[1] + result[1] : result[1], 16);
    const g = parseInt(result[2].length === 1 ? result[2] + result[2] : result[2], 16);
    const b = parseInt(result[3].length === 1 ? result[3] + result[3] : result[3], 16);
    const a = result[4] ? parseInt(result[4].length === 1 ? result[4] + result[4] : result[4], 16) / 255 : 1;
    
    return { r, g, b, a };
  }

  // Convert RGB to hex
  function rgbToHex(r: number, g: number, b: number, a?: number): string {
    const toHex = (n: number) => {
      const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    if (a !== undefined && a < 1) {
      hex += toHex(Math.round(a * 255));
    }
    return hex.toUpperCase();
  }

  // Convert RGB to HSL
  function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  // Convert HSL to RGB
  function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  // Derived RGB values
  let rgb = $derived(hexToRgb(value) || { r: 249, g: 115, b: 22, a: 1 });
  let hsl = $derived(rgbToHsl(rgb.r, rgb.g, rgb.b));

  // Update color from RGB components
  function updateFromRgb(r: number, g: number, b: number, a?: number) {
    value = rgbToHex(r, g, b, a);
    onchange?.(value);
  }

  // Update color from HSL components
  function updateFromHsl(h: number, s: number, l: number) {
    const newRgb = hslToRgb(h, s, l);
    value = rgbToHex(newRgb.r, newRgb.g, newRgb.b, rgb.a);
    onchange?.(value);
  }

  // Format display value
  let displayValue = $derived(() => {
    switch (format) {
      case 'rgb':
        return showAlpha 
          ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.round(rgb.a * 100) / 100})`
          : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case 'hsl':
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      case 'hex':
      default:
        return showAlpha && rgb.a < 1 
          ? value.toUpperCase()
          : value.toUpperCase().slice(0, 7);
    }
  });

  function handlePresetClick(preset: string) {
    value = preset;
    onchange?.(value);
  }

  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    if (/^#[0-9A-Fa-f]{0,8}$/.test(newValue)) {
      value = newValue;
      onchange?.(value);
    }
  }

  function toggleFormat() {
    const formats: ('hex' | 'rgb' | 'hsl')[] = ['hex', 'rgb', 'hsl'];
    const currentIndex = formats.indexOf(format);
    format = formats[(currentIndex + 1) % formats.length];
  }

  import { browser } from '$app/environment';
  
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.mljr-colorpicker')) {
      isOpen = false;
    }
  }

  $effect(() => {
    if (browser && isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  });
</script>

<div class="mljr-colorpicker {className}" class:is-open={isOpen}>
  {#if label}
    <label class="mljr-colorpicker-label" for={triggerId}>{label}</label>
  {/if}

  <button
    type="button"
    id={triggerId}
    class="mljr-colorpicker-trigger"
    onclick={() => isOpen = !isOpen}
  >
    <span class="mljr-colorpicker-preview" style="background-color: {value}"></span>
    <span class="mljr-colorpicker-value">{displayValue()}</span>
    {#if showFormat}
      <span 
        class="mljr-colorpicker-format"
        onclick={(e) => { e.stopPropagation(); toggleFormat(); }}
        role="button"
        tabindex="0"
        onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFormat(); }}}
      >
        {format.toUpperCase()}
      </span>
    {/if}
  </button>

  {#if isOpen}
    <div class="mljr-colorpicker-popup">
      <!-- Saturation/Lightness Box -->
      <div class="mljr-colorpicker-saturation">
        <div 
          class="mljr-colorpicker-saturation-bg"
          style="background-color: hsl({hsl.h}, 100%, 50%)"
        >
          <div class="mljr-colorpicker-saturation-white"></div>
          <div class="mljr-colorpicker-saturation-black"></div>
        </div>
      </div>

      <!-- Hue Slider -->
      <div class="mljr-colorpicker-row">
        <span class="mljr-colorpicker-label-sm">H</span>
        <Slider
          value={hsl.h}
          min={0}
          max={360}
          onchange={(v) => updateFromHsl(v, hsl.s, hsl.l)}
        />
        <span class="mljr-colorpicker-value-sm">{hsl.h}°</span>
      </div>

      <!-- Saturation Slider -->
      <div class="mljr-colorpicker-row">
        <span class="mljr-colorpicker-label-sm">S</span>
        <Slider
          value={hsl.s}
          min={0}
          max={100}
          onchange={(v) => updateFromHsl(hsl.h, v, hsl.l)}
        />
        <span class="mljr-colorpicker-value-sm">{hsl.s}%</span>
      </div>

      <!-- Lightness Slider -->
      <div class="mljr-colorpicker-row">
        <span class="mljr-colorpicker-label-sm">L</span>
        <Slider
          value={hsl.l}
          min={0}
          max={100}
          onchange={(v) => updateFromHsl(hsl.h, hsl.s, v)}
        />
        <span class="mljr-colorpicker-value-sm">{hsl.l}%</span>
      </div>

      <!-- RGB Sliders -->
      <div class="mljr-colorpicker-rgb">
        <div class="mljr-colorpicker-row">
          <span class="mljr-colorpicker-label-sm" style="color: #ef4444">R</span>
          <Slider
            value={rgb.r}
            min={0}
            max={255}
            onchange={(v) => updateFromRgb(v, rgb.g, rgb.b, rgb.a)}
          />
          <span class="mljr-colorpicker-value-sm">{rgb.r}</span>
        </div>
        <div class="mljr-colorpicker-row">
          <span class="mljr-colorpicker-label-sm" style="color: #22c55e">G</span>
          <Slider
            value={rgb.g}
            min={0}
            max={255}
            onchange={(v) => updateFromRgb(rgb.r, v, rgb.b, rgb.a)}
          />
          <span class="mljr-colorpicker-value-sm">{rgb.g}</span>
        </div>
        <div class="mljr-colorpicker-row">
          <span class="mljr-colorpicker-label-sm" style="color: #3b82f6">B</span>
          <Slider
            value={rgb.b}
            min={0}
            max={255}
            onchange={(v) => updateFromRgb(rgb.r, rgb.g, v, rgb.a)}
          />
          <span class="mljr-colorpicker-value-sm">{rgb.b}</span>
        </div>
      </div>

      <!-- Alpha Slider -->
      {#if showAlpha}
        <div class="mljr-colorpicker-row">
          <span class="mljr-colorpicker-label-sm">A</span>
          <Slider
            value={Math.round(rgb.a * 100)}
            min={0}
            max={100}
            onchange={(v) => updateFromRgb(rgb.r, rgb.g, rgb.b, v / 100)}
          />
          <span class="mljr-colorpicker-value-sm">{Math.round(rgb.a * 100)}%</span>
        </div>
      {/if}

      <!-- Hex Input -->
      <div class="mljr-colorpicker-hex">
        <span class="mljr-colorpicker-label-sm">HEX</span>
        <input
          type="text"
          value={value.toUpperCase()}
          oninput={handleInputChange}
          maxlength={showAlpha ? 9 : 7}
        />
      </div>

      <!-- Presets -->
      <div class="mljr-colorpicker-presets">
        {#each presets as preset}
          <button
            type="button"
            class="mljr-colorpicker-preset"
            class:active={preset.toLowerCase() === value.toLowerCase()}
            style="background-color: {preset}"
            onclick={() => handlePresetClick(preset)}
            title={preset}
          ></button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .mljr-colorpicker {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    gap: var(--mljr-space-2);
  }

  .mljr-colorpicker-label {
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text);
  }

  .mljr-colorpicker-trigger {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-3);
    padding: var(--mljr-space-2) var(--mljr-space-3);
    background: var(--mljr-bg);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-lg);
    color: var(--mljr-text);
    font-size: var(--mljr-text-sm);
    cursor: pointer;
    box-shadow: var(--mljr-clay-inset-sm);
    transition: all var(--mljr-transition-fast);
  }

  .mljr-colorpicker-trigger:hover {
    border-color: var(--mljr-primary-400);
  }

  .mljr-colorpicker-preview {
    width: 24px;
    height: 24px;
    border-radius: var(--mljr-radius-md);
    border: 2px solid var(--mljr-border);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3);
  }

  .mljr-colorpicker-value {
    flex: 1;
    font-family: monospace;
    font-variant-numeric: tabular-nums;
  }

  .mljr-colorpicker-format {
    padding: var(--mljr-space-1) var(--mljr-space-2);
    background: var(--mljr-bg-secondary);
    border: none;
    border-radius: var(--mljr-radius-md);
    color: var(--mljr-text-muted);
    font-size: var(--mljr-text-xs);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--mljr-transition-fast);
  }

  .mljr-colorpicker-format:hover {
    background: var(--mljr-primary-100);
    color: var(--mljr-primary-600);
  }

  /* Popup */
  .mljr-colorpicker-popup {
    position: absolute;
    top: calc(100% + var(--mljr-space-2));
    left: 0;
    width: 280px;
    padding: var(--mljr-space-4);
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-xl);
    box-shadow: var(--mljr-clay-shadow-lg);
    z-index: 50;
    animation: colorpickerSlide 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-4);
  }

  @keyframes colorpickerSlide {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Saturation Box */
  .mljr-colorpicker-saturation {
    height: 120px;
    border-radius: var(--mljr-radius-lg);
    overflow: hidden;
  }

  .mljr-colorpicker-saturation-bg {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .mljr-colorpicker-saturation-white {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, white, transparent);
  }

  .mljr-colorpicker-saturation-black {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, black, transparent);
  }

  /* Rows */
  .mljr-colorpicker-row {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-3);
  }

  .mljr-colorpicker-row :global(.mljr-slider) {
    flex: 1;
  }

  .mljr-colorpicker-label-sm {
    width: 20px;
    font-size: var(--mljr-text-xs);
    font-weight: 700;
    color: var(--mljr-text-muted);
  }

  .mljr-colorpicker-value-sm {
    width: 40px;
    font-size: var(--mljr-text-xs);
    font-family: monospace;
    color: var(--mljr-text-secondary);
    text-align: right;
  }

  /* Hex Input */
  .mljr-colorpicker-hex {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-3);
    padding-top: var(--mljr-space-2);
    border-top: 1px solid var(--mljr-border);
  }

  .mljr-colorpicker-hex input {
    flex: 1;
    padding: var(--mljr-space-2) var(--mljr-space-3);
    background: var(--mljr-bg-secondary);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-md);
    color: var(--mljr-text);
    font-family: monospace;
    font-size: var(--mljr-text-sm);
    text-transform: uppercase;
  }

  .mljr-colorpicker-hex input:focus {
    outline: none;
    border-color: var(--mljr-primary-400);
  }

  /* Presets */
  .mljr-colorpicker-presets {
    display: flex;
    flex-wrap: wrap;
    gap: var(--mljr-space-2);
    padding-top: var(--mljr-space-2);
    border-top: 1px solid var(--mljr-border);
  }

  .mljr-colorpicker-preset {
    width: 28px;
    height: 28px;
    border: 2px solid var(--mljr-border);
    border-radius: var(--mljr-radius-md);
    cursor: pointer;
    transition: all var(--mljr-transition-fast);
    box-shadow: var(--mljr-clay-shadow-xs);
  }

  .mljr-colorpicker-preset:hover {
    transform: scale(1.15);
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .mljr-colorpicker-preset.active {
    border-color: var(--mljr-primary-500);
    box-shadow: 0 0 0 2px var(--mljr-primary-200);
  }

  /* Dark Mode */
  :global([data-theme="dark"]) .mljr-colorpicker-popup,
  :global(.dark) .mljr-colorpicker-popup {
    background: var(--mljr-bg-secondary);
  }
</style>
