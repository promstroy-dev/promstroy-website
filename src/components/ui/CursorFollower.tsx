"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Custom cursor follower — brass dot that trails the mouse with inertia.
 * Expands into a ring on interactive elements (links, buttons).
 * Desktop only (hidden on touch devices via CSS).
 */
export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -40, y: -40 });
  const target = useRef({ x: -40, y: -40 });
  const rafRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    // Check for touch device
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    // Track hover on interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = el.closest("a, button, [role='button'], input, textarea, select, .cursor-expand");
      setHovered(!!interactive);
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12);

      const el = dotRef.current;
      if (el) {
        el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[9996] pointer-events-none hidden lg:block"
      style={{
        width: hovered ? "36px" : "8px",
        height: hovered ? "36px" : "8px",
        borderRadius: "50%",
        background: hovered ? "transparent" : "rgba(196,174,148,0.55)",
        border: hovered ? "1.5px solid rgba(196,174,148,0.45)" : "none",
        opacity: hidden ? 0 : 1,
        transition: "width 0.25s cubic-bezier(0.22, 1, 0.36, 1), height 0.25s cubic-bezier(0.22, 1, 0.36, 1), background 0.25s ease, border 0.25s ease, opacity 0.2s ease",
        mixBlendMode: "difference",
        willChange: "transform",
      }}
    />
  );
}
