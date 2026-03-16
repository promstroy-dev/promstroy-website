/**
 * Logo component — ПромСтрой
 *
 * Direction: "Несущая балка" — structural I-beam / H-section silhouette.
 * Mark: top flange, web, bottom flange in aged brass (#C09A5C).
 * Wordmark: single unified color — no orange/accent split.
 *   Light variant: text-invert (#F0EBE3)
 *   Default variant: near-black (#171411)
 *
 * To swap in final logo: replace the three <rect> elements in BeamMark.
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

// Aged brass — the single accent carrier for the brand mark
const BRASS = "#C09A5C";

/**
 * "Несущая балка" — structural I-beam mark.
 * Refined proportions: 20×26 viewBox.
 * Three elements: top flange, web, bottom flange.
 */
function BeamMark({ px }: { px: number }) {
  const h = Math.round(px * 1.3);
  return (
    <svg
      width={px}
      height={h}
      viewBox="0 0 20 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top flange — full width, rounded only on outer corners */}
      <rect x="0"   y="0"    width="20" height="4" rx="0.6" fill={BRASS} />
      {/* Web — centered, thin vertical member */}
      <rect x="8"   y="4"    width="4"  height="18" fill={BRASS} />
      {/* Bottom flange — full width, rounded only on outer corners */}
      <rect x="0"   y="22"   width="20" height="4" rx="0.6" fill={BRASS} />
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
      {variant !== "wordmark" && <BeamMark px={mark} />}

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
