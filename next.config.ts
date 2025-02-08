import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  }
    // pageExtensions: ['ts', 'tsx']
  /* config options here */
};

export default nextConfig;
