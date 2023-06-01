import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { Layout } from "@/components/layouts"

import "prism-themes/themes/prism-dracula.min.css"
import "@/styles/globals.scss"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <Layout home={"/" === router.pathname}>
      <Component {...pageProps} />
    </Layout>
  )
}
