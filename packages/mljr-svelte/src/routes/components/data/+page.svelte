<script lang="ts">
  import DataSection from '../../sections/DataSection.svelte';
  import TreeViewSection from '../../sections/TreeViewSection.svelte';
  import StepperSection from '../../sections/StepperSection.svelte';
  import DataGraphsSection from '../../sections/DataGraphsSection.svelte';
  import ApiDoc from '../../ApiDoc.svelte';
  import * as m from '$lib/paraglide/messages';

  const cardProps = [
    { name: 'variant', type: "'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'danger' | 'info'", default: "'default'", description: 'Color variant of the card.' },
    { name: 'title', type: 'string', default: "''", description: 'Card title shown in the header.' },
    { name: 'description', type: 'string', default: "''", description: 'Subtitle/description shown below the title.' },
    { name: 'shadow', type: "boolean | 'sm' | 'md' | 'lg'", default: 'false', description: "Clay shadow depth. true uses the default size." },
    { name: 'interactive', type: 'boolean', default: 'false', description: 'Adds hover/press effects and role="button" for clickable cards.' },
    { name: 'compact', type: 'boolean', default: 'false', description: 'Reduces internal padding.' },
    { name: 'onclick', type: '() => void', default: '—', description: 'Click handler (used when interactive=true).' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes.' },
  ];

  const cardSlots = [
    { name: 'header', description: 'Custom header content (replaces title/description).' },
    { name: 'children', description: 'Main card body content.' },
    { name: 'footer', description: 'Footer content rendered after a divider.' },
  ];

  const cardExample = `<script>
  import { Card } from '@mljr/svelte';
<\/script>

<!-- Simple card -->
<Card title="Hello" description="A clay card" shadow>
  <p>Body content goes here.</p>
</Card>

<!-- Interactive card -->
<Card title="Click me" interactive onclick={() => alert('clicked!')}>
  <p>Hover and click me!</p>
</Card>

<!-- Custom header / footer -->
<Card>
  {#snippet header()}<h3>Custom Header</h3>{/snippet}
  <p>Body</p>
  {#snippet footer()}<button>Action</button>{/snippet}
</Card>`;

  const tableProps = [
    { name: 'data', type: 'T[]', default: '—', description: 'Array of row data objects.' },
    { name: 'columns', type: 'Column<T>[]', default: '—', description: 'Column definitions (see Column type below).' },
    { name: 'variant', type: "'default' | 'striped' | 'bordered' | 'compact'", default: "'default'", description: 'Table visual variant.' },
    { name: 'responsive', type: 'boolean', default: 'false', description: 'Wraps table in a scrollable container for small screens.' },
    { name: 'selectable', type: 'boolean', default: 'false', description: 'Adds row checkboxes for multi-selection.' },
    { name: 'selectedRows', type: 'T[]', default: '[]', description: 'Bindable array of selected row objects.' },
    { name: 'filterable', type: 'boolean', default: 'false', description: 'Shows a filter input above the table.' },
    { name: 'filterQuery', type: 'string', default: "''", description: 'Bindable filter query string.' },
    { name: 'filterPlaceholder', type: 'string', default: "'Filter...'", description: 'Placeholder for the filter input.' },
    { name: 'paginate', type: 'boolean', default: 'false', description: 'Enables built-in pagination.' },
    { name: 'pageSize', type: 'number', default: '10', description: 'Rows per page when paginate=true.' },
    { name: 'page', type: 'number', default: '1', description: 'Bindable current page (1-indexed).' },
    { name: 'emptyMessage', type: 'string', default: "'No data available'", description: 'Message shown when data is empty.' },
    { name: 'sortKey', type: 'keyof T | string | null', default: 'null', description: 'Currently sorted column key.' },
    { name: 'sortDirection', type: "'asc' | 'desc' | null", default: 'null', description: 'Current sort direction.' },
  ];

  const tableEvents = [
    { name: 'onselect', type: '(selected: T[]) => void', description: 'Fired when row selection changes.' },
    { name: 'onsort', type: '(key: keyof T | string, direction: SortDirection) => void', description: 'Fired when a sortable column header is clicked.' },
    { name: 'onfilter', type: '(query: string) => void', description: 'Fired when the filter query changes.' },
    { name: 'onpagechange', type: '(page: number) => void', description: 'Fired when the current page changes.' },
  ];

  const tableExample = `<script>
  import { Table } from '@mljr/svelte';

  const data = [
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob',   role: 'User' },
  ];

  const columns = [
    { key: 'id',   label: 'ID',   sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role' },
  ];
<\/script>

<Table {data} {columns} variant="striped" responsive />

<!-- With selection and pagination -->
<Table
  {data}
  {columns}
  selectable
  paginate
  pageSize={5}
/>`;
</script>

<svelte:head>
  <title>Data Display - MLJR CSS</title>
</svelte:head>

<div class="docs-content">
  <div class="docs-sections">
    <section id="data" class="docs-section">
      <h2 class="docs-section-title">{m.section_data_display()}</h2>
      <div class="docs-section-body">
        <ApiDoc
          description="A content container with optional header, body, footer, and 9 color variants. Supports clay shadows, interactive click states, and snippet-based customization."
          props={cardProps}
          slots={cardSlots}
          example={cardExample}
          exampleTitle="💻 Card Usage"
        />
        <div style="margin-top: var(--mljr-space-6);">
          <h4 style="font-size: var(--mljr-text-lg); font-weight: 600; margin-bottom: var(--mljr-space-4);">Table API</h4>
          <ApiDoc
            description="A feature-rich data table with sorting, filtering, pagination, and row selection. Generic over T so TypeScript infers column keys from your data type."
            props={tableProps}
            events={tableEvents}
            example={tableExample}
            exampleTitle="💻 Table Usage"
          />
        </div>
      </div>
      <div class="docs-section-body" style="margin-top: var(--mljr-space-6);">
        <DataSection />
      </div>
    </section>

    <section id="tree-view" class="docs-section">
      <h2 class="docs-section-title">Tree View</h2>
      <div class="docs-section-body"><TreeViewSection /></div>
    </section>

    <section id="stepper" class="docs-section">
      <h2 class="docs-section-title">{m.section_stepper()}</h2>
      <div class="docs-section-body"><StepperSection /></div>
    </section>

    <section id="data-graphs" class="docs-section">
      <h2 class="docs-section-title">Data Graphs</h2>
      <div class="docs-section-body"><DataGraphsSection /></div>
    </section>
  </div>
</div>
