import InquiryForm from "@/components/ui/InquiryForm";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";
import { Phone, Send, Clock, PhoneCall, ClipboardList, Handshake } from "lucide-react";
import { company } from "@/data/company";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с ПромСтрой. Телефон, Telegram, адрес офиса в Самаре.",
};

export default function KontaktyPage() {
  return (
    <>
      <StickyHeader />
      <main>
        {/* ── Immersive contacts section — replaces flat PageHero + form ── */}
        <section
          className="relative min-h-screen overflow-hidden"
          style={{ background: "#0D1A28" }}
        >
          {/* Background layers */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              opacity: 0.025,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.012) 80px, rgba(255,255,255,0.012) 81px)`,
            }}
          />

          {/* Brass vertical rule — left edge */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, #C4AE94 12%, #C4AE94 88%, transparent 100%)`,
              opacity: 0.45,
            }}
          />

          {/* Warm ambient — top right */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at top right, rgba(196,174,148,0.06) 0%, transparent 65%)",
            }}
          />

          {/* Large faint background word */}
          <div
            className="absolute right-0 bottom-16 pointer-events-none select-none font-heading font-bold leading-none hidden lg:block"
            aria-hidden="true"
            style={{
              fontSize: "clamp(100px, 16vw, 220px)",
              color: "rgba(196,174,148,0.02)",
              letterSpacing: "-0.04em",
            }}
          >
            КОНТАКТЫ
          </div>

          {/* ── Content ── */}
          <div className="relative max-w-content mx-auto px-4 md:px-8 pt-32 md:pt-40 pb-20 md:pb-32">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px" style={{ background: "#C4AE94", opacity: 0.7 }} />
              <span
                className="text-[10px] uppercase font-medium"
                style={{ color: "#7A8E98", letterSpacing: "0.26em" }}
              >
                Связаться с нами
              </span>
            </div>

            {/* Main heading */}
            <h1
              className="font-bold mb-5 leading-tight"
              style={{
                fontFamily: "var(--font-unbounded), var(--font-space-grotesk), sans-serif",
                fontSize: "clamp(32px, 4.5vw, 60px)",
                color: "#F0EBE3",
                letterSpacing: "-0.03em",
              }}
            >
              Начать проект
            </h1>
            <p
              className="text-base md:text-lg max-w-lg leading-relaxed mb-14"
              style={{ color: "rgba(148,180,193,0.55)" }}
            >
              Опишите задачу — перезвоним в течение 2 часов и предложим решение.
            </p>

            {/* ── Two-column layout ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

              {/* ── LEFT: Form (takes 3 cols) ── */}
              <div className="lg:col-span-3">
                <div
                  className="relative p-5 md:p-10 overflow-hidden"
                  style={{
                    background: "#152333",
                    border: "1px solid rgba(30,51,72,0.9)",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.30), inset 0 1px 0 rgba(196,174,148,0.06)",
                  }}
                >
                  {/* Corner brackets */}
                  <div className="absolute top-4 left-4 w-5 h-5 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[1.5px]" style={{ background: "#C4AE94", opacity: 0.30 }} />
                    <div className="absolute top-0 left-0 h-full w-[1.5px]" style={{ background: "#C4AE94", opacity: 0.30 }} />
                  </div>
                  <div className="absolute top-4 right-4 w-5 h-5 pointer-events-none">
                    <div className="absolute top-0 right-0 w-full h-[1.5px]" style={{ background: "#C4AE94", opacity: 0.30 }} />
                    <div className="absolute top-0 right-0 h-full w-[1.5px]" style={{ background: "#C4AE94", opacity: 0.30 }} />
                  </div>
                  <div className="absolute bottom-4 left-4 w-5 h-5 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-full h-[1.5px]" style={{ background: "#C4AE94", opacity: 0.30 }} />
                    <div className="absolute bottom-0 left-0 h-full w-[1.5px]" style={{ background: "#C4AE94", opacity: 0.30 }} />
                  </div>
                  <div className="absolute bottom-4 right-4 w-5 h-5 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-full h-[1.5px]" style={{ background: "#C4AE94", opacity: 0.30 }} />
                    <div className="absolute bottom-0 right-0 h-full w-[1.5px]" style={{ background: "#C4AE94", opacity: 0.30 }} />
                  </div>

                  {/* Inner warm ambient glow — top right */}
                  <div
                    className="absolute top-0 right-0 w-60 h-60 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at top right, rgba(196,174,148,0.05) 0%, transparent 70%)" }}
                  />

                  {/* Brass top accent rule */}
                  <div
                    className="absolute top-0 left-8 right-8 h-[1px] pointer-events-none"
                    style={{ background: "linear-gradient(90deg, rgba(196,174,148,0.30) 0%, rgba(196,174,148,0.08) 60%, transparent 100%)" }}
                  />

                  <InquiryForm sourcePage="kontakty" dark />
                </div>
              </div>

              {/* ── RIGHT: Contact details (takes 2 cols) ── */}
              <div className="lg:col-span-2 flex flex-col">

                {/* Phone — large, confident */}
                <a
                  href={`tel:${company.phone}`}
                  className="group block pb-7 border-b"
                  style={{ borderColor: "rgba(196,174,148,0.12)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 flex items-center justify-center"
                      style={{ border: "1px solid rgba(196,174,148,0.25)", color: "#C4AE94" }}
                    >
                      <Phone size={14} />
                    </div>
                    <span className="text-[10px] uppercase font-medium" style={{ color: "#7A8E98", letterSpacing: "0.20em" }}>
                      Телефон
                    </span>
                  </div>
                  <p
                    className="font-bold leading-tight group-hover:text-[#C4AE94] transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontSize: "clamp(22px, 2.5vw, 32px)",
                      color: "#F0EBE3",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {company.phoneDisplay}
                  </p>
                </a>

                {/* Telegram */}
                <a
                  href={`https://t.me/${company.telegram.replace("@", "")}`}
                  className="group block py-7 border-b"
                  style={{ borderColor: "rgba(196,174,148,0.12)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 flex items-center justify-center"
                      style={{ border: "1px solid rgba(196,174,148,0.25)", color: "#C4AE94" }}
                    >
                      <Send size={14} />
                    </div>
                    <span className="text-[10px] uppercase font-medium" style={{ color: "#7A8E98", letterSpacing: "0.20em" }}>
                      Telegram
                    </span>
                  </div>
                  <p
                    className="font-bold leading-tight group-hover:text-[#C4AE94] transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontSize: "clamp(18px, 2vw, 24px)",
                      color: "#F0EBE3",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {company.telegram}
                  </p>
                </a>

                {/* Hours */}
                <div className="py-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 flex items-center justify-center"
                      style={{ border: "1px solid rgba(196,174,148,0.25)", color: "#C4AE94" }}
                    >
                      <Clock size={14} />
                    </div>
                    <span className="text-[10px] uppercase font-medium" style={{ color: "#7A8E98", letterSpacing: "0.20em" }}>
                      Режим работы
                    </span>
                  </div>
                  <p
                    className="font-semibold"
                    style={{ color: "#F0EBE3", fontSize: "1.05rem" }}
                  >
                    Пн–Пт, 9:00–18:00
                  </p>
                </div>

              </div>
            </div>

            {/* ── What happens next — lead reassurance ── */}
            <div className="mt-16 pt-14 border-t" style={{ borderColor: "rgba(196,174,148,0.10)" }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-5 h-px" style={{ background: "#C4AE94", opacity: 0.5 }} />
                <span
                  className="text-[10px] uppercase font-medium"
                  style={{ color: "#7A8E98", letterSpacing: "0.22em" }}
                >
                  Что будет дальше
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    Icon: PhoneCall,
                    step: "01",
                    title: "Перезвоним",
                    text: "В течение 2 часов свяжемся, уточним детали и объём задачи.",
                  },
                  {
                    Icon: ClipboardList,
                    step: "02",
                    title: "Оценим и предложим",
                    text: "Бесплатный выезд на объект, предварительная смета, сроки.",
                  },
                  {
                    Icon: Handshake,
                    step: "03",
                    title: "Договор и старт",
                    text: "Фиксированная смета, договор подряда, начало работ по графику.",
                  },
                ].map(({ Icon, step, title, text }) => (
                  <div key={step} className="flex gap-4">
                    <div
                      className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
                      style={{ border: "1px solid rgba(196,174,148,0.20)", color: "#C4AE94" }}
                    >
                      <Icon size={16} />
                    </div>
                    <div>
                      <span
                        className="text-[10px] uppercase font-medium block mb-1"
                        style={{ color: "rgba(196,174,148,0.40)", letterSpacing: "0.18em" }}
                      >
                        Шаг {step}
                      </span>
                      <p className="font-semibold text-sm mb-1" style={{ color: "#F0EBE3" }}>
                        {title}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(148,180,193,0.55)" }}>
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
