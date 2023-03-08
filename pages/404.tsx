import Head from "next/head"

const siteTitle = "404"
const description = "Where keguigong's thoughts were built"
const title = siteTitle + " - " + description

export default function NotFound() {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>404 Page Not Found</h1>
      <p>Sorry, there is nothing to see here.</p>
    </>
  )
}
