import { Date } from "@/components/date"
import styles from "./index.module.scss"

interface Props {
  meta: any
  timetoread?: boolean
  author?: boolean
}

export function MetaInfo({ meta, timetoread, author }: Props) {
  return (
    <div className={styles.metaInfo}>
      <small className={styles.lightText}>
        <Date dateString={meta.date} />
        {timetoread && <>{meta.timeToRead}</>}
        {author && (
          <>
            <span>&nbsp;&nbsp;by&nbsp;&nbsp;</span>
            <a href={meta.author?.url}>{meta.author?.name}</a>
          </>
        )}
      </small>
    </div>
  )
}
