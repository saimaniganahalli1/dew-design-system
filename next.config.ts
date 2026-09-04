import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    incomingRequests: false,
    browserToTerminal: false,
  },
};

export default nextConfig;
