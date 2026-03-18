"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { company } from "@/data/company";
import { services } from "@/data/services";
import Logo from "@/components/ui/Logo";

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b ${
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

        <div className="max-w-content mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo size="md" light />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <div
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={scheduleClose}
              >
                <button
                  className="flex items-center gap-1.5 text-sm font-medium text-text-invert/70 hover:text-text-invert transition-colors duration-200"
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  Услуги
                  <ChevronDown
                    size={12}
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
                  className="text-sm font-medium text-text-invert/70 hover:text-text-invert transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <a
                href={`tel:${company.phone}`}
                className="hidden md:flex items-center gap-2 text-sm font-medium text-text-invert/65 hover:text-text-invert transition-colors duration-200"
              >
                <Phone size={12} className="text-accent" />
                {company.phoneDisplay}
              </a>

              <Link
                href="/kontakty"
                className="hidden md:block btn-primary text-sm px-5 py-2.5"
              >
                Обсудить проект
              </Link>

              <a href={`tel:${company.phone}`} className="md:hidden text-text-invert">
                <Phone size={20} />
              </a>

              <button
                className="md:hidden p-1 text-text-invert"
                onClick={() => setMobileOpen(true)}
                aria-label="Открыть меню"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Nav Overlay ─────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-bg-deep">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 md:px-8 h-16 border-b border-border-dark">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Logo size="md" light />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1 text-text-invert"
              aria-label="Закрыть меню"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex flex-col gap-0 px-6 py-8 flex-1 overflow-y-auto">
            <div className="mb-8">
              <p className="text-xs uppercase font-medium mb-4 text-text-muted" style={{ letterSpacing: "0.22em" }}>
                Услуги
              </p>
              {services.map((s) => (
                <Link
                  key={s.id}
                  href={`/uslugi/${s.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-base font-medium border-b border-border-dark/40 text-text-invert/75 hover:text-accent transition-colors duration-150"
                >
                  {s.title}
                </Link>
              ))}
            </div>

            {[
              { href: "/proekty",    label: "Проекты"    },
              { href: "/o-kompanii", label: "О компании" },
              { href: "/kontakty",   label: "Контакты"   },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="py-3.5 text-lg font-semibold border-b border-border-dark/40 last:border-0 text-text-invert"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Bottom contacts */}
          <div className="px-6 pb-10 flex flex-col gap-4 border-t border-border-dark">
            <a href={`tel:${company.phone}`} className="flex items-center gap-3 font-semibold text-lg mt-6 text-text-invert">
              <Phone size={18} className="text-accent" />
              {company.phoneDisplay}
            </a>
            <a href={`https://t.me/${company.telegram.replace("@", "")}`} className="text-sm text-text-muted">
              Telegram: {company.telegram}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
