import Image from "next/image"
import Link from "next/link"

import Date from "@/components/date"
import utilStyles from "@/styles/utils.module.css"

const fallbackMeta = {
  author: "keguigong",
  authorAvatar: "/images/profile.jpg"
}

export default function PostMeta({ meta }: { [key: string]: any }) {
  meta = {
    ...fallbackMeta,
    ...meta
  }

  return (
    <div className={utilStyles.subHeader}>
      <Date dateString={meta.date} />
      {meta.author ? (
        <div className={utilStyles.avatarContainer}>
          <Image
            priority
            src={meta.authorAvatar}
            className={utilStyles.borderCircle}
            height={24}
            width={24}
            alt={meta.authorAvatar}
          />
          <Link href="/">{meta.author}</Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
