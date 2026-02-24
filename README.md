# MLJR CSS Framework

A TailwindCSS-based CSS framework with SvelteKit component library, featuring a Claymorphism design system with warm orange (primary) and soft purple (secondary) colors, working in both light and dark modes.

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [mljr-css](./packages/mljr-css) | 1.0.14 | CSS framework and Tailwind plugin |
| [mljr-svelte](./packages/mljr-svelte) | 1.0.14 | Svelte 5 component library |

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
- `primary-500`: #F97316 (main brand color)
- `primary-600`: #EA580C (buttons, links)
- `primary-700`: #C2410C (hover states)

### Secondary (Purple)
- `secondary-500`: #A855F7
- `secondary-600`: #9333EA (buttons, links)
- `secondary-700`: #7E22CE (hover states)

### Accent (Teal)
- `accent-500`: #14B8A6
- `accent-600`: #0D9488

## Component Implementation Status

Track the progress of component implementation across the framework.

### Input Components

#### Basic Inputs

- [x] Button - Basic button with onClick
  - [x] Icon Button
  - [x] Loading State
  - [x] Disabled State
- [x] Text Input - Single-line text input
  - [x] With Icons (left/right)
- [x] Textarea - Multi-line text input
  - [x] Auto-resize
  - [x] Character Counter
  - [x] Max Length
- [x] Select - Dropdown option selection
  - [x] With Search (SelectMenu component)
  - [x] Multi-select (SelectMenu component)
  - [x] Clear selection
  - [x] Keyboard navigation support
- [x] Checkbox - Binary selection
  - [x] Indeterminate State
  - [x] Checkbox Group
  - [x] Select All functionality
  - [x] Maximum selections limit
  - [x] Individual helper texts
  - [x] Support custom Icons for states
- [x] Radio - Single option from list
  - [x] Radio Group
  - [x] Individual helper texts
  - [x] Error state support
  - [x] Horizontal/vertical layouts
  - [x] Support custom Icons for states
- [x] Switch (Toggle) - Switch-style selection
  - [x] With Icons (onIcon/offIcon props)
  - [x] With Labels (onLabel/offLabel props)
- [x] Range/Slider - Slider value selection
  - [x] With Steps
  - [x] With Labels
  - [x] dual thumbs for range selection (RangeSlider)
- [x] File Input - File upload field
  - [x] Drag & Drop
  - [x] Preview
  - [x] Multiple Files
- [x] Rating - Star-based rating input
  - [x] Custom Icons
  - [x] Half Stars (allowHalf prop)
- [x] OTP/PIN - Pin input with varying length
- [x] Phone Number - With Flags and +xx + validation
  - [x] Flags
  - [x] validation
- [x] Date and Time + Range
  - [x] Date Picker
  - [x] Time Picker
  - [x] 12/24 hour format
  - [x] Seconds support
  - [x] Date Range (via DatePicker)
  - [x] Time Range
- [x] Password Input with Strength
- [x] Email Input - With validation
- [x] Search Input - With loading state
- [x] Color Picker - HSL/RGB/Hex support
- [x] Number Input - Stepper numeric input
  - [x] Min/Max/Step control
  - [x] Keyboard increment/decrement
  - [x] Size variants (sm/md/lg)
  - [x] Disabled/Readonly states

#### Form Structure

- [x] Form - Form wrapper with validation
  - [x] Reset Functionality
  - [x] Submit Handling
  - [x] Validation State
- [x] Fieldset - Input grouping
  - [x] Disabled State
  - [x] Legend
- [x] Label - Input field labels
  - [x] Required Indicator
  - [x] Helper Text
- [x] Validator
  - [x] Error Messages
  - [x] Success State
  - [x] Warning State
  - [x] Custom Validation Rules
- [x] Form Wizard
  - [x] Step Navigation
  - [x] Progress Indicator
  - [x] Data Persistence

### Navigation Components

#### Primary Navigation

- [x] Navbar - Main navigation bar
  - [x] Responsive Breakpoints
  - [x] Sticky/Fixed Position
  - [x] With Search
  - [x] With User Menu
  - [x] Mobile Hamburger
  - [x] Search Integration
  - [x] User Menu Dropdown
