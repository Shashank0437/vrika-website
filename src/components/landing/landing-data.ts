/**
 * Landing content sourced from the VRIKA Overview and VRIKA Product & Feature Guide.
 * Narrative: platform -> modules -> coverage -> business value -> use cases -> FAQ.
 */

export const BRAND_TAGLINE = "From Reconnaissance to Intelligence. From Discovery to Defense.";

export const HERO = {
  eyebrow: "AI-Powered Offensive Security Orchestration Platform",
  title: "Hunt risks before",
  titleAccent: "attackers do.",
  body: "Modern organizations face an ever-growing attack surface across applications, cloud environments, infrastructure, APIs, and digital assets. VRIKA transforms offensive security — combining AI, security automation, and penetration testing into one intelligent platform.",
  stats: [
    { value: "120+", label: "Integrated security tools" },
    { value: "4", label: "Integrated platform modules" },
    { value: "10", label: "Offensive tooling categories" },
    { value: "24/7", label: "Continuous validation" },
  ],
} as const;

export type PlatformModule = {
  id: string;
  index: string;
  icon: string;
  title: string;
  summary: string;
  headline: string;
  body: string;
  features: { title: string; body: string }[];
};

export const PLATFORM_MODULES: PlatformModule[] = [
  {
    id: "module-workspace",
    index: "Module 01",
    icon: "forum",
    title: "AI Security Workspace",
    summary:
      "The conversational web experience where teams launch assessments, run AI-guided attack chains, review findings, and generate reports.",
    headline: "Your AI-driven security command center",
    body: "Describe a target in natural language and VRIKA plans, executes, and documents the assessment — with full visibility and operator control at every step.",
    features: [
      {
        title: "Conversational AI assistant",
        body: "Describe an objective in plain language; VRIKA interprets intent and translates it into an executable security workflow — no scripting or tool expertise required.",
      },
      {
        title: "Assessment sessions",
        body: "Every engagement runs as a persistent, resumable session with full context, so work can be paused, reviewed, and continued at any time.",
      },
      {
        title: "Attack chain planner",
        body: "VRIKA proposes a phased plan — recon, enumeration, validation, exploitation — and waits for your approval before executing each stage.",
      },
      {
        title: "Specialist agents",
        body: "Purpose-built expert modes for CTF and lab solving, scoped bug-bounty hunting, and passive-first reconnaissance, each with a guided workflow.",
      },
      {
        title: "Skill library",
        body: "Reusable, expert-authored playbooks across recon, web testing, exploitation, password attacks, and cloud auditing — applied automatically to the task at hand.",
      },
      {
        title: "Intelligent reporting",
        body: "One-click executive and technical reports with risk prioritization, attack-path analysis, and remediation guidance, exportable as polished PDFs.",
      },
      {
        title: "Data privacy vault",
        body: "Automatically detects and masks sensitive data — hosts, addresses, credentials, tokens — before it reaches AI models, then restores it for your reports.",
      },
      {
        title: "Operational analytics",
        body: "Dashboards summarizing activity, coverage, and outcomes, plus transparent per-session AI usage and cost visibility.",
      },
    ],
  },
  {
    id: "module-orchestration",
    index: "Module 02",
    icon: "hub",
    title: "AI Orchestration Engine",
    summary:
      "The intelligence layer that plans and executes full attack workflows across the integrated security toolset.",
    headline: "From target to exploit chain in minutes",
    body: "Behind the workspace, VRIKA's orchestration engine connects AI decision-making to real offensive security tooling. It does not just run tools — it chains them intelligently to uncover genuine, exploitable attack paths.",
    features: [
      {
        title: "AI-driven orchestration",
        body: "AI agents select, sequence, and chain tools automatically based on live results — mirroring how a skilled human tester adapts.",
      },
      {
        title: "120+ integrated tools",
        body: "A comprehensive arsenal spanning network, web, OSINT, password, and cloud or API testing — all managed from one interface.",
      },
      {
        title: "Full attack workflow",
        body: "End-to-end coverage: reconnaissance, enumeration, vulnerability validation, controlled exploitation, and reporting.",
      },
      {
        title: "Intelligent decision engine",
        body: "A catalog-driven planner that prioritizes the most relevant next action for each target and objective.",
      },
      {
        title: "Live session dashboard",
        body: "Real-time command output, logs, findings, and progress for complete operator oversight.",
      },
      {
        title: "Findings and reports",
        body: "Structured, deduplicated findings correlated across tools, ready for review and export.",
      },
      {
        title: "Resilient execution",
        body: "Built-in failure recovery and escalation so long-running assessments continue smoothly.",
      },
      {
        title: "AI client compatibility",
        body: "Standards-based integration lets VRIKA's engine plug into the AI assistants your teams already use.",
      },
    ],
  },
  {
    id: "module-cloud",
    index: "Module 03",
    icon: "cloud",
    title: "Cloud Security",
    summary:
      "Continuous multi-cloud posture management with hundreds of checks, compliance frameworks, and risk scoring.",
    headline: "Continuous multi-cloud protection",
    body: "VRIKA's Cloud Security module continuously assesses your cloud environments against hundreds of best-practice and compliance controls — turning misconfigurations into prioritized, actionable findings.",
    features: [
      {
        title: "Multi-cloud coverage",
        body: "Assess AWS, Azure, Google Cloud, Kubernetes, Microsoft 365, GitHub, and more from a single console.",
      },
      {
        title: "Hundreds of security checks",
        body: "Ready-to-use controls detect misconfigurations, exposures, and risky settings across cloud services.",
      },
      {
        title: "Compliance frameworks",
        body: "Out-of-the-box mapping to CIS, NIST, PCI-DSS, HIPAA, GDPR, ISO 27001, SOC 2, and many more.",
      },
      {
        title: "Risk prioritization scoring",
        body: "A weighted ThreatScore highlights the most critical findings first, so teams fix what matters most.",
      },
      {
        title: "Attack path analysis",
        body: "Combines cloud inventory with findings into a graph that reveals how an attacker could chain weaknesses to reach critical assets.",
      },
      {
        title: "Dashboards and reports",
        body: "Visual posture dashboards and shareable reports for both engineers and leadership.",
      },
      {
        title: "Remediation guidance",
        body: "Each finding includes clear, step-by-step guidance to close the gap.",
      },
    ],
  },
  {
    id: "module-governance",
    index: "Module 04",
    icon: "verified_user",
    title: "Governance & Deployment",
    summary:
      "Multi-tenant access control, approvals, audit trails, single sign-on, and flexible cloud or on-premise deployment.",
    headline: "Enterprise control, trust, and flexibility",
    body: "VRIKA is built for regulated, security-conscious organizations. Every action is governed, auditable, and access-controlled — and the platform can run wherever your data-residency requirements demand.",
    features: [
      {
        title: "Multi-tenant architecture",
        body: "Isolated organizations keep each customer's data and activity fully separated.",
      },
      {
        title: "Role-based access control",
        body: "Granular roles govern who can view, launch, and approve assessments within an organization.",
      },
      {
        title: "Approval-based execution",
        body: "Sensitive actions require explicit approval, keeping human operators firmly in control.",
      },
      {
        title: "Audit trails",
        body: "A complete record of activity supports accountability, compliance, and review.",
      },
      {
        title: "Single sign-on (SSO/SAML)",
        body: "Enterprise identity integration for seamless, secure access with your existing provider.",
      },
      {
        title: "Team onboarding",
        body: "Streamlined invitations and guided registration bring new users and teams on board quickly.",
      },
      {
        title: "Flexible deployment",
        body: "Run VRIKA in the cloud or fully on-premise to meet data-residency and isolation requirements.",
      },
      {
        title: "Licensing and entitlements",
        body: "Capabilities and tool access are managed through a secure licensing model tailored to each organization.",
      },
    ],
  },
];

