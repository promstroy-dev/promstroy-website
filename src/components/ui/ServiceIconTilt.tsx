"use client";

import { useRef, useCallback, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  children: ReactNode;
}

export default function ServiceIconTilt({ children }: Props) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(400px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.04, 1.04, 1.04)`;
      });
    },
    [reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const el = containerRef.current;
    if (el) {
      el.style.transform = "perspective(400px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="inline-flex items-center justify-center w-16 h-16 flex-shrink-0"
      style={{
        background: "rgba(196,174,148,0.09)",
        border: "1px solid rgba(196,174,148,0.22)",
        transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
