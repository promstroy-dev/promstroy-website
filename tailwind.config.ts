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
        // ── Light surfaces — warm stone/travertine ───────────────────────
        bg:         "#EAE0CF",   // primary light surface; warm stone/Portland cement
        "bg-soft":  "#D8CCB8",   // recessed light surface; deeper warm stone
        // ── Dark surfaces — deep naval steel ────────────────────────────
        // Deep naval darks from Palette F direction. The warm stone accent
        // now reads as travertine/concrete against a structural steel ground.
        "bg-dark":    "#1A2B3D", // primary dark; deep naval steel
        "bg-section": "#213448", // elevated dark; steel surface on dark
        "bg-mid":     "#213448", // alias kept for existing references
        "bg-deep":    "#0A1520", // absolute base; mobile nav, footer, hero
        // ── Typography ──────────────────────────────────────────────────
        text:           "#1A2B3D",  // text on light surfaces (deep naval)
        "text-muted":   "#7A8E98",  // secondary text on light and dark
        "text-invert":  "#F0EBE3",  // primary text on dark surfaces (warm off-white)
        // ── Accent — warm stone/travertine ──────────────────────────────
        // Architectural material accent. Travertine/stone against steel.
        // Replaces dated brass/gold — same warm-over-cool tension, more modern.
        accent:         "#C4AE94",  // warm stone / travertine
        "accent-hover": "#B49E84",  // slightly deeper on hover / press
        "accent-dim":   "#A08C74",  // muted variant for secondary emphasis
        // ── Steel blue — interactive secondary ──────────────────────────
        "accent-blue":       "#547792",  // structural steel blue; links, focus
        "accent-blue-light": "#94B4C1",  // light steel; hover states, muted on dark
        // ── Borders ─────────────────────────────────────────────────────
        border:       "#D0C4B0",  // warm stone border on light surfaces
        "border-dark": "#1E3348", // barely visible on dark surfaces (naval)
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
