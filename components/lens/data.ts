/**
 * ── EDIT ME ──────────────────────────────────────────────────────────────
 * Photography / drone portfolio content. Swap the Picsum placeholders for
 * your real shots from ~/Media (export a few favorites into /public/lens/).
 */

// Color image helper (NOT grayscale — photography is in color).
export const PHOTO = (id: number, w = 1600, h = 1000) =>
  `https://picsum.photos/id/${id}/${w}/${h}`;

export const lensProfile = {
  name: "James Alford",
  craft: "Aerial & Field Photography",
  tagline: "Light, land, and altitude — captured on camera and drone.",
  bio: "I shoot landscapes from the ground and the air — chasing weather, golden hour, and the geometry only altitude reveals. Available for commissions, prints, and aerial work.",
  email: "hello@jamesalford.dev", // ← replace
  instagram: "https://instagram.com/", // ← replace
  location: "United States",
};

export type Shot = { id: number; title: string; place: string; kind: "Drone" | "Field" };

// Hero + featured large frames.
export const heroShot: Shot = { id: 1018, title: "Ridgeline", place: "—", kind: "Drone" };
export const featureShot: Shot = { id: 1015, title: "River Bend", place: "—", kind: "Drone" };
export const stickyShot: Shot = { id: 1036, title: "First Light", place: "—", kind: "Field" };

// Parallax bands.
export const bands: Shot[] = [
  { id: 1039, title: "Cascade", place: "—", kind: "Field" },
  { id: 1043, title: "Treeline", place: "—", kind: "Drone" },
  { id: 1057, title: "Coast Road", place: "—", kind: "Drone" },
];

// Draggable gallery + grid.
export const gallery: Shot[] = [
  { id: 1016, title: "Switchback", place: "—", kind: "Drone" },
  { id: 1024, title: "Den", place: "—", kind: "Field" },
  { id: 1059, title: "Still Water", place: "—", kind: "Drone" },
  { id: 1061, title: "Harbor", place: "—", kind: "Drone" },
  { id: 1069, title: "Haze", place: "—", kind: "Field" },
  { id: 1074, title: "Crest", place: "—", kind: "Drone" },
];

export const grid: Shot[] = [
  { id: 1084, title: "Dune", place: "—", kind: "Field" },
  { id: 200, title: "Window Light", place: "—", kind: "Field" },
  { id: 164, title: "Desk", place: "—", kind: "Field" },
  { id: 29, title: "Canyon", place: "—", kind: "Drone" },
  { id: 1011, title: "Shoreline", place: "—", kind: "Drone" },
  { id: 1006, title: "Portrait of Place", place: "—", kind: "Field" },
];
