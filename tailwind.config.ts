import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Light surfaces — warm concrete ──────────────────────────────
        bg:         "#F0E9DF",   // primary light surface; intentional concrete warmth
        "bg-soft":  "#E2D9CE",   // secondary light; recessed surface variation
        // ── Dark surfaces — cool steel ──────────────────────────────────
        // Shifted from warm-brown to cool-steel to harmonize with the
        // construction video (overcast sky, crane silhouettes). The brass
        // accent now reads as warm hardware against a cold structural ground.
        "bg-dark":    "#0D0F13", // primary dark; cool steel near-black
        "bg-section": "#13151A", // elevated dark; steel surface on dark
        "bg-mid":     "#13151A", // alias kept for existing references
        "bg-deep":    "#090A0C", // absolute base; mobile nav, footer
        // ── Typography ──────────────────────────────────────────────────
        text:           "#171411",  // text on light surfaces
        "text-muted":   "#8C8278",  // secondary text on light and dark
        "text-invert":  "#F0EBE3",  // primary text on dark surfaces (warm off-white)
        // ── Accent — aged brass ─────────────────────────────────────────
        // NOT orange. Aged metal / architectural hardware. ~7.8:1 on bg-deep.
        accent:         "#C09A5C",  // warm brass / patinated metal
        "accent-hover": "#A8843E",  // slightly deeper on hover / press
        "accent-dim":   "#8A6E38",  // muted variant for secondary emphasis
        // ── Borders ─────────────────────────────────────────────────────
        border:       "#D1C9BC",  // warm border on light surfaces
        "border-dark": "#1E2028", // barely visible on dark surfaces (cool steel)
        // ── Card ────────────────────────────────────────────────────────
        "card-bg": "#FFFFFF",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body:    ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "out-circ": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
