import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import CTASection from "@/components/sections/CTASection";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const siteUrl = process.env.SITE_URL ?? "https://sk-promstroy.ru";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.id !== project.id && p.type === project.type).slice(0, 2);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Проекты", item: `${siteUrl}/proekty` },
      { "@type": "ListItem", position: 3, name: project.title },
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
        {/* Breadcrumb */}
        <div className="bg-bg-dark pt-24 pb-8">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
              <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
              <span>→</span>
              <Link href="/proekty" className="hover:text-accent transition-colors">Проекты</Link>
              <span>→</span>
              <span className="text-text-invert">{project.title}</span>
            </nav>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <Badge label={project.type} />
            </div>
            <h1 className="font-heading font-bold text-text-invert text-3xl md:text-5xl mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-6 text-sm text-text-muted">
              {project.area && <span>Площадь: {project.area}</span>}
              <span>Год: {project.year}</span>
              <span>Город: {project.city}</span>
            </div>
          </div>
        </div>

        {/* Gallery placeholder — architectural treatment until photos arrive */}
        <section className="bg-bg py-16">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div
              className="relative aspect-[16/7] overflow-hidden flex items-center justify-center"
              style={{ background: "#0D1A28", border: "1px solid #1E3348" }}
            >
              {/* Blueprint grid */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(84,119,146,0.06) 60px, rgba(84,119,146,0.06) 61px),
                    repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(84,119,146,0.06) 60px, rgba(84,119,146,0.06) 61px)
                  `,
                }}
              />
              {/* Portal mark */}
              <div className="relative z-10 text-center">
                <svg width="52" height="52" viewBox="0 0 26 26" fill="none" style={{ opacity: 0.14, margin: "0 auto 12px" }}>
                  <rect x="1" y="1" width="24" height="4.5" fill="#547792" />
                  <rect x="1" y="5.5" width="5" height="19.5" fill="#547792" />
                  <rect x="20" y="5.5" width="5" height="19.5" fill="#547792" />
                  <polygon points="6,5.5 1,10 6,10" fill="#547792" opacity="0.5" />
                  <polygon points="20,5.5 25,10 20,10" fill="#547792" opacity="0.5" />
                </svg>
                <p
                  className="text-[10px] uppercase font-medium tracking-[0.22em]"
                  style={{ color: "rgba(84,119,146,0.45)" }}
                >
                  Фото · в работе
                </p>
              </div>
              {/* Corner dimension marks */}
              <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                <div className="relative h-px" style={{ background: "rgba(84,119,146,0.12)" }}>
                  <div className="absolute left-0 -top-[3px] w-px h-[7px]" style={{ background: "rgba(84,119,146,0.22)" }} />
                  <div className="absolute right-0 -top-[3px] w-px h-[7px]" style={{ background: "rgba(84,119,146,0.22)" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-16 bg-bg">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2">
                <h2 className="font-heading font-semibold text-text text-2xl mb-6">О проекте</h2>
                <p className="text-text-muted leading-relaxed mb-10">{project.description}</p>
                {project.works.length > 0 && project.works[0] !== "[Виды работ — в процессе подготовки]" && (
                  <>
                    <h3 className="font-heading font-semibold text-text text-xl mb-4">Выполненные работы</h3>
                    <ul className="flex flex-col gap-2">
                      {project.works.map((w, i) => (
                        <li key={i} className="flex items-start gap-3 text-text-muted text-sm">
                          <span className="text-accent mt-0.5">—</span> {w}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <div>
                <div
                  className="relative overflow-hidden"
                  style={{
                    background: "#192C40",
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
                      opacity: 0.40,
                    }}
                  />
                  <div className="p-6 pl-8">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-3 h-px flex-shrink-0" style={{ background: "#C4AE94", opacity: 0.6 }} />
                      <span className="text-[10px] uppercase font-medium" style={{ color: "#7A8E98", letterSpacing: "0.22em" }}>
                        Контакт
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold mb-2 leading-snug" style={{ fontSize: "1.0rem", color: "#F0EBE3" }}>
                      Обсудить похожий проект
                    </h3>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(148,180,193,0.70)" }}>
                      Перезвоним, уточним детали, составим смету
                    </p>
                    <a
                      href="tel:+79277111103"
                      className="btn-call-ghost block text-center text-sm font-semibold py-3 mb-3"
                    >
                      Позвонить
                    </a>
                    <a
                      href="https://t.me/skpromstroy_samara"
                      className="btn-primary w-full justify-center text-sm py-3"
                    >
                      Обсудить в Telegram
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
              <h2 className="font-heading font-semibold text-text text-2xl mb-8">Похожие проекты</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((p) => <ProjectCard key={p.id} project={p} />)}
              </div>
            </div>
          </section>
        )}

        <CTASection sourcePage={`proekty/${project.slug}`} headline="Есть похожая задача?" />
      </main>
      <Footer />
    </>
  );
}
