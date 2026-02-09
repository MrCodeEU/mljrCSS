<script lang="ts">
  import { Card, Carousel, Badge, CodeExample } from '$lib';

  const carouselSlides = [
    { title: 'Claymorphism Style', description: 'Soft rounded design with 3D depth' },
    { title: 'Rich Colors', description: 'Warm orange primary with purple accents' },
    { title: 'Dark Mode', description: 'Optimized for both light and dark themes' },
  ];
</script>

<section id="carousel" class="mljr-mb-8">
  <Card title="Carousel" description="Sliding content with soft rounded design">
    <!-- Content Carousel -->
    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">Content Carousel with Autoplay</h4>
      <div style="height: 300px;">
        <Carousel autoplay={true} interval={3000}>
          {#each carouselSlides as slide}
            <li
              class="mljr-carousel-item mljr-flex mljr-items-center mljr-justify-center mljr-flex-col mljr-gap-2"
              style="height: 300px; background: linear-gradient(135deg, var(--mljr-primary-500) 0%, var(--mljr-secondary-500) 100%); padding: 2rem;"
            >
              <h3 class="mljr-h3" style="color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">{slide.title}</h3>
              <p class="mljr-text-xl" style="color: rgba(255,255,255,0.9); text-align: center; max-width: 600px;">{slide.description}</p>
            </li>
          {/each}
        </Carousel>
      </div>
    </div>

    <!-- Image Carousel -->
    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">Image Carousel (Manual)</h4>
      <div style="height: 200px;">
        <Carousel loop={true} showIndicators={true} showControls={true} autoplay={false}>
          <li class="mljr-carousel-item mljr-flex mljr-items-center mljr-justify-center" style="height: 200px; background-color: var(--mljr-bg-secondary);">
            <img src="/Logo.png" alt="MLJR Logo" style="max-height: 150px; object-fit: contain;" />
          </li>
          <li class="mljr-carousel-item mljr-flex mljr-items-center mljr-justify-center" style="height: 200px; background-color: var(--mljr-bg-tertiary);">
            <img src="/Logo-h.png" alt="MLJR Horizontal Logo" style="max-height: 150px; object-fit: contain;" />
          </li>
          <li class="mljr-carousel-item mljr-flex mljr-items-center mljr-justify-center" style="height: 200px; background-color: var(--mljr-bg-secondary);">
            <img src="/Logo-v.png" alt="MLJR Vertical Logo" style="max-height: 150px; object-fit: contain;" />
          </li>
        </Carousel>
      </div>
    </div>

    <!-- Card Carousel with Peek -->
    <div>
      <h4 class="mljr-h5 mljr-mb-3">Peek Variant (Shows Next Slide)</h4>
      <div style="height: 250px;">
        <Carousel variant="peek" autoplay={true} interval={4000}>
          {#each [
            { title: 'Card 1', desc: 'First card with some content', color: 'var(--mljr-primary-500)' },
            { title: 'Card 2', desc: 'Second card with more info', color: 'var(--mljr-secondary-500)' },
            { title: 'Card 3', desc: 'Third card to showcase', color: 'var(--mljr-accent-500)' }
          ] as card}
            <li
              class="mljr-carousel-item mljr-p-6"
              style="height: 250px; background: var(--mljr-frosted-bg); border: 2px solid {card.color}; border-radius: var(--mljr-radius-xl);"
            >
              <h4 class="mljr-h4 mljr-mb-3" style="color: {card.color};">{card.title}</h4>
              <p class="mljr-text-secondary">{card.desc}</p>
              <div class="mljr-mt-4">
                <Badge variant="primary">Featured</Badge>
              </div>
            </li>
          {/each}
        </Carousel>
      </div>
    </div>
  </Card>
  <CodeExample code={`// Component usage
<Carousel autoplay={true} interval={3000}>
  {#each carouselSlides as slide}
    <li class="mljr-carousel-item">
      <h3>{slide.title}</h3>
      <p>{slide.description}</p>
    </li>
  {/each}
</Carousel>

<Carousel 
  loop={true} 
  showIndicators={true} 
  showControls={true}
  autoplay={false}
>
  <li class="mljr-carousel-item">Slide 1</li>
  <li class="mljr-carousel-item">Slide 2</li>
</Carousel>

<Carousel variant="peek" autoplay={true} interval={4000}>
  {#each carouselSlides as slide}
    <li class="mljr-carousel-item">{slide.title}</li>
  {/each}
</Carousel>`} />
</section>
