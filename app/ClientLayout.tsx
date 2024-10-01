"use client"

import { Layout } from "@/components"
import { usePathname } from "next/navigation"

import "@/styles/global.scss"

function ClientLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()

  return (
    <>
      <Layout home={path === "/"}>{children}</Layout>
    </>
  )
}

export default ClientLayout
