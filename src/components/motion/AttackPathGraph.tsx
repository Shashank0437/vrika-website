"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Database, Globe2, KeyRound, Pause, Play, ShieldCheck } from "lucide-react";
import { useReducedMotion } from "./useReducedMotion";
import styles from "./AttackPathGraph.module.css";

const STEPS = [
  {
    label: "Your application",
    caption: "Where a risk could begin",
    Icon: Globe2,
    action: "Find the entry point",
    explanation: "See which applications are exposed, so you know where to start looking.",
  },
  {
    label: "Access permissions",
    caption: "How that risk could spread",
    Icon: KeyRound,
    action: "Spot the weak link",
    explanation: "Understand when unnecessary access could let a small issue reach further.",
  },
  {
    label: "Sensitive data",
    caption: "What you need to protect",
    Icon: Database,
    action: "Protect what matters",
    explanation: "Prioritize the fixes that help keep your important information out of reach.",
  },
] as const;

export function AttackPathGraph({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(0);
  const descriptionId = useId();
  const running = visible && pageVisible && !paused && !reducedMotion;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (observer) observer.observe(el);
    else setVisible(true);
    const onVisibility = () => setPageVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % STEPS.length), 2800);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <div ref={root} className={`${styles.root} ${className}`} data-running={running}>
      <div className={styles.heading}>
        <span className={styles.headingIcon}><ShieldCheck size={20} aria-hidden /></span>
        <div>
          <h4>A clearer picture of your risk</h4>
          <p>Follow the connections. Know where to act.</p>
        </div>
      </div>

      <ol className={styles.journey} aria-label="How a risk can reach your data">
        {STEPS.map(({ label, caption, Icon }, index) => (
          <li key={label} className={styles.step} data-reached={reducedMotion || index <= active}>
            <button
              type="button"
              className={styles.stepButton}
              aria-pressed={selected === index}
              aria-controls={descriptionId}
              onClick={() => { setSelected(index); setActive(index); setPaused(true); }}
            >
              <span className={styles.stepIcon}><Icon size={24} strokeWidth={1.7} aria-hidden /></span>
              <span className={styles.stepText}>
                <strong>{label}</strong>
                <span>{caption}</span>
              </span>
            </button>
            {index < STEPS.length - 1 ? <span className={styles.connector} aria-hidden><ArrowRight size={16} /></span> : null}
          </li>
        ))}
      </ol>

      <div id={descriptionId} className={styles.takeaway} aria-live="polite" aria-atomic="true">
        <ShieldCheck size={21} aria-hidden />
        <div>
          <h5>{STEPS[selected].action}</h5>
          <p>{STEPS[selected].explanation}</p>
        </div>
      </div>
      <div className={styles.bottomRow}>
        <p>An illustrative example, not a live assessment.</p>
        {!reducedMotion && (
          <button type="button" className={styles.motionButton} onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play risk journey animation" : "Pause risk journey animation"}>
            {paused ? <Play size={13} aria-hidden /> : <Pause size={13} aria-hidden />}
            {paused ? "Play" : "Pause"}
          </button>
        )}
      </div>
    </div>
  );
}
