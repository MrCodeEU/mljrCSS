<script lang="ts">
  import { Tooltip, Button, Icon } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Basic Tooltip -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Tooltip</h3>
    <Tooltip content="This is a tooltip">
      <Button variant="primary">Hover me</Button>
    </Tooltip>
  </section>

  <!-- Positions -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Positions</h3>
    <div class="mljr-grid mljr-grid-cols-2 mljr-md:grid-cols-4 mljr-gap-4 mljr-p-8">
      <Tooltip content="Top tooltip" position="top">
        <Button variant="outline-primary">Top</Button>
      </Tooltip>

      <Tooltip content="Right tooltip" position="right">
        <Button variant="outline-primary">Right</Button>
      </Tooltip>

      <Tooltip content="Bottom tooltip" position="bottom">
        <Button variant="outline-primary">Bottom</Button>
      </Tooltip>

      <Tooltip content="Left tooltip" position="left">
        <Button variant="outline-primary">Left</Button>
      </Tooltip>
    </div>
  </section>

  <!-- On Different Elements -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">On Different Elements</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-4">
      <Tooltip content="Button tooltip">
        <Button variant="primary">Button</Button>
      </Tooltip>

      <Tooltip content="Icon tooltip">
        <button class="mljr-p-2 mljr-rounded-lg hover:mljr-bg-secondary mljr-transition-colors">
          <Icon icon="mdi:information-outline" size={24} />
        </button>
      </Tooltip>

      <Tooltip content="Text tooltip">
        <span class="mljr-underline mljr-decoration-dotted mljr-cursor-help">
          Hover over this text
        </span>
      </Tooltip>

      <Tooltip content="Badge tooltip">
        <span class="mljr-badge mljr-badge-primary">Badge</span>
      </Tooltip>
    </div>
  </section>

  <!-- Icon Buttons with Tooltips -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Icon Buttons with Tooltips</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
      <Tooltip content="Edit">
        <Button variant="ghost" size="sm">
          <Icon icon="mdi:pencil" size={20} />
        </Button>
      </Tooltip>

      <Tooltip content="Delete">
        <Button variant="ghost" size="sm">
          <Icon icon="mdi:delete" size={20} />
        </Button>
      </Tooltip>

      <Tooltip content="Share">
        <Button variant="ghost" size="sm">
          <Icon icon="mdi:share-variant" size={20} />
        </Button>
      </Tooltip>

      <Tooltip content="Download">
        <Button variant="ghost" size="sm">
          <Icon icon="mdi:download" size={20} />
        </Button>
      </Tooltip>

      <Tooltip content="Settings">
        <Button variant="ghost" size="sm">
          <Icon icon="mdi:cog" size={20} />
        </Button>
      </Tooltip>

      <Tooltip content="More options">
        <Button variant="ghost" size="sm">
          <Icon icon="mdi:dots-vertical" size={20} />
        </Button>
      </Tooltip>
    </div>
  </section>

  <!-- Long Content -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Long Content</h3>
    <Tooltip content="This is a longer tooltip that contains more information. Tooltips automatically wrap text to prevent them from becoming too wide.">
      <Button variant="primary">Hover for long tooltip</Button>
    </Tooltip>
  </section>

  <!-- Disabled Elements -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">On Disabled Elements</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Tooltip content="This button is disabled">
        <span class="mljr-inline-block">
          <Button variant="primary" disabled>
            Disabled Button
          </Button>
        </span>
      </Tooltip>

      <Tooltip content="Feature not available">
        <span class="mljr-inline-block">
          <Button variant="outline-primary" disabled>
            Unavailable
          </Button>
        </span>
      </Tooltip>
    </div>
    <p class="mljr-text-xs mljr-text-muted mljr-mt-2">
      Note: Wrap disabled elements in a span for tooltips to work
    </p>
  </section>

  <!-- Informational Icons -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Informational Icons</h3>
    <div class="mljr-space-y-3">
      <div class="mljr-flex mljr-items-center mljr-gap-2">
        <span>Email notifications</span>
        <Tooltip content="You will receive email alerts for important updates" position="right">
          <Icon icon="mdi:information-outline" size={18} class="mljr-text-muted mljr-cursor-help" />
        </Tooltip>
      </div>

      <div class="mljr-flex mljr-items-center mljr-gap-2">
        <span>Two-factor authentication</span>
        <Tooltip content="Add an extra layer of security to your account" position="right">
          <Icon icon="mdi:shield-check" size={18} class="mljr-text-success-600 mljr-cursor-help" />
        </Tooltip>
      </div>

      <div class="mljr-flex mljr-items-center mljr-gap-2">
        <span>Privacy mode</span>
        <Tooltip content="Your activity will be private and not shared with others" position="right">
          <Icon icon="mdi:eye-off" size={18} class="mljr-text-muted mljr-cursor-help" />
        </Tooltip>
      </div>
    </div>
  </section>

  <!-- Form Labels with Help -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Form Labels with Help</h3>
    <div class="mljr-space-y-4">
      <div>
        <label class="mljr-flex mljr-items-center mljr-gap-2 mljr-mb-2">
          <span>Username</span>
          <Tooltip content="Your username must be unique and contain 3-20 characters" position="right">
            <Icon icon="mdi:help-circle-outline" size={16} class="mljr-text-muted mljr-cursor-help" />
          </Tooltip>
        </label>
        <input type="text" class="mljr-input" placeholder="Enter username" />
      </div>

      <div>
        <label class="mljr-flex mljr-items-center mljr-gap-2 mljr-mb-2">
          <span>Password</span>
          <Tooltip content="Use at least 8 characters with a mix of letters, numbers, and symbols" position="right">
            <Icon icon="mdi:help-circle-outline" size={16} class="mljr-text-muted mljr-cursor-help" />
          </Tooltip>
        </label>
        <input type="password" class="mljr-input" placeholder="Enter password" />
      </div>
    </div>
  </section>

  <!-- Toolbar Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Toolbar Example</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-1 mljr-p-2 mljr-bg-secondary mljr-rounded-lg mljr-inline-flex">
      <Tooltip content="Bold (Ctrl+B)" position="bottom">
        <button class="mljr-p-2 mljr-rounded hover:mljr-bg-gray-300 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
          <Icon icon="mdi:format-bold" size={20} />
        </button>
      </Tooltip>

      <Tooltip content="Italic (Ctrl+I)" position="bottom">
        <button class="mljr-p-2 mljr-rounded hover:mljr-bg-gray-300 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
          <Icon icon="mdi:format-italic" size={20} />
        </button>
      </Tooltip>

      <Tooltip content="Underline (Ctrl+U)" position="bottom">
        <button class="mljr-p-2 mljr-rounded hover:mljr-bg-gray-300 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
          <Icon icon="mdi:format-underline" size={20} />
        </button>
      </Tooltip>

      <div class="mljr-w-px mljr-h-6 mljr-bg-gray-300 dark:mljr-bg-gray-700 mljr-mx-1"></div>

      <Tooltip content="Align Left" position="bottom">
        <button class="mljr-p-2 mljr-rounded hover:mljr-bg-gray-300 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
          <Icon icon="mdi:format-align-left" size={20} />
        </button>
      </Tooltip>

      <Tooltip content="Align Center" position="bottom">
        <button class="mljr-p-2 mljr-rounded hover:mljr-bg-gray-300 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
          <Icon icon="mdi:format-align-center" size={20} />
        </button>
      </Tooltip>

      <Tooltip content="Align Right" position="bottom">
        <button class="mljr-p-2 mljr-rounded hover:mljr-bg-gray-300 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
          <Icon icon="mdi:format-align-right" size={20} />
        </button>
      </Tooltip>
    </div>
  </section>

  <!-- Status Indicators -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Status Indicators</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-4">
      <Tooltip content="All systems operational">
        <div class="mljr-flex mljr-items-center mljr-gap-2">
          <div class="mljr-w-2 mljr-h-2 mljr-bg-success-500 mljr-rounded-full"></div>
          <span>Online</span>
        </div>
      </Tooltip>

      <Tooltip content="Some services may be slow">
        <div class="mljr-flex mljr-items-center mljr-gap-2">
          <div class="mljr-w-2 mljr-h-2 mljr-bg-warning-500 mljr-rounded-full"></div>
          <span>Degraded</span>
        </div>
      </Tooltip>

      <Tooltip content="System maintenance in progress">
        <div class="mljr-flex mljr-items-center mljr-gap-2">
          <div class="mljr-w-2 mljr-h-2 mljr-bg-error-500 mljr-rounded-full"></div>
          <span>Offline</span>
        </div>
      </Tooltip>
    </div>
  </section>
</div>
