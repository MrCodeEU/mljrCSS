<script lang="ts">
  import { Avatar, AvatarGroup, Badge, type AvatarData } from '$lib';

  const users: AvatarData[] = [
    { initials: 'JD', alt: 'John Doe' },
    { initials: 'SM', alt: 'Sarah Miller' },
    { initials: 'AW', alt: 'Alex Wilson' },
    { initials: 'LB', alt: 'Lisa Brown' },
    { initials: 'MJ', alt: 'Michael Johnson' },
    { initials: 'EW', alt: 'Emily White' }
  ];
</script>

<div class="mljr-space-y-8">
  <!-- Shapes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Shapes</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-items-center mljr-gap-4">
      <div class="mljr-text-center">
        <Avatar initials="JD" shape="square" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Square (Default)</p>
      </div>
      <div class="mljr-text-center">
        <Avatar initials="JD" shape="circle" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Circle</p>
      </div>
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-items-center mljr-gap-4">
      <div class="mljr-text-center">
        <Avatar initials="JD" size="xs" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">XS</p>
      </div>
      <div class="mljr-text-center">
        <Avatar initials="JD" size="sm" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Small</p>
      </div>
      <div class="mljr-text-center">
        <Avatar initials="JD" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Medium</p>
      </div>
      <div class="mljr-text-center">
        <Avatar initials="JD" size="lg" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Large</p>
      </div>
      <div class="mljr-text-center">
        <Avatar initials="JD" size="xl" />
        <p class="mljr-text-xs mljr-text-muted mljr-mt-2">XL</p>
      </div>
    </div>
  </section>

  <!-- With Initials -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Initials</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Avatar initials="JD" />
      <Avatar initials="SM" />
      <Avatar initials="AW" />
      <Avatar initials="LB" />
      <Avatar initials="MJ" />
    </div>
  </section>

  <!-- With Image URL -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Image</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        alt="User 1"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
        alt="User 2"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
        alt="User 3"
      />
    </div>
  </section>

  <!-- With Status Badge -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Status Indicator</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-4">
      <div class="mljr-relative mljr-inline-block">
        <Avatar initials="JD" size="lg" />
        <Badge
          variant="success"
          dot
          class="mljr-absolute mljr-bottom-0 mljr-right-0"
        ></Badge>
      </div>
      <div class="mljr-relative mljr-inline-block">
        <Avatar initials="SM" size="lg" />
        <Badge
          variant="warning"
          dot
          class="mljr-absolute mljr-bottom-0 mljr-right-0"
        ></Badge>
      </div>
      <div class="mljr-relative mljr-inline-block">
        <Avatar initials="AW" size="lg" />
        <Badge
          variant="error"
          dot
          class="mljr-absolute mljr-bottom-0 mljr-right-0"
        ></Badge>
      </div>
      <div class="mljr-relative mljr-inline-block">
        <Avatar initials="LB" size="lg" />
        <Badge
          variant="info"
          dot
          class="mljr-absolute mljr-bottom-0 mljr-right-0"
        ></Badge>
      </div>
    </div>
  </section>

  <!-- Avatar Group -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Avatar Group</h3>
    <div class="mljr-space-y-4">
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Default (max 3)</p>
        <AvatarGroup avatars={users} max={3} />
      </div>

      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Show all</p>
        <AvatarGroup avatars={users} />
      </div>

      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Max 5</p>
        <AvatarGroup avatars={users} max={5} />
      </div>

      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Small size</p>
        <AvatarGroup avatars={users} max={4} size="sm" />
      </div>

      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Large size</p>
        <AvatarGroup avatars={users} max={4} size="lg" />
      </div>
    </div>
  </section>

  <!-- User Profile Examples -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">In User Profile</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-4">
      <div class="mljr-flex mljr-items-center mljr-gap-3 mljr-p-4 mljr-bg-secondary mljr-rounded-lg">
        <Avatar initials="JD" size="lg" />
        <div>
          <div class="mljr-font-medium">John Doe</div>
          <div class="mljr-text-sm mljr-text-muted">john.doe@example.com</div>
        </div>
      </div>

      <div class="mljr-flex mljr-items-center mljr-gap-3 mljr-p-4 mljr-bg-secondary mljr-rounded-lg">
        <div class="mljr-relative">
          <Avatar initials="SM" size="lg" shape="circle" />
          <Badge
            variant="success"
            dot
            class="mljr-absolute mljr-bottom-0 mljr-right-0"
          ></Badge>
        </div>
        <div>
          <div class="mljr-font-medium">Sarah Miller</div>
          <div class="mljr-text-sm mljr-text-success-600">Online</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Comment Thread Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">In Comments</h3>
    <div class="mljr-space-y-4">
      <div class="mljr-flex mljr-gap-3">
        <Avatar initials="JD" size="sm" />
        <div class="mljr-flex-1">
          <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-mb-1">
            <span class="mljr-font-medium mljr-text-sm">John Doe</span>
            <span class="mljr-text-xs mljr-text-muted">2 hours ago</span>
          </div>
          <p class="mljr-text-sm mljr-text-secondary">
            This looks great! Really nice work on the design.
          </p>
        </div>
      </div>

      <div class="mljr-flex mljr-gap-3">
        <Avatar initials="SM" size="sm" shape="circle" />
        <div class="mljr-flex-1">
          <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-mb-1">
            <span class="mljr-font-medium mljr-text-sm">Sarah Miller</span>
            <span class="mljr-text-xs mljr-text-muted">1 hour ago</span>
          </div>
          <p class="mljr-text-sm mljr-text-secondary">
            Thanks! Glad you like it. Let me know if you have any feedback.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Team Members -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Team Members</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-2">
      <AvatarGroup avatars={users.slice(0, 4)} max={3} size="sm" />
      <span class="mljr-text-sm mljr-text-muted">4 team members</span>
    </div>
  </section>
</div>
