"use client";
import Link from "next/link";
import { ArrowRight, Building2, Hammer, Wrench, Network } from "lucide-react";
import { Service } from "@/types";

const icons: Record<string, React.ReactNode> = {
  Building2: <Building2 size={20} />,
  Hammer:    <Hammer    size={20} />,
  Wrench:    <Wrench    size={20} />,
  Network:   <Network   size={20} />,
};

interface Props {
  service: Service;
  expanded?: boolean;
}

export default function ServiceCard({ service, expanded = false }: Props) {
  return (
    <div
      className="group relative flex flex-col h-full"
      style={{
        background: "#F5EFE6",
        border: "1px solid #D8CCBA",
        boxShadow: "0 1px 3px rgba(26,43,61,0.06), inset 0 1px 0 rgba(255,255,255,0.60)",
        transition: "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s ease, border-color 0.28s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-5px)";
        el.style.boxShadow = "0 18px 44px rgba(26,43,61,0.12), 0 4px 14px rgba(196,174,148,0.10), inset 0 1px 0 rgba(255,255,255,0.60)";
        el.style.borderColor = "#C8B89E";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 1px 3px rgba(26,43,61,0.06), inset 0 1px 0 rgba(255,255,255,0.60)";
        el.style.borderColor = "#D8CCBA";
      }}
    >
      {/* Top structural rule — full width accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "rgba(196,174,148,0.30)" }}
      />

      {/* Bottom reveal bar — draws in on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left"
        style={{
          background: "linear-gradient(90deg, #C4AE94 0%, #B49E84 100%)",
          transition: "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Card content */}
      <div className="p-6 md:p-7 flex flex-col flex-1">

        {/* Icon container */}
        <div
          className="mb-5 w-10 h-10 flex items-center justify-center flex-shrink-0 transition-transform duration-250 group-hover:scale-105 origin-left"
          style={{
            background: "rgba(196,174,148,0.12)",
            border: "1px solid rgba(196,174,148,0.22)",
            color: "#9A7E64",
          }}
        >
          {icons[service.icon] ?? <Building2 size={20} />}
        </div>

        {/* Title */}
        <h3
          className="font-heading font-semibold text-text mb-2.5 leading-snug"
          style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: "#6B7E8A" }}
        >
          {service.description}
        </p>

        {/* Items (expanded view) */}
        {expanded && (
          <ul className="flex flex-col gap-2 mb-5">
            {service.items.map((item, i) => (
              <li key={i} className="text-sm flex items-start gap-3" style={{ color: "#6B7E8A" }}>
                <span
                  className="flex-shrink-0 mt-[7px] w-3 h-px"
                  style={{ background: "#C4AE94", opacity: 0.7 }}
                />
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* CTA link — pushed to bottom */}
        <div className="mt-auto pt-2">
          <Link
            href={`/uslugi/${service.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold group/link"
            style={{ color: "#A08070" }}
          >
            Подробнее
            <ArrowRight
              size={13}
              className="transition-transform duration-200 group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