- [x] Menu - Vertical/horizontal navigation
  - [x] Nested Menus
  - [x] Collapsible Groups
  - [x] With Icons
  - [x] Active States
- [x] Tabs - Content section navigation
  - [x] Scrollable Tabs
  - [x] With Counter Badges
  - [x] With Close Button
  - [x] Vertical Tabs
- [x] Breadcrumbs - Hierarchical navigation
  - [x] With Icons
  - [x] Dynamic Updates
  - [x] Truncation
- [x] Pagination - Page navigation
  - [x] With Size Options
  - [x] Jump to Page
  - [x] Items Per Page

#### Secondary Navigation

- [x] Drawer - Side panel navigation
  - [x] Multiple Positions
  - [x] Overlay/Push Modes
  - [x] Backdrop Options
- [x] Steps/Stepper - Progress indicators
  - [x] Vertical Layout
  - [x] With Status
  - [x] Interactive Steps
- [x] Navigation Rail - Minimal Side Navigation
- [x] Dock - Dock at the bottom for navigation (mobile)
- [x] Command Palette - Keyboard Navigation

#### Content Containers

- [x] Card - Content wrapper
  - [x] Loading State
  - [x] With Actions
  - [x] Hoverable
  - [x] Clickable
- [x] Modal - Overlay dialogs
  - [x] Size Variants
  - [x] With Animation
  - [x] Nested Modals
  - [x] Focus Trap
- [x] Collapse - Expandable sections
  - [x] Group Behavior
  - [x] Custom Icons
  - [x] With Animation
- [x] Accordion - Collapsible panels
  - [x] Multiple Open
  - [x] Custom Headers
  - [x] Nested Accordions
- [x] Toast - Notification containers
  - [x] Auto Dismiss
  - [x] Stack Behavior
  - [x] Custom Position
  - [x] Progress Bar
  - [x] With promise and actions
- [x] Popover - Contextual overlays
  - [x] Placement Options
  - [x] Arrow Indicators
  - [x] Click/Hover Trigger
- [x] Context Menu - Right-click contextual menu
  - [x] Custom items with icons and shortcuts
  - [x] Danger/disabled item states
  - [x] Dividers
  - [x] Keyboard close (Escape)
- [x] Notification Center - Bell icon + notification panel
  - [x] Unread badge count
  - [x] Mark read / mark all read
  - [x] Clear notifications
  - [x] Type variants (info/success/warning/error)

### Display Components

#### Status & Progress

- [x] Alert - Status messages
  - [x] Different Types (success, error, warning, info)
  - [x] Dismissible
  - [x] With Icons
  - [x] With Actions
- [x] Badge - Status indicators
  - [x] Position Variants
  - [x] Size Variants
  - [x] With Icons
- [x] Progress - Linear progress
  - [x] Determinate/Indeterminate
  - [x] With Label
  - [x] Color Variants
- [x] Radial Progress - Circular progress
  - [x] With Label
  - [x] Custom Size
  - [x] Custom Colors
- [x] Loading/Spinner - Loading state spinners
  - [x] Multiple Variants
  - [x] Custom Colors
  - [x] Custom Size
- [x] Skeleton - Content placeholders
  - [x] Text Variants
  - [x] Image Placeholder
  - [x] Custom Animations
- [x] Stat/Stats - Metric displays
  - [x] With Icons
  - [x] With Trends
  - [x] With Charts

#### Media & Content

- [x] Avatar - User images
  - [x] With Status
  - [x] Group Layout
  - [x] Fallback Text
- [x] Carousel - Content slider
  - [x] Auto-play
  - [x] Custom Controls
  - [x] Multiple Items
- [x] Chat Bubble - Message display
  - [x] User/Bot Variants
  - [x] With Time
  - [x] With Status
- [x] Indicator - Position markers
  - [x] Different Positions (6 positions)
  - [x] Custom Colors (6 color variants)
  - [x] Dot/badge modes
  - [x] Ping animation
  - [x] Size variants
