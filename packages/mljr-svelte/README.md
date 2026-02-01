# mljr-svelte

Svelte 5 component library for the MLJR CSS framework. Built with runes and modern Svelte patterns.

## Installation

```bash
pnpm add mljr-svelte mljr-css
# or
npm install mljr-svelte mljr-css
```

## Setup

Make sure to include the MLJR CSS styles in your project. Either use the Tailwind plugin or import the CSS directly:

```js
// tailwind.config.js
import mljrPlugin from 'mljr-css';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [mljrPlugin()],
};
```

Or import the CSS:

```css
@import 'mljr-css/css';
```

## Components

### Button

```svelte
<script>
  import { Button } from 'mljr-svelte';
</script>

<Button>Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline-primary">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>

<!-- Sizes -->
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

<!-- States -->
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>
<Button block>Full Width</Button>
```

#### Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'outline-primary' \| 'outline-secondary' \| 'ghost' \| 'link' \| 'danger' \| 'success'` | `'default'` | Button style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Show loading spinner |
| `block` | `boolean` | `false` | Full width button |
| `icon` | `boolean` | `false` | Icon-only button (square) |

### Alert

```svelte
<script>
  import { Alert } from 'mljr-svelte';
</script>

<Alert variant="info" title="Information">
  This is an informational message.
</Alert>

<Alert variant="success" title="Success">
  Operation completed successfully.
</Alert>

<Alert variant="warning" title="Warning">
  Please review before proceeding.
</Alert>

<Alert variant="error" title="Error" dismissible onclose={() => console.log('closed')}>
  Something went wrong.
</Alert>

<!-- Solid variants -->
<Alert variant="primary" solid>
  Primary solid alert.
</Alert>
```

#### Alert Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'primary' \| 'secondary'` | `'default'` | Alert style variant |
| `title` | `string` | `''` | Alert title |
| `dismissible` | `boolean` | `false` | Show close button |
| `solid` | `boolean` | `false` | Use solid background |
| `onclose` | `() => void` | - | Callback when alert is dismissed |

### Badge

```svelte
<script>
  import { Badge } from 'mljr-svelte';
</script>

<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>

<!-- Solid -->
<Badge variant="primary" solid>Solid</Badge>

<!-- Outline -->
<Badge variant="primary" outline>Outline</Badge>

<!-- With dot -->
<Badge variant="primary" dot>With Dot</Badge>

<!-- Removable -->
<Badge variant="primary" removable onremove={() => console.log('removed')}>
  Removable
</Badge>
```

### Card

```svelte
<script>
  import { Card } from 'mljr-svelte';
</script>

<Card title="Card Title" description="Card description">
  Card content goes here.
</Card>

<Card title="Primary Card" variant="primary" shadow>
  Card with primary accent and shadow.
</Card>

<Card title="Interactive Card" interactive onclick={() => console.log('clicked')}>
  Click me!
</Card>

<!-- With custom header/footer -->
<Card>
  {#snippet header()}
    <div>Custom header</div>
  {/snippet}

  Card body content.

  {#snippet footer()}
    <Button variant="primary">Action</Button>
  {/snippet}
</Card>
```

#### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary'` | `'default'` | Card style variant |
| `title` | `string` | `''` | Card title |
| `description` | `string` | `''` | Card description |
| `shadow` | `boolean \| 'sm' \| 'md' \| 'lg'` | `false` | Card shadow |
| `interactive` | `boolean` | `false` | Make card clickable |
| `compact` | `boolean` | `false` | Remove header/footer borders |

### Input

```svelte
<script>
  import { Input } from 'mljr-svelte';

  let email = $state('');
</script>

<Input
  label="Email"
  type="email"
  placeholder="email@example.com"
  bind:value={email}
/>

<Input
  label="Password"
  type="password"
  required
  error
  errorText="Password is required"
/>

<Input
  label="Username"
  helperText="Choose a unique username"
/>
```

