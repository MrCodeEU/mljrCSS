<script lang="ts">
  import { Switch, Card } from '$lib';

  let basic = $state(false);
  let withLabel = $state(true);
  let withHelper = $state(false);
  let disabled = $state(false);
  let disabledChecked = $state(true);

  let notifications = $state(true);
  let darkMode = $state(false);
  let autoSave = $state(true);
  let marketing = $state(false);

  let wifi = $state(true);
  let bluetooth = $state(false);
  let location = $state(true);
  let airplaneMode = $state(false);
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Switch</h3>
    <div class="mljr-space-y-2">
      <Switch bind:checked={basic} />
      <p class="mljr-text-xs mljr-text-muted">Checked: {basic}</p>
    </div>
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label</h3>
    <div class="mljr-space-y-3">
      <Switch label="Enable notifications" bind:checked={withLabel} />
      <Switch label="Dark mode" />
      <Switch label="Auto-save" />
    </div>
  </section>

  <!-- With Helper Text -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Helper Text</h3>
    <Switch
      label="Marketing emails"
      bind:checked={withHelper}
    />
  </section>

  <!-- States -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">States</h3>
    <div class="mljr-space-y-3">
      <Switch label="Normal off" />
      <Switch label="Normal on" checked />
      <Switch label="Disabled off" disabled bind:checked={disabled} />
      <Switch label="Disabled on" disabled bind:checked={disabledChecked} />
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-space-y-3">
      <Switch label="Small switch" class="mljr-text-sm" />
      <Switch label="Medium switch (default)" />
      <Switch label="Large switch" class="mljr-text-lg" />
    </div>
  </section>

  <!-- Settings Panel Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Settings Panel</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Preferences</h4>
      <div class="mljr-space-y-4">
        <Switch
          label="Push notifications"
          bind:checked={notifications}
        />
        <Switch
          label="Dark mode"
          bind:checked={darkMode}
        />
        <Switch
          label="Auto-save"
          bind:checked={autoSave}
        />
        <Switch
          label="Marketing emails"
          bind:checked={marketing}
        />
      </div>
    </Card>
  </section>

  <!-- Quick Settings Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Quick Settings</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Connectivity</h4>
      <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-4">
        <div class="mljr-flex mljr-items-center mljr-justify-between mljr-p-3 mljr-bg-secondary mljr-rounded-lg">
          <div class="mljr-flex mljr-items-center mljr-gap-3">
            <div class="mljr-text-2xl">📡</div>
            <div>
              <div class="mljr-font-medium">Wi-Fi</div>
              <div class="mljr-text-xs mljr-text-muted">
                {wifi ? 'Connected' : 'Disconnected'}
              </div>
            </div>
          </div>
          <Switch bind:checked={wifi} />
        </div>

        <div class="mljr-flex mljr-items-center mljr-justify-between mljr-p-3 mljr-bg-secondary mljr-rounded-lg">
          <div class="mljr-flex mljr-items-center mljr-gap-3">
            <div class="mljr-text-2xl">🔵</div>
            <div>
              <div class="mljr-font-medium">Bluetooth</div>
              <div class="mljr-text-xs mljr-text-muted">
                {bluetooth ? 'On' : 'Off'}
              </div>
            </div>
          </div>
          <Switch bind:checked={bluetooth} />
        </div>

        <div class="mljr-flex mljr-items-center mljr-justify-between mljr-p-3 mljr-bg-secondary mljr-rounded-lg">
          <div class="mljr-flex mljr-items-center mljr-gap-3">
            <div class="mljr-text-2xl">📍</div>
            <div>
              <div class="mljr-font-medium">Location</div>
              <div class="mljr-text-xs mljr-text-muted">
                {location ? 'Enabled' : 'Disabled'}
              </div>
            </div>
          </div>
          <Switch bind:checked={location} />
        </div>

        <div class="mljr-flex mljr-items-center mljr-justify-between mljr-p-3 mljr-bg-secondary mljr-rounded-lg">
          <div class="mljr-flex mljr-items-center mljr-gap-3">
            <div class="mljr-text-2xl">✈️</div>
            <div>
              <div class="mljr-font-medium">Airplane Mode</div>
              <div class="mljr-text-xs mljr-text-muted">
                {airplaneMode ? 'On' : 'Off'}
              </div>
            </div>
          </div>
          <Switch bind:checked={airplaneMode} />
        </div>
      </div>
    </Card>
  </section>

  <!-- List Style -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">List Style</h3>
    <Card>
      <div class="mljr-divide-y mljr-divide-gray-200 dark:mljr-divide-gray-700 mljr--m-4">
        <div class="mljr-flex mljr-items-center mljr-justify-between mljr-p-4">
          <div>
            <div class="mljr-font-medium">Push Notifications</div>
            <div class="mljr-text-sm mljr-text-muted">
              Receive notifications about your account
            </div>
          </div>
          <Switch bind:checked={notifications} />
        </div>

        <div class="mljr-flex mljr-items-center mljr-justify-between mljr-p-4">
          <div>
            <div class="mljr-font-medium">Auto-save</div>
            <div class="mljr-text-sm mljr-text-muted">
              Save changes automatically as you type
            </div>
          </div>
          <Switch bind:checked={autoSave} />
        </div>

        <div class="mljr-flex mljr-items-center mljr-justify-between mljr-p-4">
          <div>
            <div class="mljr-font-medium">Marketing Emails</div>
            <div class="mljr-text-sm mljr-text-muted">
              Get updates about new features and offers
            </div>
          </div>
          <Switch bind:checked={marketing} />
        </div>
      </div>
    </Card>
  </section>

  <!-- Custom Styling -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Styling</h3>
    <Switch
      label="Custom styled switch"
      class="mljr-text-primary-600"
      checked
    />
  </section>
</div>
