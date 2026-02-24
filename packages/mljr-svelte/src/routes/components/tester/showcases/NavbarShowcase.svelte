<script lang="ts">
  import { Navbar, Button, Icon, Avatar, Badge, Dropdown } from '$lib';

  let mobileMenuOpen = $state(false);
</script>

<div class="mljr-space-y-8">
  <!-- Basic Navbar -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Navbar</h3>
    <Navbar>
      {#snippet logo()}
        <span class="mljr-text-xl mljr-font-bold">MLJR</span>
      {/snippet}

      {#snippet nav()}
        <a href="." class="mljr-nav-link">Home</a>
        <a href="." class="mljr-nav-link">About</a>
        <a href="." class="mljr-nav-link">Services</a>
        <a href="." class="mljr-nav-link">Contact</a>
      {/snippet}
    </Navbar>
  </section>

  <!-- With Actions -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Actions</h3>
    <Navbar>
      {#snippet logo()}
        <div class="mljr-flex mljr-items-center mljr-gap-2">
          <div class="mljr-w-8 mljr-h-8 mljr-bg-gradient-primary mljr-rounded-lg"></div>
          <span class="mljr-text-xl mljr-font-bold">Brand</span>
        </div>
      {/snippet}

      {#snippet nav()}
        <a href="." class="mljr-nav-link mljr-nav-link-active">Dashboard</a>
        <a href="." class="mljr-nav-link">Projects</a>
        <a href="." class="mljr-nav-link">Team</a>
        <a href="." class="mljr-nav-link">Calendar</a>
      {/snippet}

      {#snippet actions()}
        <Button variant="ghost" size="sm">
          <Icon icon="mdi:bell" size={20} />
        </Button>
        <Button variant="primary" size="sm">Sign In</Button>
      {/snippet}
    </Navbar>
  </section>

  <!-- With Search -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Search</h3>
    <Navbar>
      {#snippet logo()}
        <span class="mljr-text-xl mljr-font-bold">Search App</span>
      {/snippet}

      {#snippet nav()}
        <div class="mljr-flex-1 mljr-max-w-xl">
          <div class="mljr-relative">
            <Icon
              icon="mdi:magnify"
              size={20}
              class="mljr-absolute mljr-left-3 mljr-top-1/2 mljr--translate-y-1/2 mljr-text-muted"
            />
            <input
              type="search"
              placeholder="Search..."
              class="mljr-input mljr-input-sm mljr-w-full mljr-pl-10"
            />
          </div>
        </div>
      {/snippet}

      {#snippet actions()}
        <Avatar initials="JD" size="sm" />
      {/snippet}
    </Navbar>
  </section>

  <!-- With Dropdown Menu -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Dropdown Menu</h3>
    <Navbar>
      {#snippet logo()}
        <span class="mljr-text-xl mljr-font-bold">Dashboard</span>
      {/snippet}

      {#snippet nav()}
        <a href="." class="mljr-nav-link">Home</a>

        <Dropdown>
          {#snippet trigger()}
            <button class="mljr-nav-link mljr-flex mljr-items-center mljr-gap-1">
              Products
              <Icon icon="mdi:chevron-down" size={16} />
            </button>
          {/snippet}
          <button class="mljr-dropdown-item">All Products</button>
          <button class="mljr-dropdown-item">New Arrivals</button>
          <button class="mljr-dropdown-item">Best Sellers</button>
        </Dropdown>

        <a href="." class="mljr-nav-link">Pricing</a>
        <a href="." class="mljr-nav-link">Contact</a>
      {/snippet}

      {#snippet actions()}
        <Button variant="outline-primary" size="sm">Sign Up</Button>
      {/snippet}
    </Navbar>
  </section>

  <!-- With Notifications -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Notifications</h3>
    <Navbar>
      {#snippet logo()}
        <span class="mljr-text-xl mljr-font-bold">App</span>
      {/snippet}

      {#snippet nav()}
        <a href="." class="mljr-nav-link">Feed</a>
        <a href="." class="mljr-nav-link">Explore</a>
        <a href="." class="mljr-nav-link">Messages</a>
      {/snippet}

      {#snippet actions()}
        <div class="mljr-relative">
          <Button variant="ghost" size="sm">
            <Icon icon="mdi:bell" size={20} />
          </Button>
          <Badge
            variant="error"
            solid
            class="mljr-absolute mljr--top-1 mljr--right-1"
          >
            3
          </Badge>
        </div>

        <Dropdown>
          {#snippet trigger()}
            <button class="mljr-flex mljr-items-center mljr-gap-2 mljr-p-2 mljr-rounded-lg hover:mljr-bg-secondary mljr-transition-colors">
              <Avatar initials="JD" size="sm" />
              <Icon icon="mdi:chevron-down" size={16} />
            </button>
          {/snippet}
          <button class="mljr-dropdown-item">
            <Icon icon="mdi:account" size={18} />
            Profile
          </button>
          <button class="mljr-dropdown-item">
            <Icon icon="mdi:cog" size={18} />
            Settings
          </button>
          <div class="mljr-dropdown-divider"></div>
          <button class="mljr-dropdown-item">
            <Icon icon="mdi:logout" size={18} />
            Logout
          </button>
        </Dropdown>
      {/snippet}
    </Navbar>
  </section>

  <!-- Transparent Variant -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Transparent Variant</h3>
    <div class="mljr-relative mljr-bg-gradient-primary mljr-rounded-lg mljr-overflow-hidden">
      <Navbar variant="transparent">
        {#snippet logo()}
          <span class="mljr-text-xl mljr-font-bold mljr-text-white">Brand</span>
        {/snippet}

        {#snippet nav()}
          <a href="." class="mljr-px-3 mljr-py-2 mljr-rounded-lg mljr-text-white hover:mljr-bg-white/20 mljr-transition-colors">
            Home
          </a>
          <a href="." class="mljr-px-3 mljr-py-2 mljr-rounded-lg mljr-text-white hover:mljr-bg-white/20 mljr-transition-colors">
            Features
          </a>
          <a href="." class="mljr-px-3 mljr-py-2 mljr-rounded-lg mljr-text-white hover:mljr-bg-white/20 mljr-transition-colors">
            Pricing
          </a>
        {/snippet}

        {#snippet actions()}
          <Button variant="ghost" size="sm" class="mljr-text-white hover:mljr-bg-white/20">
            Sign In
          </Button>
        {/snippet}
      </Navbar>
      <div class="mljr-p-12 mljr-text-center mljr-text-white">
        <h2 class="mljr-text-3xl mljr-font-bold mljr-mb-2">Hero Section</h2>
        <p class="mljr-text-white/80">Content goes here</p>
      </div>
    </div>
  </section>

  <!-- Mobile Responsive Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Mobile Responsive</h3>
    <Navbar>
      {#snippet logo()}
        <span class="mljr-text-xl mljr-font-bold">Responsive</span>
      {/snippet}

      {#snippet nav()}
        <div class="mljr-hidden mljr-md:flex mljr-items-center mljr-gap-4">
          <a href="." class="mljr-nav-link">Home</a>
          <a href="." class="mljr-nav-link">About</a>
          <a href="." class="mljr-nav-link">Services</a>
          <a href="." class="mljr-nav-link">Contact</a>
        </div>
      {/snippet}

      {#snippet actions()}
        <div class="mljr-hidden mljr-md:flex mljr-items-center mljr-gap-2">
          <Button variant="outline-primary" size="sm">Sign In</Button>
          <Button variant="primary" size="sm">Get Started</Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          class="mljr-md:hidden"
          onclick={() => mobileMenuOpen = !mobileMenuOpen}
        >
          <Icon icon={mobileMenuOpen ? 'mdi:close' : 'mdi:menu'} size={24} />
        </Button>
      {/snippet}
    </Navbar>

    {#if mobileMenuOpen}
      <div class="mljr-p-4 mljr-bg-secondary mljr-rounded-lg mljr-mt-2 mljr-space-y-2">
        <a href="." class="mljr-block mljr-px-4 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-300 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
          Home
        </a>
        <a href="." class="mljr-block mljr-px-4 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-300 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
          About
        </a>
        <a href="." class="mljr-block mljr-px-4 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-300 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
          Services
        </a>
        <a href="." class="mljr-block mljr-px-4 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-300 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
          Contact
        </a>
        <div class="mljr-pt-2 mljr-space-y-2">
          <Button variant="outline-primary" size="sm" fullWidth>Sign In</Button>
          <Button variant="primary" size="sm" fullWidth>Get Started</Button>
        </div>
      </div>
    {/if}
  </section>
</div>
