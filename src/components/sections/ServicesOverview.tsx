"use client";
import { services } from "@/data/services";
import ServiceCard from "@/components/ui/ServiceCard";
import { useInView } from "@/hooks/useInView";

interface Props {
  expanded?: boolean;
}

export default function ServicesOverview({ expanded = false }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();

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
          className={`mb-12 transition-all duration-600 ${
            inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px" style={{ background: "#C09A5C", opacity: 0.7 }} />
            <span
              className="text-[10px] uppercase font-medium"
              style={{ color: "#8C8278", letterSpacing: "0.26em" }}
            >
              Направления работ
            </span>
          </div>
          <h2
            className="font-heading font-bold text-text mb-3"
            style={{ fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-0.01em" }}
          >
            Наши услуги
          </h2>
          <p className="text-text-muted max-w-md text-sm leading-relaxed">
            Один подрядчик — полный цикл. От фундамента до финишной отделки.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div
              key={s.id}
              className={`transition-all duration-600 ${
                inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
              }`}
              style={{ animationDelay: `${0.08 + i * 0.09}s` }}
            >
              <ServiceCard service={s} expanded={expanded} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
