"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Вернуться наверх"
      style={{
        position: "fixed",
        bottom: "1.75rem",
        right: "1.75rem",
        zIndex: 40,
        width: "2.5rem",
        height: "2.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1A2B3D",
        border: "1px solid rgba(196,174,148,0.25)",
        color: "#C4AE94",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.30s ease, transform 0.30s cubic-bezier(0.22, 1, 0.36, 1)",
        boxShadow: "0 4px 18px rgba(0,0,0,0.32)",
        cursor: "pointer",
      }}
    >
      <ArrowUp size={14} />
    </button>
  );
}
