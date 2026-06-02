/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages (no server needed — every route is static).
  output: "export",
  // Served from https://<user>.github.io/portfolio/
  basePath: "/portfolio",
  assetPrefix: "/portfolio/",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
