"use client";
import { Shield, Clock, Wrench, FileCheck, HandCoins, Award } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import RevealText from "@/components/ui/RevealText";

const reasons = [
  { Icon: Clock,      title: "11 лет опыта",          body: "С 2015 года работаем на рынке коммерческого строительства Самары. Сотни реализованных объектов." },
  { Icon: Wrench,     title: "Полный цикл",            body: "Один подрядчик от фундамента до финишной отделки. Никаких разрывов между бригадами." },
  { Icon: Shield,     title: "Беремся за сложное",     body: "Аварийные работы, несущие конструкции, нестандартные объекты — берёмся там, где другие отказывают." },
  { Icon: FileCheck,  title: "Лицензии и допуски",     body: "Работаем официально, с исполнительной документацией. СРО и необходимые допуски в наличии." },
  { Icon: HandCoins,  title: "Честная смета",          body: "Фиксированная смета до начала работ. Без неожиданных доплат по завершении." },
  { Icon: Award,      title: "Гарантия на работы",     body: "Предоставляем гарантию на все выполненные работы. Отвечаем за результат." },
];

export default function TrustBlock() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="py-20 md:py-32 bg-bg relative overflow-hidden">
      {/* Subtle concrete grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.02,
        }}
      />

      <div ref={ref} className="relative max-w-content mx-auto px-4 md:px-8">

        {/* Header */}
        <div
          className={`mb-4 transition-all duration-600 ${
            inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-accent opacity-70" />
            <span
              className="text-[10px] uppercase font-medium text-text-muted"
              style={{ letterSpacing: "0.26em" }}
            >
              Наши принципы
            </span>
          </div>
        </div>
        <RevealText
          inView={inView}
          className="font-heading font-bold text-text mb-14"
          style={{ fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-0.01em" }}
        >
          Почему выбирают ПромСтрой
        </RevealText>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {reasons.map(({ Icon, title, body }, i) => (
            <div
              key={i}
              className={`flex gap-5 group ${inView ? "animate-clip-reveal-y" : "invisible"}`}
              style={{ animationDelay: `${0.06 + i * 0.08}s` }}
            >
              {/* Icon block — CSS group-hover */}
              <div className="flex-shrink-0 w-10 h-10 border border-border flex items-center justify-center text-accent transition-all duration-200 group-hover:bg-accent group-hover:border-accent group-hover:text-bg-deep">
                <Icon size={17} />
              </div>

              <div>
                <h3 className="font-heading font-semibold text-text mb-2 leading-snug"
                    style={{ fontSize: "0.95rem" }}>
                  {title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
