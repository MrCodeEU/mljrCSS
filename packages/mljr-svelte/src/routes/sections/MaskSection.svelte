<script lang="ts">
  import { Mask, CodeExample, Icon } from '$lib';

  const codeExample = `<script>
  import { Mask } from 'mljr-svelte';
<\/script>

<!-- Circle mask -->
<Mask shape="circle">
  <img src="/image.jpg" alt="Avatar" />
</Mask>

<!-- Star mask -->
<Mask shape="star">
  <img src="/photo.jpg" alt="Photo" />
</Mask>

<!-- Hexagon mask -->
<Mask shape="hexagon">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 200px; height: 200px;">
    <Icon icon="mdi:account" size={64} />
  </div>
</Mask>`;

  const imageUrl = 'data:image/svg+xml,%3Csvg width="200" height="200" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="200" height="200" fill="%23667eea"/%3E%3C/svg%3E';
</script>

<div class="mask-section">
  <div class="mljr-mb-6">
    <p class="mljr-text-lg mljr-text-muted">
      Apply creative shapes to images or content using CSS clip-path. Nine different shapes
      available for unique visual presentations.
    </p>
  </div>

  <div class="examples-grid">
    <!-- All Shapes -->
    <div class="example-card full-width">
      <h3 class="example-title">All Shape Variants</h3>
      <div class="shapes-grid">
        <div class="shape-demo">
          <Mask shape="circle">
            <div class="gradient-box gradient-1">
              <Icon icon="mdi:account" size={48} />
            </div>
          </Mask>
          <p class="shape-label">Circle</p>
        </div>

        <div class="shape-demo">
          <Mask shape="squircle">
            <div class="gradient-box gradient-2">
              <Icon icon="mdi:star" size={48} />
            </div>
          </Mask>
          <p class="shape-label">Squircle</p>
        </div>

        <div class="shape-demo">
          <Mask shape="hexagon">
            <div class="gradient-box gradient-3">
              <Icon icon="mdi:hexagon" size={48} />
            </div>
          </Mask>
          <p class="shape-label">Hexagon</p>
        </div>

        <div class="shape-demo">
          <Mask shape="triangle">
            <div class="gradient-box gradient-4">
              <Icon icon="mdi:triangle" size={48} />
            </div>
          </Mask>
          <p class="shape-label">Triangle</p>
        </div>

        <div class="shape-demo">
          <Mask shape="star">
            <div class="gradient-box gradient-5">
              <Icon icon="mdi:star-outline" size={48} />
            </div>
          </Mask>
          <p class="shape-label">Star</p>
        </div>

        <div class="shape-demo">
          <Mask shape="heart">
            <div class="gradient-box gradient-6">
              <Icon icon="mdi:heart" size={48} />
            </div>
          </Mask>
          <p class="shape-label">Heart</p>
        </div>

        <div class="shape-demo">
          <Mask shape="pentagon">
            <div class="gradient-box gradient-7">
              <Icon icon="mdi:pentagon" size={48} />
            </div>
          </Mask>
          <p class="shape-label">Pentagon</p>
        </div>

        <div class="shape-demo">
          <Mask shape="diamond">
            <div class="gradient-box gradient-8">
              <Icon icon="mdi:cards-diamond" size={48} />
            </div>
          </Mask>
          <p class="shape-label">Diamond</p>
        </div>

        <div class="shape-demo">
          <Mask shape="decagon">
            <div class="gradient-box gradient-9">
              <Icon icon="mdi:decagram" size={48} />
            </div>
          </Mask>
          <p class="shape-label">Decagon</p>
        </div>
      </div>
    </div>

    <!-- Use Cases -->
    <div class="example-card full-width">
      <h3 class="example-title">Common Use Cases</h3>
      <div class="use-cases">
        <div class="use-case">
          <h4>Profile Avatars</h4>
          <div class="use-case-demo">
            <Mask shape="circle">
              <div class="gradient-box gradient-1" style="width: 80px; height: 80px;">
                <Icon icon="mdi:account" size={40} />
              </div>
            </Mask>
            <Mask shape="squircle">
              <div class="gradient-box gradient-2" style="width: 80px; height: 80px;">
                <Icon icon="mdi:account" size={40} />
              </div>
            </Mask>
            <Mask shape="hexagon">
              <div class="gradient-box gradient-3" style="width: 80px; height: 80px;">
                <Icon icon="mdi:account" size={40} />
              </div>
            </Mask>
          </div>
        </div>

        <div class="use-case">
          <h4>Achievement Badges</h4>
          <div class="use-case-demo">
            <Mask shape="star">
              <div class="gradient-box gradient-5" style="width: 80px; height: 80px;">
                <Icon icon="mdi:trophy" size={40} />
              </div>
            </Mask>
            <Mask shape="pentagon">
              <div class="gradient-box gradient-7" style="width: 80px; height: 80px;">
                <Icon icon="mdi:medal" size={40} />
              </div>
            </Mask>
          </div>
        </div>

        <div class="use-case">
          <h4>Creative Thumbnails</h4>
          <div class="use-case-demo">
            <Mask shape="diamond">
              <div class="gradient-box gradient-8" style="width: 80px; height: 80px;">
                <Icon icon="mdi:image" size={40} />
              </div>
            </Mask>
            <Mask shape="decagon">
              <div class="gradient-box gradient-9" style="width: 80px; height: 80px;">
                <Icon icon="mdi:image-multiple" size={40} />
              </div>
            </Mask>
          </div>
        </div>

        <div class="use-case">
          <h4>Icon Containers</h4>
          <div class="use-case-demo">
            <Mask shape="hexagon">
              <div class="gradient-box gradient-3" style="width: 60px; height: 60px;">
                <Icon icon="mdi:rocket" size={30} />
              </div>
            </Mask>
            <Mask shape="circle">
              <div class="gradient-box gradient-4" style="width: 60px; height: 60px;">
                <Icon icon="mdi:lightbulb" size={30} />
              </div>
            </Mask>
            <Mask shape="squircle">
              <div class="gradient-box gradient-6" style="width: 60px; height: 60px;">
                <Icon icon="mdi:palette" size={30} />
              </div>
            </Mask>
          </div>
        </div>
      </div>
    </div>

    <!-- Code Example -->
    <div class="example-card full-width">
      <h3 class="example-title">Usage Example</h3>
      <CodeExample code={codeExample} language="svelte" />
    </div>
  </div>