export const DIFFERENTIATORS = [
  {
    icon: "smart_toy",
    title: "Autonomous operations",
    body: "Natural language interface — describe a target, and VRIKA plans and executes the full workflow automatically.",
  },
  {
    icon: "route",
    title: "Attacker's mindset",
    body: "Chains recon, enumeration, validation, and exploitation to uncover real attack paths — not just CVE lists.",
  },
  {
    icon: "widgets",
    title: "120+ tool orchestration",
    body: "Integrates over 120 security tools in a single conversational platform. No context-switching required.",
  },
] as const;

export const KEY_CAPABILITIES = [
  {
    icon: "chat",
    title: "AI agent-driven testing",
    body: "Natural language assessments automatically translated into executable security workflows.",
  },
  {
    icon: "bolt",
    title: "Offensive security automation",
    body: "Automated recon, enumeration, vulnerability validation, and controlled exploitation.",
  },
  {
    icon: "insights",
    title: "Intelligent reporting",
    body: "Risk prioritization, attack path analysis, time-to-breach metrics, and executive and technical reports.",
  },
  {
    icon: "gavel",
    title: "Governance and control",
    body: "Approval-based execution, audit trails, RBAC, multi-tenant architecture, and team collaboration.",
  },
] as const;

export const TOOL_CATEGORIES = [
  { icon: "lan", title: "Network Discovery & Enumeration" },
  { icon: "language", title: "Web Application Security Testing" },
  { icon: "bug_report", title: "Vulnerability Assessment & Validation" },
  { icon: "api", title: "API Security Testing" },
  { icon: "travel_explore", title: "OSINT & External Attack Surface" },
  { icon: "key", title: "Password & Credential Attacks" },
  { icon: "target", title: "Exploitation & Post-Exploitation" },
  { icon: "cloud_sync", title: "Cloud & Container Security" },
  { icon: "memory", title: "Binary & Artifact Analysis" },
  { icon: "database", title: "Security Intelligence Gathering" },
] as const;

