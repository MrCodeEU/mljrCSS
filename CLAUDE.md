# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run development servers
pnpm dev

# Type check (mljr-svelte only)
pnpm check
```

### Package-Specific Commands

**mljr-css:**
```bash
cd packages/mljr-css
pnpm build:css     # Build CSS files
pnpm build:plugin  # Build Tailwind plugin (tsup)
pnpm dev           # Watch CSS changes
```

**mljr-svelte:**
```bash
cd packages/mljr-svelte
pnpm dev           # Vite dev server
pnpm package       # Build component library
pnpm check         # Svelte type check
```

## Architecture

This is a pnpm monorepo managed by Turborepo with two packages:

- **mljr-css**: TailwindCSS-based CSS framework
  - Tailwind plugin at `src/plugin.ts` that adds CSS custom properties and extends the theme
  - Raw CSS components in `src/` organized by type (base, components, layout, themes, utilities)
  - Builds to both a standalone CSS file and a Tailwind plugin

- **mljr-svelte**: Svelte 5 component library
  - Components in `src/lib/components/` wrapping the mljr-css classes
  - Uses Svelte 5 runes ($state, $derived, etc.) and snippet syntax
  - Theme store at `src/lib/stores/theme.svelte.ts` for light/dark mode management
  - Depends on `mljr-css` via workspace link

## Key Conventions

- CSS class prefix: `mljr-` (e.g., `mljr-btn`, `mljr-card`)
- CSS custom properties prefix: `--mljr-` (e.g., `--mljr-primary-600`)
- Dark mode: enabled via `.dark` class or `[data-theme="dark"]` attribute

## Design System (Claymorphism)

A soft, inflated, playful 3D aesthetic with rounded corners, dual shadows, and warm pastel colors that complement the MLJR orange gradient logo.

**Color Scheme:**
- Primary: Warm Orange (#f97316) - matches logo gradient, main brand color
- Secondary: Soft Teal (#14b8a6) - complementary to orange
- Accent: Soft Purple (#a855f7) - for variety and highlights
- Background: Warm cream (#fffbf7) with peachy undertones

**Typography:**
- Display font: Inter - friendly, rounded font for headings
- Body font: Inter - readable body text
- Mono font: JetBrains Mono - used for code

**Shadow System (Clay Effect):**
- `--mljr-clay-shadow` - Standard raised/convex effect (dual light/dark shadows)
- `--mljr-clay-shadow-sm` - Small raised effect
- `--mljr-clay-shadow-lg` - Large raised effect
- `--mljr-clay-inset` - Pressed/concave effect
- `--mljr-clay-inset-sm` - Small pressed effect
- `--mljr-clay-btn` - Button-specific shadow with inner highlight
- `--mljr-clay-btn-pressed` - Button pressed state

**Border Radius System:**
- `--mljr-radius-sm`: 12px - Small rounded corners
- `--mljr-radius-md`: 20px - Medium rounded corners
- `--mljr-radius-lg`: 28px - Large rounded corners
- `--mljr-radius-xl`: 36px - Extra large rounded corners
- `--mljr-radius-2xl`: 48px - Very large rounded corners
- `--mljr-radius-full`: 9999px - Fully rounded (pill/circle)

**Utility Classes:**
- `.mljr-clay` - Apply standard clay shadow
- `.mljr-clay-sm`, `.mljr-clay-lg` - Size variants
- `.mljr-clay-inset`, `.mljr-clay-inset-sm` - Inset/pressed shadows
- `.mljr-frosted` - Frosted glass effect (backdrop blur + semi-transparent)
- `.mljr-frosted-strong`, `.mljr-frosted-subtle` - Frosted glass variants
- `.mljr-rounded-clay` - Large border radius for clay look
- `.mljr-soft-panel` - Combines clay shadow + rounded corners
- `.mljr-floating-panel` - Elevated panel appearance
- `.mljr-hover-lift` - Lift effect on hover
- `.mljr-hover-clay` - Clay shadow on hover
- `.mljr-shimmer` - Soft shimmer animation

**Components:**

*CSS components* (`packages/mljr-css/src/components/`):
- `button.css` - Buttons with clay shadow and press effects
- `input.css` - Text inputs with inset clay styling
- `select.css` - Select dropdowns
- `checkbox.css` - Checkboxes and switches
- `alert.css` - Alert banners (info, success, warning, error)
- `badge.css` - Small status indicators
- `card.css` - Content cards with clay shadow
- `carousel.css` - Image/content carousels
- `modal.css` - Dialog overlays
- `tabs.css` - Tab navigation
- `accordion.css` - Collapsible content panels
- `tooltip.css` - Hover tooltips
- `progress.css` - Progress bars
- `skeleton.css` - Loading placeholder animations
- `avatar.css` - User avatars (square, circle)
- `divider.css` - Horizontal/vertical dividers
- `spinner.css` - Loading spinners (circle, ring, pulse, dots, bars, orbit)
- `toast.css` - Toast notifications (info, success, warning, error)
- `popover.css` - Click/hover popovers with frosted glass
- `dropdown.css` - Dropdown menus with items, dividers, headers
- `pagination.css` - Page navigation controls
- `breadcrumb.css` - Breadcrumb navigation
- `table.css` - Data tables (striped, compact, bordered, sortable, responsive)

*Svelte components* (`packages/mljr-svelte/src/lib/components/`):
- All CSS components above have Svelte wrappers, plus these Svelte-only components:
- `Background.svelte` - Animated/decorative backgrounds with pattern support
- `Icon.svelte` - Universal icon component using Iconify (200,000+ icons)
- `Navbar.svelte` - Responsive navigation bar with mobile menu
- `ThemeToggle.svelte` - Theme switcher with multiple variants
- `PhoneInput.svelte` - International phone input with country flags
- `DatePicker.svelte` - Date picker with optional time selection
- `ColorPicker.svelte` - Color picker with HSL/RGB/Hex support
- `EmailInput.svelte` - Email input with validation
- `CommandPalette.svelte` - Keyboard-driven command palette (Cmd+K)
- `SearchInput.svelte` - Search input with loading state
- `Rating.svelte` - Star/icon rating input
- `Slider.svelte` - Single-value range slider
- `RangeSlider.svelte` - Dual-handle range slider
- `Stats.svelte` - Statistic display cards
- `Timeline.svelte` - Vertical timeline

*Stores* (`packages/mljr-svelte/src/lib/stores/`):
- `themeStore` from `theme.svelte` - Light/dark mode management with cookie support (exports `Theme` type)
  - Methods: `setTheme()`, `toggleTheme()`, `resetToSystem()`, `initialize(savedTheme?)`
  - Properties: `theme`, `resolvedTheme`, `isDark`, `isSystem`, `initialized`
  - SSR helper: `parseThemeFromCookie(cookieHeader)`
- `toastStore` from `toast.svelte` - Toast notification state management (exports `ToastType`, `ToastPosition` types)

**Component Variants:**
- Button: `primary`, `secondary`, `outline-primary`, `outline-secondary`, `ghost`, `link`, `danger`, `success`
- Card: `default`, `primary`, `secondary`
- Navbar: `default`, `transparent`, `sticky`, `fixed`
- ThemeToggle: `default` (dropdown), `simple` (toggle), `segmented` (3-way)
- Avatar: `square` (default, soft rounded), `circle`
- Spinner: `circle` (default), `ring`, `pulse`, `dots`, `bars`, `orbit`; sizes: `xs`, `sm`, `lg`, `xl`; colors: primary (default), `secondary`
- Toast: `info`, `success`, `warning`, `error`; positions: top-right, top-left, top-center, bottom-right, bottom-left, bottom-center
- Dropdown: sizes: `sm`, `lg`; items: default, `active`, `disabled`, `danger`
- Pagination: sizes: `sm`, `lg`; colors: primary (default), `secondary`
- Table: `striped`, `compact`, `bordered`, `responsive`; sortable headers
- DatePicker: `short`, `medium`, `long`, `iso` date formats
- ColorPicker: `hex`, `rgb`, `hsl` color formats; optional alpha channel

## Breaking Changes (v0.2.0)

The following Detroit-style variants have been removed in favor of Claymorphism:
- Button: `.mljr-btn-detroit`, `.mljr-btn-hud`, `.mljr-btn-accent`
- Card: `.mljr-card-detroit`, `.mljr-card-hud`
- Carousel: `indicatorStyle` prop (`diamond`, `led` options removed)
- Avatar: `hexagon` shape removed (use `square` or `circle`)
- Utility classes: `.mljr-clip-*`, `.mljr-glow-*`, `.mljr-hud-*`, `.mljr-scanline`, `.mljr-holographic`

## Versioning

Uses Changesets for version management:
```bash
pnpm changeset           # Create a changeset
pnpm version-packages    # Apply changesets
pnpm release             # Build and publish
```
