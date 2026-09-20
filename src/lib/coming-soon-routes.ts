/** Footer + static generation for `/coming-soon/[slug]`. */

export type ComingSoonSlug =
  | "ai-security-workspace"
  | "ai-orchestration-engine"
  | "cloud-security"
  | "governance-deployment"
  | "documentation"
  | "support"
  | "security-research"
  | "api-surface"
  | "community";

export const COMING_SOON_PAGES: Record<
  ComingSoonSlug,
  { title: string; teaser: string; highlights: string[]; category: "Platform" | "Resources" }
> = {
  "ai-security-workspace": {
    category: "Platform",
    title: "AI Security Workspace",
    teaser:
      "The conversational command center where teams launch assessments, run AI-guided attack chains, review findings, and generate executive and technical reports.",
    highlights: ["Conversational AI assistant", "Attack chain planner with approvals", "Intelligent PDF reporting"],
  },
  "ai-orchestration-engine": {
    category: "Platform",
    title: "AI Orchestration Engine",
    teaser:
      "The intelligence layer that plans and executes full attack workflows, chaining 120+ security tools intelligently to uncover genuine, exploitable attack paths.",
    highlights: ["AI-driven tool chaining", "Live session dashboard", "Resilient long-running execution"],
  },
  "cloud-security": {
    category: "Platform",
    title: "Cloud Security",
    teaser:
      "Continuous multi-cloud posture management across AWS, Azure, Google Cloud, Kubernetes, Microsoft 365, and GitHub with hundreds of best-practice checks.",
    highlights: ["ThreatScore risk prioritization", "Attack path analysis", "CIS, NIST, PCI-DSS, SOC 2 mapping"],
  },
  "governance-deployment": {
    category: "Platform",
    title: "Governance & Deployment",
    teaser:
      "Multi-tenant isolation, role-based access control, approval-based execution, audit trails, SSO/SAML, and flexible cloud or on-premise deployment.",
    highlights: ["Approval-gated actions", "Complete audit trails", "Cloud or fully on-premise"],
  },
  documentation: {
    category: "Resources",
    title: "Documentation",
    teaser:
      "Deep-dive guides, architecture notes, deployment patterns, and safe defaults—we are writing these for practitioners, not fluff readers.",
    highlights: ["Runbooks & examples", "Reference CLI / API shape", "Hardening checklists"],
  },
  support: {
    category: "Resources",
    title: "Support",
    teaser:
      "Human support channels, SLA guidance, and escalation paths for Vrika workspaces—opening soon as we finalize partner coverage.",
    highlights: ["Priority channels", "Runbook-backed triage", "Tenant-scoped ticketing"],
  },
  "security-research": {
    category: "Resources",
    title: "Security research",
    teaser:
      "Notes from our labs on chaining techniques, toolchain hazards, responsible automation, and coordinated disclosure—we ship evidence, not vibes.",
    highlights: ["Advisories index", "Repro snippets", "Disclosure timelines"],
  },
  "api-surface": {
    category: "Resources",
    title: "API surface",
    teaser:
      "Programmatic hooks for workspaces, artefacts, approvals, and webhooks—ideal for tying Vrika into your existing SOAR, CI, or custom panels.",
    highlights: ["Versioned schemas", "Idempotent workflows", "Webhooks & streaming"],
  },
  community: {
    category: "Resources",
    title: "Community",
    teaser:
      "Where operators swap playbooks responsibly, within clear rules—no irresponsible exploit trading, focused on sanctioned learning and tooling craft.",
    highlights: ["Forum & office hours", "Partner integrations", "Champion playbook library"],
  },
};

export const COMING_SOON_SLUGS = Object.keys(COMING_SOON_PAGES) as ComingSoonSlug[];

export const FOOTER_PLATFORM_LINKS = [
  { href: "/coming-soon/ai-security-workspace" as const, label: "AI Security Workspace" },
  { href: "/coming-soon/ai-orchestration-engine" as const, label: "AI Orchestration Engine" },
  { href: "/coming-soon/cloud-security" as const, label: "Cloud Security" },
  { href: "/coming-soon/governance-deployment" as const, label: "Governance & Deployment" },
] as const;

export const FOOTER_RESOURCE_LINKS = [
  { href: "/coming-soon/documentation" as const, label: "Documentation" },
  { href: "/coming-soon/security-research" as const, label: "Security research" },
  { href: "/coming-soon/api-surface" as const, label: "API surface" },
  { href: "/coming-soon/community" as const, label: "Community" },
] as const;

/** Query `back=dashboard` from app shell, or `return` with a whitelisted path only. */
export const COMING_SOON_BACK_QUERY = "back" as const;
export const COMING_SOON_RETURN_QUERY = "return" as const;

const DASHBOARD_BACK_VALUE = "dashboard" as const;

export type ComingSoonBackNav = {
  href: "/" | "/dashboard";
  label: "Back home" | "Back to dashboard";
};

function firstSearchParam(value: string | string[] | undefined): string | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

/** Returns `/` or `/dashboard` when input is a safe same-origin path, else null. */
function parseWhitelistedReturnPath(raw: string): "/" | "/dashboard" | null {
  let decoded: string;
  try {
    decoded = decodeURIComponent(raw.trim());
  } catch {
    return null;
  }
  if (decoded.length > 2048) return null;
  if (/^[a-zA-Z][\w+.-]*:/.test(decoded)) return null;
  if (decoded.startsWith("//")) return null;
  let path = decoded;
  const q = path.indexOf("?");
  if (q !== -1) path = path.slice(0, q);
  const h = path.indexOf("#");
  if (h !== -1) path = path.slice(0, h);
  if (!path.startsWith("/")) return null;
  if (path.includes("..")) return null;
  const parts = path.split("/").filter(Boolean);
  const normalized = parts.length === 0 ? "/" : `/${parts.join("/")}`;
  if (normalized === "/dashboard" || normalized === "/") return normalized;
  return null;
}

export function resolveComingSoonBackNav(
  searchParams: Record<string, string | string[] | undefined>,
): ComingSoonBackNav {
  const ret = firstSearchParam(searchParams[COMING_SOON_RETURN_QUERY]);
  if (ret !== undefined) {
    const p = parseWhitelistedReturnPath(ret);
    if (p === "/dashboard") return { href: "/dashboard", label: "Back to dashboard" };
    if (p === "/") return { href: "/", label: "Back home" };
  }
  const back = firstSearchParam(searchParams[COMING_SOON_BACK_QUERY]);
  if (back === DASHBOARD_BACK_VALUE) return { href: "/dashboard", label: "Back to dashboard" };
  return { href: "/", label: "Back home" };
}

/** Use on `/coming-soon/*` links from the authenticated dashboard shell. */
export const COMING_SOON_FROM_DASHBOARD_QUERY = `${COMING_SOON_BACK_QUERY}=${DASHBOARD_BACK_VALUE}` as const;
