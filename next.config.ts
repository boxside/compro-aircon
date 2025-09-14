import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

// Nama repository GitHub Pages
const repo = 'compro-aircon'

const nextConfig: NextConfig = {
  output: 'export',

  // basePath hanya aktif saat production
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',

  images: { unoptimized: true },
  trailingSlash: true,

  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : '',
  },
}

export default nextConfig
