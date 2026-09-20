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

The attack-path preview follows the cloud-security product's resource graph:
Internet → EC2 instance → IAM role → S3 bucket, with directed relationships and
a linked finding. All identifiers, permissions, and severity in the preview
are illustrative. Visitors can inspect each node or pause the traversal.

## Configuration

Set environment variables in `.env`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:8000
```
