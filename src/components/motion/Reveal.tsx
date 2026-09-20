"use client";

import type { ElementType, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in ms. */
  delay?: number;
  variant?: "up" | "fade" | "scale";
  className?: string;
  as?: ElementType;
  id?: string;
};

/** Fades content in once it scrolls into view. Falls back to visible without IntersectionObserver. */
export function Reveal({ children, delay = 0, variant = "up", className = "", as, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variantClass = variant === "fade" ? "vk-reveal-fade" : variant === "scale" ? "vk-reveal-scale" : "";

  return (
    <Tag
      ref={ref}
      id={id}
      className={`vk-reveal ${variantClass} ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ ["--vk-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
