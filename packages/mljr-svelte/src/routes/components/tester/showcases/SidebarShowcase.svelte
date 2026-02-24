<script lang="ts">
  import { Sidebar, Icon, Badge, Avatar, Button } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Basic Sidebar -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Sidebar</h3>
    <div class="mljr-h-96 mljr-bg-secondary mljr-rounded-lg mljr-overflow-hidden mljr-relative">
      <Sidebar>
        <div class="mljr-p-4 mljr-space-y-2">
          <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg mljr-bg-primary-100 dark:mljr-bg-primary-900/30 mljr-text-primary-600">
            <Icon icon="mdi:home" size={20} />
            <span>Home</span>
          </a>
          <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
            <Icon icon="mdi:folder" size={20} />
            <span>Projects</span>
          </a>
          <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
            <Icon icon="mdi:account-group" size={20} />
            <span>Team</span>
          </a>
          <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
            <Icon icon="mdi:cog" size={20} />
            <span>Settings</span>
          </a>
        </div>
      </Sidebar>
    </div>
  </section>

  <!-- With Badges -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Badges</h3>
    <div class="mljr-h-96 mljr-bg-secondary mljr-rounded-lg mljr-overflow-hidden mljr-relative">
      <Sidebar>
        <div class="mljr-p-4 mljr-space-y-2">
          <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
            <Icon icon="mdi:inbox" size={20} />
            <span class="mljr-flex-1">Inbox</span>
            <Badge variant="primary" size="sm">12</Badge>
          </a>
          <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
            <Icon icon="mdi:email" size={20} />
            <span class="mljr-flex-1">Messages</span>
            <Badge variant="error" size="sm">3</Badge>
          </a>
          <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
            <Icon icon="mdi:bell" size={20} />
            <span class="mljr-flex-1">Notifications</span>
            <Badge variant="warning" size="sm">7</Badge>
          </a>
        </div>
      </Sidebar>
    </div>
  </section>

  <!-- With Sections -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Sections</h3>
    <div class="mljr-h-[500px] mljr-bg-secondary mljr-rounded-lg mljr-overflow-hidden mljr-relative">
      <Sidebar>
        <div class="mljr-p-4 mljr-space-y-6">
          <div>
            <div class="mljr-px-3 mljr-text-xs mljr-font-semibold mljr-text-muted mljr-mb-2">
              NAVIGATION
            </div>
            <div class="mljr-space-y-1">
              <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg mljr-bg-primary-100 dark:mljr-bg-primary-900/30 mljr-text-primary-600">
                <Icon icon="mdi:view-dashboard" size={20} />
                <span>Dashboard</span>
              </a>
              <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
                <Icon icon="mdi:chart-line" size={20} />
                <span>Analytics</span>
              </a>
              <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
                <Icon icon="mdi:folder-multiple" size={20} />
                <span>Projects</span>
              </a>
            </div>
          </div>

          <div>
            <div class="mljr-px-3 mljr-text-xs mljr-font-semibold mljr-text-muted mljr-mb-2">
              ACCOUNT
            </div>
            <div class="mljr-space-y-1">
              <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
                <Icon icon="mdi:account" size={20} />
                <span>Profile</span>
              </a>
              <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
                <Icon icon="mdi:cog" size={20} />
                <span>Settings</span>
              </a>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  </section>

  <!-- With User Profile -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With User Profile</h3>
    <div class="mljr-h-96 mljr-bg-secondary mljr-rounded-lg mljr-overflow-hidden mljr-relative">
      <Sidebar>
        <div class="mljr-flex mljr-flex-col mljr-h-full">
          <div class="mljr-p-4 mljr-border-b mljr-border-gray-200 dark:mljr-border-gray-700">
            <div class="mljr-flex mljr-items-center mljr-gap-3">
              <Avatar initials="JD" />
              <div class="mljr-flex-1 mljr-min-w-0">
                <div class="mljr-font-medium mljr-truncate">John Doe</div>
                <div class="mljr-text-xs mljr-text-muted mljr-truncate">john@example.com</div>
              </div>
            </div>
          </div>

          <div class="mljr-flex-1 mljr-overflow-y-auto mljr-p-4 mljr-space-y-1">
            <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
              <Icon icon="mdi:home" size={20} />
              <span>Home</span>
            </a>
            <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
              <Icon icon="mdi:folder" size={20} />
              <span>Projects</span>
            </a>
            <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
              <Icon icon="mdi:cog" size={20} />
              <span>Settings</span>
            </a>
          </div>

          <div class="mljr-p-4 mljr-border-t mljr-border-gray-200 dark:mljr-border-gray-700">
            <Button variant="ghost" size="sm" fullWidth class="mljr-justify-start">
              <Icon icon="mdi:logout" size={20} />
              Logout
            </Button>
          </div>
        </div>
      </Sidebar>
    </div>
  </section>

  <!-- Collapsible Sections -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Collapsible Sections</h3>
    <p class="mljr-text-sm mljr-text-muted mljr-mb-4">
      Sidebar supports nested navigation and collapsible sections
    </p>
    <div class="mljr-h-96 mljr-bg-secondary mljr-rounded-lg mljr-overflow-hidden mljr-relative">
      <Sidebar>
        <div class="mljr-p-4 mljr-space-y-1">
          <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
            <Icon icon="mdi:home" size={20} />
            <span>Home</span>
          </a>
          <details class="mljr-group">
            <summary class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors mljr-cursor-pointer">
              <Icon icon="mdi:folder" size={20} />
              <span class="mljr-flex-1">Projects</span>
              <Icon icon="mdi:chevron-down" size={16} class="group-open:mljr-rotate-180 mljr-transition-transform" />
            </summary>
            <div class="mljr-ml-6 mljr-mt-1 mljr-space-y-1">
              <a href="." class="mljr-flex mljr-items-center mljr-gap-2 mljr-px-3 mljr-py-2 mljr-rounded-lg mljr-text-sm hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
                Project A
              </a>
              <a href="." class="mljr-flex mljr-items-center mljr-gap-2 mljr-px-3 mljr-py-2 mljr-rounded-lg mljr-text-sm hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
                Project B
              </a>
            </div>
          </details>
          <a href="." class="mljr-flex mljr-items-center mljr-gap-3 mljr-px-3 mljr-py-2 mljr-rounded-lg hover:mljr-bg-gray-200 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
            <Icon icon="mdi:cog" size={20} />
            <span>Settings</span>
          </a>
        </div>
      </Sidebar>
    </div>
  </section>
</div>
