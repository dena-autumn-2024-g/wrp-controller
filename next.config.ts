import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*", // クライアントからのリクエストをこのパスで受け取る
        destination: "http://localhost:8080/:path*", // 実際のAPIのURL
      },
    ];
  },
};

export default nextConfig;
