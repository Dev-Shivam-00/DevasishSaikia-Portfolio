/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 768, 1024, 1280, 1536, 1920, 2560],
    // Remote Orglife assets are consumed in place — never copied into /public.
    remotePatterns: [
      { protocol: 'https', hostname: 'orglife.vercel.app', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/dpblcamaw/**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
}

export default nextConfig
