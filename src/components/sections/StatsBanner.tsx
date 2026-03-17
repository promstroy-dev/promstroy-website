"use client";
import { useEffect, useRef, useState } from "react";
import { company } from "@/data/company";
import { useInView } from "@/hooks/useInView";

/** Parse "18", "4", "[N]+", "Самара" → { num, prefix, suffix } */
function parseCounter(value: string): { num: number | null; prefix: string; suffix: string } {
  const match = value.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
  if (match) {
    return { num: parseInt(match[2], 10), prefix: match[1], suffix: match[3] };
  }
  return { num: null, prefix: "", suffix: value };
}

function CounterNumber({ value, inView }: { value: string; inView: boolean }) {
  const { num, prefix, suffix } = parseCounter(value);
  const [display, setDisplay] = useState(num !== null ? 0 : null);
  const started = useRef(false);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView || num === null || started.current) return;
    started.current = true;

    const duration = 1600;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quart — heavier deceleration for weight
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * num);
      setDisplay(current);

      // Pop animation when complete
      if (progress >= 1 && numRef.current) {
        numRef.current.classList.add("animate-counter-pop");
        setTimeout(() => numRef.current?.classList.remove("animate-counter-pop"), 400);
      }

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, num]);

  if (num === null) {
    return <>{value}</>;
  }

  return (
    <span ref={numRef}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function StatsBanner() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="relative border-b overflow-hidden"
      style={{ background: "#1A2B3D", borderColor: "#1E3348" }}
    >
      {/* Top brass accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 5%, #C4AE94 30%, #C4AE94 70%, transparent 95%)", opacity: 0.3 }}
      />

      {/* Background structural texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 80px,
            rgba(255,255,255,0.012) 80px,
            rgba(255,255,255,0.012) 81px
          )`,
        }}
      />

      <div className="relative max-w-content mx-auto px-4 md:px-8 py-20 md:py-28">

        {/* Section label */}
        <div
          className={`mb-14 transition-all duration-600 ${inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-px" style={{ background: "#C4AE94", opacity: 0.7 }} />
            <span
              className="text-[10px] uppercase font-medium"
              style={{ color: "rgba(140,130,120,1)", letterSpacing: "0.26em" }}
            >
              Цифры и факты
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {company.stats.map((s, i) => (
            <div
              key={i}
              className={`relative transition-all duration-600 ${
                inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
              }`}
              style={{ animationDelay: `${0.05 + i * 0.1}s` }}
            >
              {/* Left vertical rule for all but first */}
              {i > 0 && (
                <div
                  className="hidden md:block absolute left-0 top-2 bottom-2 w-px"
                  style={{ background: "#1E3348" }}
                />
              )}

              <div className={`${i > 0 ? "md:pl-12" : ""} ${i < 3 ? "md:pr-12" : ""} pl-0 pr-0 pb-8 md:pb-0`}>
                <p
                  className="font-heading font-bold leading-none mb-3"
                  style={{
                    fontSize: "clamp(48px, 6vw, 88px)",
                    color: "#C4AE94",
                    letterSpacing: "-0.03em",
                  }}
                >
                  <CounterNumber value={s.value} inView={inView} />
                </p>
                <p
                  className="text-xs uppercase font-medium"
                  style={{ color: "rgba(140,130,120,0.85)", letterSpacing: "0.18em" }}
                >
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
