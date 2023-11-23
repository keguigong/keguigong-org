import { Metadata } from "next"
import { description } from "@/package.json"
import { getSortedPostsData } from "@/utils/posts"
import { BlogList } from "@/components/posts"

export const metadata: Metadata = {
  title: `Blog - ${description} - 可圭共`,
  description: "将我的一些思考和学习笔记记录在这儿"
}

export default async function Page() {
  // Fetch data directly in a Server Component
  // const recentPosts = await getPosts()
  // Forward fetched data to your Client Component
  const allPostsData = getSortedPostsData()

  return <BlogList allPostsData={allPostsData}></BlogList>
}
