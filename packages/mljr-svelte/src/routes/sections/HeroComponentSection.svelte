<script lang="ts">
  import { Hero, Button, Badge, CodeExample, Icon } from '$lib';

  const codeExample = `<script>
  import { Hero, Button } from 'mljr-svelte';
<\/script>

<!-- Default Hero -->
<Hero
  title="Welcome to MLJR CSS"
  subtitle="A beautiful component library with claymorphism design"
>
  {#snippet actions()}
    <Button variant="primary" size="lg">Get Started</Button>
    <Button variant="outline-primary" size="lg">Learn More</Button>
  {/snippet}
</Hero>

<!-- Centered with Gradient -->
<Hero
  variant="centered"
  title="Build Amazing Products"
  subtitle="The fastest way to ship beautiful web applications"
  gradient={true}
  gradientColor="primary"
  minHeight="600px"
>
  {#snippet actions()}
    <Button variant="primary" size="lg">Start Building</Button>
  {/snippet}
</Hero>

<!-- Split with Media -->
<Hero
  variant="split"
  title="Modern Components"
  subtitle="Everything you need to build your next project"
>
  {#snippet actions()}
    <Button variant="primary">View Components</Button>
  {/snippet}
  {#snippet media()}
    <img src="/hero-image.png" alt="Product" />
  {/snippet}
</Hero>`;
</script>

<div class="hero-section">
  <div class="mljr-mb-6">
    <p class="mljr-text-lg mljr-text-muted">
      Create impactful landing pages with flexible hero sections. Supports multiple layouts,
      backgrounds, gradients, and media.
    </p>
  </div>

  <div class="examples-grid">
    <!-- Default Variant -->
    <div class="example-card full-width">
      <h3 class="example-title">Default Variant</h3>
      <div class="hero-preview">
        <Hero
          title="Welcome to MLJR CSS"
          subtitle="A modern component library featuring claymorphism design with warm colors and smooth animations"
          minHeight="400px"
        >
          {#snippet actions()}
            <Button variant="primary" size="lg">Get Started</Button>
            <Button variant="outline-primary" size="lg">View Docs</Button>
          {/snippet}
        </Hero>
      </div>
    </div>

    <!-- Centered Variant -->
    <div class="example-card full-width">
      <h3 class="example-title">Centered Variant</h3>
      <div class="hero-preview">
        <Hero
          variant="centered"
          title="Build Something Amazing"
          subtitle="Everything you need to create beautiful web applications with Svelte 5 and modern CSS"
          minHeight="400px"
        >
          {#snippet actions()}
            <Button variant="primary" size="lg">Start Building</Button>
            <Button variant="ghost" size="lg">Learn More →</Button>
          {/snippet}
        </Hero>
      </div>
    </div>

    <!-- With Gradient Background -->
    <div class="example-card full-width">
      <h3 class="example-title">Gradient Background</h3>
      <div class="hero-preview">
        <Hero
          variant="centered"
          title="Launch Your Project Today"
          subtitle="Join thousands of developers building the future with our component library"
          gradient={true}
          gradientColor="primary"
          minHeight="400px"
        >
          {#snippet actions()}
            <Button variant="secondary" size="lg">Sign Up Free</Button>
          {/snippet}
        </Hero>
      </div>
    </div>

    <!-- Split Variant with Media -->
    <div class="example-card full-width">
      <h3 class="example-title">Split Layout with Media</h3>
      <div class="hero-preview">
        <Hero
          variant="split"
          title="Modern Component Design"
          subtitle="Beautifully crafted components that work seamlessly together"
          minHeight="400px"
        >
          {#snippet actions()}
            <Button variant="primary">Explore Components</Button>
            <Button variant="outline-primary">Live Demo</Button>
          {/snippet}
          {#snippet media()}
            <div class="media-placeholder">
              <Icon icon="mdi:palette" size={120} />
              <p class="mljr-text-sm mljr-text-muted mljr-mt-4">Your image or media here</p>
            </div>
          {/snippet}
        </Hero>
      </div>
    </div>

    <!-- Minimal Variant -->
    <div class="example-card full-width">
      <h3 class="example-title">Minimal Variant</h3>
      <div class="hero-preview">
        <Hero
          variant="minimal"
          title="Simple & Effective"
          subtitle="Sometimes less is more. Clean design with maximum impact."
          minHeight="300px"
        >
          {#snippet actions()}
            <Button variant="primary">Get Started</Button>
          {/snippet}
        </Hero>
      </div>
    </div>

    <!-- With Pattern -->
    <div class="example-card full-width">
      <h3 class="example-title">With Decorative Pattern</h3>
      <div class="hero-preview">
        <Hero
          variant="centered"
          title="Pattern Background"
          subtitle="Add subtle patterns for visual interest without overwhelming your content"
          pattern={true}
          minHeight="350px"
        >
          {#snippet actions()}
            <Button variant="primary">Learn More</Button>
          {/snippet}
        </Hero>
      </div>
    </div>

    <!-- Secondary Gradient -->
    <div class="example-card full-width">
      <h3 class="example-title">Secondary Gradient</h3>
      <div class="hero-preview">
        <Hero
          variant="centered"
          title="Stand Out From The Crowd"
          subtitle="Make a lasting impression with bold colors and compelling copy"
          gradient={true}
          gradientColor="secondary"
          minHeight="400px"
        >
          {#snippet actions()}
            <Button size="lg">Start Your Journey</Button>
          {/snippet}
        </Hero>
      </div>
    </div>

    <!-- With Badges and Rich Content -->
    <div class="example-card full-width">
      <h3 class="example-title">Rich Content Example</h3>
      <div class="hero-preview">
        <Hero
          variant="centered"
          title="Feature-Rich Hero"
          subtitle="Showcase your product with badges, statistics, and compelling CTAs"
          minHeight="450px"
        >
          {#snippet children()}
            <div class="hero-badges">
              <Badge variant="success">
                <Icon icon="mdi:check-circle" size={16} />
                Trusted by 10k+ users
              </Badge>
              <Badge variant="info">
                <Icon icon="mdi:star" size={16} />
                4.9/5 Rating
              </Badge>
              <Badge>
                <Icon icon="mdi:rocket-launch" size={16} />
                Fast Setup
              </Badge>
            </div>
          {/snippet}
          {#snippet actions()}
            <Button variant="primary" size="lg">Start Free Trial</Button>
            <Button variant="outline-primary" size="lg">Watch Demo</Button>
          {/snippet}
        </Hero>
      </div>
    </div>

    <!-- Code Example -->
    <div class="example-card full-width">
      <h3 class="example-title">Usage Example</h3>
      <CodeExample code={codeExample} language="svelte" />
    </div>
  </div>
</div>

<style>
  .hero-section {
    max-width: 100%;
  }

  .examples-grid {
    display: grid;
    gap: var(--mljr-space-8);
  }

  .example-card {
    padding: var(--mljr-space-6);
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-shadow);
  }

  .example-card.full-width {
    grid-column: 1 / -1;
  }

  .example-title {
    font-size: var(--mljr-text-lg);
    font-weight: 600;
    color: var(--mljr-text);
    margin-bottom: var(--mljr-space-4);
  }

  .hero-preview {
    border-radius: var(--mljr-radius-lg);
    overflow: hidden;
    border: 1px solid var(--mljr-border);
  }

  .media-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--mljr-space-8);
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-lg);
    min-height: 300px;
    color: var(--mljr-text-secondary);
  }

  .hero-badges {
    display: flex;
    flex-wrap: wrap;
    gap: var(--mljr-space-3);
    justify-content: center;
    margin-top: var(--mljr-space-4);
  }
</style>
