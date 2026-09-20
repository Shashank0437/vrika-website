"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Database, Globe2, KeyRound, Pause, Play, ScanLine, Server, ShieldAlert } from "lucide-react";
import { useReducedMotion } from "./useReducedMotion";
import styles from "./AttackPathGraph.module.css";

const NODES = [
  {
    id: "internet", name: "Internet", type: "Internet", category: "network", Icon: Globe2,
    badge: "Entry point", x: 13, y: 28, mobileX: 25, mobileY: 12,
    description: "The external entry point in this example. Network reachability alone does not establish an exploit.",
    relationship: "CAN_REACH → demo-web", context: "Public HTTPS · TCP 443",
  },
  {
    id: "compute", name: "demo-web", type: "EC2Instance", category: "compute", Icon: Server,
    badge: "Exposed", x: 38, y: 28, mobileX: 75, mobileY: 12,
    description: "An illustrative internet-facing workload. Its attached identity links network exposure to cloud permissions.",
    relationship: "ASSUMES → demo-app-role", context: "EC2 workload · example environment",
  },
  {
    id: "identity", name: "demo-app-role", type: "IAMRole", category: "identity", Icon: KeyRound,
    badge: "1 finding", x: 63, y: 28, mobileX: 75, mobileY: 44,
    description: "This example role can read the illustrated bucket. A linked finding flags broader access than the workload needs.",
    relationship: "CAN_ACCESS → demo-records", context: "Illustrative permission · s3:GetObject",
  },
  {
    id: "storage", name: "demo-records", type: "S3Bucket", category: "storage", Icon: Database,
    badge: "Target resource", x: 88, y: 28, mobileX: 25, mobileY: 44,
    description: "A private example bucket reachable through the workload's role—not a publicly accessible bucket.",
    relationship: "demo-app-role → CAN_ACCESS", context: "Potential impact · object data access",
  },
  {
    id: "finding", name: "Broad data access", type: "ProwlerFinding", category: "finding", Icon: ShieldAlert,
    badge: "Critical · example", x: 63, y: 75, mobileX: 50, mobileY: 79,
    description: "An illustrative critical finding linked to the IAM role. Review its access scope and restrict permissions to required objects.",
    relationship: "demo-app-role → HAS_FINDING", context: "Example finding · status FAIL",
  },
] as const;

const EDGES = [
  { id: "reach", source: "internet", target: "compute", label: "CAN_REACH", desktop: "M 108 84 L 198 84", mobile: "M 108 50.4 L 212 50.4", x: 25.5, y: 19, mobileX: 50, mobileY: 5 },
  { id: "assume", source: "compute", target: "identity", label: "ASSUMES", desktop: "M 258 84 L 348 84", mobile: "M 240 128 L 240 156", x: 50.5, y: 19, mobileX: 75, mobileY: 32 },
  { id: "access", source: "identity", target: "storage", label: "CAN_ACCESS", desktop: "M 408 84 L 498 84", mobile: "M 212 184.8 L 108 184.8", x: 75.5, y: 19, mobileX: 50, mobileY: 37 },
  { id: "finding", source: "identity", target: "finding", label: "HAS_FINDING", desktop: "M 378 160 L 378 197", mobile: "M 240 264 C 240 294 160 288 160 303.8", x: 63, y: 56, mobileX: 62, mobileY: 66 },
] as const;

const STAGES = ["Tracing network reachability", "Following the workload identity", "Checking access to data", "Example path traced"];

function position(item: { x: number; y: number; mobileX: number; mobileY: number }): CSSProperties {
  return {
    "--x": `${item.x}%`, "--y": `${item.y}%`,
    "--mobile-x": `${item.mobileX}%`, "--mobile-y": `${item.mobileY}%`,
  } as CSSProperties;
}

