import Head from "next/head"
import { getAllPostIds, getPostData } from "@/utils/posts"
import Date from "@/components/date"
import Layout from "@/components/layout"

export default function Post({ postData }: { [key: string]: any }) {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <main>
        <h1>{postData.title}</h1>
        <br />
        {/* Replace {postData.date} with this */}
        <Date dateString={postData.date} />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </main>
    </Layout>
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
