/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compress all responses with gzip/brotli
  compress: true,

  // Optimize images: modern formats, lazy loading
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year cache
    deviceSizes: [390, 640, 828, 1080, 1280, 1920],
    imageSizes: [16, 32, 64, 128, 256],
  },

  // Aggressive HTTP caching for static assets
  async headers() {
    return [
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Experimental: faster builds + CSS optimisation
  experimental: {
    optimizePackageImports: ["next/font"],
  },
};

export default nextConfig;