- [x] Mask - Image masks
  - [x] Different Shapes (9 shapes: circle, squircle, hexagon, triangle, star, heart, pentagon, diamond, decagon)
  - [x] CSS clip-path based
  - [x] Works with any content
- [x] Timeline - Event sequences
  - [x] Vertical/Horizontal
  - [x] With Icons
  - [x] Interactive Items
- [x] Calendar - Full month calendar view
  - [x] Date selection
  - [x] Event dots
  - [x] Min/Max date constraints
  - [x] Month/Year navigation
  - [x] Today highlight
- [x] Gauge - Circular arc gauge
  - [x] Half/Full arc variants
  - [x] Animated value transitions
  - [x] Custom colors, label, unit
  - [x] Size control

#### Data Display

- [x] Table - Data grid
  - [x] Sortable Columns
  - [x] Filterable
  - [x] Pagination
  - [x] Row Selection
  - [x] Column Resizing
- [x] Tree View - Hierarchical data
  - [x] Drag & Drop
  - [x] Checkbox Selection
  - [x] Custom Icons
  - [x] Search/Filter
- [x] Tags/Chips
  - [x] Removable
  - [x] With Icons
  - [x] Color Variants
  - [x] Input Mode
- [x] Diff Viewer
  - [x] Side by Side
  - [x] Inline Mode (unified)
  - [x] Syntax Highlighting

### Utility Components

#### Interactive Utils

- [x] Countdown - Number animations
  - [x] Different Formats (default, compact, card, minimal)
  - [x] Custom Styling
  - [x] With Events (onComplete callback)
  - [x] Custom Labels
  - [x] Selectable Units (days/hours/minutes/seconds)
- [x] Kbd - Keyboard shortcuts
  - [x] Combinations
  - [x] Platform Specific
- [x] Swap - Element toggle
  - [x] Custom Animations (rotate, flip, fade, none)
  - [x] Transition Effects
  - [x] Active state management
- [x] Theme Controller/ThemeToggle
  - [x] System Preference
  - [x] Persistent Storage
  - [x] Custom Themes
- [x] Language Toggle
  - [x] Auto Detection
  - [x] Persistent Choice
  - [x] Language Names/Flags
- [x] Tooltip
  - [x] Multiple Positions
  - [x] Custom Delay
  - [x] Rich Content
- [x] Copy to Clipboard (CopyButton)
  - [x] Success Feedback
  - [x] Custom Content
  - [x] Custom Icons
  - [x] Multiple Variants
- [x] Intersection Observer (InView)
  - [x] Lazy Loading (LazyImage)
  - [x] Infinite Scroll (InfiniteScroll)
  - [x] Scroll Animations (fade, slide, scale, flip)

### Layout Components

- [x] Navbar - Responsive navigation
  - [x] Mobile Menu
  - [x] Search Integration
  - [x] User Menu Dropdown
- [x] Footer - Page footer
  - [x] Multi-column Layout
  - [x] Newsletter Signup
  - [x] Social Links
- [x] Hero Section
  - [x] Multiple Variants (default, centered, split, minimal)
  - [x] With Background Image/Gradient
  - [x] With CTA Buttons
  - [x] Pattern Support
  - [x] Media Slot
  - [x] Customizable Alignment
- [x] Sidebar - Side navigation
  - [x] Collapsible
  - [x] With Search
  - [x] With Categories
- [x] Background - Decorative backgrounds
  - [x] Pattern support
  - [x] Animated variants
- [x] Divider - Separators
  - [x] Horizontal/Vertical
  - [x] With content
  - [x] Color variants
- [x] Icon - Universal icon component
  - [x] Iconify integration (200k+ icons)
  - [x] Size/color control

### Prebuilt Compound Components

- [x] UnifiedNav - Combined nav showcase
- [x] EmptyState - No data states
- [x] CodeExample - Code display with syntax highlighting

### Advanced Components

- [x] Rich Text Editor
  - [x] Bold/Italic/Underline/Strikethrough
  - [x] Headings (H1-H3)
  - [x] Lists (ordered/unordered)
  - [x] Text alignment
  - [x] Blockquote/Code block/Links/HR
  - [x] Undo/Redo/Clear formatting
  - [x] Word & character count
  - [x] Keyboard shortcuts
