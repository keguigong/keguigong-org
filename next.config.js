const path = require("path")
const mdxPrism = require("mdx-prism")

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [mdxPrism]
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
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
module.exports = withMDX(nextConfig)
