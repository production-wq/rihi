/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a verification build write somewhere other than .next, so running one
  // while `next dev` is up does not overwrite the dev server's chunks and leave
  // it serving a page with no CSS and "Cannot find module './948.js'".
  distDir: process.env.NEXT_DIST_DIR || ".next",
  reactStrictMode: true,
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1200, 1920, 2560],
  },
};

export default nextConfig;
