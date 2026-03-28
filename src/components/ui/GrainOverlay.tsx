"use client";

/**
 * Animated grain overlay — subtle film noise that drifts slowly.
 * Purely decorative. Sits above all content at very low opacity,
 * adding tactile texture to every page.
 */
export default function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 z-[9995] pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.035,
        animation: "grainDrift 8s steps(1) infinite",
        willChange: "transform",
      }}
    />
  );
}
