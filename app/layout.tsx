import ClientLayout from "./ClientLayout"
import type { Metadata } from "next"

import { env } from "@/utils/env"

// These styles apply to every route in the application
import "./global.scss"

const title = "Welcome to keguigong's homepage"
const description = "Where keguigong's thoughts were built."

export const metadata: Metadata = {
  metadataBase: new URL(env.OG_IMAGE_URL || "/"),
  title: `${title} | ${env.SITE_NAME}`,
  description,
  openGraph: {
    title,
    description,
    url: `${env.SITE_URL}`,
    siteName: env.SITE_NAME,
    images: [
      {
        url: `${env.OG_IMAGE_URL}/api/ogimage?title=${description}&path=${env.SITE_NAME}`
      }
    ],
    type: "website"
  }
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-color-mode="auto" data-light-theme="light" data-dark-theme="dark">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
