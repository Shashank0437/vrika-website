"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Set to 0 to disable the 3D tilt. */
  tilt?: number;
  style?: CSSProperties;
};

/**
 * Card shell that tracks the pointer to drive a radial spotlight
 * and an optional subtle 3D tilt.
 */
export function SpotlightCard({ children, className = "", tilt = 5, style }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt > 0) {
      const rx = (0.5 - y / rect.height) * tilt * 2;
      const ry = (x / rect.width - 0.5) * tilt * 2;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      className={`vk-spotlight vk-glow-border ${tilt > 0 ? "vk-tilt" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
