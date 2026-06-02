/** @type {import('next').NextConfig} */

// GitHub Pages needs static export + a /portfolio basePath.
// Vercel (and local dev) serve cleanly at the root — no basePath.
// Toggle the Pages build with: GH_PAGES=true npm run build
const isGhPages = process.env.GH_PAGES === "true";

const nextConfig = {
  ...(isGhPages && {
    output: "export",
    basePath: "/portfolio",
    assetPrefix: "/portfolio/",
  }),
  trailingSlash: true,
  images: { unoptimized: true },
  // Exposed to the client so /public images can be basePath-prefixed by hand.
  env: { NEXT_PUBLIC_BASE_PATH: isGhPages ? "/portfolio" : "" },
};

export default nextConfig;
