<script lang="ts">
  import { Drawer, Button, Icon, Input, Textarea } from '$lib';

  let leftOpen = $state(false);
  let rightOpen = $state(false);
  let topOpen = $state(false);
  let bottomOpen = $state(false);
  let withFormOpen = $state(false);
</script>

<div class="mljr-space-y-8">
  <!-- Basic Drawer -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Drawer</h3>
    <Button variant="primary" onclick={() => rightOpen = true}>
      Open Drawer
    </Button>

    <Drawer bind:open={rightOpen}>
      <div class="mljr-p-6">
        <h3 class="mljr-h4 mljr-mb-4">Drawer Title</h3>
        <p class="mljr-text-secondary">
          This is a basic drawer component. It slides in from the right side
          by default and can be dismissed by clicking outside or pressing Escape.
        </p>
      </div>
    </Drawer>
  </section>

  <!-- Positions -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Positions</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Button variant="outline-primary" onclick={() => leftOpen = true}>
        Left
      </Button>
      <Button variant="outline-primary" onclick={() => rightOpen = true}>
        Right
      </Button>
      <Button variant="outline-primary" onclick={() => topOpen = true}>
        Top
      </Button>
      <Button variant="outline-primary" onclick={() => bottomOpen = true}>
        Bottom
      </Button>
    </div>

    <Drawer bind:open={leftOpen} position="left">
      <div class="mljr-p-6">
        <h3 class="mljr-h4 mljr-mb-4">Left Drawer</h3>
        <p class="mljr-text-secondary">Slides in from the left side.</p>
      </div>
    </Drawer>

    <Drawer bind:open={topOpen} position="top">
      <div class="mljr-p-6">
        <h3 class="mljr-h4 mljr-mb-4">Top Drawer</h3>
        <p class="mljr-text-secondary">Slides in from the top.</p>
      </div>
    </Drawer>

    <Drawer bind:open={bottomOpen} position="bottom">
      <div class="mljr-p-6">
        <h3 class="mljr-h4 mljr-mb-4">Bottom Drawer</h3>
        <p class="mljr-text-secondary">Slides in from the bottom.</p>
      </div>
    </Drawer>
  </section>

  <!-- With Form -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Form</h3>
    <Button variant="primary" onclick={() => withFormOpen = true}>
      Add New Item
    </Button>

    <Drawer bind:open={withFormOpen}>
      <div class="mljr-flex mljr-flex-col mljr-h-full">
        <div class="mljr-p-6 mljr-border-b mljr-border-gray-200 dark:mljr-border-gray-700">
          <h3 class="mljr-h4">Add New Item</h3>
        </div>

        <div class="mljr-flex-1 mljr-overflow-y-auto mljr-p-6">
          <div class="mljr-space-y-4">
            <Input label="Title" placeholder="Enter title" required />
            <Textarea
              label="Description"
              placeholder="Enter description"
              rows={5}
            />
            <Input label="Due Date" type="date" />
            <div>
              <span class="mljr-block mljr-mb-2 mljr-text-sm mljr-font-medium">
                Priority
              </span>
              <select class="mljr-select mljr-w-full">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
        </div>

        <div class="mljr-p-6 mljr-border-t mljr-border-gray-200 dark:mljr-border-gray-700 mljr-flex mljr-gap-3">
          <Button variant="ghost" fullWidth onclick={() => withFormOpen = false}>
            Cancel
          </Button>
          <Button variant="primary" fullWidth onclick={() => withFormOpen = false}>
            Save
          </Button>
        </div>
      </div>
    </Drawer>
  </section>

  <!-- Navigation Menu -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Navigation Menu</h3>
    <Button variant="outline-primary" onclick={() => leftOpen = true}>
      <Icon icon="mdi:menu" size={20} />
      Open Menu
    </Button>

    <Drawer bind:open={leftOpen} position="left">
      <div class="mljr-flex mljr-flex-col mljr-h-full">
        <div class="mljr-p-6 mljr-border-b mljr-border-gray-200 dark:mljr-border-gray-700">
          <h3 class="mljr-h4">Navigation</h3>
        </div>

        <div class="mljr-flex-1 mljr-overflow-y-auto mljr-p-4">
          <nav class="mljr-space-y-1">
            <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-4 mljr-py-3 mljr-rounded-lg mljr-bg-primary-100 dark:mljr-bg-primary-900/30 mljr-text-primary-600">
              <Icon icon="mdi:home" size={20} />
              Home
            </a>
            <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-4 mljr-py-3 mljr-rounded-lg hover:mljr-bg-secondary mljr-transition-colors">
              <Icon icon="mdi:folder" size={20} />
              Projects
            </a>
            <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-4 mljr-py-3 mljr-rounded-lg hover:mljr-bg-secondary mljr-transition-colors">
              <Icon icon="mdi:account-group" size={20} />
              Team
            </a>
            <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-4 mljr-py-3 mljr-rounded-lg hover:mljr-bg-secondary mljr-transition-colors">
              <Icon icon="mdi:calendar" size={20} />
              Calendar
            </a>
            <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-4 mljr-py-3 mljr-rounded-lg hover:mljr-bg-secondary mljr-transition-colors">
              <Icon icon="mdi:cog" size={20} />
              Settings
            </a>
          </nav>
        </div>

        <div class="mljr-p-4 mljr-border-t mljr-border-gray-200 dark:mljr-border-gray-700">
          <Button variant="ghost" fullWidth class="mljr-justify-start">
            <Icon icon="mdi:logout" size={20} />
            Logout
          </Button>
        </div>
      </div>
    </Drawer>
  </section>

  <!-- Filter Panel -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Filter Panel</h3>
    <Button variant="outline-primary" onclick={() => rightOpen = true}>
      <Icon icon="mdi:filter" size={20} />
      Filters
    </Button>

    <Drawer bind:open={rightOpen}>
      <div class="mljr-flex mljr-flex-col mljr-h-full">
        <div class="mljr-p-6 mljr-border-b mljr-border-gray-200 dark:mljr-border-gray-700">
          <div class="mljr-flex mljr-items-center mljr-justify-between">
            <h3 class="mljr-h4">Filters</h3>
            <button class="mljr-text-sm mljr-text-primary-600 hover:mljr-underline">
              Clear all
            </button>
          </div>
        </div>

        <div class="mljr-flex-1 mljr-overflow-y-auto mljr-p-6 mljr-space-y-6">
          <div>
            <h4 class="mljr-font-medium mljr-mb-3">Category</h4>
            <div class="mljr-space-y-2">
              <label class="mljr-flex mljr-items-center mljr-gap-2">
                <input type="checkbox" class="mljr-checkbox" checked />
                <span class="mljr-text-sm">Electronics</span>
              </label>
              <label class="mljr-flex mljr-items-center mljr-gap-2">
                <input type="checkbox" class="mljr-checkbox" />
                <span class="mljr-text-sm">Clothing</span>
              </label>
              <label class="mljr-flex mljr-items-center mljr-gap-2">
                <input type="checkbox" class="mljr-checkbox" />
                <span class="mljr-text-sm">Books</span>
              </label>
            </div>
          </div>

          <div>
            <h4 class="mljr-font-medium mljr-mb-3">Price Range</h4>
            <div class="mljr-space-y-3">
              <Input type="number" placeholder="Min" size="sm" />
              <Input type="number" placeholder="Max" size="sm" />
            </div>
          </div>

          <div>
            <h4 class="mljr-font-medium mljr-mb-3">Rating</h4>
            <div class="mljr-space-y-2">
              <label class="mljr-flex mljr-items-center mljr-gap-2">
                <input type="radio" name="rating" class="mljr-radio" />
                <span class="mljr-text-sm">4+ Stars</span>
              </label>
              <label class="mljr-flex mljr-items-center mljr-gap-2">
                <input type="radio" name="rating" class="mljr-radio" />
                <span class="mljr-text-sm">3+ Stars</span>
              </label>
              <label class="mljr-flex mljr-items-center mljr-gap-2">
                <input type="radio" name="rating" class="mljr-radio" />
                <span class="mljr-text-sm">Any Rating</span>
              </label>
            </div>
          </div>
        </div>

        <div class="mljr-p-6 mljr-border-t mljr-border-gray-200 dark:mljr-border-gray-700">
          <Button variant="primary" fullWidth onclick={() => rightOpen = false}>
            Apply Filters
          </Button>
        </div>
      </div>
    </Drawer>
  </section>
</div>
