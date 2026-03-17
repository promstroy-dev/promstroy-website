import Link from "next/link";
import { ArrowRight, Building2, Hammer, Wrench, Network } from "lucide-react";
import { Service } from "@/types";

const icons: Record<string, React.ReactNode> = {
  Building2: <Building2 size={22} />,
  Hammer:    <Hammer size={22} />,
  Wrench:    <Wrench size={22} />,
  Network:   <Network size={22} />,
};

interface Props {
  service: Service;
  expanded?: boolean;
}

export default function ServiceCard({ service, expanded = false }: Props) {
  return (
    <div className="
      group relative flex flex-col
      bg-card-bg border border-border
      p-6 md:p-7
      transition-all duration-280 ease-out
      hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]
    ">
      {/* Brass bottom reveal on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left"
        style={{ background: "#C4AE94" }}
      />

      {/* Top brass accent — always visible, very subtle */}
      <div
        className="absolute top-0 left-0 w-10 h-[2px]"
        style={{ background: "#C4AE94", opacity: 0.4 }}
      />

      {/* Icon — structural, minimal */}
      <div
        className="mb-6 transition-transform duration-220 group-hover:scale-105 origin-left"
        style={{ color: "#C4AE94" }}
      >
        {icons[service.icon] ?? <Building2 size={22} />}
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-text mb-2.5 leading-snug"
          style={{ fontSize: "1.05rem" }}>
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-text-muted text-sm leading-relaxed mb-5">{service.description}</p>

      {/* Items (expanded view) */}
      {expanded && (
        <ul className="flex flex-col gap-1.5 mb-5">
          {service.items.map((item, i) => (
            <li key={i} className="text-sm text-text-muted flex items-start gap-2.5">
              <span className="flex-shrink-0 mt-[6px] w-3 h-px" style={{ background: "#C4AE94", opacity: 0.7 }} />
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* CTA link */}
      <div className="mt-auto pt-2">
        <Link
          href={`/uslugi/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold group/link"
          style={{ color: "#C4AE94" }}
        >
          Подробнее
          <ArrowRight
            size={13}
            className="transition-transform duration-200 group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
