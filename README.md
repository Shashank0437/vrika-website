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

## Configuration

Set environment variables in `.env`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:8000
```
