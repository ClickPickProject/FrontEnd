/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
