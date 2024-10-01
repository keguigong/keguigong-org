import { Metadata } from "next"
import { getAllPostIds, getPostData } from "@/utils/posts"
import { MetaInfo } from "@/components"
import { env } from "@/utils/env"

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title, excerpt } = await getPostData(params.id)

  return {
    title: `${title} | ${env.SITE_NAME}`,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      url: `${env.SITE_URL}/post/${params.id}`,
      siteName: env.SITE_NAME,
      images: [
        {
          url: `${env.OG_IMAGE_URL}/api/ogimage?title=${title}&path=${env.SITE_NAME}/post/${params.id}`
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

// export const dynamicParams = false

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths
}
