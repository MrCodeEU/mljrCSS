<script lang="ts">
  import { Button, Card, Tooltip, Progress, Skeleton, Avatar, Divider, Pagination, Spinner, Toast, toastStore, Popover, Table, Badge, CodeExample } from '$lib';

  let progressValue = $state(65);
  let currentPage = $state(2);

  // Table data
  const tableData = [
    { id: 1, name: 'Connor RK800', status: 'Active', role: 'Detective' },
    { id: 2, name: 'Kara AX400', status: 'Away', role: 'Caretaker' },
    { id: 3, name: 'Markus RK200', status: 'Leader', role: 'Revolutionary' },
    { id: 4, name: 'North WR400', status: 'Active', role: 'Activist' },
  ];

  type TableRow = typeof tableData[number];

  const tableColumns: Array<{
    key: keyof TableRow;
    label: string;
    sortable?: boolean;
    width?: string;
  }> = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'Status' },
    { key: 'role', label: 'Role', sortable: true },
  ];

  let selectedRows = $state<TableRow[]>([]);
</script>

<section id="display-components" class="mljr-mb-8">
  <h2 class="mljr-h2 mljr-mb-4">Display & Feedback</h2>
  <p class="mljr-text-secondary mljr-mb-6">Visual feedback, loading states, and display components with Claymorphism styling.</p>

  <!-- Tooltip & Progress Row -->
  <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6 mljr-mb-6">
    <!-- Tooltip -->
    <Card title="Tooltip" description="Soft rounded hover hints with clay shadows">
      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Positions</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-4 mljr-items-center">
          <Tooltip content="Tooltip on top" position="top">
            <Button variant="outline-primary">Top</Button>
          </Tooltip>
          <Tooltip content="Tooltip on bottom" position="bottom">
            <Button variant="outline-primary">Bottom</Button>
          </Tooltip>
          <Tooltip content="Tooltip on left" position="left">
            <Button variant="outline-primary">Left</Button>
          </Tooltip>
          <Tooltip content="Tooltip on right" position="right">
            <Button variant="outline-primary">Right</Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">With Delay</h4>
        <Tooltip content="Appears after 500ms" position="bottom" delay={500}>
          <Button variant="ghost">Hover and wait...</Button>
        </Tooltip>
      </div>
    </Card>

    <!-- Progress -->
    <Card title="Progress" description="Soft rounded progress bars with gradient fills">
      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Color Variants</h4>
        <div class="mljr-flex mljr-flex-col mljr-gap-4">
          <Progress value={progressValue} />
          <Progress value={45} variant="secondary" />
          <Progress value={80} variant="success" />
          <Progress value={60} variant="success" />
        </div>
      </div>

      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">With Label & Indeterminate</h4>
        <div class="mljr-flex mljr-flex-col mljr-gap-4">
          <Progress value={progressValue} showLabel size="lg" />
          <Progress indeterminate size="lg" />
        </div>
      </div>
    </Card>
  </div>

  <!-- Skeleton & Avatar Row -->
  <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6 mljr-mb-6">
    <!-- Skeleton -->
    <Card title="Skeleton" description="Soft loading placeholders with shimmer effect">
      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Text Lines</h4>
        <div class="mljr-flex mljr-flex-col mljr-gap-3">
          <Skeleton variant="text" />
          <Skeleton variant="text" width="75%" />
          <Skeleton variant="text" width="50%" />
        </div>
      </div>

      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Avatar (Rounded Square)</h4>
        <div class="mljr-flex mljr-gap-4 mljr-items-center">
          <Skeleton variant="avatar" size="sm" />
          <Skeleton variant="avatar" />
          <Skeleton variant="avatar" size="lg" />
        </div>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Card & Button</h4>
        <div class="mljr-flex mljr-gap-4 mljr-items-start">
          <Skeleton variant="button" />
          <Skeleton variant="card" width="150px" height="80px" />
        </div>
      </div>
    </Card>

    <!-- Avatar -->
    <Card title="Avatar" description="Soft rounded avatars with status indicators">
      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Sizes</h4>
        <div class="mljr-flex mljr-gap-4 mljr-items-center">
          <Avatar size="xs" initials="XS" />
          <Avatar size="sm" initials="SM" />
          <Avatar size="md" initials="MD" />
          <Avatar size="lg" initials="LG" />
          <Avatar size="xl" initials="XL" />
        </div>
      </div>

      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Status Indicators</h4>
        <div class="mljr-flex mljr-gap-4 mljr-items-center">
          <Avatar initials="ON" status="online" />
          <Avatar initials="AW" status="away" variant="secondary" />
          <Avatar initials="BS" status="busy" />
          <Avatar initials="OF" status="offline" />
        </div>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">With Ring</h4>
        <div class="mljr-flex mljr-gap-4 mljr-items-center">
          <Avatar initials="PR" ring />
          <Avatar initials="SC" ring="secondary" variant="secondary" />
        </div>
      </div>
    </Card>
  </div>

  <!-- Divider -->
  <Card title="Divider" description="Soft embossed separators with 3D effect" class="mljr-mb-6">
    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">Default (Embossed)</h4>
      <Divider />
    </div>

    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">With Content</h4>
      <Divider>SECTION</Divider>
      <div class="mljr-mt-4">
        <Divider align="left">START</Divider>
      </div>
    </div>

    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">Color Variants</h4>
      <div class="mljr-flex mljr-flex-col mljr-gap-4">
        <Divider>PRIMARY</Divider>
        <Divider variant="secondary">SECONDARY</Divider>
        <Divider variant="primary">PRIMARY</Divider>
      </div>
    </div>

    <div>
      <h4 class="mljr-h5 mljr-mb-3">Vertical</h4>
      <div class="mljr-flex mljr-items-center mljr-gap-4" style="height: 80px;">
        <span>Item 1</span>
        <Divider orientation="vertical" />
        <span>Item 2</span>
        <Divider orientation="vertical" variant="secondary" />
        <span>Item 3</span>
      </div>
    </div>
  </Card>

  <!-- Table -->
  <Card title="Table" description="Clean data tables with soft styling" class="mljr-mb-6">
    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">Interactive Table with Selection</h4>
      <Table
        data={tableData}
        columns={tableColumns}
        selectable
        bind:selectedRows
      />
      {#if selectedRows.length > 0}
        <p class="mljr-text-sm mljr-text-muted mljr-mt-2">Selected: {selectedRows.map(r => r.name).join(', ')}</p>
      {/if}
    </div>

    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">Striped Variant</h4>
      <Table
        data={tableData}
        columns={tableColumns}
        variant="striped"
      />
    </div>

    <div>
      <h4 class="mljr-h5 mljr-mb-3">Compact Variant</h4>
      <Table
        data={tableData}
        columns={tableColumns}
        variant="compact"
      />
    </div>
  </Card>

  <!-- Pagination & Spinner Row -->
  <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6 mljr-mb-6">
    <!-- Pagination -->
    <Card title="Pagination" description="Soft rounded page navigation">
      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Interactive Pagination</h4>
        <Pagination bind:currentPage totalPages={10} siblingCount={1} />
        <p class="mljr-text-sm mljr-text-muted mljr-mt-2">Current page: {currentPage}</p>
      </div>

      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Size Variants</h4>
        <div class="mljr-flex mljr-flex-col mljr-gap-4">
          <Pagination currentPage={3} totalPages={5} size="sm" />
          <Pagination currentPage={3} totalPages={5} size="md" />
          <Pagination currentPage={3} totalPages={5} size="lg" />
        </div>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Secondary Variant</h4>
        <Pagination currentPage={4} totalPages={8} variant="secondary" />
      </div>
    </Card>

    <!-- Spinner -->
    <Card title="Spinner" description="Loading indicators with various styles">
      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Variants</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-6 mljr-items-center">
          <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-2">
            <Spinner variant="ring" />
            <span class="mljr-text-xs mljr-text-muted">Ring</span>
          </div>
          <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-2">
            <Spinner variant="circle" />
            <span class="mljr-text-xs mljr-text-muted">Circle</span>
          </div>
          <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-2">
            <Spinner variant="pulse" />
            <span class="mljr-text-xs mljr-text-muted">Pulse</span>
          </div>
          <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-2">
            <Spinner variant="dots" />
            <span class="mljr-text-xs mljr-text-muted">Dots</span>
          </div>
          <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-2">
            <Spinner variant="bars" />
            <span class="mljr-text-xs mljr-text-muted">Bars</span>
          </div>
          <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-2">
            <Spinner variant="orbit" />
            <span class="mljr-text-xs mljr-text-muted">Orbit</span>
          </div>
        </div>
      </div>

      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Sizes</h4>
        <div class="mljr-flex mljr-items-center mljr-gap-6">
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </div>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">With Label</h4>
        <div class="mljr-flex mljr-gap-8">
          <Spinner variant="ring" label="Loading..." />
          <Spinner variant="dots" label="Please wait" color="secondary" />
        </div>
      </div>
    </Card>
  </div>

  <!-- Toast & Popover Row -->
  <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6">
    <!-- Toast -->
    <Card title="Toast" description="Soft rounded notification toasts">
      <Toast position="top-right" />

      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Click to Show Toast</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
          <Button
            variant="ghost"
            onclick={() => toastStore.info('This is an informational message.', 'Information')}
          >
            Show Info
          </Button>
          <Button
            variant="primary"
            onclick={() => toastStore.success('Operation completed successfully!', 'Success')}
          >
            Show Success
          </Button>
          <Button
            variant="outline-primary"
            onclick={() => toastStore.warning('Please review before continuing.', 'Warning')}
          >
            Show Warning
          </Button>
          <Button
            variant="ghost"
            onclick={() => toastStore.error('Something went wrong. Please try again.', 'Error')}
          >
            Show Error
          </Button>
        </div>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Toast Preview (Static)</h4>
        <div class="mljr-flex mljr-flex-col mljr-gap-3">
          <div class="mljr-toast mljr-toast-info" style="position: relative; animation: none; max-width: 100%;">
            <div class="mljr-toast-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="mljr-toast-content">
              <div class="mljr-toast-title">Information</div>
              <div class="mljr-toast-message">This is an info notification.</div>
            </div>
          </div>
          <div class="mljr-toast mljr-toast-success" style="position: relative; animation: none; max-width: 100%;">
            <div class="mljr-toast-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="mljr-toast-content">
              <div class="mljr-toast-title">Success</div>
              <div class="mljr-toast-message">Operation completed successfully.</div>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <!-- Popover -->
    <Card title="Popover" description="Frosted glass popovers with soft shadows" class="mljr-card-overflow">
      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Hover Triggered</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-4">
          <Popover position="top" title="Top Popover">
            {#snippet content()}
              This popover appears on top with frosted glass effect.
            {/snippet}
            <Button variant="outline-primary">Hover (Top)</Button>
          </Popover>

          <Popover position="bottom" title="Bottom Popover">
            {#snippet content()}
              This popover appears on bottom with frosted glass effect.
            {/snippet}
            <Button variant="outline-primary">Hover (Bottom)</Button>
          </Popover>
        </div>
      </div>

      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Click Triggered with Footer</h4>
        <Popover position="bottom" trigger="click" title="Confirmation" showClose>
          {#snippet content()}
            Are you sure you want to proceed with this action?
          {/snippet}
          {#snippet footer()}
            <Button size="xs" variant="ghost">Cancel</Button>
            <Button size="xs" variant="primary">Confirm</Button>
          {/snippet}
          <Button variant="primary">Click Me</Button>
        </Popover>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Size Variants</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-4">
          <Popover position="bottom" size="sm">
            {#snippet content()}
              Small popover with compact padding.
            {/snippet}
            <Button variant="ghost" size="sm">Small</Button>
          </Popover>
          <Popover position="bottom" size="lg" title="Large Popover">
            {#snippet content()}
              This is a larger popover with more content space. It's great for displaying detailed information or forms.
            {/snippet}
            <Button variant="ghost">Large</Button>
          </Popover>
        </div>
      </div>
    </Card>
  </div>

  <CodeExample code={`// Tooltip
<Tooltip content="Tooltip text" position="top">
  <Button>Hover me</Button>
</Tooltip>

// Progress
<Progress value={65} />
<Progress value={80} variant="success" showLabel />
<Progress indeterminate />

// Skeleton
<Skeleton variant="text" />
<Skeleton variant="avatar" size="md" />
<Skeleton variant="button" />

// Avatar
<Avatar initials="JD" size="md" />
<Avatar initials="AB" status="online" ring />

// Divider
<Divider />
<Divider>Section</Divider>
<Divider orientation="vertical" />

// Pagination
<Pagination bind:currentPage totalPages={10} />

// Spinner
<Spinner variant="ring" />
<Spinner variant="dots" label="Loading..." />

// Toast
<Toast position="top-right" />
<Button onclick={() => toastStore.success('Done!')}>Show Toast</Button>

// Popover
<Popover title="Info" position="bottom">
 {#snippet content()}Popover content{/snippet}
 <Button>Open</Button>
</Popover>

// Table
<Table data={rows} columns={cols} selectable />

// Badge
<Badge>Default</Badge>
<Badge variant="success">Success</Badge>`} />
</section>
