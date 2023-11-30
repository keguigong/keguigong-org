import { env } from "@/utils/env"
import ClientLayout from "./ClientLayout"
import CustomProvider from "./CustomProvider"
import { URL } from "url"

const title = "Welcome to keguigong's homepage"
const description = "Where keguigong's thoughts were built."

console.log("layout.tsx OG_IMAGE_URL: ", env.OG_IMAGE_URL, new URL(env.OG_IMAGE_URL!))

export const metadata = {
  title: `${title} | ${env.SITE_NAME}`,
  description,
  openGraph: {
    title,
    description,
    url: `${env.SITE_URL}`,
    siteName: env.SITE_NAME,
    images: [
      {
        url: `${env.OG_IMAGE_URL}/ogimage?title=${description}&path=${env.SITE_NAME}`
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
        <CustomProvider>
          <ClientLayout>{children}</ClientLayout>
        </CustomProvider>
      </body>
    </html>
  )
}
