"use client";

import { useEffect, useRef } from "react";

/** Thin gradient bar pinned under the nav that tracks page scroll. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      el.style.setProperty("--vk-progress", String(ratio));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5">
      <div
        ref={ref}
        className="vk-progress h-full w-full bg-gradient-to-r from-primary via-[#8b5cf6] to-primary"
      />
    </div>
  );
}
