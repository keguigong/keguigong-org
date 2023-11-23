import Link from "next/link"
import { usePathname } from "next/navigation"
import classNames from "classnames"
import { ThemeBtn } from "../theme-btn"
import styles from "./plain.module.scss"

type Props = {
  zen?: boolean
  href?: string
}

export function PlainTitleBar({ zen, href }: Props) {
  const path = usePathname()

  return (
    <div className={styles.titleBar}>
      <div className={styles.titleTextWrapper}>
        <Link href={href || "/"} className={styles.disableDefaultLink}>
          <h2 className={classNames(styles.titleText, !zen && path !== "/" && styles.inactiveTitle)}>keguigong</h2>
        </Link>{" "}
        <Link href="/work" className={styles.disableDefaultLink}>
          <h2 className={classNames(styles.titleText, path !== "/work" && styles.inactiveTitle, zen && styles.hidden)}>work</h2>
        </Link>
        <Link href="/photo" className={styles.disableDefaultLink}>
          <h2 className={classNames(styles.titleText, path !== "/photo" && styles.inactiveTitle, styles.hidden)}>photo</h2>
        </Link>
      </div>
      <ThemeBtn />
    </div>
  )
}
