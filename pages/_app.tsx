import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wrapper } from '@/store/store'
import {
  setIsHome,
  setIsBlogBody,
  setSecondaryTitle,
  setRouteChangeStart,
  getRouteChangeStart
} from '@/store/header-slice'
import { Layout } from '@/components/layouts'
import '@/styles/index.scss'
import { PageLoading } from '@/components'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const dispatch = useDispatch()
  const routeChangeStart = useSelector(getRouteChangeStart)

  // Identify home and post page
  useEffect(() => {
    const path = router.asPath
    if (path === '/') {
      dispatch(setIsHome(true))
    } else {
      dispatch(setIsHome(false))
    }

    if (path.match(/^\/post\/.*/i)) {
      dispatch(setIsBlogBody(true))
    } else {
      dispatch(setIsBlogBody(false))
      dispatch(setSecondaryTitle(''))
    }
  }, [router.asPath])

  // Listen route change
  const routerChangeStartListener = useCallback(() => {
    dispatch(setRouteChangeStart(true))
    console.log('start')
  }, [])
  const routerChangeCompleteListener = useCallback(() => {
    dispatch(setRouteChangeStart(false))
    console.log('complete')
  }, [])

  useEffect(() => {
    router.events.on('routeChangeStart', routerChangeStartListener)
    router.events.on('routeChangeComplete', routerChangeCompleteListener)
    router.events.on('routeChangeError', routerChangeCompleteListener)
    return () => {
      router.events.off('routeChangeStart', routerChangeStartListener)
      router.events.off('routeChangeComplete', routerChangeCompleteListener)
      router.events.off('routeChangeError', routerChangeCompleteListener)
    }
  }, [routerChangeStartListener, routerChangeCompleteListener])

  return (
    <>
      <Layout home={router.asPath === '/'}>
        <Component {...pageProps} />
      </Layout>
      <PageLoading visible={routeChangeStart}></PageLoading>
    </>
  )
}

export default wrapper.withRedux(App)
