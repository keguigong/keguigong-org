import Link from "next/link"
import { usePathname } from "next/navigation"
import classNames from "classnames"
import { ThemeBtn } from "../theme-btn"
import styles from "./index.module.scss"

interface Props {
  zen?: boolean
  href?: string
}

export function TitleBar({ zen, href }: Props) {
  const path = usePathname()

  return (
    <div className={styles.titleBar}>
      <div className={styles.titleTextWrapper}>
        <Link href={href || "/"} className={styles.disableDefaultLink}>
          <h2 className={classNames(styles.titleText, !zen && path !== "/" && styles.inactiveTitle)}>keguigong</h2>
        </Link>{" "}
      </div>
      <ThemeBtn />
    </div>
  )
}
