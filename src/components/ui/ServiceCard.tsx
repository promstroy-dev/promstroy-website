"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Hammer, Wrench, Network } from "lucide-react";
import { Service } from "@/types";

const icons: Record<string, React.ReactNode> = {
  Building2: <Building2 size={22} />,
  Hammer:    <Hammer    size={22} />,
  Wrench:    <Wrench    size={22} />,
  Network:   <Network   size={22} />,
};

interface Props {
  service: Service;
  expanded?: boolean;
  index?: number;
}

export default function ServiceCard({ service, expanded = false, index }: Props) {
  const cardNumber = index !== undefined ? String(index + 1).padStart(2, "0") : undefined;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col h-full"
      style={{
        background: "#F5EFE6",
        border: "1px solid #D8CCBA",
        boxShadow: "0 1px 3px rgba(26,43,61,0.06), inset 0 1px 0 rgba(255,255,255,0.60)",
        transition: "transform 0.30s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.30s ease, border-color 0.30s ease",
      }}
      onMouseEnter={(e) => {
        setHovered(true);
        const el = e.currentTarget;
        el.style.transform = "translateY(-7px)";
        el.style.boxShadow = "0 24px 52px rgba(26,43,61,0.13), 0 6px 18px rgba(196,174,148,0.12), inset 0 1px 0 rgba(255,255,255,0.70)";
        el.style.borderColor = "#C4AE94";
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 1px 3px rgba(26,43,61,0.06), inset 0 1px 0 rgba(255,255,255,0.60)";
        el.style.borderColor = "#D8CCBA";
      }}
    >
      {/* Top structural rule */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "rgba(196,174,148,0.30)" }}
      />

      {/* Left accent rule — draws in on hover */}
      <div
        className="absolute top-0 left-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 origin-top"
        style={{
          background: "linear-gradient(180deg, #C4AE94 0%, rgba(196,174,148,0.3) 70%, transparent 100%)",
          transition: "transform 0.40s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Bottom reveal bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left"
        style={{
          background: "linear-gradient(90deg, #C4AE94 0%, rgba(196,174,148,0.4) 100%)",
          transition: "transform 0.40s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Corner bracket decorators */}
      {/* Top-left */}
      <div className="absolute top-2 left-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-3 h-px" style={{ background: "#C4AE94", opacity: 0.35 }} />
        <div className="w-px h-3" style={{ background: "#C4AE94", opacity: 0.35 }} />
      </div>
      {/* Top-right */}
      <div className="absolute top-2 right-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-3 h-px ml-auto" style={{ background: "#C4AE94", opacity: 0.35 }} />
        <div className="w-px h-3 ml-auto" style={{ background: "#C4AE94", opacity: 0.35 }} />
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-2 left-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end" style={{ height: "14px" }}>
        <div className="w-px h-3" style={{ background: "#C4AE94", opacity: 0.35 }} />
        <div className="w-3 h-px" style={{ background: "#C4AE94", opacity: 0.35 }} />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-2 right-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-end" style={{ height: "14px" }}>
        <div className="w-px h-3 ml-auto" style={{ background: "#C4AE94", opacity: 0.35 }} />
        <div className="w-3 h-px ml-auto" style={{ background: "#C4AE94", opacity: 0.35 }} />
      </div>

      {/* Architectural background number */}
      {cardNumber && (
        <div
          className="absolute top-3 right-4 font-heading font-bold select-none pointer-events-none leading-none"
          aria-hidden="true"
          style={{
            fontSize: "4.5rem",
            color: "rgba(196,174,148,0.08)",
            letterSpacing: "-0.04em",
            transition: "color 0.30s ease",
          }}
        >
          {cardNumber}
        </div>
      )}

      {/* Card content */}
      <div className="p-6 md:p-7 flex flex-col flex-1">

        {/* Icon container with grid decorator */}
        <div className="relative mb-6 w-11 h-11 flex-shrink-0">
          {/* Grid pattern behind icon */}
          <div
            className="absolute -inset-1.5 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(196,174,148,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(196,174,148,0.06) 1px, transparent 1px)",
              backgroundSize: "6px 6px",
            }}
          />
          <div
            className="relative w-full h-full flex items-center justify-center transition-all duration-250 group-hover:scale-105 group-hover:border-[rgba(196,174,148,0.45)] origin-left"
            style={{
              background: "rgba(196,174,148,0.09)",
              border: "1px solid rgba(196,174,148,0.22)",
              color: "#9A7E64",
            }}
          >
            {icons[service.icon] ?? <Building2 size={22} />}
          </div>
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
          className="text-sm leading-relaxed mb-4"
          style={{ color: "#6B7E8A" }}
        >
          {service.description}
        </p>

        {/* Hover-reveal: first 3 work items peek from below the description */}
        {service.items && service.items.length > 0 && (
          <div
            className="overflow-hidden"
            style={{
              maxHeight: hovered ? "6rem" : "0",
              opacity: hovered ? 1 : 0,
              transition:
                "max-height 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
              marginBottom: hovered ? "1rem" : "0",
            }}
          >
            <ul className="flex flex-col gap-1.5 pt-1 border-t" style={{ borderColor: "rgba(196,174,148,0.18)" }}>
              {service.items.slice(0, 3).map((item, i) => (
                <li key={i} className="text-xs flex items-start gap-2 pt-1.5" style={{ color: "#7A8E98" }}>
                  <span
                    className="flex-shrink-0 mt-[6px] w-2 h-px"
                    style={{ background: "#C4AE94", opacity: 0.55 }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

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

        {/* CTA link */}
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
