import { Metadata } from "next"
import { getAllPostIds, getPostData } from "@/utils/posts"
import { MetaInfo } from "@/components"
import { description } from "@/package.json"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const postData: any = await getPostData(params.id)

  return {
    title: `${postData.title} -  ${description} - 可圭共`,
    description: postData.excerpt || description,
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      url: "/",
      siteName: "keguigong.org",
      images: [
        {
          url: `/opengraph?title=${postData.title}&description=${postData.excerpt}`
        }
      ],
      type: "website"
    }
  }
}

export default async function Post({ params }: Props) {
  const postData: any = await getPostData(params.id)

  return (
    <div data-markdown-body>
      <h1 id="markdown-title">{postData.title}</h1>
      <MetaInfo meta={postData} author />
      <article dangerouslySetInnerHTML={{ __html: postData.contentHtml!! }}></article>
    </div>
  )
}

export const dynamicParams = false

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths
}
