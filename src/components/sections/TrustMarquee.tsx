const items = [
  "18 лет на рынке",
  "Официальный договор",
  "СРО допуски",
  "Полный цикл работ",
  "Самара и область",
  "Гарантия на работы",
  "Складские комплексы",
  "Офисные помещения",
  "Торговые объекты",
  "Рестораны и кафе",
  "Производственные объекты",
  "Исполнительная документация",
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
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #152333, transparent)" }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #152333, transparent)" }}
      />

      <div className="animate-marquee flex items-center gap-6 whitespace-nowrap w-max">
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            <span
              className="font-body font-medium"
              style={{
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(196,174,148,0.40)",
              }}
            >
              {item}
            </span>
            <Sep />
          </span>
        ))}
      </div>
    </div>
  );
}
