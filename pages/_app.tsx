import type { AppProps } from "next/app"
import { Layout } from "@/components/layouts"

import "prism-themes/themes/prism-one-dark.min.css"
import "@/styles/globals.scss"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
