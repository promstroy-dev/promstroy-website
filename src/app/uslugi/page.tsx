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
          title="Направления работ"
          subtitle="Четыре направления — один подрядчик. Закрываем весь объём от нулевого цикла до сдачи объекта."
          label="Услуги"
        />
        <ServicesOverview expanded />
        <div className="py-16 bg-bg relative overflow-hidden border-t border-border">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              opacity: 0.018,
            }}
          />
          <div className="relative max-w-content mx-auto px-4 md:px-8 text-center">
            <p className="text-text-muted mb-5 text-sm">Задача не вписывается в стандартные направления? Расскажите — подберём решение.</p>
            <a
              href="/kontakty"
              className="btn-primary text-sm px-8 py-3"
            >
              Обсудить задачу
            </a>
          </div>
        </div>
        <CTASection sourcePage="uslugi" headline="Нужна конкретная услуга?" subtitle="Опишите задачу — подберём решение и назовём сроки." />
      </main>
      <Footer />
    </>
  );
}
