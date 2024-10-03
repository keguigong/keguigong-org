import { getSortedPostsData } from "@/utils/posts"
import { List } from "@/components/posts"

export default async function Page() {
  // Fetch data directly in a Server Component
  // const recentPosts = await getPosts()
  // Forward fetched data to your Client Component
  const allPostsData = getSortedPostsData()

  return <List allPostsData={allPostsData}></List>
}
