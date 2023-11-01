import { PostItem } from './post-item'
import styles from './blog-list.module.scss'

type Props = {
  allPostsData: any
}

export const BlogList = ({ allPostsData }: Props) => (
  <ul className={styles.list}>
    {allPostsData.map((data: any) => (
      <PostItem key={data.id} content={data}></PostItem>
    ))}
  </ul>
)
