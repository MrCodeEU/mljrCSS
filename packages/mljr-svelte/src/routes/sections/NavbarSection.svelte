<script lang="ts">
  import { Card, Button, Navbar, CodeExample, type UserMenuItem } from '$lib';

  // Navbar with search
  let searchValue = $state('');

  // Navbar with user menu
  const userMenuItems: UserMenuItem[] = [
    { label: 'Profile', icon: 'mdi:account', href: '/profile' },
    { label: 'Settings', icon: 'mdi:cog', href: '/settings' },
    { label: '', divider: true },
    { label: 'Logout', icon: 'mdi:logout', onClick: () => alert('Logged out!') },
  ];

  const navItems = [
    { label: 'Home', href: '#home', active: true },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];
</script>

<section id="navbar" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-gap-8">
    <!-- Default Navbar -->
    <Card title="Default Navbar" description="Standard navigation with logo, links, and actions">
      <div style="min-height: 80px;">
        <Navbar items={navItems} showMenuToggle={false}>
          {#snippet logo()}
            <span class="demo-logo-text">MLJR</span>
          {/snippet}
          {#snippet actions()}
            <Button variant="ghost" size="sm" icon aria-label="Search">🔍</Button>
            <Button variant="primary" size="sm">Get Started</Button>
          {/snippet}
        </Navbar>
      </div>
      <CodeExample code={`<Navbar items={navItems}>
  {#snippet logo()}
    <span>MLJR</span>
  {/snippet}
  {#snippet actions()}
    <Button variant="primary" size="sm">Get Started</Button>
  {/snippet}
</Navbar>`} />
    </Card>

    <!-- Transparent Navbar -->
    <Card title="Transparent Variant" description="Subtle navbar for hero sections">
      <div style="min-height: 80px; border-radius: var(--mljr-radius-lg); background: linear-gradient(135deg, var(--mljr-primary-100) 0%, var(--mljr-secondary-100) 100%); overflow: hidden;">
        <Navbar
          items={[
            { label: 'Features', href: '#features' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Docs', href: '#docs' },
          ]}
          variant="transparent"
          showMenuToggle={false}
        >
          {#snippet logo()}
            <span class="demo-logo-text">Brand</span>
          {/snippet}
          {#snippet actions()}
            <Button variant="secondary" size="sm">Sign In</Button>
          {/snippet}
        </Navbar>
      </div>
      <CodeExample code={`<Navbar items={navItems} variant="transparent">
  {#snippet logo()}
    <span>Brand</span>
  {/snippet}
  {#snippet actions()}
    <Button variant="secondary" size="sm">Sign In</Button>
  {/snippet}
</Navbar>`} />
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

      <Card title="Props" description="Available configuration options">
        <CodeExample code={`<Navbar
  items={navItems}        // NavItem[]
  variant="default"       // 'default' | 'transparent' | 'sticky'
  fixed={false}           // pin to top of viewport
  showSearch={false}      // show search input
  userMenu={items}        // UserMenuItem[]
>
  {#snippet logo()} ... {/snippet}
  {#snippet actions()} ... {/snippet}
  {#snippet userContent()} ... {/snippet}
</Navbar>`} />
      </Card>
    </div>

    <!-- Navbar with Search -->
    <Card title="Navbar with Search" description="Integrated search functionality">
      <div style="min-height: 80px;">
        <Navbar
          items={navItems}
          showMenuToggle={false}
          showSearch
          searchPlaceholder="Search documentation..."
          bind:searchValue
          onSearch={(val) => console.log('Search:', val)}
        >
          {#snippet logo()}
            <span style="font-weight: 700; font-size: 1.25rem; background: linear-gradient(135deg, var(--mljr-primary-500), var(--mljr-secondary-500)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
              SearchBar
            </span>
          {/snippet}
        </Navbar>
      </div>

      <CodeExample code={`&lt;script lang="ts"&gt;
  import { Navbar } from 'mljr-svelte';

  let searchValue = $state('');

  const navItems = [
    { label: 'Home', href: '#home', active: true },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];
&lt;/script&gt;

&lt;Navbar
  items={navItems}
  showSearch
  searchPlaceholder="Search..."
  bind:searchValue
  onSearch={(val) => console.log('Search:', val)}
&gt;
  {#snippet logo()}
    &lt;span&gt;Brand&lt;/span&gt;
  {/snippet}
&lt;/Navbar&gt;`} />
    </Card>

    <!-- Navbar with User Menu -->
    <Card title="Navbar with User Menu" description="User account dropdown menu">
      <div style="min-height: 80px;">
        <Navbar
          items={navItems}
          userMenu={userMenuItems}
          showMenuToggle={false}
        >
          {#snippet logo()}
            <span style="font-weight: 700; font-size: 1.25rem;">
              UserMenu
            </span>
          {/snippet}
          {#snippet userContent()}
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--mljr-primary-500), var(--mljr-secondary-500)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.875rem;">
                JD
              </div>
            </div>
          {/snippet}
        </Navbar>
      </div>

      <CodeExample code={`&lt;script lang="ts"&gt;
  import { Navbar, type UserMenuItem } from 'mljr-svelte';

  const userMenuItems: UserMenuItem[] = [
    { label: 'Profile', icon: 'mdi:account', href: '/profile' },
    { label: 'Settings', icon: 'mdi:cog', href: '/settings' },
    { label: '', divider: true },
    { label: 'Logout', icon: 'mdi:logout', onClick: () => logout() },
  ];
&lt;/script&gt;

&lt;Navbar
  items={navItems}
  userMenu={userMenuItems}
&gt;
  {#snippet logo()}
    &lt;span&gt;Brand&lt;/span&gt;
  {/snippet}
  {#snippet userContent()}
    &lt;div style="display: flex; align-items: center; gap: 0.5rem;"&gt;
      &lt;img src="/avatar.jpg" alt="User" style="width: 32px; height: 32px; border-radius: 50%;" /&gt;
    &lt;/div&gt;
  {/snippet}
&lt;/Navbar&gt;`} />
    </Card>

    <!-- Complete Navbar Example -->
    <Card title="Complete Example" description="Navbar with all features combined">
      <div style="min-height: 80px;">
        <Navbar
          items={navItems}
          showMenuToggle={false}
          showSearch
          bind:searchValue
          userMenu={userMenuItems}
        >
          {#snippet logo()}
            <span style="font-weight: 700; font-size: 1.25rem; background: linear-gradient(135deg, var(--mljr-primary-500), var(--mljr-secondary-500)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
              Complete
            </span>
          {/snippet}
          {#snippet actions()}
            <Button variant="outline-primary" size="sm">Sign In</Button>
            <Button variant="primary" size="sm">Sign Up</Button>
          {/snippet}
          {#snippet userContent()}
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 0.875rem; color: var(--mljr-text);">John Doe</span>
              <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--mljr-primary-500), var(--mljr-secondary-500)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.875rem;">
                JD
              </div>
            </div>
          {/snippet}
        </Navbar>
      </div>

      <CodeExample code={`&lt;Navbar
  items={navItems}
  showSearch
  bind:searchValue
  userMenu={userMenuItems}
  variant="sticky"
&gt;
  {#snippet logo()}
    &lt;span&gt;Brand&lt;/span&gt;
  {/snippet}
  {#snippet actions()}
    &lt;Button variant="outline-primary"&gt;Sign In&lt;/Button&gt;
    &lt;Button variant="primary"&gt;Sign Up&lt;/Button&gt;
  {/snippet}
  {#snippet userContent()}
    &lt;div&gt;
      &lt;span&gt;John Doe&lt;/span&gt;
      &lt;img src="/avatar.jpg" alt="User" /&gt;
    &lt;/div&gt;
  {/snippet}
&lt;/Navbar&gt;`} />
    </Card>
  </div>
</section>

<style>
  .demo-logo-text {
    font-weight: 700;
    font-size: var(--mljr-text-lg);
    background: linear-gradient(135deg, var(--mljr-primary-500), var(--mljr-secondary-500));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
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