export const TOOL_MARQUEE = [
  "NMAP",
  "SQLMAP",
  "METASPLOIT",
  "BURP SUITE",
  "NUCLEI",
  "FFUF",
  "AMASS",
  "HYDRA",
  "JOHN",
  "WIRESHARK",
  "SUBFINDER",
  "GOBUSTER",
  "AIRCRACK-NG",
  "TRIVY",
] as const;

export const CLOUD_ENVIRONMENTS = [
  {
    icon: "logos:aws",
    name: "Amazon Web Services",
    body: "Broadest coverage — hundreds of checks across compute, storage, identity, and networking, plus attack-path analysis.",
  },
  {
    icon: "logos:microsoft-azure",
    name: "Microsoft Azure",
    body: "Extensive checks across core Azure services and compliance frameworks.",
  },
  {
    icon: "logos:google-cloud",
    name: "Google Cloud",
    body: "Checks spanning identity, storage, compute, and networking services.",
  },
  {
    icon: "logos:kubernetes",
    name: "Kubernetes",
    body: "Cluster and workload hardening checks against recognized benchmarks.",
  },
  {
    icon: "logos:microsoft-icon",
    name: "Microsoft 365",
    body: "Configuration and security posture checks for productivity and identity services.",
  },
  {
    icon: "logos:github-icon",
    name: "GitHub & Source Control",
    body: "Repository, organization, and supply-chain configuration checks.",
  },
] as const;

export const COMPLIANCE_FRAMEWORKS = ["CIS", "NIST", "PCI-DSS", "HIPAA", "GDPR", "ISO 27001", "SOC 2"] as const;

export const BUSINESS_BENEFITS = [
  {
    icon: "schedule",
    title: "Reduce manual effort",
    body: "Automate repetitive penetration testing and cloud review tasks — improving efficiency across teams.",
  },
  {
    icon: "verified",
    title: "Validate real risk",
    body: "Move beyond vulnerability lists to identify exploitable paths that represent genuine business risk.",
  },
  {
    icon: "travel_explore",
    title: "Improve security coverage",
    body: "Continuously assess applications, infrastructure, cloud environments, and external attack surface.",
  },
  {
    icon: "build",
    title: "Accelerate remediation",
    body: "Provide actionable intelligence and clear remediation guidance to security teams.",
  },
  {
    icon: "shield",
    title: "Strengthen security posture",
    body: "Proactively validate defenses before adversaries discover and exploit weaknesses.",
  },
  {
    icon: "fact_check",
    title: "Simplify compliance",
    body: "Continuous mapping to major frameworks streamlines audits and evidence collection.",
  },
] as const;

