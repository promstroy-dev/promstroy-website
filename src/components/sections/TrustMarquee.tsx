interface MarqueeItem {
  text: string;
  accent?: boolean;
}

const items: MarqueeItem[] = [
  { text: "11 лет на рынке" },
  { text: "Официальный договор" },
  { text: "СРО допуски", accent: true },
  { text: "Полный цикл работ" },
  { text: "Самара и область" },
  { text: "Гарантия на работы", accent: true },
  { text: "Складские комплексы" },
  { text: "Офисные помещения" },
  { text: "Торговые объекты" },
  { text: "Рестораны и кафе" },
  { text: "Производственные объекты" },
  { text: "Исполнительная документация", accent: true },
];

// Diamond separator
const Sep = () => (
  <span
    aria-hidden
    style={{
      display: "inline-block",
      width: "3px",
      height: "3px",
      background: "rgba(196,174,148,0.30)",
      transform: "rotate(45deg)",
      flexShrink: 0,
      marginTop: "1px",
    }}
  />
);

export default function TrustMarquee() {
  // Duplicate the list so the loop is seamless
  const track = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden border-y"
      style={{
        background: "#152333",
        borderColor: "#1E3348",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-8 md:w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #152333, transparent)" }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-8 md:w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #152333, transparent)" }}
      />

      <div className="animate-marquee flex items-center gap-6 whitespace-nowrap w-max">
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            {item.accent && (
              <span
                aria-hidden
                className="inline-block flex-shrink-0"
                style={{
                  width: "5px",
                  height: "5px",
                  background: "#C4AE94",
                  transform: "rotate(45deg)",
                  opacity: 0.45,
                }}
              />
            )}
            <span
              className="font-body font-medium"
              style={{
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: item.accent ? "rgba(196,174,148,0.65)" : "rgba(196,174,148,0.40)",
              }}
            >
              {item.text}
            </span>
            <Sep />
          </span>
        ))}
      </div>
    </div>
  );
}
