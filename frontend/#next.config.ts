import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ✅ Autoriser les domaines externes
    // domains: ["localhost", "api.monsite.com"],

    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // ton API backend
        pathname: "/upload/blog/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // ton API backend
        pathname: "/upload/service/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // ton API backend
        pathname: "/upload/project/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // ton API backend
        pathname: "/upload/career/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // ton API backend
        pathname: "/upload/formation/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // ton API backend
        pathname: "/upload/event/**",
      },
      {
        protocol: "https",
        hostname: "api.monsite.com",
        pathname: "/upload/service/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/upload/blog/:path*",
        destination: "http://localhost:3000/upload/blog/:path*", // backend
      },
      {
        source: "/upload/service/:path*",
        destination: "http://localhost:3000/upload/service/:path*", // backend
      },
      {
        source: "/upload/project/:path*",
        destination: "http://localhost:3000/upload/project/:path*", // backend
      },
      {
        source: "/upload/career/:path*",
        destination: "http://localhost:3000/upload/career/:path*", // backend
      },
      {
        source: "/upload/formation/:path*",
        destination: "http://localhost:3000/upload/formation/:path*", // backend
      },
      {
        source: "/upload/event/:path*",
        destination: "http://localhost:3000/upload/event/:path*", // backend
      },
    ];
  },
};

export default nextConfig;
