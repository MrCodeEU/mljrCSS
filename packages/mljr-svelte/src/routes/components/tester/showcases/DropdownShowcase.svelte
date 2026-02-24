<script lang="ts">
  import { Dropdown, Button, Icon } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Basic Dropdown -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Dropdown</h3>
    <Dropdown>
      {#snippet trigger()}
        <Button variant="primary">
          Options
          <Icon icon="mdi:chevron-down" size={20} />
        </Button>
      {/snippet}

      <button class="mljr-dropdown-item">Profile</button>
      <button class="mljr-dropdown-item">Settings</button>
      <button class="mljr-dropdown-item">Logout</button>
    </Dropdown>
  </section>

  <!-- With Icons -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Icons</h3>
    <Dropdown>
      {#snippet trigger()}
        <Button variant="outline-primary">
          <Icon icon="mdi:account" size={20} />
          Account
          <Icon icon="mdi:chevron-down" size={20} />
        </Button>
      {/snippet}

      <button class="mljr-dropdown-item">
        <Icon icon="mdi:account-circle" size={18} />
        Profile
      </button>
      <button class="mljr-dropdown-item">
        <Icon icon="mdi:cog" size={18} />
        Settings
      </button>
      <div class="mljr-dropdown-divider"></div>
      <button class="mljr-dropdown-item">
        <Icon icon="mdi:help-circle" size={18} />
        Help
      </button>
      <button class="mljr-dropdown-item mljr-dropdown-item-danger">
        <Icon icon="mdi:logout" size={18} />
        Logout
      </button>
    </Dropdown>
  </section>

  <!-- With Dividers and Headers -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Dividers and Headers</h3>
    <Dropdown>
      {#snippet trigger()}
        <Button variant="primary">Menu</Button>
      {/snippet}

      <div class="mljr-dropdown-header">Account</div>
      <button class="mljr-dropdown-item">Profile</button>
      <button class="mljr-dropdown-item">Settings</button>

      <div class="mljr-dropdown-divider"></div>

      <div class="mljr-dropdown-header">Actions</div>
      <button class="mljr-dropdown-item">Save</button>
      <button class="mljr-dropdown-item">Export</button>

      <div class="mljr-dropdown-divider"></div>

      <button class="mljr-dropdown-item mljr-dropdown-item-danger">Delete</button>
    </Dropdown>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Dropdown>
        {#snippet trigger()}
          <Button variant="outline-primary" size="sm">
            Small
            <Icon icon="mdi:chevron-down" size={16} />
          </Button>
        {/snippet}
        <button class="mljr-dropdown-item">Option 1</button>
        <button class="mljr-dropdown-item">Option 2</button>
        <button class="mljr-dropdown-item">Option 3</button>
      </Dropdown>

      <Dropdown>
        {#snippet trigger()}
          <Button variant="outline-primary">
            Medium (Default)
            <Icon icon="mdi:chevron-down" size={20} />
          </Button>
        {/snippet}
        <button class="mljr-dropdown-item">Option 1</button>
        <button class="mljr-dropdown-item">Option 2</button>
        <button class="mljr-dropdown-item">Option 3</button>
      </Dropdown>

      <Dropdown>
        {#snippet trigger()}
          <Button variant="outline-primary" size="lg">
            Large
            <Icon icon="mdi:chevron-down" size={24} />
          </Button>
        {/snippet}
        <button class="mljr-dropdown-item">Option 1</button>
        <button class="mljr-dropdown-item">Option 2</button>
        <button class="mljr-dropdown-item">Option 3</button>
      </Dropdown>
    </div>
  </section>

  <!-- Item States -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Item States</h3>
    <Dropdown>
      {#snippet trigger()}
        <Button variant="primary">States</Button>
      {/snippet}

      <button class="mljr-dropdown-item">Normal item</button>
      <button class="mljr-dropdown-item mljr-dropdown-item-active">Active item</button>
      <button class="mljr-dropdown-item" disabled>Disabled item</button>
      <div class="mljr-dropdown-divider"></div>
      <button class="mljr-dropdown-item mljr-dropdown-item-danger">Danger item</button>
    </Dropdown>
  </section>

  <!-- Icon Button Trigger -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Icon Button Trigger</h3>
    <Dropdown>
      {#snippet trigger()}
        <Button variant="ghost">
          <Icon icon="mdi:dots-vertical" size={20} />
        </Button>
      {/snippet}

      <button class="mljr-dropdown-item">
        <Icon icon="mdi:pencil" size={18} />
        Edit
      </button>
      <button class="mljr-dropdown-item">
        <Icon icon="mdi:content-copy" size={18} />
        Duplicate
      </button>
      <button class="mljr-dropdown-item">
        <Icon icon="mdi:share-variant" size={18} />
        Share
      </button>
      <div class="mljr-dropdown-divider"></div>
      <button class="mljr-dropdown-item mljr-dropdown-item-danger">
        <Icon icon="mdi:delete" size={18} />
        Delete
      </button>
    </Dropdown>
  </section>

  <!-- Multiple Dropdowns -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Multiple Dropdowns</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Dropdown>
        {#snippet trigger()}
          <Button variant="outline-primary">File</Button>
        {/snippet}
        <button class="mljr-dropdown-item">
          <Icon icon="mdi:file-plus" size={18} />
          New
        </button>
        <button class="mljr-dropdown-item">
          <Icon icon="mdi:folder-open" size={18} />
          Open
        </button>
        <button class="mljr-dropdown-item">
          <Icon icon="mdi:content-save" size={18} />
          Save
        </button>
      </Dropdown>

      <Dropdown>
        {#snippet trigger()}
          <Button variant="outline-primary">Edit</Button>
        {/snippet}
        <button class="mljr-dropdown-item">
          <Icon icon="mdi:undo" size={18} />
          Undo
        </button>
        <button class="mljr-dropdown-item">
          <Icon icon="mdi:redo" size={18} />
          Redo
        </button>
        <div class="mljr-dropdown-divider"></div>
        <button class="mljr-dropdown-item">
          <Icon icon="mdi:content-cut" size={18} />
          Cut
        </button>
        <button class="mljr-dropdown-item">
          <Icon icon="mdi:content-copy" size={18} />
          Copy
        </button>
        <button class="mljr-dropdown-item">
          <Icon icon="mdi:content-paste" size={18} />
          Paste
        </button>
      </Dropdown>

      <Dropdown>
        {#snippet trigger()}
          <Button variant="outline-primary">View</Button>
        {/snippet}
        <button class="mljr-dropdown-item">
          <Icon icon="mdi:grid" size={18} />
          Grid View
        </button>
        <button class="mljr-dropdown-item">
          <Icon icon="mdi:view-list" size={18} />
          List View
        </button>
        <button class="mljr-dropdown-item">
          <Icon icon="mdi:view-compact" size={18} />
          Compact View
        </button>
      </Dropdown>
    </div>
  </section>

  <!-- Custom Content -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Content</h3>
    <Dropdown>
      {#snippet trigger()}
        <Button variant="primary">
          User Menu
          <Icon icon="mdi:chevron-down" size={20} />
        </Button>
      {/snippet}

      <div class="mljr-p-3 mljr-border-b mljr-border-gray-200 dark:mljr-border-gray-700">
        <div class="mljr-font-medium">John Doe</div>
        <div class="mljr-text-sm mljr-text-muted">john.doe@example.com</div>
      </div>

      <button class="mljr-dropdown-item">
        <Icon icon="mdi:account-circle" size={18} />
        Profile
      </button>
      <button class="mljr-dropdown-item">
        <Icon icon="mdi:cog" size={18} />
        Settings
      </button>
      <button class="mljr-dropdown-item">
        <Icon icon="mdi:credit-card" size={18} />
        Billing
      </button>

      <div class="mljr-dropdown-divider"></div>

      <button class="mljr-dropdown-item">
        <Icon icon="mdi:logout" size={18} />
        Sign out
      </button>
    </Dropdown>
  </section>
</div>
