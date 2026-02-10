<script lang="ts">
  import { Card, Button, Input, CodeExample } from '$lib';
  import { slide } from 'svelte/transition';

  // Simulate mobile state
  let mobileOpen1 = $state(false);
  let mobileOpen2 = $state(false);
</script>

<section id="navbar" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-gap-8">
    <!-- Default Navbar -->
    <Card title="Default Navbar" description="Standard navigation with logo, links, and actions">
      <div class="navbar-demo-container">
        <nav class="mljr-navbar-demo">
          <div class="mljr-navbar-demo-inner">
            <!-- Logo -->
            <div class="mljr-navbar-demo-logo">
              <span class="logo-text">MLJR</span>
            </div>

            <!-- Desktop Menu -->
            <div class="mljr-navbar-demo-menu">
              <a href="#" class="mljr-navbar-demo-link active">Home</a>
              <a href="#" class="mljr-navbar-demo-link">About</a>
              <a href="#" class="mljr-navbar-demo-link">Services</a>
              <a href="#" class="mljr-navbar-demo-link">Contact</a>
            </div>

            <!-- Actions -->
            <div class="mljr-navbar-demo-actions">
              <Button variant="ghost" size="sm" icon aria-label="Search">🔍</Button>
              <Button variant="primary" size="sm">Get Started</Button>
            </div>

            <!-- Mobile Toggle -->
            <button class="mljr-navbar-demo-toggle" onclick={() => mobileOpen1 = !mobileOpen1} aria-label="Toggle menu" aria-expanded={mobileOpen1}>
              <span class="toggle-line"></span>
              <span class="toggle-line"></span>
              <span class="toggle-line"></span>
            </button>
          </div>

          <!-- Mobile Menu -->
          {#if mobileOpen1}
            <div class="mljr-navbar-demo-mobile" transition:slide={{ duration: 200 }}>
              <a href="#" class="mljr-navbar-demo-link mobile active">Home</a>
              <a href="#" class="mljr-navbar-demo-link mobile">About</a>
              <a href="#" class="mljr-navbar-demo-link mobile">Services</a>
              <a href="#" class="mljr-navbar-demo-link mobile">Contact</a>
            </div>
          {/if}
        </nav>
      </div>
    </Card>

    <!-- Transparent Navbar -->
    <Card title="Transparent Variant" description="Subtle navbar for hero sections">
      <div class="navbar-demo-container transparent-bg">
        <nav class="mljr-navbar-demo transparent">
          <div class="mljr-navbar-demo-inner">
            <div class="mljr-navbar-demo-logo">
              <span class="logo-text">Brand</span>
            </div>
            <div class="mljr-navbar-demo-menu">
              <a href="#" class="mljr-navbar-demo-link">Features</a>
              <a href="#" class="mljr-navbar-demo-link">Pricing</a>
              <a href="#" class="mljr-navbar-demo-link">Docs</a>
            </div>
            <div class="mljr-navbar-demo-actions">
              <Button variant="secondary" size="sm">Sign In</Button>
            </div>
          </div>
        </nav>
      </div>
    </Card>

    <!-- Navbar with Search -->
    <Card title="With Search" description="Navbar with integrated search input">
      <div class="navbar-demo-container">
        <nav class="mljr-navbar-demo">
          <div class="mljr-navbar-demo-inner">
            <div class="mljr-navbar-demo-logo">
              <span class="logo-text">Search</span>
            </div>
            <div class="mljr-navbar-demo-search">
              <Input type="search" placeholder="Search..." size="sm" />
            </div>
            <div class="mljr-navbar-demo-actions">
              <Button variant="ghost" size="sm" icon>🔔</Button>
              <Button variant="ghost" size="sm" icon>👤</Button>
            </div>
          </div>
        </nav>
      </div>
    </Card>

    <!-- Feature Highlights -->
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <Card title="Features" description="What makes our Navbar special">
        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-icon">🎨</span>
            <div class="feature-content">
              <h4>Claymorphism</h4>
              <p>Soft 3D shadows with gradient backgrounds</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📱</span>
            <div class="feature-content">
              <h4>Mobile Responsive</h4>
              <p>Collapsible menu with smooth animations</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🌙</span>
            <div class="feature-content">
              <h4>Theme Aware</h4>
              <p>Automatic dark mode support</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🎯</span>
            <div class="feature-content">
              <h4>Customizable</h4>
              <p>Easy to theme and extend</p>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Usage" description="Simple implementation">
        <CodeExample code={`<Navbar>
  {#snippet logo()}
    <span>Brand</span>
  {/snippet}
  
  {#snippet menu()}
    <a href="#">Home</a>
    <a href="#">About</a>
  {/snippet}
  
  {#snippet actions()}
    <Button>Get Started</Button>
  {/snippet}
</Navbar>`} />
      </Card>
    </div>
  </div>
</section>

<style>
  .navbar-demo-container {
    padding: var(--mljr-space-4);
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-lg);
  }

  .navbar-demo-container.transparent-bg {
    background: linear-gradient(135deg, var(--mljr-primary-100) 0%, var(--mljr-secondary-100) 100%);
  }

  /* Demo Navbar - Styled to match claymorphism system */
  .mljr-navbar-demo {
    position: relative;
    background: linear-gradient(145deg, 
      var(--mljr-bg) 0%, 
      var(--mljr-bg-secondary) 50%, 
      var(--mljr-bg-tertiary) 100%
    );
    border-radius: var(--mljr-radius-xl);
    box-shadow: 
      0 8px 32px rgba(0,0,0,0.12),
      0 4px 16px rgba(0,0,0,0.08),
      0 2px 8px rgba(0,0,0,0.04),
      inset 0 -2px 4px rgba(255,255,255,0.3);
    padding: var(--mljr-space-3) var(--mljr-space-4);
  }

  .mljr-navbar-demo.transparent {
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(8px);
    box-shadow: 
      0 4px 16px rgba(0,0,0,0.08),
      inset 0 -1px 2px rgba(255,255,255,0.5);
  }

  :global([data-theme="dark"]) .mljr-navbar-demo.transparent {
    background: rgba(0,0,0,0.4);
  }

  .mljr-navbar-demo-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--mljr-space-4);
  }

  /* Logo */
  .mljr-navbar-demo-logo {
    background: linear-gradient(145deg, var(--mljr-bg-secondary) 0%, var(--mljr-bg) 100%);
    padding: var(--mljr-space-2) var(--mljr-space-4);
    border-radius: var(--mljr-radius-lg);
    box-shadow: 
      var(--mljr-clay-shadow-xs),
      inset 0 1px 2px rgba(255,255,255,0.5);
  }

  .logo-text {
    font-weight: 700;
    font-size: var(--mljr-text-lg);
    background: linear-gradient(135deg, var(--mljr-primary-500), var(--mljr-secondary-500));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Menu */
  .mljr-navbar-demo-menu {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-1);
    background: linear-gradient(145deg, var(--mljr-bg-secondary) 0%, var(--mljr-bg-tertiary) 100%);
    padding: var(--mljr-space-1);
    border-radius: var(--mljr-radius-lg);
    box-shadow: 
      inset 2px 2px 6px rgba(0,0,0,0.06),
      inset -2px -2px 6px rgba(255,255,255,0.7),
      1px 1px 2px rgba(255,255,255,0.3);
  }

  /* Links */
  .mljr-navbar-demo-link {
    padding: var(--mljr-space-2) var(--mljr-space-4);
    border-radius: var(--mljr-radius-md);
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text-secondary);
    text-decoration: none;
    transition: all var(--mljr-transition-fast);
  }

  .mljr-navbar-demo-link:hover {
    background: linear-gradient(145deg, var(--mljr-bg) 0%, var(--mljr-bg-secondary) 100%);
    transform: translateY(-2px);
    box-shadow: 
      2px 2px 6px rgba(0,0,0,0.08),
      -1px -1px 3px rgba(255,255,255,0.5);
    color: var(--mljr-text);
  }

  .mljr-navbar-demo-link.active {
    background: linear-gradient(145deg, var(--mljr-bg) 0%, var(--mljr-bg-secondary) 100%);
    color: var(--mljr-primary-500);
    box-shadow: var(--mljr-clay-shadow-xs);
  }

  /* Actions */
  .mljr-navbar-demo-actions {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
  }

  /* Search */
  .mljr-navbar-demo-search {
    flex: 1;
    max-width: 300px;
  }

  /* Mobile Toggle */
  .mljr-navbar-demo-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    padding: var(--mljr-space-2);
    background: linear-gradient(145deg, var(--mljr-bg-secondary) 0%, var(--mljr-bg-tertiary) 100%);
    border: none;
    border-radius: var(--mljr-radius-md);
    cursor: pointer;
    box-shadow: var(--mljr-clay-shadow-xs);
  }

  .toggle-line {
    width: 20px;
    height: 2px;
    background: var(--mljr-text);
    border-radius: var(--mljr-radius-full);
  }

  /* Mobile Menu */
  .mljr-navbar-demo-mobile {
    margin-top: var(--mljr-space-3);
    padding-top: var(--mljr-space-3);
    border-top: 1px solid var(--mljr-border);
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-2);
  }

  .mljr-navbar-demo-link.mobile {
    padding: var(--mljr-space-3) var(--mljr-space-4);
  }

  /* Responsive */
  @media (max-width: 640px) {
    .mljr-navbar-demo-menu {
      display: none;
    }

    .mljr-navbar-demo-toggle {
      display: flex;
    }

    .mljr-navbar-demo-actions {
      display: none;
    }
  }

  /* Feature List */
  .feature-list {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-4);
    padding: var(--mljr-space-4);
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: var(--mljr-space-3);
    padding: var(--mljr-space-3);
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-shadow-xs);
  }

  .feature-icon {
    font-size: var(--mljr-text-2xl);
  }

  .feature-content h4 {
    font-weight: 600;
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text);
    margin: 0 0 var(--mljr-space-1) 0;
  }

  .feature-content p {
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-secondary);
    margin: 0;
  }
</style>
