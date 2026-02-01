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

## Design System (Detroit: Become Human Inspired)

**Color Scheme:**
- Primary: Ice Blue (#00d4ff) - main interaction color, LED glow effects
- Secondary: Sunset Orange (#f97316) - warm accent from logo
- Accent: Purple (#a855f7) - tertiary accent from logo

**Typography:**
- Display font: Orbitron (Google Fonts) - used for headings, uppercase with letter-spacing
- Body font: Inter - used for readable body text
- Mono font: JetBrains Mono - used for code

**Detroit Style Variants:**
- `.mljr-btn-detroit` - Angular button with clip-path corners
- `.mljr-btn-hud` - HUD outline button style
- `.mljr-card-detroit` - Card with angular corner and HUD border
- `.mljr-card-hud` - Minimal HUD panel card
- `.mljr-input-detroit` - Input with left accent border
- `.mljr-modal-detroit` - Modal with angular clip-path and glow

**Utility Classes:**
- `.mljr-clip-angular`, `.mljr-clip-hex` - Geometric clip-paths
- `.mljr-border-hud` - Ice blue HUD-style border
- `.mljr-glow-primary`, `.mljr-glow-primary-intense` - Ice blue glow effects
- `.mljr-led-primary`, `.mljr-led-pulse` - LED indicators
- `.mljr-scanline` - Animated scan line effect
- `.mljr-text-hud` - HUD-style text (Orbitron, uppercase, ice blue)

## Versioning

Uses Changesets for version management:
```bash
pnpm changeset           # Create a changeset
pnpm version-packages    # Apply changesets
pnpm release             # Build and publish
```
