import type { AppProps } from "next/app"
import { Layout } from "@/components/layouts"

import "@/styles/index.scss"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <Layout home={router.asPath === "/"}>
      <Component {...pageProps} />
    </Layout>
  )
}
