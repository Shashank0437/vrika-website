import { ArrowDown, ArrowRight, Bot, Check, Cloud, FileCheck2, Fingerprint, GitBranch, Layers, LockKeyhole, Network, ScanLine, ShieldCheck, Terminal, UserCheck } from "lucide-react";
import type { PlatformModule } from "@/components/landing/landing-data";

const GOVERNANCE_HIGHLIGHTS = [
  { icon: Layers, label: "Multi-tenant isolation" },
  { icon: UserCheck, label: "Role-based access" },
  { icon: ShieldCheck, label: "Approval gates" },
  { icon: FileCheck2, label: "Full audit trails" },
  { icon: Fingerprint, label: "SSO / SAML" },
  { icon: Cloud, label: "Cloud or on-premise" },
] as const;

export function ModuleVisual({ module: platformModule }: { module: PlatformModule }) {
  return (
    <figure className="module-art" aria-label={`${platformModule.title} illustrated workflow`}>
      <div className="module-art-header">
        <span className="module-art-mark"><ShieldCheck size={17} aria-hidden /></span>
        <span>{platformModule.title}</span>
        <span className="module-art-tag">Illustration</span>
      </div>
      <div className="module-art-canvas">
        {platformModule.id === "module-workspace" && (
          <div className="workspace-art">
            <div className="art-message art-message-user"><span className="art-avatar"><UserCheck size={17} aria-hidden /></span><div><small>Operator objective</small><p>Assess app.example.com</p></div></div>
            <div className="art-message"><span className="art-avatar art-avatar-ai"><Bot size={17} aria-hidden /></span><div><small>VRIKA workspace</small><p>Assessment plan ready for review.</p></div></div>
            <ol className="art-plan">
              {["Discover exposed assets", "Enumerate services", "Validate findings"].map((label, index) => (
                <li key={label} style={{ animationDelay: `${index * 160}ms` }}><span>0{index + 1}</span>{label}<Check size={14} aria-hidden /></li>
              ))}
            </ol>
            <div className="art-approval"><LockKeyhole size={17} aria-hidden /><span>Human approval before execution</span><ShieldCheck size={17} aria-hidden /></div>
            <div className="art-compose"><span>Describe your security objective…</span><ArrowRight size={17} aria-hidden /></div>
          </div>
        )}
        {platformModule.id === "module-orchestration" && (
          <div className="orchestration-art">
            <div className="art-objective"><Fingerprint size={17} aria-hidden /><span>Target + objective</span></div>
            <div className="art-connector" aria-hidden><ArrowDown size={16} /></div>
            <div className="art-engine"><span className="engine-icon"><Bot size={29} aria-hidden /></span><div><strong>VRIKA orchestration</strong><small>Plan → select → execute → adapt</small></div><GitBranch size={20} aria-hidden /></div>
            <div className="art-tool-branches">
              {[{ icon: ScanLine, label: "Recon" }, { icon: Network, label: "Enumeration" }, { icon: ShieldCheck, label: "Validation" }].map((item) => (
                <div key={item.label}><span className="branch-line" aria-hidden /><item.icon size={22} aria-hidden /><span>{item.label}</span></div>
              ))}
            </div>
            <div className="art-tool-labels">{["Nmap", "Nuclei", "Subfinder", "120+ tools"].map((tool) => <span key={tool}>{tool}</span>)}</div>
            <div className="art-approval"><Terminal size={16} aria-hidden /><span>Live results inform the next action</span><ArrowRight size={16} aria-hidden /></div>
          </div>
        )}
        {platformModule.id === "module-cloud" && (
          <div className="cloud-art">
            <div className="cloud-providers">{["AWS", "Azure", "Google Cloud"].map((provider) => <span key={provider}><Cloud size={18} aria-hidden />{provider}</span>)}</div>
            <div className="cloud-art-heading"><div><small>Posture management</small><strong>One view. Every environment.</strong></div><span className="cloud-scan-icon"><ScanLine size={24} aria-hidden /></span></div>
            <div className="cloud-checks">
              {[{ title: "Identity & access", status: "Review permissions", icon: Fingerprint }, { title: "Storage exposure", status: "Validate configuration", icon: Layers }, { title: "Network boundaries", status: "Trace attack paths", icon: Network }].map((item) => (
                <div key={item.title}><item.icon size={17} aria-hidden /><span>{item.title}</span><small>{item.status}</small></div>
              ))}
            </div>
            <div className="art-frameworks"><span>CIS</span><span>NIST</span><span>ISO 27001</span><span>SOC 2</span></div>
            <div className="art-approval"><FileCheck2 size={16} aria-hidden /><span>Prioritized findings. Actionable guidance.</span></div>
          </div>
        )}
        {platformModule.id === "module-governance" && (
          <div className="governance-art">
            <div className="governance-core"><span><ShieldCheck size={35} aria-hidden /></span><strong>Security, with guardrails.</strong><small>Operator control at every critical step.</small></div>
            <div className="governance-controls">
              {GOVERNANCE_HIGHLIGHTS.map((item) => <div key={item.label}><item.icon size={17} aria-hidden /><span>{item.label}</span></div>)}
            </div>
            <div className="art-approval"><LockKeyhole size={16} aria-hidden /><span>Your data. Your deployment.</span></div>
          </div>
        )}
      </div>
      <figcaption>Illustrative product workflow · No live customer data</figcaption>
    </figure>
  );
}
