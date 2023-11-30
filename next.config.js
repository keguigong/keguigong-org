const path = require("path")
const rmAPIRoutes = require("./rm-api-routes")

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.js.map$/,
      enforce: "pre",
      use: ["source-map-loader"]
    })
    return config
  }
}

if (process.env.NODE_ENV === "production" && process.env.STATIC_EXPORTS === "true") {
  nextConfig.output = "export"
  rmAPIRoutes()
}

// Merge MDX config with Next.js config
module.exports = nextConfig
