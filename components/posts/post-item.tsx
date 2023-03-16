import Link from "next/link"

import styles from "./post-item.module.scss"
import { Date } from "@/components"

type Props = {
  content: {
    [key: string]: any
  }
}

export function PostItem({ content }: Props) {
  const { id, date, title, timeToRead } = content
  const cups = new Array(Math.ceil(timeToRead.minutes / 5)).fill("☕️").join("")

  return (
    <li className={styles.postItem}>
      <Link href={`/posts/${id}`}>
        <h2>{title}</h2>
      </Link>
      <small className={styles.lightText}>
        <Date dateString={date} /> • {cups} {timeToRead.text}
      </small>
    </li>
  )
}
