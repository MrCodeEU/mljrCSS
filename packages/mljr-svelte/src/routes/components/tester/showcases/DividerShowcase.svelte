<script lang="ts">
  import { Divider, Card } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Basic Horizontal -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Horizontal Divider</h3>
    <div>
      <p class="mljr-text-secondary">Content above the divider</p>
      <Divider />
      <p class="mljr-text-secondary">Content below the divider</p>
    </div>
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label</h3>
    <div class="mljr-space-y-4">
      <Divider>OR</Divider>
      <Divider>Section Break</Divider>
      <Divider>Continue Reading</Divider>
    </div>
  </section>

  <!-- Label Positions -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Label Positions</h3>
    <div class="mljr-space-y-4">
      <Divider align="left">Left Aligned</Divider>
      <Divider align="center">Center Aligned</Divider>
      <Divider align="right">Right Aligned</Divider>
    </div>
  </section>

  <!-- Vertical Divider -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Vertical Divider</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-4">
      <button class="mljr-btn mljr-btn-ghost mljr-btn-sm">Edit</button>
      <Divider orientation="vertical" class="mljr-h-6" />
      <button class="mljr-btn mljr-btn-ghost mljr-btn-sm">Share</button>
      <Divider orientation="vertical" class="mljr-h-6" />
      <button class="mljr-btn mljr-btn-ghost mljr-btn-sm">Delete</button>
    </div>
  </section>

  <!-- In Card -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">In Card</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-2">Card Header</h4>
      <p class="mljr-text-secondary mljr-text-sm">
        Some introductory text in the card header.
      </p>

      <Divider class="mljr-my-4" />

      <div class="mljr-space-y-2">
        <div class="mljr-flex mljr-justify-between">
          <span>Subtotal:</span>
          <span>$99.00</span>
        </div>
        <div class="mljr-flex mljr-justify-between">
          <span>Tax:</span>
          <span>$9.90</span>
        </div>

        <Divider class="mljr-my-2" />

        <div class="mljr-flex mljr-justify-between mljr-font-medium">
          <span>Total:</span>
          <span>$108.90</span>
        </div>
      </div>
    </Card>
  </section>

  <!-- Section Separators -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Section Separators</h3>
    <div>
      <div class="mljr-mb-4">
        <h4 class="mljr-h5 mljr-mb-2">Personal Information</h4>
        <p class="mljr-text-secondary mljr-text-sm">
          Update your personal details here.
        </p>
      </div>

      <Divider>Account Settings</Divider>

      <div class="mljr-my-4">
        <h4 class="mljr-h5 mljr-mb-2">Account Settings</h4>
        <p class="mljr-text-secondary mljr-text-sm">
          Manage your account preferences.
        </p>
      </div>

      <Divider>Security</Divider>

      <div class="mljr-mt-4">
        <h4 class="mljr-h5 mljr-mb-2">Security</h4>
        <p class="mljr-text-secondary mljr-text-sm">
          Configure security and privacy settings.
        </p>
      </div>
    </div>
  </section>

  <!-- List Items -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">List Items</h3>
    <Card>
      <div class="mljr--m-4">
        <div class="mljr-p-4">
          <div class="mljr-flex mljr-items-center mljr-justify-between">
            <div>
              <div class="mljr-font-medium">Item 1</div>
              <div class="mljr-text-sm mljr-text-muted">Description for item 1</div>
            </div>
            <button class="mljr-btn mljr-btn-ghost mljr-btn-sm">View</button>
          </div>
        </div>

        <Divider />

        <div class="mljr-p-4">
          <div class="mljr-flex mljr-items-center mljr-justify-between">
            <div>
              <div class="mljr-font-medium">Item 2</div>
              <div class="mljr-text-sm mljr-text-muted">Description for item 2</div>
            </div>
            <button class="mljr-btn mljr-btn-ghost mljr-btn-sm">View</button>
          </div>
        </div>

        <Divider />

        <div class="mljr-p-4">
          <div class="mljr-flex mljr-items-center mljr-justify-between">
            <div>
              <div class="mljr-font-medium">Item 3</div>
              <div class="mljr-text-sm mljr-text-muted">Description for item 3</div>
            </div>
            <button class="mljr-btn mljr-btn-ghost mljr-btn-sm">View</button>
          </div>
        </div>
      </div>
    </Card>
  </section>

  <!-- Navigation Menu -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Navigation Menu</h3>
    <div class="mljr-flex mljr-items-center mljr-gap-1">
      <a href="." class="mljr-px-4 mljr-py-2 mljr-rounded-lg hover:mljr-bg-secondary mljr-transition-colors">
        Home
      </a>
      <Divider orientation="vertical" class="mljr-h-6" />
      <a href="." class="mljr-px-4 mljr-py-2 mljr-rounded-lg hover:mljr-bg-secondary mljr-transition-colors">
        About
      </a>
      <Divider orientation="vertical" class="mljr-h-6" />
      <a href="." class="mljr-px-4 mljr-py-2 mljr-rounded-lg hover:mljr-bg-secondary mljr-transition-colors">
        Services
      </a>
      <Divider orientation="vertical" class="mljr-h-6" />
      <a href="." class="mljr-px-4 mljr-py-2 mljr-rounded-lg hover:mljr-bg-secondary mljr-transition-colors">
        Contact
      </a>
    </div>
  </section>

  <!-- Footer Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Footer Content</h3>
    <Card>
      <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-3 mljr-gap-6">
        <div>
          <h5 class="mljr-font-medium mljr-mb-3">Company</h5>
          <div class="mljr-space-y-2 mljr-text-sm mljr-text-secondary">
            <div>About Us</div>
            <div>Careers</div>
            <div>Contact</div>
          </div>
        </div>
        <div>
          <h5 class="mljr-font-medium mljr-mb-3">Resources</h5>
          <div class="mljr-space-y-2 mljr-text-sm mljr-text-secondary">
            <div>Documentation</div>
            <div>Help Center</div>
            <div>Community</div>
          </div>
        </div>
        <div>
          <h5 class="mljr-font-medium mljr-mb-3">Legal</h5>
          <div class="mljr-space-y-2 mljr-text-sm mljr-text-secondary">
            <div>Privacy Policy</div>
            <div>Terms of Service</div>
            <div>Cookie Policy</div>
          </div>
        </div>
      </div>

      <Divider class="mljr-my-6" />

      <div class="mljr-text-center mljr-text-sm mljr-text-muted">
        &copy; 2026 Company Name. All rights reserved.
      </div>
    </Card>
  </section>
</div>