#### Input Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `''` | Input label |
| `helperText` | `string` | `''` | Helper text below input |
| `errorText` | `string` | `''` | Error message |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `error` | `boolean` | `false` | Error state |
| `success` | `boolean` | `false` | Success state |
| `required` | `boolean` | `false` | Show required indicator |

### Select

```svelte
<script>
  import { Select } from 'mljr-svelte';

  let country = $state('');
</script>

<Select label="Country" bind:value={country}>
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="de">Germany</option>
</Select>
```

### Checkbox

```svelte
<script>
  import { Checkbox } from 'mljr-svelte';

  let accepted = $state(false);
</script>

<Checkbox label="Accept terms and conditions" bind:checked={accepted} />
<Checkbox label="Secondary color" secondary />
<Checkbox label="Indeterminate" indeterminate />
```

### Switch

```svelte
<script>
  import { Switch } from 'mljr-svelte';

  let enabled = $state(false);
</script>

<Switch label="Enable notifications" bind:checked={enabled} />
<Switch label="Secondary color" secondary />
```

### Modal

```svelte
<script>
  import { Modal, Button } from 'mljr-svelte';

  let open = $state(false);
</script>

<Button onclick={() => open = true}>Open Modal</Button>

<Modal
  bind:open
  title="Confirm Action"
  description="Are you sure you want to proceed?"
>
  <p>This action cannot be undone.</p>

  {#snippet footer()}
    <Button variant="ghost" onclick={() => open = false}>Cancel</Button>
    <Button variant="primary" onclick={() => open = false}>Confirm</Button>
  {/snippet}
</Modal>
```

#### Modal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Modal visibility (bindable) |
| `title` | `string` | `''` | Modal title |
| `description` | `string` | `''` | Modal description |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal size |
| `closeOnBackdrop` | `boolean` | `true` | Close when clicking backdrop |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `showClose` | `boolean` | `true` | Show close button |

### Tabs

```svelte
<script>
  import { Tabs } from 'mljr-svelte';

  const tabs = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3', disabled: true },
  ];
</script>

<Tabs {tabs}>
  {#snippet children({ activeTab })}
    {#if activeTab === 'tab1'}
      <p>Content for Tab 1</p>
    {:else if activeTab === 'tab2'}
      <p>Content for Tab 2</p>
    {/if}
  {/snippet}
</Tabs>

<!-- Pill variant -->
<Tabs {tabs} variant="pills" />

<!-- Secondary color -->
<Tabs {tabs} secondary />
```

### Accordion

```svelte
<script>
  import { Accordion } from 'mljr-svelte';

  const items = [
    { id: '1', title: 'Section 1', content: 'Content for section 1' },
    { id: '2', title: 'Section 2', content: 'Content for section 2' },
    { id: '3', title: 'Section 3', content: 'Content for section 3' },
  ];
</script>

<Accordion {items} />

<!-- Allow multiple open -->
<Accordion {items} multiple />

<!-- Separated variant -->
<Accordion {items} variant="separated" />

<!-- Primary accent -->
<Accordion {items} primary />
```

## Theme Store

The theme store provides a reactive way to manage light/dark mode:

```svelte
<script>
  import { themeStore } from 'mljr-svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    themeStore.initialize();
  });
</script>

<button onclick={() => themeStore.toggleTheme()}>
  {themeStore.isDark ? 'Switch to Light' : 'Switch to Dark'}
</button>

<button onclick={() => themeStore.setTheme('system')}>
  Use System Theme
</button>

<p>Current theme: {themeStore.theme}</p>
<p>Resolved theme: {themeStore.resolvedTheme}</p>
```

### Theme Store API

| Property/Method | Type | Description |
|-----------------|------|-------------|
| `theme` | `'light' \| 'dark' \| 'system'` | Current theme setting |
| `resolvedTheme` | `'light' \| 'dark'` | Actual applied theme |
| `isDark` | `boolean` | Whether dark mode is active |
| `setTheme(theme)` | `(theme: Theme) => void` | Set theme |
| `toggleTheme()` | `() => void` | Toggle between light/dark |
| `initialize()` | `() => void` | Initialize theme from localStorage |

## License

MIT
