import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['flowbite.s3.amazonaws.com', 'images.unsplash.com'], // Add all required domains
  },
  /* other config options */
};

export default nextConfig;
