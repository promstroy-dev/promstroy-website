import PageHero from "@/components/sections/PageHero";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
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
        <PageHero title="Наши проекты" subtitle="Завершённые объекты коммерческого строительства и ремонта в Самаре" label="Проекты" />
        <section className="py-14 md:py-20 bg-bg">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
