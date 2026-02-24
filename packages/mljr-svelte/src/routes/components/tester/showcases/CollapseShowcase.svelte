<script lang="ts">
  import { Collapse, Card, Icon } from '$lib';

  let open1 = $state(false);
  let open2 = $state(true);
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Collapse</h3>
    <Collapse title="Click to expand" bind:open={open1}>
      <p class="mljr-text-secondary">
        This content is hidden by default and reveals when you click the trigger.
        The Collapse component smoothly animates the height transition.
      </p>
    </Collapse>
    <p class="mljr-text-xs mljr-text-muted mljr-mt-2">State: {open1 ? 'open' : 'closed'}</p>
  </section>

  <!-- Pre-opened -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Pre-opened</h3>
    <Collapse title="Already open" bind:open={open2}>
      <p class="mljr-text-secondary">This collapse starts in the open state.</p>
    </Collapse>
  </section>

  <!-- With Icon -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Icon</h3>
    <div class="mljr-space-y-2">
      <Collapse title="Settings" icon="mdi:cog">
        <div class="mljr-space-y-3">
          <p class="mljr-text-sm mljr-text-secondary">Configure your preferences here.</p>
          <div class="mljr-flex mljr-items-center mljr-justify-between">
            <span class="mljr-text-sm">Email notifications</span>
            <input type="checkbox" class="mljr-checkbox" />
          </div>
        </div>
      </Collapse>
      <Collapse title="Privacy" icon="mdi:shield-account">
        <p class="mljr-text-sm mljr-text-secondary">Manage your privacy settings and data.</p>
      </Collapse>
      <Collapse title="Billing" icon="mdi:credit-card">
        <p class="mljr-text-sm mljr-text-secondary">View and manage your billing information.</p>
      </Collapse>
    </div>
  </section>

  <!-- Disabled -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled</h3>
    <Collapse title="Disabled Collapse" disabled>
      <p>This won't be shown.</p>
    </Collapse>
  </section>

  <!-- Custom Trigger -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Trigger</h3>
    <Collapse>
      {#snippet trigger(open)}
        <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-p-3 mljr-bg-primary-50 dark:mljr-bg-primary-900/20 mljr-rounded-lg mljr-cursor-pointer">
          <Icon icon={open ? 'mdi:chevron-up' : 'mdi:chevron-down'} size={20} class="mljr-text-primary-500" />
          <span class="mljr-font-medium mljr-text-primary-700 dark:mljr-text-primary-300">
            {open ? 'Hide details' : 'Show details'}
          </span>
        </div>
      {/snippet}
      <div class="mljr-mt-2 mljr-p-4 mljr-bg-secondary mljr-rounded-lg">
        <p class="mljr-text-sm mljr-text-secondary">Custom trigger with branded styling.</p>
      </div>
    </Collapse>
  </section>

  <!-- FAQ Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">FAQ Example</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Frequently Asked Questions</h4>
      <div class="mljr-space-y-2">
        {#each [
          { q: 'What is MLJR CSS?', a: 'MLJR CSS is a Claymorphism design system built on TailwindCSS with Svelte 5 components.' },
          { q: 'Is it free to use?', a: 'Yes! MLJR CSS is open-source and free to use in personal and commercial projects.' },
          { q: 'Does it support dark mode?', a: 'Absolutely! Every component supports both light and dark themes out of the box.' },
          { q: 'Can I use it without Svelte?', a: 'Yes, the CSS package can be used standalone with any framework or plain HTML.' },
        ] as faq}
          <Collapse title={faq.q}>
            <p class="mljr-text-sm mljr-text-secondary">{faq.a}</p>
          </Collapse>
        {/each}
      </div>
    </Card>
  </section>
</div>
