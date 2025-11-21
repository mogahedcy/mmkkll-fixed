/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: 'res.cloudinary.com' },
      { hostname: '**.cloudinary.com' }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  redirects: async () => [
    { source: '/mzallat', destination: '/services/mazallat', permanent: true },
    { source: '/pergola', destination: '/services/pergolas', permanent: true },
    { source: '/satr', destination: '/services/sawater', permanent: true },
  ],

  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
      ],
    },
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
      ],
    },
    {
      source: '/images/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        default: false,
        vendors: false,
        vendor: {
          filename: 'vendors/[name].js',
          chunks: 'all',
          test: /node_modules/,
          priority: 20
        },
        common: {
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true,
          filename: 'common/[name].js'
        }
      };
    }
    return config;
  }
};

module.exports = nextConfig;
