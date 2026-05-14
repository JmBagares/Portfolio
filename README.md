# Portfolio

An interactive personal portfolio built with React and Vite. It showcases selected projects, skills, education, and contact information through a music-inspired interface with animated backgrounds, theme changes, a custom cursor, and a draggable vinyl player.

## Features

- Responsive single-page portfolio layout
- Animated hero, project cards, skills, education, and contact sections
- Interactive turntable section with draggable records and audio playback
- Theme engine that changes the site's mood based on the selected/playing record
- WebGL and shader-based visual effects using Three.js, React Three Fiber, OGL, and postprocessing
- Smooth motion and scroll animations with Framer Motion
- Project showcase with image previews, mobile mockup previews, and external links
- Custom cursor and hover interactions for desktop users

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber
- OGL
- React DnD
- ESLint

## Getting Started

### Prerequisites

Install Node.js and npm on your machine.

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  assets/              Images, audio, videos, fonts, and project previews
  components/          Portfolio sections and reusable interactive components
  hooks/               Custom React hooks
  theme/               Theme configuration and theme context
  App.jsx              Main page composition
  main.jsx             React entry point
  index.css            Global styles
```

## Main Sections

- `Hero` - landing section with animated background visuals
- `AboutMe` - personal introduction and featured information
- `SelectedWorks` - project showcase with previews and links
- `TurntableSection` - interactive vinyl player and theme/audio experience
- `Skills` - development, design, and hardware skill highlights
- `Education` - academic background
- `Contact` - contact call-to-action

## Deployment

This project can be deployed on Vercel, Netlify, GitHub Pages, or any static hosting provider that supports Vite builds.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

## Analytics

Google Analytics 4 is free for standard usage. This project supports GA4 through the `VITE_GA_MEASUREMENT_ID` environment variable.

To enable it locally, create a `.env.local` file in the project root with:

```text
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

To enable it on Vercel:

1. Open your project in Vercel.
2. Go to Settings > Environment Variables.
3. Add `VITE_GA_MEASUREMENT_ID`.
4. Paste your GA4 Measurement ID, for example `G-XXXXXXXXXX`.
5. Redeploy the project.

If the environment variable is missing, analytics stays disabled and the site still works normally.

## Author

Jan Manuel Bagares

- GitHub: [@JmBagares](https://github.com/JmBagares)
