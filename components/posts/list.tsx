import { Post } from "./post"
import styles from "./list.module.scss"

interface Props {
  allPostsData: any
}

export const List = ({ allPostsData }: Props) => (
  <ul className={styles.list}>
    {allPostsData.map((data: any) => (
      <Post key={data.id} content={data}></Post>
    ))}
  </ul>
)
