<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';

  type Variant = 'default' | 'striped' | 'bordered' | 'compact';
  type SortDirection = 'asc' | 'desc' | null;

  interface Column<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
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
    class?: string;
    onselect?: (selected: T[]) => void;
    onsort?: (key: keyof T | string, direction: SortDirection) => void;
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
    class: className = '',
    onselect,
    onsort,
  }: Props<T> = $props();

  const variantClasses: Record<Variant, string> = {
    default: '',
    striped: 'mljr-table-striped',
    bordered: 'mljr-table-bordered',
    compact: 'mljr-table-compact',
  };

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
    if (selectedRows.length === data.length) {
      selectedRows = [];
    } else {
      selectedRows = [...data];
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

  let tableClasses = $derived(
    ['mljr-table', variantClasses[variant], responsive ? 'mljr-table-responsive' : '', className]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class="mljr-table-wrapper">
  <table class={tableClasses}>
    <thead class="mljr-table-header">
      <tr>
        {#if selectable}
          <th class="mljr-table-th" style="width: 40px;">
            <input
              type="checkbox"
              checked={selectedRows.length === data.length && data.length > 0}
              onchange={toggleAllSelection}
              aria-label="Select all rows"
            />
          </th>
        {/if}
        {#each columns as column}
          <th
            class={getHeaderClass(column)}
            style={column.width ? `width: ${column.width}` : undefined}
            onclick={() => handleSort(column)}
          >
            {column.label}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="mljr-table-body">
      {#if data.length === 0}
        <tr>
          <td
            class="mljr-table-empty"
            colspan={columns.length + (selectable ? 1 : 0)}
          >
            {emptyMessage}
          </td>
        </tr>
      {:else}
        {#each data as row, index}
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
</div>
