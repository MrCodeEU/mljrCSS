# MLJR CSS Framework

A TailwindCSS-based CSS framework with SvelteKit component library, featuring a Claymorphism design system with warm orange as the primary color and soft teal as secondary, working in both light and dark modes.

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [mljr-css](./packages/mljr-css) | 0.1.0 | CSS framework and Tailwind plugin |
| [mljr-svelte](./packages/mljr-svelte) | 0.1.0 | Svelte 5 component library |

## Quick Start

### Installation

```bash
# Install both packages
pnpm add mljr-css mljr-svelte

# Or install individually
pnpm add mljr-css
pnpm add mljr-svelte
```

### Using the CSS Framework

**Option 1: Tailwind Plugin**

```js
// tailwind.config.js
import mljrPlugin from 'mljr-css';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [mljrPlugin()],
};
```

**Option 2: Import CSS directly**

```css
/* app.css */
@import 'mljr-css/css';
```

**Option 3: CDN**

```html
<link rel="stylesheet" href="https://unpkg.com/mljr-css/dist/mljr.min.css">
```

### Using Svelte Components

```svelte
<script>
  import { Button, Card, Alert, Toast, Table, Spinner } from 'mljr-svelte';
</script>

<Card title="Welcome">
  <p>This is a card component.</p>
  <Button variant="primary">Click me</Button>
</Card>

<Alert variant="success" title="Success!">
  Operation completed successfully.
</Alert>
```

## Color Scheme

### Primary (Orange)
- `primary-500`: #F97316
- `primary-600`: #EA580C (buttons, links)
- `primary-700`: #C2410C (hover states)

### Secondary (Soft Teal)
- `secondary-500`: #14B8A6
- `secondary-600`: #0D9488 (buttons, links)
- `secondary-700`: #0F766E (hover states)

## Components

The library includes a comprehensive set of UI components:

| Category | Components |
|----------|------------|
| **Core** | Button, Card, Alert, Badge, Input, Select, Checkbox, Switch |
| **Navigation** | Tabs, Accordion, Breadcrumb, Dropdown, Pagination |
| **Feedback** | Modal, Toast, Tooltip, Popover, Progress, Spinner, Skeleton |
| **Data Display** | Table, Avatar, Stats, Timeline, Rating, Carousel |
| **Layout** | Divider, Background |
| **Interaction** | Slider, RangeSlider |

All components are available as both CSS classes (via `mljr-css`) and as Svelte 5 components (via `mljr-svelte`).

## Dark Mode

The framework supports both light and dark modes. Toggle between modes using:

- CSS class: `.dark`
- Data attribute: `[data-theme="dark"]`

```js
// Toggle dark mode
document.documentElement.classList.toggle('dark');
// or
document.documentElement.setAttribute('data-theme', 'dark');
```

Using the Svelte theme store:

```svelte
<script>
  import { themeStore } from 'mljr-svelte';

  // Initialize on mount
  themeStore.initialize();
</script>

<button onclick={() => themeStore.toggleTheme()}>
  Toggle theme
</button>
```

## Development

### Prerequisites

- Node.js 18+
- pnpm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/mljrCSS.git
cd mljrCSS

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development
pnpm dev
```

### Project Structure

```
mljrCSS/
├── .github/workflows/      # CI + Release automation
├── .changeset/             # Version management
├── packages/
│   ├── mljr-css/           # CSS framework
│   │   ├── src/
│   │   │   ├── themes/     # CSS variables, light/dark
│   │   │   ├── base/       # Reset, typography
│   │   │   ├── components/ # Buttons, cards, forms, etc.
│   │   │   ├── layout/     # Header, footer, grid, etc.
│   │   │   ├── utilities/  # Custom utilities
│   │   │   └── plugin.ts   # Tailwind plugin
│   │   └── dist/           # Built CSS + plugin
│   └── mljr-svelte/        # Svelte 5 components
│       └── src/lib/
│           ├── components/ # Button, Card, Alert, etc.
│           ├── stores/     # Theme store
│           └── index.ts    # Exports
├── pnpm-workspace.yaml
├── package.json
└── turbo.json
```

### Commands

```bash
# Build all packages
pnpm build

# Run development servers
pnpm dev

# Type check
pnpm check

# Create a changeset
pnpm changeset

# Version packages
pnpm version-packages

# Release packages
pnpm release
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Create a changeset (`pnpm changeset`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

MIT
