import Image from "next/image"
import Link from "next/link"

import Date from "@/components/date"
import styles from "./post-meta.module.scss"
import { profileImg64 } from "@/components/layouts/profile-base64"

const fallbackMeta = {
  author: "keguigong",
  authorAvatar: profileImg64
}

export function PostMeta({ meta }: { [key: string]: any }) {
  meta = {
    ...fallbackMeta,
    ...meta
  }

  return (
    <div className={styles.subHeader}>
      <Date dateString={meta.date} />
      <span>&nbsp;&nbsp;by&nbsp;&nbsp;</span>
      <Link href="/">
        {meta.author}
      </Link>
    </div>
  )
}
