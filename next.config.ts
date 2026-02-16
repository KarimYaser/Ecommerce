import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
      },
      // new URL(`https://ecommerce.routemisr.com/*/**`),
    ],
  },
};

export default nextConfig;
