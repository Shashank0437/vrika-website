"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Check, FileCheck2, Fingerprint, LockKeyhole, Network, Radar, ShieldCheck } from "lucide-react";

const PHASES = [
  { label: "Discover", icon: Radar, title: "See your attack surface", detail: "Map exposed assets across applications, infrastructure, and cloud.", status: "Asset discovery", result: "External assets mapped", nodes: ["Application", "API gateway", "Cloud assets"] },
  { label: "Validate", icon: Network, title: "Connect the attack paths", detail: "Correlate findings and validate weaknesses with orchestrated security tools.", status: "Path validation", result: "Findings correlated", nodes: ["Entry point", "Lateral path", "Critical asset"] },
  { label: "Govern", icon: LockKeyhole, title: "Keep operators in control", detail: "Review planned actions, approve sensitive steps, and retain an audit trail.", status: "Approval required", result: "Operator review gate", nodes: ["Scoped target", "Approval gate", "Audit trail"] },
  { label: "Report", icon: FileCheck2, title: "Turn findings into action", detail: "Bring prioritized risk and remediation guidance into executive and technical reports.", status: "Reporting", result: "Remediation guidance", nodes: ["Evidence", "Prioritized risk", "Report"] },
] as const;

export function SecurityShowcase() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const phase = PHASES[active];

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function select(index: number, focus = false) {
    setActive(index);
    if (focus) tabs.current[index]?.focus();
  }

  return (
    <div ref={ref} className={`security-scene ${inView ? "is-in-view" : ""}`}>
      <div className="scene-orbit scene-orbit-one" aria-hidden />
      <div className="scene-orbit scene-orbit-two" aria-hidden />
      <div className="security-console">
        <div className="console-header">
          <div className="flex items-center gap-2.5">
            <span className="console-brand"><ShieldCheck size={18} aria-hidden /></span>
            <span className="font-semibold">VRIKA <span className="font-normal text-on-surface-variant">/ Workspace</span></span>
          </div>
          <span className="console-demo-label">Interactive preview</span>
        </div>
        <div className="console-body">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="console-eyebrow">Offensive security workflow</span>
            <span className="console-scope"><span /> Scoped assessment</span>
          </div>
          <div className="console-objective">
            <span className="console-prompt"><Fingerprint size={20} aria-hidden /></span>
            <div><span className="console-eyebrow">Assessment objective</span><p>Assess app.example.com</p></div>
            <ArrowUpRight size={18} className="ml-auto shrink-0 text-primary" aria-hidden />
          </div>
          <div className="workflow-tabs" role="tablist" aria-label="Explore the security workflow">
            {PHASES.map((item, index) => (
              <button
                key={item.label}
                ref={(el) => { tabs.current[index] = el; }}
                id={`${id}-tab-${index}`}
                type="button"
                role="tab"
                tabIndex={active === index ? 0 : -1}
                aria-selected={active === index}
                aria-controls={`${id}-panel`}
                onClick={() => select(index)}
                onKeyDown={(event) => {
                  const next = event.key === "ArrowRight" ? (active + 1) % PHASES.length
                    : event.key === "ArrowLeft" ? (active + PHASES.length - 1) % PHASES.length
                    : event.key === "Home" ? 0 : event.key === "End" ? PHASES.length - 1 : null;
                  if (next !== null) { event.preventDefault(); select(next, true); }
                }}
              >
                <item.icon size={17} aria-hidden /><span>{item.label}</span>
              </button>
            ))}
          </div>
          <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} tabIndex={0}>
            <div className="console-map" aria-hidden>
              <div className="map-grid" />
              <svg viewBox="0 0 480 180" className="map-paths" fill="none">
                <path d="M75 42 C145 42 145 90 240 90 M75 138 C145 138 145 90 240 90 M240 90 C330 90 330 42 405 42 M240 90 C330 90 330 138 405 138" />
                <path className="map-signal" d="M75 42 C145 42 145 90 240 90 M240 90 C330 90 330 138 405 138" />
              </svg>
              <span className="map-endpoint endpoint-one"><Network size={17} /></span>
              <span className="map-endpoint endpoint-two"><Radar size={17} /></span>
              <span className="map-core"><ShieldCheck size={32} /></span>
              <span className="map-endpoint endpoint-three"><LockKeyhole size={17} /></span>
              <span className="map-endpoint endpoint-four"><FileCheck2 size={17} /></span>
              <span className="map-caption caption-one">{phase.nodes[0]}</span>
              <span className="map-caption caption-two">{phase.nodes[1]}</span>
              <span className="map-caption caption-three">{phase.nodes[2]}</span>
            </div>
            <div key={active} className="console-result">
              <div className="flex items-center justify-between gap-3">
                <h2>{phase.title}</h2>
                <span className="console-step">0{active + 1} / 04</span>
              </div>
              <p>{phase.detail}</p>
              <div className="console-result-line"><Check size={14} aria-hidden />{phase.result}<span>{phase.status}</span></div>
            </div>
          </div>
        </div>
        <div className="console-footer"><LockKeyhole size={13} aria-hidden /><span>Approval-based execution</span><span>Illustrative data</span></div>
      </div>
      <div className="scene-note"><ShieldCheck size={20} aria-hidden /><div><strong>Autonomous. Not unsupervised.</strong><span>Human approval at the critical steps.</span></div></div>
    </div>
  );
}
