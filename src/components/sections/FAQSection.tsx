"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const faqs = [
  {
    q: "Сколько стоит коммерческий ремонт или строительство?",
    a: "Стоимость зависит от типа объекта, площади, состояния помещения и перечня работ. Мы составляем фиксированную смету до начала работ — без скрытых доплат по завершении. Выезд специалиста на объект для предварительной оценки бесплатный.",
  },
  {
    q: "Как долго длится ремонт или строительство?",
    a: "Сроки согласовываются в договоре и зависят от объёма работ. Торговое помещение 200 м² — от 4 до 8 недель. Складской комплекс или производственный объект — от 3 до 12 месяцев. Точные сроки фиксируем в проектном графике до начала работ.",
  },
  {
    q: "Вы работаете официально? Есть ли договор?",
    a: "Да. Работаем по договору подряда с исполнительной документацией. Имеем СРО и все необходимые строительные допуски. Оплата — официально, по счёту. Предоставляем полный пакет документов для бухгалтерии заказчика.",
  },
  {
    q: "Что значит «полный цикл» и почему это важно?",
    a: "Один подрядчик ведёт объект от первого этапа до финального. Это включает: проектирование и согласование, общестроительные работы, инженерные системы (электрика, сантехника, вентиляция, пожарная безопасность) и финишную отделку. Вам не нужно координировать несколько бригад — это исключает срывы сроков и споры о зонах ответственности.",
  },
  {
    q: "Вы работаете только в Самаре?",
    a: "Основная зона работ — Самара и Самарская область. По крупным объектам рассматриваем выезд в другие регионы. Уточните при первом контакте.",
  },
  {
    q: "Есть ли гарантия на выполненные работы?",
    a: "Да. Предоставляем гарантию на все виды выполненных работ. Срок гарантии указывается в договоре и зависит от типа работ. На конструктивные элементы — не менее 3 лет.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="py-20 md:py-32 bg-bg relative overflow-hidden">
      {/* Concrete grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.018,
        }}
      />

      <div ref={ref} className="relative max-w-content mx-auto px-4 md:px-8">

        {/* Header */}
        <div
          className={`mb-14 transition-all duration-600 ${
            inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px bg-accent" style={{ opacity: 0.7 }} />
            <span
              className="text-[10px] uppercase font-medium text-text-muted"
              style={{ letterSpacing: "0.26em" }}
            >
              Частые вопросы
            </span>
          </div>
          <h2
            className="font-heading font-bold text-text"
            style={{ fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-0.01em" }}
          >
            Вопросы и ответы
          </h2>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`border-b transition-all duration-600 ${
                  inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
                } ${i === 0 ? "border-t" : ""}`}
                style={{
                  borderColor: "#D0C4B0",
                  animationDelay: `${0.06 + i * 0.07}s`,
                }}
              >
                <button
                  className="w-full flex items-start justify-between gap-6 py-5 text-left group"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-heading font-semibold text-sm md:text-base leading-snug transition-colors duration-200"
                    style={{ color: isOpen ? "#1A2B3D" : "rgba(26,43,61,0.75)" }}
                  >
                    {faq.q}
                  </span>
                  {/* Square toggle — zero radius, architectural */}
                  <span
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center border transition-all duration-200"
                    style={{
                      background: isOpen ? "#1A2B3D" : "transparent",
                      borderColor: isOpen ? "#1A2B3D" : "#D0C4B0",
                      color: isOpen ? "#EAE0CF" : "#7A8E98",
                    }}
                  >
                    {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                  </span>
                </button>

                {/* Smooth height via CSS grid trick */}
                <div className={`accordion-body ${isOpen ? "open" : ""}`}>
                  <div className="accordion-inner">
                    <p
                      className="pb-6 text-sm leading-relaxed max-w-2xl"
                      style={{ color: "#7A8E98" }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
