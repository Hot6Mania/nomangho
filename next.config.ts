import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  // Only enable static export in production to avoid Turbopack dev issues.
  ...(isProd
    ? {
        output: 'export',
        images: { unoptimized: true },
      }
    : {}),
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
