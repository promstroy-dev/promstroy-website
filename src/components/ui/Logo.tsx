/**
 * Logo component — ПромСтрой
 *
 * Direction: "Портальная рама" — structural portal frame mark.
 * The portal frame (two columns + horizontal beam) is the defining structural
 * element of commercial construction. It naturally echoes the Cyrillic П from
 * ПромСтрой while reading as an architectural drawing, not a letter.
 *
 * Mark: portal frame in aged brass (#C09A5C).
 * Wordmark: single unified color — no split coloring.
 *   Light variant: #F0EBE3
 *   Default variant: #171411
 *
 * To swap in final logo: replace the three shapes in PortalMark.
 * The component API and sizing remain unchanged.
 */

interface LogoProps {
  variant?: "full" | "mark" | "wordmark";
  size?: "sm" | "md" | "lg";
  light?: boolean;
  className?: string;
}

const SIZES = {
  sm: { mark: 18, wordmarkSize: "text-sm",   tracking: "tracking-[0.16em]", gap: "gap-2"   },
  md: { mark: 24, wordmarkSize: "text-base", tracking: "tracking-[0.18em]", gap: "gap-2.5" },
  lg: { mark: 32, wordmarkSize: "text-xl",   tracking: "tracking-[0.20em]", gap: "gap-3"   },
};

// Aged brass — primary accent carrier for the brand mark
const BRASS = "#C09A5C";

/**
 * "Портальная рама" — structural portal frame mark.
 * viewBox: 0 0 26 26. Open bottom — a frame, not a box.
 * Elements: horizontal beam (top) + left column + right column.
 * Column width equals beam height for structural proportion.
 *
 * Three options provided as comments — uncomment to switch direction:
 *   A) Portal frame (П) — recommended, used by default
 *   B) T-joint (horizontal bar + center post drop)
 *   C) Steel cross-section (concentric rectangles)
 */
function PortalMark({ px }: { px: number }) {
  const h = Math.round(px * 1.0); // square mark
  return (
    <svg
      width={px}
      height={h}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ── Option A: Portal Frame (recommended) ──────────────────── */}
      {/* Horizontal beam — structural top chord */}
      <rect x="0" y="0" width="26" height="5" rx="0.5" fill={BRASS} />
      {/* Left column — structural support */}
      <rect x="0" y="5" width="5" height="21" fill={BRASS} />
      {/* Right column — structural support */}
      <rect x="21" y="5" width="5" height="21" fill={BRASS} />
      {/* Corner haunches — subtle structural joint detail at top-inner corners */}
      <polygon points="5,5 5,9 9,5" fill={BRASS} opacity="0.55" />
      <polygon points="21,5 21,9 17,5" fill={BRASS} opacity="0.55" />
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

  // Wordmark is unified — no split coloring
  const textColor = light ? "#F0EBE3" : "#171411";

  return (
    <span
      className={`inline-flex items-center ${gap} select-none ${className}`}
      aria-label="ПромСтрой"
    >
      {variant !== "wordmark" && <PortalMark px={mark} />}

      {variant !== "mark" && (
        <span
          className={`font-heading font-bold ${wordmarkSize} ${tracking} leading-none`}
          style={{ color: textColor }}
        >
          ПРОМСТРОЙ
        </span>
      )}
    </span>
  );
}
