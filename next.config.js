const path = require("path")
const createMDX = require("@next/mdx")

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  // Read more: https://nextjs.org/docs/messages/export-image-api
  images: {
    unoptimized: true
  },
  output: "export",
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
  },
  sassOptions: {
    logger: {
      warn: function (message) {
        console.warn(message)
      },
      debug: function (message) {
        console.log(message)
      }
    }
  }
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig)
