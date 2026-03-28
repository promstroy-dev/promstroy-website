"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, Menu, X, ChevronDown, Send, ArrowRight } from "lucide-react";
import { company } from "@/data/company";
import { services } from "@/data/services";
import Logo from "@/components/ui/Logo";
import RollLink from "@/components/ui/RollLink";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? y / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Keyboard: close dropdown on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const openServices = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setServicesOpen(true);
  };

  const scheduleClose = () => {
    closeTimeoutRef.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b animate-nav-flip-in ${
          scrolled ? "border-border-dark shadow-2xl" : "border-transparent"
        }`}
        style={scrolled ? {
          background: "rgba(8,14,22,0.97)",
          backdropFilter: "blur(12px)",
        } : {
          background: "transparent",
        }}
      >
        {/* Brass top accent rule — visible when scrolled */}
        {scrolled && (
          <div
            className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 5%, rgba(196,174,148,0.28) 30%, rgba(196,174,148,0.28) 70%, transparent 95%)",
            }}
          />
        )}

        {/* Scroll progress bar — brass → steel trace at bottom of header */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left pointer-events-none"
          style={{
            background: "linear-gradient(90deg, rgba(196,174,148,0.9) 0%, rgba(84,119,146,0.6) 100%)",
            transform: `scaleX(${scrollProgress})`,
            opacity: scrolled ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        <div className="max-w-content mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo size="md" light />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-9">
              <div
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={scheduleClose}
              >
                <button
                  className="group flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-text-invert/70 hover:text-text-invert transition-colors duration-200"
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  <RollLink>Услуги</RollLink>
                  <ChevronDown
                    size={10}
                    className={`opacity-50 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Invisible hover bridge — fills the gap between button and menu */}
                {servicesOpen && (
                  <div className="absolute top-full left-0 right-0 h-3" aria-hidden="true" />
                )}

                {servicesOpen && (
                  <div
                    className="absolute top-full left-0 mt-3 w-72 py-2 shadow-2xl border border-border-dark overflow-hidden"
                    style={{
                      background: "#0D1A28",
                      boxShadow: "0 20px 48px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.25)",
                    }}
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleClose}
                    role="menu"
                  >
                    {/* Warm top micro-rule — architectural header accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
                      style={{ background: "linear-gradient(90deg, rgba(196,174,148,0.45) 0%, rgba(196,174,148,0.12) 60%, transparent 100%)" }}
                    />
                    {/* Left warm rule */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
                      style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(196,174,148,0.30) 20%, rgba(196,174,148,0.30) 80%, transparent 100%)" }}
                    />
                    {services.map((s) => (
                      <Link
                        key={s.id}
                        href={`/uslugi/${s.slug}`}
                        role="menuitem"
                        onClick={() => setServicesOpen(false)}
                        className="block pl-5 pr-4 py-3 text-sm text-text-invert/60 hover:text-accent hover:bg-bg-section transition-colors duration-150 focus:outline-none focus:text-accent focus:bg-bg-section"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {[
                { href: "/proekty",    label: "Проекты"    },
                { href: "/o-kompanii", label: "О компании" },
                { href: "/kontakty",   label: "Контакты"   },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="group text-[11px] uppercase tracking-[0.14em] font-semibold text-text-invert/70 hover:text-text-invert transition-colors duration-200"
                >
                  <RollLink>{label}</RollLink>
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3 md:gap-4">
              <a
                href={`tel:${company.phone}`}
                className="hidden md:flex items-center gap-2 text-sm font-medium text-text-invert/65 hover:text-text-invert transition-colors duration-200"
              >
                <Phone size={12} className="text-accent" />
                {company.phoneDisplay}
              </a>

              <Link
                href="/kontakty"
                className="group hidden lg:block btn-primary text-sm px-5 py-2.5"
              >
                <RollLink>Обсудить проект</RollLink>
              </Link>

              {/* Mobile: phone icon */}
              <a href={`tel:${company.phone}`} className="md:hidden text-text-invert/70 flex-shrink-0 p-1">
                <Phone size={18} />
              </a>

              {/* Mobile: hamburger */}
              <button
                className="md:hidden text-text-invert flex-shrink-0 p-1"
                onClick={() => setMobileOpen(true)}
                aria-label="Открыть меню"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Nav Overlay — Framer Motion animated ───────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col"
            style={{ background: "#080E16" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-border-dark/50">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <Logo size="md" light />
              </Link>
              <motion.button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-text-invert/70"
                aria-label="Закрыть меню"
                whileTap={{ scale: 0.9 }}
              >
                <X size={22} />
              </motion.button>
            </div>

            {/* Nav items — staggered entrance */}
            <nav className="flex flex-col px-5 pt-8 flex-1 overflow-y-auto">
              {/* Main pages */}
              {[
                { href: "/uslugi",     label: "Услуги"      },
                { href: "/proekty",    label: "Проекты"     },
                { href: "/o-kompanii", label: "О компании"  },
                { href: "/kontakty",   label: "Контакты"    },
              ].map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, type: "spring", stiffness: 120, damping: 20 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 border-b border-border-dark/30"
                  >
                    <span
                      className="font-heading font-bold text-text-invert"
                      style={{ fontSize: "clamp(20px, 5vw, 28px)", letterSpacing: "-0.02em" }}
                    >
                      {label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* Service sub-links */}
              <motion.div
                className="mt-6 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p
                  className="text-[9px] uppercase font-medium mb-3"
                  style={{ color: "rgba(196,174,148,0.50)", letterSpacing: "0.26em" }}
                >
                  Направления
                </p>
                <div className="flex flex-col gap-0">
                  {services.map((s, i) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + i * 0.04 }}
                    >
                      <Link
                        href={`/uslugi/${s.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 py-2.5 text-sm text-text-invert/50 hover:text-accent transition-colors duration-150"
                      >
                        <span className="w-2 h-px flex-shrink-0" style={{ background: "rgba(196,174,148,0.35)" }} />
                        {s.title}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </nav>

            {/* Bottom: contacts + CTA */}
            <motion.div
              className="px-5 py-6 border-t border-border-dark/40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center gap-2.5 font-semibold text-text-invert"
                >
                  <Phone size={15} className="text-accent" />
                  {company.phoneDisplay}
                </a>
                <span className="w-px h-4 bg-border-dark/50" />
                <a
                  href={`https://t.me/${company.telegram.replace("@", "")}`}
                  className="flex items-center gap-2 text-sm text-text-invert/50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send size={13} className="text-accent/60" />
                  Telegram
                </a>
              </div>

              <Link
                href="/kontakty"
                onClick={() => setMobileOpen(false)}
                className="btn-primary flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold"
              >
                Обсудить проект
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
