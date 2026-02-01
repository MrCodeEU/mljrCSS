# Carousel Component

A fully-featured, accessible carousel/slider component with Detroit: Become Human inspired design.

## Features

- ✅ **Multiple Content Types**: Support for images, HTML, and Svelte components
- ✅ **Autoplay**: Optional automatic slide advancement
- ✅ **Touch Support**: Swipe gestures on mobile devices
- ✅ **Keyboard Navigation**: Arrow keys, Home, End
- ✅ **Accessibility**: Full ARIA support, keyboard accessible, screen reader friendly
- ✅ **Variants**: Default, Peek (shows next slide), Fade
- ✅ **Customizable**: Control visibility, indicators style, and more
- ✅ **No Warnings**: Properly implements Svelte 5 accessibility guidelines

## Basic Usage

### Content Carousel

```svelte
<Carousel autoplay={true} interval={3000}>
  <div class="mljr-carousel-item" role="listitem" id="slide-0">
    <h3>Slide 1</h3>
    <p>Content here</p>
  </div>
  <div class="mljr-carousel-item" role="listitem" id="slide-1">
    <h3>Slide 2</h3>
    <p>More content</p>
  </div>
</Carousel>
```

### Image Carousel

```svelte
<Carousel loop={true} autoplay={false}>
  <div class="mljr-carousel-item" role="listitem" id="slide-0">
    <img src="/image1.jpg" alt="Description" />
  </div>
  <div class="mljr-carousel-item" role="listitem" id="slide-1">
    <img src="/image2.jpg" alt="Description" />
  </div>
  <div class="mljr-carousel-item" role="listitem" id="slide-2">
    <img src="/image3.jpg" alt="Description" />
  </div>
</Carousel>
```

### Dynamic Content with Loop

```svelte
<script>
  const slides = [
    { title: 'Slide 1', image: '/img1.jpg' },
    { title: 'Slide 2', image: '/img2.jpg' },
    { title: 'Slide 3', image: '/img3.jpg' }
  ];
</script>

<Carousel autoplay={true} interval={5000} loop={true}>
  {#each slides as slide, index}
    <div 
      class="mljr-carousel-item" 
      role="listitem" 
      id={`slide-${index}`}
    >
      <img src={slide.image} alt={slide.title} />
      <h3>{slide.title}</h3>
    </div>
  {/each}
</Carousel>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Snippet` | **required** | Content to display (must contain `.mljr-carousel-item` elements) |
| `autoplay` | `boolean` | `false` | Enable automatic slide advancement |
| `interval` | `number` | `5000` | Time between slides in ms (when autoplay is enabled) |
| `loop` | `boolean` | `true` | Allow looping back to first/last slide |
| `showIndicators` | `boolean` | `true` | Show navigation dots at bottom |
| `showControls` | `boolean` | `true` | Show prev/next buttons |
| `variant` | `'default' \| 'fade' \| 'peek'` | `'default'` | Transition style |
| `indicatorStyle` | `'default' \| 'diamond'` | `'default'` | Shape of indicator dots |
| `class` | `string` | `''` | Additional CSS classes |

## Variants

### Default
Standard sliding transition with full-width slides.

```svelte
<Carousel variant="default">
  <!-- slides -->
</Carousel>
```

### Peek
Shows a preview of the next slide (85% width).

```svelte
<Carousel variant="peek">
  <!-- slides -->
</Carousel>
```

### Fade
Crossfade transition between slides.

```svelte
<Carousel variant="fade">
  <!-- slides -->
</Carousel>
```

## Keyboard Controls

- **Arrow Left/Right**: Navigate between slides
- **Home**: Jump to first slide
- **End**: Jump to last slide
- **Tab**: Focus controls and indicators

## Touch Controls

- **Swipe Left**: Next slide
- **Swipe Right**: Previous slide

## Accessibility

The carousel is fully accessible with:

- **ARIA Roles**: `region`, `list`, `listitem`, `tab`, `tablist`
- **ARIA Labels**: Descriptive labels for all controls
- **ARIA Live Regions**: Announces slide changes to screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Screen Reader Support**: Proper semantic structure

### Required Markup for Accessibility

Each slide must have:
- `class="mljr-carousel-item"` - Required for functionality
- `role="listitem"` - For screen readers
- `id="slide-{index}"` - For ARIA associations

```svelte
<div 
  class="mljr-carousel-item" 
  role="listitem" 
  id="slide-0"
>
  <!-- content -->
</div>
```

## Autoplay Behavior

When `autoplay={true}`:
- Slides advance automatically every `interval` milliseconds
- **Pauses** on hover/focus
- **Resumes** when mouse leaves
- Resets timer when user manually navigates

## Styling

The carousel uses CSS custom properties for theming:

```css
/* Customize in your CSS */
.mljr-carousel {
  --mljr-primary-500: #0080ff; /* Button colors */
  --mljr-transition-slow: 500ms; /* Slide transition speed */
  --mljr-shadow-md: 0 4px 6px rgba(0,0,0,0.1); /* Button shadows */
}
```

### Image Handling

Images in carousel items automatically:
- Fill their container with `object-fit: cover`
- Maintain aspect ratio
- Are responsive

Override with custom styles:

```svelte
<div class="mljr-carousel-item">
  <img 
    src="/image.jpg" 
    alt="Description"
    style="object-fit: contain; max-height: 400px;"
  />
</div>
```

## Advanced Example

```svelte
<script>
  import { Carousel, Card, Badge } from 'mljr-svelte';
  
  const products = [
    { 
      id: 1, 
      name: 'Product 1', 
      image: '/product1.jpg',
      price: '$29.99',
      featured: true
    },
    // ... more products
  ];
</script>

<Carousel 
  variant="peek" 
  autoplay={true} 
  interval={4000}
  indicatorStyle="diamond"
  class="my-custom-carousel"
>
  {#each products as product, i}
    <div 
      class="mljr-carousel-item mljr-p-4" 
      role="listitem" 
      id={`slide-${i}`}
    >
      <Card>
        <img src={product.image} alt={product.name} />
        <h3 class="mljr-h4 mljr-mt-4">{product.name}</h3>
        <p class="mljr-text-xl mljr-font-bold">{product.price}</p>
        {#if product.featured}
          <Badge variant="primary">Featured</Badge>
        {/if}
      </Card>
    </div>
  {/each}
</Carousel>
```

## Troubleshooting

### Slides not counting correctly
Make sure each slide has the `mljr-carousel-item` class:
```svelte
<div class="mljr-carousel-item" role="listitem" id="slide-0">
```

### Images not displaying
Check that:
1. Image paths are correct
2. Images have proper `alt` attributes
3. Parent container has a defined height

### Autoplay not working
Ensure:
1. `autoplay={true}` is set
2. `slideCount > 1` (needs at least 2 slides)
3. Check browser console for errors

### Accessibility warnings
Make sure each slide includes:
- `role="listitem"`
- `id="slide-{index}"`
- Unique IDs for each slide

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers with touch support

## Performance

- Uses CSS transforms for smooth 60fps animations
- `will-change: transform` for optimization
- `requestAnimationFrame` for accurate slide counting
- Cleans up timers automatically
