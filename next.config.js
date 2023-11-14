/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "plus.unsplash.com",
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    // disableStaticImages: true,
  },
};

module.exports = nextConfig;
