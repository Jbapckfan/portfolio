import type { Config } from "tailwindcss";

/**
 * Design tokens — "Darkroom" system.
 * No hardcoded colors/type/spacing anywhere else; everything references these.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)", // warm near-black ground
        bone: "var(--bone)", // off-white text
        sulfur: "var(--sulfur)", // single acid accent
        ash: "var(--ash)", // muted divider/meta
        signal: "var(--signal)", // lab-only alert accent
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
    },
  },
  plugins: [],
};

export default config;
