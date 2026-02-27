<script lang="ts">
  import FormsSection from '../../sections/FormsSection.svelte';
  import TextareaSection from '../../sections/TextareaSection.svelte';
  import RadioSection from '../../sections/RadioSection.svelte';
  import CheckboxGroupSection from '../../sections/CheckboxGroupSection.svelte';
  import RadioGroupSection from '../../sections/RadioGroupSection.svelte';
  import FileUploadSection from '../../sections/FileUploadSection.svelte';
  import AdvancedInputsSection from '../../sections/AdvancedInputsSection.svelte';
  import TimePickerSection from '../../sections/TimePickerSection.svelte';
  import PinInputSection from '../../sections/PinInputSection.svelte';
  import NewInputsSection from '../../sections/NewInputsSection.svelte';
  import ChipInputSection from '../../sections/ChipInputSection.svelte';
  import AutoCompleteSection from '../../sections/AutoCompleteSection.svelte';
  import ApiDoc from '../../ApiDoc.svelte';
  import * as m from '$lib/paraglide/messages';

  const inputProps = [
    { name: 'value', type: 'string', default: "''", description: 'Bindable input value.' },
    { name: 'label', type: 'string', default: "''", description: 'Label displayed above the input.' },
    { name: 'helperText', type: 'string', default: "''", description: 'Helper text shown below the input.' },
    { name: 'errorText', type: 'string', default: "''", description: 'Error message shown when error=true.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size.' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Applies error styling and shows errorText.' },
    { name: 'success', type: 'boolean', default: 'false', description: 'Applies success styling.' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Marks the label with a required indicator.' },
    { name: 'id', type: 'string', default: 'auto', description: 'Input element id. Auto-generated if not provided.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes on the input element.' },
    { name: '...restProps', type: 'HTMLInputAttributes', default: '—', description: 'All standard input attributes (type, placeholder, disabled, maxlength, etc.).' },
  ];

  const inputExample = `<script>
  import { Input } from '$lib';
  let email = $state('');
<\/script>

<!-- Basic -->
<Input bind:value={email} label="Email" type="email" placeholder="you@example.com" />

<!-- With helper / error -->
<Input
  bind:value={email}
  label="Email"
  error={!email.includes('@')}
  errorText="Please enter a valid email"
  helperText="We'll never share your email"
/>

<!-- Sizes -->
<Input label="Small" size="sm" />
<Input label="Large" size="lg" />`;
</script>

<svelte:head>
  <title>Forms - MLJR CSS</title>
</svelte:head>

<div class="docs-content">
  <div class="docs-sections">
    <section id="forms" class="docs-section">
      <h2 class="docs-section-title">{m.section_forms()}</h2>
      <div class="docs-section-body">
        <ApiDoc
          description="A clay-styled text input with label, helper text, error states, and three sizes. Supports all standard HTML input attributes via prop spreading."
          props={inputProps}
          example={inputExample}
          exampleTitle="💻 Input Usage"
        />
      </div>
      <div class="docs-section-body" style="margin-top: var(--mljr-space-6);">
        <FormsSection />
      </div>
    </section>

    <section id="textarea" class="docs-section">
      <h2 class="docs-section-title">{m.section_textarea()}</h2>
      <div class="docs-section-body"><TextareaSection /></div>
    </section>

    <section id="radio" class="docs-section">
      <h2 class="docs-section-title">{m.section_radio()}</h2>
      <div class="docs-section-body"><RadioSection /></div>
    </section>

    <section id="checkbox-group" class="docs-section">
      <h2 class="docs-section-title">Checkbox Group</h2>
      <div class="docs-section-body"><CheckboxGroupSection /></div>
    </section>

    <section id="radio-group" class="docs-section">
      <h2 class="docs-section-title">Radio Group</h2>
      <div class="docs-section-body"><RadioGroupSection /></div>
    </section>

    <section id="file-upload" class="docs-section">
      <h2 class="docs-section-title">{m.section_file_upload()}</h2>
      <div class="docs-section-body"><FileUploadSection /></div>
    </section>

    <section id="advanced-inputs" class="docs-section">
      <h2 class="docs-section-title">{m.section_advanced_inputs()}</h2>
      <div class="docs-section-body"><AdvancedInputsSection /></div>
    </section>

    <section id="time-picker" class="docs-section">
      <h2 class="docs-section-title">Time Picker</h2>
      <div class="docs-section-body"><TimePickerSection /></div>
    </section>

    <section id="pin-input" class="docs-section">
      <h2 class="docs-section-title">PIN Input</h2>
      <div class="docs-section-body"><PinInputSection /></div>
    </section>

    <section id="new-inputs" class="docs-section">
      <h2 class="docs-section-title">{m.section_new_inputs()}</h2>
      <div class="docs-section-body"><NewInputsSection /></div>
    </section>

    <section id="chip-input" class="docs-section">
      <h2 class="docs-section-title">Chip Input (Tag Input)</h2>
      <div class="docs-section-body"><ChipInputSection /></div>
    </section>

    <section id="autocomplete" class="docs-section">
      <h2 class="docs-section-title">AutoComplete</h2>
      <div class="docs-section-body"><AutoCompleteSection /></div>
    </section>
  </div>
</div>
