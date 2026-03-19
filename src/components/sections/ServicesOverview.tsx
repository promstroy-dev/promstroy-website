"use client";
import { useState } from "react";
import { services } from "@/data/services";
import ServiceCard from "@/components/ui/ServiceCard";
import TiltCard from "@/components/ui/TiltCard";
import { useInView } from "@/hooks/useInView";
import RevealText from "@/components/ui/RevealText";

interface Props {
  expanded?: boolean;
}

export default function ServicesOverview({ expanded = false }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-32 bg-bg relative overflow-hidden">
      {/* Concrete grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.018,
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
              Направления работ
            </span>
          </div>
        </div>
        <RevealText
          inView={inView}
          className="font-heading font-bold text-text mb-3"
          style={{ fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-0.01em" }}
        >
          Наши услуги
        </RevealText>
        <p
          className={`text-text-muted max-w-md text-sm leading-relaxed mb-12 transition-all duration-600 ${
            inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
          }`}
          style={{ animationDelay: "0.32s" }}
        >
          Один подрядчик — полный цикл. От фундамента до финишной отделки.
        </p>

        {/* Cards grid — spotlight: active card full opacity, others dim */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            // Outer: handles spotlight opacity
            <div
              key={s.id}
              style={{
                opacity: activeCard !== null && activeCard !== i ? 0.45 : 1,
                transition: "opacity 0.25s ease",
              }}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Mid: scroll-reveal animation */}
              <div
                className={`transition-all duration-600 ${
                  inView ? "animate-fade-up" : "opacity-0 translate-y-5"
                }`}
                style={{ animationDelay: `${0.08 + i * 0.09}s` }}
              >
                {/* Inner: 3D tilt + specular */}
                <TiltCard specular="light" maxTilt={4}>
                  <ServiceCard service={s} expanded={expanded} />
                </TiltCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
