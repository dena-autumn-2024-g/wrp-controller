import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  async rewrites() {
    return [
      {
        source: "/:path*", // クライアントからのリクエストをこのパスで受け取る
        destination: "https://wrp.mazrean.com/:path*", // 実際のAPIのURL
      },
    ];
  },
};

export default nextConfig;
