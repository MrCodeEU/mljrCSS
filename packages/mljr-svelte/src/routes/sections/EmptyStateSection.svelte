<script lang="ts">
  import { Card, EmptyState, Button, CodeExample } from '$lib';
</script>

<section id="empty-state" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6">
    <Card title="Basic Empty State" description="Simple centered empty state">
      <EmptyState
        title="No items found"
        description="Get started by creating your first item."
      />
    </Card>

    <Card title="Empty State with Actions" description="With action buttons">
      <EmptyState
        title="Your cart is empty"
        description="Looks like you haven't added anything to your cart yet."
      >
        {#snippet actions()}
          <Button variant="primary">Start Shopping</Button>
          <Button variant="secondary">Browse Catalog</Button>
        {/snippet}
      </EmptyState>
    </Card>

    <Card title="Empty State Variants" description="Different semantic variants">
      <div class="mljr-flex mljr-flex-col mljr-gap-6">
        <EmptyState
          variant="success"
          icon="✓"
          title="All caught up!"
          description="You have no pending notifications."
          size="sm"
        />
        <EmptyState
          variant="warning"
          icon="!"
          title="Attention needed"
          description="Please review your settings."
          size="sm"
        />
        <EmptyState
          variant="error"
          icon="✕"
          title="Something went wrong"
          description="We couldn't load the data. Please try again."
          size="sm"
        />
      </div>
    </Card>

    <Card title="Empty State Sizes" description="Different size options">
      <div class="mljr-flex mljr-flex-col mljr-gap-6">
        <EmptyState
          title="Small Empty State"
          description="This is a small empty state component."
          size="sm"
        />
        <EmptyState
          title="Medium Empty State"
          description="This is a medium (default) empty state component."
        />
      </div>
    </Card>

    <Card title="Compact Empty State" description="Horizontal layout">
      <EmptyState
        title="No search results"
        description="Try adjusting your search terms."
        compact
      >
        {#snippet actions()}
          <Button variant="primary" size="sm">Clear Search</Button>
        {/snippet}
      </EmptyState>
    </Card>

    <Card title="Bordered Empty State" description="With border style">
      <EmptyState
        title="Upload your files"
        description="Drag and drop files here or click to browse."
        variant="primary"
        bordered
      >
        {#snippet actions()}
          <Button variant="primary">Upload Files</Button>
        {/snippet}
      </EmptyState>
    </Card>
  </div>

  <CodeExample code={`<!-- Basic empty state -->
<EmptyState
  title="No items found"
  description="Get started by creating your first item."
/>

<!-- With actions -->
<EmptyState
  title="Your cart is empty"
  description="Looks like you haven't added anything yet."
>
  {#snippet actions()}
    <Button variant="primary">Start Shopping</Button>
    <Button variant="secondary">Browse Catalog</Button>
  {/snippet}
</EmptyState>

<!-- Variants and sizes -->
<EmptyState
  variant="success"
  icon="✓"
  title="All caught up!"
  description="No pending notifications."
  size="sm"
/>

<!-- Compact horizontal layout -->
<EmptyState
  title="No search results"
  description="Try adjusting your search terms."
  compact
  bordered
/>`} />
</section>
