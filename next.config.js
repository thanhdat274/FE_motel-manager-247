/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Introduce',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
