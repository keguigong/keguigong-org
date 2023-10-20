import Head from "next/head"
import { md2html } from "@/utils/posts"
import Link from "next/link"

const siteTitle = "Home"
const description = "Where keguigong's thoughts were built"
const title = siteTitle + " - " + description
const md = `
# Hey there,
# I'm keguigong.
## A front-end developer(Mostly) based in Shanghai.
### I love JavaScript, Clang, Animations, Aviation and etc.
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
      <div className="container">
        <section className="content-body markdown" dangerouslySetInnerHTML={{ __html: content }}></section>
        <div className="content-body btn-container">
          <Link href="/blogs">
            <button className="btn bold-text">
              <h3>TAKE TO BLOGS</h3>
            </button>
          </Link>
        </div>
        <style jsx>{`
          ul {
            list-style: none;
            margin-top: 0;
            padding: 0;
            display: flex;
            justify-content: center;
          }
          li {
            text-align: center;
            padding: 1rem 0.5rem;
            font-size: 1.5em;
            font-weight: bold;
          }
          a {
            color: var(--color-fg-default);
          }
        `}</style>
        <style jsx global>{`
          .container {
            background: var(--glow-primary);
            width: 100vw;
            overflow: hidden;
          }
          .content-body {
            margin: 0 auto;
            max-width: 60rem;
          }
          .markdown {
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: calc(80vh - 6rem);
            padding: 10rem 1rem 0rem 1rem;
          }
          .bold-text {
            font-size: wei;
          }
          .btn-container {
            padding: 1rem 1rem;
          }
          .btn {
            cursor: pointer;
            padding: 0.825rem 1.625rem;
            border-radius: 0.5rem;
            color: var(--color-fg-default);
            background-color: var(--color-canvas-subtle);
            border: 1px solid var(--color-border-subtle);
            transition: var(--color-transition-default);
          }
          .btn:hover {
            background-color: var(--color-canvas-default);
            border: 1px solid var(--color-border-default);
          }
          .btn h3 {
            margin: 0;
          }
          h1 {
            font-size: 3em;
          }
          h2 {
            font-size: 2em;
          }
          h3 {
            font-size: 1.5em;
          }
          h1,
          h2,
          h3 {
            margin-top: 0;
          }
          h1,
          h2,
          h3 {
            margin-bottom: 0.625em;
          }
        `}</style>
      </div>
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
