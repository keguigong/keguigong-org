import Link from "next/link"

import styles from "./post.module.scss"
import { MetaInfo } from "@/components"

interface Props {
  content: any
}

export function Post({ content }: Props) {
  const { id, date, title, timeToRead, coverImage, excerpt } = content
  const cups = new Array(Math.ceil(timeToRead.minutes / 5)).fill("☕️").join("")
  const meta = {
    date,
    timeToRead: ` • ${cups} ${timeToRead.text}`,
  }

  return (
    <li className={styles.postItem}>
      <h2 className={styles.title}>
        <Link href={`/post/${id}`}>{title}</Link>
      </h2>
      <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: excerpt }}></div>
      <MetaInfo meta={meta} timetoread></MetaInfo>
    </li>
  )
}
