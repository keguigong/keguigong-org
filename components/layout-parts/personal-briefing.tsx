import Image from "next/image"
import Link from "next/link"
import utilStyles from "@/styles/utils.module.css"
import styles from "./personal-briefing.module.scss"
import { profileImg64 } from "./profile-base64"

const name = "keguigong"

export default function PersonalBriefing() {
  return (
    <div className={styles.container}>
      <Image
        priority
        src={profileImg64}
        className={utilStyles.borderCircle}
        height={56}
        width={56}
        alt={name}
      />
      <div className={styles.textContainer}>
        <p>
          Personal Blog of <Link href="/">keguigong</Link>.
        </p>
        <p>Where keguigong&apos;s thoughts were built.</p>
      </div>
    </div>
  )
}
