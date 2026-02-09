<script lang="ts">
  import { Card, Footer, CodeExample } from '$lib';
</script>

<section id="footer" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-gap-6">
    <Card title="Default Footer" description="Full footer with all sections">
      <div class="demo-footer-wrapper">
        <Footer
          description="A TailwindCSS-based CSS framework with beautiful claymorphism design."
          copyright="© 2024 MLJR CSS. All rights reserved."
          sections={[
            {
              title: 'Documentation',
              links: [
                { label: 'Getting Started', href: '#' },
                { label: 'Components', href: '#' },
                { label: 'Customization', href: '#' },
              ]
            },
            {
              title: 'Resources',
              links: [
                { label: 'GitHub', href: '#', external: true },
                { label: 'npm', href: '#', external: true },
                { label: 'Changelog', href: '#' },
              ]
            },
            {
              title: 'Community',
              links: [
                { label: 'Discord', href: '#', external: true },
                { label: 'Twitter', href: '#', external: true },
              ]
            },
          ]}
          socialLinks={[
            { label: 'GitHub', href: 'https://github.com' },
            { label: 'Twitter', href: 'https://twitter.com' },
          ]}
          legalLinks={[
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
          ]}
        >
          {#snippet logo()}
            <a href="/" class="mljr-footer-logo">
              <span class="mljr-text-xl mljr-font-bold">MLJR CSS</span>
            </a>
          {/snippet}
        </Footer>
      </div>
    </Card>

    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <Card title="Compact Footer" description="Minimal footer for simple pages">
        <div class="demo-footer-wrapper">
          <Footer
            variant="compact"
            copyright="© 2024 MLJR CSS"
          />
        </div>
      </Card>

      <Card title="Centered Footer" description="Centered layout for landing pages">
        <div class="demo-footer-wrapper">
          <Footer
            variant="centered"
            description="Beautiful claymorphism design for your next project."
            copyright="© 2024 MLJR CSS"
            socialLinks={[
              { label: 'GitHub', href: '#' },
              { label: 'Twitter', href: '#' },
              { label: 'Discord', href: '#' },
            ]}
          >
            {#snippet logo()}
              <span class="mljr-text-2xl mljr-font-bold">MLJR CSS</span>
            {/snippet}
          </Footer>
        </div>
      </Card>
    </div>

    <Card title="Footer Features" description="Key capabilities">
      <ul class="feature-list">
        <li>✓ Claymorphism social links with hover lift & scale</li>
        <li>✓ Elevated cards with soft 3D shadows</li>
        <li>✓ Responsive grid layout</li>
        <li>✓ Multiple variants (default, compact, centered)</li>
        <li>✓ Customizable sections and links</li>
        <li>✓ Dark mode support with enhanced shadows</li>
      </ul>
    </Card>
  </div>

  <CodeExample code={`<!-- Default footer with all sections -->
<Footer
  description="A beautiful CSS framework."
  copyright="© 2024 MLJR CSS. All rights reserved."
  sections={[
    {
      title: 'Documentation',
      links: [
        { label: 'Getting Started', href: '#' },
        { label: 'Components', href: '#' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'GitHub', href: '#', external: true },
      ]
    },
  ]}
  socialLinks={[
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
  ]}
>
  {#snippet logo()}
    <span class="mljr-text-xl mljr-font-bold">MLJR CSS</span>
  {/snippet}
</Footer>

<!-- Compact footer -->
<Footer
  variant="compact"
  copyright="© 2024 MLJR CSS"
/>

<!-- Centered footer -->
<Footer
  variant="centered"
  description="Beautiful claymorphism design."
  copyright="© 2024 MLJR CSS"
  socialLinks={[
    { label: 'GitHub', href: '#' },
    { label: 'Twitter', href: '#' },
  ]}
/>`} />
</section>

<style>
  .demo-footer-wrapper {
    border-radius: var(--mljr-radius-lg);
    overflow: hidden;
    box-shadow: var(--mljr-clay-inset-sm);
  }

  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--mljr-space-2);
  }

  .feature-list li {
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-secondary);
  }

  :global(.demo-footer-wrapper .mljr-footer) {
    position: relative;
  }
</style>
