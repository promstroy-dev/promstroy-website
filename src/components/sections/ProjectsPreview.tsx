"use client";
import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import TiltCard from "@/components/ui/TiltCard";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { ArrowRight } from "lucide-react";
import CursorGlow from "@/components/ui/CursorGlow";

export default function ProjectsPreview() {
  const preview = projects.slice(0, 3);
  const { ref, inView } = useInView<HTMLDivElement>();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: "#1A2B3D" }}
    >
      {/* Background structural grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 80px,
            rgba(255,255,255,0.011) 80px,
            rgba(255,255,255,0.011) 81px
          )`,
        }}
      />

      <CursorGlow />
      <div ref={ref} className="relative max-w-content mx-auto px-4 md:px-8">

        {/* Header */}
        <div
          className={`flex items-end justify-between mb-12 transition-all duration-600 ${
            inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px" style={{ background: "#C4AE94", opacity: 0.7 }} />
              <span
                className="text-[10px] uppercase font-medium"
                style={{ color: "#7A8E98", letterSpacing: "0.26em" }}
              >
                Реализованные объекты
              </span>
            </div>
            <h2
              className="font-heading font-bold mb-2"
              style={{
                fontSize: "clamp(28px, 3.5vw, 48px)",
                color: "#F0EBE3",
                letterSpacing: "-0.01em",
              }}
            >
              Наши проекты
            </h2>
            <p
              className="text-sm max-w-md leading-relaxed"
              style={{ color: "#7A8E98" }}
            >
              Завершённые объекты коммерческого строительства и ремонта в Самаре
            </p>
          </div>

          <Link
            href="/proekty"
            className="hidden md:inline-flex items-center gap-2 font-semibold text-sm transition-colors duration-200 text-accent hover:text-accent-hover"
          >
            Все проекты
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards — spotlight: active card full opacity, neighbors dim */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4 pb-4 md:mx-0 md:px-0 md:pb-0 md:overflow-visible md:grid md:grid-cols-3 md:gap-5">
          {preview.map((p, i) => (
            // Outer: handles spotlight opacity (separate from animation layer)
            <div
              key={p.id}
              className="snap-start shrink-0 w-[82vw] md:w-auto"
              style={{
                opacity: activeCard !== null && activeCard !== i ? 0.45 : 1,
                transition: "opacity 0.25s ease",
              }}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Mid: scroll-reveal animation */}
              <div
                className={inView ? "animate-clip-reveal-y" : "invisible"}
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                {/* Inner: 3D tilt — brass specular on dark steel surface */}
                <TiltCard specular="brass" maxTilt={5}>
                  <ProjectCard project={p} />
                </TiltCard>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 md:hidden">
          <Link
            href="/proekty"
            className="inline-flex items-center gap-2 font-semibold text-sm text-accent"
          >
            Все проекты <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
