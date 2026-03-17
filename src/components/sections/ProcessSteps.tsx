"use client";
import { processSteps } from "@/data/process";
import { useInView } from "@/hooks/useInView";

export default function ProcessSteps() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      className="py-20 md:py-32 relative overflow-hidden border-y"
      style={{ background: "#13151A", borderColor: "#1E2028" }}
    >
      {/* Background grid — blueprint feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 80px,
              rgba(255,255,255,0.012) 80px,
              rgba(255,255,255,0.012) 81px
            )
          `,
        }}
      />

      <div ref={ref} className="relative max-w-content mx-auto px-4 md:px-8">

        {/* Header */}
        <div
          className={`mb-16 transition-all duration-600 ${
            inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px" style={{ background: "#C09A5C", opacity: 0.7 }} />
            <span
              className="text-[10px] uppercase font-medium"
              style={{ color: "#8C8278", letterSpacing: "0.26em" }}
            >
              Процесс работы
            </span>
          </div>
          <h2
            className="font-heading font-bold"
            style={{
              fontSize: "clamp(28px, 3.5vw, 48px)",
              color: "#F0EBE3",
              letterSpacing: "-0.01em",
            }}
          >
            Как мы работаем
          </h2>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:grid md:grid-cols-5 gap-8 md:gap-0">
          {processSteps.map((step, i) => (
            <div
              key={step.step}
              className={`relative flex md:flex-col gap-5 md:gap-5 transition-all duration-600 ${
                inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
              }`}
              style={{ animationDelay: `${0.06 + i * 0.1}s` }}
            >
              {/* Connector line — draws in from left when section enters view */}
              {i < processSteps.length - 1 && (
                <div
                  className="hidden md:block absolute top-[19px] h-px origin-left"
                  style={{
                    left: "calc(2.5rem + 1px)",
                    right: 0,
                    // Base steel line always present
                    background: "linear-gradient(to right, rgba(192,154,92,0.45) 0%, rgba(30,32,40,0.9) 35%, #1E2028 100%)",
                    transform: inView ? "scaleX(1)" : "scaleX(0)",
                    transition: `transform 0.9s cubic-bezier(0.19, 1, 0.22, 1) ${0.18 + i * 0.16}s`,
                  }}
                />
              )}

              {/* Step number badge — scales in on reveal */}
              <div className="flex-shrink-0 relative z-10">
                <div
                  className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center font-heading font-bold text-sm"
                  style={{
                    border: "1px solid #C09A5C",
                    color: "#C09A5C",
                    background: "#13151A",
                    letterSpacing: "0.02em",
                    transform: inView ? "scale(1)" : "scale(0.65)",
                    opacity: inView ? 1 : 0,
                    transition: `transform 0.45s cubic-bezier(0.22, 1, 0.36, 1) ${0.06 + i * 0.1}s, opacity 0.35s ease ${0.06 + i * 0.1}s`,
                  }}
                >
                  {step.step}
                </div>
              </div>

              <div className="md:pt-1">
                <h3
                  className="font-heading font-semibold mb-2 leading-snug"
                  style={{ color: "rgba(240,235,227,0.90)", fontSize: "0.875rem" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#8C8278" }}
                >
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
