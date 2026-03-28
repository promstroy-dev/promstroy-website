"use client";

const testimonials = [
  {
    quote: "Сделали склад 800 м² за 3 месяца — точно в срок, без доплат. Рекомендую.",
    author: "Андрей К.",
    role: "Руководитель складского комплекса",
  },
  {
    quote: "Единственный подрядчик, который взялся за аварийный объект и довёл до конца.",
    author: "Марина В.",
    role: "Собственник торгового помещения",
  },
  {
    quote: "Полный цикл — от проекта до ключей. Не нужно было координировать 5 бригад.",
    author: "Дмитрий Л.",
    role: "Инвестор, офисное здание",
  },
  {
    quote: "Прозрачная смета, исполнительная документация, всё официально. Редкость на рынке.",
    author: "Елена С.",
    role: "Финансовый директор",
  },
  {
    quote: "Ремонт ресторана 350 м² — уложились в график. Качество отделки отличное.",
    author: "Игорь Т.",
    role: "Владелец ресторана",
  },
];

export default function TestimonialMarquee() {
  const track = [...testimonials, ...testimonials];

  return (
    <section
      className="relative py-12 md:py-20 overflow-hidden"
      style={{ background: "#152333" }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(196,174,148,0.15) 30%, rgba(196,174,148,0.15) 70%, transparent 95%)",
        }}
      />

      {/* Section label */}
      <div className="max-w-content mx-auto px-4 md:px-8 mb-10">
        <div className="flex items-center gap-3">
          <div
            className="w-5 h-px"
            style={{ background: "#C4AE94", opacity: 0.5 }}
          />
          <span
            className="text-[10px] uppercase font-medium"
            style={{ color: "#7A8E98", letterSpacing: "0.26em" }}
          >
            Отзывы клиентов
          </span>
        </div>
      </div>

      {/* Left / right fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-10 md:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #152333, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-10 md:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #152333, transparent)" }}
      />

      {/* Marquee track */}
      <div className="animate-marquee-slow flex items-stretch gap-4 md:gap-8 whitespace-nowrap w-max">
        {track.map((t, i) => (
          <blockquote
            key={i}
            className="inline-flex flex-col justify-between flex-shrink-0 whitespace-normal px-5 py-5 md:px-7 md:py-6"
            style={{
              width: "min(280px, 75vw)",
              background: "rgba(26,43,61,0.55)",
              border: "1px solid rgba(84,119,146,0.12)",
            }}
          >
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "rgba(240,235,227,0.72)" }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer>
              <p
                className="text-xs font-semibold"
                style={{ color: "#C4AE94" }}
              >
                {t.author}
              </p>
              <p
                className="text-[10px] mt-0.5"
                style={{ color: "rgba(148,180,193,0.50)" }}
              >
                {t.role}
              </p>
            </footer>
          </blockquote>
        ))}
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(196,174,148,0.15) 30%, rgba(196,174,148,0.15) 70%, transparent 95%)",
        }}
      />
    </section>
  );
}
