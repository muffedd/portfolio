# Portfolio Website - Better late than Basic

A modern, interactive portfolio website with dynamic motion graphics, glassmorphic design, and fluid animations.

## 🎨 Typography System

### Font Stack

**PP Editorial New Style (Headers)**
- Primary: Newsreader (italic, weight 600)
- Fallback: Cormorant, Georgia, Times New Roman, serif
- Usage: All headings (h1-h6), titles, taglines, gallery item titles, flowing background text

**FK Grotesk Neue Style (Body Text)**
- Primary: Space Grotesk
- Fallback: DM Sans, Helvetica Neue, Arial, sans-serif
- Usage: All body text, descriptions, buttons, navigation, captions

### Typography Hierarchy

```
Headers (h1-h6)     → PP Editorial New (Newsreader/Cormorant)
Titles & Taglines   → PP Editorial New (italic, elegant serif)
Body Text           → FK Grotesk Neue (Space Grotesk/DM Sans)
Descriptions        → FK Grotesk Neue (clean, modern grotesque)
Buttons & UI        → FK Grotesk Neue (consistent UI elements)
```

## ✨ Key Features

### Interactive Elements
- **Custom Circular Cursor** with dotted trail effect
- **Water Ripple Effect** on background text (moves away from cursor)
- **3D Flip Animations** for tab transitions
- **3D Tilt Effect** on gallery items (mouse tracking)
- **Ripple Click Effect** on buttons
- **Parallax Scrolling** on highlights rail

### Visual Design
- **Glassmorphic Cards** with backdrop blur and transparency
- **Flowing Text Background** with 6 rows of animated text
- **Pixelated Loading Screen** with glitch effect
- **iOS-Native Aesthetic** with smooth animations

### Layout
- **Three-Column Grid**: Info card, content area, highlights rail
- **Collapsing Info Panel**: Becomes a chip after scrolling
- **Mixed-Ratio Gallery**: Supports 1:1 and 16:9 images
- **Responsive Design**: Optimized for desktop, tablet, and mobile

## 🚀 Quick Start

1. Open `index.html` in a modern web browser
2. Replace placeholder images with your own cover art
3. Update social links in the Info section
4. Customize colors in CSS variables if needed

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML structure
├── styles.css          # All styles and animations
├── script.js           # Interactive behaviors
├── masterplan.md       # Original design specification
└── README.md           # This file
```

## 🎯 Content Updates

### Weekly Cover Updates
1. Export cover images in 1:1 or 16:9 ratio
2. Replace image URLs in the gallery section
3. Update captions/titles as needed

### Social Links
Update the social icon links in the Info card section of `index.html`

### Contact Information
Change the email address in the Contact tab

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
--color-bg: #f5f5f7;           /* Background color */
--color-glass: rgba(255, 255, 255, 0.7);  /* Glassmorphic tint */
--color-graphite: #52525b;      /* Accent color */
```

### Fonts
Already using:
- **Newsreader & Cormorant** for editorial headers
- **Space Grotesk & DM Sans** for body text

### Animations
Adjust timing and effects in `script.js`:
- Water effect radius: `interactionRadius` variable
- Loading duration: Modify timeout in loading screen function
- Tab flip speed: Adjust timeout in tab switching function

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technical Details

- Pure HTML/CSS/JavaScript (no frameworks)
- Glassmorphism with `backdrop-filter`
- Hardware-accelerated animations
- 60fps performance with `requestAnimationFrame`
- Touch-device detection for cursor effects

---

**Created with attention to detail and modern web design principles.**

