import type { NextConfig } from "next";


const nextConfig: NextConfig = {
   transpilePackages: ["@lenis"], 
  // Your existing configurations, like eslint, go here
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      }
    ]
  }
};

export default nextConfig;