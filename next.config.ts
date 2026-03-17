import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Repositories served at a path like /project-name/ must have it as basePath
  basePath: process.env.NODE_ENV === 'production' ? '/Itzfizz' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
