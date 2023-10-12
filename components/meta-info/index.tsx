import Link from "next/link"

import { Date } from "@/components/date"
import styles from "./meta-info.module.scss"
import { useRouter } from "next/router"
import { Meta } from "@/types"

const fallbackMeta = {
  author: "keguigong",
}

type Props = {
  meta: Meta
}

export function MetaInfo({ meta }: Props) {
  const router = useRouter()

  meta = {
    ...fallbackMeta,
    ...meta
  }

  return (
    <div className={styles.metaInfo}>
      <small className={styles.lightText}>
        <Date dateString={meta.date} />
        {meta.suffix
          ? <>{meta.suffix}</>
          : <>
            <span>&nbsp;&nbsp;by&nbsp;&nbsp;</span>
            <Link href={router.asPath}>
              {meta.author}
            </Link>
          </>
        }
      </small>
    </div>
  )
}
