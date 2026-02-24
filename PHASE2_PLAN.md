# Phase 2: Component Audit & Restructure Plan

## Overview
This phase focuses on:
1. Auditing existing components for claymorphism compliance
2. Updating README with comprehensive component checklist
3. Reorganizing components into category-based folder structure
4. Implementing missing components systematically

## Current Component Inventory (52 components)

### Existing Svelte Components:
- Accordion, Alert, Avatar, Background, Badge, Breadcrumb, Button
- Card, Carousel, Checkbox, Chip, CodeExample, ColorPicker, CommandPalette
- DatePicker, Divider, Drawer, Dropdown, EmailInput, EmptyState
- FileUpload, Footer, Icon, Input, LanguageToggle, Modal
- Navbar, Pagination, Password, PhoneInput, Popover, Progress
- Radio, Rating, RangeSlider, SearchInput, Select, Sidebar, Skeleton
- Slider, Spinner, Stats, Stepper, Switch, Table, Tabs
- Textarea, ThemeToggle, Timeline, Toast, Tooltip, UnifiedNav

## Task Breakdown

### Task 7: Component Audit ✓ (Current)
Check each component for:
- [ ] Proper use of CSS variables for shadows
- [ ] No hardcoded colors (use CSS vars)
- [ ] Font inheritance from CSS (Nunito via variables)
- [ ] Border radii use CSS variables

### Task 8: README Update
Copy checklist from /tmp/mljr-comps/README.md and mark completed items based on current inventory.

### Task 9: Folder Reorganization
Target structure (matching old repo pattern):
```
packages/mljr-svelte/src/lib/components/
├── forms/
│   ├── Button.svelte
│   ├── Input.svelte
│   ├── Textarea.svelte
│   ├── Select.svelte
│   ├── Checkbox.svelte
│   ├── Radio.svelte
│   ├── Switch.svelte
│   ├── Slider.svelte
│   ├── RangeSlider.svelte
│   ├── FileUpload.svelte
│   ├── Rating.svelte
│   ├── DatePicker.svelte
│   ├── PhoneInput.svelte
│   ├── Password.svelte
│   ├── ColorPicker.svelte
│   ├── EmailInput.svelte
│   └── SearchInput.svelte
├── navigation/
│   ├── Navbar.svelte
│   ├── Tabs.svelte
│   ├── Breadcrumb.svelte
│   ├── Pagination.svelte
│   ├── Drawer.svelte
│   ├── CommandPalette.svelte
│   ├── Sidebar.svelte
│   ├── UnifiedNav.svelte
│   └── Stepper.svelte
├── feedback/
│   ├── Alert.svelte
│   ├── Badge.svelte
│   ├── Toast.svelte
│   ├── Spinner.svelte
│   ├── Progress.svelte
│   ├── Skeleton.svelte
│   └── EmptyState.svelte
├── display/
│   ├── Card.svelte
│   ├── Avatar.svelte
│   ├── Chip.svelte
│   ├── Divider.svelte
│   ├── Timeline.svelte
│   ├── Stats.svelte
│   └── Carousel.svelte
├── overlay/
│   ├── Modal.svelte
│   ├── Popover.svelte
│   ├── Tooltip.svelte
│   └── Dropdown.svelte
├── layout/
│   ├── Background.svelte
│   ├── Footer.svelte
│   ├── Icon.svelte
│   ├── ThemeToggle.svelte
│   └── LanguageToggle.svelte
└── utility/
    ├── CodeExample.svelte
    └── Table.svelte
```

### Task 10: Missing Components Implementation ✓ (In Progress)
Based on old repo checklist, implement in priority order:
1. ✅ CopyButton - Copy to clipboard utility (DONE - 2026-02-15)
   - Added to layout components
   - Full examples page with variants
   - Updated README checklist
2. ✅ Countdown - Countdown timer component (DONE - 2026-02-16)
   - Added to display components
   - 4 variants: default, compact, card, minimal
   - Customizable labels and units
   - Completion callback support
   - Full examples with use cases
3. ✅ CheckboxGroup - Checkbox group manager (DONE - 2026-02-16)
   - Added to form components
   - Select all functionality
   - Maximum selections limit
   - Horizontal/vertical layouts
   - Individual option helper texts
   - Full examples with use cases
4. ✅ Hero - Landing page hero section (DONE - 2026-02-16)
   - Added to layout components
   - 4 variants: default, centered, split, minimal
   - Background image and gradient support
   - Pattern overlay option
   - Customizable alignment
   - Media and actions slots
   - Responsive design
   - Full examples with multiple use cases
5. ✅ RadioGroup - Radio button group manager (DONE - 2026-02-16)
   - Added to form components
   - Mutually exclusive selections
   - Individual helper texts
   - Error state support
   - Horizontal/vertical layouts
   - Comparison with manual Radio usage
   - Full examples with use cases
6. ✅ TimePicker - Time selection input (DONE - 2026-02-16)
   - Added to form components
   - 12/24 hour formats
   - Optional seconds
   - Increment/decrement controls
   - Min/max time support
7. ✅ Swap - Element toggle utility (DONE - 2026-02-16)
   - Added to display components
   - 4 animations: rotate, flip, fade, none
   - Active state management
8. ✅ Indicator - Position markers (DONE - 2026-02-16)
   - Added to display components
   - 6 positions, 6 colors, 3 sizes
   - Dot/badge modes, ping animation
9. ✅ Mask - Image masks (DONE - 2026-02-16)
   - Added to display components
   - 9 shapes using CSS clip-path
10. ✅ Example Pages Complete (DONE - 2026-02-16)
   - TimePickerSection (8 examples)
   - SwapSection (8 examples)
   - IndicatorSection (12+ examples)
   - MaskSection (13+ examples)
   - All 61 components now have example pages
11. Form components (Toggle states, File drag-drop, etc.)
4. Navigation (Menu, Steps, etc.)
5. Display (Radial Progress, Chat Bubble, etc.)
6. Advanced (Rich Text Editor, Video Player, etc.)

### Task 11: Bug Fixes & Warnings Cleanup ✓ (DONE - 2026-02-15)
- ✅ Fixed routing on /components page
- ✅ Fixed card styling (simplified gradient to CSS var)
- ✅ Fixed OtpInput state reference issue
- ✅ Removed unused CSS selectors (7 components cleaned up)
- ✅ Build warnings reduced from 30+ to 2 (both expected/acceptable)

## Next Steps
1. Start with component audit (scan for hardcoded values)
2. Update README with checklist
3. Perform folder reorganization (with proper imports update)
4. Begin implementing missing components one by one

## Notes
- All changes must maintain backward compatibility with existing examples
- Build + check must pass after each major change
- Update exports in index.ts after restructure
