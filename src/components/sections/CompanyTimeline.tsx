"use client";

import { useEffect, useRef, useCallback } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Milestone {
  year: number;
  title: string;
  body: string;
}

const milestones: readonly Milestone[] = [
  { year: 2015, title: "Основание компании", body: "Начало работы в Самаре. Первые объекты — ремонт коммерческих помещений малой площади." },
  { year: 2017, title: "Первые крупные объекты", body: "Выход на строительство складских комплексов и торговых площадей. Расширение команды." },
  { year: 2019, title: "Полный цикл работ", body: "Запуск направления инженерных сетей. Теперь один подрядчик от фундамента до финишной отделки." },
  { year: 2021, title: "50 объектов сдано", body: "Более 50 реализованных проектов в Самаре и Самарской области. Офисы, склады, рестораны, торговые центры." },
  { year: 2024, title: "10 000+ м² построено", body: "Более 10 000 квадратных метров коммерческой недвижимости. Продолжаем расти." },
];

function TimelineEntry({ milestone, index }: { milestone: Milestone; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className="timeline-entry relative"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Desktop layout */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: "15% 1fr" }}>
        {/* Year marker */}
        <div className="relative flex items-start justify-end pr-8">
          <span
            className="timeline-year stat-value-masked font-heading font-bold leading-none select-none"
            style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
          >
            {milestone.year}
          </span>
        </div>

        {/* Content block */}
        <div className="relative pl-10">
          {/* Dot on timeline */}
          <div
            className="absolute top-[10px] -left-[4px] w-2 h-2"
            style={{ background: "#C4AE94" }}
          />
          {/* Horizontal dash */}
          <div
            className="absolute top-[13px] left-[4px] h-px"
            style={{ width: "32px", background: "linear-gradient(90deg, #C4AE94, rgba(196,174,148,0.2))" }}
          />

          <h3
            className="font-heading font-semibold text-lg mb-2 leading-snug"
            style={{ color: "#F0EBE3" }}
          >
            {milestone.title}
          </h3>
          <p
            className="text-sm leading-relaxed max-w-md"
            style={{ color: "#7A8E98" }}
          >
            {milestone.body}
          </p>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden relative pl-8">
        {/* Dot on timeline */}
        <div
          className="absolute top-[6px] left-[-4px] w-2 h-2"
          style={{ background: "#C4AE94" }}
        />
        {/* Horizontal dash */}
        <div
          className="absolute top-[9px] left-[4px] h-px"
          style={{ width: "20px", background: "linear-gradient(90deg, #C4AE94, rgba(196,174,148,0.2))" }}
        />

        <span
          className="timeline-year stat-value-masked font-heading font-bold leading-none block mb-2"
          style={{ fontSize: "32px" }}
        >
          {milestone.year}
        </span>
        <h3
          className="font-heading font-semibold text-base mb-1 leading-snug"
          style={{ color: "#F0EBE3" }}
        >
          {milestone.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "#7A8E98" }}
        >
          {milestone.body}
        </p>
      </div>
    </div>
  );
}

export default function CompanyTimeline() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const yearEls = useRef<NodeListOf<Element> | null>(null);
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  const handleScroll = useCallback(() => {
    if (reducedMotion || !sectionRef.current || !yearEls.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const scrollDelta = sectionRect.top;

    yearEls.current.forEach((el) => {
      (el as HTMLElement).style.transform = `translateY(${scrollDelta * -0.08}px)`;
    });
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    yearEls.current = sectionRef.current?.querySelectorAll(".timeline-year") ?? null;

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, handleScroll]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "#1A2B3D" }}
    >
      {/* Structural grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(196,174,148,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(196,174,148,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-content mx-auto px-4 md:px-8">
        {/* Section header */}
        <div
          ref={headerRef}
          className="mb-16 md:mb-24"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px" style={{ background: "#C4AE94", opacity: 0.6 }} />
            <span
              className="text-[10px] uppercase font-medium"
              style={{ color: "#7A8E98", letterSpacing: "0.26em" }}
            >
              История компании
            </span>
          </div>
          <h2
            className="font-heading font-bold text-3xl md:text-4xl"
            style={{ color: "#F0EBE3" }}
          >
            Наш путь
          </h2>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical timeline line — desktop */}
          <div
            className="hidden md:block absolute top-0 bottom-0 w-[2px]"
            style={{
              left: "15%",
              background: "linear-gradient(to bottom, transparent 0%, #C4AE94 8%, #C4AE94 92%, transparent 100%)",
              opacity: 0.35,
            }}
          />
          {/* Vertical timeline line — mobile */}
          <div
            className="md:hidden absolute top-0 bottom-0 w-[2px] left-0"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, #C4AE94 8%, #C4AE94 92%, transparent 100%)",
              opacity: 0.35,
            }}
          />

          {/* Milestone entries */}
          <div className="flex flex-col gap-16 md:gap-20">
            {milestones.map((milestone, i) => (
              <TimelineEntry key={milestone.year} milestone={milestone} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
