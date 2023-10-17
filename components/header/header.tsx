import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import classNames from "classnames"
import Link from "next/link"

import styles from "./header.module.scss"
import { ColorScheme } from "./color-scheme"
import { MenuBtn } from "./menu-btn/menu-btn"

export const Header = () => {
  const [scrollTop, setScrollTop] = useState({ top: 0, deltaY: 0 })
  const [visibility, setVisibility] = useState({ menu: false, header: true })

  // useEffect(() => {
  //   const listener = () => {
  //     const top = document.documentElement.scrollTop || document.body.scrollTop
  //     const deltaY = top - scrollTop.top
  //     setScrollTop({ top, deltaY })
  //   }
  //   window.addEventListener("scroll", listener)

  //   return () => {
  //     window.removeEventListener("scroll", listener)
  //   }
  // }, [scrollTop])

  // useEffect(() => {
  //   const deltaY = scrollTop.deltaY
  //   if (Math.abs(deltaY) >= 10) {
  //     if (deltaY > 0) setVisibility((prev) => ({ ...prev, header: false }))
  //     else setVisibility((prev) => ({ ...prev, header: true }))
  //   }

  //   const top = scrollTop.top
  //   if (top < 10) setVisibility((prev) => ({ ...prev, header: true }))
  // }, [scrollTop])

  const handleClose = () => {
    setVisibility((prev) => ({ ...prev, menu: false }))
  }

  return (
    <header className={classNames(styles.header)}>
      <div className={styles.headerContent}>
        <div className={styles.titleBar}>
          <MenuBtn isOpen={visibility.menu} onToggle={(next) => setVisibility((prev) => ({ ...prev, menu: next }))} />
          <h3>keguigong</h3>
          <ColorScheme />
        </div>
      </div>
      <div>
        <nav className={styles.headerContent}>
          <ul className={classNames(styles.navContent, visibility.menu && styles.navContentOpen)} onClick={handleClose}>
            <li>
              <Link className={styles.navLink} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={styles.navLink} href="/plog">
                Plogs
              </Link>
            </li>
            <li>
              <Link className={styles.navLink} href="/works">
                Works
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
