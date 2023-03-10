import Link from "next/link"
import styles from "./blog-list-item.module.scss"
import { Date } from "@/components"

type Props = {
  content: {
    [key: string]: any
  }
}

export function BlogListItem({ content }: Props) {
  const { id, date, title } = content

  return (
    <li className={styles.blogListItem}>
      <Link href={`/posts/${id}`}>
        <h1>{title}</h1>
      </Link>
      <small className={styles.lightText}>
        <Date dateString={date} />
      </small>
    </li>
  )
}
