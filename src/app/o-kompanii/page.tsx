import CompanyTimeline from "@/components/sections/CompanyTimeline";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Shield, Wrench, FileCheck, MapPin, BadgeCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О компании",
  description: "ПромСтрой — коммерческое строительство в Самаре с 2015 года. 11 лет опыта, полный цикл работ.",
};

export default function OKompaniiPage() {
  return (
    <>
      <StickyHeader />
      <main>
        {/* ── Immersive Hero — replaces flat PageHero ── */}
        <section
          className="relative min-h-[70vh] overflow-hidden flex items-end"
          style={{ background: "#0D1A28" }}
        >
          {/* Noise texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              opacity: 0.025,
            }}
          />
          {/* Structural grid */}
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
            className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none font-heading font-bold leading-none hidden lg:block"
            aria-hidden="true"
            style={{
              fontSize: "clamp(80px, 14vw, 200px)",
              color: "rgba(196,174,148,0.02)",
              letterSpacing: "-0.04em",
            }}
          >
            О КОМПАНИИ
          </div>

          {/* Content */}
          <div className="relative max-w-content mx-auto px-4 md:px-8 pt-32 md:pt-40 pb-16 md:pb-24 w-full">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px" style={{ background: "#C4AE94", opacity: 0.7 }} />
              <span
                className="text-[10px] uppercase font-medium"
                style={{ color: "#7A8E98", letterSpacing: "0.26em" }}
              >
                О компании
              </span>
            </div>

            {/* Main heading */}
            <h1
              className="font-bold mb-5 leading-tight max-w-3xl"
              style={{
                fontFamily: "var(--font-unbounded), var(--font-space-grotesk), sans-serif",
                fontSize: "clamp(32px, 4.5vw, 60px)",
                color: "#F0EBE3",
                letterSpacing: "-0.03em",
              }}
            >
              Строим коммерческие объекты с&nbsp;2015&nbsp;года
            </h1>
            <p
              className="text-base md:text-lg max-w-xl leading-relaxed"
              style={{ color: "rgba(148,180,193,0.55)" }}
            >
              Полный цикл — от фундамента до ключей. Один подрядчик, одна ответственность.
            </p>
          </div>
        </section>

        {/* ── Company Story + Leadership ── */}
        <section className="py-14 md:py-32 bg-bg relative overflow-hidden">
          {/* Subtle concrete grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              opacity: 0.02,
            }}
          />
          {/* Architectural grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 119px, rgba(196,174,148,0.05) 119px, rgba(196,174,148,0.05) 120px),
                repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(196,174,148,0.05) 119px, rgba(196,174,148,0.05) 120px)
              `,
            }}
          />

          <div className="relative max-w-content mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-4 h-px" style={{ background: "#C4AE94", opacity: 0.5 }} />
                  <span
                    className="text-[10px] uppercase font-medium text-text-muted"
                    style={{ letterSpacing: "0.22em" }}
                  >
                    Наша история
                  </span>
                </div>

                <h2 className="font-heading font-bold text-text text-3xl mb-6">
                  11 лет на рынке коммерческого строительства
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  За 11 лет построили и отремонтировали более 50 коммерческих объектов в Самаре и области — от торговых павильонов площадью 250&nbsp;м² до складских комплексов на 1&nbsp;300&nbsp;м².
                </p>
                <p className="text-text-muted leading-relaxed mb-4">
                  Работаем как единственный подрядчик на объекте. Заказчику не нужно координировать несколько бригад, контролировать стыки ответственности и разбираться, кто виноват в задержке.
                </p>
                <p className="text-text-muted leading-relaxed mb-10">
                  Среди наших объектов — склады с монолитным каркасом, торговые центры из сэндвич-панелей, рестораны в плотной городской застройке и реставрация объектов культурного наследия.
                </p>

                {/* Compact strengths */}
                <div className="flex flex-col gap-4">
                  {[
                    { Icon: Shield, text: "Аварийные работы, несущие конструкции, стеснённые условия — не отказываем" },
                    { Icon: Wrench, text: "Полный цикл от нулевого цикла до финишной отделки и благоустройства" },
                    { Icon: FileCheck, text: "Член СРО, договор подряда, исполнительная документация для бухгалтерии" },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="flex items-start gap-3">
                      <div
                        className="w-7 h-7 flex-shrink-0 flex items-center justify-center mt-0.5"
                        style={{ border: "1px solid rgba(196,174,148,0.25)", color: "#C4AE94" }}
                      >
                        <Icon size={13} />
                      </div>
                      <p className="text-sm text-text-muted leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leadership card — premium treatment */}
              <div
                className="relative overflow-hidden"
                style={{
                  background: "#213448",
                  border: "1px solid #1E3348",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(196,174,148,0.06)",
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

                {/* Top structural rule */}
                <div
                  className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                  style={{ background: "linear-gradient(90deg, #C4AE94 0%, rgba(196,174,148,0.2) 60%, transparent 100%)", opacity: 0.55 }}
                />
                {/* Left accent rule */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-[2px] pointer-events-none"
                  style={{
                    background: "linear-gradient(to bottom, transparent 0%, #C4AE94 20%, #C4AE94 80%, transparent 100%)",
                    opacity: 0.40,
                  }}
                />
                {/* Inner warm ambient glow — top right */}
                <div
                  className="absolute top-0 right-0 w-60 h-60 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at top right, rgba(196,174,148,0.05) 0%, transparent 70%)" }}
                />

                <div className="p-6 md:p-8 md:pl-10">
                  {/* Year established */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-3 h-px flex-shrink-0" style={{ background: "#C4AE94", opacity: 0.5 }} />
                      <span className="text-[10px] uppercase font-medium" style={{ color: "#7A8E98", letterSpacing: "0.24em" }}>
                        Основана в 2015 году
                      </span>
                    </div>
                  </div>

                  {/* Name and role */}
                  <p
                    className="font-heading font-semibold mb-1 leading-snug"
                    style={{ fontSize: "1.1rem", color: "#F0EBE3" }}
                  >
                    Алимбеков Олег
                  </p>
                  <p className="text-sm mb-6" style={{ color: "rgba(148,180,193,0.55)" }}>
                    Руководитель · ПромСтрой
                  </p>

                  {/* Separator */}
                  <div className="mb-6 h-px" style={{ background: "rgba(30,51,72,0.8)" }} />

                  {/* Body */}
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(148,180,193,0.72)" }}>
                    Строим коммерческие объекты в Самаре с 2015 года. Берёмся за сложное — аварийные ситуации, несущие конструкции, нестандартные задачи.
                  </p>

                  {/* Region detail */}
                  <div className="flex items-center gap-2 mb-7">
                    <div className="w-2 h-px flex-shrink-0" style={{ background: "#C4AE94", opacity: 0.4 }} />
                    <span className="text-[10px] uppercase font-medium" style={{ color: "rgba(148,180,193,0.45)", letterSpacing: "0.20em" }}>
                      Самара и Самарская область
                    </span>
                  </div>

                  {/* CTA link */}
                  <a
                    href="/kontakty"
                    className="btn-primary inline-flex items-center gap-2 text-sm py-3 px-6"
                  >
                    Связаться с нами
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CompanyTimeline />

        {/* ── Credentials & Geography — elevated dark section ── */}
        <section
          className="relative py-14 md:py-24 overflow-hidden"
          style={{ background: "#152333", borderTop: "1px solid #1E3348", borderBottom: "1px solid #1E3348" }}
        >
          {/* Structural grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.012) 80px, rgba(255,255,255,0.012) 81px)`,
            }}
          />
          {/* Top brass accent */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent 5%, #C4AE94 30%, #C4AE94 70%, transparent 95%)", opacity: 0.2 }}
          />

          <div className="relative max-w-content mx-auto px-4 md:px-8">

            {/* ── Licenses & Permits ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-14 md:mb-20">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ border: "1px solid rgba(196,174,148,0.25)", color: "#C4AE94" }}
                  >
                    <BadgeCheck size={18} />
                  </div>
                  <span
                    className="text-[10px] uppercase font-medium"
                    style={{ color: "#7A8E98", letterSpacing: "0.22em" }}
                  >
                    Лицензии и допуски
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(148,180,193,0.72)" }}>
                  Член саморегулируемой организации (СРО) с допуском к строительным работам, влияющим на безопасность объектов капитального строительства. Работаем по договору подряда с полным пакетом исполнительной документации.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    "Допуск СРО на строительство",
                    "Договор подряда с фиксированной сметой",
                    "Исполнительная документация для бухгалтерии",
                    "Гарантия на конструктивные элементы — от 3 лет",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm" style={{ color: "rgba(240,235,227,0.50)" }}>
                      <span className="flex-shrink-0 w-3 h-px" style={{ background: "#C4AE94", opacity: 0.6 }} />
                      {item}
                    </div>
                  ))}
                </div>
                <a
                  href="/kontakty"
                  className="link-accent-brass inline-flex items-center gap-2 text-sm font-semibold mt-6"
                >
                  Запросить документы
                  <ArrowRight size={12} />
                </a>
              </div>

              {/* ── Geographic Coverage ── */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ border: "1px solid rgba(196,174,148,0.25)", color: "#C4AE94" }}
                  >
                    <MapPin size={18} />
                  </div>
                  <span
                    className="text-[10px] uppercase font-medium"
                    style={{ color: "#7A8E98", letterSpacing: "0.22em" }}
                  >
                    География работ
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(148,180,193,0.72)" }}>
                  Основная зона — Самара и Самарская область. Работали в Самаре, Кинеле, Усть-Кинельском, на объектах от 250 до 1&nbsp;600&nbsp;м². По крупным проектам рассматриваем выезд в другие регионы.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    "Самара — центр, промзоны, пригород",
                    "Самарская область — Кинель, Усть-Кинельский",
                    "Другие регионы — по запросу для крупных объектов",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm" style={{ color: "rgba(240,235,227,0.50)" }}>
                      <span className="flex-shrink-0 w-3 h-px" style={{ background: "#C4AE94", opacity: 0.6 }} />
                      {item}
                    </div>
                  ))}
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
