import Link from "next/link"

import styles from "./post-item.module.scss"
import { Date } from "@/components"
import Image from "next/image"

type Props = {
  content: {
    [key: string]: any
  }
}

export function PostItem({ content }: Props) {
  const { id, date, title, timeToRead, coverImage } = content
  const cups = new Array(Math.ceil(timeToRead.minutes / 5)).fill("☕️").join("")

  return (
    <li className={styles.postItem}>
      <Image
        className={styles.image}
        src={coverImage || "images/cover.webp"}
        alt={coverImage || "images/cover.webp"}
        width={100}
        height={100}
      ></Image>
      <h2 className={styles.link}>
        <Link href={`/posts/${id}`}>{title}</Link>
      </h2>
      <small className={styles.lightText}>
        <Date dateString={date} /> • {cups} {timeToRead.text}
      </small>
    </li>
  )
}
