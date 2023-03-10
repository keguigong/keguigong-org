import Link from "next/link"
import Head from "next/head"

import { getSortedPostsData } from "@/utils/posts"
import Date from "../components/date"
import utilStyles from "@/styles/utils.module.css"
import { BlogListItem } from "@/components/blogs"

const siteTitle = "Blog."
const description = "Where keguigong's thoughts were built"
const title = siteTitle + " - " + description

export default function Home({ allPostsData }: { [key: string]: any }) {
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
      <ul className={utilStyles.list}>
        {allPostsData.map((data: any) => (
          <BlogListItem key={data.id} content={data}></BlogListItem>
        ))}
      </ul>
    </section>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
