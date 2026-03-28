"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Thin brass progress bar fixed at the very top of the viewport.
 * Width = scroll percentage. RAF-driven, no re-renders.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;

    const update = () => {
      const el = barRef.current;
      if (!el) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      el.style.transform = `scaleX(${progress})`;
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
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] z-[9998] pointer-events-none origin-left"
      style={{
        background: "linear-gradient(90deg, #C4AE94, rgba(196,174,148,0.6))",
        transform: "scaleX(0)",
        willChange: "transform",
      }}
    />
  );
}
