import PageHero from "@/components/sections/PageHero";
import InquiryForm from "@/components/ui/InquiryForm";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Phone, Send, MapPin, Clock } from "lucide-react";
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
        <PageHero title="Контакты" subtitle="Свяжитесь с нами — ответим быстро и перезвоним для уточнения деталей" label="Контакты" />

        <section
          className="py-20 md:py-32 relative overflow-hidden"
          style={{ background: "#0D1B2A" }}
        >
          {/* Grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              opacity: 0.025,
            }}
          />
          {/* Top structural line */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(196,174,148,0.14) 30%, rgba(196,174,148,0.14) 70%, transparent)" }}
          />
          {/* Faint background text */}
          <div
            className="absolute right-0 bottom-0 pointer-events-none select-none font-heading font-bold leading-none hidden md:block"
            aria-hidden="true"
            style={{
              fontSize: "clamp(80px, 16vw, 200px)",
              color: "rgba(196,174,148,0.025)",
              letterSpacing: "-0.04em",
              transform: "translateY(20%)",
            }}
          >
            КОНТАКТЫ
          </div>

          <div className="relative max-w-content mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

              {/* ── Form column ── */}
              <div>
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-5 h-px" style={{ background: "#C4AE94", opacity: 0.6 }} />
                    <span className="text-[10px] uppercase font-medium" style={{ color: "#7A8E98", letterSpacing: "0.26em" }}>
                      Заявка
                    </span>
                  </div>
                  <h2
                    className="font-heading font-semibold text-2xl"
                    style={{ color: "#F0EBE3", letterSpacing: "-0.01em" }}
                  >
                    Оставить заявку
                  </h2>
                </div>

                {/* Form card */}
                <div
                  className="p-7 md:p-8"
                  style={{
                    background: "rgba(8,18,28,0.55)",
                    border: "1px solid rgba(30,51,72,0.9)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                  }}
                >
                  <InquiryForm sourcePage="kontakty" dark={true} />
                </div>
              </div>

              {/* ── Contact details column ── */}
              <div>
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-5 h-px" style={{ background: "#C4AE94", opacity: 0.6 }} />
                    <span className="text-[10px] uppercase font-medium" style={{ color: "#7A8E98", letterSpacing: "0.26em" }}>
                      Реквизиты
                    </span>
                  </div>
                  <h2
                    className="font-heading font-semibold text-2xl"
                    style={{ color: "#F0EBE3", letterSpacing: "-0.01em" }}
                  >
                    Свяжитесь с нами
                  </h2>
                </div>

                {/* Contact list */}
                <div className="flex flex-col">
                  <a
                    href={`tel:${company.phone}`}
                    className="group flex items-start gap-5 py-5 border-b"
                    style={{ borderColor: "rgba(30,51,72,0.8)" }}
                  >
                    <div
                      className="flex-shrink-0 w-9 h-9 flex items-center justify-center mt-0.5"
                      style={{ border: "1px solid rgba(196,174,148,0.20)", color: "#C4AE94" }}
                    >
                      <Phone size={15} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase mb-1" style={{ color: "#7A8E98", letterSpacing: "0.2em" }}>Телефон</p>
                      <p
                        className="font-heading font-semibold text-lg leading-tight group-hover:text-[#C4AE94] transition-colors duration-200"
                        style={{ color: "#F0EBE3" }}
                      >
                        {company.phoneDisplay}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`https://t.me/${company.telegram.replace("@", "")}`}
                    className="group flex items-start gap-5 py-5 border-b"
                    style={{ borderColor: "rgba(30,51,72,0.8)" }}
                  >
                    <div
                      className="flex-shrink-0 w-9 h-9 flex items-center justify-center mt-0.5"
                      style={{ border: "1px solid rgba(196,174,148,0.20)", color: "#C4AE94" }}
                    >
                      <Send size={15} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase mb-1" style={{ color: "#7A8E98", letterSpacing: "0.2em" }}>Telegram</p>
                      <p
                        className="font-heading font-semibold text-lg leading-tight group-hover:text-[#C4AE94] transition-colors duration-200"
                        style={{ color: "#F0EBE3" }}
                      >
                        {company.telegram}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-5 py-5 border-b" style={{ borderColor: "rgba(30,51,72,0.8)" }}>
                    <div
                      className="flex-shrink-0 w-9 h-9 flex items-center justify-center mt-0.5"
                      style={{ border: "1px solid rgba(196,174,148,0.20)", color: "#C4AE94" }}
                    >
                      <MapPin size={15} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase mb-1" style={{ color: "#7A8E98", letterSpacing: "0.2em" }}>Адрес</p>
                      <p className="font-semibold leading-snug" style={{ color: "#F0EBE3" }}>{company.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 py-5" >
                    <div
                      className="flex-shrink-0 w-9 h-9 flex items-center justify-center mt-0.5"
                      style={{ border: "1px solid rgba(196,174,148,0.20)", color: "#C4AE94" }}
                    >
                      <Clock size={15} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase mb-1" style={{ color: "#7A8E98", letterSpacing: "0.2em" }}>Режим работы</p>
                      <p className="font-semibold" style={{ color: "#F0EBE3" }}>Пн–Пт, 9:00–18:00</p>
                    </div>
                  </div>
                </div>

                {/* Telegram QR card */}
                <div
                  className="mt-6 p-6"
                  style={{
                    background: "rgba(8,18,28,0.55)",
                    border: "1px solid rgba(196,174,148,0.12)",
                  }}
                >
                  <div className="flex items-center gap-6">
                    <a
                      href={`https://t.me/${company.telegram.replace("@", "")}`}
                      className="flex-shrink-0 block"
                      aria-label="Открыть Telegram"
                    >
                      {/* White bg needed for QR scanability */}
                      <div className="p-2 bg-white">
                        <Image
                          src="/images/qr_tg.avif"
                          alt="QR-код Telegram ПромСтрой"
                          width={88}
                          height={88}
                          style={{ imageRendering: "crisp-edges", display: "block" }}
                        />
                      </div>
                    </a>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-px" style={{ background: "#C4AE94", opacity: 0.6 }} />
                        <span className="text-[10px] uppercase" style={{ color: "#7A8E98", letterSpacing: "0.22em" }}>Telegram</span>
                      </div>
                      <p className="font-heading font-semibold mb-1" style={{ color: "#F0EBE3" }}>
                        {company.telegram}
                      </p>
                      <p className="text-sm" style={{ color: "#7A8E98" }}>
                        Напишите нам — ответим быстро
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
