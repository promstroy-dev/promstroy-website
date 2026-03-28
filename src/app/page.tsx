import HeroFull from "@/components/sections/HeroFull";
import StatsBanner from "@/components/sections/StatsBanner";
import TrustMarquee from "@/components/sections/TrustMarquee";
import ServicesOverview from "@/components/sections/ServicesOverview";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import TrustBlock from "@/components/sections/TrustBlock";
import TestimonialMarquee from "@/components/sections/TestimonialMarquee";
import ProcessSteps from "@/components/sections/ProcessSteps";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Сколько стоит коммерческий ремонт или строительство?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Стоимость зависит от типа объекта, площади, состояния помещения и перечня работ. Мы составляем фиксированную смету до начала работ — без скрытых доплат по завершении. Выезд специалиста на объект для предварительной оценки бесплатный.",
      },
    },
    {
      "@type": "Question",
      name: "Как долго длится ремонт или строительство?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Сроки согласовываются в договоре и зависят от объёма работ. Торговое помещение 200 м² — от 4 до 8 недель. Складской комплекс или производственный объект — от 3 до 12 месяцев. Точные сроки фиксируем в проектном графике до начала работ.",
      },
    },
    {
      "@type": "Question",
      name: "Вы работаете официально? Есть ли договор?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да. Работаем по договору подряда с исполнительной документацией. Имеем СРО и все необходимые строительные допуски. Оплата — официально, по счёту. Предоставляем полный пакет документов для бухгалтерии заказчика.",
      },
    },
    {
      "@type": "Question",
      name: "Что значит «полный цикл» и почему это важно?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Один подрядчик ведёт объект от первого этапа до финального. Это включает: проектирование и согласование, общестроительные работы, инженерные системы и финишную отделку. Вам не нужно координировать несколько бригад — это исключает срывы сроков и споры о зонах ответственности.",
      },
    },
    {
      "@type": "Question",
      name: "Вы работаете только в Самаре?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Основная зона работ — Самара и Самарская область. По крупным объектам рассматриваем выезд в другие регионы. Уточните при первом контакте.",
      },
    },
    {
      "@type": "Question",
      name: "Есть ли гарантия на выполненные работы?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да. Предоставляем гарантию на все виды выполненных работ. Срок гарантии указывается в договоре и зависит от типа работ. На конструктивные элементы — не менее 3 лет.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <StickyHeader />
      <main>
        <HeroFull />
        <StatsBanner />
        <TrustMarquee />
        <ServicesOverview />
        <ProjectsPreview />
        <TrustBlock />
        <ProcessSteps />
        <TestimonialMarquee />
        <FAQSection />
        <CTASection sourcePage="homepage" />
      </main>
      <Footer />
    </>
  );
}
