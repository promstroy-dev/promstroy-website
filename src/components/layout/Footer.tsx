"use client";
import Link from "next/link";
import { Phone, Send, ArrowRight } from "lucide-react";
import { company } from "@/data/company";
import Logo from "@/components/ui/Logo";
import CopyButton from "@/components/ui/CopyButton";
import RollLink from "@/components/ui/RollLink";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t bg-bg-deep border-border-dark" style={{ color: "rgba(240,235,227,0.55)" }}>
      {/* Warm ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(196,174,148,0.035) 0%, transparent 70%)",
        }}
      />

      {/* Top brass accent */}
      <div
        className="h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent 5%, rgba(196,174,148,0.22) 30%, rgba(196,174,148,0.22) 70%, transparent 95%)",
        }}
      />

      <div className="max-w-content mx-auto px-4 md:px-8 py-10 md:py-16">

        {/* ── Mobile footer: stacked, compact ──────────────────────── */}
        <div className="md:hidden">
          {/* Brand */}
          <div className="mb-6">
            <Logo size="md" light />
            <p className="text-xs mt-3 leading-relaxed" style={{ color: "rgba(240,235,227,0.40)" }}>
              Коммерческое строительство в Самаре с 2015 года
            </p>
          </div>

          {/* Nav — horizontal row */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6 pb-6 border-b border-border-dark/40">
            {[
              { href: "/uslugi",     label: "Услуги"      },
              { href: "/proekty",    label: "Проекты"     },
              { href: "/o-kompanii", label: "О компании"  },
              { href: "/kontakty",   label: "Контакты"    },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm hover:text-accent transition-colors duration-200"
                style={{ color: "rgba(240,235,227,0.55)" }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contacts — compact list */}
          <div className="flex flex-col gap-2 mb-6 pb-6 border-b border-border-dark/40">
            <CopyButton
              text={company.phone}
              className="hover:text-accent transition-colors duration-200"
              style={{ color: "rgba(240,235,227,0.55)" }}
            >
              <Phone size={12} className="text-accent flex-shrink-0" />
              <a
                href={`tel:${company.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="text-sm hover:text-accent transition-colors"
              >
                {company.phoneDisplay}
              </a>
            </CopyButton>
            <CopyButton
              text={company.telegram}
              className="hover:text-accent transition-colors duration-200"
              style={{ color: "rgba(240,235,227,0.55)" }}
            >
              <Send size={12} className="text-accent flex-shrink-0" />
              <a
                href={`https://t.me/${company.telegram.replace("@", "")}`}
                onClick={(e) => e.stopPropagation()}
                className="text-sm hover:text-accent transition-colors"
              >
                {company.telegram}
              </a>
            </CopyButton>
            {company.email && (
              <p className="text-xs text-text-muted">{company.email}</p>
            )}
          </div>

          {/* Legal — compact block */}
          <div className="text-[11px] text-text-muted leading-relaxed space-y-1">
            <p>© {year} ПромСтрой. ИП Алимбеков О.В.</p>
            {(company.inn || company.ogrn) && (
              <p>
                {[
                  company.inn  && `ИНН ${company.inn}`,
                  company.ogrn && `ОГРНИП ${company.ogrn}`,
                ].filter(Boolean).join(" · ")}
              </p>
            )}
            {company.address && <p>{company.address}</p>}
            <Link href="/privacy" className="block mt-2 hover:text-accent transition-colors" style={{ color: "rgba(240,235,227,0.45)" }}>
              Политика конфиденциальности
            </Link>
          </div>
        </div>

        {/* ── Desktop footer: 4-column grid ────────────────────────── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Brand */}
          <div>
            <div className="mb-5">
              <Logo size="md" light />
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(240,235,227,0.45)" }}>
              Коммерческое строительство<br />в Самаре с 2015 года
            </p>
            <p className="text-xs text-text-muted">© {year} ПромСтрой. Все права защищены.</p>
            <p className="text-xs text-text-muted mt-1">ИП Алимбеков О.В.</p>
            {(company.inn || company.ogrn) && (
              <p className="text-xs text-text-muted mt-0.5">
                {[
                  company.inn  && `ИНН ${company.inn}`,
                  company.ogrn && `ОГРНИП ${company.ogrn}`,
                ].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p className="text-[10px] uppercase font-medium mb-4 text-text-muted" style={{ letterSpacing: "0.22em" }}>
              Навигация
            </p>
            <nav className="flex flex-col gap-2.5 text-sm">
              {[
                { href: "/uslugi",     label: "Услуги"      },
                { href: "/proekty",    label: "Проекты"     },
                { href: "/o-kompanii", label: "О компании"  },
                { href: "/kontakty",   label: "Контакты"    },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="group hover:text-accent transition-colors duration-200"
                  style={{ color: "rgba(240,235,227,0.55)" }}
                >
                  <RollLink>{label}</RollLink>
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Contacts */}
          <div>
            <p className="text-[10px] uppercase font-medium mb-4 text-text-muted" style={{ letterSpacing: "0.22em" }}>
              Контакты
            </p>
            <div className="flex flex-col gap-2.5 text-sm">
              <CopyButton
                text={company.phone}
                className="hover:text-accent transition-colors duration-200"
                style={{ color: "rgba(240,235,227,0.55)" }}
              >
                <Phone size={13} className="text-accent flex-shrink-0" />
                <a
                  href={`tel:${company.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="hover:text-accent transition-colors duration-200"
                >
                  {company.phoneDisplay}
                </a>
              </CopyButton>
              <CopyButton
                text={company.telegram}
                className="hover:text-accent transition-colors duration-200"
                style={{ color: "rgba(240,235,227,0.55)" }}
              >
                <Send size={13} className="text-accent flex-shrink-0" />
                <a
                  href={`https://t.me/${company.telegram.replace("@", "")}`}
                  onClick={(e) => e.stopPropagation()}
                  className="hover:text-accent transition-colors duration-200"
                >
                  {company.telegram}
                </a>
              </CopyButton>
              {company.email && (
                <p className="text-sm text-text-muted">{company.email}</p>
              )}
            </div>
          </div>

          {/* Col 4: Legal */}
          <div>
            <p className="text-[10px] uppercase font-medium mb-4 text-text-muted" style={{ letterSpacing: "0.22em" }}>
              Юридическое
            </p>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link
                href="/privacy"
                className="hover:text-accent transition-colors duration-200"
                style={{ color: "rgba(240,235,227,0.55)" }}
              >
                Политика конфиденциальности
              </Link>
              {company.address && (
                <p className="text-xs mt-2 leading-relaxed text-text-muted">{company.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Mini CTA — desktop only */}
        <div
          className="hidden md:flex mt-12 pt-8 border-t border-border-dark/60 flex-row justify-between items-center gap-4"
        >
          <div className="flex flex-row items-center gap-3">
            <span className="text-xs text-text-muted">Строительная компания ПромСтрой — Самара</span>
            <span className="text-text-muted">·</span>
            <span className="text-xs text-text-muted">Сайт для коммерческих клиентов и застройщиков</span>
          </div>
          <Link
            href="/kontakty"
            className="group inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 flex-shrink-0 transition-colors duration-200 hover:bg-accent/15"
            style={{
              color: "#C4AE94",
              border: "1px solid rgba(196,174,148,0.25)",
            }}
          >
            Начать проект
            <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