export const USE_CASES = [
  { icon: "autorenew", title: "Continuous Penetration Testing" },
  { icon: "radar", title: "Attack Surface Management" },
  { icon: "cloud_done", title: "Cloud Security Posture Management" },
  { icon: "rule", title: "Security & Compliance Validation" },
  { icon: "swords", title: "Red Team Automation" },
  { icon: "pest_control", title: "Bug Bounty & Vulnerability Verification" },
  { icon: "monitor_heart", title: "Security Operations Support" },
  { icon: "webhook", title: "Application & API Security Testing" },
  { icon: "assignment", title: "Security Governance & Reporting" },
] as const;

export const CUSTOMIZATION_FEATURES = [
  {
    icon: "tune",
    title: "Configurable AI providers",
    body: "Choose OpenRouter, OpenAI, Anthropic (Claude), Google Gemini, or a custom self-hosted model — and switch at any time to match cost, performance, and data-residency needs.",
  },
  {
    icon: "branding_watermark",
    title: "Custom report branding",
    body: "Upload your company logo to replace default branding on generated PDF reports, producing white-labeled, client-ready deliverables.",
  },
  {
    icon: "visibility_off",
    title: "Sensitive-data masking",
    body: "Before every AI request, VRIKA detects and masks confidential information — keeping it out of external models — then restores it for your final reports.",
  },
  {
    icon: "mail",
    title: "Email delivery and notifications",
    body: "Configure email delivery so reports and scan results reach the right stakeholders as soon as they are ready.",
  },
  {
    icon: "event_repeat",
    title: "Scheduled scans",
    body: "Schedule recurring assessments and cloud security scans on your chosen cadence — enabling continuous, hands-off monitoring.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: "What exactly does VRIKA do?",
    a: "VRIKA is an AI-powered offensive security orchestration platform. Its AI security agents continuously identify, validate, and prioritize risks by orchestrating real-world attack simulations across your environment — helping teams discover vulnerabilities before attackers do.",
  },
  {
    q: "Do I need tool or scripting expertise to use it?",
    a: "No. Describe an objective in plain language and VRIKA interprets intent, selects the right tools, sequences them, and documents the outcome. A point-and-click tools workspace sits alongside the AI assistant for hands-on operators.",
  },
  {
    q: "How does VRIKA keep humans in control?",
    a: "The attack chain planner proposes a phased plan and waits for your approval before executing each stage. Sensitive actions require explicit approval, role-based access control governs who can launch or approve assessments, and complete audit trails record every action.",
  },
  {
    q: "Is my sensitive data sent to AI models?",
    a: "The Data Privacy Vault automatically detects and masks sensitive information — hosts, addresses, credentials, and tokens — before any request reaches an AI model, then restores it for your final reports. You can also select your own provider or a self-hosted model.",
  },
  {
    q: "Which cloud environments are supported?",
    a: "AWS, Microsoft Azure, Google Cloud, Kubernetes, Microsoft 365, and GitHub source control, with coverage for further platforms expanding over time. Findings map to CIS, NIST, PCI-DSS, HIPAA, GDPR, ISO 27001, SOC 2, and more.",
  },
  {
    q: "Can VRIKA run on-premise?",
    a: "Yes. VRIKA runs in the cloud or fully on-premise to meet data-residency and isolation requirements, with multi-tenant isolation, SSO/SAML, and a secure licensing model for entitlements.",
  },
  {
    q: "Does VRIKA replace my existing toolchain?",
    a: "No — it orchestrates it. VRIKA coordinates 120+ established security tools across ten categories from a single conversational interface, eliminating context-switching while keeping the tooling your team already trusts.",
  },
] as const;
