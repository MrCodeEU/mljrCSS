# mljr-svelte

## 1.1.0

### Minor Changes

- v1.1.0 — major component library expansion and CI improvements

  **New components (60+ added):**

  - Navigation: NavigationRail, Dock, UnifiedNav, Menu, SelectMenu
  - Forms: NumberInput, PinInput, OtpInput, TimePicker, TimeRangePicker, CheckboxGroup, RadioGroup, ChipInput, DropZone, RichTextEditor, AutoComplete, ColorPicker
  - Display: Calendar, Gauge, NumberTicker, AnimatedHeadline, Marquee, Countdown, ImageCompare, DiffViewer, LazyImage, InView, Mask, Swap, VirtualList, TreeView, TableOfContent, BarChart, LineChart, DonutChart, RadialProgress
  - Overlay: AlertDialog, ContextMenu, NotificationCenter, CookieBanner, Popover, Drawer
  - Layout: Hero, Resizable, Fieldset, Form, FormWizard, Stepper, Collapse
  - Feedback: Indicator, InfiniteScroll, AudioVisualizer, VideoPlayer, PdfViewer, MapEmbed
  - Misc: Kbd, Label, ChatBubble, AvatarGroup, CopyButton, Turnstile, LegalPages (Impressum, Datenschutz)

  **CI improvements:**

  - Removed Playwright from unit-test pipeline (switched vitest to happy-dom)
  - CI runtime dramatically reduced — no browser install required for unit tests
  - Pre-commit hook mirrors CI: build + type-check + unit tests run locally before push
  - E2E tests remain available locally via `pnpm --filter mljr-svelte exec playwright test`
