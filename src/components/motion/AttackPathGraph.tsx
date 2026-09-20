"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type Node = { id: string; x: number; y: number; label: string; kind: "entry" | "pivot" | "crown" };

const NODES: Node[] = [
  { id: "n1", x: 10, y: 52, label: "Exposed asset", kind: "entry" },
  { id: "n2", x: 32, y: 24, label: "Weak service", kind: "pivot" },
  { id: "n3", x: 34, y: 78, label: "Leaked key", kind: "pivot" },
  { id: "n4", x: 58, y: 48, label: "Privilege escalation", kind: "pivot" },
  { id: "n5", x: 82, y: 26, label: "Data store", kind: "crown" },
  { id: "n6", x: 84, y: 74, label: "Admin plane", kind: "crown" },
];

const EDGES: [string, string][] = [
  ["n1", "n2"],
  ["n1", "n3"],
  ["n2", "n4"],
  ["n3", "n4"],
  ["n4", "n5"],
  ["n4", "n6"],
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;

/** Animated attack-path graph: edges draw in, then nodes pop and pulse. */
export function AttackPathGraph({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setOn(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setOn(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <svg viewBox="0 0 100 100" className="size-full" role="img" aria-label="Attack path graph">
        <defs>
          <linearGradient id="vk-edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.75" />
          </linearGradient>
          <filter id="vk-node-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {EDGES.map(([from, to], i) => {
          const a = byId(from);
          const b = byId(to);
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2 - 6;
          const d = `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
          return (
            <g key={`${from}-${to}`}>
              <path d={d} fill="none" stroke="var(--color-outline-variant)" strokeWidth="0.35" />
              <path
                d={d}
                fill="none"
                stroke="url(#vk-edge)"
                strokeWidth="0.6"
                strokeLinecap="round"
                style={
                  {
                    strokeDasharray: 120,
                    strokeDashoffset: on ? 0 : 120,
                    transition: `stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1) ${240 + i * 180}ms`,
                  } as CSSProperties
                }
              />
              {on ? (
                <circle r="0.8" fill="var(--color-primary)">
                  <animateMotion dur={`${3 + i * 0.4}s`} repeatCount="indefinite" path={d} begin={`${i * 0.5}s`} />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur={`${3 + i * 0.4}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.5}s`}
                  />
                </circle>
              ) : null}
            </g>
          );
        })}

        {NODES.map((node, i) => {
          const isCrown = node.kind === "crown";
          const r = isCrown ? 3.4 : node.kind === "entry" ? 3 : 2.4;
          return (
            <g
              key={node.id}
              style={
                {
                  opacity: on ? 1 : 0,
                  transform: on ? "scale(1)" : "scale(0.4)",
                  transformOrigin: `${node.x}px ${node.y}px`,
                  transition: `opacity 0.5s ease ${600 + i * 130}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${600 + i * 130}ms`,
                } as CSSProperties
              }
            >
              {isCrown ? (
                <circle cx={node.x} cy={node.y} r={r + 2.2} fill="none" stroke="var(--color-primary)" strokeOpacity="0.28" strokeWidth="0.3">
                  <animate attributeName="r" values={`${r + 1.4};${r + 3.6};${r + 1.4}`} dur="3s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.35;0.05;0.35" dur="3s" repeatCount="indefinite" />
                </circle>
              ) : null}
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill={isCrown ? "var(--color-primary)" : "var(--color-surface-container-lowest)"}
                stroke="var(--color-primary)"
                strokeWidth="0.5"
                filter={isCrown ? "url(#vk-node-glow)" : undefined}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
