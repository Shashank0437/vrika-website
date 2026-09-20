import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import { ArrowRight, Bot, ChartNoAxesCombined, Check, ChevronDown, Cloud, Download, FileText, Globe, Layers, ListChecks, LockKeyhole, MessageSquare, MousePointer2, Network, Play, Plus, ScanLine, Search, Send, ShieldCheck, Terminal, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CloudScreen, PentestScreen } from "./workflow-data";
import styles from "./WorkflowScreens.module.css";

const CLOUD_NAV = [
  { label: "Overview", icon: ChartNoAxesCombined },
  { label: "Findings", icon: ListChecks },
  { label: "Compliance", icon: ShieldCheck },
  { label: "Attack Paths", icon: Network },
  { label: "Providers", icon: Cloud },
  { label: "Scans", icon: ScanLine },
];
const PENTEST_NAV = [
  { label: "Run Scan", icon: Plus },
  { label: "Sessions", icon: MessageSquare },
  { label: "Usage", icon: ChartNoAxesCombined },
  { label: "Tools", icon: Wrench },
  { label: "Cloud Security", icon: Cloud },
];

function ProductFrame({ product, screen, active, navigation, action, children }: {
  product: string;
  screen: CloudScreen | PentestScreen;
  active: string;
  navigation: readonly { label: string; icon: LucideIcon }[];
  action: string;
  children: ReactNode;
}) {
  return (
    <figure className={styles.frame} data-product-screen={screen} aria-label={`${product} product UI illustration`}>
      <div className={styles.windowBar}>
        <span className={styles.windowDots} aria-hidden><i /><i /><i /></span>
        <strong>{product}</strong><span className={styles.sample}>UI illustration / Sample data</span>
      </div>
      <div className={styles.body}>
        <aside className={styles.sidebar} aria-label="Illustrated product navigation">
          <div className={styles.brand}><ShieldCheck size={21} aria-hidden />VRIKA</div>
          <div className={styles.navItems}>
            {navigation.map(({ label, icon: NavIcon }) => <span key={label} data-selected={active === label}><NavIcon size={14} aria-hidden />{label}</span>)}
          </div>
        </aside>
        <div className={`${styles.main} ${styles.reveal}`}>{children}</div>
      </div>
      <figcaption className={styles.actionCaption}><MousePointer2 size={16} aria-hidden /><span>{action}</span></figcaption>
    </figure>
  );
}

function MockAction({ children, secondary = false, highlight = false }: { children: ReactNode; secondary?: boolean; highlight?: boolean }) {
  return <span className={`${styles.mockButton} ${secondary ? styles.secondary : ""} ${highlight ? styles.actionFocus : ""}`}>{children}</span>;
}

function Badge({ children, tone }: { children: ReactNode; tone?: "success" | "risk" }) {
  return <span className={styles.badge} data-tone={tone}>{children}</span>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <div className={styles.field}><span>{label}</span><div>{children}</div></div>;
}

function ReportDocument({ title, description }: { title: string; description: string }) {
  return <div className={`${styles.report} ${styles.stagger}`}><FileText size={36} aria-hidden /><div><Badge>PDF</Badge><strong>{title}</strong><p>{description}</p><div className={styles.reportLines} aria-hidden><i /><i /><i /></div></div></div>;
}

const CLOUD_TITLES: Record<CloudScreen, string> = {
  providers: "Providers", scans: "Scans", overview: "Overview", findings: "Findings",
  compliance: "Compliance", "attack-paths": "Attack Paths", "cloud-report": "Scans",
};

