import PageHero from "@/components/sections/PageHero";
import CompanyTimeline from "@/components/sections/CompanyTimeline";
import CTASection from "@/components/sections/CTASection";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
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
        <PageHero title="О компании" subtitle={"ПромСтрой — коммерческое строительство в Самаре с 2015\u00A0года"} label="О компании" />

        {/* Company story */}
        <section className="py-20 md:py-32 bg-bg">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="font-heading font-bold text-text text-3xl mb-6">11 лет на рынке коммерческого строительства</h2>
                {/* TODO: replace with real company story provided by owner */}
                <p className="text-text-muted leading-relaxed mb-4">
                  За 11 лет построили и отремонтировали более 50 объектов в Самаре — от торговых павильонов до складских комплексов площадью 1&nbsp;300&nbsp;м².
                </p>
                <p className="text-text-muted leading-relaxed mb-4">
                  Работаем как единственный подрядчик на объекте — от нулевого цикла до ключей. Заказчику не нужно координировать несколько бригад и следить за стыками ответственности.
                </p>
                <p className="text-text-muted leading-relaxed">
                  Беремся за сложное — аварийные ситуации, несущие конструкции, нестандартные задачи — там, где другие отказывают из-за рисков.
                </p>
                {/* TODO: replace placeholder paragraph with content from owner */}
              </div>
              {/* Leadership card */}
              <div
                className="relative overflow-hidden"
                style={{ background: "#213448", border: "1px solid #1E3348" }}
              >
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

                <div className="p-8 pl-10">
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
                  <p className="text-sm mb-6" style={{ color: "rgba(148,180,193,0.65)" }}>
                    Руководитель · ПромСтрой
                  </p>

                  {/* Separator */}
                  <div className="mb-6 h-px" style={{ background: "rgba(30,51,72,0.8)" }} />

                  {/* Body */}
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(148,180,193,0.78)" }}>
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
                    className="link-accent-brass inline-flex items-center gap-2 text-sm font-semibold"
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

        {/* Документы — pending real content */}
        <section className="py-16 bg-bg border-t border-border">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-5 h-px" style={{ background: "#C4AE94", opacity: 0.6 }} />
                <span className="text-[10px] uppercase font-medium text-text-muted" style={{ letterSpacing: "0.26em" }}>
                  Документы
                </span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed max-w-lg">
                Работаем официально — СРО, строительные допуски, полный пакет исполнительной документации для бухгалтерии заказчика.
                Документы предоставляем по запросу.
              </p>
              <a
                href="/kontakty"
                className="link-muted-hover flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold"
              >
                Запросить документы
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </section>

        <CTASection sourcePage="o-kompanii" headline="Готовы обсудить проект?" />
      </main>
      <Footer />
    </>
  );
}
