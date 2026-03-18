import PageHero from "@/components/sections/PageHero";
import StatsBanner from "@/components/sections/StatsBanner";
import CTASection from "@/components/sections/CTASection";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О компании",
  description: "ПромСтрой — коммерческое строительство в Самаре с 2008 года. 18 лет опыта, полный цикл работ.",
};

export default function OKompaniiPage() {
  return (
    <>
      <StickyHeader />
      <main>
        <PageHero title="О компании" subtitle="ПромСтрой — коммерческое строительство в Самаре с 2008 года" />

        {/* Company story */}
        <section className="py-20 md:py-32 bg-bg">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="font-heading font-bold text-text text-3xl mb-6">18 лет на рынке коммерческого строительства</h2>
                {/* TODO: replace with real company story provided by owner */}
                <p className="text-text-muted leading-relaxed mb-4">
                  ПромСтрой основан в 2008 году и за это время реализовал десятки объектов коммерческого строительства в Самаре и Самарской области.
                </p>
                <p className="text-text-muted leading-relaxed mb-4">
                  Мы специализируемся на полном цикле строительных работ: от проектирования и фундамента до финишной отделки и сдачи объекта с исполнительной документацией.
                </p>
                <p className="text-text-muted leading-relaxed">
                  Беремся за сложные задачи — аварийные работы, несущие конструкции, нестандартные объекты — там, где другие отказываются.
                </p>
                {/* TODO: replace placeholder paragraph with content from owner */}
              </div>
              {/* Team block — populated when owner provides content */}
              <div
                className="rounded-lg p-8 flex flex-col gap-5"
                style={{ background: "#213448", border: "1px solid #1E3348" }}
              >
                <div
                  className="w-10 h-px"
                  style={{ background: "rgba(196,174,148,0.5)" }}
                />
                <p className="font-heading font-semibold text-text-invert text-lg">Алимбеков Олег</p>
                <p className="text-sm" style={{ color: "rgba(148,180,193,0.7)" }}>Руководитель ПромСтрой</p>
                <p className="text-text-muted text-sm leading-relaxed">
                  ПромСтрой — команда специалистов с практическим опытом в коммерческом строительстве
                  Самарского региона. Беремся за объекты, от которых отказываются другие.
                </p>
                <a
                  href="/kontakty"
                  className="inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: "#C4AE94" }}
                >
                  Связаться с нами →
                </a>
              </div>
            </div>
          </div>
        </section>

        <StatsBanner />

        {/* Trust proofs */}
        <section className="py-20 bg-bg">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <h2 className="font-heading font-bold text-text text-3xl mb-10">Лицензии и допуски</h2>
            <div className="bg-bg-mid/10 border border-border rounded-lg p-8 text-center">
              <p className="text-text-muted">Лицензии и допуски — раздел в разработке</p>
              {/* TODO: replace with real content — СРО, лицензии */}
            </div>

            {/* Testimonials — shown when real content is available */}
          </div>
        </section>

        <CTASection sourcePage="o-kompanii" headline="Готовы обсудить проект?" />
      </main>
      <Footer />
    </>
  );
}
