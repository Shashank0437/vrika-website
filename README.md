# Vrika Website

Standalone marketing website for **Vrika** — Next.js 15 with Tailwind CSS and Google Stitch design system.

## Running Locally

```bash
npm install
npm run dev
```

The website runs at `http://localhost:3000`.

## Docker Setup

Build and run using Docker Compose:

```bash
docker compose up --build -d
```

Service runs on port `3002` (mapped to container port `3000`).

## Marketing experience

The landing page keeps VRIKA's purple palette with light surfaces, lavender
section bands, and a signature purple closing call to action. It uses the approved copy in
`src/components/landing/landing-data.ts`. The interactive hero illustrates the
Discover / Validate / Govern / Report workflow; its sample data is not live
telemetry. Module links support direct hashes such as `/#module-cloud`.

“Book a demo” opens the existing contact form and uses the configured contact API.
Product walkthroughs use lightweight, contextual SVG/CSS illustrations rather
than video downloads. Decorative motion respects the
visitor's reduced-motion preference, and both workflow and module tabs support
arrow keys, Home, and End.

The risk-journey illustration explains how an exposed application and excess
access could affect sensitive data, without internal resource types or query
labels. Its steps use responsive document flow rather than positioned text.
Visitors can select a step for a plain-language explanation or pause the animation.

## Appearance

Every public page includes a dark-mode switch. The initial theme is light,
regardless of the device theme; an explicit choice is saved under `vrika-theme`
and synchronized across tabs. Semantic color tokens cover page surfaces,
illustrations, navigation, footer, and the contact form. The theme is applied
before rendering to avoid flashing the wrong appearance on refresh.
Dark mode combines navy surfaces, violet feature sections, and restrained teal
accents; provider logos retain their original brand colors in both themes.

## Configuration

Set environment variables in `.env`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:8000
```
