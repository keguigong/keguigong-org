import Head from "next/head"
import { ContentBox } from "@/components/showcase"
import content from "@/components/showcase/content.json"

const siteTitle = "Showcase."
const description = "Where keguigong's thoughts were built"
const title = siteTitle + " - " + description

export default function Home() {
  return (
    <section>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            description
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {content.map((content) => (
        <ContentBox key={content.url} content={content} />
      ))}
    </section>
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}
