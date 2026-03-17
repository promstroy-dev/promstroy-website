import Link from "next/link";
import { Project } from "@/types";
import { ArrowUpRight } from "lucide-react";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <Link
      href={`/proekty/${project.slug}`}
      className="group block overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2"
      style={{ background: "#192C40", border: "1px solid #1E3348" }}
    >
      {/* ── Image / Placeholder area ──────────────────────────────── */}
      <div className="aspect-[4/3] relative overflow-hidden" style={{ background: "#0D1A28" }}>

        {/* Architectural blueprint grid — refined placeholder */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 48px,
                rgba(84,119,146,0.06) 48px,
                rgba(84,119,146,0.06) 49px
              ),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 48px,
                rgba(84,119,146,0.06) 48px,
                rgba(84,119,146,0.06) 49px
              ),
              linear-gradient(145deg, #0D1A28 0%, #0A1520 100%)
            `,
          }}
        />

        {/* Structural I-beam outline — faint center watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg width="48" height="60" viewBox="0 0 20 26" fill="none" opacity={0.06}>
            <rect x="0" y="0"  width="20" height="4"  rx="0.6" fill="#547792" />
            <rect x="8" y="4"  width="4"  height="18" fill="#547792" />
            <rect x="0" y="22" width="20" height="4"  rx="0.6" fill="#547792" />
          </svg>
        </div>

        {/* Corner diagonal brass accent */}
        <div
          className="absolute bottom-0 right-0 w-36 h-36 opacity-40 transition-opacity duration-250 group-hover:opacity-80"
          style={{
            background: "linear-gradient(135deg, transparent 50%, rgba(84,119,146,0.12) 100%)",
          }}
        />

        {/* Type badge — top left */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span
            className="inline-block text-[10px] font-semibold uppercase px-2.5 py-1"
            style={{
              background: "rgba(8,14,22,0.80)",
              color: "#94B4C1",
              letterSpacing: "0.18em",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(84,119,146,0.30)",
            }}
          >
            {project.type}
          </span>
        </div>

        {/* Arrow — top right, appears on hover */}
        <div
          className="absolute top-3.5 right-3.5 z-10 transition-all duration-250 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
        >
          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{ background: "#547792" }}
          >
            <ArrowUpRight size={14} color="#F0EBE3" />
          </div>
        </div>

        {/* Placeholder label */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 pointer-events-none">
          <p
            className="text-[9px] uppercase tracking-[0.22em]"
            style={{ color: "rgba(240,235,227,0.20)" }}
          >
            Фото готовится
          </p>
        </div>
      </div>

      {/* ── Card body ────────────────────────────────────────────── */}
      <div
        className="p-5 border-t"
        style={{ borderColor: "rgba(30,51,72,0.6)" }}
      >
        <h3
          className="font-heading font-semibold leading-snug mb-2.5 transition-colors duration-200"
          style={{ fontSize: "0.95rem", color: "rgba(240,235,227,0.90)" }}
        >
          <span className="group-hover:text-[#94B4C1] transition-colors duration-200">
            {project.title}
          </span>
        </h3>
        <div
          className="flex items-center gap-2.5 text-[10px] uppercase tracking-wider"
          style={{ color: "rgba(140,130,120,0.75)" }}
        >
          {project.area && <span>{project.area}</span>}
          {project.area && <span style={{ color: "#1E3348" }}>·</span>}
          <span>{project.year}</span>
          <span style={{ color: "#1E3348" }}>·</span>
          <span>{project.city}</span>
        </div>
      </div>
    </Link>
  );
}
