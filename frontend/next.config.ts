import type { NextConfig } from "next";

const isStatic = process.env.NODE_ENV === 'development' && process.env.EXPORT === 'true';

const nextConfig: NextConfig = {
  // Si c'est pour l'export statique (GitHub Pages)
  ...(isStatic && {
    output: 'export',
    images: { unoptimized: true },
    trailingSlash: true,
  }),
  
  // Si c'est pour le serveur (développement ou production)
  ...(!isStatic && {
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost",
          port: "3000",
          pathname: "/upload/**",
        },
        {
          protocol: "https",
          hostname: "api.monsite.com",
          pathname: "/upload/**",
        },
      ],
    },
    async rewrites() {
      return [
        {
          source: "/upload/:path*",
          destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/upload/:path*`,
        },
      ];
    },
  }),
};

export default nextConfig;