/** A sanitized, interactive sample of the product's resource-and-finding graph. */
export function AttackPathGraph({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const reducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedId, setSelectedId] = useState<string>("identity");
  const selected = NODES.find((node) => node.id === selectedId) ?? NODES[2];
  const SelectedIcon = selected.Icon;
  const activeStep = reducedMotion ? 3 : step;
  const running = !reducedMotion && inView && pageVisible && !paused;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onVisibility = () => setPageVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    if (observer) observer.observe(el);
    else setInView(true);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setStep((current) => (current + 1) % STAGES.length), 1800);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <div ref={ref} className={`${styles.root} ${className}`} data-running={running} data-reduced-motion={reducedMotion}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarTitle}>
          <span className={styles.toolbarIcon}><ScanLine size={17} aria-hidden="true" /></span>
          <div><strong>Attack path explorer</strong><span>AWS · illustrative environment</span></div>
        </div>
        <span className={styles.sampleBadge}>Sample graph</span>
      </div>

      <div className={styles.canvas} role="group" aria-label="Interactive illustrative attack path. Select a resource to inspect it.">
        {(["desktop", "mobile"] as const).map((layout) => (
          <svg
            key={layout}
            viewBox={layout === "desktop" ? "0 0 600 300" : "0 0 320 420"}
            preserveAspectRatio="none"
            className={layout === "desktop" ? styles.desktopEdges : styles.mobileEdges}
            aria-hidden="true"
          >
            <defs>
              <marker id={`${id}-${layout}-arrow`} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 1 1 L 6 4 L 1 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </marker>
            </defs>
            {EDGES.map((edge, index) => {
              const finding = edge.id === "finding";
              const traversed = !finding && index <= activeStep;
              return (
                <g key={edge.id} className={finding ? styles.findingEdge : traversed ? styles.traversedEdge : styles.edge}>
                  <path
                    d={edge[layout]}
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    markerEnd={`url(#${id}-${layout}-arrow)`}
                  />
                  {!reducedMotion && index === activeStep && !finding ? (
                    <path
                      key={`${edge.id}-${activeStep}`}
                      d={edge[layout]}
                      fill="none"
                      pathLength="1"
                      vectorEffect="non-scaling-stroke"
                      className={styles.traveler}
                    />
                  ) : null}
                </g>
              );
            })}
          </svg>
        ))}

        {EDGES.map((edge, index) => (
          <span key={edge.id} className={styles.edgeLabel} data-active={index === activeStep} style={position(edge)}>
            {edge.label}
          </span>
        ))}
        {NODES.map((node, index) => {
          const Icon = node.Icon;
          const isSelected = selectedId === node.id;
          return (
            <button
              key={node.id}
              type="button"
              className={styles.node}
              style={position(node)}
              data-category={node.category}
              data-selected={isSelected}
              data-reached={index <= activeStep + 1 && node.id !== "finding"}
              aria-pressed={isSelected}
              aria-controls={`${id}-inspector`}
              aria-label={`Inspect ${node.name}, ${node.type}, ${node.badge}`}
              onClick={() => { setSelectedId(node.id); setPaused(true); }}
            >
              <span className={styles.nodeIcon}><Icon size={21} strokeWidth={1.8} aria-hidden="true" /></span>
              <span className={styles.nodeName}>{node.name}</span>
              <span className={styles.nodeType}>{node.type === "ProwlerFinding" ? "Finding" : node.type}</span>
              <span className={styles.nodeBadge}>{node.badge}</span>
            </button>
          );
        })}
        <span className={styles.canvasNote}>Select a node to inspect</span>
      </div>

      <div className={styles.traversal}>
        <div className={styles.stage}>
          <span className={styles.stepNumber}>{String(Math.min(activeStep + 1, 3)).padStart(2, "0")} / 03</span>
          <span>{STAGES[activeStep]}</span>
        </div>
        <button
          type="button"
          className={styles.playButton}
          disabled={reducedMotion}
          aria-label={reducedMotion ? "Traversal animation disabled by reduced motion preference" : paused ? "Play path traversal" : "Pause path traversal"}
          onClick={() => setPaused((value) => !value)}
        >
          {paused || reducedMotion ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
          {reducedMotion ? "Static" : paused ? "Play" : "Pause"}
        </button>
      </div>

      <div className={styles.legend} aria-label="Graph legend">
        <span><i className={styles.resourceKey} aria-hidden="true" /> Resource</span>
        <span><i className={styles.pathKey} aria-hidden="true" /> Access path</span>
        <span><i className={styles.findingKey} aria-hidden="true" /> Linked finding</span>
      </div>

      <div id={`${id}-inspector`} className={styles.inspector} aria-live="polite" aria-atomic="true">
        <div className={styles.inspectorHeading}>
          <span className={styles.inspectorIcon}><SelectedIcon size={18} aria-hidden="true" /></span>
          <div><span className={styles.eyebrow}>Node inspector</span><strong>{selected.name}</strong></div>
          <code>{selected.type}</code>
        </div>
        <p>{selected.description}</p>
        <div className={styles.inspectorMeta}>
          <span><ArrowRight size={12} aria-hidden="true" />{selected.relationship}</span>
          <span>{selected.context}</span>
        </div>
      </div>
      <p className={styles.disclaimer}>Illustrative relationships and severity. Not a live scan or a confirmed exploit.</p>
    </div>
  );
}
