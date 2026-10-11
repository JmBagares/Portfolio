# Portfolio

A personal portfolio built with React and Vite for junior frontend and web development applications. It opens directly to the developer introduction, followed by React projects, deployed company websites, internship experience, and skills. A music-inspired turntable and theme experience appears after the professional sections.

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
- `SelectedWorks` - project showcase with previews and links
- `Experience` - internship contributions and company website links
- `Skills` - development, design, and hardware skill highlights
- `AboutMe` - short background and mobile thesis contribution
- `Education` - academic background
- `TurntableSection` - optional interactive vinyl player and theme/audio experience
- `Contact` - contact call-to-action

## Resume

The hero and navigation download a separate one-page frontend developer resume with clickable profile, project, and source-code links. The original `src/assets/Jan Manuel Bagares CV.pdf` is retained.

To update the new resume, edit the verified content in `scripts/build_resume.py`, then run:

```bash
python -m pip install reportlab
python scripts/build_resume.py
```

The script writes a downloadable copy under `output/pdf/` and the PDF asset imported by the portfolio under `src/assets/`. Render and inspect the PDF after changing its content, and keep it to one readable page.

## Quality Checks

GitHub Actions runs the existing lint and production build commands on pushes and pull requests. Run both locally before publishing changes:

```bash
npm run lint
npm run build
```

Project claims should describe completed work and distinguish individual contributions from team work. Lunan stores saved diary data locally; map tiles and reverse geocoding require a connection.

## Evidence Still to Add

- Record short walkthrough videos for PetSOS, Lunan, and SignSense using the actual applications.
- Publish a reviewable enrollment-system demo using synthetic data, or label a demonstration mode if the team backend is unavailable.
- Document actual test results, technical decisions, and measured limitations in the project repositories.
- Add a supervisor testimonial only after receiving permission to publish it.

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

## Search Appearance

The portfolio uses **Jan Manuel Bagares | Junior Frontend Developer** as its homepage title. Keep the homepage, social metadata, Person structured data, and preview image consistent when changing the professional title. Mobile projects remain part of the portfolio's work history.

The production host is `https://www.jmbagares.com/`; Vercel redirects the address without `www` to it. Canonical links, the sitemap, and `robots.txt` use the production host. Each case study has its own canonical URL.

After deploying a search metadata change:

1. Open the verified `jmbagares.com` property in [Google Search Console](https://search.google.com/search-console).
2. Inspect `https://www.jmbagares.com/`, run **Test live URL**, then select **Request indexing**.
3. Submit `https://www.jmbagares.com/sitemap.xml` under **Sitemaps** if it has not already been submitted.
4. Keep public profile bios consistent with the same title where appropriate.

Google chooses its own search titles, snippets, and AI Overview wording. Updates require recrawling and reprocessing and can take days to weeks; requesting indexing does not guarantee an immediate update. See [Google's title-link guidance](https://developers.google.com/search/docs/appearance/title-link) and [recrawl instructions](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

The active sharing image is `public/social-preview-v3.jpg` (1200 × 630), edited with the built-in imagegen tool and exported as JPEG. A new filename avoids reusing a cached sharing image. The image-edit prompt was:

> Use case: text-localization. Asset type: portfolio social sharing banner. Edit target: the supplied local social-preview-v2.jpg image. Make one precise text replacement: replace "Junior Full-Stack Developer | React & TypeScript" with exactly "Junior Frontend Developer | React & TypeScript". Preserve the name "Jan Manuel Bagares", the location "Las Piñas City, Metro Manila", all original layout, typography style, colors, cream background, teal gradients, layered glass illustration, fine lines and geometric details. Preserve the wide 1200 by 630 composition and output exactly 1200x630 if supported. Keep text crisp, correctly spelled and legible. Do not add any objects, words, logos or decorations. Opaque background. This is a minimal correction of an existing portfolio asset.

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
