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

The `#how-it-works` section contains a six-step penetration-testing workspace
walkthrough and a seven-step Cloud Security dashboard walkthrough. Story content
is in `workflow-data.ts`; `WorkflowScreens.tsx` renders simplified product screens.
All screen data is illustrative. Product controls inside the illustrations are
display-only; use the walkthrough's step and playback buttons to navigate.
No tools, scans, account connections, or downloads are triggered.
Playback advances every five seconds, stops at the end, and pauses offscreen or
in a hidden tab. Reduced-motion
visitors use the step controls without autoplay.

The penetration-testing illustration follows the actual client components in
`vrika-server/client/src/components/dashboard`: `InitializeOffensiveSequencePage`,
`AttackChainPlanModal`, `AgentChatExecModeDropdown`, `AttackChainPhaseStrip`, and
the PDF attachment/preview components. It shows Ask permission mode and a tenant
administrator explicitly executing a decided tool batch. Previewing a plan,
approving tools, executing a batch, and generating a report are separate actions.

Cloud Security follows the pages in `vrika-cloud-security/ui/app/(prowler)`,
the provider wizard, attack-path query builder, and scan-row report actions:
Providers → Scans → Overview → Findings → Compliance → Attack Paths → scan exports.
These are dashboard navigation examples, not a mandatory sequential scan pipeline.
There is **no cloud chat or agent-run scan** in this walkthrough. Findings and
compliance use completed scan data; Attack Paths additionally needs a graph-ready
attack-path scan. Remediation is guidance, not automatic changes. MCP endpoints
are not evidence of an exposed product-UI capability.
Public tool-coverage copy uses the confirmed **120+ tools**.

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