export function CloudWorkflowScreen({ screen, action }: { screen: CloudScreen; action: string }) {
  return (
    <ProductFrame product="Cloud Security" screen={screen} active={CLOUD_TITLES[screen]} navigation={CLOUD_NAV} action={action}>
      <div className={styles.screenHeading}>
        <div><h4>{CLOUD_TITLES[screen]}</h4><p className={styles.muted}>Example AWS account / {screen === "scans" ? "Assessment in progress" : "Illustrative account"}</p></div>
        {screen === "providers" && <MockAction secondary><Plus size={12} aria-hidden />Add Provider</MockAction>}
        {screen === "scans" && <MockAction highlight><Play size={12} aria-hidden />Launch scan</MockAction>}
        {screen === "cloud-report" && <Badge tone="success"><Check size={11} aria-hidden />Completed</Badge>}
      </div>

      {screen === "providers" && (
        <div className={styles.surface}>
          <div className={styles.productTabs}><span>Connect Account</span><span>Credentials</span><span>Validate Connection</span><span data-selected="true">Launch Scan</span></div>
          <div className={styles.providerChoices}>
            {[["AWS", "logos:aws"], ["Azure", "logos:microsoft-azure"], ["Google Cloud", "logos:google-cloud"]].map(([label, icon]) => (
              <span key={label}><span className={styles.providerLogo}><Icon icon={icon} width={22} height={18} aria-hidden /></span>{label}</span>
            ))}
          </div>
          <div className={styles.fieldGrid}>
            <Field label="Provider alias">Example AWS account</Field>
            <Field label="Connection method">AWS role<LockKeyhole size={13} aria-hidden /></Field>
          </div>
          <div className={`${styles.formFooter} ${styles.stagger}`}>
            <Badge tone="success"><Check size={12} aria-hidden />Provider Connected!</Badge>
            <MockAction highlight>Launch scan<ArrowRight size={12} aria-hidden /></MockAction>
          </div>
          <p className={styles.muted} style={{ marginTop: 14 }}>Authorization is configured in the provider wizard. No credentials are entered in this illustration.</p>
        </div>
      )}
      {screen === "scans" && (
        <>
          <div className={styles.filters}><span>Provider: Example AWS account<ChevronDown size={11} aria-hidden /></span><span>Scan jobs</span></div>
          <table className={styles.table}><thead><tr><th>Scan name</th><th>Provider</th><th>State</th></tr></thead><tbody><tr><td><strong>Account security review</strong></td><td>AWS</td><td><Badge>Executing</Badge></td></tr></tbody></table>
          <div className={`${styles.surface} ${styles.stagger}`} style={{ marginTop: 18 }}>
            <h5>Account security review</h5>
            <div className={styles.scanState}><span className={styles.scanDot} />Scan in progress</div>
            <div className={styles.progressTrack}><span /></div>
            <p className={styles.muted}>Scan-job state updates in the dashboard. Results can be reviewed once the scan completes.</p>
          </div>
        </>
      )}
      {screen === "overview" && (
        <>
          <div className={styles.filters}><span>Account: Example AWS account<ChevronDown size={11} aria-hidden /></span><span>Latest completed scan</span></div>
          <div className={styles.cards}>
            {[["Passed findings", "18"], ["Failed findings", "6"], ["Resources", "12"]].map(([label, value]) => <div className={styles.metric} key={label}><span>{label}</span><strong>{value}</strong></div>)}
          </div>
          <div className={`${styles.split} ${styles.stagger}`}>
            <div className={styles.surface}><h5>Risk severity</h5><div className={styles.detailList}><div><Badge tone="risk">High / 2</Badge></div><div><Badge>Medium / 4</Badge></div></div><div className={styles.progressTrack}><span /></div><p className={styles.muted}>Sample findings, grouped by severity.</p></div>
            <div className={styles.surface}><h5>Compliance watchlist</h5><div className={styles.checkList}><div><ShieldCheck size={14} aria-hidden /><span>CIS AWS Foundations</span></div><div><ListChecks size={14} aria-hidden /><span>Requirements needing attention</span></div></div><p className={styles.muted}>Open the framework to review its results.</p></div>
          </div>
          <p className={styles.muted} style={{ marginTop: 14 }}>Overview also includes ThreatScore, service watchlists, attack surface, and findings over time.</p>
        </>
      )}
      {screen === "findings" && (
        <>
          <div className={styles.filters}><span><Search size={11} aria-hidden />Findings</span><span>Severity: High</span><span>Status: FAIL</span><span>Service: S3</span></div>
          <div className={styles.split}>
            <div><table className={styles.table}><thead><tr><th>Finding group</th><th>Severity</th></tr></thead><tbody><tr data-selected="true"><td>Storage allows public read access</td><td>High</td></tr></tbody></table><p className={styles.muted} style={{ marginTop: 12 }}>Select a finding group to inspect its details.</p></div>
            <div className={`${styles.surface} ${styles.stagger}`}><h5>Finding details</h5><dl className={styles.detailList}><div><dt>Status</dt><dd><Badge tone="risk">FAIL</Badge></dd></div><div><dt>Affected resource</dt><dd>example-storage / AWS S3</dd></div><div><dt>Risk</dt><dd>Unintended public access to stored data.</dd></div><div><dt>Remediation</dt><dd>Review the bucket policy and restrict unintended public access.</dd></div></dl></div>
          </div>
        </>
      )}
      {screen === "compliance" && (
        <>
          <div className={styles.filters}><span>Scan: Account security review<ChevronDown size={11} aria-hidden /></span><span>Region: All</span></div>
          <div className={styles.surface}><h5>CIS AWS Foundations</h5><p className={styles.muted}>Framework results / example completed scan</p><div className={styles.cards} style={{ marginTop: 15, marginBottom: 0 }}>{[["Passed", "18"], ["Failed", "6"], ["Manual", "2"]].map(([label, count]) => <div className={styles.metric} key={label}><span>{label}</span><strong>{count}</strong></div>)}</div></div>
          <div className={`${styles.surface} ${styles.stagger}`} style={{ marginTop: 14 }}><h5>Requirements needing attention</h5><div className={styles.checkList}><div><LockKeyhole size={14} aria-hidden /><span>Review storage access controls and their linked findings.</span></div><div><ListChecks size={14} aria-hidden /><span>Keep requirements that need manual review in scope.</span></div></div><MockAction secondary><Download size={12} aria-hidden />Download PDF report</MockAction></div>
        </>
      )}
      {screen === "attack-paths" && (
        <>
          <div className={styles.fieldGrid}><Field label="Attack-path scan">Example AWS account / Completed</Field><Field label="Query">Internet-Exposed EC2 with Sensitive S3 Access<ChevronDown size={12} aria-hidden /></Field></div>
          <div className={styles.formFooter}><p className={styles.muted}>Select an available query, review its parameters, then execute it.</p><MockAction highlight><Play size={12} aria-hidden />Execute Query</MockAction></div>
          <div className={`${styles.graph} ${styles.stagger}`} aria-label="Example cloud resource relationships">
            <div className={styles.graphNode}><Globe size={22} aria-hidden /><span>Internet</span></div><ArrowRight size={17} aria-hidden />
            <div className={styles.graphNode}><Cloud size={22} aria-hidden /><span>Exposed server / EC2</span></div><ArrowRight size={17} aria-hidden />
            <div className={styles.graphNode}><Layers size={22} aria-hidden /><span>Sensitive storage / S3</span></div>
          </div>
          <p className={styles.muted}>Simplified example graph. Available queries and relationships depend on the provider and its graph-ready scan.</p>
        </>
      )}
      {screen === "cloud-report" && (
        <>
          <table className={styles.table}><thead><tr><th>Scan name</th><th>State</th><th>Actions</th></tr></thead><tbody><tr><td>Account security review</td><td><Badge tone="success">Completed</Badge></td><td><MockAction secondary highlight><Download size={12} aria-hidden />Reports</MockAction></td></tr></tbody></table>
          <div className={styles.split} style={{ marginTop: 18 }}>
            <div className={styles.surface}><h5>Scan report actions</h5><div className={styles.exportOptions}>{["Download Executive PDF", "Download Full PDF Report", "Download Scan Reports", "Share Report over Email"].map(label => <span key={label}><FileText size={13} aria-hidden />{label}</span>)}</div></div>
            <ReportDocument title="Executive report" description="A shareable overview of the completed cloud assessment. Full reports and scan exports are available from the same menu." />
          </div>
        </>
      )}
    </ProductFrame>
  );
}

