"use client"

import { useState, useEffect } from "react"
import classNames from "classnames"
import { usePathname } from "next/navigation"
import { TitleBar } from "./title-bar"
import styles from "./index.module.scss"

export const Header = () => {
  const [scrollTop, setScrollTop] = useState({ top: 0, deltaY: 0 })
  const path = usePathname()

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

  return (
    <header className={styles.header}>
      <div className={classNames(styles.headerContent, styles.titleBarWrapper)}>
        <TitleBar zen={["/", "/work", "/photo"].indexOf(path) === -1}></TitleBar>
      </div>
    </header>
  )
}
