"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { company } from "@/data/company";
import { ArrowRight, Phone } from "lucide-react";

export default function HeroFull() {
  const [mounted, setMounted] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setParallaxY(window.scrollY);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const visible = mounted;

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-bg-deep">

      {/* ── Background Layer A — primary dark gradient (Ken Burns in) ─ */}
      <div
        className={`absolute inset-0 ${mounted ? "animate-ken-burns-a" : ""}`}
        style={{
          background: `
            linear-gradient(
              145deg,
              #131620 0%,
              #0D0F13 40%,
              #090A0C 100%
            )
          `,
        }}
      />

      {/* ── Background Layer B — structural grid (drifts subtly) ───── */}
      <div
        className={`absolute inset-0 ${mounted ? "animate-ken-burns-b" : ""}`}
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 60px,
              rgba(255,255,255,0.016) 60px,
              rgba(255,255,255,0.016) 61px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 60px,
              rgba(255,255,255,0.016) 60px,
              rgba(255,255,255,0.016) 61px
            )
          `,
        }}
      />

      {/* ── Cinematic video layer — right half, gradient-masked ───── */}
      {/* Video: 3363441 — dark crane silhouettes against overcast sky   */}
      {/* Hidden on mobile via container; <source media> blocks download  */}
      <div
        className="absolute right-0 top-0 bottom-0 pointer-events-none hidden md:block"
        style={{
          width: "65%",
          // Mask: left edge fades in slowly so the video stays fully exposed
          // across the right ~65% — text column on the left stays clean
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 22%, rgba(0,0,0,0.90) 40%, black 55%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 22%, rgba(0,0,0,0.90) 40%, black 55%)",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: 0.78,
            objectPosition: "70% center",
          }}
        >
          <source
            media="(min-width: 768px)"
            src="/video/hero-loop.mp4"
            type="video/mp4"
          />
        </video>
        {/* Thin top fade only — sky merges into header area */}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(9,10,12,0.85) 0%, transparent 100%)",
          }}
        />
        {/* Thin bottom fade — grounds the silhouettes into the stats bar */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{
            background: "linear-gradient(0deg, rgba(9,10,12,0.90) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Industrial glow — welding/spotlight pulse, right side ── */}
      <div
        className="absolute pointer-events-none animate-industrial-glow hidden sm:block"
        style={{
          right: "-6%",
          top: "8%",
          width: "62%",
          height: "80%",
          background:
            "radial-gradient(ellipse 68% 58% at 72% 48%, rgba(192,154,92,0.085) 0%, rgba(192,154,92,0.032) 42%, transparent 68%)",
        }}
      />

      {/* ── Light rake — diagonal streak sweeping right half ───────── */}
      <div className="absolute right-0 top-0 bottom-0 w-[60%] overflow-hidden pointer-events-none hidden lg:block">
        <div
          className="absolute animate-light-rake"
          style={{
            top: "-15%",
            left: "5%",
            width: "22%",
            height: "130%",
            background:
              "linear-gradient(to right, transparent, rgba(240,235,227,0.018) 38%, rgba(240,235,227,0.026) 50%, rgba(240,235,227,0.018) 62%, transparent)",
          }}
        />
      </div>

      {/* ── Directional light — top-left atmospheric glow ─────────── */}
      <div
        className="absolute inset-0 pointer-events-none animate-light-drift"
        style={{
          background: `radial-gradient(
            ellipse 60% 50% at 15% 20%,
            rgba(192,154,92,0.06) 0%,
            transparent 70%
          )`,
        }}
      />

      {/* ── Bottom-right architectural corner detail ───────────────── */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{
          background: `linear-gradient(
            130deg,
            transparent 55%,
            rgba(192,154,92,0.04) 100%
          )`,
        }}
      />

      {/* ── Large faint "2008" — structural background year element ── */}
      {/* Parallax: drifts upward at 0.12× scroll speed — recedes into depth */}
      <div
        className="absolute right-[-2%] bottom-24 pointer-events-none select-none hidden lg:block"
        style={{
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 700,
          fontSize: "clamp(140px, 18vw, 280px)",
          lineHeight: 1,
          color: "rgba(255,255,255,0.018)",
          letterSpacing: "-0.04em",
          userSelect: "none",
          transform: `translateY(${parallaxY * -0.12}px)`,
          willChange: "transform",
        }}
      >
        2008
      </div>

      {/* ── Noise grain overlay ───────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.04,
        }}
      />

      {/* ── Brass vertical rule — left edge, gradient fade ────────── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            #C09A5C 12%,
            #C09A5C 88%,
            transparent 100%
          )`,
          opacity: 0.65,
        }}
      />

      {/* ── Vertical year label — right structural detail ─────────── */}
      <div
        className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-3 pointer-events-none"
        style={{ transform: "translateY(-50%) rotate(90deg)", transformOrigin: "center center" }}
      >
        <span
          className="text-[9px] font-medium uppercase tracking-[0.32em] whitespace-nowrap"
          style={{ color: "rgba(240,235,227,0.20)" }}
        >
          САМАРА · С 2008 ГОДА
        </span>
      </div>

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="relative flex-1 flex flex-col justify-center max-w-content mx-auto px-6 md:px-8 pt-32 pb-10 w-full">

        {/* Eyebrow — clipped reveal */}
        <div
          className={`mb-7 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "0.05s" }}
        >
          <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.30em]"
                style={{ color: "#C09A5C" }}>
            <span
              className="inline-block h-px w-8"
              style={{ background: "#C09A5C", opacity: 0.8 }}
            />
            Самара · Коммерческое строительство
          </span>
        </div>

        {/* Headline — maximum scale on desktop */}
        <div
          className={`mb-7 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "0.15s" }}
        >
          <h1
            className="font-heading font-bold text-text-invert leading-[1.02] max-w-4xl"
            style={{ fontSize: "clamp(42px, 6.5vw, 88px)", letterSpacing: "-0.02em" }}
          >
            Коммерческое<br />
            <span style={{ color: "#C09A5C" }}>строительство</span><br />
            и ремонт
          </h1>
        </div>

        {/* Divider line */}
        <div
          className={`mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "0.25s" }}
        >
          <div
            className="w-16 h-px"
            style={{ background: "rgba(240,235,227,0.18)" }}
          />
        </div>

        {/* Subheadline */}
        <div
          className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "0.30s" }}
        >
          <p
            className="text-lg md:text-xl leading-relaxed max-w-[460px]"
            style={{ color: "rgba(240,235,227,0.52)", fontFamily: "var(--font-inter)" }}
          >
            Офисы, рестораны, торговые центры, склады.{" "}
            <br className="hidden md:block" />
            Полный цикл. Один подрядчик.
          </p>
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-wrap items-center gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "0.40s" }}
        >
          {/* Primary CTA — solid brass */}
          <Link
            href="/kontakty"
            className="inline-flex items-center gap-2.5 font-semibold px-8 py-4 text-sm tracking-wide transition-all duration-250 hover:-translate-y-0.5"
            style={{
              background: "#C09A5C",
              color: "#0A0908",
              letterSpacing: "0.06em",
            }}
          >
            Обсудить проект
            <ArrowRight size={15} />
          </Link>

          {/* Secondary CTA — ghost */}
          <Link
            href="/proekty"
            className="inline-flex items-center gap-2.5 font-semibold px-8 py-4 text-sm border border-text-invert/20 hover:border-text-invert/50 text-text-invert/70 hover:text-text-invert transition-all duration-250 hover:-translate-y-0.5"
            style={{ letterSpacing: "0.04em" }}
          >
            Смотреть проекты
          </Link>

          {/* Phone — desktop only */}
          <a
            href={`tel:${company.phone}`}
            className="hidden md:inline-flex items-center gap-2 text-sm ml-2 text-text-invert/40 hover:text-text-invert/75 transition-colors duration-200"
          >
            <Phone size={13} className="text-accent" />
            {company.phoneDisplay}
          </a>
        </div>
      </div>

      {/* ── Stats strip ───────────────────────────────────────────── */}
      <div
        className="relative border-t"
        style={{ borderColor: "rgba(30,32,40,0.9)", background: "rgba(9,10,12,0.7)" }}
      >
        {/* Brass top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #C09A5C 30%, #C09A5C 70%, transparent)", opacity: 0.25 }}
        />

        <div className="max-w-content mx-auto px-6 md:px-8 py-7 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x"
               style={{ '--tw-divide-opacity': '0.2' } as React.CSSProperties}>
            {company.stats.map((s, i) => (
              <div
                key={i}
                className={`${i > 0 ? "md:pl-10" : ""} ${i < 3 ? "md:pr-10" : ""}`}
              >
                <p
                  className="font-heading font-bold leading-none mb-1.5"
                  style={{
                    fontSize: "clamp(26px, 3.2vw, 40px)",
                    color: "#C09A5C",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.value}
                </p>
                <p
                  className="text-[10px] uppercase tracking-widest"
                  style={{ color: "rgba(240,235,227,0.35)" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
