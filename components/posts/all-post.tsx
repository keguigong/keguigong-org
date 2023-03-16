import { PostItem } from "./post-item"
import styles from "./post-item.module.scss"

type Props = {
  allPostsData: any
}

export const AllPosts = ({ allPostsData }: Props) => (
  <ul className={styles.list}>
    {allPostsData.map((data: any) => (
      <PostItem key={data.id} content={data}></PostItem>
    ))}
  </ul>
)
