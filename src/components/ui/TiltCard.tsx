"use client";
/**
 * TiltCard — reusable 3D tilt + specular highlight wrapper.
 *
 * Wraps any card child with:
 *  - CSS perspective + rotateX/Y tracking mouse position on the card surface
 *  - Specular radial gradient that follows the cursor (light or brass tint)
 *  - Fast response while hovering (80ms), spring-back on leave (500ms ease-out-circ)
 *  - RAF-throttled, zero dependency, no re-renders from children
 *  - No-op on touch devices (mouse events don't fire)
 *
 * Usage:
 *   <TiltCard specular="brass">
 *     <ProjectCard project={p} />
 *   </TiltCard>
 */

import { useRef, useState, useEffect, type ReactNode, type CSSProperties } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTilt?: number;           // max rotation in degrees, default 5
  specular?: "light" | "brass" | "none";
}

export default function TiltCard({
  children,
  className = "",
  style,
  maxTilt = 5,
  specular = "light",
}: Props) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [rotX,   setRotX]   = useState(0);
  const [rotY,   setRotY]   = useState(0);
  const [mx,     setMx]     = useState(50);   // specular X %
  const [my,     setMy]     = useState(50);   // specular Y %
  const [active, setActive] = useState(false);

  // Disable tilt on touch-primary devices
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || isTouchDevice) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;   // 0–1
      const ny = (e.clientY - rect.top)  / rect.height;  // 0–1
      setRotX((0.5 - ny) * maxTilt * 2);
      setRotY((nx - 0.5) * maxTilt * 2);
      setMx(nx * 100);
      setMy(ny * 100);
    });
  };

  const handleMouseEnter = () => { if (!isTouchDevice) setActive(true); };

  const handleMouseLeave = () => {
    cancelAnimationFrame(rafRef.current);
    setActive(false);
    setRotX(0);
    setRotY(0);
  };

  const specularGradient =
    specular === "brass"
      ? `radial-gradient(circle 160px at ${mx}% ${my}%, rgba(84,119,146,0.10) 0%, transparent 65%)`
      : specular === "light"
      ? `radial-gradient(circle 180px at ${mx}% ${my}%, rgba(255,255,255,0.07) 0%, transparent 65%)`
      : "none";

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        ...style,
        transform: `perspective(1100px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transformOrigin: "center center",
        // Fast track while active, smooth spring-back on leave
        transition: active
          ? "transform 0.08s linear"
          : "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Specular highlight — last in DOM so it layers on top */}
      {specular !== "none" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: specularGradient,
            opacity: active ? 1 : 0,
            transition: "opacity 0.18s ease",
            borderRadius: "inherit",
          }}
        />
      )}
    </div>
  );
}
