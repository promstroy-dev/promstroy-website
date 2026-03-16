"use client";
import InquiryForm from "@/components/ui/InquiryForm";
import { useInView } from "@/hooks/useInView";

interface Props {
  headline?: string;
  subtitle?: string;
  sourcePage: string;
}

export default function CTASection({
  headline = "Есть проект? Обсудим.",
  subtitle = "Опишите задачу — перезвоним в течение 2 часов и предложим решение.",
  sourcePage,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: "#0F0D0B" }}
    >
      {/* Subtle brass ambient — top right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(192,154,92,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Brass vertical rule — left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            #C09A5C 15%,
            #C09A5C 85%,
            transparent 100%
          )`,
          opacity: 0.35,
        }}
      />

      <div ref={ref} className="relative max-w-content mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Left: text */}
          <div
            className={`transition-all duration-600 ${
              inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
            }`}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-5 h-px" style={{ background: "#C09A5C", opacity: 0.7 }} />
              <span
                className="text-[10px] uppercase font-medium"
                style={{ color: "#8C8278", letterSpacing: "0.26em" }}
              >
                Связаться с нами
              </span>
            </div>

            <h2
              className="font-heading font-bold mb-5 leading-tight"
              style={{
                fontSize: "clamp(28px, 3.5vw, 52px)",
                color: "#F0EBE3",
                letterSpacing: "-0.01em",
              }}
            >
              {headline}
            </h2>

            <p
              className="leading-relaxed mb-10 max-w-sm text-sm"
              style={{ color: "rgba(140,130,120,0.90)" }}
            >
              {subtitle}
            </p>

            {/* Trust signals */}
            <div className="flex flex-col gap-3">
              {[
                "Ответим в течение 2 часов",
                "Бесплатный выезд на объект",
                "Работаем официально, с договором",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm"
                     style={{ color: "rgba(240,235,227,0.55)" }}>
                  <span
                    className="flex-shrink-0 w-1 h-1 rounded-full"
                    style={{ background: "#C09A5C" }}
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div
            className={`transition-all duration-600 ${
              inView ? "animate-fade-up opacity-100" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "0.12s" }}
          >
            <div
              className="p-6 md:p-8 border"
              style={{ background: "#161310", borderColor: "#252018" }}
            >
              <InquiryForm sourcePage={sourcePage} dark />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
