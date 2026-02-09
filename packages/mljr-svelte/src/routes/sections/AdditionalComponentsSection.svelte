<script lang="ts">
  import { Button, Card, Dropdown, Breadcrumb, Rating, Slider, RangeSlider, Stats, Timeline, CodeExample } from '$lib';

  let rating1 = $state(3);
  let rating2 = $state(4);
  let sliderValue = $state(50);
  let sliderValue2 = $state(75);
  let rangeMin = $state(25);
  let rangeMax = $state(75);
  let priceMin = $state(200);
  let priceMax = $state(800);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/' },
    { label: 'Breadcrumb' },
  ];

  const timelineItems = [
    {
      title: 'Project Started',
      description: 'Initial project setup and planning phase completed.',
      date: 'Jan 2024',
      variant: 'primary' as const,
    },
    {
      title: 'Design Phase',
      description: 'UI/UX design completed with claymorphism theme.',
      date: 'Feb 2024',
      variant: 'secondary' as const,
    },
    {
      title: 'Development',
      description: 'Core components built with Svelte 5.',
      date: 'Mar 2024',
      variant: 'success' as const,
    },
    {
      title: 'Release',
      description: 'Version 1.0 released to the public.',
      date: 'Apr 2024',
      variant: 'primary' as const,
    },
  ];
</script>

<section id="additional-components" class="mljr-mb-8">
  <h2 class="mljr-h2 mljr-mb-4">Additional Components</h2>
  <p class="mljr-text-secondary mljr-mb-6">More useful components for building complete applications.</p>

  <!-- Dropdown & Breadcrumb Row -->
  <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6 mljr-mb-6">
    <!-- Dropdown -->
    <Card title="Dropdown" description="Accessible dropdown menus with click-outside handling" class="mljr-card-overflow">
      <div class="mljr-flex mljr-gap-4">
        <Dropdown>
          {#snippet trigger()}
            <Button variant="primary">
              Open Menu
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" style="margin-left: 0.5rem;">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </Button>
          {/snippet}
          <button class="mljr-dropdown-item">Profile</button>
          <button class="mljr-dropdown-item">Settings</button>
          <button class="mljr-dropdown-item">Notifications</button>
          <div class="mljr-dropdown-divider"></div>
          <button class="mljr-dropdown-item mljr-dropdown-item-danger">Logout</button>
        </Dropdown>

        <Dropdown position="bottom-right">
          {#snippet trigger()}
            <Button variant="ghost">
              Right Aligned
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" style="margin-left: 0.5rem;">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </Button>
          {/snippet}
          <button class="mljr-dropdown-item">Option 1</button>
          <button class="mljr-dropdown-item">Option 2</button>
          <button class="mljr-dropdown-item">Option 3</button>
        </Dropdown>
      </div>
    </Card>

    <!-- Breadcrumb -->
    <Card title="Breadcrumb" description="Navigation path indicator">
      <div class="mljr-mb-4">
        <h4 class="mljr-h5 mljr-mb-3">Default</h4>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div class="mljr-mb-4">
        <h4 class="mljr-h5 mljr-mb-3">Custom Separator</h4>
        <Breadcrumb items={breadcrumbItems} separator="›" />
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Arrow Separator</h4>
        <Breadcrumb items={breadcrumbItems} separator="→" />
      </div>
    </Card>
  </div>

  <!-- Rating & Slider Row -->
  <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6 mljr-mb-6">
    <!-- Rating -->
    <Card title="Rating" description="Star rating input with hover preview">
      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Interactive</h4>
        <div class="mljr-flex mljr-flex-col mljr-gap-4">
          <Rating bind:value={rating1} showValue />
          <p class="mljr-text-sm mljr-text-muted">Selected: {rating1} stars</p>
        </div>
      </div>

      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Read-only</h4>
        <Rating value={4} readonly />
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Sizes</h4>
        <div class="mljr-flex mljr-flex-col mljr-gap-3">
          <Rating value={3} size="sm" readonly />
          <Rating value={4} size="md" readonly />
          <Rating value={5} size="lg" readonly />
        </div>
      </div>
    </Card>

    <!-- Slider -->
    <Card title="Slider" description="Range input with claymorphism styling">
      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">With Label</h4>
        <Slider bind:value={sliderValue} label="Volume" showValue />
      </div>

      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Floating Value Display</h4>
        <Slider bind:value={sliderValue2} label="Brightness" showFloatingValue />
      </div>

      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">With Ticks</h4>
        <Slider bind:value={sliderValue2} min={0} max={100} step={10} showTicks showValue />
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Disabled</h4>
        <Slider value={40} disabled />
      </div>
    </Card>
  </div>

  <!-- Range Slider -->
  <Card title="Range Slider" description="Dual-handle slider for selecting a value range" class="mljr-mb-6">
    <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6">
      <div>
        <h4 class="mljr-h5 mljr-mb-3">Default Range</h4>
        <RangeSlider bind:minValue={rangeMin} bind:maxValue={rangeMax} label="Range" />
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Price Range</h4>
        <RangeSlider bind:minValue={priceMin} bind:maxValue={priceMax} min={0} max={1000} step={50} label="Price ($)" />
      </div>
    </div>
  </Card>

  <!-- Stats -->
  <Card title="Stats" description="Display key metrics and statistics" class="mljr-mb-6">
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-lg:grid-cols-4 mljr-gap-4">
      <Stats
        label="Total Users"
        value="12,543"
        trend="up"
        trendValue="+12%"
        description="from last month"
        variant="primary"
        icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
      />
      <Stats
        label="Revenue"
        value="$48,290"
        trend="up"
        trendValue="+8.2%"
        variant="success"
        icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>'
      />
      <Stats
        label="Orders"
        value="1,429"
        trend="down"
        trendValue="-3%"
        variant="warning"
        icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>'
      />
      <Stats
        label="Conversion"
        value="3.24%"
        description="avg. rate"
        variant="secondary"
        icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>'
      />
    </div>
  </Card>

  <!-- Timeline -->
  <Card title="Timeline" description="Vertical timeline for displaying events">
    <Timeline items={timelineItems} />
  </Card>

  <CodeExample code={`// Dropdown
<Dropdown>
  {#snippet trigger()}
    <Button>Open Menu</Button>
  {/snippet}
  <button class="mljr-dropdown-item">Item 1</button>
  <button class="mljr-dropdown-item">Item 2</button>
</Dropdown>

// Breadcrumb
<Breadcrumb items={[ 
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Details' }
]} />

// Rating
<Rating bind:value={rating1} showValue />
<Rating value={4} readonly />

// Slider
<Slider bind:value label="Volume" showValue />
<Slider bind:value showTicks showFloatingValue />

// Range Slider
<RangeSlider 
  bind:minValue={rangeMin} 
  bind:maxValue={rangeMax} 
  label="Price Range" 
/>

// Stats
<Stats
  label="Total Users"
  value="12,543"
  trend="up"
  trendValue="+12%"
  variant="primary"
/>

// Timeline
<Timeline items={[
  { title: 'Step 1', description: 'Details', date: 'Jan 2024', variant: 'primary' },
  { title: 'Step 2', description: 'More', date: 'Feb 2024', variant: 'secondary' }
]} />`} />
</section>