- [x] Video Player
- [x] Color Picker
- [x] Data Graphs (simple premade graphs)
  - [x] Bar Chart (single and multi-dataset)
  - [x] Line Chart (with area fill)
  - [x] Donut Chart (with hover and center label)
- [x] PIN (like OTP)
- [x] Auto Complete
  - [x] Single Selection
  - [x] Multiple Selection
  - [x] Grouped Options
  - [x] Allow Custom Values
  - [x] Keyboard Navigation
- [x] Table of Content
  - [x] Manual items
  - [x] Auto-scan from content selector
  - [x] Scroll-based active tracking
  - [x] Sticky sidebar mode
- [x] Lazy Loading (via LazyImage + InView)
- [x] Image Compare
  - [x] Horizontal slider
  - [x] Vertical slider
  - [x] Keyboard support (arrow keys)
  - [x] Touch support
  - [x] Before/after labels
- [x] Map Embed (OpenStreetMap)
  - [x] Coordinate-based (lat/lon + zoom)
  - [x] Location label overlay
  - [x] Attribution
  - [x] Loading state
  - [x] Rounded variants
- [x] Marquee
  - [x] Horizontal Scrolling
  - [x] Reverse Direction
  - [x] Pause on Hover
  - [x] Gradient Fade Edges
  - [x] Custom Item Snippet
- [x] File Pond (advanced file upload)
- [x] PDF Viewer
  - [x] Browser-native inline rendering
  - [x] Download button
  - [x] Open in new tab button
  - [x] Fallback for unsupported browsers
  - [x] Configurable toolbar
- [x] Animated Headline
  - [x] Typing Animation
  - [x] Fade Animation
  - [x] Slide Animation
  - [x] Flip Animation
  - [x] Gradient Highlight
- [x] Scroll Animations (via InView: fade, slide-up/down/left/right, scale, flip)
- [x] Turnstile (Cloudflare CAPTCHA)
  - [x] Real widget integration (siteKey prop)
  - [x] Demo widget (no API key)
  - [x] Theme variants (light/dark/auto)
  - [x] Verification/expiry/error callbacks
  - [x] Status messages
- [x] Audio Visualizer

## Examples Page

The main examples page (`/`) demonstrates all components organized by category tabs.

### Forms Tab

- [x] Basic form inputs (Input, Password, EmailInput, Checkbox, Radio, Switch, Select, Slider, Rating)
- [x] Textarea (auto-resize, character counter, max length)
- [x] Radio buttons (individual + RadioGroup)
- [x] CheckboxGroup (select all, max selections)
- [x] RadioGroup (horizontal/vertical layouts)
- [x] FileUpload (drag & drop, preview, multiple)
- [x] Advanced inputs (PhoneInput, DatePicker, ColorPicker, OtpInput)
- [x] TimePicker & TimeRangePicker
- [x] PinInput
- [x] New inputs (NumberInput, DropZone)
- [x] ChipInput
- [x] AutoComplete (single, multi, grouped, custom values)

### Buttons & Chips Tab

- [x] Button variants (primary, secondary, outline, ghost, link, danger, success)
- [x] Icon buttons and loading states
- [x] Chip (removable, with icons, color variants)
- [x] CopyButton

### Data Display Tab

- [x] Card (loading state, actions, hoverable)
- [x] Table (sortable, filterable, paginated, row selection)
- [x] Stats with trends
- [x] AvatarGroup & ChatBubble
- [x] TreeView (drag & drop, checkbox selection, search)
- [x] Stepper
- [x] Data Graphs (BarChart, LineChart, DonutChart)

### Feedback Tab

- [x] Alert (types, dismissible, icons, actions)
- [x] Badge (positions, sizes, icons)
- [x] Progress (determinate/indeterminate, variants)
- [x] Skeleton (text, image placeholders)
- [x] Spinner (multiple variants)
- [x] Toast (auto-dismiss, positions, promise)
- [x] Carousel (auto-play, custom controls)
- [x] Countdown (formats, units)
- [x] Swap (rotate, flip, fade animations)
- [x] Indicator (positions, colors, ping)
- [x] Mask (9 shapes)
- [x] EmptyState
- [x] Misc display (Timeline, Kbd, AvatarGroup, RadialProgress)

