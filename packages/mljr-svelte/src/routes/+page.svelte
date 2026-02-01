<script lang="ts">
  import {
    Button,
    Card,
    Alert,
    Badge,
    Input,
    Select,
    Checkbox,
    Switch,
    Modal,
    Tabs,
    Accordion,
    themeStore
  } from '$lib';

  // Modal state
  let modalOpen = $state(false);
  let modalSize = $state<'sm' | 'md' | 'lg'>('md');

  // Form states
  let inputValue = $state('');
  let selectValue = $state('');
  let checkboxChecked = $state(false);
  let switchEnabled = $state(true);
  let rangeValue = $state(50);
  let numberValue = $state(5);
  let searchValue = $state('');

  // Carousel state
  let carouselIndex = $state(0);
  const carouselSlides = [
    { title: 'Detroit Style', description: 'Angular cuts and futuristic design' },
    { title: 'Rich Colors', description: 'Deep blue primary with orange accents' },
    { title: 'Dark Mode', description: 'Optimized for both light and dark themes' },
  ];

  function nextSlide() {
    carouselIndex = (carouselIndex + 1) % carouselSlides.length;
  }

  function prevSlide() {
    carouselIndex = (carouselIndex - 1 + carouselSlides.length) % carouselSlides.length;
  }

  // Tabs data
  const tabItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
  ];

  // Accordion data
  const accordionItems = [
    {
      id: '1',
      title: 'What is MLJR CSS?',
      content: 'MLJR CSS is a TailwindCSS-based CSS framework with a beautiful orange/purple color scheme that works seamlessly in both light and dark modes.'
    },
    {
      id: '2',
      title: 'How do I install it?',
      content: 'Simply run `pnpm add mljr-css mljr-svelte` to install both the CSS framework and Svelte components.'
    },
    {
      id: '3',
      title: 'Is it compatible with Svelte 5?',
      content: 'Yes! The component library is built specifically for Svelte 5 using the new runes API ($props, $state, $derived, etc.).'
    },
  ];

  function openModal(size: 'sm' | 'md' | 'lg') {
    modalSize = size;
    modalOpen = true;
  }
</script>

