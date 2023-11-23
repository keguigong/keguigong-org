import { useState, useEffect } from "react"
import classNames from "classnames"
import { GeneralTitleBar, PlainTitleBar } from "./title-bar"
import { Nav } from "./nav"
import styles from "./header.module.scss"
import { usePathname } from "next/navigation"

export const Header = () => {
  const [scrollTop, setScrollTop] = useState({ top: 0, deltaY: 0 })
  const [visibility, setVisibility] = useState({ menu: false, backtop: true })
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

  // Set state according to deltaY
  // useEffect(() => {
  //   const { top, deltaY } = scrollTop
  //   if (top != deltaY) {
  //     if (Math.abs(deltaY) >= 50) {
  //       if (deltaY > 0) setVisibility((prev) => ({ ...prev, backtop: true }))
  //       else setVisibility((prev) => ({ ...prev, backtop: false }))
  //     }
  //   }
  //   if (top < 100) setVisibility((prev) => ({ ...prev, backtop: false }))
  // }, [scrollTop])

  // Handle menu btn click
  const handleClose = () => setVisibility((prev) => ({ ...prev, menu: false }))
  const handleBackToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  // const windowRef = useRef<Window | null>(null)
  // useEffect(() => {
  //   windowRef.current = window
  // }, [])

  return (
    <>
      {/* static header */}
      <header className={styles.header}>
        <div className={classNames(styles.headerContent, styles.titleBarWrapper)}>
          <PlainTitleBar zen={["/", "/work", "/photo"].indexOf(path) === -1}></PlainTitleBar>
        </div>
      </header>
      {/* fixed header */}
      <div className={classNames(styles.header, styles.fixedHeader, !visibility.menu && styles.hideHeader)}>
        <div className={classNames(styles.headerContent, styles.titleBarWrapper)}>
          <GeneralTitleBar
            isMenuOpen={visibility.menu}
            onMenuToggle={(next) => setVisibility((prev) => ({ ...prev, menu: next }))}
          ></GeneralTitleBar>
        </div>
        <div className={styles.headerContent}>
          <Nav visible={visibility.menu} onClose={handleClose}></Nav>
        </div>
      </div>
    </>
  )
}
