<script lang="ts">
  import { CodeExample } from '$lib';

  interface PropRow {
    name: string;
    type: string;
    default?: string;
    description: string;
  }

  interface EventRow {
    name: string;
    type: string;
    description: string;
  }

  interface SlotRow {
    name: string;
    description: string;
  }

  interface Props {
    description: string;
    props?: PropRow[];
    events?: EventRow[];
    slots?: SlotRow[];
    example?: string;
    exampleTitle?: string;
  }

  let {
    description,
    props = [],
    events = [],
    slots = [],
    example,
    exampleTitle = '💻 Usage Example',
  }: Props = $props();
</script>

<div class="api-doc">
  <p class="api-description">{description}</p>

  {#if props.length > 0}
    <h4 class="api-heading">Props</h4>
    <div class="api-table-wrap">
      <table class="api-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {#each props as row}
            <tr>
              <td><code>{row.name}</code></td>
              <td><code class="type">{row.type}</code></td>
              <td>{row.default ?? '—'}</td>
              <td>{row.description}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  {#if events.length > 0}
    <h4 class="api-heading">Events / Callbacks</h4>
    <div class="api-table-wrap">
      <table class="api-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Signature</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {#each events as row}
            <tr>
              <td><code>{row.name}</code></td>
              <td><code class="type">{row.type}</code></td>
              <td>{row.description}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  {#if slots.length > 0}
    <h4 class="api-heading">Snippet Slots</h4>
    <div class="api-table-wrap">
      <table class="api-table">
        <thead>
          <tr>
            <th>Slot</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {#each slots as row}
            <tr>
              <td><code>{row.name}</code></td>
              <td>{row.description}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  {#if example}
    <CodeExample code={example} title={exampleTitle} />
  {/if}
</div>

<style>
  .api-doc {
    margin-top: var(--mljr-space-4);
  }

  .api-description {
    color: var(--mljr-text-secondary);
    font-size: var(--mljr-text-base);
    line-height: 1.7;
    margin-bottom: var(--mljr-space-5);
  }

  .api-heading {
    font-size: var(--mljr-text-lg);
    font-weight: 600;
    color: var(--mljr-text);
    margin: var(--mljr-space-5) 0 var(--mljr-space-3);
  }

  .api-table-wrap {
    overflow-x: auto;
    border-radius: var(--mljr-radius-lg);
    border: 1px solid var(--mljr-border);
    margin-bottom: var(--mljr-space-4);
  }

  .api-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--mljr-text-sm);
  }

  .api-table th {
    background: var(--mljr-bg-tertiary);
    color: var(--mljr-text-secondary);
    font-weight: 600;
    text-align: left;
    padding: var(--mljr-space-2) var(--mljr-space-4);
    border-bottom: 1px solid var(--mljr-border);
  }

  .api-table td {
    padding: var(--mljr-space-2) var(--mljr-space-4);
    border-bottom: 1px solid var(--mljr-border);
    color: var(--mljr-text);
    vertical-align: top;
  }

  .api-table tr:last-child td {
    border-bottom: none;
  }

  .api-table tr:hover td {
    background: var(--mljr-bg-secondary);
  }

  .api-table code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.875em;
    background: var(--mljr-bg-tertiary);
    padding: 0.1em 0.4em;
    border-radius: 4px;
    color: var(--mljr-primary-600);
  }

  .api-table code.type {
    color: var(--mljr-secondary-600);
  }
</style>
