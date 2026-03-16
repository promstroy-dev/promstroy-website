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
              {/* Team placeholder */}
              <div className="bg-bg-mid rounded-lg p-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-bg-dark flex items-center justify-center mb-4">
                  <span className="text-text-muted text-3xl">👤</span>
                </div>
                {/* TODO: replace with owner name and photo */}
                <p className="font-heading font-semibold text-text-invert text-lg">[Имя руководителя]</p>
                <p className="text-text-muted text-sm mt-1">Руководитель</p>
                <p className="text-xs text-text-muted mt-4">[Фото и биография — в процессе подготовки]</p>
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

            {/* Testimonials */}
            <h2 className="font-heading font-bold text-text text-3xl mt-16 mb-10">Отзывы клиентов</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card-bg rounded-lg p-6 border border-border">
                  <p className="text-text-muted text-sm leading-relaxed mb-4 italic">
                    {/* TODO: replace with real testimonials from owner */}
                    &laquo;Работали с ПромСтрой по ремонту нашего офиса. Всё сделали в срок, качество соответствует договору. Рекомендуем.&raquo;
                  </p>
                  <p className="font-semibold text-text text-sm">[Имя клиента]</p>
                  <p className="text-text-muted text-xs">[Компания]</p>
                  {/* TODO: replace with real content */}
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection sourcePage="o-kompanii" headline="Готовы обсудить проект?" />
      </main>
      <Footer />
    </>
  );
}
