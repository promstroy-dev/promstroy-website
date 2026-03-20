import PageHero from "@/components/sections/PageHero";
import ServicesOverview from "@/components/sections/ServicesOverview";
import CTASection from "@/components/sections/CTASection";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Коммерческое строительство и ремонт в Самаре. 4 направления: строительство под ключ, ремонт, конструктивные работы, инженерные сети.",
};

export default function UslugiPage() {
  return (
    <>
      <StickyHeader />
      <main>
        <PageHero
          title="Наши услуги"
          subtitle="Один подрядчик — полный цикл. От фундамента до финишной отделки."
          label="Услуги"
        />
        <ServicesOverview expanded />
        <div className="py-16 bg-bg border-t border-border">
          <div className="max-w-content mx-auto px-4 md:px-8 text-center">
            <p className="text-text-muted mb-5 text-sm">Не нашли нужную услугу? Расскажите о задаче — решим.</p>
            <a
              href="/kontakty"
              className="btn-primary text-sm px-8 py-3"
            >
              Обсудить задачу
            </a>
          </div>
        </div>
        <CTASection sourcePage="uslugi" />
      </main>
      <Footer />
    </>
  );
}
