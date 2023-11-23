const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  output: "export",
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  // Read more: https://nextjs.org/docs/messages/export-image-api
  images: {
    unoptimized: true
  },
  // Read more: https://nextjs.org/docs/basic-features/built-in-css-support#customizing-sass-options
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  // Read more: https://nextjs.org/docs/advanced-features/compiler#styled-components
  compiler: {
    styledComponents: {
      ssr: true
    }
  }
}

// Merge MDX config with Next.js config
module.exports = nextConfig
