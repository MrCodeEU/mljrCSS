<script lang="ts">
  import { Turnstile } from '$lib';

  let verifiedToken = $state('');
  let verifyStatus = $state('');

  function handleVerify(token: string) {
    verifiedToken = token;
    verifyStatus = 'Verified! Token: ' + token.slice(0, 20) + '...';
  }
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Demo Mode (no siteKey — click to simulate verification)</h3>
    <Turnstile
      onVerify={handleVerify}
      showStatus={true}
    />
    {#if verifyStatus}
      <p class="mljr-text-sm mljr-text-muted mljr-mt-2">{verifyStatus}</p>
    {/if}
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Demo — Light Theme</h3>
    <Turnstile theme="light" showStatus={true} />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Demo — Dark Theme</h3>
    <Turnstile theme="dark" showStatus={true} />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Demo — No Status Message</h3>
    <Turnstile showStatus={false} />
    <p class="mljr-text-sm mljr-text-muted mljr-mt-2">Status message hidden (showStatus=false)</p>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Real Widget (requires a valid siteKey)</h3>
    <div class="mljr-p-4" style="background:var(--mljr-bg-secondary);border-radius:var(--mljr-radius-md);">
      <p class="mljr-text-sm mljr-text-muted">
        To use the real Cloudflare Turnstile widget, provide a <code>siteKey</code> prop:
      </p>
      <pre class="mljr-text-xs mljr-mt-2 mljr-p-2" style="background:var(--mljr-bg);border-radius:var(--mljr-radius-sm);">&lt;Turnstile siteKey="0x4AAAA..." /&gt;</pre>
    </div>
  </section>
</div>
