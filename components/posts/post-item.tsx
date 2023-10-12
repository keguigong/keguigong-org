import Link from "next/link"

import styles from "./post-item.module.scss"
import { MetaInfo } from "@/components"
import Image from "next/image"
import { Meta } from "@/types"

type Props = {
  content: any
}

export function PostItem({ content }: Props) {
  const { id, date, title, timeToRead, coverImage } = content
  const cups = new Array(Math.ceil(timeToRead.minutes / 5)).fill("☕️").join("")
  const meta: Meta = {
    date,
    suffix: ` • ${cups} ${timeToRead.text}`,
  }

  return (
    <li className={styles.postItem}>
      <Image
        className={styles.image}
        src={coverImage || '/images/og-image.svg'}
        alt={coverImage || '/images/og-image.svg'}
        width={100}
        height={100}
      ></Image>
      <h2 className={styles.link}>
        <Link href={`/posts/${id}`}>{title}</Link>
      </h2>
      <MetaInfo meta={meta}></MetaInfo>
    </li>
  )
}
