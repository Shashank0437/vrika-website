"use client";

import { useEffect, useRef, useState } from "react";
import { MaterialSymbol } from "@/components/ui/MaterialSymbol";
import { useReducedMotion } from "./useReducedMotion";

type Line = { tag: string; text: string; tone: string };

const PROMPT = "Assess the external attack surface of app.example.com";

const LINES: Line[] = [
  { tag: "plan", text: "3 phases queued — recon, enumeration, validation", tone: "text-emerald-600" },
  { tag: "recon", text: "subdomain discovery — 42 hosts resolved", tone: "text-on-surface-variant" },
  { tag: "enum", text: "service fingerprinting — 7 exposed endpoints", tone: "text-on-surface-variant" },
  { tag: "vault", text: "18 sensitive values masked before model call", tone: "text-emerald-600/80" },
  { tag: "gate", text: "awaiting approval — exploitation phase", tone: "text-amber-600" },
];

/** Self-typing assessment console that replays on a loop. */
export function LiveTerminal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [typed, setTyped] = useState(PROMPT);
  const [lineCount, setLineCount] = useState(LINES.length);
  const [meter, setMeter] = useState(88);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setStarted(entry.isIntersecting);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!started || reducedMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    let character = 0;
    let line = 0;

    const runCycle = () => {
      character = 0;
      line = 0;
      setTyped("");
      setLineCount(0);
      setMeter(0);
      timer = setTimeout(typeNext, 34);
    };

    const typeNext = () => {
      character += 1;
      setTyped(PROMPT.slice(0, character));
      timer = setTimeout(character < PROMPT.length ? typeNext : showNextLine, character < PROMPT.length ? 34 : 350);
    };

    const showNextLine = () => {
      line += 1;
      setLineCount(line);
      if (line < LINES.length) {
        timer = setTimeout(showNextLine, 520);
      } else {
        timer = setTimeout(() => {
          setMeter(88);
          timer = setTimeout(runCycle, 5200);
        }, 720);
      }
    };

    runCycle();
    return () => clearTimeout(timer);
  }, [started, reducedMotion]);

  const displayedPrompt = reducedMotion ? PROMPT : typed;
  const displayedLines = reducedMotion ? LINES.length : lineCount;
  const displayedMeter = reducedMotion ? 88 : meter;

  return (
    <div ref={ref} className="group relative">
      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-70 blur-2xl transition duration-1000 group-hover:opacity-100" />
      <div className="relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-[0_32px_80px_-40px_rgba(104,76,182,0.35)]">
        <div className="cyber-scanline top-0" />
        <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-on-surface-variant/70">
            vrika // assessment-session
          </span>
        </div>

        <p className="px-6 pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-on-surface-variant">
          Illustrative demo · not a live assessment
        </p>
        <div className="sr-only">
          <p>{PROMPT}</p>
          <ul>{LINES.map((line) => <li key={line.tag}>{line.tag}: {line.text}</li>)}</ul>
          <p>Illustrative attack path confidence: 88%.</p>
        </div>
        <div aria-hidden="true" className="min-h-[310px] space-y-4 p-6 font-mono text-[13px] leading-relaxed">
          <div className="flex flex-wrap gap-2">
            <span className="text-primary">operator</span>
            <span className="text-on-surface-variant/60">&gt;</span>
            <span className="text-on-surface">
              {displayedPrompt}
              {displayedPrompt.length < PROMPT.length ? <span className="vk-caret ml-0.5 text-primary" /> : null}
            </span>
          </div>

          <div className="space-y-2 border-l border-primary/25 pl-4">
            {LINES.slice(0, displayedLines).map((line) => (
              <div key={line.tag} className={`${reducedMotion ? "" : "agentic-stream-chunk"} flex gap-2`}>
                <span className="shrink-0 text-primary/75">[{line.tag}]</span>
                <span className={line.tone}>{line.text}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-lg border border-outline-variant bg-surface-container-low p-4">
            <div className="flex items-center gap-2.5">
              <MaterialSymbol name="insights" className="text-lg text-primary" />
              <span className="text-[11px] uppercase tracking-[0.12em] text-on-surface-variant">Attack path confidence</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-outline-variant">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-[#8b5cf6] transition-[width] duration-[1600ms] ease-out"
                  style={{ width: `${displayedMeter}%`, transition: reducedMotion ? "none" : undefined }}
                />
              </div>
              <span className="w-8 text-right text-[11px] font-bold text-on-surface">{displayedMeter}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
