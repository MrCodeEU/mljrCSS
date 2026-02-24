<script lang="ts">
  import { Icon } from '$lib';
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">UnifiedNav — Used in Main Layout</h3>

    <div class="mljr-p-6" style="background:var(--mljr-bg-secondary);border-radius:var(--mljr-radius-lg);border:2px solid var(--mljr-border);">
      <div class="mljr-flex mljr-gap-3 mljr-items-start">
        <Icon icon="mdi:information" size={24} color="var(--mljr-primary-500)" />
        <div>
          <p class="mljr-font-semibold mljr-mb-2">This component is used in the application layout.</p>
          <p class="mljr-text-sm mljr-text-muted mljr-mb-3">
            The <code>UnifiedNav</code> component renders a collapsible sidebar navigation with
            categorized links, logo slot, header actions, and mobile/desktop responsive behavior.
            It is fixed-position and used in the main layout, so it cannot be demonstrated inline here.
          </p>
          <p class="mljr-text-sm mljr-text-muted">
            You can see it live on the left side of this very page.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Props Reference</h3>
    <div class="mljr-p-4" style="background:var(--mljr-bg-secondary);border-radius:var(--mljr-radius-md);">
      <table style="width:100%;font-size:var(--mljr-text-sm);border-collapse:collapse;">
        <thead>
          <tr>
            <th style="text-align:left;padding:8px;border-bottom:1px solid var(--mljr-border);">Prop</th>
            <th style="text-align:left;padding:8px;border-bottom:1px solid var(--mljr-border);">Type</th>
            <th style="text-align:left;padding:8px;border-bottom:1px solid var(--mljr-border);">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);"><code>categories</code></td>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);">NavCategory[]</td>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);">Array of navigation category groups with items</td>
          </tr>
          <tr>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);"><code>open</code></td>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);">boolean (bindable)</td>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);">Whether the sidebar is expanded</td>
          </tr>
          <tr>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);"><code>isMobile</code></td>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);">boolean</td>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);">Auto-close on item click when on mobile</td>
          </tr>
          <tr>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);"><code>position</code></td>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);">'left' | 'right'</td>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);">Sidebar position</td>
          </tr>
          <tr>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);"><code>logo</code></td>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);">Snippet</td>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);">Custom logo slot content</td>
          </tr>
          <tr>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);"><code>topLinks</code></td>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);">Array&lt;&#123;label, href&#125;&gt;</td>
            <td style="padding:8px;border-bottom:1px solid var(--mljr-border);">Links shown at the top of the sidebar</td>
          </tr>
          <tr>
            <td style="padding:8px;"><code>headerActions</code></td>
            <td style="padding:8px;">Snippet</td>
            <td style="padding:8px;">Custom actions in the header area</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</div>
