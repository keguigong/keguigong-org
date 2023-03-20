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
    <>
      <div
        className={styles.contentBox}
        style={{
          background: `url(showcasecontent/${content.image}) center center no-repeat`,
          backgroundSize: "cover",
          zIndex: 0
        }}
      ></div>
      <div className={styles.mobileContent}>
        <a href={content.url} target="_blank" rel="noreferrer">
          <h1>{content.title}</h1>
        </a>
        <p>{content.description}</p>
      </div>
    </>
  )
}
