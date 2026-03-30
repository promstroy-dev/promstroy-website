import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import ProjectCard from "@/components/ui/ProjectCard";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";
import ServiceIconTilt from "@/components/ui/ServiceIconTilt";
import { Building2, Hammer, Wrench, Network } from "lucide-react";
import type { Metadata } from "next";

const icons: Record<string, React.ReactNode> = {
  Building2: <Building2 size={36} className="text-accent" />,
  Hammer: <Hammer size={36} className="text-accent" />,
  Wrench: <Wrench size={36} className="text-accent" />,
  Network: <Network size={36} className="text-accent" />,
};

const siteUrl = process.env.SITE_URL ?? "https://sk-promstroy.ru";

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
    "stroitelstvo-pod-klyuch": ["Склад", "Офис", "Магазин", "Торговый центр"],
    "remont-i-renovaciya": ["Офис", "Ресторан", "Реставрация"],
    "konstruktivnye-raboty": ["Торговый центр", "Склад", "Магазин"],
    "inzhenernye-seti": ["Торговый центр", "Склад"],
  };
  const relatedTypes = typeMap[service.slug] ?? [];
  const related = projects.filter((p) => relatedTypes.includes(p.type)).slice(0, 2);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Услуги", item: `${siteUrl}/uslugi` },
      { "@type": "ListItem", position: 3, name: service.title },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StickyHeader />
      <main>
        <PageHero title={service.title} label="Услуги" />
        <section className="py-14 md:py-20 bg-bg">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <ServiceIconTilt>{icons[service.icon]}</ServiceIconTilt>
                </div>
                <p className="text-text-muted text-lg leading-relaxed mb-8">{service.description}</p>

                {service.timeline && (
                  <div
                    className="flex items-start gap-3 mb-10 p-4"
                    style={{ background: "rgba(196,174,148,0.04)", border: "1px solid rgba(196,174,148,0.10)" }}
                  >
                    <span className="flex-shrink-0 w-3 h-px mt-2.5" style={{ background: "#C4AE94", opacity: 0.7 }} />
                    <div>
                      <span className="text-[10px] uppercase font-medium block mb-1" style={{ color: "#C4AE94", letterSpacing: "0.18em", opacity: 0.65 }}>
                        Типичные сроки
                      </span>
                      <p className="text-sm text-text-muted leading-relaxed">{service.timeline}</p>
                    </div>
                  </div>
                )}

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
                <div
                  className="relative overflow-hidden sticky top-24"
                  style={{
                    background: "#213448",
                    border: "1px solid #1E3348",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                  }}
                >
                  {/* Top structural rule */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                    style={{ background: "linear-gradient(90deg, #C4AE94 0%, rgba(196,174,148,0.3) 60%, transparent 100%)", opacity: 0.6 }}
                  />
                  {/* Left accent rule */}
                  <div
                    className="absolute top-0 left-0 bottom-0 w-[2px] pointer-events-none"
                    style={{
                      background: "linear-gradient(to bottom, transparent 0%, #C4AE94 20%, #C4AE94 80%, transparent 100%)",
                      opacity: 0.45,
                    }}
                  />

                  <div className="p-6 pl-8">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-3 h-px flex-shrink-0" style={{ background: "#C4AE94", opacity: 0.6 }} />
                      <span className="text-[10px] uppercase font-medium" style={{ color: "#7A8E98", letterSpacing: "0.22em" }}>
                        Консультация
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold mb-2 leading-snug" style={{ fontSize: "1.05rem", color: "#F0EBE3" }}>
                      Обсудить проект
                    </h3>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(148,180,193,0.75)" }}>
                      Расскажите о задаче — перезвоним в течение 2 часов
                    </p>
                    <a
                      href="/kontakty"
                      className="btn-primary w-full justify-center text-sm py-3"
                    >
                      Начать проект
                    </a>
                  </div>
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

        <CTASection sourcePage={`uslugi/${service.slug}`} headline={`Нужна ${service.title.toLowerCase()}?`} subtitle="Расскажите о задаче — перезвоним, уточним детали, назовём сроки и стоимость." />
      </main>
      <Footer />
    </>
  );
}
