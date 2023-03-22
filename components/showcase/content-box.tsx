import Image from "next/image"
import styles from "./content-box.module.scss"

type Props = {
  contents: {
    title: string
    description: string
    image: string
    url: string
  }[]
}

export function ContentBox({ contents }: Props) {
  return (
    <div className={styles.gridContainer}>
      {contents.map((content) => (
        <div key={content.url} className={styles.contentBox}>
          <Image
            className={styles.image}
            src={`showcasecontent/${content.image}`}
            alt={`showcasecontent/${content.image}`}
            height={100}
            width={100}
          />
          <div className={styles.mobileContent}>
            <h2 className={styles.contentTitle}>
              <a className={styles.link} href={content.url} target="_blank" rel="noreferrer">
                {content.title}
              </a>
            </h2>
            <p>{content.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
