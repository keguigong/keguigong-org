import Image from "next/image"
import Link from "next/link"
import styles from "./briefing.module.scss"
import { profileImg64 } from "./profile-base64"

const name = "keguigong"

export function Briefing() {
  return (
    <section className={styles.container}>
      <Image
        priority
        src={profileImg64}
        className={styles.avatar}
        height={56}
        width={56}
        alt={name}
      />
      <div className={styles.textContainer}>
        <p>
          Personal Blog of <Link href="https://github.com/keguigong">keguigong</Link>.
        </p>
        <p>Where keguigong&apos;s thoughts were built.</p>
      </div>
    </section>
  )
}
