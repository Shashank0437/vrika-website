"use client";

import { useEffect, useRef, useState } from "react";
import { MaterialSymbol } from "@/components/ui/MaterialSymbol";

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
  const [typed, setTyped] = useState("");
  const [lineCount, setLineCount] = useState(0);
  const [meter, setMeter] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setTyped(PROMPT);
      setLineCount(LINES.length);
      setMeter(88);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const runCycle = () => {
      setTyped("");
      setLineCount(0);
      setMeter(0);

      for (let i = 1; i <= PROMPT.length; i += 1) {
        timers.push(setTimeout(() => setTyped(PROMPT.slice(0, i)), i * 34));
      }
      const afterTyping = PROMPT.length * 34 + 350;
      LINES.forEach((_, idx) => {
        timers.push(setTimeout(() => setLineCount(idx + 1), afterTyping + idx * 520));
      });
      const afterLines = afterTyping + LINES.length * 520 + 200;
      timers.push(setTimeout(() => setMeter(88), afterLines));
      timers.push(setTimeout(runCycle, afterLines + 5200));
    };

    runCycle();
    return () => timers.forEach(clearTimeout);
  }, [started]);

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

        <div className="min-h-[310px] space-y-4 p-6 font-mono text-[13px] leading-relaxed">
          <div className="flex flex-wrap gap-2">
            <span className="text-primary">operator</span>
            <span className="text-on-surface-variant/60">&gt;</span>
            <span className="text-on-surface">
              {typed}
              {typed.length < PROMPT.length ? <span className="vk-caret ml-0.5 text-primary" /> : null}
            </span>
          </div>

          <div className="space-y-2 border-l border-primary/25 pl-4">
            {LINES.slice(0, lineCount).map((line) => (
              <div key={line.tag} className="agentic-stream-chunk flex gap-2">
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
                  style={{ width: `${meter}%` }}
                />
              </div>
              <span className="w-8 text-right text-[11px] font-bold text-on-surface">{meter}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
