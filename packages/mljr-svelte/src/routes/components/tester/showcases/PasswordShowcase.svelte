<script lang="ts">
  import { Password, Card, Button } from '$lib';

  let basic = $state('');
  let withStrength = $state('');
  let confirm = $state('');
  let newPassword = $state('');
</script>

<div class="mljr-space-y-8">
  <!-- Basic Password -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Password Input</h3>
    <Password bind:value={basic} />
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label</h3>
    <Password label="Password" placeholder="Enter your password" bind:value={basic} />
  </section>

  <!-- With Strength Meter -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Strength Meter</h3>
    <div class="mljr-space-y-2">
      <Password
        label="Create Password"
        placeholder="Choose a strong password"
        showStrength
        bind:value={withStrength}
      />
      <p class="mljr-text-xs mljr-text-muted">
        Try: "password", "Password1", "P@ssw0rd!", "Tr0ub4dor&3"
      </p>
    </div>
  </section>

  <!-- With Requirements -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Requirements Checklist</h3>
    <Password
      label="New Password"
      placeholder="Enter a secure password"
      showStrength
      showRequirements
      bind:value={newPassword}
    />
  </section>

  <!-- States -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">States</h3>
    <div class="mljr-space-y-3">
      <Password
        label="Error State"
        value="weak"
        error={true}
        errorText="Password does not meet requirements"
      />
      <Password
        label="Success State"
        value="Str0ng!Pass#word"
        success={true}
        helperText="Password is strong!"
      />
      <Password
        label="Disabled"
        value="hidden-password"
        disabled
      />
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-space-y-3">
      <Password size="sm" label="Small" placeholder="Small password input" />
      <Password label="Medium (Default)" placeholder="Medium password input" />
      <Password size="lg" label="Large" placeholder="Large password input" />
    </div>
  </section>

  <!-- Change Password Form -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Change Password Form</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Change Password</h4>
      <div class="mljr-space-y-4">
        <Password
          label="Current Password"
          placeholder="Enter current password"
        />
        <Password
          label="New Password"
          placeholder="Choose a strong password"
          showStrength
          showRequirements
          bind:value={newPassword}
        />
        <Password
          label="Confirm New Password"
          placeholder="Confirm new password"
          bind:value={confirm}
          error={!!(confirm && newPassword !== confirm)}
          errorText={confirm && newPassword !== confirm ? 'Passwords do not match' : undefined}
          success={!!(confirm && newPassword === confirm && confirm.length > 0)}
          helperText={confirm && newPassword === confirm && confirm.length > 0 ? 'Passwords match!' : undefined}
        />
        <Button
          variant="primary"
          disabled={!newPassword || newPassword !== confirm}
          block
        >
          Update Password
        </Button>
      </div>
    </Card>
  </section>

  <!-- Sign Up Form -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sign Up Form</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Create Account</h4>
      <div class="mljr-space-y-4">
        <Password
          label="Password"
          placeholder="Create a strong password"
          showStrength
          showRequirements
          required
          bind:value={basic}
        />
        <Password
          label="Confirm Password"
          placeholder="Repeat your password"
          required
          bind:value={confirm}
          error={!!(confirm && basic !== confirm)}
          errorText={confirm && basic !== confirm ? 'Passwords do not match' : undefined}
        />
        <Button variant="primary" block>
          Create Account
        </Button>
      </div>
    </Card>
  </section>
</div>
