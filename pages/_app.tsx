import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { wrapper } from "@/store/store"
import { setIsHome, setIsBlogBody, setSecondaryTitle } from "@/store/header-slice"
import { Layout } from "@/components/layouts"
import "@/styles/index.scss"
import { useEffect } from "react"

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    const path = router.asPath
    if (path === "/") {
      dispatch(setIsHome(true))
      dispatch(setIsBlogBody(false))
      dispatch(setSecondaryTitle(false))
      return
    }

    if (path.match(/^\/posts\/.*/i)) {
      dispatch(setIsHome(false))
      dispatch(setIsBlogBody(true))
      return
    }

    dispatch(setIsHome(false))
    dispatch(setIsBlogBody(false))
  }, [router.asPath])

  return (
    <Layout home={router.asPath === "/"}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default wrapper.withRedux(App)
