/**
 * ── EDIT ME ──────────────────────────────────────────────────────────────
 * Single source of truth for the portfolio. Change copy/projects/links here;
 * every section reads from this file. Drafted from known projects — adjust
 * wording, add real screenshots, fix the email, etc.
 */

export const profile = {
  name: "James Alford",
  role: "Emergency Physician × Software Engineer",
  tagline:
    "I build AI apps, websites, and SaaS — at the edge of medicine and code.",
  // About paragraph (factual — no invented metrics).
  bio: "Emergency physician and self-taught engineer. I design and ship AI-driven clinical tools, consumer apps, and SaaS — owning the whole stack from on-device ML to deploy. Recent work spans conversational patient intake, EM shift scheduling, and on-device OCR credentialing.",
  email: "hello@jamesalford.dev", // ← replace with your real address
  github: "https://github.com/Jbapckfan",
  location: "United States",
};

export const stack = [
  "REACT",
  "NEXT.JS",
  "EXPO",
  "TYPESCRIPT",
  "FASTAPI",
  "PYTHON",
  "SWIFTUI",
  "GSAP",
  "POSTGRES",
  "DOCKER",
  "TAILWIND",
  "CLAUDE",
];

export type Project = {
  name: string;
  category: "AI App" | "SaaS" | "Website" | "iOS" | "Tool";
  year: string;
  blurb: string;
  tags: string[];
  status?: string;
};

// Flagship — featured in the full-screen "Sticky Scale" reveal.
export const flagship: Project = {
  name: "ED Scheduling",
  category: "SaaS",
  year: "2026",
  blurb:
    "AI-first conversational shift scheduling for emergency medicine. Natural-language rules, preference intensity, and emergent-coverage automation.",
  tags: ["Next.js", "LLM", "Postgres"],
  status: "In development",
};

// Second feature — shown via the "Clip Wipe Reveal".
export const feature: Project = {
  name: "ED Pre-Arrival Intake",
  category: "AI App",
  year: "2026",
  blurb:
    "Conversational AI that intakes patients before arrival, risk-stratifies, and drafts the clinical note — so the room is ready before the doors open.",
  tags: ["Conversational AI", "React Native", "Risk Models"],
  status: "Prototype",
};

// The rest — browsable in the draggable gallery.
export const projects: Project[] = [
  {
    name: "MedCred",
    category: "iOS",
    year: "2026",
    blurb:
      "Credentialing app with on-device Apple Vision OCR — private, fast, no paid OCR APIs.",
    tags: ["Expo", "Swift", "Vision"],
    status: "Active",
  },
  {
    name: "Critical Code Timer",
    category: "Tool",
    year: "2026",
    blurb:
      "Resuscitation protocol timer for the ED. No PHI, cellular-reachable downtime backup.",
    tags: ["React", "Fly.io"],
  },
  {
    name: "PriceWatch",
    category: "Tool",
    year: "2025",
    blurb:
      "Self-hosted price tracking with push alerts and resilient scrapers (Amazon, eBay, generic).",
    tags: ["FastAPI", "Python", "APScheduler"],
    status: "Live",
  },
  {
    name: "Command Center",
    category: "Website",
    year: "2026",
    blurb:
      "Personal operations dashboard — one pane of glass for everything self-hosted.",
    tags: ["Next.js", "Docker"],
    status: "Live",
  },
  {
    name: "Glitched",
    category: "iOS",
    year: "2026",
    blurb:
      "Line-art SpriteKit platformer with tuned jump physics and 30+ device-feature levels.",
    tags: ["SpriteKit", "Swift"],
  },
  {
    name: "TARS Home AI",
    category: "AI App",
    year: "2026",
    blurb:
      "Self-hosted home AI + media stack — control plane, digital twins, and autonomy roadmap.",
    tags: ["Docker", "Tailscale", "Agents"],
    status: "Live",
  },
];
