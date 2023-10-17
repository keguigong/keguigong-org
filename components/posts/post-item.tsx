import Link from "next/link"

import styles from "./post-item.module.scss"
import { MetaInfo } from "@/components"
import { Meta } from "@/types"

type Props = {
  content: any
}

export function PostItem({ content }: Props) {
  const { id, date, title, timeToRead, coverImage, excerpt } = content
  const cups = new Array(Math.ceil(timeToRead.minutes / 5)).fill("☕️").join("")
  const meta: Meta = {
    date,
    suffix: ` • ${cups} ${timeToRead.text}`
  }

  return (
    <li className={styles.postItem}>
      <h2 className={styles.title}>
        <Link href={`/posts/${id}`}>{title}</Link>
      </h2>
      <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: excerpt }}></div>
      <MetaInfo meta={meta}></MetaInfo>
    </li>
  )
}
