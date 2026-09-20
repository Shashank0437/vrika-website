"use client";

/** Decorative attack-surface radar: sweeping beam, expanding rings, pulsing target blips. */
const BLIPS = [
  { cx: 68, cy: 42, delay: "0s" },
  { cx: 34, cy: 66, delay: "0.7s" },
  { cx: 76, cy: 74, delay: "1.4s" },
  { cx: 52, cy: 28, delay: "2.1s" },
  { cx: 26, cy: 40, delay: "2.7s" },
];

export function HeroRadar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id="vk-radar-beam" x1="50%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#684cb6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#684cb6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[16, 28, 40].map((r) => (
        <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#684cb6" strokeOpacity="0.12" strokeWidth="0.3" />
      ))}
      <line x1="10" y1="50" x2="90" y2="50" stroke="#684cb6" strokeOpacity="0.1" strokeWidth="0.3" />
      <line x1="50" y1="10" x2="50" y2="90" stroke="#684cb6" strokeOpacity="0.1" strokeWidth="0.3" />

      <circle className="vk-radar-ring" cx="50" cy="50" fill="none" stroke="#684cb6" strokeWidth="0.4" />

      <g className="vk-radar-sweep" style={{ transformOrigin: "50px 50px" }}>
        <path d="M50 50 L90 50 A40 40 0 0 0 78 22 Z" fill="url(#vk-radar-beam)" />
        <line x1="50" y1="50" x2="90" y2="50" stroke="#684cb6" strokeOpacity="0.6" strokeWidth="0.4" />
      </g>

      {BLIPS.map((b) => (
        <circle
          key={`${b.cx}-${b.cy}`}
          className="vk-blip"
          cx={b.cx}
          cy={b.cy}
          r="1.5"
          fill="#684cb6"
          style={{ animationDelay: b.delay }}
        />
      ))}
    </svg>
  );
}
