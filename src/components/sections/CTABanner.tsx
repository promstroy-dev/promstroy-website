"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

export default function CTABanner() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-16 overflow-hidden"
      style={{ background: "#1A2B3D" }}
    >
      {/* Architectural grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(196,174,148,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(196,174,148,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Plus-corner marks */}
      {/* Top-left */}
      <div className="absolute top-6 left-6 pointer-events-none" style={{ color: "rgba(196,174,148,0.18)" }}>
        <div className="w-4 h-px bg-current" style={{ position: "absolute", top: "8px", left: "0" }} />
        <div className="h-4 w-px bg-current" style={{ position: "absolute", top: "0", left: "8px" }} />
      </div>
      {/* Top-right */}
      <div className="absolute top-6 right-6 pointer-events-none" style={{ color: "rgba(196,174,148,0.18)" }}>
        <div className="w-4 h-px bg-current" style={{ position: "absolute", top: "8px", right: "0" }} />
        <div className="h-4 w-px bg-current" style={{ position: "absolute", top: "0", right: "8px" }} />
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-6 left-6 pointer-events-none" style={{ color: "rgba(196,174,148,0.18)" }}>
        <div className="w-4 h-px bg-current" style={{ position: "absolute", bottom: "8px", left: "0" }} />
        <div className="h-4 w-px bg-current" style={{ position: "absolute", bottom: "0", left: "8px" }} />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-6 right-6 pointer-events-none" style={{ color: "rgba(196,174,148,0.18)" }}>
        <div className="w-4 h-px bg-current" style={{ position: "absolute", bottom: "8px", right: "0" }} />
        <div className="h-4 w-px bg-current" style={{ position: "absolute", bottom: "0", right: "8px" }} />
      </div>

      <div className="relative max-w-content mx-auto px-4 md:px-8 text-center">
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="w-5 h-px"
              style={{ background: "#C4AE94", opacity: 0.5 }}
            />
            <span
              className="text-[10px] uppercase font-medium"
              style={{ color: "#7A8E98", letterSpacing: "0.26em" }}
            >
              Начать проект
            </span>
            <div
              className="w-5 h-px"
              style={{ background: "#C4AE94", opacity: 0.5 }}
            />
          </div>

          <h2
            className="font-heading font-bold mb-4"
            style={{
              fontSize: "clamp(26px, 3.5vw, 44px)",
              color: "#F0EBE3",
              letterSpacing: "-0.01em",
            }}
          >
            Готовы обсудить ваш объект?
          </h2>
          <p
            className="text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed"
            style={{ color: "rgba(148,180,193,0.70)" }}
          >
            Расскажите о задаче — подготовим смету и план работ. Консультация бесплатная.
          </p>

          <Link
            href="/kontakty"
            className="btn-primary inline-flex items-center gap-2 text-sm py-3.5 px-8"
          >
            Оставить заявку
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
