<script lang="ts">
  import { Pagination, Card } from '$lib';

  let page1 = $state(1);
  let page2 = $state(5);
  let page3 = $state(1);
  let page4 = $state(1);
  let page5 = $state(1);

  let totalItems1 = $state(250);
  let itemsPerPage1 = $state(10);
</script>

<div class="mljr-space-y-8">
  <!-- Basic Pagination -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Pagination</h3>
    <Pagination
      currentPage={page1}
      totalPages={10}
      onchange={(p) => page1 = p}
    />
    <p class="mljr-text-xs mljr-text-muted mljr-mt-2">
      Current page: {page1}
    </p>
  </section>

  <!-- With Many Pages -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Many Pages</h3>
    <Pagination
      currentPage={page2}
      totalPages={50}
      onchange={(p) => page2 = p}
    />
    <p class="mljr-text-xs mljr-text-muted mljr-mt-2">
      Page {page2} of 50
    </p>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-space-y-3">
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Small:</p>
        <Pagination
          size="sm"
          currentPage={1}
          totalPages={5}
          onchange={() => {}}
        />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Medium (Default):</p>
        <Pagination
          currentPage={1}
          totalPages={5}
          onchange={() => {}}
        />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Large:</p>
        <Pagination
          size="lg"
          currentPage={1}
          totalPages={5}
          onchange={() => {}}
        />
      </div>
    </div>
  </section>

  <!-- Colors -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Colors</h3>
    <div class="mljr-space-y-3">
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Primary (Default):</p>
        <Pagination
          currentPage={3}
          totalPages={10}
          onchange={() => {}}
        />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Secondary:</p>
        <Pagination
          variant="secondary"
          currentPage={3}
          totalPages={10}
          onchange={() => {}}
        />
      </div>
    </div>
  </section>

  <!-- With Jump To Page -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Jump To Page</h3>
    <Pagination
      currentPage={page3}
      totalPages={20}
      showJumpTo
      onchange={(p) => page3 = p}
    />
  </section>

  <!-- With Items Per Page -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Items Per Page Selector</h3>
    <Pagination
      currentPage={page4}
      totalPages={Math.ceil(totalItems1 / itemsPerPage1)}
      showItemsPerPage
      itemsPerPageOptions={[10, 25, 50, 100]}
      onchange={(p) => page4 = p}
      onItemsPerPageChange={(n) => {
        itemsPerPage1 = n;
        page4 = 1;
      }}
    />
    <p class="mljr-text-xs mljr-text-muted mljr-mt-2">
      Showing {(page4 - 1) * itemsPerPage1 + 1} - {Math.min(page4 * itemsPerPage1, totalItems1)} of {totalItems1} items
    </p>
  </section>

  <!-- Full Featured -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Full Featured</h3>
    <Pagination
      currentPage={page5}
      totalPages={Math.ceil(totalItems1 / itemsPerPage1)}
      showJumpTo
      showItemsPerPage
      onchange={(p) => page5 = p}
      onItemsPerPageChange={(n) => {
        itemsPerPage1 = n;
        page5 = 1;
      }}
    />
  </section>

  <!-- In Table Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">In Data Table</h3>
    <Card>
      <div class="mljr--m-4">
        <table class="mljr-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {#each Array(itemsPerPage1) as _, i}
              <tr>
                <td>{(page4 - 1) * itemsPerPage1 + i + 1}</td>
                <td>User {(page4 - 1) * itemsPerPage1 + i + 1}</td>
                <td>user{(page4 - 1) * itemsPerPage1 + i + 1}@example.com</td>
                <td>
                  <span class="mljr-badge mljr-badge-success mljr-badge-sm">
                    Active
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div class="mljr-mt-4 mljr-pt-4 mljr-border-t mljr-border-gray-200 dark:mljr-border-gray-700">
        <Pagination
          currentPage={page4}
          totalPages={Math.ceil(totalItems1 / itemsPerPage1)}
          showItemsPerPage
          onchange={(p) => page4 = p}
          onItemsPerPageChange={(n) => {
            itemsPerPage1 = n;
            page4 = 1;
          }}
        />
      </div>
    </Card>
  </section>

  <!-- Edge Cases -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Edge Cases</h3>
    <div class="mljr-space-y-4">
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Single page:</p>
        <Pagination
          currentPage={1}
          totalPages={1}
          onchange={() => {}}
        />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Two pages:</p>
        <Pagination
          currentPage={1}
          totalPages={2}
          onchange={() => {}}
        />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">First page of many:</p>
        <Pagination
          currentPage={1}
          totalPages={100}
          onchange={() => {}}
        />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Last page of many:</p>
        <Pagination
          currentPage={100}
          totalPages={100}
          onchange={() => {}}
        />
      </div>
    </div>
  </section>

  <!-- Compact Style -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Compact Navigation</h3>
    <div class="mljr-space-y-3">
      <Pagination
        size="sm"
        currentPage={5}
        totalPages={20}
        onchange={() => {}}
      />
    </div>
  </section>
</div>
