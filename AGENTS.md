# MLJR CSS Framework - Agent Guide

This document provides essential information for AI coding agents working on the MLJR CSS Framework project.

## Project Overview

MLJR CSS is a TailwindCSS-based CSS framework with a SvelteKit component library, featuring a **Claymorphism design system** with warm orange as the primary color and soft teal as secondary. It supports both light and dark modes.

### Key Characteristics

- **Monorepo**: pnpm workspace with Turborepo orchestration
- **Design Style**: Claymorphism (soft, inflated, playful 3D aesthetic with dual shadows)
- **Color Scheme**: Warm Orange (#F97316) primary, Soft Teal (#14B8A6) secondary, Soft Purple (#A855F7) accent
- **CSS Prefix**: `mljr-` for all classes (e.g., `mljr-btn`, `mljr-card`)
- **CSS Variables**: `--mljr-` prefix for all custom properties

## Project Structure

```
mljrCSS/
├── .changeset/              # Changesets configuration for versioning
├── .github/workflows/       # CI/CD: ci.yml, release.yml
├── packages/
│   ├── mljr-css/            # CSS framework & Tailwind plugin
│   │   ├── src/
│   │   │   ├── themes/      # CSS variables (variables.css)
│   │   │   ├── base/        # Reset, typography
│   │   │   ├── components/  # All component CSS (button.css, card.css, etc.)
│   │   │   ├── layout/      # Container, header, footer, etc.
│   │   │   ├── utilities/   # Custom utility classes
│   │   │   ├── index.css    # Main CSS entry point
│   │   │   └── plugin.ts    # Tailwind plugin entry point
│   │   ├── dist/            # Built CSS + plugin
│   │   └── package.json
│   └── mljr-svelte/         # Svelte 5 component library
│       ├── src/
│       │   ├── lib/
│       │   │   ├── components/  # All Svelte components (40+ components)
│       │   │   ├── stores/      # theme.svelte.ts, toast.svelte.ts
│       │   │   └── index.ts     # Package exports
│       │   ├── routes/          # Dev server showcase/demo
│       │   └── tests/           # Unit & E2E tests
│       ├── dist/                # Built package
│       └── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
└── Makefile
```

## Technology Stack

| Category | Tools |
|----------|-------|
| Package Manager | pnpm 10.6.0 |
| Monorepo | Turborepo 2.0 |
| Build | PostCSS, tsup, Vite |
| CSS | TailwindCSS 3.4, PostCSS, Autoprefixer, cssnano |
| Framework | Svelte 5 (runes mode), SvelteKit 2 |
| Icons | Iconify (@iconify/svelte) |
| Phone Validation | libphonenumber-js |
| Language | TypeScript 5.4 |
| Testing | Vitest 2, Playwright, @testing-library/svelte |
| Versioning | Changesets |
| CI/CD | GitHub Actions |

## Build Commands

### Root Level (Makefile shortcuts available)

```bash
# Install and setup
pnpm install
make setup          # Install + build (first time)
make start          # Quick start: install, build CSS, dev server

# Build
pnpm build          # Build all packages
make build-css      # Build mljr-css only
make build-svelte   # Build mljr-svelte only

# Development
pnpm dev            # Start dev server (SvelteKit)
make dev            # Same as above
make watch-css      # Watch CSS changes only

# Type checking
pnpm check          # Type check mljr-svelte
make check

# Testing
make test           # Run E2E tests (recommended)
make test-e2e       # Run Playwright E2E tests
make test-e2e-ui    # Run E2E tests with UI
make test-coverage  # Coverage report

# ⚠️ Unit tests are NOT compatible with Svelte 5 runes mode
# See CLAUDE.md for details

# Cleaning
pnpm clean          # Remove all build artifacts + node_modules
make clean

# Versioning & Release
pnpm changeset           # Create a changeset
pnpm version-packages    # Apply changesets to version packages
pnpm release             # Build and publish to npm
make release
```

### Package-Specific Commands

**mljr-css:**
```bash
cd packages/mljr-css
pnpm build:css      # Build CSS (dev & minified)
pnpm build:plugin   # Build Tailwind plugin (tsup)
pnpm dev            # Watch CSS changes
```

**mljr-svelte:**
```bash
cd packages/mljr-svelte
pnpm dev            # Vite dev server
pnpm package        # Build component library for distribution
pnpm check          # Svelte type check
pnpm test:e2e       # Playwright E2E tests
```

## Key Conventions

### CSS Framework (mljr-css)

1. **File Organization**: Each component has its own CSS file in `src/components/`
2. **Class Naming**: All classes use `mljr-` prefix (e.g., `mljr-btn`, `mljr-card`)
3. **CSS Variables**: All custom properties use `--mljr-` prefix
4. **Dark Mode**: Support via `.dark` class or `[data-theme="dark"]` attribute
5. **Entry Point**: `src/index.css` imports all component CSS + Tailwind directives

### Svelte Components (mljr-svelte)

1. **Svelte 5 Runes**: All components use `$state`, `$derived`, `$props` runes
2. **Snippet Children**: Use `children?: Snippet` prop for content slots
3. **TypeScript**: All components use `lang="ts"`
4. **CSS Classes**: Components apply `mljr-*` CSS classes from mljr-css
5. **Props Interface**: Extend `HTML*Attributes` for native prop support

### Example Component Pattern

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface Props extends HTMLButtonAttributes {
    variant?: 'default' | 'primary' | 'secondary';
    children?: Snippet;
  }

  let { variant = 'default', children, ...rest }: Props = $props();
</script>

<button class="mljr-btn mljr-btn-{variant}" {...rest}>
  {#if children}{@render children()}{/if}
</button>
```

## Design System Reference

### Claymorphism Shadow System

| Variable | Description |
|----------|-------------|
| `--mljr-clay-shadow` | Standard raised/convex effect |
| `--mljr-clay-shadow-sm/lg/xl` | Size variants |
| `--mljr-clay-inset` | Pressed/concave effect |
| `--mljr-clay-btn` | Button-specific shadow |
| `--mljr-clay-btn-pressed` | Button pressed state |

### Border Radius System

| Variable | Value |
|----------|-------|
| `--mljr-radius-sm` | 12px |
| `--mljr-radius-md` | 20px |
| `--mljr-radius-lg` | 28px |
| `--mljr-radius-xl` | 36px |
| `--mljr-radius-full` | 9999px |

### Utility Classes

- `.mljr-clay`, `.mljr-clay-sm`, `.mljr-clay-lg` - Apply clay shadows
- `.mljr-clay-inset` - Inset shadow for pressed effect
- `.mljr-frosted` - Frosted glass effect
- `.mljr-soft-panel` - Clay shadow + rounded corners
- `.mljr-hover-lift` - Lift effect on hover
- `.mljr-shimmer` - Soft shimmer animation

### Color Palette

- **Primary**: Orange scale (50-950), main brand color
- **Secondary**: Purple scale (50-950)
- **Accent**: Teal scale (50-950)
- **Semantic**: Success (teal), Warning (amber), Error (crimson), Info (blue)

## Testing Strategy

### Current Status

- **Unit Tests**: NOT functional with Svelte 5 runes mode (Vitest + @testing-library/svelte issues)
- **E2E Tests**: Primary testing method using Playwright
- **Accessibility**: Axe-core integration in E2E tests

### Running Tests

```bash
# E2E tests (recommended)
make test-e2e
pnpm --filter mljr-svelte test:e2e

# E2E with UI
make test-e2e-ui

# Debug mode
pnpm --filter mljr-svelte test:e2e:debug
```

### Test Configuration

- Playwright config: `packages/mljr-svelte/playwright.config.ts`
- E2E tests: `packages/mljr-svelte/src/tests/e2e/`
- Test server runs on `http://localhost:5173`

## CI/CD Pipeline

### GitHub Actions Workflows

**ci.yml** - Runs on push/PR to main:
- Build all packages
- Type check
- Unit tests (coverage uploaded to Codecov)
- E2E tests (Playwright report uploaded)
- Lint

**release.yml** - Runs on push to main:
- Uses Changesets action
- Creates version PR or publishes to npm
- Requires `NPM_TOKEN` secret

### Changesets Versioning

Packages are linked for versioning (`.changeset/config.json`):
```json
"linked": [["mljr-css", "mljr-svelte"]]
```

## Dependencies Between Packages

```
mljr-svelte
├── peerDependency: svelte ^5.0.0
├── dependency: @iconify/svelte ^5.2.1
├── dependency: libphonenumber-js ^1.12.36
├── devDependency: mljr-css (workspace:*)
└── Uses mljr-css classes for styling

mljr-css
├── peerDependency: tailwindcss >=3.4.0
└── No dependency on mljr-svelte
```

## Common Tasks

### Adding a New Component

1. **CSS Framework** (`packages/mljr-css/`):
   - Create `src/components/{component}.css`
   - Import in `src/index.css`
   - Build: `pnpm build:css`

2. **Svelte Component** (`packages/mljr-svelte/`):
   - Create `src/lib/components/{Component}.svelte`
   - Export in `src/lib/index.ts`
   - Add to demo page in `src/routes/sections/`

3. **Test**:
   - Add E2E tests in `src/tests/e2e/`

### Modifying Design Tokens

- Colors, shadows, spacing: `packages/mljr-css/src/themes/variables.css`
- Both light and dark mode sections need updates

### Updating the Tailwind Plugin

- Plugin source: `packages/mljr-css/src/plugin.ts`
- Build: `pnpm build:plugin` (uses tsup)
- Exports: CJS, ESM, and TypeScript declarations

## Important Notes

1. **Svelte 5 Runes Mode**: All Svelte components use runes (`$state`, `$derived`, `$props`). This breaks traditional unit testing with `@testing-library/svelte`.

2. **Workspace Dependencies**: mljr-svelte references mljr-css via `workspace:*` in devDependencies. The vite.config.ts excludes mljr-css from pre-bundling to enable hot reload during development.

3. **Dark Mode**: Dual support for `.dark` class and `[data-theme="dark"]` attribute. The theme store in mljr-svelte manages this automatically with cookie persistence for SSR.

4. **Icons**: Use the Icon component with Iconify for access to 200,000+ icons. Format: `prefix:icon-name` (e.g., `ph:home`, `mdi:account`, `fa-brands:github`).

4. **CSS Build Process**: Uses PostCSS with postcss-import, tailwindcss, autoprefixer, and cssnano (production only).

5. **Package Exports**: 
   - `mljr-css` exports both the Tailwind plugin and standalone CSS files
   - `mljr-svelte` exports components and stores

## Security Considerations

- No sensitive data in the repository
- NPM publishing requires `NPM_TOKEN` GitHub secret
- All inputs should be sanitized at the application level (this is a UI library)

## Resources

- Main documentation: `README.md`
- Detailed conventions: `CLAUDE.md`
- Changesets docs: https://github.com/changesets/changesets
- Turborepo docs: https://turbo.build/repo
- Svelte 5 docs: https://svelte.dev/docs
