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
    <section
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: "#1A2B3D" }}
    >
      {/* Brass vertical rule — left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, #C4AE94 15%, #C4AE94 85%, transparent 100%)`,
          opacity: 0.25,
        }}
      />

      {/* Structural grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.012) 80px, rgba(255,255,255,0.012) 81px)`,
        }}
      />

      {/* Warm ambient glow — center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(196,174,148,0.04) 0%, transparent 70%)",
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
            <div className="w-5 h-px" style={{ background: "#C4AE94", opacity: 0.7 }} />
            <span
              className="text-[10px] uppercase font-medium"
              style={{ color: "#7A8E98", letterSpacing: "0.26em" }}
            >
              Наши принципы
            </span>
          </div>
        </div>
        <RevealText
          inView={inView}
          className="font-heading font-bold mb-14"
          style={{ fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-0.01em", color: "#F0EBE3" }}
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
              <div
                className="flex-shrink-0 w-10 h-10 border flex items-center justify-center transition-all duration-200 group-hover:border-accent"
                style={{ borderColor: "rgba(196,174,148,0.35)", color: "#C4AE94" }}
              >
                <Icon size={17} />
              </div>

              <div>
                <h3 className="font-heading font-semibold mb-2 leading-snug"
                    style={{ fontSize: "0.95rem", color: "rgba(240,235,227,0.88)" }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(148,180,193,0.65)" }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
