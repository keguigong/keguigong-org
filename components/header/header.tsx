import { useState, useEffect } from "react"
import classNames from "classnames"
import Link from "next/link"
import { useSelector } from "react-redux"
import { getIsBlogBody, getSecondaryTitle, getIsHome } from "@/store/header-slice"
import styles from "./header.module.scss"
import { ColorScheme } from "./color-scheme"
import { MenuBtn } from "./menu-btn"
import { BackTopBtn } from "./back-top-btn"

export const Header = () => {
  const [scrollTop, setScrollTop] = useState({ top: 0, deltaY: 0 })
  const [visibility, setVisibility] = useState({ menu: false, secondaryTitle: true })
  const isHome = useSelector(getIsHome)
  const secondaryTitle = useSelector(getSecondaryTitle)
  const isBlogBody = useSelector(getIsBlogBody)

  // Watch and calc the movement in Y-Axis
  useEffect(() => {
    const listener = () => {
      const top = document.documentElement.scrollTop || document.body.scrollTop
      const deltaY = top - scrollTop.top
      setScrollTop({ top, deltaY })
    }
    window.addEventListener("scroll", listener)

    return () => {
      window.removeEventListener("scroll", listener)
    }
  }, [scrollTop])

  // Set state according to deltaY
  useEffect(() => {
    const { top, deltaY } = scrollTop
    if (top != deltaY) {
      if (Math.abs(deltaY) >= 50) {
        if (deltaY > 0) setVisibility((prev) => ({ ...prev, secondaryTitle: true }))
        else setVisibility((prev) => ({ ...prev, secondaryTitle: false }))
      }
    }
    if (top < 100) setVisibility((prev) => ({ ...prev, secondaryTitle: false }))
  }, [scrollTop])

  // Handle menu btn click
  const handleClose = () => {
    setVisibility((prev) => ({ ...prev, menu: false }))
  }

  const handleBackToTop = () => {
    // document.body.scrollTop = document.documentElement.scrollTop = 0
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <header className={classNames(styles.header, isHome && !visibility.menu && styles.headerHome)}>
      <div className={classNames(styles.headerContent, styles.titleBarWrapper)}>
        <div className={classNames(styles.titleBar, isBlogBody && visibility.secondaryTitle && styles.alterTitle)}>
          <MenuBtn isOpen={visibility.menu} onToggle={(next) => setVisibility((prev) => ({ ...prev, menu: next }))} />
          <h3>keguigong</h3>
          <ColorScheme />
        </div>
        <div
          className={classNames(
            styles.titleBar,
            styles.secondaryTitleBar,
            isBlogBody && visibility.secondaryTitle && styles.alterTitle
          )}
        >
          <BackTopBtn onToggle={handleBackToTop} />
          <h4 className={styles.secondaryTitle}>{secondaryTitle || "Secondary Title"}</h4>
        </div>
      </div>
      <div>
        <nav className={styles.headerContent}>
          <ul className={classNames(styles.navContent, visibility.menu && styles.navContentOpen)} onClick={handleClose}>
            <br />
            <li>
              <Link className={styles.navLink} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={styles.navLink} href="/blogs">
                Blogs
              </Link>
            </li>
            <li>
              <Link className={styles.navLink} href="/plogs">
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
