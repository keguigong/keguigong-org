import { Layout } from "@/components/layouts"
import { Header } from "@/components/header"
import { cat } from "./cat"
// These styles apply to every route in the application
import "./global.scss"
import { Suspense } from "react"
import { Loading } from "@/components/loading"

export const metadata = {
  title: "keguigong's blog",
  description: "Where keguigong's thoughts were built.",
  openGraph: {
    title: "keguigong's blog",
    description: "Where keguigong's thoughts were built.",
    url: "https://keguigong.org",
    siteName: "Welcome to my homepage",
  },
  twitter: {
    card: "summary_large_image",
    site: "@keguigong",
    creator: "@keguigong",
  },
  metadataBase: new URL("https://keguigong.org"),
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-color-mode="auto" data-light-theme="light" data-dark-theme="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${cat.toString()})();`,
          }}
        />
      </head>

      <body className="m-auto max-w-3xl dark:text-gray-100">
        <Header />
        <Suspense fallback={<Loading />}>
          <Layout>{children}</Layout>
        </Suspense>
      </body>
    </html>
  )
}
