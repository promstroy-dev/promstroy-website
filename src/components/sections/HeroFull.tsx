"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import RollLink from "@/components/ui/RollLink";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";

export default function HeroFull() {
  const [mounted, setMounted] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  // Normalized mouse position: -0.5 → +0.5
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rafRef     = useRef<number>(0);
  const mouseRafRef = useRef<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reducedMotion) return; // skip parallax for reduced-motion preference
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
  }, [reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    cancelAnimationFrame(mouseRafRef.current);
    mouseRafRef.current = requestAnimationFrame(() => {
      setMouse({
        x: (e.clientX - rect.left) / rect.width  - 0.5,
        y: (e.clientY - rect.top)  / rect.height - 0.5,
      });
    });
  };

  const visible = mounted;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-bg-deep"
      onMouseMove={handleMouseMove}
    >

      {/* ── Background Layer A — primary dark gradient (Ken Burns in) ─ */}
      <div
        className={`absolute inset-0 ${mounted ? "animate-ken-burns-a" : ""}`}
        style={{
          background: `
            linear-gradient(
              145deg,
              #0D1A28 0%,
              #0A1520 40%,
              #060F18 100%
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
          preload="metadata"
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
            background: "linear-gradient(180deg, rgba(6,10,16,0.85) 0%, transparent 100%)",
          }}
        />
        {/* Thin bottom fade — grounds the silhouettes into the stats bar */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{
            background: "linear-gradient(0deg, rgba(6,10,16,0.90) 0%, transparent 100%)",
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
            "radial-gradient(ellipse 68% 58% at 72% 48%, rgba(196,174,148,0.085) 0%, rgba(196,174,148,0.032) 42%, transparent 68%)",
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
            rgba(196,174,148,0.06) 0%,
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
            rgba(196,174,148,0.04) 100%
          )`,
        }}
      />

      {/* ── Large faint "2015" — structural background year element ── */}
      {/* Parallax: scroll + shallow mouse drift (middle depth layer) */}
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
          // No CSS transition — scroll+mouse both driven by RAF (smooth at 60fps)
          transform: `translateY(${parallaxY * -0.12}px) translateX(${mouse.x * 18}px)`,
          willChange: "transform",
        }}
      >
        2015
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
            #C4AE94 12%,
            #C4AE94 88%,
            transparent 100%
          )`,
          opacity: 0.65,
        }}
      />
      {/* Architect's dimension ticks — cross the brass rule at intervals */}
      {/* 5 evenly-spaced tick marks: subtle horizontal lines, like a scale bar */}
      {[22, 35, 50, 65, 78].map((pct) => (
        <div
          key={pct}
          className="absolute left-0 pointer-events-none hidden sm:block"
          style={{
            top: `${pct}%`,
            width: "8px",
            height: "1px",
            background: "#C4AE94",
            opacity: 0.28,
          }}
        />
      ))}

      {/* ── Vertical year label — right structural detail ─────────── */}
      <div
        className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-3 pointer-events-none"
        style={{ transform: "translateY(-50%) rotate(90deg)", transformOrigin: "center center" }}
      >
        <span
          className="text-[9px] font-medium uppercase tracking-[0.32em] whitespace-nowrap"
          style={{ color: "rgba(240,235,227,0.20)" }}
        >
          САМАРА · С 2015 ГОДА
        </span>
      </div>

      {/* ── Main content ──────────────────────────────────────────── */}
      {/* Foreground layer: moves opposite to background (pops toward viewer) */}
      <div
        className="relative flex-1 flex flex-col justify-center max-w-content mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-20 md:pb-10 w-full"
        style={{
          transform: `translateX(${mouse.x * -5}px) translateY(${mouse.y * -3}px)`,
          transition: "transform 1.0s cubic-bezier(0.19, 1, 0.22, 1)",
          willChange: "transform",
        }}
      >

        {/* Eyebrow — spring reveal */}
        <motion.div
          className="mb-7"
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.30em]"
                style={{ color: "#C4AE94" }}>
            <motion.span
              className="inline-block h-px"
              style={{ background: "#C4AE94", opacity: 0.8 }}
              initial={{ width: 0 }}
              animate={visible ? { width: 32 } : {}}
              transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
            />
            Самара · Коммерческое строительство
          </span>
        </motion.div>

        {/* Headline — Unbounded display font, spring entrance */}
        <motion.div
          className="mb-7"
          initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
          animate={visible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ type: "spring", stiffness: 50, damping: 18, delay: 0.2 }}
        >
          <h1
            className="font-bold text-text-invert leading-[1.0] max-w-4xl"
            style={{
              fontFamily: "var(--font-unbounded), var(--font-space-grotesk), sans-serif",
              fontSize: "clamp(38px, 6vw, 82px)",
              letterSpacing: "-0.03em",
            }}
          >
            Коммерческое<br />
            <span style={{ color: "#C4AE94" }}>строительство</span><br />
            и ремонт
          </h1>
        </motion.div>

        {/* Divider line — draw-in */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={visible ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.4 }}
          style={{ originX: 0 }}
        >
          <div
            className="w-16 h-px"
            style={{ background: "rgba(240,235,227,0.18)" }}
          />
        </motion.div>

        {/* Subheadline */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.45 }}
        >
          <p
            className="text-lg md:text-xl leading-relaxed max-w-[460px]"
            style={{ color: "rgba(240,235,227,0.52)", fontFamily: "var(--font-inter)" }}
          >
            Офисы, рестораны, торговые центры, склады.{" "}
            <br className="hidden md:block" />
            Полный цикл. Один подрядчик.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.55 }}
        >
          {/* Primary CTA — warm stone material */}
          <MagneticButton>
            <Link
              href="/kontakty"
              className="group btn-primary gap-2 md:gap-2.5 px-5 py-3 md:px-8 md:py-4 text-[13px] md:text-sm"
            >
              <RollLink>Обсудить проект</RollLink>
              <ArrowRight size={15} />
            </Link>
          </MagneticButton>

          {/* Secondary CTA — warm stone ghost */}
          <MagneticButton>
            <Link
              href="/proekty"
              className="group btn-ghost-dark inline-flex items-center gap-2 md:gap-2.5 px-5 py-3 md:px-8 md:py-4 text-[13px] md:text-sm"
            >
              <RollLink>Смотреть проекты</RollLink>
            </Link>
          </MagneticButton>

        </motion.div>
      </div>

    </section>
  );
}
