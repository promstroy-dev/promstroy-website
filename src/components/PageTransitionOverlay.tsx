"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "covering" | "revealing";

export default function PageTransitionOverlay() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [phase, setPhase] = useState<Phase>("idle");
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    // Cancel any in-flight animation
    cancelAnimationFrame(rafRef.current);

    // Instantly cover the newly-rendered page
    setPhase("covering");

    // Double-rAF ensures the covering state is painted before we animate away
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        setPhase("revealing");
      });
    });

    return () => cancelAnimationFrame(rafRef.current);
  }, [pathname]);

  const styles: Record<Phase, React.CSSProperties> = {
    idle: {
      clipPath: "inset(0 0 100% 0)",
      transition: "none",
    },
    covering: {
      clipPath: "inset(0)",
      transition: "none",
    },
    revealing: {
      clipPath: "inset(0 0 100% 0)",
      transition: "clip-path 0.65s cubic-bezier(0.19, 1, 0.22, 1)",
    },
  };

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[9999] pointer-events-none will-change-[clip-path]"
      style={{
        background: "#1A2B3D",
        ...styles[phase],
      }}
    />
  );
}
