/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
  reactStrictMode: true,
  // Read more: https://nextjs.org/docs/messages/export-image-api
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
