/** Mega-menu structure for the marketing header. */

export type NavLink = { href: string; label: string; desc?: string };
export type NavColumn = { heading: string; links: NavLink[] };
export type NavGroup = { id: string; label: string; columns: NavColumn[]; feature?: NavLink & { kicker: string } };

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "platform",
    label: "Platform",
    columns: [
      {
        heading: "Modules",
        links: [
          {
            href: "/#module-workspace",
            label: "AI Security Workspace",
            desc: "Launch assessments, run AI-guided attack chains, and generate reports.",
          },
          {
            href: "/#module-orchestration",
            label: "AI Orchestration Engine",
            desc: "Plan and execute full attack workflows across 185+ security tools.",
          },
          {
            href: "/#module-cloud",
            label: "Cloud Security",
            desc: "Continuous multi-cloud posture management and compliance mapping.",
          },
          {
            href: "/#module-governance",
            label: "Governance & Deployment",
            desc: "Multi-tenancy, RBAC, approvals, audit trails, and SSO.",
          },
        ],
      },
      {
        heading: "Capabilities",
        links: [
          { href: "/#capabilities", label: "Key capabilities" },
          { href: "/#tool-coverage", label: "185+ tool coverage" },
          { href: "/#cloud-coverage", label: "Supported cloud environments" },
          { href: "/#compliance", label: "Compliance frameworks" },
          { href: "/#customization", label: "Configuration & customization" },
        ],
      },
    ],
    feature: {
      kicker: "Why VRIKA",
      href: "/#why-vrika",
      label: "One platform, four integrated modules",
      desc: "Offensive security automation, cloud protection, and governance in a single AI-driven workspace.",
    },
  },
  {
    id: "solutions",
    label: "Solutions",
    columns: [
      {
        heading: "By use case",
        links: [
          { href: "/#use-cases", label: "Continuous penetration testing" },
          { href: "/#use-cases", label: "Attack surface management" },
          { href: "/#use-cases", label: "Cloud security posture management" },
          { href: "/#use-cases", label: "Red team automation" },
          { href: "/#use-cases", label: "Application & API security testing" },
        ],
      },
      {
        heading: "By outcome",
        links: [
          { href: "/#business-value", label: "Reduce manual effort" },
          { href: "/#business-value", label: "Validate real risk" },
          { href: "/#business-value", label: "Accelerate remediation" },
          { href: "/#business-value", label: "Simplify compliance" },
        ],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    columns: [
      {
        heading: "Learn",
        links: [
          { href: "/docs", label: "Documentation" },
          { href: "/#platform", label: "Product walkthroughs" },
          { href: "/#tool-coverage", label: "Tool coverage" },
        ],
      },
      {
        heading: "Support",
        links: [
          { href: "/#faq", label: "FAQ" },
          { href: "/responsible-disclosure", label: "Responsible disclosure" },
          { href: "/security-disclosure", label: "Security disclosure" },
        ],
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    columns: [
      {
        heading: "About",
        links: [
          { href: "/about", label: "About VRIKA" },
          { href: "/terms-of-use", label: "Terms of use" },
          { href: "/privacy-policy", label: "Privacy policy" },
        ],
      },
    ],
  },
];
