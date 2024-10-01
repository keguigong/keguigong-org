import { Metadata } from "next"
import { getSortedPostsData } from "@/utils/posts"
import { List } from "@/components/posts"
import { env } from "@/utils/env"

const title = "Blog"
const description = "将我的一些思考和学习笔记记录在这儿"

export const metadata: Metadata = {
  title: `${title} | ${env.SITE_NAME}`,
  description,
  openGraph: {
    title,
    description,
    url: `${env.SITE_URL}`,
    siteName: env.SITE_NAME,
    images: [
      {
        url: `${env.OG_IMAGE_URL}/api/ogimage?title=${title}&path=${env.SITE_NAME}`
      }
    ]
  }
}

export default async function Page() {
  // Fetch data directly in a Server Component
  // const recentPosts = await getPosts()
  // Forward fetched data to your Client Component
  const allPostsData = getSortedPostsData()

  return <List allPostsData={allPostsData}></List>
}
