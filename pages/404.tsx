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
      <h1>💦 Page Not Found</h1>
      <p>Sorry, nothing to see here.</p>
    </>
  )
}
