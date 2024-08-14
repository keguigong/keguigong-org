"use client"

import { Layout } from "@/components"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useSetAtom } from "jotai"
import { isBlogBodyAtom, isHomeAtom } from "@/utils/hooks"

import "@/styles/global.scss"

function ClientLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const setIsHome = useSetAtom(isHomeAtom)
  const setIsBlogBody = useSetAtom(isBlogBodyAtom)

  useEffect(() => {
    setIsHome(path === "/")
    setIsBlogBody(/^\/post\/.*/i.test(path))
  }, [path])

  return (
    <>
      <Layout home={path === "/"}>{children}</Layout>
      {/* <PageLoading visible={false}></PageLoading> */}
    </>
  )
}

export default ClientLayout
