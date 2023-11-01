import Head from "next/head"
import { md2html } from "@/utils/posts"
import Link from "next/link"

const siteTitle = "Home"
const description = "Where keguigong's thoughts were built"
const title = siteTitle + " - " + description
const md = `
# Hey there,
# I'm keguigong.
## A front-end developer (Mostly) based in Shanghai.
`

export default function About({ content }: any) {
  return (
    <>
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
      <h1>Hello Motherfucker</h1>
    </>
  )
}

export async function getStaticProps() {
  const content = md2html(md)
  return {
    props: {
      content
    }
  }
}
