# Lucian Kallee Portfolio 2025

A modern, performance-optimized portfolio website built with React, TypeScript, Three.js, and Vite.

## Features

- Interactive 3D scene using Three.js and React Three Fiber
- Responsive design with mobile-first approach
- Performance optimizations for various device capabilities
- Lazy loading and code splitting for improved loading times
- Smooth animations with GSAP
- Styled components with Emotion

## Performance Optimizations

- Lazy loading of components
- Code splitting for better chunk management
- Conditional rendering based on device capabilities
- Reduced motion for users who prefer it
- Optimized 3D scene with frame skipping for low-end devices
- Image optimization with WebP and AVIF formats
- Proper caching headers for static assets
- Compressed assets with Brotli and Gzip

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Emotion (CSS-in-JS)
- **3D Graphics**: Three.js with React Three Fiber & Drei
- **Animations**: GSAP
- **Build Tool**: Vite
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/luciankallee/portfolio-2025.git
cd portfolio-2025

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build locally
npm run preview
```

### Analyze Bundle Size

```bash
# Build with bundle analyzer
npm run build:analyze
```

### Optimize Images

```bash
# Optimize images in public/images directory
npm run optimize:images
```

## Project Structure

```
├── public/               # Static assets
│   ├── images/           # Image assets
│   ├── favicon.svg       # Site favicon
│   ├── og-image.svg      # Open Graph image for social sharing
│   ├── robots.txt        # Search engine instructions
│   └── sitemap.xml       # Site map for search engines
├── scripts/              # Utility scripts
│   └── optimize-images.js # Image optimization script
├── src/                  # Source code
│   ├── assets/           # Other assets
│   ├── components/       # React components
│   │   └── styled/       # Styled components
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   ├── theme.ts          # Theme configuration
│   └── index.css         # Global styles
```

## License

MIT
