"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import ServiceCard from "@/components/ui/ServiceCard";
import TiltCard from "@/components/ui/TiltCard";
import { useInView } from "@/hooks/useInView";
import RevealText from "@/components/ui/RevealText";
import RollLink from "@/components/ui/RollLink";

interface Props {
  expanded?: boolean;
}

/**
 * Atmospheric gradient backgrounds per service — will be replaced
 * with real project photos once available.
 * Each gradient evokes the service type through color and direction.
 */
const SERVICE_BACKGROUNDS: Record<string, string> = {
  stroitelstvo:
    "linear-gradient(135deg, #0D1A28 0%, #1A2B3D 30%, #243B52 60%, #1A2B3D 100%)",
  remont:
    "linear-gradient(150deg, #1A2B3D 0%, #2A3D50 35%, #1D3044 65%, #0D1A28 100%)",
  konstruktivnye:
    "linear-gradient(120deg, #0A1520 0%, #1A2B3D 40%, #2E4456 70%, #1A2B3D 100%)",
  inzhenernye:
    "linear-gradient(160deg, #152333 0%, #1A2B3D 25%, #243B52 55%, #0D1A28 100%)",
};

export default function ServicesOverview({ expanded = false }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeGallery, setActiveGallery] = useState(0);
  const [mouse, setMouse] = useState({ x: 50, y: 40 });
  const [scrollPct, setScrollPct] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setScrollPct(Math.max(0, Math.min(1, (vh - rect.top) / (rect.height + vh))));
    };
    const onScroll = () => {
      cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

  /* ── Expanded mode: original card grid (for /uslugi page) ────────── */
  if (expanded) {
    return (
      <section
        ref={sectionRef}
        className="py-14 md:py-32 bg-bg relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Concrete grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            opacity: 0.022,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 119px, rgba(196,174,148,0.05) 119px, rgba(196,174,148,0.05) 120px),
              repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(196,174,148,0.05) 119px, rgba(196,174,148,0.05) 120px)
            `,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 55% 60% at ${mouse.x}% ${mouse.y}%, rgba(196,174,148,0.10) 0%, rgba(196,174,148,0.04) 40%, transparent 70%)`,
            transition: "background 0.08s linear",
          }}
        />
        <div ref={ref} className="relative max-w-content mx-auto px-4 md:px-8">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4 pb-4 md:mx-0 md:px-0 md:pb-0 md:overflow-visible md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <div
                key={s.id}
                className="snap-start shrink-0 w-[75vw] sm:w-[48vw] md:w-auto"
                style={{
                  opacity: activeCard !== null && activeCard !== i ? 0.42 : 1,
                  transition: "opacity 0.28s ease",
                }}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div
                  className={inView ? "animate-clip-reveal-y" : "invisible"}
                  style={{ animationDelay: `${0.08 + i * 0.09}s` }}
                >
                  <TiltCard specular="light" maxTilt={4}>
                    <ServiceCard service={s} expanded={expanded} index={i} />
                  </TiltCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── Default mode: hover-reveal gallery (Nutico-inspired) ────────── */
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#0D1A28" }}
      onMouseMove={handleMouseMove}
    >
      {/* Brass vertical rule — left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, #C4AE94 15%, #C4AE94 85%, transparent 100%)`,
          opacity: 0.35,
        }}
      />

      {/* Structural grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.012) 80px, rgba(255,255,255,0.012) 81px)
          `,
        }}
      />

      {/* Large faint background word — parallax */}
      <div
        className="absolute right-0 bottom-0 pointer-events-none select-none font-heading font-bold leading-none hidden md:block"
        aria-hidden="true"
        style={{
          fontSize: "clamp(100px, 18vw, 240px)",
          color: "rgba(196,174,148,0.03)",
          letterSpacing: "-0.04em",
          transform: `translateY(${15 - scrollPct * 22}%)`,
          willChange: "transform",
        }}
      >
        УСЛУГИ
      </div>

      <div ref={ref} className="relative max-w-content mx-auto px-4 md:px-8 py-14 md:py-32">

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
          className="font-heading font-bold mb-3"
          style={{
            fontSize: "clamp(28px, 3.5vw, 48px)",
            letterSpacing: "-0.01em",
            color: "#F0EBE3",
          }}
        >
          Наши услуги
        </RevealText>
        <p
          className={`max-w-md text-sm leading-relaxed mb-14 transition-all duration-600 ${
            inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
          }`}
          style={{ color: "rgba(148,180,193,0.60)", animationDelay: "0.32s" }}
        >
          Один подрядчик — полный цикл. От фундамента до финишной отделки.
        </p>

        {/* ── Gallery: image left + service list right ────────────── */}
        <div className="grid md:grid-cols-2 gap-0 md:gap-10 lg:gap-16 items-stretch">

          {/* Left: stacked images with crossfade */}
          <div
            className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden hidden md:block"
            style={{ background: "#0A1520" }}
          >
            {services.map((s, i) => (
              <div
                key={s.id}
                className="absolute inset-0 transition-all duration-700"
                style={{
                  background: SERVICE_BACKGROUNDS[s.id] || "#1A2B3D",
                  opacity: activeGallery === i ? 1 : 0,
                  transform: activeGallery === i ? "scale(1)" : "scale(1.06)",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  zIndex: activeGallery === i ? 2 : 1,
                }}
              >
                {/* Architectural overlay pattern */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(196,174,148,0.04) 40px, rgba(196,174,148,0.04) 41px),
                      repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(196,174,148,0.04) 40px, rgba(196,174,148,0.04) 41px)
                    `,
                  }}
                />
                {/* Service number watermark */}
                <div
                  className="absolute bottom-6 right-8 font-heading font-bold select-none pointer-events-none"
                  style={{
                    fontSize: "clamp(80px, 10vw, 140px)",
                    color: "rgba(196,174,148,0.06)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  0{i + 1}
                </div>
                {/* Brass corner accents */}
                <div className="absolute top-5 left-5 w-6 h-6 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-[1.5px]" style={{ background: "#C4AE94", opacity: 0.35 }} />
                  <div className="absolute top-0 left-0 h-full w-[1.5px]" style={{ background: "#C4AE94", opacity: 0.35 }} />
                </div>
                <div className="absolute bottom-5 right-5 w-6 h-6 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-full h-[1.5px]" style={{ background: "#C4AE94", opacity: 0.35 }} />
                  <div className="absolute bottom-0 right-0 h-full w-[1.5px]" style={{ background: "#C4AE94", opacity: 0.35 }} />
                </div>
              </div>
            ))}

            {/* Thin top fade */}
            <div
              className="absolute inset-x-0 top-0 h-16 pointer-events-none z-10"
              style={{ background: "linear-gradient(180deg, rgba(13,26,40,0.6) 0%, transparent 100%)" }}
            />
          </div>

          {/* Right: service text list */}
          <div className="flex flex-col justify-center">
            {services.map((s, i) => {
              const isActive = activeGallery === i;
              return (
                <Link
                  key={s.id}
                  href={`/uslugi/${s.slug}`}
                  className="group block border-b transition-all duration-500"
                  style={{
                    borderColor: "rgba(196,174,148,0.10)",
                    padding: "clamp(16px, 2.5vw, 28px) 0",
                  }}
                  onMouseEnter={() => setActiveGallery(i)}
                  onClick={() => setActiveGallery(i)}
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    {/* Service number */}
                    <span
                      className="text-[11px] font-semibold tabular-nums flex-shrink-0 mt-1.5 transition-all duration-500"
                      style={{
                        color: isActive ? "#C4AE94" : "rgba(196,174,148,0.25)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      0{i + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      {/* Title row */}
                      <div className="flex items-center justify-between gap-4">
                        <h3
                          className="font-heading font-bold transition-all duration-500"
                          style={{
                            fontSize: "clamp(18px, 2.2vw, 28px)",
                            color: isActive ? "#F0EBE3" : "rgba(240,235,227,0.20)",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {s.title}
                        </h3>
                        <ArrowRight
                          size={18}
                          className="flex-shrink-0 transition-all duration-500"
                          style={{
                            color: isActive ? "#C4AE94" : "rgba(196,174,148,0.12)",
                            transform: isActive ? "translateX(0)" : "translateX(-6px)",
                            opacity: isActive ? 1 : 0,
                          }}
                        />
                      </div>

                      {/* Description — reveals on active */}
                      <div
                        className="overflow-hidden transition-all duration-500"
                        style={{
                          maxHeight: isActive ? "80px" : "0px",
                          opacity: isActive ? 1 : 0,
                          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      >
                        <p
                          className="text-sm leading-relaxed mt-2 max-w-sm"
                          style={{ color: "rgba(148,180,193,0.60)" }}
                        >
                          {s.description.length > 120
                            ? s.description.slice(0, 120) + "…"
                            : s.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* View all CTA */}
            <div
              className={`mt-8 transition-all duration-600 ${
                inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
              }`}
              style={{ animationDelay: "0.5s" }}
            >
              <Link
                href="/uslugi"
                className="group inline-flex items-center gap-3 text-[11px] uppercase font-semibold transition-colors duration-200"
                style={{ color: "#C4AE94", letterSpacing: "0.14em" }}
              >
                <RollLink>Все услуги</RollLink>
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
