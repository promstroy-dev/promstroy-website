"use client";
import Link from "next/link";
import { Phone, Send } from "lucide-react";
import { company } from "@/data/company";
import Logo from "@/components/ui/Logo";
import CopyButton from "@/components/ui/CopyButton";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-bg-deep border-border-dark" style={{ color: "rgba(240,235,227,0.55)" }}>
      {/* Top brass accent */}
      <div
        className="h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent 5%, rgba(196,174,148,0.22) 30%, rgba(196,174,148,0.22) 70%, transparent 95%)",
        }}
      />

      <div className="max-w-content mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Brand */}
          <div>
            <div className="mb-5">
              <Logo size="md" light />
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(240,235,227,0.45)" }}>
              Коммерческое строительство<br />в Самаре с 2008 года
            </p>
            <p className="text-xs text-text-muted">© {year} ПромСтрой. Все права защищены.</p>
            {(company.inn || company.ogrn) && (
              <p className="text-xs text-text-muted mt-1">
                {[company.inn, company.ogrn].filter(Boolean).join(" · ")}
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
                  className="hover:text-accent transition-colors duration-200"
                  style={{ color: "rgba(240,235,227,0.55)" }}
                >
                  {label}
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
              {/* Phone: click to call | copy icon */}
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
              {/* Telegram: click to open | copy icon */}
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

        {/* Bottom rule */}
        <div
          className="mt-12 pt-6 border-t border-border-dark/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-xs text-text-muted"
        >
          <span>Строительная компания ПромСтрой — Самара</span>
          <span>Сайт для коммерческих клиентов и застройщиков</span>
        </div>
      </div>
    </footer>
  );
}
