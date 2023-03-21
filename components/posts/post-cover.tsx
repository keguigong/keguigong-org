import Image from "next/image"
import styles from "./post-cover.module.scss"

type Props = {
  coverImage: string
}

export default function PostCover({ coverImage }: Props) {
  return (
    <>
      {coverImage ? (
        <div className={styles.container}>
          <Image
            className={styles.coverImage}
            src={coverImage}
            alt={coverImage}
            width={100}
            height={100}
          ></Image>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
