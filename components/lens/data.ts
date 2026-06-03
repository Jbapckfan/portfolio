/**
 * ── Photography / drone portfolio content ──
 * Images live in /public/lens/. Sharp shots (≥1024px) go in the full-bleed
 * slots; the 540px lake previews sit in the smaller gallery cards.
 */

// public/ assets aren't auto-prefixed with basePath in a plain <img>, so we
// prefix manually. NEXT_PUBLIC_BASE_PATH is "" on Vercel, "/portfolio" on GH Pages.
const PREFIX = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const LOCAL = (file: string) => `${PREFIX}/lens/${file}`;

export const lensProfile = {
  name: "James Alford",
  craft: "Aerial & Field Photography",
  tagline: "Light, land, and altitude — captured on camera and drone.",
  bio: "I shoot landscapes from the ground and the air — chasing weather, golden hour, and the geometry only altitude reveals. Available for commissions, prints, and aerial work.",
  email: "hello@jamesalford.dev", // ← replace
  instagram: "https://instagram.com/", // ← replace
  location: "United States",
};

export type Shot = { file: string; title: string; kind: "Drone" | "Field" };

// Full-bleed hero + featured frames (the sharp ones).
export const heroShot: Shot = { file: "kaanapali-coast.jpg", title: "Kāʻanapali Coast", kind: "Drone" };
export const featureShot: Shot = { file: "iao-needle.jpg", title: "ʻĪao Needle", kind: "Drone" };
export const stickyShot: Shot = { file: "mother-and-calf.jpg", title: "Mother & Calf", kind: "Drone" };

// Parallax bands.
export const bands: Shot[] = [
  { file: "spillway-dusk.jpg", title: "Spillway, Dusk", kind: "Drone" },
  { file: "hilltop-church.jpg", title: "Hilltop Chapel", kind: "Drone" },
  { file: "humpbacks.jpg", title: "Humpbacks", kind: "Drone" },
];

// Draggable gallery (smaller cards — fine for the 540px lake shots).
export const gallery: Shot[] = [
  { file: "northwoods-lakes.jpg", title: "Northwoods Lakes", kind: "Drone" },
  { file: "still-bay.jpg", title: "Still Bay", kind: "Drone" },
  { file: "sandbar-point.jpg", title: "Sandbar Point", kind: "Drone" },
  { file: "showboat.jpg", title: "Showboat", kind: "Drone" },
];

// ── Field / on-foot photography (non-drone) — masonry grid ──
export const field: Shot[] = [
  { file: "toucan.jpg", title: "Toco Toucan", kind: "Field" },
  { file: "red-panda.jpg", title: "Red Panda", kind: "Field" },
  { file: "barred-owl.jpg", title: "Barred Owl", kind: "Field" },
  { file: "sunflower.jpg", title: "Sunflower", kind: "Field" },
  { file: "mopop.jpg", title: "MoPOP", kind: "Field" },
  { file: "the-strait.jpg", title: "The Strait", kind: "Field" },
  { file: "deception-pass.jpg", title: "Deception Pass", kind: "Field" },
  { file: "ferry-olympics.jpg", title: "Crossing", kind: "Field" },
];

// Contact backdrop.
export const contactShot = "kaanapali-coast.jpg";
