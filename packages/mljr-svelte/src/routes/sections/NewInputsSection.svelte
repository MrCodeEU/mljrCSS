<script lang="ts">
  import { Card, PhoneInput, DatePicker, ColorPicker, EmailInput, CommandPalette, SearchInput, CodeExample } from '$lib';

  let phoneValue = $state('');
  let phoneValid = $state(false);
  let dateValue = $state<Date | null>(null);
  let colorValue = $state('#F97316');
  let emailValue = $state('');
  let searchValue = $state('');
  let paletteOpen = $state(false);
</script>

<section id="new-inputs" class="mljr-mb-8">
  <Card title="Modern Input Components" description="Enhanced inputs with validation and specialized formats">
    <div class="mljr-grid mljr-grid-cols-1 mljr-gap-6">
      <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
        <Card title="Phone Input" description="International phone with country flags">
          <PhoneInput
            bind:value={phoneValue}
            label="Phone Number"
            country="US"
            onchange={(value, valid) => {
              phoneValid = valid;
              console.log('Phone:', value, 'Valid:', valid);
            }}
          />
          <p class="mljr-text-sm mljr-text-muted mljr-mt-4">
            Value: {phoneValue || 'none'} | Valid: {phoneValid ? '✓' : '✗'}
          </p>
        </Card>

        <Card title="Date Picker" description="Date selection with optional time" class="mljr-card-overflow">
          <DatePicker
            bind:value={dateValue}
            label="Select Date"
            format="long"
          />
          <div class="mljr-mt-4">
            <DatePicker
              bind:value={dateValue}
              label="With Time"
              showTime
              format="medium"
            />
          </div>
        </Card>
      </div>

      <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
        <Card title="Color Picker" description="HSL/RGB/Hex color selection" class="mljr-card-overflow">
          <div class="color-preview" style="background-color: {colorValue}"></div>
          <ColorPicker
            bind:value={colorValue}
            label="Choose Color"
            showAlpha
          />
          <p class="mljr-text-sm mljr-text-muted mljr-mt-4">
            Selected: {colorValue}
          </p>
        </Card>

        <Card title="Email Input" description="Email validation with multiple support">
          <EmailInput
            bind:value={emailValue}
            label="Email Address"
            placeholder="your@email.com"
            showValidation
          />
          <div class="mljr-mt-4">
            <EmailInput
              label="Multiple Emails"
              multiple
              placeholder="email1@example.com, email2@example.com"
              showValidation
            />
          </div>
        </Card>
      </div>

      <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
        <Card title="Search Input" description="Search with loading state">
          <SearchInput
            bind:value={searchValue}
            placeholder="Search..."
            onsearch={(v) => console.log('Searching:', v)}
          />
          <div class="mljr-mt-4">
            <SearchInput
              placeholder="Loading example..."
              loading={true}
            />
          </div>
        </Card>

        <Card title="Command Palette" description="Keyboard-driven commands (Cmd+K)">
          <button class="mljr-btn mljr-btn-primary" onclick={() => paletteOpen = true}>
            Open Command Palette
          </button>
          <p class="mljr-text-sm mljr-text-muted mljr-mt-4">
            Press Cmd+K or click the button above
          </p>
        </Card>
      </div>
    </div>

    <CommandPalette
      bind:open={paletteOpen}
      commands={[
        { id: 'copy', label: 'Copy', icon: 'ph:copy', shortcut: '⌘C', action: () => {} },
        { id: 'paste', label: 'Paste', icon: 'ph:clipboard', shortcut: '⌘V', action: () => {} },
        { id: 'cut', label: 'Cut', icon: 'ph:scissors', shortcut: '⌘X', section: 'Edit', action: () => {} },
        { id: 'home', label: 'Go to Home', icon: 'ph:house', shortcut: '⌘H', section: 'Navigation', action: () => {} },
        { id: 'settings', label: 'Settings', icon: 'ph:gear', section: 'Navigation', action: () => {} },
      ]}
    />

    <CodeExample code={`&lt;!-- Email Input --&gt;
&lt;EmailInput
  bind:value={emailValue}
  label="Email Address"
  placeholder="your@email.com"
  showValidation
/&gt;

&lt;!-- Multiple emails --&gt;
&lt;EmailInput
  label="Recipients"
  multiple
  placeholder="email1@example.com, email2@example.com"
/&gt;

&lt;!-- Phone Input --&gt;
&lt;PhoneInput
  bind:value={phoneValue}
  label="Phone Number"
  country="US"
  onchange={(value, valid) => console.log(value, valid)}
/&gt;

&lt;!-- Date Picker --&gt;
&lt;DatePicker
  bind:value={dateValue}
  label="Select Date"
  format="long"
/&gt;

&lt;!-- With time selection --&gt;
&lt;DatePicker
  bind:value={dateValue}
  label="Date & Time"
  showTime
  format="medium"
/&gt;

&lt;!-- Color Picker --&gt;
&lt;ColorPicker
  bind:value={colorValue}
  label="Choose Color"
  showAlpha
/&gt;`} />
  </Card>
</section>
