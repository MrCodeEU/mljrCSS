<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';

  type Variant = 'default' | 'striped' | 'bordered' | 'compact';
  type SortDirection = 'asc' | 'desc' | null;

  interface Column<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    filterable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
    resizable?: boolean;
    render?: Snippet<[T, number]>;
  }

  interface Props<T> {
    data: T[];
    columns: Column<T>[];
    variant?: Variant;
    responsive?: boolean;
    selectable?: boolean;
    selectedRows?: T[];
    sortKey?: keyof T | string | null;
    sortDirection?: SortDirection;
    emptyMessage?: string;
    /** Enable global filter input */
    filterable?: boolean;
    /** Filter query (bindable) */
    filterQuery?: string;
    /** Filter placeholder */
    filterPlaceholder?: string;
    /** Enable built-in pagination */
    paginate?: boolean;
    /** Rows per page */
    pageSize?: number;
    /** Current page (bindable, 1-indexed) */
    page?: number;
    class?: string;
    onselect?: (selected: T[]) => void;
    onsort?: (key: keyof T | string, direction: SortDirection) => void;
    onfilter?: (query: string) => void;
    onpagechange?: (page: number) => void;
  }

  let {
    data,
    columns,
    variant = 'default',
    responsive = false,
    selectable = false,
    selectedRows = $bindable([]),
    sortKey = null,
    sortDirection = null,
    emptyMessage = 'No data available',
    filterable = false,
    filterQuery = $bindable(''),
    filterPlaceholder = 'Filter...',
    paginate = false,
    pageSize = 10,
    page = $bindable(1),
    class: className = '',
    onselect,
    onsort,
    onfilter,
    onpagechange,
  }: Props<T> = $props();

  const variantClasses: Record<Variant, string> = {
    default: '',
    striped: 'mljr-table-striped',
    bordered: 'mljr-table-bordered',
    compact: 'mljr-table-compact',
  };

  // Filter data
  const filteredData = $derived(() => {
    if (!filterable || !filterQuery) return data;
    const query = filterQuery.toLowerCase();
    return data.filter(row => {
      return columns.some(col => {
        const val = getCellValue(row, col.key);
        return String(val ?? '').toLowerCase().includes(query);
      });
    });
  });

  // Paginated data
  const totalRows = $derived(filteredData().length);
  const totalPages = $derived(Math.max(1, Math.ceil(totalRows / pageSize)));
  const currentPage = $derived(Math.min(page, totalPages));

  const displayData = $derived(() => {
    const fd = filteredData();
    if (!paginate) return fd;
    const start = (currentPage - 1) * pageSize;
    return fd.slice(start, start + pageSize);
  });

  function handleSort(column: Column<T>) {
    if (!column.sortable) return;

    let newDirection: SortDirection = 'asc';
    if (sortKey === column.key) {
      if (sortDirection === 'asc') newDirection = 'desc';
      else if (sortDirection === 'desc') newDirection = null;
    }

    onsort?.(column.key, newDirection);
  }

  function isSelected(row: T): boolean {
    return selectedRows.includes(row);
  }

  function toggleRowSelection(row: T) {
    if (!selectable) return;

    if (isSelected(row)) {
      selectedRows = selectedRows.filter(r => r !== row);
    } else {
      selectedRows = [...selectedRows, row];
    }
    onselect?.(selectedRows);
  }

  function toggleAllSelection() {
    const rows = displayData();
    if (selectedRows.length === rows.length) {
      selectedRows = [];
    } else {
      selectedRows = [...rows];
    }
    onselect?.(selectedRows);
  }

  function getCellValue(row: T, key: keyof T | string): unknown {
    if (typeof key === 'string' && key.includes('.')) {
      return key.split('.').reduce((obj: any, k) => obj?.[k], row);
    }
    return row[key as keyof T];
  }

  function getHeaderClass(column: Column<T>): string {
    const classes = ['mljr-table-th'];
    if (column.sortable) {
      classes.push('mljr-table-sortable');
      if (sortKey === column.key) {
        classes.push(sortDirection === 'asc' ? 'mljr-table-sort-asc' : 'mljr-table-sort-desc');
      }
    }
    return classes.join(' ');
  }

  function handleFilter(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    filterQuery = val;
    page = 1;
    onfilter?.(val);
  }

  function goToPage(p: number) {
    page = Math.max(1, Math.min(p, totalPages));
    onpagechange?.(page);
  }

  let tableClasses = $derived(
    ['mljr-table', variantClasses[variant], responsive ? 'mljr-table-responsive' : '', className]
      .filter(Boolean)
      .join(' ')
  );

  /* ── Column resizing ── */
  let colWidths: Record<string, number> = $state({});
  let resizingKey: string | null = $state(null);

  function startResize(event: MouseEvent, colKey: string, thEl: HTMLElement) {
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startWidth = thEl.offsetWidth;
    resizingKey = String(colKey);

    function onMouseMove(e: MouseEvent) {
      const delta = e.clientX - startX;
      colWidths = { ...colWidths, [String(colKey)]: Math.max(40, startWidth + delta) };
    }
    function onMouseUp() {
      resizingKey = null;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function getColWidth(col: Column<T>): string | undefined {
    const key = String(col.key);
    if (colWidths[key]) return `${colWidths[key]}px`;
    return col.width;
  }
</script>

<div class="mljr-table-wrapper {resizingKey ? 'mljr-table-resizing' : ''}">
  <!-- Filter input -->
  {#if filterable}
    <div class="mljr-table-filter-bar">
      <input
        type="search"
        class="mljr-input mljr-input-sm"
        placeholder={filterPlaceholder}
        value={filterQuery}
        oninput={handleFilter}
        aria-label={filterPlaceholder}
      />
      {#if filterQuery}
        <span class="mljr-table-filter-count">
          {filteredData().length} of {data.length}
        </span>
      {/if}
    </div>
  {/if}

  <table class={tableClasses}>
    <thead class="mljr-table-header">
      <tr>
        {#if selectable}
          <th class="mljr-table-th" style="width: 40px;">
            <input
              type="checkbox"
              checked={displayData().length > 0 && displayData().every(r => isSelected(r))}
              onchange={toggleAllSelection}
              aria-label="Select all rows"
            />
          </th>
        {/if}
        {#each columns as column}
          <th
            class={getHeaderClass(column)}
            style={getColWidth(column) ? `width: ${getColWidth(column)}` : undefined}
            onclick={() => handleSort(column)}
          >
            {column.label}
            {#if column.resizable}
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div
                class="mljr-table-resize-handle {resizingKey === String(column.key) ? 'mljr-resizing' : ''}"
                onmousedown={(e) => {
                  const th = (e.currentTarget as HTMLElement).closest('th') as HTMLElement;
                  startResize(e, String(column.key), th);
                }}
                onclick={(e) => e.stopPropagation()}
                aria-hidden="true"
              ></div>
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="mljr-table-body">
      {#if displayData().length === 0}
        <tr>
          <td
            class="mljr-table-empty"
            colspan={columns.length + (selectable ? 1 : 0)}
          >
            {filterQuery ? `No results for "${filterQuery}"` : emptyMessage}
          </td>
        </tr>
      {:else}
        {#each displayData() as row, index}
          <tr
            class="mljr-table-row"
            class:mljr-table-selected={isSelected(row)}
            onclick={() => selectable && toggleRowSelection(row)}
          >
            {#if selectable}
              <td class="mljr-table-td">
                <input
                  type="checkbox"
                  checked={isSelected(row)}
                  onchange={() => toggleRowSelection(row)}
                  onclick={(e) => e.stopPropagation()}
                  aria-label="Select row"
                />
              </td>
            {/if}
            {#each columns as column}
              <td
                class="mljr-table-td"
                style={column.align ? `text-align: ${column.align}` : undefined}
                data-label={responsive ? column.label : undefined}
              >
                {#if column.render}
                  {@render column.render(row, index)}
                {:else}
                  {getCellValue(row, column.key)}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>

  <!-- Pagination -->
  {#if paginate && totalPages > 1}
    <div class="mljr-table-pagination">
      <span class="mljr-table-pagination-info">
        Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, totalRows)} of {totalRows}
      </span>
      <div class="mljr-table-pagination-controls">
        <button
          type="button"
          class="mljr-table-pagination-btn"
          onclick={() => goToPage(1)}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
        </button>
        <button
          type="button"
          class="mljr-table-pagination-btn"
          onclick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        {#each Array.from({length: Math.min(5, totalPages)}, (_, i) => {
          const half = Math.floor(Math.min(5, totalPages) / 2);
          let start = Math.max(1, Math.min(currentPage - half, totalPages - Math.min(5, totalPages) + 1));
          return start + i;
        }) as p}
          <button
            type="button"
            class="mljr-table-pagination-btn"
            class:mljr-table-pagination-btn-active={p === currentPage}
            onclick={() => goToPage(p)}
            aria-label="Page {p}"
            aria-current={p === currentPage ? 'page' : undefined}
          >
            {p}
          </button>
        {/each}

        <button
          type="button"
          class="mljr-table-pagination-btn"
          onclick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
        <button
          type="button"
          class="mljr-table-pagination-btn"
          onclick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
        </button>
      </div>
    </div>
  {/if}
</div>
