<script lang="ts">
  import { Button, Card, Icon } from '$lib';

  // Import all component showcases
  import ButtonShowcase from './showcases/ButtonShowcase.svelte';
  import AlertShowcase from './showcases/AlertShowcase.svelte';
  import BadgeShowcase from './showcases/BadgeShowcase.svelte';
  import CardShowcase from './showcases/CardShowcase.svelte';
  import InputShowcase from './showcases/InputShowcase.svelte';
  import CheckboxShowcase from './showcases/CheckboxShowcase.svelte';
  import SelectShowcase from './showcases/SelectShowcase.svelte';
  import RadioShowcase from './showcases/RadioShowcase.svelte';
  import SwitchShowcase from './showcases/SwitchShowcase.svelte';
  import TextareaShowcase from './showcases/TextareaShowcase.svelte';
  import ChipShowcase from './showcases/ChipShowcase.svelte';
  import ModalShowcase from './showcases/ModalShowcase.svelte';
  import TabsShowcase from './showcases/TabsShowcase.svelte';
  import ProgressShowcase from './showcases/ProgressShowcase.svelte';
  import SpinnerShowcase from './showcases/SpinnerShowcase.svelte';
  import ToastShowcase from './showcases/ToastShowcase.svelte';
  import AvatarShowcase from './showcases/AvatarShowcase.svelte';
  import DropdownShowcase from './showcases/DropdownShowcase.svelte';
  import PopoverShowcase from './showcases/PopoverShowcase.svelte';
  import BreadcrumbShowcase from './showcases/BreadcrumbShowcase.svelte';
  import PaginationShowcase from './showcases/PaginationShowcase.svelte';
  import DividerShowcase from './showcases/DividerShowcase.svelte';
  import SkeletonShowcase from './showcases/SkeletonShowcase.svelte';
  import AccordionShowcase from './showcases/AccordionShowcase.svelte';
  import TooltipShowcase from './showcases/TooltipShowcase.svelte';
  import TableShowcase from './showcases/TableShowcase.svelte';
  import NavbarShowcase from './showcases/NavbarShowcase.svelte';
  import FooterShowcase from './showcases/FooterShowcase.svelte';
  import SidebarShowcase from './showcases/SidebarShowcase.svelte';
  import DrawerShowcase from './showcases/DrawerShowcase.svelte';
  import TimelineShowcase from './showcases/TimelineShowcase.svelte';
  import StatsShowcase from './showcases/StatsShowcase.svelte';
  import RatingShowcase from './showcases/RatingShowcase.svelte';
  import SliderShowcase from './showcases/SliderShowcase.svelte';
  import FileUploadShowcase from './showcases/FileUploadShowcase.svelte';
  import PasswordShowcase from './showcases/PasswordShowcase.svelte';
  import SearchInputShowcase from './showcases/SearchInputShowcase.svelte';
  import EmailInputShowcase from './showcases/EmailInputShowcase.svelte';
  import PhoneInputShowcase from './showcases/PhoneInputShowcase.svelte';
  import DatePickerShowcase from './showcases/DatePickerShowcase.svelte';
  import ColorPickerShowcase from './showcases/ColorPickerShowcase.svelte';
  import CommandPaletteShowcase from './showcases/CommandPaletteShowcase.svelte';
  import EmptyStateShowcase from './showcases/EmptyStateShowcase.svelte';
  import BackgroundShowcase from './showcases/BackgroundShowcase.svelte';
  import CheckboxGroupShowcase from './showcases/CheckboxGroupShowcase.svelte';
  import RadioGroupShowcase from './showcases/RadioGroupShowcase.svelte';
  import TimePickerShowcase from './showcases/TimePickerShowcase.svelte';
  import OtpInputShowcase from './showcases/OtpInputShowcase.svelte';
  import SelectMenuShowcase from './showcases/SelectMenuShowcase.svelte';
  import CarouselShowcase from './showcases/CarouselShowcase.svelte';
  import AvatarGroupShowcase from './showcases/AvatarGroupShowcase.svelte';
  import KbdShowcase from './showcases/KbdShowcase.svelte';
  import ChatBubbleShowcase from './showcases/ChatBubbleShowcase.svelte';
  import CountdownShowcase from './showcases/CountdownShowcase.svelte';
  import SwapShowcase from './showcases/SwapShowcase.svelte';
  import IndicatorShowcase from './showcases/IndicatorShowcase.svelte';
  import MaskShowcase from './showcases/MaskShowcase.svelte';
  import RadialProgressShowcase from './showcases/RadialProgressShowcase.svelte';
  import CollapseShowcase from './showcases/CollapseShowcase.svelte';
  import StepperShowcase from './showcases/StepperShowcase.svelte';
  import MenuShowcase from './showcases/MenuShowcase.svelte';
  import HeroShowcase from './showcases/HeroShowcase.svelte';
  import ThemeToggleShowcase from './showcases/ThemeToggleShowcase.svelte';
  import CopyButtonShowcase from './showcases/CopyButtonShowcase.svelte';
  import FormWizardShowcase from './showcases/FormWizardShowcase.svelte';
  import NavigationRailShowcase from './showcases/NavigationRailShowcase.svelte';
  import DockShowcase from './showcases/DockShowcase.svelte';
  import TreeViewShowcase from './showcases/TreeViewShowcase.svelte';
  import ChipInputShowcase from './showcases/ChipInputShowcase.svelte';
  import MarqueeShowcase from './showcases/MarqueeShowcase.svelte';
  import AutoCompleteShowcase from './showcases/AutoCompleteShowcase.svelte';
  import AnimatedHeadlineShowcase from './showcases/AnimatedHeadlineShowcase.svelte';
  import ImageCompareShowcase from './showcases/ImageCompareShowcase.svelte';
  import ChartsShowcase from './showcases/ChartsShowcase.svelte';
  import TableOfContentShowcase from './showcases/TableOfContentShowcase.svelte';
  import InViewShowcase from './showcases/InViewShowcase.svelte';
  import LazyImageShowcase from './showcases/LazyImageShowcase.svelte';
  import InfiniteScrollShowcase from './showcases/InfiniteScrollShowcase.svelte';
  import DiffViewerShowcase from './showcases/DiffViewerShowcase.svelte';
  import AudioVisualizerShowcase from './showcases/AudioVisualizerShowcase.svelte';
  import PinInputShowcase from './showcases/PinInputShowcase.svelte';
  import VideoPlayerShowcase from './showcases/VideoPlayerShowcase.svelte';
  import DropZoneShowcase from './showcases/DropZoneShowcase.svelte';
  import RangeSliderShowcase from './showcases/RangeSliderShowcase.svelte';
  import TimeRangePickerShowcase from './showcases/TimeRangePickerShowcase.svelte';
  import RichTextEditorShowcase from './showcases/RichTextEditorShowcase.svelte';
  import TurnstileShowcase from './showcases/TurnstileShowcase.svelte';
  import MapEmbedShowcase from './showcases/MapEmbedShowcase.svelte';
  import PdfViewerShowcase from './showcases/PdfViewerShowcase.svelte';
  import CookieBannerShowcase from './showcases/CookieBannerShowcase.svelte';
  import ImpressumShowcase from './showcases/ImpressumShowcase.svelte';
  import DatenschutzShowcase from './showcases/DatenschutzShowcase.svelte';
  import AboutPageShowcase from './showcases/AboutPageShowcase.svelte';
  import FormFieldsShowcase from './showcases/FormFieldsShowcase.svelte';
  import LanguageToggleShowcase from './showcases/LanguageToggleShowcase.svelte';
  import IconShowcase from './showcases/IconShowcase.svelte';
  import UnifiedNavShowcase from './showcases/UnifiedNavShowcase.svelte';
  import NumberInputShowcase from './showcases/NumberInputShowcase.svelte';
  import ContextMenuShowcase from './showcases/ContextMenuShowcase.svelte';
  import CalendarShowcase from './showcases/CalendarShowcase.svelte';
  import NotificationCenterShowcase from './showcases/NotificationCenterShowcase.svelte';
  import GaugeShowcase from './showcases/GaugeShowcase.svelte';

  interface ComponentInfo {
    id: string;
    name: string;
    category: string;
    component: any;
  }

  const components: ComponentInfo[] = [
    // Forms
    { id: 'button', name: 'Button', category: 'Forms', component: ButtonShowcase },
    { id: 'input', name: 'Input', category: 'Forms', component: InputShowcase },
    { id: 'checkbox', name: 'Checkbox', category: 'Forms', component: CheckboxShowcase },
    { id: 'radio', name: 'Radio', category: 'Forms', component: RadioShowcase },
    { id: 'select', name: 'Select', category: 'Forms', component: SelectShowcase },
    { id: 'switch', name: 'Switch', category: 'Forms', component: SwitchShowcase },
    { id: 'textarea', name: 'Textarea', category: 'Forms', component: TextareaShowcase },
    { id: 'rating', name: 'Rating', category: 'Forms', component: RatingShowcase },
    { id: 'slider', name: 'Slider', category: 'Forms', component: SliderShowcase },
    { id: 'fileupload', name: 'FileUpload', category: 'Forms', component: FileUploadShowcase },
    { id: 'password', name: 'Password', category: 'Forms', component: PasswordShowcase },
    { id: 'searchinput', name: 'SearchInput', category: 'Forms', component: SearchInputShowcase },
    { id: 'emailinput', name: 'EmailInput', category: 'Forms', component: EmailInputShowcase },
    { id: 'phoneinput', name: 'PhoneInput', category: 'Forms', component: PhoneInputShowcase },
    { id: 'datepicker', name: 'DatePicker', category: 'Forms', component: DatePickerShowcase },
    { id: 'colorpicker', name: 'ColorPicker', category: 'Forms', component: ColorPickerShowcase },

    // Display
    { id: 'avatar', name: 'Avatar', category: 'Display', component: AvatarShowcase },
    { id: 'card', name: 'Card', category: 'Display', component: CardShowcase },
    { id: 'chip', name: 'Chip', category: 'Display', component: ChipShowcase },
    { id: 'divider', name: 'Divider', category: 'Display', component: DividerShowcase },
    { id: 'table', name: 'Table', category: 'Display', component: TableShowcase },
    { id: 'stats', name: 'Stats', category: 'Display', component: StatsShowcase },
    { id: 'timeline', name: 'Timeline', category: 'Display', component: TimelineShowcase },

    // Feedback
    { id: 'alert', name: 'Alert', category: 'Feedback', component: AlertShowcase },
    { id: 'badge', name: 'Badge', category: 'Feedback', component: BadgeShowcase },
    { id: 'progress', name: 'Progress', category: 'Feedback', component: ProgressShowcase },
    { id: 'skeleton', name: 'Skeleton', category: 'Feedback', component: SkeletonShowcase },
    { id: 'spinner', name: 'Spinner', category: 'Feedback', component: SpinnerShowcase },
    { id: 'toast', name: 'Toast', category: 'Feedback', component: ToastShowcase },
    { id: 'tooltip', name: 'Tooltip', category: 'Feedback', component: TooltipShowcase },
    { id: 'emptystate', name: 'EmptyState', category: 'Feedback', component: EmptyStateShowcase },

    // Overlay
    { id: 'accordion', name: 'Accordion', category: 'Overlay', component: AccordionShowcase },
    { id: 'dropdown', name: 'Dropdown', category: 'Overlay', component: DropdownShowcase },
    { id: 'modal', name: 'Modal', category: 'Overlay', component: ModalShowcase },
    { id: 'popover', name: 'Popover', category: 'Overlay', component: PopoverShowcase },
    { id: 'commandpalette', name: 'CommandPalette', category: 'Overlay', component: CommandPaletteShowcase },

    // Navigation
    { id: 'breadcrumb', name: 'Breadcrumb', category: 'Navigation', component: BreadcrumbShowcase },
    { id: 'navbar', name: 'Navbar', category: 'Navigation', component: NavbarShowcase },
    { id: 'pagination', name: 'Pagination', category: 'Navigation', component: PaginationShowcase },
    { id: 'sidebar', name: 'Sidebar', category: 'Navigation', component: SidebarShowcase },
    { id: 'tabs', name: 'Tabs', category: 'Navigation', component: TabsShowcase },

    // Layout
    { id: 'footer', name: 'Footer', category: 'Layout', component: FooterShowcase },
    { id: 'drawer', name: 'Drawer', category: 'Layout', component: DrawerShowcase },
    { id: 'background', name: 'Background', category: 'Layout', component: BackgroundShowcase },
    { id: 'hero', name: 'Hero', category: 'Layout', component: HeroShowcase },
    { id: 'themetoggle', name: 'ThemeToggle', category: 'Layout', component: ThemeToggleShowcase },
    { id: 'copybutton', name: 'CopyButton', category: 'Layout', component: CopyButtonShowcase },

    // Forms (additional)
    { id: 'checkboxgroup', name: 'CheckboxGroup', category: 'Forms', component: CheckboxGroupShowcase },
    { id: 'radiogroup', name: 'RadioGroup', category: 'Forms', component: RadioGroupShowcase },
    { id: 'timepicker', name: 'TimePicker', category: 'Forms', component: TimePickerShowcase },
    { id: 'otpinput', name: 'OtpInput', category: 'Forms', component: OtpInputShowcase },
    { id: 'selectmenu', name: 'SelectMenu', category: 'Forms', component: SelectMenuShowcase },

    // Display (additional)
    { id: 'carousel', name: 'Carousel', category: 'Display', component: CarouselShowcase },
    { id: 'avatargroup', name: 'AvatarGroup', category: 'Display', component: AvatarGroupShowcase },
    { id: 'kbd', name: 'Kbd', category: 'Display', component: KbdShowcase },
    { id: 'chatbubble', name: 'ChatBubble', category: 'Display', component: ChatBubbleShowcase },
    { id: 'countdown', name: 'Countdown', category: 'Display', component: CountdownShowcase },
    { id: 'swap', name: 'Swap', category: 'Display', component: SwapShowcase },
    { id: 'indicator', name: 'Indicator', category: 'Display', component: IndicatorShowcase },
    { id: 'mask', name: 'Mask', category: 'Display', component: MaskShowcase },

    // Feedback (additional)
    { id: 'radialprogress', name: 'RadialProgress', category: 'Feedback', component: RadialProgressShowcase },

    // Overlay (additional)
    { id: 'collapse', name: 'Collapse', category: 'Overlay', component: CollapseShowcase },

    // Navigation (additional)
    { id: 'stepper', name: 'Stepper', category: 'Navigation', component: StepperShowcase },
    { id: 'menu', name: 'Menu', category: 'Navigation', component: MenuShowcase },
    { id: 'navigationrail', name: 'NavigationRail', category: 'Navigation', component: NavigationRailShowcase },
    { id: 'dock', name: 'Dock', category: 'Navigation', component: DockShowcase },

    // Display (additional)
    { id: 'treeview', name: 'TreeView', category: 'Display', component: TreeViewShowcase },
    { id: 'marquee', name: 'Marquee', category: 'Display', component: MarqueeShowcase },
    { id: 'animatedheadline', name: 'AnimatedHeadline', category: 'Display', component: AnimatedHeadlineShowcase },

    // Forms (wizard)
    { id: 'formwizard', name: 'FormWizard', category: 'Forms', component: FormWizardShowcase },

    // Forms (chip input + autocomplete)
    { id: 'chipinput', name: 'ChipInput', category: 'Forms', component: ChipInputShowcase },
    { id: 'autocomplete', name: 'AutoComplete', category: 'Forms', component: AutoCompleteShowcase },

    // Display (media / data viz)
    { id: 'imagecompare', name: 'ImageCompare', category: 'Display', component: ImageCompareShowcase },
    { id: 'barchart', name: 'Charts (Bar/Line/Donut)', category: 'Display', component: ChartsShowcase },
    { id: 'tableofcontent', name: 'TableOfContent', category: 'Display', component: TableOfContentShowcase },
    { id: 'inview', name: 'InView (Scroll Reveal)', category: 'Display', component: InViewShowcase },
    { id: 'lazyimage', name: 'LazyImage', category: 'Display', component: LazyImageShowcase },
    { id: 'infinitescroll', name: 'InfiniteScroll', category: 'Display', component: InfiniteScrollShowcase },
    { id: 'diffviewer', name: 'DiffViewer', category: 'Display', component: DiffViewerShowcase },
    { id: 'audiovisualizer', name: 'AudioVisualizer', category: 'Display', component: AudioVisualizerShowcase },
    { id: 'videoplayer', name: 'VideoPlayer', category: 'Display', component: VideoPlayerShowcase },

    // Forms (additional)
    { id: 'pininput', name: 'PinInput', category: 'Forms', component: PinInputShowcase },
    { id: 'dropzone', name: 'DropZone (Advanced Upload)', category: 'Forms', component: DropZoneShowcase },

    // Forms (new)
    { id: 'rangeslider', name: 'RangeSlider', category: 'Forms', component: RangeSliderShowcase },
    { id: 'timerangepicker', name: 'TimeRangePicker', category: 'Forms', component: TimeRangePickerShowcase },
    { id: 'formfields', name: 'Form / Fieldset / Label / Validator', category: 'Forms', component: FormFieldsShowcase },
    { id: 'richtexteditor', name: 'RichTextEditor', category: 'Forms', component: RichTextEditorShowcase },
    { id: 'turnstile', name: 'Turnstile', category: 'Forms', component: TurnstileShowcase },

    // Display (new)
    { id: 'mapembed', name: 'MapEmbed', category: 'Display', component: MapEmbedShowcase },
    { id: 'pdfviewer', name: 'PdfViewer', category: 'Display', component: PdfViewerShowcase },

    // Overlay (new)
    { id: 'cookiebanner', name: 'CookieBanner', category: 'Overlay', component: CookieBannerShowcase },

    // Layout (new)
    { id: 'impressum', name: 'Impressum', category: 'Layout', component: ImpressumShowcase },
    { id: 'datenschutz', name: 'Datenschutz', category: 'Layout', component: DatenschutzShowcase },
    { id: 'aboutpage', name: 'AboutPage', category: 'Layout', component: AboutPageShowcase },
    { id: 'languagetoggle', name: 'LanguageToggle', category: 'Layout', component: LanguageToggleShowcase },
    { id: 'icon', name: 'Icon', category: 'Layout', component: IconShowcase },

    // Navigation (new)
    { id: 'unifiednav', name: 'UnifiedNav', category: 'Navigation', component: UnifiedNavShowcase },

    // Forms (new: NumberInput)
    { id: 'numberinput', name: 'NumberInput', category: 'Forms', component: NumberInputShowcase },

    // Overlay (new)
    { id: 'contextmenu', name: 'ContextMenu', category: 'Overlay', component: ContextMenuShowcase },
    { id: 'notificationcenter', name: 'NotificationCenter', category: 'Overlay', component: NotificationCenterShowcase },

    // Display (new)
    { id: 'calendar', name: 'Calendar', category: 'Display', component: CalendarShowcase },
    { id: 'gauge', name: 'Gauge', category: 'Display', component: GaugeShowcase },
  ];

  const allCategories = ['All', ...Array.from(new Set(components.map(c => c.category))).sort()];

  let selectedCategory = $state('All');
  let searchQuery = $state('');
  let currentIndex = $state(0);

  let filteredComponents = $derived(
    components.filter(c => {
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesSearch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
  );

  let currentComponent = $derived(filteredComponents[currentIndex] ?? filteredComponents[0]);

  function goToPrevious() {
    if (currentIndex > 0) currentIndex--;
  }

  function goToNext() {
    if (currentIndex < filteredComponents.length - 1) currentIndex++;
  }

  function selectComponent(index: number) {
    currentIndex = index;
  }

  function selectCategory(cat: string) {
    selectedCategory = cat;
    currentIndex = 0;
  }

  function handleSearch(e: Event) {
    searchQuery = (e.target as HTMLInputElement).value;
    currentIndex = 0;
  }

  function clearSearch() {
    searchQuery = '';
    currentIndex = 0;
  }

  // Keyboard navigation
  function handleKeydown(e: KeyboardEvent) {
    const tag = (e.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key === 'ArrowLeft') goToPrevious();
    else if (e.key === 'ArrowRight') goToNext();
  }
</script>

<svelte:head>
  <title>Component Tester - MLJR CSS</title>
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="mljr-container mljr-mx-auto mljr-px-4 mljr-py-8">
  <!-- Header -->
  <div class="mljr-mb-6">
    <div class="mljr-flex mljr-items-center mljr-justify-between mljr-mb-2">
      <div>
        <h1 class="mljr-h1 mljr-mb-1">Component Tester</h1>
        <p class="mljr-text-muted">
          Test and explore all {components.length} components in isolation
        </p>
      </div>
      <a href="/" class="mljr-btn mljr-btn-ghost">
        <Icon icon="mdi:home" size={20} />
        Back to Home
      </a>
    </div>
  </div>

  <!-- Search & Filter Bar -->
  <Card class="mljr-mb-4">
    <div class="mljr-flex mljr-flex-col mljr-gap-3">
      <!-- Search -->
      <div class="mljr-relative">
        <Icon
          icon="mdi:magnify"
          size={20}
          class="mljr-absolute mljr-left-3 mljr-top-1/2 -mljr-translate-y-1/2 mljr-text-muted mljr-pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          oninput={handleSearch}
          class="mljr-input mljr-w-full mljr-pl-10 {searchQuery ? 'mljr-pr-10' : ''}"
        />
        {#if searchQuery}
          <button
            onclick={clearSearch}
            class="search-clear-btn"
          >
            <Icon icon="mdi:close-circle" size={18} />
          </button>
        {/if}
      </div>

      <!-- Category Filter -->
      <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
        {#each allCategories as cat}
          <button
            onclick={() => selectCategory(cat)}
            class="filter-btn {selectedCategory === cat ? 'filter-btn-active' : ''}"
          >
            {cat}
            {#if cat !== 'All'}
              <span class="filter-btn-count">
                ({components.filter(c => c.category === cat).length})
              </span>
            {/if}
          </button>
        {/each}
      </div>
    </div>
  </Card>

  {#if filteredComponents.length === 0}
    <!-- No Results -->
    <Card>
      <div class="mljr-py-12 mljr-text-center mljr-text-muted">
        <Icon icon="mdi:magnify" size={48} class="mljr-mx-auto mljr-mb-3 mljr-opacity-40" />
        <p class="mljr-font-medium">No components found</p>
        <p class="mljr-text-sm mljr-mt-1">Try a different search term or category</p>
        <Button variant="ghost" size="sm" class="mljr-mt-4" onclick={clearSearch}>
          Clear Search
        </Button>
      </div>
    </Card>
  {:else}
    <!-- Navigation Controls -->
    <Card class="mljr-mb-4">
      <div class="mljr-flex mljr-flex-col mljr-gap-3">
        <!-- Current Component Info + Nav -->
        <div class="mljr-flex mljr-items-center mljr-justify-between">
          <div class="mljr-flex mljr-items-center mljr-gap-3">
            <span class="mljr-badge mljr-badge-primary mljr-badge-lg">
              {currentComponent?.category}
            </span>
            <h2 class="mljr-h3">{currentComponent?.name}</h2>
          </div>

          <div class="mljr-flex mljr-gap-2 mljr-items-center">
            <Button
              variant="outline-primary"
              size="sm"
              onclick={goToPrevious}
              disabled={currentIndex === 0}
            >
              <Icon icon="mdi:chevron-left" size={20} />
              Prev
            </Button>

            <span class="mljr-text-sm mljr-text-muted mljr-px-3 mljr-font-medium">
              {currentIndex + 1} / {filteredComponents.length}
            </span>

            <Button
              variant="outline-primary"
              size="sm"
              onclick={goToNext}
              disabled={currentIndex === filteredComponents.length - 1}
            >
              Next
              <Icon icon="mdi:chevron-right" size={20} />
            </Button>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="progress-track">
          <div
            class="progress-fill"
            style="width: {((currentIndex + 1) / filteredComponents.length) * 100}%"
          ></div>
        </div>
      </div>
    </Card>

    <!-- Component Showcase -->
    <Card class="mljr-mb-6">
      <div class="component-showcase">
        {#key currentComponent?.id}
          {@const Component = currentComponent?.component}
          {#if Component}
            <Component />
          {/if}
        {/key}
      </div>
    </Card>

    <!-- Quick Navigation Grid -->
    <div>
      <h3 class="mljr-h4 mljr-mb-3">
        Quick Navigation
        {#if searchQuery || selectedCategory !== 'All'}
          <span class="mljr-text-sm mljr-font-normal mljr-text-muted mljr-ml-2">
            ({filteredComponents.length} of {components.length})
          </span>
        {/if}
      </h3>
      <div class="quick-nav-grid">
        {#each filteredComponents as component, index}
          <button
            onclick={() => selectComponent(index)}
            class="nav-grid-btn {currentIndex === index ? 'nav-grid-btn-active' : ''}"
          >
            <div class="nav-grid-btn-name {currentIndex === index ? 'nav-grid-btn-name-active' : ''}">
              {component.name}
            </div>
            <div class="nav-grid-btn-cat">{component.category}</div>
          </button>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Keyboard shortcuts hint -->
  <div class="kbd-hints">
    <span><strong>Keyboard:</strong></span>
    <span><kbd class="mljr-kbd">←</kbd> <kbd class="mljr-kbd">→</kbd> navigate</span>
    <span class="mljr-text-muted">|</span>
    <span>Focus search to filter by name</span>
  </div>
</div>

<style>
  .component-showcase {
    min-height: 500px;
  }

  /* Search clear button */
  .search-clear-btn {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--mljr-text-muted);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
  }

  .search-clear-btn:hover {
    color: var(--mljr-primary-500);
  }

  /* Category filter pills */
  .filter-btn {
    padding: 0.375rem 0.75rem;
    border-radius: var(--mljr-radius-lg);
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    transition: all var(--mljr-transition-fast);
    border: 1px solid transparent;
    background: var(--mljr-bg-secondary);
    color: var(--mljr-text-muted);
    cursor: pointer;
  }

  .filter-btn:hover {
    border-color: var(--mljr-primary-200);
    color: var(--mljr-text);
  }

  .filter-btn-active {
    background: var(--mljr-primary-500);
    color: white;
    border-color: var(--mljr-primary-500);
  }

  .filter-btn-count {
    margin-left: 0.25rem;
    opacity: 0.75;
    font-size: var(--mljr-text-xs);
  }

  /* Progress bar */
  .progress-track {
    width: 100%;
    height: 6px;
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-full);
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--mljr-gradient-primary);
    transition: width 0.3s ease;
  }

  /* Quick navigation grid */
  .quick-nav-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--mljr-space-2);
  }

  @media (min-width: 768px) {
    .quick-nav-grid { grid-template-columns: repeat(4, 1fr); }
  }

  @media (min-width: 1024px) {
    .quick-nav-grid { grid-template-columns: repeat(6, 1fr); }
  }

  .nav-grid-btn {
    padding: var(--mljr-space-3);
    border-radius: var(--mljr-radius-md);
    text-align: left;
    transition: all var(--mljr-transition-fast);
    border: 2px solid transparent;
    background: var(--mljr-bg-secondary);
    cursor: pointer;
    width: 100%;
  }

  .nav-grid-btn:hover {
    border-color: var(--mljr-primary-200);
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .nav-grid-btn-active {
    background: var(--mljr-primary-50);
    border-color: var(--mljr-primary-500);
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .nav-grid-btn-name {
    font-size: var(--mljr-text-sm);
    font-weight: 600;
    color: var(--mljr-text);
  }

  .nav-grid-btn-name-active {
    color: var(--mljr-primary-600);
  }

  .nav-grid-btn-cat {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-muted);
  }

  /* Keyboard hints bar */
  .kbd-hints {
    margin-top: var(--mljr-space-6);
    padding: var(--mljr-space-3);
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-md);
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-muted);
    display: flex;
    align-items: center;
    gap: var(--mljr-space-4);
    flex-wrap: wrap;
  }
</style>
