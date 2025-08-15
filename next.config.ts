import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing configurations, like eslint, go here
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // Optional: If you need to restrict to a specific subdirectory
        // pathname: '/v1755195118/**'
      },
    ],
  },
};

export default nextConfig;