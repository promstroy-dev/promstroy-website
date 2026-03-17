import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import ProjectCard from "@/components/ui/ProjectCard";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";
import { Building2, Hammer, Wrench, Network } from "lucide-react";
import type { Metadata } from "next";

const icons: Record<string, React.ReactNode> = {
  Building2: <Building2 size={36} className="text-accent" />,
  Hammer: <Hammer size={36} className="text-accent" />,
  Wrench: <Wrench size={36} className="text-accent" />,
  Network: <Network size={36} className="text-accent" />,
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  // Type mapping for related projects
  const typeMap: Record<string, string[]> = {
    "stroitelstvo-pod-klyuch": ["Склад", "Офис"],
    "remont-i-renovaciya": ["Офис", "Ресторан"],
    "konstruktivnye-raboty": ["Торговый центр"],
    "inzhenernye-seti": ["Торговый центр"],
  };
  const relatedTypes = typeMap[service.slug] ?? [];
  const related = projects.filter((p) => relatedTypes.includes(p.type)).slice(0, 2);

  return (
    <>
      <StickyHeader />
      <main>
        <PageHero title={service.title} />
        <section className="py-20 bg-bg">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2">
                <div className="mb-6">{icons[service.icon]}</div>
                <p className="text-text-muted text-lg leading-relaxed mb-10">{service.description}</p>
                <h3 className="font-heading font-semibold text-text text-xl mb-6">Виды работ</h3>
                <ul className="flex flex-col gap-3">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-muted">
                      <span className="text-accent font-bold mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="bg-card-bg rounded-lg p-6 border border-border sticky top-24">
                  <h3 className="font-heading font-semibold text-text mb-1">Обсудить проект</h3>
                  <p className="text-text-muted text-sm mb-4">Расскажите о задаче — перезвоним в течение 2 часов</p>
                  <a
                    href="/kontakty"
                    className="block text-center bg-accent hover:bg-accent-hover text-bg-deep font-semibold py-3 transition-colors text-sm"
                  >
                    Оставить заявку
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="py-16 bg-bg border-t border-border">
            <div className="max-w-content mx-auto px-4 md:px-8">
              <h2 className="font-heading font-semibold text-text text-2xl mb-8">Примеры проектов</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((p) => <ProjectCard key={p.id} project={p} />)}
              </div>
            </div>
          </section>
        )}

        <CTASection sourcePage={`uslugi/${service.slug}`} />
      </main>
      <Footer />
    </>
  );
}
