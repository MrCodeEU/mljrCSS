<script lang="ts">
  import { Timeline, Icon, Badge, Avatar } from '$lib';

  const basicItems = [
    {
      id: '1',
      title: 'Project Started',
      description: 'Initial project setup and configuration',
      timestamp: '2026-01-01'
    },
    {
      id: '2',
      title: 'Design Phase',
      description: 'Created wireframes and mockups',
      timestamp: '2026-01-15'
    },
    {
      id: '3',
      title: 'Development',
      description: 'Built core features and components',
      timestamp: '2026-02-01'
    },
    {
      id: '4',
      title: 'Testing',
      description: 'QA testing and bug fixes',
      timestamp: '2026-02-10'
    }
  ];

  const detailedItems = [
    {
      id: '1',
      title: 'Order Placed',
      description: 'Your order #12345 has been confirmed',
      timestamp: '2026-02-16 10:30 AM',
      icon: 'mdi:cart-check',
      color: 'success'
    },
    {
      id: '2',
      title: 'Payment Received',
      description: 'Payment of $99.00 processed successfully',
      timestamp: '2026-02-16 10:31 AM',
      icon: 'mdi:credit-card',
      color: 'success'
    },
    {
      id: '3',
      title: 'Processing',
      description: 'Order is being prepared for shipment',
      timestamp: '2026-02-16 2:00 PM',
      icon: 'mdi:package-variant',
      color: 'primary'
    },
    {
      id: '4',
      title: 'Shipped',
      description: 'Package has been shipped via FedEx',
      timestamp: 'Expected: 2026-02-18',
      icon: 'mdi:truck-delivery',
      color: 'info'
    }
  ];
</script>

