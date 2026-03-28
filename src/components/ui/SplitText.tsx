"use client";

import { useInView } from "@/hooks/useInView";

interface Props {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  /** Base delay before first word (ms) */
  delay?: number;
  /** Stagger between words (ms) */
  stagger?: number;
  /** HTML tag to render */
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Splits text into individual words that stagger in on scroll.
 * Each word fades up + deblurs with increasing delay.
 * Pure CSS animations — no JS animation loop.
 */
export default function SplitText({
  children,
  className = "",
  style,
  delay = 0,
  stagger = 55,
  as: Tag = "h2",
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const words = children.split(/\s+/);

  return (
    <Tag
      ref={ref as React.Ref<HTMLHeadingElement>}
      className={className}
      style={style}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.27em] last:mr-0"
        >
          <span
            className="inline-block"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(105%)",
              filter: inView ? "blur(0px)" : "blur(4px)",
              transition: `opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}ms,
                           transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}ms,
                           filter 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
