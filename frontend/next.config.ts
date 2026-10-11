import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        // This points to localhost:3000 INSIDE the Codespaces container
        destination: 'http://localhost:3000/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;