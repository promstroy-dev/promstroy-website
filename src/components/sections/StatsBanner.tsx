"use client";
import { useEffect, useRef, useState } from "react";
import { company } from "@/data/company";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || num === null || started.current) return;
    started.current = true;

    // Skip animation if user prefers reduced motion — jump straight to final value
    if (reducedMotion) {
      setDisplay(num);
      return;
    }

    const duration = 1600;
    const start = performance.now();

    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * num);
      frame++;

      // Scramble effect: random digit flickers, probability drops as progress rises
      const scrambleChance = Math.max(0, 1 - progress * 1.5);
      if (frame % 3 === 0 && Math.random() < scrambleChance && num > 1) {
        setDisplay(Math.floor(Math.random() * (num + 1)));
      } else {
        setDisplay(current);
      }

      // Pop animation when complete — lock to final value
      if (progress >= 1) {
        setDisplay(num);
        if (numRef.current) {
          numRef.current.classList.add("animate-counter-pop");
          setTimeout(() => numRef.current?.classList.remove("animate-counter-pop"), 400);
        }
        return;
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, num, reducedMotion]);

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
  // Only show stats that have a non-empty value
  const stats = company.stats.filter((s) => s.value.trim() !== "");

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

        {/* Stats grid — columns adapt to number of visible stats */}
        <div className={`grid gap-0 grid-cols-2 ${stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
          {stats.map((s, i) => (
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

              <div className={`${i > 0 ? "md:pl-12" : ""} ${i < stats.length - 1 ? "md:pr-12" : ""} pl-0 pr-0 pb-8 md:pb-0`}>
                <p
                  className="stat-value-masked font-heading font-bold leading-none mb-3"
                  style={{
                    fontSize: "clamp(48px, 6vw, 88px)",
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
                {s.sublabel && (
                  <p
                    className="text-[10px] mt-1.5"
                    style={{ color: "rgba(140,130,120,0.50)", letterSpacing: "0.04em" }}
                  >
                    {s.sublabel}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Geographic anchor — preserves regional context without occupying a stat slot */}
        <div
          className={`mt-14 pt-8 border-t flex items-center gap-4 transition-all duration-600 ${
            inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
          }`}
          style={{ borderColor: "#1E3348", animationDelay: "0.45s" }}
        >
          <div className="w-3 h-px flex-shrink-0" style={{ background: "#C4AE94", opacity: 0.5 }} />
          <span
            className="text-[10px] uppercase font-medium"
            style={{ color: "rgba(140,130,120,0.65)", letterSpacing: "0.22em" }}
          >
            Самара и Самарская область
          </span>
        </div>
      </div>
    </section>
  );
}
