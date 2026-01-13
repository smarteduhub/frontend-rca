import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const baseConfig: NextConfig = {
  reactStrictMode: false, // Disable for faster dev reloads
  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-icons",
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "recharts",
      "react-parallax-tilt",
    ],
  },
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Disable TypeScript type checking during development
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "development",
  },
  // Disable ESLint during development
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === "development",
  },
  // Add webpack optimizations for development
  webpack: (config, { isServer, dev }) => {
    if (dev) {
      // Development optimizations
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules", "**/.git", "**/.next"],
      };

      // Faster compilation
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module: { context?: string }) {
                const packageName = module.context?.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )?.[1];
                return `npm.${(packageName ?? "vendor").replace("@", "")}`;
              },
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    if (!isServer && !dev) {
      config.optimization.splitChunks = {
        chunks: "all",
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module: { context?: string }) {
              // Guard against loaders/virtual modules that do not have a context path
              const packageName =
                module.context?.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )?.[1] ?? "vendor";
              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },
      };
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/ws/:path*",
        destination: "https://smarteduhub-server.onrender.com/wss/:path*", // ✅ Proxy WebSocket traffic
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(baseConfig);
