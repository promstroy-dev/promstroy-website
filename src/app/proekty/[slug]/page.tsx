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

        {/* Gallery placeholder */}
        <section className="bg-bg py-16">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="aspect-[16/7] bg-bg-mid rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-text-muted">Фотографии проекта</p>
                <p className="text-xs text-text-muted/60 mt-1">В процессе подготовки</p>
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
                <div className="bg-card-bg rounded-lg p-6 border border-border">
                  <h3 className="font-heading font-semibold text-text mb-4">Обсудить похожий проект</h3>
                  <a href="tel:+79277111103" className="block text-center border border-accent text-accent hover:bg-accent hover:text-bg-deep font-semibold py-3 transition-colors text-sm mb-3">
                    Позвонить
                  </a>
                  <a href="https://t.me/skpromstroy_samara" className="block text-center bg-accent hover:bg-accent-hover text-bg-deep font-semibold py-3 transition-colors text-sm">
                    Написать в Telegram
                  </a>
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
