"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Architectural vertical brass line on the left edge of the viewport.
 * Fills from top to bottom as the user scrolls.
 * Mimics a ruler/measurement scale — structural design language.
 */
export default function VerticalScrollLine() {
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;

    const update = () => {
      const el = lineRef.current;
      if (!el) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      el.style.transform = `scaleY(${progress})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      className="fixed left-0 top-0 bottom-0 z-[9997] pointer-events-none hidden lg:block"
      style={{ width: "2px" }}
    >
      {/* Track — very faint base line */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(196,174,148,0.08)" }}
      />
      {/* Fill — brass, scales from top */}
      <div
        ref={lineRef}
        className="absolute inset-0 origin-top"
        style={{
          background: "linear-gradient(to bottom, #C4AE94 0%, rgba(196,174,148,0.5) 70%, rgba(196,174,148,0.2) 100%)",
          transform: "scaleY(0)",
          willChange: "transform",
        }}
      />
      {/* Tick marks at 25%, 50%, 75% */}
      {[25, 50, 75].map((pct) => (
        <div
          key={pct}
          className="absolute left-0 pointer-events-none"
          style={{
            top: `${pct}%`,
            width: "6px",
            height: "1px",
            background: "rgba(196,174,148,0.15)",
          }}
        />
      ))}
    </div>
  );
}
