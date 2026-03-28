/**
 * Logo — ПромСтрой
 *
 * Mark: structural portal frame in axonometric (isometric) view.
 * Drawn as a STROKE-BASED outline — no filled masses — so it reads
 * unambiguously as П (arch/portal) at every size, never as Т.
 *
 * Geometry (viewBox 28×28):
 *   Frame   — 22w × 18h, origin (3,7).
 *   Columns — 4 units wide each. Inner void 14w × 14h.
 *   Beam    — 4 units tall (y 7→11).
 *
 * 3D construction:
 *   Depth vector (+3, −3) → upper-right.
 *   Top face   — brass-filled parallelogram (3,7 / 25,7 / 28,4 / 6,4).
 *   Right face — brass-filled parallelogram (25,7 / 28,4 / 28,22 / 25,25).
 *   Outer depth edges — (3,7)→(6,4) and (25,7)→(28,4), back top (6,4)→(28,4).
 *   Inner beam soffit — two diagonal lines + back soffit line.
 *
 * Wordmark: ПРОМСТРОЙ — Space Grotesk 700, tracking 0.10–0.13em.
 */

interface LogoProps {
  variant?: "full" | "mark" | "wordmark";
  size?: "sm" | "md" | "lg";
  light?: boolean;
  className?: string;
}

const SIZES = {
  sm: { mark: 18, wordmarkSize: "text-sm",   tracking: "tracking-[0.10em]", gap: "gap-2.5" },
  md: { mark: 24, wordmarkSize: "text-base", tracking: "tracking-[0.12em]", gap: "gap-3"   },
  lg: { mark: 30, wordmarkSize: "text-xl",   tracking: "tracking-[0.13em]", gap: "gap-3.5" },
};

const BRASS = "#C4AE94";

function IsometricMark({ px }: { px: number }) {
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top face of beam — brass parallelogram (depth going upper-right) */}
      <polygon
        points="3,7 25,7 28,4 6,4"
        fill={BRASS}
        opacity="0.18"
      />

      {/* Right face of right column — thin brass parallelogram */}
      <polygon
        points="25,7 28,4 28,22 25,25"
        fill={BRASS}
        opacity="0.12"
      />

      {/* Main П portal frame — stroke outline, no heavy fill */}
      {/* Path: outer left col → beam top → outer right col → inner right → soffit → inner left → close */}
      <path
        d="M3 25 L3 7 L25 7 L25 25 L21 25 L21 11 L7 11 L7 25 Z"
        fill={BRASS}
        fillOpacity="0.07"
        stroke={BRASS}
        strokeWidth="1.75"
        strokeLinejoin="miter"
      />

      {/* Outer depth edge lines — front corners to back */}
      <line x1="3"  y1="7" x2="6"  y2="4" stroke={BRASS} strokeWidth="1.5" opacity="0.65" />
      <line x1="25" y1="7" x2="28" y2="4" stroke={BRASS} strokeWidth="1.5" opacity="0.65" />
      {/* Back beam top edge */}
      <line x1="6"  y1="4" x2="28" y2="4" stroke={BRASS} strokeWidth="1"   opacity="0.42" />

      {/* Inner beam soffit depth — beam ceiling in 3D */}
      <line x1="7"  y1="11" x2="10" y2="8" stroke={BRASS} strokeWidth="0.75" opacity="0.30" />
      <line x1="21" y1="11" x2="24" y2="8" stroke={BRASS} strokeWidth="0.75" opacity="0.30" />
      <line x1="10" y1="8"  x2="24" y2="8" stroke={BRASS} strokeWidth="0.5"  opacity="0.20" />
    </svg>
  );
}

export default function Logo({
  variant = "full",
  size = "md",
  light = false,
  className = "",
}: LogoProps) {
  const { mark, wordmarkSize, tracking, gap } = SIZES[size];
  const textColor = light ? "#F0EBE3" : "#1A2B3D";

  return (
    <span
      className={`inline-flex items-center ${gap} select-none ${className}`}
      aria-label="ПромСтрой"
    >
      {variant !== "wordmark" && <IsometricMark px={mark} />}

      {variant !== "mark" && (
        <span
          className={`font-bold ${wordmarkSize} ${tracking} leading-none`}
          style={{ color: textColor, fontFamily: "var(--font-unbounded), sans-serif" }}
        >
          ПРОМСТРОЙ
        </span>
      )}
    </span>
  );
}
