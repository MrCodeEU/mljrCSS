# mljr-css

A TailwindCSS-based CSS framework with an orange/purple color scheme that works in both light and dark modes.

## Installation

```bash
pnpm add mljr-css
# or
npm install mljr-css
# or
yarn add mljr-css
```

## Usage

### As a Tailwind Plugin

```js
// tailwind.config.js
import mljrPlugin from 'mljr-css';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [mljrPlugin()],
};
```

#### Plugin Options

```js
mljrPlugin({
  // Disable dark mode (default: true)
  darkMode: false,

  // Custom primary color palette
  primaryColor: {
    50: '#fff7ed',
    100: '#ffedd5',
    // ... full palette
    950: '#431407',
  },

  // Custom secondary color palette
  secondaryColor: {
    50: '#faf5ff',
    // ... full palette
  },
});
```

### Import CSS Directly

```css
/* Import the full CSS file */
@import 'mljr-css/css';

/* Or the minified version */
@import 'mljr-css/css/min';
```

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/mljr-css/dist/mljr.min.css">
```

## Components

### Buttons

```html
<button class="mljr-btn mljr-btn-primary">Primary</button>
<button class="mljr-btn mljr-btn-secondary">Secondary</button>
<button class="mljr-btn mljr-btn-outline-primary">Outline</button>
<button class="mljr-btn mljr-btn-ghost">Ghost</button>
<button class="mljr-btn mljr-btn-danger">Danger</button>

<!-- Sizes -->
<button class="mljr-btn mljr-btn-primary mljr-btn-xs">Extra Small</button>
<button class="mljr-btn mljr-btn-primary mljr-btn-sm">Small</button>
<button class="mljr-btn mljr-btn-primary mljr-btn-lg">Large</button>
<button class="mljr-btn mljr-btn-primary mljr-btn-xl">Extra Large</button>

<!-- States -->
<button class="mljr-btn mljr-btn-primary mljr-btn-loading">Loading</button>
<button class="mljr-btn mljr-btn-primary" disabled>Disabled</button>
```

### Form Inputs

```html
<div class="mljr-form-group">
  <label class="mljr-label">Email</label>
  <input type="email" class="mljr-input" placeholder="email@example.com">
  <p class="mljr-input-helper">We'll never share your email.</p>
</div>

<!-- With error -->
<div class="mljr-form-group">
  <label class="mljr-label mljr-label-required">Password</label>
  <input type="password" class="mljr-input mljr-input-error">
  <p class="mljr-input-error-text">Password is required.</p>
</div>
```

### Select

```html
<select class="mljr-select">
  <option>Select an option</option>
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

### Checkbox & Radio

```html
<label class="mljr-checkbox">
  <input type="checkbox" class="mljr-checkbox-input">
  <span class="mljr-checkbox-label">Accept terms</span>
</label>

<label class="mljr-radio">
  <input type="radio" name="option" class="mljr-radio-input">
  <span class="mljr-radio-label">Option A</span>
</label>
```

### Switch

```html
<label class="mljr-switch">
  <input type="checkbox" class="mljr-switch-input">
  <span class="mljr-switch-label">Enable notifications</span>
</label>
```

### Alerts

```html
<div class="mljr-alert mljr-alert-info">
  <div class="mljr-alert-content">
    <div class="mljr-alert-title">Information</div>
    <div class="mljr-alert-description">This is an info alert.</div>
  </div>
</div>

<div class="mljr-alert mljr-alert-success">Success message</div>
<div class="mljr-alert mljr-alert-warning">Warning message</div>
<div class="mljr-alert mljr-alert-error">Error message</div>

<!-- Solid variants -->
<div class="mljr-alert mljr-alert-primary-solid">Primary solid</div>
```

### Badges

```html
<span class="mljr-badge mljr-badge-primary">Primary</span>
<span class="mljr-badge mljr-badge-secondary">Secondary</span>
<span class="mljr-badge mljr-badge-success">Success</span>

<!-- Solid -->
<span class="mljr-badge mljr-badge-primary-solid">Solid</span>

<!-- With dot -->
<span class="mljr-badge mljr-badge-primary mljr-badge-dot">With Dot</span>
```

### Cards

```html
<div class="mljr-card mljr-card-shadow">
  <div class="mljr-card-header">
    <h3 class="mljr-card-title">Card Title</h3>
    <p class="mljr-card-description">Card description</p>
  </div>
  <div class="mljr-card-body">
    Card content goes here.
  </div>
  <div class="mljr-card-footer">
    Footer content
  </div>
</div>
```

### Modal

```html
<div class="mljr-modal-backdrop" data-state="open">
  <div class="mljr-modal">
    <div class="mljr-modal-header">
      <h2 class="mljr-modal-title">Modal Title</h2>
      <button class="mljr-modal-close">×</button>
    </div>
    <div class="mljr-modal-body">
      Modal content
    </div>
    <div class="mljr-modal-footer">
      <button class="mljr-btn mljr-btn-ghost">Cancel</button>
      <button class="mljr-btn mljr-btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

### Tabs

```html
<div class="mljr-tabs">
  <div class="mljr-tabs-list">
    <button class="mljr-tab mljr-tab-active">Tab 1</button>
    <button class="mljr-tab">Tab 2</button>
    <button class="mljr-tab">Tab 3</button>
  </div>
  <div class="mljr-tabs-content">
    <div class="mljr-tabs-panel mljr-tabs-panel-active">
      Tab 1 content
    </div>
  </div>
</div>
```

### Accordion

```html
<div class="mljr-accordion">
  <div class="mljr-accordion-item mljr-accordion-item-open">
    <button class="mljr-accordion-trigger">
      <span>Section 1</span>
      <svg class="mljr-accordion-icon">...</svg>
    </button>
    <div class="mljr-accordion-content mljr-accordion-content-open">
      <div class="mljr-accordion-body">
        Content for section 1
      </div>
    </div>
  </div>
</div>
```

## Layout

### Container

```html
<div class="mljr-container">
  Centered container with responsive padding
</div>

<div class="mljr-container-fluid">
  Full-width container with padding
</div>
```

### Grid

```html
<div class="mljr-grid mljr-grid-cols-3 mljr-gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- Responsive -->
<div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-lg:grid-cols-4">
  ...
</div>
```

## Dark Mode

Enable dark mode by adding the `.dark` class or `data-theme="dark"` attribute to the root element:

```html
<html class="dark">
  <!-- or -->
<html data-theme="dark">
```

## CSS Custom Properties

The framework uses CSS custom properties for theming:

```css
:root {
  --mljr-primary-600: #ea580c;
  --mljr-secondary-600: #9333ea;
  --mljr-bg: #ffffff;
  --mljr-text: #111827;
  /* ... and more */
}
```

## License

MIT