### Overlays Tab

- [x] Modal (sizes, nested, focus trap)
- [x] Drawer (positions, overlay/push)
- [x] Popover (placements, arrows)
- [x] Dropdown (sizes, item states)
- [x] Tooltip (positions, delay)
- [x] Collapse (group, icons, animation)
- [x] Accordion (multiple open, nested)
- [x] Tabs

### Navigation Tab

- [x] Navbar (responsive, sticky, search, user menu)
- [x] Breadcrumb (icons, truncation)
- [x] Pagination (sizes, jump to page)
- [x] Sidebar (collapsible, search, categories)
- [x] Menu (nested, collapsible, icons)
- [x] CommandPalette (Cmd+K)
- [x] NavigationRail
- [x] Dock
- [x] UnifiedNav showcase

### Layout Tab

- [x] Divider (horizontal/vertical, with content)
- [x] Kbd (combinations, platform-specific)
- [x] Hero (variants: default, centered, split, minimal)
- [x] Sidebar
- [x] Background (patterns, animated)
- [x] Gradients
- [x] Footer (multi-column, newsletter, social)

### Media Tab

- [x] Marquee (horizontal, reverse, pause on hover, gradient edges)
- [x] ImageCompare (horizontal/vertical, keyboard, touch)
- [x] AudioVisualizer
- [x] VideoPlayer
- [x] DropZone (advanced upload)
- [x] ScrollReveal (fade, slide, scale, flip via InView)
- [x] LazyLoad (LazyImage + InfiniteScroll)

### Text & Content Tab

- [x] AnimatedHeadline (typing, fade, slide, flip, gradient)
- [x] TableOfContent (manual, auto-scan, scroll tracking, sticky)
- [x] DiffViewer (side-by-side, inline, syntax highlighting)
- [x] Icon (Iconify integration, 200k+ icons)

### Integration Tab

- [x] RichTextEditor (formatting, lists, undo/redo, shortcuts)
- [x] MapEmbed (OpenStreetMap, coordinate-based)
- [x] PdfViewer (inline, download, new tab, fallback)
- [x] Turnstile (Cloudflare CAPTCHA)
- [x] CookieBanner (consent management)
- [x] Legal pages (Impressum, Datenschutz, AboutPage)

---

## Component Tester

The component tester page (`/components/tester`) provides isolated showcase views for each component with search, category filter, and keyboard navigation (← → arrow keys).

### Forms

- [x] Button
- [x] Input
- [x] Checkbox
- [x] CheckboxGroup
- [x] Radio
- [x] RadioGroup
- [x] Select
- [x] SelectMenu (searchable, multi-select)
- [x] Switch
- [x] Textarea
- [x] Rating
- [x] Slider
- [x] RangeSlider
- [x] FileUpload
- [x] DropZone
- [x] Password
- [x] SearchInput
- [x] EmailInput
- [x] PhoneInput
- [x] DatePicker
- [x] ColorPicker
- [x] TimePicker
- [x] TimeRangePicker
- [x] OtpInput
- [x] PinInput
- [x] ChipInput
- [x] AutoComplete
- [x] NumberInput
- [x] RichTextEditor
- [x] Turnstile
- [x] FormWizard
- [x] Form / Fieldset / Label / Validator

### Display

- [x] Avatar
- [x] AvatarGroup
- [x] Card
- [x] Chip
- [x] Divider
- [x] Table
- [x] Stats
- [x] Timeline
- [x] Carousel
- [x] Kbd
- [x] ChatBubble
- [x] Countdown
- [x] Swap
- [x] Indicator
- [x] Mask
- [x] TreeView
- [x] Marquee
- [x] AnimatedHeadline
- [x] ImageCompare
- [x] Charts (BarChart / LineChart / DonutChart)
- [x] TableOfContent
- [x] InView (Scroll Reveal)
- [x] LazyImage
- [x] InfiniteScroll
- [x] DiffViewer
- [x] AudioVisualizer
- [x] VideoPlayer
- [x] MapEmbed
- [x] PdfViewer
- [x] Calendar
- [x] Gauge

