import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { Layout } from "@/components/layouts"

// Global styles
import "@/styles/globals.scss"
// Import Prism code highlight styles
import "prism-themes/themes/prism-one-dark.min.css"
// import "prismjs/plugins/line-numbers/prism-line-numbers.min.css"
// Custom styles
import "@/styles/now-styles.scss"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <Layout home={"/" === router.pathname}>
      <Component {...pageProps} />
    </Layout>
  )
}
