"use client";
import { useRef, useCallback } from "react";

interface Props {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Wraps any element with a magnetic pull toward the cursor.
 * On mouse leave, snaps back with an expo spring.
 */
export default function MagneticButton({ children, strength = 8, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
          ref.current.style.transition = "transform 0.08s linear";
        }
      });
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (ref.current) {
      ref.current.style.transition = "transform 0.55s cubic-bezier(0.19, 1, 0.22, 1)";
      ref.current.style.transform = "translate(0, 0)";
    }
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: className ? undefined : "inline-flex" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
