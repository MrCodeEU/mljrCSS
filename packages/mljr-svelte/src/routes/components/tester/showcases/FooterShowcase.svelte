<script lang="ts">
  import { Footer, Icon, Divider } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Basic Footer -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Footer</h3>
    <Footer>
      <div class="mljr-text-center mljr-text-sm mljr-text-muted">
        © 2026 Company Name. All rights reserved.
      </div>
    </Footer>
  </section>

  <!-- With Links -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Links</h3>
    <Footer>
      <div class="mljr-flex mljr-flex-col mljr-md:flex-row mljr-items-center mljr-justify-between mljr-gap-4">
        <div class="mljr-text-sm mljr-text-muted">
          © 2026 MLJR CSS. All rights reserved.
        </div>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-4 mljr-text-sm">
          <a href="." class="mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
            Privacy Policy
          </a>
          <a href="." class="mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
            Terms of Service
          </a>
          <a href="." class="mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
            Contact
          </a>
        </div>
      </div>
    </Footer>
  </section>

  <!-- With Social Links -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Social Links</h3>
    <Footer>
      <div class="mljr-space-y-4">
        <div class="mljr-flex mljr-justify-center mljr-gap-4">
          <a href="." class="mljr-p-2 mljr-rounded-lg mljr-bg-secondary hover:mljr-bg-gray-300 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
            <Icon icon="mdi:facebook" size={20} />
          </a>
          <a href="." class="mljr-p-2 mljr-rounded-lg mljr-bg-secondary hover:mljr-bg-gray-300 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
            <Icon icon="mdi:twitter" size={20} />
          </a>
          <a href="." class="mljr-p-2 mljr-rounded-lg mljr-bg-secondary hover:mljr-bg-gray-300 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
            <Icon icon="mdi:instagram" size={20} />
          </a>
          <a href="." class="mljr-p-2 mljr-rounded-lg mljr-bg-secondary hover:mljr-bg-gray-300 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
            <Icon icon="mdi:linkedin" size={20} />
          </a>
          <a href="." class="mljr-p-2 mljr-rounded-lg mljr-bg-secondary hover:mljr-bg-gray-300 dark:hover:mljr-bg-gray-700 mljr-transition-colors">
            <Icon icon="mdi:github" size={20} />
          </a>
        </div>
        <div class="mljr-text-center mljr-text-sm mljr-text-muted">
          © 2026 Company Name. All rights reserved.
        </div>
      </div>
    </Footer>
  </section>

  <!-- Multi-Column Footer -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Multi-Column Footer</h3>
    <Footer>
      <div class="mljr-space-y-8">
        <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-4 mljr-gap-8">
          <div>
            <h4 class="mljr-font-semibold mljr-mb-4">Company</h4>
            <div class="mljr-space-y-2 mljr-text-sm">
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                About Us
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Careers
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Press
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Blog
              </a>
            </div>
          </div>

          <div>
            <h4 class="mljr-font-semibold mljr-mb-4">Product</h4>
            <div class="mljr-space-y-2 mljr-text-sm">
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Features
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Pricing
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Security
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Roadmap
              </a>
            </div>
          </div>

          <div>
            <h4 class="mljr-font-semibold mljr-mb-4">Resources</h4>
            <div class="mljr-space-y-2 mljr-text-sm">
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Documentation
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Guides
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                API Reference
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Support
              </a>
            </div>
          </div>

          <div>
            <h4 class="mljr-font-semibold mljr-mb-4">Legal</h4>
            <div class="mljr-space-y-2 mljr-text-sm">
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Privacy
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Terms
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                License
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>

        <Divider />

        <div class="mljr-flex mljr-flex-col mljr-md:flex-row mljr-items-center mljr-justify-between mljr-gap-4">
          <div class="mljr-text-sm mljr-text-muted">
            © 2026 MLJR CSS. All rights reserved.
          </div>
          <div class="mljr-flex mljr-gap-4">
            <a href="." class="mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
              <Icon icon="mdi:facebook" size={20} />
            </a>
            <a href="." class="mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
              <Icon icon="mdi:twitter" size={20} />
            </a>
            <a href="." class="mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
              <Icon icon="mdi:github" size={20} />
            </a>
            <a href="." class="mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
              <Icon icon="mdi:linkedin" size={20} />
            </a>
          </div>
        </div>
      </div>
    </Footer>
  </section>

  <!-- With Newsletter -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Newsletter</h3>
    <Footer>
      <div class="mljr-space-y-6">
        <div class="mljr-text-center mljr-max-w-md mljr-mx-auto">
          <h4 class="mljr-font-semibold mljr-mb-2">Subscribe to our newsletter</h4>
          <p class="mljr-text-sm mljr-text-muted mljr-mb-4">
            Get the latest updates and news delivered to your inbox.
          </p>
          <div class="mljr-flex mljr-gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              class="mljr-input mljr-input-sm mljr-flex-1"
            />
            <button class="mljr-btn mljr-btn-primary mljr-btn-sm">
              Subscribe
            </button>
          </div>
        </div>

        <Divider />

        <div class="mljr-text-center mljr-text-sm mljr-text-muted">
          © 2026 Company Name. All rights reserved.
        </div>
      </div>
    </Footer>
  </section>

  <!-- With Logo and Description -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Logo and Description</h3>
    <Footer>
      <div class="mljr-space-y-8">
        <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-3 mljr-gap-8">
          <div class="mljr-md:col-span-1">
            <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-mb-3">
              <div class="mljr-w-8 mljr-h-8 mljr-bg-gradient-primary mljr-rounded-lg"></div>
              <span class="mljr-text-xl mljr-font-bold">MLJR CSS</span>
            </div>
            <p class="mljr-text-sm mljr-text-muted mljr-mb-4">
              A modern CSS framework with beautiful claymorphism design system
              for building amazing web applications.
            </p>
            <div class="mljr-flex mljr-gap-3">
              <a href="." class="mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                <Icon icon="mdi:github" size={20} />
              </a>
              <a href="." class="mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                <Icon icon="mdi:twitter" size={20} />
              </a>
              <a href="." class="mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                <Icon icon="mdi:discord" size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 class="mljr-font-semibold mljr-mb-4">Quick Links</h4>
            <div class="mljr-space-y-2 mljr-text-sm">
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Documentation
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Components
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Examples
              </a>
            </div>
          </div>

          <div>
            <h4 class="mljr-font-semibold mljr-mb-4">Community</h4>
            <div class="mljr-space-y-2 mljr-text-sm">
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                GitHub
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Discord
              </a>
              <a href="." class="mljr-block mljr-text-muted hover:mljr-text-primary-600 mljr-transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <Divider />

        <div class="mljr-text-center mljr-text-sm mljr-text-muted">
          Built with ❤️ by the MLJR team. © 2026 All rights reserved.
        </div>
      </div>
    </Footer>
  </section>
</div>
