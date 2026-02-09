# GEMINI.md - Project Context & Guide

This file provides essential context and instructions for AI agents working on the MLJR CSS Framework monorepo.

## Project Overview

**MLJR CSS** is a design-centric monorepo featuring a **Claymorphism** design system. It consists of a CSS framework/Tailwind plugin and a corresponding Svelte 5 component library.

- **Primary Aesthetic**: Claymorphism (soft, inflated, playful 3D look with dual shadows and rounded corners).
- **Primary Colors**: Warm Orange (#F97316), Soft Teal (#14B8A6), Soft Purple (#A855F7).
- **Architecture**: pnpm Monorepo with Turborepo orchestration.

## Project Structure

- `packages/mljr-css/`: The core CSS framework and Tailwind plugin.
  - `src/components/`: Individual CSS files for each component.
  - `src/themes/variables.css`: Core design tokens (colors, shadows, spacing).
  - `src/plugin.ts`: Tailwind CSS plugin entry point.
- `packages/mljr-svelte/`: Svelte 5 component library.
  - `src/lib/components/`: Svelte components wrapping `mljr-css` classes.
  - `src/lib/stores/`: Svelte 5 runes-based stores (theme, toast).
  - `src/tests/e2e/`: Playwright E2E tests.
- `Makefile`: Convenience shortcuts for common tasks.
- `turbo.json`: Build pipeline configuration.

## Key Technologies

- **Package Manager**: pnpm (v10.6.0)
- **Framework**: Svelte 5 (using **Runes**: `$state`, `$derived`, `$props`, `$effect`).
- **Styling**: Tailwind CSS 3.4, PostCSS.
- **Testing**: Playwright (Primary for E2E), Vitest (Note: Unit tests are currently problematic with Svelte 5 runes).
- **Build Tools**: Vite, tsup (for the plugin), PostCSS CLI.
- **Versioning**: Changesets.

## Common Commands

### Setup & Development
- `make setup`: Install dependencies and build all packages (recommended for first-time setup).
- `make start`: Install, build CSS, and start the Svelte dev server.
- `pnpm dev`: Start the SvelteKit development server (demos/showcase).
- `make watch-css`: Watch and rebuild CSS in `mljr-css`.

### Building
- `pnpm build`: Build all packages via Turborepo.
- `make build-css`: Build only the `mljr-css` package.
- `make build-svelte`: Build only the `mljr-svelte` package.

### Testing & Quality
- `make test`: Run E2E tests (Playwright).
- `make test-ui`: Run E2E tests with the interactive Playwright UI.
- `pnpm check`: Run Svelte type checking (`svelte-check`).
- `make test-coverage`: Run tests and generate coverage report.

### Releasing
- `pnpm changeset`: Create a new version changeset.
- `pnpm version-packages`: Apply changesets and update versions.
- `pnpm release`: Build and publish to npm.

## Development Conventions

- **Naming**: 
  - CSS Classes: Prefix with `mljr-` (e.g., `.mljr-btn`, `.mljr-card`).
  - CSS Variables: Prefix with `--mljr-` (e.g., `--mljr-primary-500`).
- **Svelte Components**:
  - Always use `lang="ts"`.
  - Use Svelte 5 Runes exclusively.
  - Use `Snippet` for content slots (`children?: Snippet`).
  - Components should follow the pattern of applying `mljr-` classes and spreading `{...rest}` props.
- **Styling**:
  - Direct modifications to core styles should be made in `packages/mljr-css/src/`.
  - Avoid hardcoding colors; use the provided CSS variables from `variables.css`.
- **Dark Mode**:
  - Support both `.dark` class and `[data-theme="dark"]` attribute.
  - Use `themeStore` in Svelte for mode switching.

## Design Tokens (Quick Ref)

- **Shadows**: `--mljr-clay-shadow`, `--mljr-clay-inset`.
- **Radius**: `--mljr-radius-sm` (12px) to `--mljr-radius-xl` (36px).
- **Colors**: `primary` (Orange), `secondary` (Teal), `accent` (Purple).

## Important Files for Reference
- `CLAUDE.md`: Detailed technical guidance and architectural notes.
- `AGENTS.md`: Specific guide for AI coding agents.
- `packages/mljr-css/src/themes/variables.css`: The source of truth for the design system.