function Composer() {
  return <div className={styles.composer}><span>Describe your authorized assessment...</span><Send size={14} aria-hidden /></div>;
}

function PhaseStrip() {
  return <div className={styles.surface}><h5>Attack chain progress</h5><div className={styles.filters} style={{ marginBottom: 0 }}><span><Check size={11} aria-hidden />Reconnaissance</span><span><i className={styles.scanDot} />Enumeration</span><span>Vulnerability scan</span></div></div>;
}

export function PentestWorkflowScreen({ screen, action }: { screen: PentestScreen; action: string }) {
  return (
    <ProductFrame product="Agentic Workspace" screen={screen} active="Run Scan" navigation={PENTEST_NAV} action={action}>
      <div className={styles.screenHeading}><div><h4>Vrika | Agentic Workspace</h4><p className={styles.muted}>Authorized assessment / app.example.com</p></div>{screen === "pentest-report" && <MockAction highlight><Download size={12} aria-hidden />Download PDF Report</MockAction>}</div>

      {screen === "workspace" && (
        <>
          <div className={styles.surface}><h5>Intelligent Attack Chain</h5><p className={styles.muted}>Configure the target and preview the proposed assessment before starting a session.</p><div className={styles.formFooter}><Badge>120+ security tools</Badge><MockAction highlight>Configure &amp; preview<ArrowRight size={12} aria-hidden /></MockAction></div></div>
          <div className={`${styles.surface} ${styles.stagger}`} style={{ marginTop: 18 }}><h5>Or describe your objective</h5><p>Assess my authorized web application at app.example.com. Stay within this target and avoid destructive actions.</p><div className={styles.formFooter}><MockAction secondary><Wrench size={12} aria-hidden />Open tool picker</MockAction><MockAction secondary>Ask permission<ChevronDown size={12} aria-hidden /></MockAction><MockAction><Send size={12} aria-hidden />Send</MockAction></div></div>
        </>
      )}
      {screen === "attack-chain" && (
        <div className={styles.surface}>
          <h5>Intelligent Attack Chain</h5>
          <div className={styles.fieldGrid}><Field label="Target *">app.example.com</Field><Field label="Custom prompt (optional)">Authorized, non-destructive assessment</Field></div>
          <div className={styles.formFooter}><MockAction secondary>Preview Attack Chain</MockAction><Badge>AI-planned</Badge></div>
          <div className={styles.stagger} style={{ marginTop: 18 }}><h5>Preview - review before starting</h5><table className={styles.table}><thead><tr><th>Phase</th><th>Tool</th></tr></thead><tbody>{[["Reconnaissance", "Subfinder"], ["Enumeration", "Nmap"], ["Vulnerability scan", "Nuclei"]].map(([phase, tool]) => <tr key={phase}><td>{phase}</td><td>{tool}</td></tr>)}</tbody></table><p className={styles.muted} style={{ marginTop: 10 }}>Example tool selection. The preview also describes likely attack paths, risk, and estimated time.</p></div>
          <div className={styles.toolActions}><MockAction highlight><Play size={12} aria-hidden />Start Session</MockAction><MockAction secondary>Cancel</MockAction></div>
        </div>
      )}
      {screen === "execution-mode" && (
        <div className={styles.chatLayout}>
          <div><div className={styles.message} data-speaker="you"><span><MessageSquare size={13} aria-hidden />Your assessment</span><p>Assess app.example.com within the authorized scope.</p></div><Composer /><div className={styles.toolActions}><MockAction secondary><Wrench size={12} aria-hidden />Open tool picker</MockAction><MockAction highlight>Tools<ChevronDown size={12} aria-hidden /></MockAction></div></div>
          <aside className={`${styles.surface} ${styles.stagger}`}><h5>Tools</h5><div className={styles.insightList}><div><strong><Check size={12} style={{ display: "inline" }} aria-hidden /> Ask permission</strong><p>Confirm tools before they run</p></div><div><strong>Auto accept</strong><p>Runs tools immediately (tenant admins only)</p></div></div></aside>
        </div>
      )}
      {screen === "approval" && (
        <>
          <div className={styles.toolCard}><div className={styles.toolHeader}><Bot size={15} aria-hidden />Tool batch<Badge>3 / 3 decided</Badge></div><div className={styles.toolBody}><p className={styles.muted}>Approve or reject each row, then Execute batch</p><div className={styles.toolActions}><MockAction secondary>Approve all</MockAction><MockAction secondary>Reject all</MockAction></div><table className={styles.table} style={{ marginTop: 13 }}><thead><tr><th>Tool</th><th>Target</th><th>Decision</th></tr></thead><tbody>{["Subfinder", "Nmap", "Nuclei"].map(tool => <tr key={tool}><td>{tool}</td><td>app.example.com</td><td><Badge tone="success">Approved</Badge></td></tr>)}</tbody></table><div className={styles.formFooter}><span className={styles.muted}>Full arguments are reviewable per tool.</span><MockAction highlight><Play size={12} aria-hidden />Execute batch</MockAction></div></div></div>
          <p className={styles.muted} style={{ marginTop: 12 }}>Running approved tools requires the tenant administrator role.</p><Composer />
        </>
      )}
      {screen === "execution" && (
        <div className={styles.thread}>
          <div className={styles.toolCard}><div className={styles.toolHeader}><Terminal size={15} aria-hidden />Tool execution / Nmap<Badge>Running</Badge></div><div className={styles.toolBody}><div className={styles.scanState}><span className={styles.scanDot} />Reviewing the approved target</div><div className={`${styles.console} ${styles.stagger}`} style={{ marginTop: 12 }}><span>Target: app.example.com</span><span>Execution status: running</span><span>Progress and tool output appear here.</span></div><p className={styles.muted} style={{ marginTop: 9 }}>Illustrative log, not a live tool result.</p></div></div>
          <PhaseStrip /><Composer />
        </div>
      )}
      {screen === "pentest-report" && (
        <>
          <div className={styles.split}>
            <div className={styles.surface}><h5>Report attachment</h5><Badge>PDF</Badge><p style={{ marginTop: 10 }}>Penetration Testing Report / app.example.com</p><div className={styles.toolActions}><MockAction secondary><Download size={12} aria-hidden />Download</MockAction></div><p className={styles.muted} style={{ marginTop: 13 }}>Open the attachment to preview the PDF.</p></div>
            <ReportDocument title="Penetration Testing Report" description="app.example.com / PDF preview. Inspect the report, download it, or open it in a new tab." />
          </div>
          <div className={`${styles.surface} ${styles.stagger}`} style={{ marginTop: 16 }}><h5>Session Intelligence</h5><div className={styles.filters} style={{ marginBottom: 0 }}>{["Overview", "Tools Used", "Targets", "Findings Summary", "Evidence", "Timeline"].map(label => <span key={label}>{label}</span>)}</div><p className={styles.muted} style={{ marginTop: 10 }}>Available separately for reviewing session findings and history.</p></div>
        </>
      )}
    </ProductFrame>
  );
}
