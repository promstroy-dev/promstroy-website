import PageHero from "@/components/sections/PageHero";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/layout/Footer";
import StickyHeader from "@/components/layout/StickyHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Проекты",
  description: "Завершённые объекты коммерческого строительства и ремонта в Самаре.",
};

export default function ProektyPage() {
  return (
    <>
      <StickyHeader />
      <main>
        <PageHero title="Реализованные объекты" subtitle="Склады, торговые центры, рестораны, реставрация — от 250 до 1 600 м². Каждый проект с перечнем выполненных работ." label="Проекты" />
        <section className="py-14 md:py-20 bg-bg relative overflow-hidden">
          {/* Subtle grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              opacity: 0.018,
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </div>
        </section>
        <CTASection sourcePage="proekty" headline="Нужен похожий объект?" subtitle="Опишите задачу — оценим объём, сроки и стоимость." />
      </main>
      <Footer />
    </>
  );
}
