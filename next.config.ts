import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/': ['./public/onepager.html'],
  },
};

export default nextConfig;
