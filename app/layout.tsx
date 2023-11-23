import ClientLayout from "./ClientLayout"
import CustomProvider from "./CustomProvider"
import { description } from "@/package.json"

const baseUrl = process.env.NODE_ENV === "production" ? "https://apis.keguigong.org" : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: "Welcome to keguigong's homepage",
  description,
  openGraph: {
    title: "Personal blog by keguiong",
    description,
    url: "/",
    siteName: "keguigong.org",
    images: [
      {
        url: `/opengraph?title=${description}`
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
