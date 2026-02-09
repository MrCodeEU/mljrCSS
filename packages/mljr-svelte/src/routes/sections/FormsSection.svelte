<script lang="ts">
  import { Card, Input, Select, Checkbox, Switch, Password, CodeExample, themeStore } from '$lib';

  let inputValue = $state('');
  let selectValue = $state('');
  let checkboxChecked = $state(false);
  let switchEnabled = $state(true);
  let passwordValue = $state('');
  let passwordStrength = $state(0);
</script>

<section id="forms" class="mljr-mb-8">
  <Card title="Form Components" description="Inputs, selects, checkboxes, and switches">
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <div>
        <h4 class="mljr-h5 mljr-mb-3">Text Inputs</h4>
        <Input
          label="Username"
          placeholder="Enter your username"
          bind:value={inputValue}
          helperText="Choose a unique username"
        />
        <div class="mljr-mt-4">
          <Input
            label="Email"
            type="email"
            placeholder="email@example.com"
            required
          />
        </div>
        <div class="mljr-mt-4">
          <Input
            label="Password (Basic)"
            type="password"
            placeholder="Enter password"
            helperText="Basic password input"
          />
        </div>
        <div class="mljr-mt-4">
          <Password
            label="Password (With Strength)"
            bind:value={passwordValue}
            showStrength
            showCrackTime
            showRequirements
            minStrength={2}
            helperText="Type to see strength meter"
          />
        </div>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Select</h4>
        <Select label="Country" bind:value={selectValue}>
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
          <option value="jp">Japan</option>
        </Select>

        <div class="mljr-mt-6">
          <h4 class="mljr-h5 mljr-mb-3">Checkboxes</h4>
          <div class="mljr-flex mljr-flex-col mljr-gap-2">
            <Checkbox label="Accept terms and conditions" bind:checked={checkboxChecked} />
            <Checkbox label="Subscribe to newsletter" />
            <Checkbox label="Secondary color" secondary checked />
            <Checkbox label="Disabled checkbox" disabled />
          </div>
        </div>

        <div class="mljr-mt-6">
          <h4 class="mljr-h5 mljr-mb-3">Radio Buttons</h4>
          <div class="mljr-radio-group">
            <label class="mljr-radio">
              <input type="radio" name="demo-radio" class="mljr-radio-input" value="option1" checked />
              <span class="mljr-radio-label">Option 1 (Primary)</span>
            </label>
            <label class="mljr-radio">
              <input type="radio" name="demo-radio" class="mljr-radio-input" value="option2" />
              <span class="mljr-radio-label">Option 2</span>
            </label>
            <label class="mljr-radio mljr-radio-secondary">
              <input type="radio" name="demo-radio2" class="mljr-radio-input" value="option3" checked />
              <span class="mljr-radio-label">Secondary Color</span>
            </label>
          </div>
        </div>

        <div class="mljr-mt-6">
          <h4 class="mljr-h5 mljr-mb-3">Switches</h4>
          <div class="mljr-flex mljr-flex-col mljr-gap-2">
            <Switch label="Enable notifications" bind:checked={switchEnabled} />
            <Switch label="Dark mode" checked={themeStore.isDark} onchange={() => themeStore.toggleTheme()} />
            <Switch label="Secondary color" secondary />
            <Switch label="Disabled switch" disabled />
          </div>
        </div>
      </div>
    </div>

    <CodeExample code={`&lt;!-- Input --&gt;
&lt;Input
  label="Username"
  placeholder="Enter your username"
  bind:value={inputValue}
  helperText="Choose a unique username"
/&gt;

&lt;Input
  label="Email"
  type="email"
  placeholder="email@example.com"
  required
/&gt;

&lt;!-- Password with Strength --&gt;
&lt;Password
  label="Password"
  bind:value={passwordValue}
  showStrength
  showCrackTime
  showRequirements
  minStrength={2}
/&gt;

&lt;!-- Select --&gt;
&lt;Select label="Country" bind:value={selectValue}&gt;
  &lt;option value=""&gt;Select a country&lt;/option&gt;
  &lt;option value="us"&gt;United States&lt;/option&gt;
  &lt;option value="uk"&gt;United Kingdom&lt;/option&gt;
&lt;/Select&gt;

&lt;!-- Checkbox --&gt;
&lt;Checkbox label="Accept terms" bind:checked={checkboxChecked} /&gt;
&lt;Checkbox label="Subscribe" secondary checked /&gt;
&lt;Checkbox label="Disabled" disabled /&gt;

&lt;!-- Switch --&gt;
&lt;Switch label="Enable notifications" bind:checked={switchEnabled} /&gt;
&lt;Switch label="Dark mode" secondary /&gt;
&lt;Switch label="Disabled" disabled /&gt;`} />
  </Card>
</section>

