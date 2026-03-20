"use client";
import { useState } from "react";
import { processSteps } from "@/data/process";
import { useInView } from "@/hooks/useInView";
import RevealText from "@/components/ui/RevealText";

export default function ProcessSteps() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Whether any step is active — used for spotlight dimming
  const anyHovered = hoveredStep !== null;

  return (
    <section
      className="py-20 md:py-32 relative overflow-hidden border-y"
      style={{ background: "#213448", borderColor: "#1E3348" }}
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 80px,
              rgba(255,255,255,0.010) 80px,
              rgba(255,255,255,0.010) 81px
            )`,
        }}
      />

      <div ref={ref} className="relative max-w-content mx-auto px-4 md:px-8">

        {/* Header */}
        <div
          className={`mb-4 transition-all duration-600 ${
            inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-px" style={{ background: "#C4AE94", opacity: 0.7 }} />
            <span
              className="text-[10px] uppercase font-medium"
              style={{ color: "#7A8E98", letterSpacing: "0.26em" }}
            >
              Процесс работы
            </span>
          </div>
        </div>
        <RevealText
          inView={inView}
          className="font-heading font-bold mb-16"
          style={{
            fontSize: "clamp(28px, 3.5vw, 48px)",
            color: "#F0EBE3",
            letterSpacing: "-0.01em",
          }}
        >
          Как мы работаем
        </RevealText>

        {/* Steps grid */}
        <div className="flex flex-col md:grid md:grid-cols-5 gap-0">
          {processSteps.map((step, i) => {
            const isActive   = hoveredStep === i;
            const isDimmed   = anyHovered && !isActive;
            const isConnectorLit = hoveredStep === i; // connector FROM this step

            return (
              <div
                key={step.step}
                className={`relative flex md:flex-col gap-5 md:gap-0 cursor-default
                  transition-all duration-600 ${
                    inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
                  }`}
                style={{
                  animationDelay: `${0.06 + i * 0.1}s`,
                  // Spotlight dimming of non-active steps
                  opacity: isDimmed ? 0.32 : 1,
                  transition: "opacity 0.28s ease",
                }}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* ── Connector line (desktop) ───────────────── */}
                {i < processSteps.length - 1 && (
                  <>
                    {/* Base line — always present */}
                    <div
                      className="hidden md:block absolute top-[19px] h-px origin-left"
                      style={{
                        left: "calc(2.75rem + 1px)",
                        right: 0,
                        background: "#1E3348",
                        transform: inView ? "scaleX(1)" : "scaleX(0)",
                        transition: `transform 0.9s cubic-bezier(0.19, 1, 0.22, 1) ${0.18 + i * 0.16}s`,
                      }}
                    />
                    {/* Accent overlay — draws in when hovered */}
                    <div
                      className="hidden md:block absolute top-[19px] h-px origin-left"
                      style={{
                        left: "calc(2.75rem + 1px)",
                        right: 0,
                        background: "linear-gradient(to right, rgba(196,174,148,0.70) 0%, rgba(196,174,148,0.15) 60%, transparent 100%)",
                        transform: isConnectorLit ? "scaleX(1)" : "scaleX(0)",
                        transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    />
                  </>
                )}

                {/* ── Step badge ──────────────────────────────── */}
                <div className="flex-shrink-0 relative z-10 md:mb-5">
                  <div
                    className="w-10 h-10 flex items-center justify-center font-heading font-bold"
                    style={{
                      fontSize: "0.8rem",
                      letterSpacing: "0.04em",
                      border: `1px solid ${isActive ? "rgba(196,174,148,0.80)" : "rgba(196,174,148,0.45)"}`,
                      color: isActive ? "#1A2B3D" : "#C4AE94",
                      background: isActive ? "#C4AE94" : "transparent",
                      transform: inView ? "scale(1)" : "scale(0.65)",
                      opacity: inView ? 1 : 0,
                      transition: `transform 0.45s cubic-bezier(0.22, 1, 0.36, 1) ${0.06 + i * 0.1}s,
                                   opacity 0.35s ease ${0.06 + i * 0.1}s,
                                   background 0.22s ease,
                                   color 0.22s ease,
                                   border-color 0.22s ease`,
                    }}
                  >
                    {step.step}
                  </div>
                </div>

                {/* ── Step content ────────────────────────────── */}
                <div className="md:pr-5 pb-8 md:pb-0">
                  {/* Step number hint on mobile */}
                  <p
                    className="md:hidden text-[10px] uppercase font-semibold mb-1"
                    style={{ color: "rgba(196,174,148,0.55)", letterSpacing: "0.22em" }}
                  >
                    Шаг {step.step}
                  </p>

                  <h3
                    className="font-heading font-semibold mb-2.5 leading-snug"
                    style={{
                      fontSize: "0.95rem",
                      color: isActive ? "#F0EBE3" : "rgba(240,235,227,0.80)",
                      transition: "color 0.22s ease",
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="leading-relaxed"
                    style={{
                      fontSize: "0.8rem",
                      color: isActive ? "rgba(148,180,193,0.88)" : "rgba(148,180,193,0.72)",
                      transition: "color 0.22s ease",
                    }}
                  >
                    {step.body}
                  </p>

                  {/* Active underline accent on desktop */}
                  <div
                    className="hidden md:block mt-4 h-px origin-left"
                    style={{
                      background: "rgba(196,174,148,0.35)",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                      width: "2.5rem",
                    }}
                  />
                </div>

                {/* Mobile: bottom step separator */}
                <div
                  className="md:hidden absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background: isActive
                      ? "rgba(196,174,148,0.25)"
                      : "rgba(30,51,72,0.5)",
                    transition: "background 0.28s ease",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
