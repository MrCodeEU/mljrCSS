<script lang="ts">
  import { Card, Tabs, Accordion, CodeExample } from '$lib';

  const tabItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
  ];

  const accordionItems = [
    {
      id: '1',
      title: 'What is MLJR CSS?',
      content: 'MLJR CSS is a TailwindCSS-based CSS framework with a beautiful orange/purple color scheme that works seamlessly in both light and dark modes.'
    },
    {
      id: '2',
      title: 'How do I install it?',
      content: 'Simply run `pnpm add mljr-css mljr-svelte` to install both the CSS framework and Svelte components.'
    },
    {
      id: '3',
      title: 'Is it compatible with Svelte 5?',
      content: 'Yes! The component library is built specifically for Svelte 5 using the new runes API ($props, $state, $derived, etc.).'
    },
  ];

</script>

<section id="data" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6">
    <!-- Tabs -->
    <Card title="Tabs" description="Tabbed navigation and content">
      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Default</h4>
        <Tabs tabs={tabItems}>
          {#snippet children(props: { activeTab: string })}
    {@const activeTab = props.activeTab}
            {#if activeTab === 'overview'}
              <p>This is the overview content. It provides a general introduction to the topic.</p>
            {:else if activeTab === 'features'}
              <p>Here you can find all the amazing features we offer.</p>
            {:else if activeTab === 'pricing'}
              <p>Check out our competitive pricing plans.</p>
            {/if}
          {/snippet}
        </Tabs>
      </div>

      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Pills Variant</h4>
        <Tabs tabs={tabItems} variant="pills">
          {#snippet children({ activeTab })}
            <p>Content for: {activeTab}</p>
          {/snippet}
        </Tabs>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Secondary Color</h4>
        <Tabs tabs={tabItems} secondary>
          {#snippet children({ activeTab })}
            <p>Content for: {activeTab}</p>
          {/snippet}
        </Tabs>
      </div>
    </Card>

    <!-- Accordion -->
    <Card title="Accordion" description="Collapsible content sections">
      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Default</h4>
        <Accordion items={accordionItems} />
      </div>

      <div class="mljr-mb-6">
        <h4 class="mljr-h5 mljr-mb-3">Multiple Open</h4>
        <Accordion items={accordionItems} multiple defaultOpen={['1']} />
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Primary Accent</h4>
        <Accordion items={accordionItems} primary />
      </div>
    </Card>
  </div>

  <CodeExample code={`// Component usage
&lt;Tabs tabs={tabItems}&gt;
  {#snippet children({ activeTab })}
    {#if activeTab === 'overview'}
      &lt;p&gt;Overview content&lt;/p&gt;
    {:else if activeTab === 'features'}
      &lt;p&gt;Features content&lt;/p&gt;
    {/if}
  {/snippet}
&lt;/Tabs&gt;

&lt;Tabs tabs={tabItems} variant="pills" /&gt;
&lt;Tabs tabs={tabItems} secondary /&gt;

&lt;Accordion items={accordionItems} /&gt;
&lt;Accordion items={accordionItems} multiple defaultOpen={['1']} /&gt;
&lt;Accordion items={accordionItems} primary /&gt;`} />
</section>
