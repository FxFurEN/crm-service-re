/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login', 
        permanent: true,
        basePath: false
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig;
