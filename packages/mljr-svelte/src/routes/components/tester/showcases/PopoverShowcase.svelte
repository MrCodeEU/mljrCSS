<script lang="ts">
  import { Popover, Button, Input, Icon } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Basic Popover -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Popover</h3>
    <Popover trigger="click">
      <Button variant="primary">Show Popover</Button>

      {#snippet content()}
        <div class="mljr-p-4">
          <p class="mljr-text-sm">This is a basic popover with some content.</p>
        </div>
      {/snippet}
    </Popover>
  </section>

  <!-- With Header and Content -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Header</h3>
    <Popover trigger="click">
      <Button variant="outline-primary">
        Help
        <Icon icon="mdi:help-circle" size={20} />
      </Button>

      {#snippet content()}
        <div>
          <div class="mljr-px-4 mljr-py-3 mljr-border-b mljr-border-gray-200 dark:mljr-border-gray-700">
            <h4 class="mljr-font-medium">Need Help?</h4>
          </div>
          <div class="mljr-p-4">
            <p class="mljr-text-sm mljr-text-secondary mljr-mb-3">
              Here are some helpful resources to get you started.
            </p>
            <ul class="mljr-space-y-2 mljr-text-sm">
              <li>
                <a href="." class="mljr-text-primary-600 hover:mljr-underline">
                  Documentation
                </a>
              </li>
              <li>
                <a href="." class="mljr-text-primary-600 hover:mljr-underline">
                  Tutorial Videos
                </a>
              </li>
              <li>
                <a href="." class="mljr-text-primary-600 hover:mljr-underline">
                  Community Forum
                </a>
              </li>
            </ul>
          </div>
        </div>
      {/snippet}
    </Popover>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Popover size="sm" trigger="click">
        <Button size="sm" variant="outline-primary">Small</Button>
        {#snippet content()}
          <div class="mljr-p-3">
            <p class="mljr-text-xs">Small popover content</p>
          </div>
        {/snippet}
      </Popover>

      <Popover trigger="click">
        <Button variant="outline-primary">Medium (Default)</Button>
        {#snippet content()}
          <div class="mljr-p-4">
            <p class="mljr-text-sm">Medium popover content</p>
          </div>
        {/snippet}
      </Popover>

      <Popover size="lg" trigger="click">
        <Button size="lg" variant="outline-primary">Large</Button>
        {#snippet content()}
          <div class="mljr-p-4">
            <p class="mljr-text-sm">Large popover content</p>
          </div>
        {/snippet}
      </Popover>
    </div>
  </section>

  <!-- With Form -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Form</h3>
    <Popover trigger="click">
      <Button variant="primary">
        <Icon icon="mdi:plus" size={20} />
        Add Task
      </Button>

      {#snippet content()}
        <div>
          <div class="mljr-px-4 mljr-py-3 mljr-border-b mljr-border-gray-200 dark:mljr-border-gray-700">
            <h4 class="mljr-font-medium">Create New Task</h4>
          </div>
          <div class="mljr-p-4 mljr-space-y-3">
            <Input label="Task Name" placeholder="Enter task name" size="sm" />
            <Input label="Due Date" type="date" size="sm" />
            <div class="mljr-flex mljr-gap-2 mljr-pt-2">
              <Button size="sm" variant="ghost" block>Cancel</Button>
              <Button size="sm" variant="primary" block>Create</Button>
            </div>
          </div>
        </div>
      {/snippet}
    </Popover>
  </section>

  <!-- Information Popover -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Information Popover</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-2">
      <span>Click for more info</span>
      <Popover trigger="click">
        <button class="mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
          <Icon icon="mdi:information-outline" size={20} />
        </button>

        {#snippet content()}
          <div class="mljr-p-3 mljr-max-w-xs">
            <p class="mljr-text-sm mljr-text-secondary">
              This is an information popover. It's useful for providing additional
              context without cluttering the UI.
            </p>
          </div>
        {/snippet}
      </Popover>
    </div>
  </section>

  <!-- Multiple Triggers -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Multiple Popovers</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Popover trigger="click">
        <Button variant="outline-primary">Settings</Button>
        {#snippet content()}
          <div class="mljr-p-4 mljr-space-y-2">
            <label class="mljr-flex mljr-items-center mljr-gap-2 mljr-text-sm">
              <input type="checkbox" class="mljr-checkbox" />
              Enable notifications
            </label>
            <label class="mljr-flex mljr-items-center mljr-gap-2 mljr-text-sm">
              <input type="checkbox" class="mljr-checkbox" checked />
              Auto-save
            </label>
            <label class="mljr-flex mljr-items-center mljr-gap-2 mljr-text-sm">
              <input type="checkbox" class="mljr-checkbox" />
              Dark mode
            </label>
          </div>
        {/snippet}
      </Popover>

      <Popover trigger="click">
        <Button variant="outline-primary">Share</Button>
        {#snippet content()}
          <div class="mljr-p-4">
            <p class="mljr-text-sm mljr-mb-3">Share this content</p>
            <div class="mljr-flex mljr-gap-2">
              <button class="mljr-p-2 mljr-rounded-lg mljr-bg-secondary hover:mljr-bg-gray-300 mljr-transition-colors">
                <Icon icon="mdi:facebook" size={20} />
              </button>
              <button class="mljr-p-2 mljr-rounded-lg mljr-bg-secondary hover:mljr-bg-gray-300 mljr-transition-colors">
                <Icon icon="mdi:twitter" size={20} />
              </button>
              <button class="mljr-p-2 mljr-rounded-lg mljr-bg-secondary hover:mljr-bg-gray-300 mljr-transition-colors">
                <Icon icon="mdi:linkedin" size={20} />
              </button>
              <button class="mljr-p-2 mljr-rounded-lg mljr-bg-secondary hover:mljr-bg-gray-300 mljr-transition-colors">
                <Icon icon="mdi:link-variant" size={20} />
              </button>
            </div>
          </div>
        {/snippet}
      </Popover>

      <Popover trigger="click">
        <Button variant="outline-primary">Filter</Button>
        {#snippet content()}
          <div class="mljr-p-4 mljr-space-y-3">
            <div>
              <span class="mljr-text-sm mljr-font-medium mljr-mb-2 mljr-block">
                Status
              </span>
              <select class="mljr-select mljr-select-sm">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div>
              <span class="mljr-text-sm mljr-font-medium mljr-mb-2 mljr-block">
                Category
              </span>
              <select class="mljr-select mljr-select-sm">
                <option>All Categories</option>
                <option>Work</option>
                <option>Personal</option>
              </select>
            </div>
          </div>
        {/snippet}
      </Popover>
    </div>
  </section>

  <!-- Rich Content -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Rich Content</h3>
    <Popover size="lg" trigger="click">
      <Button variant="primary">
        <Icon icon="mdi:account-circle" size={20} />
        User Profile
      </Button>

      {#snippet content()}
        <div>
          <div class="mljr-p-4 mljr-text-center mljr-bg-gradient-primary">
            <div class="mljr-w-16 mljr-h-16 mljr-mx-auto mljr-bg-white mljr-rounded-full mljr-flex mljr-items-center mljr-justify-center mljr-text-2xl mljr-font-bold mljr-text-primary-600 mljr-mb-2">
              JD
            </div>
            <div class="mljr-font-medium mljr-text-white">John Doe</div>
            <div class="mljr-text-sm mljr-text-white/80">Software Engineer</div>
          </div>
          <div class="mljr-p-4 mljr-space-y-2">
            <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-text-sm">
              <Icon icon="mdi:email" size={16} />
              john.doe@example.com
            </div>
            <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-text-sm">
              <Icon icon="mdi:map-marker" size={16} />
              San Francisco, CA
            </div>
            <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-text-sm">
              <Icon icon="mdi:phone" size={16} />
              +1 (555) 123-4567
            </div>
            <div class="mljr-pt-3">
              <Button size="sm" variant="outline-primary" block>
                View Full Profile
              </Button>
            </div>
          </div>
        </div>
      {/snippet}
    </Popover>
  </section>
</div>
