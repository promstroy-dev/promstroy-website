"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { company } from "@/data/company";
import { services } from "@/data/services";
import Logo from "@/components/ui/Logo";

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b ${
          scrolled ? "border-border-dark shadow-2xl" : "border-transparent"
        }`}
        style={scrolled ? {
          background: "rgba(9,10,12,0.96)",
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
              background: "linear-gradient(90deg, transparent 5%, rgba(192,154,92,0.30) 30%, rgba(192,154,92,0.30) 70%, transparent 95%)",
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
                className="relative group"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1.5 text-sm font-medium text-text-invert/70 hover:text-text-invert transition-colors duration-200">
                  Услуги <ChevronDown size={12} className="opacity-50" />
                </button>

                {servicesOpen && (
                  <div
                    className="absolute top-full left-0 mt-3 w-68 py-1.5 shadow-2xl border border-border-dark"
                    style={{ background: "#0D0F13" }}
                  >
                    {services.map((s) => (
                      <Link
                        key={s.id}
                        href={`/uslugi/${s.slug}`}
                        className="block px-4 py-2.5 text-sm text-text-invert/65 hover:text-accent hover:bg-bg-section transition-colors duration-150"
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
                className="hidden md:block text-sm font-semibold px-5 py-2.5 transition-all duration-200 hover:-translate-y-px hover:bg-accent-hover"
                style={{
                  background: "#C09A5C",
                  color: "#0A0908",
                  letterSpacing: "0.04em",
                }}
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