### Feedback

- [x] Alert
- [x] Badge
- [x] Progress
- [x] RadialProgress
- [x] Skeleton
- [x] Spinner
- [x] Toast
- [x] Tooltip
- [x] EmptyState

### Overlay

- [x] Accordion
- [x] Dropdown
- [x] Modal
- [x] Popover
- [x] Collapse
- [x] CommandPalette
- [x] CookieBanner
- [x] ContextMenu
- [x] NotificationCenter

### Navigation

- [x] Navbar
- [x] Breadcrumb
- [x] Pagination
- [x] Sidebar
- [x] Tabs
- [x] Drawer
- [x] Stepper
- [x] Menu
- [x] NavigationRail
- [x] Dock
- [x] UnifiedNav

### Layout

- [x] Background
- [x] Footer
- [x] Hero
- [x] Icon
- [x] ThemeToggle
- [x] LanguageToggle
- [x] CopyButton
- [x] Impressum
- [x] Datenschutz
- [x] AboutPage

---

## Unit Tests

Vitest browser tests for all components (`packages/mljr-svelte/src/tests/`).

### Form Components

- [x] Button
- [x] Input
- [x] Checkbox
- [x] CheckboxGroup
- [x] Radio
- [x] RadioGroup
- [x] Switch
- [x] Textarea
- [x] Select
- [x] SelectMenu
- [x] Rating
- [x] Slider
- [x] RangeSlider
- [x] FileUpload
- [x] DropZone
- [x] Password
- [x] SearchInput
- [x] EmailInput
- [x] PhoneInput
- [x] DatePicker
- [x] TimePicker
- [x] TimeRangePicker
- [x] ColorPicker
- [x] OtpInput
- [x] PinInput
- [x] ChipInput
- [x] AutoComplete
- [x] NumberInput
- [x] RichTextEditor
- [x] Turnstile
- [x] Form
- [x] FormWizard
- [x] Fieldset
- [x] Label
- [x] Validator

### Navigation Components

- [x] Navbar
- [x] Tabs
- [x] Breadcrumb
- [x] Pagination
- [x] Drawer
- [x] Stepper
- [x] CommandPalette
- [x] Sidebar
- [x] Menu
- [x] NavigationRail
- [x] Dock
- [x] UnifiedNav

### Feedback Components

- [x] Alert
- [x] Badge
- [x] Toast
- [x] Spinner
- [x] Progress
- [x] RadialProgress
- [x] Skeleton
- [x] EmptyState

### Display Components

- [x] Card
- [x] Avatar
- [x] AvatarGroup
- [x] Chip
- [x] Divider
- [x] Timeline
- [x] Stats
- [x] Carousel
- [x] Kbd
- [x] ChatBubble
- [x] Countdown
- [x] Swap
- [x] Indicator
- [x] Mask
- [x] TreeView
- [x] Marquee
- [x] AnimatedHeadline
- [x] ImageCompare
- [x] TableOfContent
- [x] BarChart
- [x] LineChart
- [x] DonutChart
- [x] InView
- [x] LazyImage
- [x] InfiniteScroll
- [x] DiffViewer
- [x] AudioVisualizer
- [x] VideoPlayer
- [x] MapEmbed
- [x] PdfViewer
- [x] Calendar
- [x] Gauge

### Overlay Components

- [x] Modal
- [x] Popover
- [x] Tooltip
- [x] Dropdown
- [x] Collapse
- [x] Accordion
- [x] CookieBanner
- [x] ContextMenu
- [x] NotificationCenter

### Layout Components

- [x] Background
- [x] Footer
- [x] Hero
- [x] Icon
- [x] ThemeToggle
- [x] LanguageToggle
- [x] CopyButton
- [x] Impressum
- [x] Datenschutz
- [x] AboutPage

### Utility Components

- [x] Table
- [x] Accordion
- [x] CodeExample
- [x] CookieSettingsButton

---

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
