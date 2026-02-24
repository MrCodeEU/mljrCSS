<script lang="ts">
  import { EmptyState, Button, Icon, Card } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Empty State</h3>
    <EmptyState
      title="No items found"
      description="There are no items to display at the moment."
    />
  </section>

  <!-- With Icon -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Custom Icon</h3>
    <EmptyState
      title="No results"
      description="Try adjusting your search or filters."
      icon="mdi:magnify"
    />
  </section>

  <!-- With Actions Snippet -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Action Buttons</h3>
    <EmptyState
      title="Your inbox is empty"
      description="When you receive messages, they'll appear here."
      icon="mdi:email-outline"
    >
      {#snippet actions()}
        <div class="mljr-flex mljr-gap-3 mljr-justify-center">
          <Button variant="primary">Compose Message</Button>
          <Button variant="outline-primary">Refresh</Button>
        </div>
      {/snippet}
    </EmptyState>
  </section>

  <!-- Variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Variants</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-4">
      <EmptyState
        title="All done!"
        description="No pending tasks remain."
        variant="success"
        bordered
      />
      <EmptyState
        title="Warning"
        description="Some items require attention."
        variant="warning"
        bordered
      />
      <EmptyState
        title="Error loading"
        description="Could not load the requested data."
        variant="error"
        bordered
      />
      <EmptyState
        title="No data yet"
        description="Start adding items to see them here."
        variant="primary"
        bordered
      />
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-space-y-4">
      <EmptyState
        title="Small Empty State"
        description="Compact version."
        size="sm"
        bordered
      />
      <EmptyState
        title="Medium Empty State"
        description="Default size."
        bordered
      />
      <EmptyState
        title="Large Empty State"
        description="More prominent version."
        size="lg"
        bordered
      />
    </div>
  </section>

  <!-- Compact -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Compact Style</h3>
    <EmptyState
      title="No comments"
      description="Be the first to comment."
      compact
      bordered
    />
  </section>

  <!-- Card Style -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Card Style</h3>
    <EmptyState
      title="No projects yet"
      description="Create your first project to get started."
      icon="mdi:folder-plus"
      card
    >
      {#snippet actions()}
        <Button variant="primary" size="sm">
          <Icon icon="mdi:plus" size={16} />
          New Project
        </Button>
      {/snippet}
    </EmptyState>
  </section>

  <!-- Real-world Examples -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Real-world Examples</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <!-- Search No Results -->
      <Card>
        <h4 class="mljr-text-sm mljr-font-medium mljr-text-muted mljr-mb-4">Search Results</h4>
        <EmptyState
          title="No results found"
          description="No matches for your query. Try different keywords."
          icon="mdi:file-search"
          compact
        >
          {#snippet actions()}
            <Button variant="ghost" size="sm">Clear search</Button>
          {/snippet}
        </EmptyState>
      </Card>

      <!-- Shopping Cart -->
      <Card>
        <h4 class="mljr-text-sm mljr-font-medium mljr-text-muted mljr-mb-4">Shopping Cart</h4>
        <EmptyState
          title="Your cart is empty"
          description="Add items to your cart to continue."
          icon="mdi:cart-outline"
          compact
        >
          {#snippet actions()}
            <Button variant="primary" size="sm">Browse Products</Button>
          {/snippet}
        </EmptyState>
      </Card>

      <!-- Notifications -->
      <Card>
        <h4 class="mljr-text-sm mljr-font-medium mljr-text-muted mljr-mb-4">Notifications</h4>
        <EmptyState
          title="All caught up!"
          description="You have no new notifications."
          variant="success"
          compact
        />
      </Card>

      <!-- Error State -->
      <Card>
        <h4 class="mljr-text-sm mljr-font-medium mljr-text-muted mljr-mb-4">Error Loading</h4>
        <EmptyState
          title="Failed to load"
          description="Could not fetch data. Please try again."
          variant="error"
          compact
        >
          {#snippet actions()}
            <Button variant="danger" size="sm">Retry</Button>
          {/snippet}
        </EmptyState>
      </Card>
    </div>
  </section>
</div>
