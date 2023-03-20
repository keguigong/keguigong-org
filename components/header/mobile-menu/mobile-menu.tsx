import Link from "next/link"
import { useRouter } from "next/router"
import classNames from "classnames"

import styles from "./mobile-menu.module.scss"
import navList from "../nav.json"

type Props = {
  isOpen: boolean
  onClick?: () => void
}

const isProd = process.env.NODE_ENV === "production"

export const MobileMenu = ({ isOpen, onClick }: Props) => {
  const router = useRouter()

  const handleClick = () => {
    onClick?.call(null)
  }

  return (
    <div className={classNames(styles.mobileMenuWrapper, isOpen && styles.show)}>
      <div className={styles.mobileMenu}>
        {(isProd ? navList.slice(0, -1) : navList).map((link) => (
          <Link
            className={classNames(
              styles.link,
              router.pathname === link.pathname && styles.activeLink
            )}
            key={link.pathname}
            href={link.pathname}
            onClick={handleClick}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
