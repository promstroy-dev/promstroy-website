"use client";
import { useEffect, useRef } from "react";

interface Props {
  /** RGB string e.g. "196,174,148" */
  color?: string;
  /** Glow radius in px */
  size?: number;
  /** Peak opacity */
  opacity?: number;
}

/**
 * Drop inside any `relative overflow-hidden` section.
 * Self-attaches mouse tracking to the parent element and follows
 * the cursor with a soft radial glow (lerped ~80ms lag).
 */
export default function CursorGlow({
  color = "196,174,148",
  size = 240,
  opacity = 0.09,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 50, y: 50 });
  const current = useRef({ x: 50, y: 50 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      target.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.07);
      current.current.y = lerp(current.current.y, target.current.y, 0.07);
      if (el) {
        el.style.background = `radial-gradient(circle ${size}px at ${current.current.x}% ${current.current.y}%, rgba(${color},${opacity}) 0%, transparent 70%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    parent.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      parent.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [color, size, opacity]);

  return <div ref={ref} aria-hidden className="absolute inset-0 pointer-events-none" />;
}