<div class="mljr-space-y-8">
  <!-- Basic Timeline -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Timeline</h3>
    <Timeline items={basicItems} />
  </section>

  <!-- With Icons -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Icons</h3>
    <div class="mljr-timeline">
      {#each detailedItems as item}
        <div class="mljr-timeline-item">
          <div class="mljr-timeline-marker mljr-bg-{item.color}-500">
            <Icon icon={item.icon} size={16} class="mljr-text-white" />
          </div>
          <div class="mljr-timeline-content">
            <div class="mljr-font-medium">{item.title}</div>
            <div class="mljr-text-sm mljr-text-secondary">{item.description}</div>
            <div class="mljr-text-xs mljr-text-muted mljr-mt-1">{item.timestamp}</div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- With Status Badges -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Status Badges</h3>
    <div class="mljr-timeline">
      <div class="mljr-timeline-item">
        <div class="mljr-timeline-marker mljr-bg-success-500"></div>
        <div class="mljr-timeline-content">
          <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-mb-1">
            <span class="mljr-font-medium">Task Completed</span>
            <Badge variant="success" size="sm">Done</Badge>
          </div>
          <div class="mljr-text-sm mljr-text-secondary">All requirements met</div>
          <div class="mljr-text-xs mljr-text-muted mljr-mt-1">2 hours ago</div>
        </div>
      </div>

      <div class="mljr-timeline-item">
        <div class="mljr-timeline-marker mljr-bg-primary-500 mljr-animate-pulse"></div>
        <div class="mljr-timeline-content">
          <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-mb-1">
            <span class="mljr-font-medium">In Progress</span>
            <Badge variant="primary" size="sm">Active</Badge>
          </div>
          <div class="mljr-text-sm mljr-text-secondary">Currently being worked on</div>
          <div class="mljr-text-xs mljr-text-muted mljr-mt-1">Started 30 min ago</div>
        </div>
      </div>

      <div class="mljr-timeline-item">
        <div class="mljr-timeline-marker mljr-bg-gray-300 dark:mljr-bg-gray-700"></div>
        <div class="mljr-timeline-content">
          <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-mb-1">
            <span class="mljr-font-medium mljr-text-muted">Pending</span>
            <Badge variant="secondary" size="sm">Todo</Badge>
          </div>
          <div class="mljr-text-sm mljr-text-muted">Scheduled for later</div>
        </div>
      </div>
    </div>
  </section>

  <!-- With Avatars -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Activity Feed</h3>
    <div class="mljr-timeline">
      <div class="mljr-timeline-item">
        <Avatar initials="JD" size="sm" />
        <div class="mljr-timeline-content">
          <div class="mljr-font-medium">John Doe created a new task</div>
          <div class="mljr-text-sm mljr-text-secondary">
            Added "Implement user authentication" to the backlog
          </div>
          <div class="mljr-text-xs mljr-text-muted mljr-mt-1">10 minutes ago</div>
        </div>
      </div>

      <div class="mljr-timeline-item">
        <Avatar initials="SM" size="sm" />
        <div class="mljr-timeline-content">
          <div class="mljr-font-medium">Sarah Miller commented</div>
          <div class="mljr-text-sm mljr-text-secondary">
            "Great work on the design! Let's review this in the next meeting."
          </div>
          <div class="mljr-text-xs mljr-text-muted mljr-mt-1">1 hour ago</div>
        </div>
      </div>

      <div class="mljr-timeline-item">
        <Avatar initials="BJ" size="sm" />
        <div class="mljr-timeline-content">
          <div class="mljr-font-medium">Bob Johnson merged pull request</div>
          <div class="mljr-text-sm mljr-text-secondary">
            Merged #123 into main branch
          </div>
          <div class="mljr-text-xs mljr-text-muted mljr-mt-1">3 hours ago</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Project Timeline -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Project Timeline</h3>
    <div class="mljr-timeline">
      <div class="mljr-timeline-item">
        <div class="mljr-timeline-marker mljr-bg-success-500">
          <Icon icon="mdi:check" size={16} class="mljr-text-white" />
        </div>
        <div class="mljr-timeline-content">
          <div class="mljr-flex mljr-items-center mljr-justify-between mljr-mb-2">
            <span class="mljr-font-medium">Phase 1: Planning</span>
            <Badge variant="success" size="sm">Completed</Badge>
          </div>
          <ul class="mljr-text-sm mljr-text-secondary mljr-space-y-1 mljr-list-disc mljr-list-inside">
            <li>Requirements gathering</li>
            <li>Stakeholder interviews</li>
            <li>Project scope defined</li>
          </ul>
          <div class="mljr-text-xs mljr-text-muted mljr-mt-2">Completed: Jan 15, 2026</div>
        </div>
      </div>

      <div class="mljr-timeline-item">
        <div class="mljr-timeline-marker mljr-bg-success-500">
          <Icon icon="mdi:check" size={16} class="mljr-text-white" />
        </div>
        <div class="mljr-timeline-content">
          <div class="mljr-flex mljr-items-center mljr-justify-between mljr-mb-2">
            <span class="mljr-font-medium">Phase 2: Design</span>
            <Badge variant="success" size="sm">Completed</Badge>
          </div>
          <ul class="mljr-text-sm mljr-text-secondary mljr-space-y-1 mljr-list-disc mljr-list-inside">
            <li>Wireframes created</li>
            <li>UI/UX design finalized</li>
            <li>Design system established</li>
          </ul>
          <div class="mljr-text-xs mljr-text-muted mljr-mt-2">Completed: Feb 1, 2026</div>
        </div>
      </div>

      <div class="mljr-timeline-item">
        <div class="mljr-timeline-marker mljr-bg-primary-500 mljr-animate-pulse">
          <Icon icon="mdi:code-tags" size={16} class="mljr-text-white" />
        </div>
        <div class="mljr-timeline-content">
          <div class="mljr-flex mljr-items-center mljr-justify-between mljr-mb-2">
            <span class="mljr-font-medium">Phase 3: Development</span>
            <Badge variant="primary" size="sm">In Progress</Badge>
          </div>
          <ul class="mljr-text-sm mljr-text-secondary mljr-space-y-1 mljr-list-disc mljr-list-inside">
            <li>Backend API development ✓</li>
            <li>Frontend implementation (70% complete)</li>
            <li>Database setup ✓</li>
          </ul>
          <div class="mljr-text-xs mljr-text-muted mljr-mt-2">Est. completion: Feb 28, 2026</div>
        </div>
      </div>

      <div class="mljr-timeline-item">
        <div class="mljr-timeline-marker mljr-bg-gray-300 dark:mljr-bg-gray-700">
          <Icon icon="mdi:test-tube" size={16} />
        </div>
        <div class="mljr-timeline-content">
          <div class="mljr-flex mljr-items-center mljr-justify-between mljr-mb-2">
            <span class="mljr-font-medium mljr-text-muted">Phase 4: Testing</span>
            <Badge variant="secondary" size="sm">Pending</Badge>
          </div>
          <ul class="mljr-text-sm mljr-text-muted mljr-space-y-1 mljr-list-disc mljr-list-inside">
            <li>Unit testing</li>
            <li>Integration testing</li>
            <li>User acceptance testing</li>
          </ul>
          <div class="mljr-text-xs mljr-text-muted mljr-mt-2">Scheduled: Mar 1-15, 2026</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Compact Timeline -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Compact Timeline</h3>
    <div class="mljr-timeline">
      <div class="mljr-timeline-item">
        <div class="mljr-timeline-marker mljr-bg-primary-500 mljr-w-2 mljr-h-2"></div>
        <div class="mljr-timeline-content">
          <div class="mljr-flex mljr-items-center mljr-justify-between">
            <span class="mljr-text-sm">Email sent to team</span>
            <span class="mljr-text-xs mljr-text-muted">9:00 AM</span>
          </div>
        </div>
      </div>
      <div class="mljr-timeline-item">
        <div class="mljr-timeline-marker mljr-bg-primary-500 mljr-w-2 mljr-h-2"></div>
        <div class="mljr-timeline-content">
          <div class="mljr-flex mljr-items-center mljr-justify-between">
            <span class="mljr-text-sm">Meeting scheduled</span>
            <span class="mljr-text-xs mljr-text-muted">10:30 AM</span>
          </div>
        </div>
      </div>
      <div class="mljr-timeline-item">
        <div class="mljr-timeline-marker mljr-bg-primary-500 mljr-w-2 mljr-h-2"></div>
        <div class="mljr-timeline-content">
          <div class="mljr-flex mljr-items-center mljr-justify-between">
            <span class="mljr-text-sm">Code review completed</span>
            <span class="mljr-text-xs mljr-text-muted">2:15 PM</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
