import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const configuredBase = process.env.NEXT_PUBLIC_PAGES_BASE_PATH || process.env.BASE_PATH || "";
const normalized = configuredBase.replace(/\/$/, "");
const repo = normalized.replace(/^\//, "") || "compro-aircon";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : "",
  },
};

export default nextConfig;
