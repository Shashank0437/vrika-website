import type { CSSProperties } from "react";

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
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="vk-word"
          style={{ ["--vk-delay" as string]: `${delay + i * stagger}ms` } as CSSProperties}
        >
          {word}
          {i < text.split(" ").length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
