<script lang="ts">
  import { Breadcrumb, type BreadcrumbItem } from '$lib';

  const basicItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Laptops', href: '/products/laptops' },
    { label: 'MacBook Pro' }
  ];

  const withIconsItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: 'mdi:home' },
    { label: 'Documents', href: '/documents', icon: 'mdi:folder' },
    { label: 'Projects', href: '/documents/projects', icon: 'mdi:folder-open' },
    { label: 'Website Redesign', icon: 'mdi:file-document' }
  ];

  const longPathItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Web Development', href: '/projects/web' },
    { label: 'E-commerce', href: '/projects/web/ecommerce' },
    { label: 'Shopping Cart', href: '/projects/web/ecommerce/cart' },
    { label: 'Checkout Process', href: '/projects/web/ecommerce/cart/checkout' },
    { label: 'Payment Integration' }
  ];
</script>

<div class="mljr-space-y-8">
  <!-- Basic Breadcrumb -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Breadcrumb</h3>
    <Breadcrumb items={basicItems} />
  </section>

  <!-- With Icons -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Icons</h3>
    <Breadcrumb items={withIconsItems} />
  </section>

  <!-- With Truncation -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Truncation (Max 4 Items)</h3>
    <Breadcrumb items={longPathItems} maxItems={4} />
    <p class="mljr-text-xs mljr-text-muted mljr-mt-2">
      Long paths are automatically truncated with an ellipsis.
    </p>
  </section>

  <!-- Different Max Items -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Different Truncation Levels</h3>
    <div class="mljr-space-y-3">
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-1">Max 2 items:</p>
        <Breadcrumb items={longPathItems} maxItems={2} />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-1">Max 3 items:</p>
        <Breadcrumb items={longPathItems} maxItems={3} />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-1">Max 5 items:</p>
        <Breadcrumb items={longPathItems} maxItems={5} />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-1">Show all:</p>
        <Breadcrumb items={longPathItems} />
      </div>
    </div>
  </section>

  <!-- Short Paths -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Short Paths</h3>
    <div class="mljr-space-y-3">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'About' }
        ]}
      />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/', icon: 'mdi:home' },
          { label: 'Settings', href: '/settings', icon: 'mdi:cog' },
          { label: 'Profile', icon: 'mdi:account' }
        ]}
      />
    </div>
  </section>

  <!-- Custom Separators (using CSS) -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Navigation Examples</h3>
    <div class="mljr-space-y-4">
      <div class="mljr-p-4 mljr-bg-secondary mljr-rounded-lg">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/', icon: 'mdi:view-dashboard' },
            { label: 'Users', href: '/users', icon: 'mdi:account-group' },
            { label: 'John Doe', icon: 'mdi:account' }
          ]}
        />
      </div>

      <div class="mljr-p-4 mljr-bg-secondary mljr-rounded-lg">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Categories', href: '/categories' },
            { label: 'Electronics', href: '/categories/electronics' },
            { label: 'Computers', href: '/categories/electronics/computers' },
            { label: 'Laptops' }
          ]}
        />
      </div>
    </div>
  </section>

  <!-- File System Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">File System Navigation</h3>
    <Breadcrumb
      items={[
        { label: 'Root', href: '/', icon: 'mdi:harddisk' },
        { label: 'Users', href: '/users', icon: 'mdi:folder' },
        { label: 'Documents', href: '/users/documents', icon: 'mdi:folder' },
        { label: 'Projects', href: '/users/documents/projects', icon: 'mdi:folder-open' },
        { label: 'README.md', icon: 'mdi:file-document' }
      ]}
    />
  </section>

  <!-- E-commerce Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">E-commerce Navigation</h3>
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Men', href: '/men' },
        { label: 'Clothing', href: '/men/clothing' },
        { label: 'Shirts', href: '/men/clothing/shirts' },
        { label: 'Casual Shirts' }
      ]}
    />
  </section>

  <!-- Blog Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Blog Navigation</h3>
    <Breadcrumb
      items={[
        { label: 'Blog', href: '/blog', icon: 'mdi:post' },
        { label: 'Technology', href: '/blog/technology' },
        { label: 'Web Development', href: '/blog/technology/web-dev' },
        { label: 'Getting Started with Svelte 5' }
      ]}
    />
  </section>
</div>
