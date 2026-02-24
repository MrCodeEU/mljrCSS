<script lang="ts">
  import { Turnstile } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';

  let verified = $state(false);
  let token = $state('');

  function handleVerify(t: string) {
    token = t;
    verified = true;
  }
</script>

<div class="mljr-space-y-8">
  <!-- Demo widget (no site key) -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Demo Widget (no API key)</h3>
    <p class="mljr-text-sm mljr-text-muted mljr-mb-4">
      Click the checkbox to simulate verification. In production, provide a real Cloudflare Turnstile <code>siteKey</code>.
    </p>
    <Turnstile onVerify={handleVerify} showStatus />
    {#if verified}
      <div class="mljr-alert mljr-alert-success mljr-mt-3">
        Verified! Token: <code style="font-size: 0.75rem;">{token}</code>
      </div>
    {/if}
    <CodeExample code={`<Turnstile onVerify={(token) => console.log(token)} />`} />
  </div>

  <!-- With real site key -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">With Real Site Key</h3>
    <p class="mljr-text-sm mljr-text-muted mljr-mb-4">
      Pass your Cloudflare Turnstile site key to load the real widget.
    </p>
    <CodeExample code={`<Turnstile
  siteKey="0x4AAAAAAA..."
  theme="auto"
  onVerify={(token) => submitForm(token)}
  onExpire={() => console.log('Token expired')}
  onError={(code) => console.error('Error:', code)}
/>`} />
  </div>

  <!-- Without status -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Without Status Message</h3>
    <Turnstile showStatus={false} />
    <CodeExample code={`<Turnstile showStatus={false} />`} />
  </div>

  <!-- In a form -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">In a Form</h3>
    <div class="mljr-card" style="max-width: 420px;">
      <div class="mljr-card-body">
        <h4 class="mljr-h6 mljr-mb-4">Contact Us</h4>
        <div class="mljr-space-y-3">
          <input type="text" class="mljr-input" placeholder="Your name" />
          <input type="email" class="mljr-input" placeholder="Email address" />
          <textarea class="mljr-textarea" placeholder="Message" rows="3"></textarea>
          <Turnstile showStatus />
          <button type="submit" class="mljr-btn mljr-btn-primary mljr-btn-block">Send Message</button>
        </div>
      </div>
    </div>
    <CodeExample code={`<form>
  <input type="text" class="mljr-input" placeholder="Name" />
  <input type="email" class="mljr-input" placeholder="Email" />
  <Turnstile siteKey="YOUR_KEY" onVerify={(t) => captchaToken = t} />
  <button type="submit">Send</button>
</form>`} />
  </div>

  <div class="mljr-alert mljr-alert-info">
    <strong>Setup:</strong> Get a free site key at
    <a href="https://dash.cloudflare.com/?to=/:account/turnstile" target="_blank" rel="noopener" class="mljr-link">Cloudflare Dashboard → Turnstile</a>.
    The Turnstile script is loaded on demand — only when a <code>siteKey</code> is provided.
  </div>
</div>
