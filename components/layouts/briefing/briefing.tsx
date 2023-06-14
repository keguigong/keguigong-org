import Image from "next/image"
import Link from "next/link"
import styles from "./briefing.module.scss"

const name = "keguigong"

export function Briefing() {
  return (
    <section className={styles.container}>
      <div className={styles.textContainer}>
        <p>
          Writings of <Link href="https://github.com/keguigong">keguigong</Link>.
        </p>
        <p>Where keguigong&apos;s thoughts were built.</p>
      </div>
    </section>
  )
}
