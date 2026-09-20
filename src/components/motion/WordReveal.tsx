import type { CSSProperties } from "react";
import { Fragment } from "react";

type Props = {
  text: string;
  className?: string;
  /** Delay before the first word animates in, in ms. */
  delay?: number;
  /** Per-word stagger, in ms. */
  stagger?: number;
};

/** Splits a line into words and staggers each one in. */
export function WordReveal({ text, className = "", delay = 0, stagger = 70 }: Props) {
  let wordIndex = 0;
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {text.split(/(\s+)/).map((part, i) => {
        if (!part) return null;
        if (/^\s+$/.test(part)) return <Fragment key={i}>{part}</Fragment>;
        const wordDelay = delay + wordIndex++ * stagger;
        return (
          <span
            key={i}
            aria-hidden="true"
            className="vk-word"
            style={{
              ["--vk-delay" as string]: `${wordDelay}ms`,
              opacity: 1,
              animationFillMode: "both",
              backgroundImage: "inherit",
              backgroundSize: "inherit",
              backgroundPosition: "inherit",
              backgroundClip: "inherit",
              WebkitBackgroundClip: "inherit",
            } as CSSProperties}
          >
            {part}
          </span>
        );
      })}
    </span>
  );
}
