import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import Table from '../lib/components/Table.svelte';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'age', label: 'Age' },
  { key: 'email', label: 'Email' },
];

const data = [
  { name: 'Alice', age: 30, email: 'alice@example.com' },
  { name: 'Bob', age: 25, email: 'bob@example.com' },
];

describe('Table', () => {
  describe('Rendering', () => {
    it('renders table element', async () => {
      const { container } = render(Table, { data, columns });
      expect(container.querySelector('.mljr-table')).toBeTruthy();
    });

    it('renders column headers', async () => {
      const { container } = render(Table, { data, columns });
      expect(container.textContent).toContain('Name');
      expect(container.textContent).toContain('Age');
      expect(container.textContent).toContain('Email');
    });

    it('renders data rows', async () => {
      const { container } = render(Table, { data, columns });
      expect(container.textContent).toContain('Alice');
      expect(container.textContent).toContain('Bob');
    });

    it('renders correct number of rows', async () => {
      const { container } = render(Table, { data, columns });
      // tbody rows
      const rows = container.querySelectorAll('tbody tr');
      expect(rows.length).toBe(2);
    });

    it('shows empty message when no data', async () => {
      const { container } = render(Table, { data: [], columns, emptyMessage: 'No items found' });
      expect(container.textContent).toContain('No items found');
    });
  });

  describe('Variants', () => {
    it('applies striped variant class', async () => {
      const { container } = render(Table, { data, columns, variant: 'striped' });
      expect(container.querySelector('.mljr-table-striped')).toBeTruthy();
    });

    it('applies bordered variant class', async () => {
      const { container } = render(Table, { data, columns, variant: 'bordered' });
      expect(container.querySelector('.mljr-table-bordered')).toBeTruthy();
    });

    it('applies compact variant class', async () => {
      const { container } = render(Table, { data, columns, variant: 'compact' });
      expect(container.querySelector('.mljr-table-compact')).toBeTruthy();
    });
  });

  describe('Sorting', () => {
    it('renders sortable column header', async () => {
      const { container } = render(Table, { data, columns });
      expect(container.querySelector('.mljr-table-sortable')).toBeTruthy();
    });

    it('calls onsort when sortable column is clicked', async () => {
      const handleSort = vi.fn();
      const { container } = render(Table, { data, columns, onsort: handleSort });
      const sortableHeader = container.querySelector('.mljr-table-sortable') as HTMLElement;
      sortableHeader?.click();
      expect(handleSort).toHaveBeenCalled();
    });
  });

  describe('Selection', () => {
    it('renders checkboxes when selectable=true', async () => {
      const { container } = render(Table, { data, columns, selectable: true });
      expect(container.querySelector('input[type="checkbox"]')).toBeTruthy();
    });
  });

  describe('Filtering', () => {
    it('renders filter bar when filterable=true', async () => {
      const { container } = render(Table, { data, columns, filterable: true });
      expect(container.querySelector('.mljr-table-filter-bar')).toBeTruthy();
    });

    it('does not render filter bar by default', async () => {
      const { container } = render(Table, { data, columns });
      expect(container.querySelector('.mljr-table-filter-bar')).toBeNull();
    });

    it('filters data based on filterQuery', async () => {
      const { container } = render(Table, {
        data,
        columns,
        filterable: true,
        filterQuery: 'alice',
      });
      // Should show Alice but not Bob
      expect(container.textContent).toContain('Alice');
      expect(container.textContent).not.toContain('Bob');
    });

    it('shows count when filterQuery is set', async () => {
      const { container } = render(Table, {
        data,
        columns,
        filterable: true,
        filterQuery: 'alice',
      });
      expect(container.querySelector('.mljr-table-filter-count')).toBeTruthy();
    });
  });

  describe('Pagination', () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      name: `Person ${i + 1}`,
      age: 20 + i,
      email: `person${i + 1}@example.com`,
    }));

    it('renders pagination when paginate=true and data > pageSize', async () => {
      const { container } = render(Table, {
        data: largeData,
        columns,
        paginate: true,
        pageSize: 10,
      });
      expect(container.querySelector('.mljr-table-pagination')).toBeTruthy();
    });

    it('does not render pagination when paginate=false', async () => {
      const { container } = render(Table, { data, columns, paginate: false });
      expect(container.querySelector('.mljr-table-pagination')).toBeNull();
    });

    it('shows only pageSize rows per page', async () => {
      const { container } = render(Table, {
        data: largeData,
        columns,
        paginate: true,
        pageSize: 5,
      });
      const rows = container.querySelectorAll('tbody tr');
      expect(rows.length).toBe(5);
    });

    it('renders pagination info', async () => {
      const { container } = render(Table, {
        data: largeData,
        columns,
        paginate: true,
        pageSize: 10,
      });
      expect(container.querySelector('.mljr-table-pagination-info')).toBeTruthy();
    });
  });
});