</div>

<style>
  .mask-section {
    max-width: 100%;
  }

  .examples-grid {
    display: grid;
    gap: var(--mljr-space-6);
  }

  .example-card {
    padding: var(--mljr-space-6);
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-shadow);
  }

  .example-card.full-width {
    grid-column: 1 / -1;
  }

  .example-title {
    font-size: var(--mljr-text-lg);
    font-weight: 600;
    color: var(--mljr-text);
    margin-bottom: var(--mljr-space-4);
  }

  .shapes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--mljr-space-8);
  }

  .shape-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--mljr-space-3);
  }

  .shape-label {
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text-secondary);
    text-align: center;
  }

  .gradient-box {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .gradient-1 {
    background: linear-gradient(135deg, var(--mljr-primary-500) 0%, var(--mljr-primary-700) 100%);
  }
  .gradient-2 {
    background: linear-gradient(135deg, var(--mljr-secondary-500) 0%, var(--mljr-secondary-700) 100%);
  }
  .gradient-3 {
    background: linear-gradient(135deg, var(--mljr-accent-500) 0%, var(--mljr-accent-700) 100%);
  }
  .gradient-4 {
    background: linear-gradient(135deg, var(--mljr-success-500) 0%, var(--mljr-success-700) 100%);
  }
  .gradient-5 {
    background: linear-gradient(135deg, var(--mljr-warning-500) 0%, var(--mljr-warning-700) 100%);
  }
  .gradient-6 {
    background: linear-gradient(135deg, var(--mljr-error-500) 0%, var(--mljr-error-700) 100%);
  }
  .gradient-7 {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  .gradient-8 {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  .gradient-9 {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }

  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--mljr-space-6);
  }

  .use-case {
    padding: var(--mljr-space-4);
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-md);
  }

  .use-case h4 {
    font-size: var(--mljr-text-base);
    font-weight: 600;
    color: var(--mljr-text);
    margin: 0 0 var(--mljr-space-3) 0;
    text-align: center;
  }

  .use-case-demo {
    display: flex;
    flex-wrap: wrap;
    gap: var(--mljr-space-3);
    justify-content: center;
  }
</style>
