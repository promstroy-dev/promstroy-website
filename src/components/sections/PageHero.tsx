interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: Props) {
  return (
    <section
      className="border-b pt-32 pb-14 relative overflow-hidden"
      style={{ background: "#0D0F13", borderColor: "#1E2028" }}
    >
      {/* Brass left rule — gradient fade */}
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
          opacity: 0.5,
        }}
      />

      {/* Subtle brass ambient — top right */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[250px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(192,154,92,0.05) 0%, transparent 65%)",
        }}
      />

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 80px,
            rgba(255,255,255,0.012) 80px,
            rgba(255,255,255,0.012) 81px
          )`,
        }}
      />

      <div className="relative max-w-content mx-auto px-6 md:px-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-4 h-px" style={{ background: "#C09A5C", opacity: 0.7 }} />
          <span
            className="text-[10px] uppercase font-medium"
            style={{ color: "#8C8278", letterSpacing: "0.26em" }}
          >
            ПромСтрой
          </span>
        </div>
        <h1
          className="font-heading font-bold mb-4 leading-tight"
          style={{
            fontSize: "clamp(36px, 5vw, 68px)",
            color: "#F0EBE3",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "#8C8278" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
