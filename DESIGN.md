---
name: Sinta Coffee Co. Rebuild Design System
colors:
  surface-light: '#f7f4ef'          # Cotton Cream / Linen (Main canvas background)
  surface-dark: '#1a1712'           # Deep Espresso Black (Primary text, header, dark section highlights)
  surface-tonal: '#b4b3b0'          # Pebble Stone Gray (Intro loader background, secondary text/borders)
  on-surface-light: '#1a1712'       # Espresso text on cream background
  on-surface-dark: '#f7f4ef'        # Cream text on dark background
  primary-accent: '#d46a43'         # Cinnamon Terracotta (CTAs, key highlights)
  secondary-accent: '#2b3e50'       # Deep Steel Blue / Navy (Secondary button highlights, tags)
  border-light: '#e8e5df'           # Subtle linen border for light elements
  border-dark: 'rgba(247, 244, 239, 0.15)' # Subtle border for dark elements
typography:
  display-lg:
    fontFamily: Cormorant Garamond
    fontSize: 72px
    fontWeight: '500'
    lineHeight: '1.05'
    letterSpacing: -0.01em
  display-lg-mobile:
    fontFamily: Cormorant Garamond
    fontSize: 44px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Cormorant Garamond
    fontSize: 36px
    fontWeight: '500'
    lineHeight: '1.25'
  headline-sm:
    fontFamily: Cormorant Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Jost
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
  body-md:
    fontFamily: Jost
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Jost
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: '0.22em'
rounded:
  sm: 4px
  md: 12px
  lg: 16px
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap-desktop: 100px
  section-gap-mobile: 60px
---

## Brand & Style

Sinta Coffee Co. is a mobile coffee cart business. The design system is crafted to feel **editorial, cinematic, and deeply hospitable**, mirroring the high-quality video intro animation. 

The visual strategy relies on:
1. **Stone & Cream Pacing**: Alternating sections of warm Cotton Cream (`#f7f4ef`) and Deep Espresso (`#1a1712`), connected by transitions that reference the warm Pebble Stone (`#b4b3b0`) of the intro video.
2. **Smooth, Cinematic Reveal**: Loading the page displays a full-screen, self-contained video player. Once it ends, the loader dissolves and the website slides into view.
3. **Elegant Typography**: The tall, dramatic shapes of `Cormorant Garamond` (italics used selectively for highlighting) paired with the clean, architectural tracking of `Jost`.

## Colors

- **Cotton Cream / Linen (#f7f4ef)**: The core canvas color. Soft, warm, and highly readable, it mimics high-end editorial magazines.
- **Deep Espresso Black (#1a1712)**: Used for primary text and structural boundaries. It anchors the light layout.
- **Pebble Stone (#b4b3b0)**: Gradients on the intro loader, matching the video's backdrop.
- **Cinnamon Terracotta (#d46a43)**: Accent color for primary CTAs and active interactive highlights.
- **Deep Steel Blue (#2b3e50)**: Used as a secondary accent color (derived from the puffer jacket in the intro video).

## Elevation & Depth

- **No Float Shadows**: Depth is communicated via clean layout stacking, fine borders, and tone shifting (Cream to Stone), not through heavy CSS shadows.
- **Borders**: 1px solid borders in `#e8e5df` (on light) or `rgba(247, 244, 239, 0.15)` (on dark) create structural separation.
- **Glassmorphism**: Restricted strictly to the sticky navigation bar for smooth scroll context.
