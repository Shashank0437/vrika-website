export type PentestScreen = "workspace" | "attack-chain" | "execution-mode" | "approval" | "execution" | "pentest-report";
export type CloudScreen = "providers" | "scans" | "overview" | "findings" | "compliance" | "attack-paths" | "cloud-report";

type WorkflowStep<Screen extends string> = {
  label: string;
  title: string;
  summary: string;
  screen: Screen;
  action: string;
};

type WorkflowDetails = {
  name: string;
  context: string;
  safeguard: string;
};

export type Workflow = WorkflowDetails & (
  | { id: "pentest"; steps: readonly WorkflowStep<PentestScreen>[] }
  | { id: "cloud"; steps: readonly WorkflowStep<CloudScreen>[] }
);

export const WORKFLOWS: readonly Workflow[] = [
  {
    id: "pentest",
    name: "Penetration testing",
    context: "Inside the Agentic Workspace: configure an assessment, review tool permissions, follow execution, and open the PDF report.",
    safeguard: "Illustrated product screens, not a live console. This example uses an authorized target, Ask permission mode, and a tenant administrator for tool execution.",
    steps: [
      {
        label: "Open workspace",
        title: "Start in your Agentic Workspace",
        summary: "Use Run Scan to open the workspace. Describe an authorized assessment, or configure an Intelligent Attack Chain.",
        screen: "workspace",
        action: "Operator action: open Run Scan, then choose Configure & preview for the planned-assessment route shown here.",
      },
      {
        label: "Preview a plan",
        title: "Review the plan before starting",
        summary: "Enter your target in Intelligent Attack Chain, preview the proposed phases and tools, then choose Start Session.",
        screen: "attack-chain",
        action: "Operator action: Preview Attack Chain, review the plan, then Start Session. A preview does not execute tools.",
      },
      {
        label: "Set permissions",
        title: "Choose how tools are allowed to run",
        summary: "The workspace's Tools menu provides Ask permission or tenant-admin-only Auto accept. This walkthrough uses Ask permission.",
        screen: "execution-mode",
        action: "Operator action: select Ask permission to review proposed tool calls before execution.",
      },
      {
        label: "Approve tools",
        title: "Make a decision on each tool",
        summary: "Review the Tool batch, approve or reject every row, then explicitly execute the batch with the required administrator role.",
        screen: "approval",
        action: "Operator action: decide every row, then Execute batch. Approving a row is not the same as running the batch.",
      },
      {
        label: "Follow execution",
        title: "Watch progress in the same session",
        summary: "Tool execution cards show status and output. Attack chain progress keeps the current assessment phase visible above the composer.",
        screen: "execution",
        action: "Review the tool output and phase progress. Session Intelligence also provides findings, evidence, and a timeline for session review.",
      },
      {
        label: "Open the report",
        title: "Generate a report you can inspect",
        summary: "Choose Generate Report in the workspace header. Open the resulting PDF attachment to preview it or download it.",
        screen: "pentest-report",
        action: "Operator action: Generate Report, then Download PDF Report. Run more tools later and use Generate Updated Report.",
      },
    ],
  },
  {
    id: "cloud",
    name: "Cloud security",
    context: "A dashboard-led workflow: connect a provider, launch a scan, review the results, and export evidence using the product's own controls.",
    safeguard: "Illustrated dashboard with sample data. Scans are launched through the UI, not a chat agent. Review screens use completed scan data; Attack Paths needs a graph-ready attack-path scan.",
    steps: [
      {
        label: "Connect",
        title: "Connect an account through Providers",
        summary: "Follow the provider wizard, configure the account's authorization method, and validate the connection before scanning.",
        screen: "providers",
        action: "Operator action: complete Connect Account and Validate Connection. Provider Connected! confirms the account is ready.",
      },
      {
        label: "Scan",
        title: "Launch and track your scan",
        summary: "Choose Launch scan after connecting a provider, then follow the job's state in Scans. No chat command or agent is involved.",
        screen: "scans",
        action: "Operator action: Launch scan for the connected provider, then monitor its scan job.",
      },
      {
        label: "Overview",
        title: "See the account's security posture",
        summary: "Select an account in Overview to inspect findings, risk severity, resources, and the compliance watchlist after a scan.",
        screen: "overview",
        action: "Operator action: select the provider or account. Dashboard cards reflect the selected scan context.",
      },
      {
        label: "Findings",
        title: "Inspect a finding and its evidence",
        summary: "Use the Findings filters, open a finding group, and review affected resources, risk, and remediation guidance.",
        screen: "findings",
        action: "Operator action: filter by severity or status, then open the finding details. Recommendations do not apply fixes.",
      },
      {
        label: "Compliance",
        title: "Review requirements framework by framework",
        summary: "Open Compliance, select a completed scan, and inspect framework results and the requirements that need attention.",
        screen: "compliance",
        action: "Operator action: choose a scan and framework. Compliance is a separate review screen, not an automatic certification.",
      },
      {
        label: "Attack paths",
        title: "Explore connected cloud risks",
        summary: "In Attack Paths, select a graph-ready scan and an available query, then inspect the returned resource relationships.",
        screen: "attack-paths",
        action: "Optional investigation: run a graph query against completed attack-path scan data. This does not actively exploit the account.",
      },
      {
        label: "Export",
        title: "Share the evidence from Scans",
        summary: "Return to a completed scan's actions menu to download an executive PDF, a full PDF report, or the scan reports.",
        screen: "cloud-report",
        action: "Operator action: open the scan's report menu and choose an export. Report generation may take time before the download is ready.",
      },
    ],
  },
];
