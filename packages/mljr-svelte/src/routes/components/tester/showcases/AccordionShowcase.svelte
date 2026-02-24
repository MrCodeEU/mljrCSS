<script lang="ts">
  import { Accordion, Icon } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Basic Accordion -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Accordion</h3>
    <Accordion
      defaultOpen={['item1']}
      items={[
        {
          id: 'item1',
          title: 'What is MLJR CSS?',
          content:
            'MLJR CSS is a modern CSS framework with a claymorphism design system, offering beautiful components and utilities for building web applications.'
        },
        {
          id: 'item2',
          title: 'How do I install it?',
          content:
            'You can install MLJR CSS using npm or pnpm. Run "pnpm add mljr-css" or "npm install mljr-css" in your project directory.'
        },
        {
          id: 'item3',
          title: 'Is it responsive?',
          content:
            'Yes! All components are fully responsive and work seamlessly across different screen sizes and devices.'
        }
      ]}
    />
  </section>

  <!-- Allow Multiple Open -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Allow Multiple Open</h3>
    <Accordion
      multiple
      items={[
        {
          id: 'multi1',
          title: 'First Section',
          content: 'Content for the first section. Multiple sections can be open at the same time.'
        },
        {
          id: 'multi2',
          title: 'Second Section',
          content: 'Content for the second section. Try opening multiple sections simultaneously.'
        },
        {
          id: 'multi3',
          title: 'Third Section',
          content: 'Content for the third section. All sections can be expanded together.'
        }
      ]}
    />
  </section>

  <!-- Single Open Only -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Single Open Only</h3>
    <Accordion
      items={[
        {
          id: 'single1',
          title: 'Features',
          content:
            'Our product includes a wide range of features designed to enhance productivity and streamline workflows.'
        },
        {
          id: 'single2',
          title: 'Pricing',
          content:
            'We offer flexible pricing plans to suit businesses of all sizes, from startups to enterprises.'
        },
        {
          id: 'single3',
          title: 'Support',
          content:
            '24/7 customer support is available via email, chat, and phone. We are here to help you succeed.'
        }
      ]}
    />
  </section>

  <!-- With Icons -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Custom Icons</h3>
    <Accordion
      items={[
        {
          id: 'icon1',
          title: 'Account Settings',
          content: 'Manage your account preferences, profile information, and security settings.'
        },
        {
          id: 'icon2',
          title: 'Billing Information',
          content: 'View and update your billing details, payment methods, and subscription plan.'
        },
        {
          id: 'icon3',
          title: 'Notifications',
          content: 'Configure your notification preferences for email, push, and in-app alerts.'
        }
      ]}
    />
  </section>

  <!-- Disabled Items -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Disabled Items</h3>
    <Accordion
      items={[
        {
          id: 'disabled1',
          title: 'Available Section',
          content: 'This section is available and can be expanded.'
        },
        {
          id: 'disabled2',
          title: 'Disabled Section',
          content: 'This content cannot be accessed.',
          disabled: true
        },
        {
          id: 'disabled3',
          title: 'Another Available Section',
          content: 'This section is also available and can be expanded.'
        }
      ]}
    />
  </section>

  <!-- FAQ Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">FAQ Example</h3>
    <Accordion
      items={[
        {
          id: 'faq1',
          title: 'How long does shipping take?',
          content:
            'Standard shipping typically takes 5-7 business days. Express shipping options are available for 2-3 day delivery.'
        },
        {
          id: 'faq2',
          title: 'What is your return policy?',
          content:
            'We offer a 30-day return policy for most items. Products must be in original condition with tags attached.'
        },
        {
          id: 'faq3',
          title: 'Do you ship internationally?',
          content:
            'Yes, we ship to over 100 countries worldwide. International shipping times vary by destination.'
        },
        {
          id: 'faq4',
          title: 'How can I track my order?',
          content:
            'Once your order ships, you will receive a tracking number via email. You can also track your order in your account dashboard.'
        },
        {
          id: 'faq5',
          title: 'What payment methods do you accept?',
          content:
            'We accept all major credit cards, PayPal, Apple Pay, and Google Pay for your convenience.'
        }
      ]}
    />
  </section>

  <!-- Documentation Structure -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Documentation Structure</h3>
    <Accordion
      items={[
        {
          id: 'doc1',
          title: 'Installation',
          content: `
            <div class="mljr-space-y-3">
              <p class="mljr-text-secondary">Install the package using your preferred package manager:</p>
              <pre class="mljr-bg-secondary mljr-p-3 mljr-rounded mljr-text-sm">npm install mljr-css</pre>
              <p class="mljr-text-secondary">Or using pnpm:</p>
              <pre class="mljr-bg-secondary mljr-p-3 mljr-rounded mljr-text-sm">pnpm add mljr-css</pre>
            </div>
          `
        },
        {
          id: 'doc2',
          title: 'Configuration',
          content: `
            <div class="mljr-space-y-3">
              <p class="mljr-text-secondary">Add the plugin to your tailwind.config.js:</p>
              <pre class="mljr-bg-secondary mljr-p-3 mljr-rounded mljr-text-sm">plugins: [require('mljr-css')]</pre>
            </div>
          `
        },
        {
          id: 'doc3',
          title: 'Usage',
          content: `
            <div class="mljr-space-y-3">
              <p class="mljr-text-secondary">Import the CSS in your main file:</p>
              <pre class="mljr-bg-secondary mljr-p-3 mljr-rounded mljr-text-sm">import 'mljr-css/dist/mljr.css'</pre>
              <p class="mljr-text-secondary">Then start using the components and utilities in your markup.</p>
            </div>
          `
        }
      ]}
    />
  </section>
</div>
