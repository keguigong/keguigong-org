"use client"

import { Layout } from "@/components"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PageLoading } from "@/components"
import {
  setIsHome,
  setIsBlogBody,
  setSecondaryTitle,
  setRouteChangeStart,
  getRouteChangeStart
} from "@/store/header-slice"

import "@/styles/global.scss"

function ClientLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  // const router = useRouter()
  const routeChangeStart = useSelector(getRouteChangeStart)
  const dispatch = useDispatch()

  // Identify home and post page
  useEffect(() => {
    if (path === "/") {
      dispatch(setIsHome(true))
    } else {
      dispatch(setIsHome(false))
    }

    if (path.match(/^\/post\/.*/i)) {
      dispatch(setIsBlogBody(true))
    } else {
      dispatch(setIsBlogBody(false))
      dispatch(setSecondaryTitle(""))
    }
  }, [path, dispatch])

  // Listen route change
  const routerChangeStartListener = useCallback(() => {
    dispatch(setRouteChangeStart(true))
    // console.log('---route change start---')
  }, [])
  const routerChangeCompleteListener = useCallback(() => {
    dispatch(setRouteChangeStart(false))
    // console.log('---route change complete---')
  }, [])

  // useEffect(() => {
  //   router.events.on("routeChangeStart", routerChangeStartListener)
  //   router.events.on("routeChangeComplete", routerChangeCompleteListener)
  //   router.events.on("routeChangeError", routerChangeCompleteListener)
  //   return () => {
  //     router.events.off("routeChangeStart", routerChangeStartListener)
  //     router.events.off("routeChangeComplete", routerChangeCompleteListener)
  //     router.events.off("routeChangeError", routerChangeCompleteListener)
  //   }
  // }, [])

  return (
    <>
      <Layout home={path === "/"}>{children}</Layout>
      <PageLoading visible={routeChangeStart}></PageLoading>
    </>
  )
}

export default ClientLayout
