import Image from "next/image"
import styles from "./content-box.module.scss"

type Props = {
  content: {
    title: string
    description: string
    image: string
    url: string
  }
}

export function ContentBox({ content }: Props) {
  return (
    <div className={styles.contentBox}>
      <Image
        className={styles.image}
        src={`showcasecontent/${content.image}`}
        alt={`showcasecontent/${content.image}`}
        height={100}
        width={100}
      />
      <div className={styles.mobileContent}>
        <a href={content.url} target="_blank" rel="noreferrer">
          <h1>{content.title}</h1>
        </a>
        <p>{content.description}</p>
      </div>
    </div>
  )
}
