"use client";

import { useInView } from "@/hooks/useInView";

interface Props {
  children: React.ReactNode;
  className?: string;
  /** Clip direction: "up" wipes bottom-to-top, "left" wipes left-to-right */
  direction?: "up" | "left";
}

/**
 * Wraps any content (image, card) in a clip-path reveal + scale-down effect.
 * Container clips overflow while the inner content scales from 1.12 → 1.0.
 * Pure CSS transitions triggered by IntersectionObserver.
 */
export default function ImageReveal({
  children,
  className = "",
  direction = "up",
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const clipHidden = direction === "up" ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)";
  const clipVisible = "inset(0 0 0 0)";

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={{
        clipPath: inView ? clipVisible : clipHidden,
        transition: "clip-path 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        style={{
          transform: inView ? "scale(1)" : "scale(1.12)",
          transition: "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
