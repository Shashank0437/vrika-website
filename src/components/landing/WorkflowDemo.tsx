"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Cloud, LockKeyhole, MessageSquare, Pause, Play, RotateCcw, ShieldCheck } from "lucide-react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import type { Workflow } from "./workflow-data";
import { CloudWorkflowScreen, PentestWorkflowScreen } from "./WorkflowScreens";
import styles from "./WorkflowDemo.module.css";

const STEP_DURATION = 5000;

export function WorkflowDemo({ workflows }: { workflows: readonly Workflow[] }) {
  const [flowIndex, setFlowIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const elapsed = useRef(0);
  const id = useId();
  const reducedMotion = useReducedMotion();
  const flow = workflows[flowIndex];
  const step = flow.steps[stepIndex];
  const running = playing && inView && pageVisible && !reducedMotion;
  const lastStep = stepIndex === flow.steps.length - 1;
  const finished = lastStep && !playing && elapsed.current >= STEP_DURATION;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    if (observer) observer.observe(el);
    else setInView(true);
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
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      elapsed.current = Math.min(STEP_DURATION, elapsed.current + now - previous);
      previous = now;
      if (progress.current) progress.current.style.transform = `scaleX(${elapsed.current / STEP_DURATION})`;
      if (elapsed.current >= STEP_DURATION) {
        if (lastStep) setPlaying(false);
        else {
          elapsed.current = 0;
          if (progress.current) progress.current.style.transform = "scaleX(0)";
          setStepIndex((value) => value + 1);
        }
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, lastStep, stepIndex, flowIndex]);

  function resetProgress() {
    elapsed.current = 0;
    if (progress.current) progress.current.style.transform = "scaleX(0)";
  }

  function chooseFlow(index: number, focus = false) {
    resetProgress();
    setFlowIndex(index);
    setStepIndex(0);
    setPlaying(true);
    if (focus) tabs.current[index]?.focus();
  }

  function chooseStep(index: number) {
    resetProgress();
    setStepIndex(index);
    setPlaying(false);
  }

  function replay() {
    resetProgress();
    setStepIndex(0);
    setPlaying(true);
  }

  return (
    <div ref={root} className={styles.root} data-flow={flow.id} data-running={running}>
      <div className={styles.topbar}>
        <div role="tablist" aria-label="Choose a walkthrough" className={styles.tabs}>
          {workflows.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              ref={(el) => { tabs.current[index] = el; }}
              id={`${id}-tab-${index}`}
              aria-controls={`${id}-panel`}
              aria-selected={index === flowIndex}
              tabIndex={index === flowIndex ? 0 : -1}
              onClick={() => chooseFlow(index)}
              onKeyDown={(event) => {
                const next = event.key === "ArrowRight" ? (index + 1) % workflows.length
                  : event.key === "ArrowLeft" ? (index + workflows.length - 1) % workflows.length
                  : event.key === "Home" ? 0 : event.key === "End" ? workflows.length - 1 : null;
                if (next !== null) { event.preventDefault(); chooseFlow(next, true); }
              }}
            >
              {item.id === "cloud" ? <Cloud size={18} aria-hidden /> : <MessageSquare size={18} aria-hidden />}
              {item.name}
            </button>
          ))}
        </div>
        <span className={styles.exampleBadge}>Animated example · no live scans</span>
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${flowIndex}`} tabIndex={0}>
        <div className={styles.context}><ShieldCheck size={16} aria-hidden /><span>{flow.context}</span></div>
        <ol className={styles.timeline} aria-label={`${flow.name} steps`}>
          {flow.steps.map((item, index) => (
            <li key={item.label}>
              <button type="button" aria-current={index === stepIndex ? "step" : undefined} onClick={() => chooseStep(index)}>
                <span className={styles.stepNumber}>{index < stepIndex ? <Check size={14} aria-hidden /> : String(index + 1).padStart(2, "0")}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className={styles.controls}>
          <div className={styles.playback}>
            <button type="button" disabled={reducedMotion} onClick={() => finished ? replay() : setPlaying((value) => !value)} aria-label={finished ? "Replay walkthrough" : playing ? "Pause walkthrough" : "Play walkthrough"}>
              {finished ? <RotateCcw size={16} aria-hidden /> : playing && !reducedMotion ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
              {reducedMotion ? "Step-by-step" : finished ? "Replay" : playing ? "Pause" : "Play"}
            </button>
            <button type="button" onClick={replay} aria-label="Restart walkthrough"><RotateCcw size={15} aria-hidden /></button>
            <div className={styles.progress} aria-hidden><span ref={progress} /></div>
          </div>
          <div className={styles.navigation}>
            <button type="button" onClick={() => chooseStep(stepIndex - 1)} disabled={stepIndex === 0} aria-label="Previous step"><ArrowLeft size={16} aria-hidden /></button>
            <span>{String(stepIndex + 1).padStart(2, "0")} / {String(flow.steps.length).padStart(2, "0")}</span>
            <button type="button" onClick={() => chooseStep(stepIndex + 1)} disabled={lastStep} aria-label="Next step"><ArrowRight size={16} aria-hidden /></button>
          </div>
        </div>
        <div className={styles.stageHeading} aria-live={playing && !reducedMotion ? "off" : "polite"}>
          <span>Step {stepIndex + 1} of {flow.steps.length}</span>
          <h3>{step.title}</h3>
          <p>{step.summary}</p>
        </div>
        <div className={styles.workspace} key={`${flow.id}-${stepIndex}`}>
          {flow.id === "cloud"
            ? <CloudWorkflowScreen screen={flow.steps[stepIndex].screen} action={step.action} />
            : <PentestWorkflowScreen screen={flow.steps[stepIndex].screen} action={step.action} />}
        </div>
        <p className={styles.safeguard}><LockKeyhole size={14} aria-hidden />{flow.safeguard}</p>
      </div>
    </div>
  );
}
