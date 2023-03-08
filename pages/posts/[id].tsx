import Head from "next/head"

import { getAllPostIds, getPostData } from "@/utils/posts"
import Layout from "@/components/layouts/layout"
import { PostMeta } from "@/components/layouts"

const description = "Where keguigong's thoughts were built"

export default function Post({ postData }: { [key: string]: any }) {
  const title = postData.title + " - " + description

  return (
    <main>
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
        <meta name="og:title" content={postData.id} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <h1>{postData.title}</h1>
      <PostMeta meta={postData} />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
    </main>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: { [key: string]: any }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
