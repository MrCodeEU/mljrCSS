<script lang="ts">
  import { Badge, Button, Icon, Avatar, Table } from '$lib';

  let sortColumn = $state<string | null>(null);
  let sortDirection = $state<'asc' | 'desc'>('asc');

  // Data for Table component demos
  const tableData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: ['Alice Johnson', 'Bob Smith', 'Carol Williams', 'David Brown', 'Eve Davis',
           'Frank Miller', 'Grace Wilson', 'Henry Moore', 'Iris Taylor', 'Jack Anderson'][i % 10],
    role: ['Admin', 'User', 'Editor', 'Viewer', 'Moderator'][i % 5],
    status: i % 3 === 0 ? 'Inactive' : 'Active',
    joined: `2025-${String((i % 12) + 1).padStart(2, '0')}-15`,
  }));

  const tableColumns = [
    { key: 'id', label: 'ID', width: '60px', align: 'center' as const },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status' },
    { key: 'joined', label: 'Joined' },
  ];

  let filterQuery = $state('');
  let page = $state(1);
  let selectedRows = $state<typeof tableData>([]);

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active' }
  ];

  function handleSort(column: string) {
    if (sortColumn === column) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn = column;
      sortDirection = 'asc';
    }
  }
</script>

<div class="mljr-space-y-8">
  <!-- Basic Table -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Table</h3>
    <div class="mljr-overflow-x-auto">
      <table class="mljr-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>Admin</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>jane@example.com</td>
            <td>User</td>
          </tr>
          <tr>
            <td>Bob Johnson</td>
            <td>bob@example.com</td>
            <td>Editor</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- Striped Table -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Striped Table</h3>
    <div class="mljr-overflow-x-auto">
      <table class="mljr-table mljr-table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Laptop</td>
            <td>$999</td>
            <td>15</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Mouse</td>
            <td>$29</td>
            <td>50</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Keyboard</td>
            <td>$79</td>
            <td>32</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Monitor</td>
            <td>$399</td>
            <td>8</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- Bordered Table -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Bordered Table</h3>
    <div class="mljr-overflow-x-auto">
      <table class="mljr-table mljr-table-bordered">
        <thead>
          <tr>
            <th>Country</th>
            <th>Capital</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>United States</td>
            <td>Washington D.C.</td>
            <td>331 million</td>
          </tr>
          <tr>
            <td>Japan</td>
            <td>Tokyo</td>
            <td>126 million</td>
          </tr>
          <tr>
            <td>Germany</td>
            <td>Berlin</td>
            <td>83 million</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- Compact Table -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Compact Table</h3>
    <div class="mljr-overflow-x-auto">
      <table class="mljr-table mljr-table-compact">
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2026-02-15</td>
            <td>Team Meeting</td>
            <td>Conference Room A</td>
          </tr>
          <tr>
            <td>2026-02-16</td>
            <td>Product Launch</td>
            <td>Main Auditorium</td>
          </tr>
          <tr>
            <td>2026-02-17</td>
            <td>Client Presentation</td>
            <td>Office 301</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- With Status Badges -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Status Badges</h3>
    <div class="mljr-overflow-x-auto">
      <table class="mljr-table mljr-table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {#each users as user}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Badge
                  variant={user.status === 'Active' ? 'success' : 'error'}
                  size="sm"
                >
                  {user.status}
                </Badge>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- With Actions -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Actions</h3>
    <div class="mljr-overflow-x-auto">
      <table class="mljr-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each users.slice(0, 3) as user}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <div class="mljr-flex mljr-gap-1">
                  <Button variant="ghost" size="sm">
                    <Icon icon="mdi:pencil" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon icon="mdi:delete" size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- With Avatars -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Avatars</h3>
    <div class="mljr-overflow-x-auto">
      <table class="mljr-table mljr-table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="mljr-flex mljr-items-center mljr-gap-3">
                <Avatar initials="JD" size="sm" />
                <span>John Doe</span>
              </div>
            </td>
            <td>john@example.com</td>
            <td>Engineering</td>
            <td><Badge variant="success" size="sm">Active</Badge></td>
          </tr>
          <tr>
            <td>
              <div class="mljr-flex mljr-items-center mljr-gap-3">
                <Avatar initials="JS" size="sm" />
                <span>Jane Smith</span>
              </div>
            </td>
            <td>jane@example.com</td>
            <td>Design</td>
            <td><Badge variant="success" size="sm">Active</Badge></td>
          </tr>
          <tr>
            <td>
              <div class="mljr-flex mljr-items-center mljr-gap-3">
                <Avatar initials="BJ" size="sm" />
                <span>Bob Johnson</span>
              </div>
            </td>
            <td>bob@example.com</td>
            <td>Marketing</td>
            <td><Badge variant="warning" size="sm">Away</Badge></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- Sortable Table -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sortable Table</h3>
    <div class="mljr-overflow-x-auto">
      <table class="mljr-table">
        <thead>
          <tr>
            <th class="mljr-cursor-pointer mljr-select-none" onclick={() => handleSort('name')}>
              <div class="mljr-flex mljr-items-center mljr-gap-2">
                Name
                {#if sortColumn === 'name'}
                  <Icon
                    icon={sortDirection === 'asc' ? 'mdi:arrow-up' : 'mdi:arrow-down'}
                    size={16}
                  />
                {/if}
              </div>
            </th>
            <th class="mljr-cursor-pointer mljr-select-none" onclick={() => handleSort('email')}>
              <div class="mljr-flex mljr-items-center mljr-gap-2">
                Email
                {#if sortColumn === 'email'}
                  <Icon
                    icon={sortDirection === 'asc' ? 'mdi:arrow-up' : 'mdi:arrow-down'}
                    size={16}
                  />
                {/if}
              </div>
            </th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {#each users.slice(0, 4) as user}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- Responsive Table -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Responsive Table</h3>
    <div class="mljr-overflow-x-auto">
      <table class="mljr-table mljr-table-responsive">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Supplier</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>MacBook Pro</td>
            <td>Laptops</td>
            <td>$2,499</td>
            <td>12</td>
            <td>Apple Inc.</td>
            <td>2026-02-15</td>
          </tr>
          <tr>
            <td>iPhone 15 Pro</td>
            <td>Phones</td>
            <td>$999</td>
            <td>45</td>
            <td>Apple Inc.</td>
            <td>2026-02-14</td>
          </tr>
          <tr>
            <td>AirPods Pro</td>
            <td>Audio</td>
            <td>$249</td>
            <td>78</td>
            <td>Apple Inc.</td>
            <td>2026-02-13</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- Empty State -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Empty State</h3>
    <div class="mljr-overflow-x-auto">
      <table class="mljr-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3" class="mljr-text-center mljr-py-8">
              <div class="mljr-text-muted">
                <Icon icon="mdi:database-off" size={48} class="mljr-mx-auto mljr-mb-2 mljr-opacity-50" />
                <p>No data available</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- Table Component: Filterable -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Table Component — Filterable</h3>
    <Table
      data={tableData}
      columns={tableColumns}
      filterable={true}
      bind:filterQuery
      filterPlaceholder="Search users..."
      variant="striped"
    />
    <p class="mljr-text-sm mljr-text-muted mljr-mt-2">
      Filter: "{filterQuery}" — showing {tableData.filter(r =>
        !filterQuery || Object.values(r).some(v => String(v).toLowerCase().includes(filterQuery.toLowerCase()))
      ).length} of {tableData.length}
    </p>
  </section>

  <!-- Table Component: Paginated -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Table Component — Paginated (10 per page)</h3>
    <Table
      data={tableData}
      columns={tableColumns}
      paginate={true}
      pageSize={10}
      bind:page
      variant="bordered"
    />
    <p class="mljr-text-sm mljr-text-muted mljr-mt-2">Current page: {page}</p>
  </section>

  <!-- Table Component: Filterable + Paginated + Selectable -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Table Component — Filterable + Paginated + Selectable</h3>
    <Table
      data={tableData}
      columns={tableColumns}
      filterable={true}
      filterPlaceholder="Search..."
      paginate={true}
      pageSize={8}
      selectable={true}
      bind:selectedRows
      onselect={(rows) => selectedRows = rows}
    />
    <p class="mljr-text-sm mljr-text-muted mljr-mt-2">
      Selected: {selectedRows.length} row(s)
    </p>
  </section>
</div>
