/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
// Allow overriding the repo/basePath via env set in CI
const configuredBase = process.env.NEXT_PUBLIC_PAGES_BASE_PATH || process.env.BASE_PATH || ''
const normalized = configuredBase.replace(/\/$/, '') // drop trailing slash if any
const repo = normalized.replace(/^\//, '') || 'compro-aircon'

module.exports = {
  output: 'export',
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : '',
  },
};