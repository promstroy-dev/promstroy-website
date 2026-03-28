"use client";
import Link from "next/link";
import { Project } from "@/types";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/proekty/${project.slug}`}
      className="group block overflow-hidden"
      style={{
        background: "#192C40",
        border: "1px solid #1E3348",
        boxShadow: "0 2px 8px rgba(0,0,0,0.20)",
        transition: "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.32s ease, border-color 0.28s ease",
      }}
      onMouseEnter={(e) => {
        setHovered(true);
        const el = e.currentTarget;
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = "0 24px 60px rgba(0,0,0,0.42), 0 6px 18px rgba(0,0,0,0.24)";
        el.style.borderColor = "rgba(196,174,148,0.18)";
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.20)";
        el.style.borderColor = "#1E3348";
      }}
    >
      {/* ── Media / placeholder area ───────────────────────────── */}
      <div className="aspect-[4/3] relative overflow-hidden" style={{ background: "#0D1A28" }}>

        {/* Blueprint grid — scales on hover */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 44px,
                rgba(84,119,146,0.07) 44px,
                rgba(84,119,146,0.07) 45px
              ),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 44px,
                rgba(84,119,146,0.07) 44px,
                rgba(84,119,146,0.07) 45px
              ),
              linear-gradient(160deg, #0D1A28 0%, #081420 100%)
            `,
          }}
        />

        {/* Portal frame — brand mark as placeholder centerpiece */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            width="56"
            height="56"
            viewBox="0 0 26 26"
            fill="none"
            className="transition-opacity duration-300 group-hover:opacity-70"
            style={{ opacity: 0.10 }}
          >
            {/* Horizontal beam */}
            <rect x="1" y="1" width="24" height="4.5" fill="#547792" />
            {/* Left column */}
            <rect x="1" y="5.5" width="5" height="19.5" fill="#547792" />
            {/* Right column */}
            <rect x="20" y="5.5" width="5" height="19.5" fill="#547792" />
            {/* Haunch triangles */}
            <polygon points="6,5.5 1,10 6,10" fill="#547792" opacity="0.5" />
            <polygon points="20,5.5 25,10 20,10" fill="#547792" opacity="0.5" />
            {/* Stroke-draw outline — draws on hover */}
            <path
              d="M 1 25.5 L 1 1 L 25 1 L 25 25.5"
              stroke="#94B4C1"
              strokeWidth="1.0"
              fill="none"
              strokeLinecap="square"
              strokeDasharray="75"
              strokeDashoffset={hovered ? 0 : 75}
              style={{
                transition: hovered
                  ? "stroke-dashoffset 0.72s cubic-bezier(0.19, 1, 0.22, 1)"
                  : "stroke-dashoffset 0.35s ease-in",
                opacity: 0.55,
              }}
            />
          </svg>
        </div>

        {/* Architectural dimension marks — horizontal */}
        <div className="absolute bottom-8 left-5 right-5 pointer-events-none">
          <div className="relative h-px" style={{ background: "rgba(84,119,146,0.18)" }}>
            <div className="absolute left-0 top-[-3px] w-px h-[7px]" style={{ background: "rgba(84,119,146,0.28)" }} />
            <div className="absolute right-0 top-[-3px] w-px h-[7px]" style={{ background: "rgba(84,119,146,0.28)" }} />
          </div>
        </div>

        {/* Warm corner ambient — intensifies on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 85% 85%, rgba(196,174,148,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Corner bracket decorators — steel blue */}
        {/* Top-left */}
        <div className="absolute top-2 left-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="w-3 h-px" style={{ background: "#547792", opacity: 0.4 }} />
          <div className="w-px h-3" style={{ background: "#547792", opacity: 0.4 }} />
        </div>
        {/* Top-right — avoid badge overlap */}
        <div className="absolute top-2 right-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="w-3 h-px ml-auto" style={{ background: "#547792", opacity: 0.4 }} />
          <div className="w-px h-3 ml-auto" style={{ background: "#547792", opacity: 0.4 }} />
        </div>
        {/* Bottom-left */}
        <div className="absolute bottom-2 left-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end" style={{ height: "14px" }}>
          <div className="w-px h-3" style={{ background: "#547792", opacity: 0.4 }} />
          <div className="w-3 h-px" style={{ background: "#547792", opacity: 0.4 }} />
        </div>
        {/* Bottom-right */}
        <div className="absolute bottom-2 right-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-end justify-end" style={{ height: "14px" }}>
          <div className="w-px h-3 ml-auto" style={{ background: "#547792", opacity: 0.4 }} />
          <div className="w-3 h-px ml-auto" style={{ background: "#547792", opacity: 0.4 }} />
        </div>

        {/* Type badge — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="inline-block text-[9px] font-semibold uppercase px-2.5 py-1"
            style={{
              background: "rgba(8,14,22,0.85)",
              color: "#94B4C1",
              letterSpacing: "0.18em",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(84,119,146,0.25)",
            }}
          >
            {project.type}
          </span>
        </div>

        {/* Arrow — top right, appears on hover */}
        <div
          className="absolute top-3 right-3 z-10 transition-all duration-250 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
        >
          <div
            className="w-7 h-7 flex items-center justify-center"
            style={{ background: "#547792" }}
          >
            <ArrowUpRight size={13} color="#F0EBE3" />
          </div>
        </div>

        {/* Placeholder state label — bottom left, styled as a deliberate tag */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span
            className="inline-block text-[9px] uppercase tracking-[0.20em] font-medium px-2 py-0.5"
            style={{
              color: "rgba(84,119,146,0.65)",
              background: "rgba(8,14,22,0.55)",
              border: "1px solid rgba(84,119,146,0.15)",
            }}
          >
            Фото · в работе
          </span>
        </div>
      </div>

      {/* ── Card body ───────────────────────────────────────────── */}
      <div
        className="px-4 pt-4 pb-5"
        style={{ borderTop: "1px solid rgba(84,119,146,0.14)" }}
      >
        {/* Title */}
        <h3
          className="font-heading font-semibold leading-snug mb-3 transition-colors duration-200"
          style={{ fontSize: "0.925rem", color: "rgba(240,235,227,0.90)" }}
        >
          <span className="group-hover:text-[#94B4C1] transition-colors duration-200">
            {project.title}
          </span>
        </h3>

        {/* Metadata row */}
        <div className="flex items-center gap-0 flex-wrap">
          {project.area && (
            <>
              <span
                className="text-[10px] uppercase tracking-wider font-medium"
                style={{ color: "rgba(148,180,193,0.70)" }}
              >
                {project.area}
              </span>
              <span
                className="mx-2.5 flex-shrink-0 w-px h-3"
                style={{ background: "rgba(84,119,146,0.30)", display: "inline-block" }}
              />
            </>
          )}
          <span
            className="text-[10px] uppercase tracking-wider font-medium"
            style={{ color: "rgba(148,180,193,0.55)" }}
          >
            {project.year}
          </span>
          <span
            className="mx-2.5 flex-shrink-0 w-px h-3"
            style={{ background: "rgba(84,119,146,0.30)", display: "inline-block" }}
          />
          <span
            className="text-[10px] uppercase tracking-wider"
            style={{ color: "rgba(148,180,193,0.45)" }}
          >
            {project.city}
          </span>
          {project.works && project.works.length > 0 && (
            <>
              <span
                className="mx-2.5 flex-shrink-0 w-px h-3"
                style={{ background: "rgba(84,119,146,0.30)", display: "inline-block" }}
              />
              <span
                className="text-[10px] uppercase tracking-wider"
                style={{ color: "rgba(148,180,193,0.40)" }}
              >
                {project.works.length} работ
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