<!-- Header -->
<header class="mljr-header mljr-header-sticky">
  <div class="mljr-header-container">
    <a href="/" class="mljr-header-logo">
      <img src="/Logo.png" alt="MLJR Logo" style="height: 2.5rem; width: auto;" />
      <span>CSS</span>
    </a>

    <nav class="mljr-header-nav">
      <a href="#buttons" class="mljr-header-nav-link">Buttons</a>
      <a href="#forms" class="mljr-header-nav-link">Forms</a>
      <a href="#feedback" class="mljr-header-nav-link">Feedback</a>
      <a href="#data" class="mljr-header-nav-link">Data</a>
      <a href="#layout" class="mljr-header-nav-link">Layout</a>
    </nav>

    <div class="mljr-header-actions">
      <Button
        variant="ghost"
        icon
        onclick={() => themeStore.toggleTheme()}
        aria-label="Toggle theme"
      >
        {#if themeStore.isDark}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
          </svg>
        {:else}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
          </svg>
        {/if}
      </Button>
      <Button variant="primary">Get Started</Button>
    </div>
  </div>
</header>

<main class="mljr-container mljr-py-4">
  <!-- Hero Section -->
  <section class="mljr-text-center mljr-py-4 mljr-mb-8">
    <div class="mljr-flex mljr-justify-center mljr-mb-4">
      <img src="/Logo.png" alt="MLJR Logo" style="height: 5rem; width: auto;" />
    </div>
    <h1 class="mljr-h1 mljr-mb-4">
      <span style="background: linear-gradient(135deg, var(--mljr-primary-500) 0%, var(--mljr-primary-700) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">MLJR</span> CSS Framework
    </h1>
    <p class="mljr-lead mljr-mb-6" style="max-width: 600px; margin: 0 auto;">
      A TailwindCSS-based CSS framework with Svelte 5 components.
      Detroit: Become Human inspired design with angular cuts, rich blue primary, and warm orange accents.
    </p>
    <div class="mljr-flex mljr-justify-center mljr-gap-4">
      <Button variant="primary" size="lg">Documentation</Button>
      <Button variant="outline-secondary" size="lg">GitHub</Button>
    </div>
  </section>

  <!-- Buttons Section -->
  <section id="buttons" class="mljr-mb-8">
    <Card title="Buttons" description="Various button styles and states">
      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Variants</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
          <Button>Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline-primary">Outline Primary</Button>
          <Button variant="outline-secondary">Outline Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
        </div>
      </div>

      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Sizes</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-items-center mljr-gap-2">
          <Button variant="primary" size="xs">Extra Small</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" size="xl">Extra Large</Button>
        </div>
      </div>

      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">States</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="secondary" loading>Loading</Button>
        </div>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Icon Buttons</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
          <Button variant="primary" icon>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
            </svg>
          </Button>
          <Button variant="secondary" icon>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
          </Button>
          <Button variant="ghost" icon>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </Button>
        </div>
      </div>
    </Card>
  </section>

  <!-- Forms Section -->
  <section id="forms" class="mljr-mb-8">
    <Card title="Form Components" description="Inputs, selects, checkboxes, and switches">
      <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
        <div>
          <h4 class="mljr-h5 mljr-mb-3">Text Inputs</h4>
          <Input
            label="Username"
            placeholder="Enter your username"
            bind:value={inputValue}
            helperText="Choose a unique username"
          />
          <div class="mljr-mt-4">
            <Input
              label="Email"
              type="email"
              placeholder="email@example.com"
              required
            />
          </div>
          <div class="mljr-mt-4">
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              error
              errorText="Password must be at least 8 characters"
            />
          </div>
        </div>

        <div>
          <h4 class="mljr-h5 mljr-mb-3">Select</h4>
          <Select label="Country" bind:value={selectValue}>
            <option value="">Select a country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="jp">Japan</option>
          </Select>

          <div class="mljr-mt-6">
            <h4 class="mljr-h5 mljr-mb-3">Checkboxes</h4>
            <div class="mljr-flex mljr-flex-col mljr-gap-2">
              <Checkbox label="Accept terms and conditions" bind:checked={checkboxChecked} />
              <Checkbox label="Subscribe to newsletter" />
              <Checkbox label="Secondary color" secondary checked />
              <Checkbox label="Disabled checkbox" disabled />
            </div>
          </div>

          <div class="mljr-mt-6">
            <h4 class="mljr-h5 mljr-mb-3">Radio Buttons</h4>
            <div class="mljr-radio-group">
              <label class="mljr-radio">
                <input type="radio" name="demo-radio" class="mljr-radio-input" value="option1" checked />
                <span class="mljr-radio-label">Option 1 (Primary)</span>
              </label>
              <label class="mljr-radio">
                <input type="radio" name="demo-radio" class="mljr-radio-input" value="option2" />
                <span class="mljr-radio-label">Option 2</span>
              </label>
              <label class="mljr-radio mljr-radio-secondary">
                <input type="radio" name="demo-radio2" class="mljr-radio-input" value="option3" checked />
                <span class="mljr-radio-label">Secondary Color</span>
              </label>
            </div>
          </div>

          <div class="mljr-mt-6">
            <h4 class="mljr-h5 mljr-mb-3">Switches</h4>
            <div class="mljr-flex mljr-flex-col mljr-gap-2">
              <Switch label="Enable notifications" bind:checked={switchEnabled} />
              <Switch label="Dark mode" checked={themeStore.isDark} onchange={() => themeStore.toggleTheme()} />
              <Switch label="Secondary color" secondary />
              <Switch label="Disabled switch" disabled />
            </div>
          </div>
        </div>
      </div>
    </Card>
  </section>

  <!-- Advanced Inputs Section -->
  <section id="advanced-inputs" class="mljr-mb-8">
    <Card title="Advanced Input Types" description="Range sliders, number inputs, search, and file uploads">
      <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
        <!-- Range Slider -->
        <div>
          <h4 class="mljr-h5 mljr-mb-3">Range Slider</h4>
          <div class="mljr-mb-4">
            <label class="mljr-label" for="volume-range">Volume: {rangeValue}%</label>
            <input
              id="volume-range"
              type="range"
              class="mljr-range"
              min="0"
              max="100"
              bind:value={rangeValue}
            />
          </div>
          <div class="mljr-mb-4">
            <label class="mljr-label" for="secondary-range">Secondary Slider</label>
            <input
              id="secondary-range"
              type="range"
              class="mljr-range mljr-range-secondary"
              min="0"
              max="100"
              value="60"
            />
          </div>
        </div>

        <!-- Number Input -->
        <div>
          <h4 class="mljr-h5 mljr-mb-3">Number Input with Spinner</h4>
          <label class="mljr-label" for="quantity-input">Quantity</label>
          <div class="mljr-number-input" style="max-width: 150px;">
            <button class="mljr-number-btn mljr-number-btn-decrement" onclick={() => numberValue = Math.max(0, numberValue - 1)} aria-label="Decrease quantity">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
            </button>
            <input
              id="quantity-input"
              type="number"
              class="mljr-input"
              bind:value={numberValue}
              min="0"
            />
            <button class="mljr-number-btn mljr-number-btn-increment" onclick={() => numberValue++} aria-label="Increase quantity">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Search Input -->
        <div>
          <h4 class="mljr-h5 mljr-mb-3">Search Input</h4>
          <div class="mljr-search">
            <svg class="mljr-search-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
            </svg>
            <input
              type="search"
              class="mljr-input mljr-search-input"
              placeholder="Search..."
              bind:value={searchValue}
            />
            {#if searchValue}
              <button class="mljr-search-clear" onclick={() => searchValue = ''} aria-label="Clear search">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            {/if}
          </div>
        </div>

        <!-- Color Picker -->
        <div>
          <h4 class="mljr-h5 mljr-mb-3">Color Picker</h4>
          <div class="mljr-color-picker">
            <input type="color" class="mljr-color-input" value="#0080ff" />
            <span class="mljr-text-sm">Select a color</span>
          </div>
        </div>

        <!-- File Input -->
        <div>
          <h4 class="mljr-h5 mljr-mb-3">File Input</h4>
          <div class="mljr-file-input">
            <input type="file" />
            <div class="mljr-file-input-label">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>Choose File</span>
            </div>
          </div>
        </div>

        <!-- Drop Zone -->
        <div>
          <h4 class="mljr-h5 mljr-mb-3">Drop Zone</h4>
          <div class="mljr-drop-zone">
            <svg class="mljr-drop-zone-icon" width="48" height="48" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
            </svg>
            <p class="mljr-drop-zone-text">Drop files here or click to upload</p>
            <p class="mljr-drop-zone-hint">PNG, JPG up to 10MB</p>
            <input type="file" style="display:none" />
          </div>
        </div>
      </div>
    </Card>
  </section>

  <!-- Carousel Section -->
  <section id="carousel" class="mljr-mb-8">
    <Card title="Carousel" description="Sliding content with Detroit-style angular design">
      <div class="mljr-carousel mljr-carousel-hud" style="height: 200px; background: var(--mljr-bg-secondary);">
        <div class="mljr-carousel-inner" style="transform: translateX(-{carouselIndex * 100}%);">
          {#each carouselSlides as slide, i}
            <div class="mljr-carousel-item mljr-flex mljr-items-center mljr-justify-center mljr-flex-col mljr-gap-2">
              <h3 class="mljr-h3" style="color: var(--mljr-primary-500);">{slide.title}</h3>
              <p class="mljr-text-secondary">{slide.description}</p>
            </div>
          {/each}
        </div>
        <button class="mljr-carousel-btn mljr-carousel-btn-prev" onclick={prevSlide} aria-label="Previous slide">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </button>
        <button class="mljr-carousel-btn mljr-carousel-btn-next" onclick={nextSlide} aria-label="Next slide">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
      <div class="mljr-carousel-indicators">
        {#each carouselSlides as _, i}
          <button
            class="mljr-carousel-indicator"
            class:active={carouselIndex === i}
            onclick={() => carouselIndex = i}
            aria-label="Go to slide {i + 1}"
          ></button>
        {/each}
      </div>
    </Card>
  </section>

  <!-- Feedback Section -->
  <section id="feedback" class="mljr-mb-8">
    <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6">
      <!-- Alerts -->
      <Card title="Alerts" description="Notification and feedback messages">
        <div class="mljr-flex mljr-flex-col mljr-gap-3">
          <Alert variant="info" title="Information">
            This is an informational message for the user.
          </Alert>
          <Alert variant="success" title="Success">
            Operation completed successfully!
          </Alert>
          <Alert variant="warning" title="Warning">
            Please review your input before proceeding.
          </Alert>
          <Alert variant="error" title="Error">
            Something went wrong. Please try again.
          </Alert>
          <Alert variant="primary" title="Primary" dismissible>
            This alert can be dismissed.
          </Alert>
          <Alert variant="secondary" solid>
            A solid secondary alert without title.
          </Alert>
        </div>
      </Card>

      <!-- Badges -->
      <Card title="Badges" description="Labels and status indicators">
        <div class="mljr-mb-4">
          <h4 class="mljr-h5 mljr-mb-3">Default</h4>
          <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </div>

        <div class="mljr-mb-4">
          <h4 class="mljr-h5 mljr-mb-3">Solid</h4>
          <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
            <Badge variant="primary" solid>Primary</Badge>
            <Badge variant="secondary" solid>Secondary</Badge>
            <Badge variant="success" solid>Success</Badge>
            <Badge variant="warning" solid>Warning</Badge>
            <Badge variant="error" solid>Error</Badge>
          </div>
        </div>

        <div class="mljr-mb-4">
          <h4 class="mljr-h5 mljr-mb-3">Outline</h4>
          <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
            <Badge variant="primary" outline>Primary</Badge>
            <Badge variant="secondary" outline>Secondary</Badge>
          </div>
        </div>

        <div class="mljr-mb-4">
          <h4 class="mljr-h5 mljr-mb-3">With Dot</h4>
          <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
            <Badge variant="success" dot>Online</Badge>
            <Badge variant="warning" dot>Away</Badge>
            <Badge variant="error" dot>Offline</Badge>
          </div>
        </div>

        <div>
          <h4 class="mljr-h5 mljr-mb-3">Sizes</h4>
          <div class="mljr-flex mljr-flex-wrap mljr-items-center mljr-gap-2">
            <Badge variant="primary" size="sm">Small</Badge>
            <Badge variant="primary">Medium</Badge>
            <Badge variant="primary" size="lg">Large</Badge>
          </div>
        </div>
      </Card>
    </div>
  </section>

  <!-- Modal Section -->
  <section id="modal" class="mljr-mb-8">
    <Card title="Modal" description="Dialog windows and overlays">
      <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
        <Button variant="primary" onclick={() => openModal('sm')}>Small Modal</Button>
        <Button variant="secondary" onclick={() => openModal('md')}>Medium Modal</Button>
        <Button variant="outline-primary" onclick={() => openModal('lg')}>Large Modal</Button>
      </div>

      <Modal
        bind:open={modalOpen}
        title="Modal Title"
        description="This is a modal dialog description."
        size={modalSize}
      >
        <p class="mljr-mb-4">
          This is the modal content. You can put any content here including forms,
          images, or other components.
        </p>
        <Input label="Example Input" placeholder="Type something..." />

        {#snippet footer()}
          <Button variant="ghost" onclick={() => modalOpen = false}>Cancel</Button>
          <Button variant="primary" onclick={() => modalOpen = false}>Confirm</Button>
        {/snippet}
      </Modal>
    </Card>
  </section>

  <!-- Data Section -->
  <section id="data" class="mljr-mb-8">
    <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6">
      <!-- Tabs -->
      <Card title="Tabs" description="Tabbed navigation and content">
        <div class="mljr-mb-6">
          <h4 class="mljr-h5 mljr-mb-3">Default</h4>
          <Tabs tabs={tabItems}>
            {#snippet children({ activeTab })}
              {#if activeTab === 'overview'}
                <p>This is the overview content. It provides a general introduction to the topic.</p>
              {:else if activeTab === 'features'}
                <p>Here you can find all the amazing features we offer.</p>
              {:else if activeTab === 'pricing'}
                <p>Check out our competitive pricing plans.</p>
              {/if}
            {/snippet}
          </Tabs>
        </div>

        <div class="mljr-mb-6">
          <h4 class="mljr-h5 mljr-mb-3">Pills Variant</h4>
          <Tabs tabs={tabItems} variant="pills">
            {#snippet children({ activeTab })}
              <p>Content for: {activeTab}</p>
            {/snippet}
          </Tabs>
        </div>

        <div>
          <h4 class="mljr-h5 mljr-mb-3">Secondary Color</h4>
          <Tabs tabs={tabItems} secondary>
            {#snippet children({ activeTab })}
              <p>Content for: {activeTab}</p>
            {/snippet}
          </Tabs>
        </div>
      </Card>

      <!-- Accordion -->
      <Card title="Accordion" description="Collapsible content sections">
        <div class="mljr-mb-6">
          <h4 class="mljr-h5 mljr-mb-3">Default</h4>
          <Accordion items={accordionItems} />
        </div>

        <div class="mljr-mb-6">
          <h4 class="mljr-h5 mljr-mb-3">Multiple Open</h4>
          <Accordion items={accordionItems} multiple defaultOpen={['1']} />
        </div>

        <div>
          <h4 class="mljr-h5 mljr-mb-3">Primary Accent</h4>
          <Accordion items={accordionItems} primary />
        </div>
      </Card>
    </div>
  </section>

  <!-- Cards Section -->
  <section id="layout" class="mljr-mb-8">
    <h2 class="mljr-h2 mljr-mb-4">Cards</h2>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-lg:grid-cols-3 mljr-gap-6">
      <Card title="Default Card" description="A simple card with header">
        <p>This is a basic card component with a title and description.</p>
      </Card>

      <Card title="Primary Card" variant="primary" shadow>
        <p>A card with primary accent border and shadow.</p>
      </Card>

      <Card title="Secondary Card" variant="secondary" shadow="lg">
        <p>A card with secondary accent and large shadow.</p>
      </Card>

      <Card
        title="Interactive Card"
        description="Click me!"
        interactive
        onclick={() => alert('Card clicked!')}
      >
        <p>This card is interactive and can be clicked.</p>
      </Card>

      <Card title="Card with Footer" shadow>
        <p>This card has a custom footer with actions.</p>

        {#snippet footer()}
          <div class="mljr-flex mljr-gap-2">
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">Save</Button>
          </div>
        {/snippet}
      </Card>

      <Card compact shadow>
        {#snippet header()}
          <div class="mljr-flex mljr-items-center mljr-gap-3">
            <div class="mljr-w-10 mljr-h-10 mljr-rounded-full mljr-bg-primary" style="background: var(--mljr-primary-500);"></div>
            <div>
              <h3 class="mljr-card-title">Compact Card</h3>
              <p class="mljr-text-sm mljr-text-muted">Custom header</p>
            </div>
          </div>
        {/snippet}
        <p>A compact card with custom header content.</p>
      </Card>
    </div>
  </section>

  <!-- Color Palette -->
  <section class="mljr-mb-8">
    <Card title="Color Palette" description="Primary and secondary color scales">
      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Primary (Detroit Blue)</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
          {#each [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as shade}
            <div class="mljr-text-center">
              <div
                class="mljr-w-12 mljr-h-12 mljr-mb-1"
                style="background-color: var(--mljr-primary-{shade}); clip-path: var(--mljr-clip-sm);"
              ></div>
              <span class="mljr-text-xs">{shade}</span>
            </div>
          {/each}
        </div>
      </div>

      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Secondary (Sunset Orange)</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
          {#each [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as shade}
            <div class="mljr-text-center">
              <div
                class="mljr-w-12 mljr-h-12 mljr-mb-1"
                style="background-color: var(--mljr-secondary-{shade}); clip-path: var(--mljr-clip-sm);"
              ></div>
              <span class="mljr-text-xs">{shade}</span>
            </div>
          {/each}
        </div>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Accent (Purple)</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
          {#each [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as shade}
            <div class="mljr-text-center">
              <div
                class="mljr-w-12 mljr-h-12 mljr-mb-1"
                style="background-color: var(--mljr-accent-{shade}); clip-path: var(--mljr-clip-sm);"
              ></div>
              <span class="mljr-text-xs">{shade}</span>
            </div>
          {/each}
        </div>
      </div>

      <div class="mljr-mt-6">
        <h4 class="mljr-h5 mljr-mb-3">Semantic Colors</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-4">
          <div class="mljr-text-center">
            <div class="mljr-w-12 mljr-h-12 mljr-mb-1" style="background-color: var(--mljr-success); clip-path: var(--mljr-clip-sm);"></div>
            <span class="mljr-text-xs">Success</span>
          </div>
          <div class="mljr-text-center">
            <div class="mljr-w-12 mljr-h-12 mljr-mb-1" style="background-color: var(--mljr-warning); clip-path: var(--mljr-clip-sm);"></div>
            <span class="mljr-text-xs">Warning</span>
          </div>
          <div class="mljr-text-center">
            <div class="mljr-w-12 mljr-h-12 mljr-mb-1" style="background-color: var(--mljr-error); clip-path: var(--mljr-clip-sm);"></div>
            <span class="mljr-text-xs">Error</span>
          </div>
          <div class="mljr-text-center">
            <div class="mljr-w-12 mljr-h-12 mljr-mb-1" style="background-color: var(--mljr-info); clip-path: var(--mljr-clip-sm);"></div>
            <span class="mljr-text-xs">Info</span>
          </div>
        </div>
      </div>
    </Card>
  </section>
</main>

<!-- Footer -->
<footer class="mljr-footer">
  <div class="mljr-footer-container">
    <div class="mljr-footer-grid">
      <div class="mljr-footer-brand">
        <a href="/" class="mljr-footer-logo">
          <img src="/Logo.png" alt="MLJR Logo" style="height: 2rem; width: auto;" />
          <span>CSS</span>
        </a>
        <p class="mljr-footer-description">
          A TailwindCSS-based CSS framework with Svelte 5 components.
          Beautiful, accessible, and easy to use.
        </p>
        <div class="mljr-footer-social">
          <a href="https://github.com" class="mljr-footer-social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://x.com" class="mljr-footer-social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="mljr-footer-section">
        <h4 class="mljr-footer-title">Documentation</h4>
        <div class="mljr-footer-links">
          <button type="button" class="mljr-footer-link">Getting Started</button>
          <button type="button" class="mljr-footer-link">Components</button>
          <button type="button" class="mljr-footer-link">Customization</button>
          <button type="button" class="mljr-footer-link">Examples</button>
        </div>
      </div>

      <div class="mljr-footer-section">
        <h4 class="mljr-footer-title">Resources</h4>
        <div class="mljr-footer-links">
          <a href="https://github.com" class="mljr-footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://npmjs.com" class="mljr-footer-link" target="_blank" rel="noopener noreferrer">npm</a>
          <button type="button" class="mljr-footer-link">Changelog</button>
          <button type="button" class="mljr-footer-link">Contributing</button>
        </div>
      </div>

      <div class="mljr-footer-section">
        <h4 class="mljr-footer-title">Community</h4>
        <div class="mljr-footer-links">
          <button type="button" class="mljr-footer-link">Discord</button>
          <a href="https://x.com" class="mljr-footer-link" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://stackoverflow.com" class="mljr-footer-link" target="_blank" rel="noopener noreferrer">Stack Overflow</a>
        </div>
      </div>
    </div>

    <div class="mljr-footer-bottom">
      <p class="mljr-footer-copyright">
        &copy; 2024 MLJR CSS. All rights reserved.
      </p>
      <div class="mljr-footer-legal">
        <button type="button" class="mljr-footer-legal-link">Privacy Policy</button>
        <button type="button" class="mljr-footer-legal-link">Terms of Service</button>
      </div>
    </div>
  </div>
</footer>

<style>
  .mljr-w-10 {
    width: 2.5rem;
  }
  .mljr-h-10 {
    height: 2.5rem;
  }
  .mljr-w-12 {
    width: 3rem;
  }
  .mljr-h-12 {
    height: 3rem;
  }
</style>
