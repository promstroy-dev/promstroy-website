interface Props {
  title: string;
  subtitle?: string;
  label?: string;
}

export default function PageHero({ title, subtitle, label = "ПромСтрой" }: Props) {
  return (
    <section
      className="relative min-h-[55vh] overflow-hidden flex items-end"
      style={{ background: "#0D1A28" }}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.025,
        }}
      />
      {/* Structural grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.012) 80px, rgba(255,255,255,0.012) 81px)`,
        }}
      />

      {/* Brass vertical rule — left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, #C4AE94 12%, #C4AE94 88%, transparent 100%)`,
          opacity: 0.45,
        }}
      />

      {/* Warm ambient — top right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(196,174,148,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Large faint background word */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none font-heading font-bold leading-none hidden lg:block"
        aria-hidden="true"
        style={{
          fontSize: "clamp(80px, 14vw, 200px)",
          color: "rgba(196,174,148,0.02)",
          letterSpacing: "-0.04em",
        }}
      >
        {label?.toUpperCase()}
      </div>

      {/* Content */}
      <div className="relative max-w-content mx-auto px-4 md:px-8 pt-32 md:pt-40 pb-14 md:pb-20 w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-px" style={{ background: "#C4AE94", opacity: 0.7 }} />
          <span
            className="text-[10px] uppercase font-medium"
            style={{ color: "#7A8E98", letterSpacing: "0.26em" }}
          >
            {label}
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="font-bold mb-4 leading-tight max-w-3xl"
          style={{
            fontFamily: "var(--font-unbounded), var(--font-space-grotesk), sans-serif",
            fontSize: "clamp(34px, 4.5vw, 64px)",
            color: "#F0EBE3",
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "rgba(148,180,193,0.55)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
