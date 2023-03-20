import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import classNames from "classnames"

import styles from "./header.module.scss"
import navList from "./nav.json"
import { ColorScheme } from "./color-scheme"
import { MenuBtn } from "./menu-btn/menu-btn"

type Props = {
  mobileMenu: boolean
  toggleMenu?: (e: boolean) => void
}

export const Header = ({ mobileMenu, toggleMenu }: Props) => {
  const router = useRouter()
  const [pathname, setPathname] = useState("Blog.")

  useEffect(() => {
    const index = navList.map((nav) => nav.pathname).indexOf(router.pathname)
    const pathname = index < 0 ? "Blog." : navList[index].title
    setPathname(pathname)
  }, [router.pathname])

  const [scrollTop, setScrollTop] = useState({ top: 0, delta: 0 })
  const [visibility, setVisibility] = useState({ mobileMenu: false, header: true })

  useEffect(() => {
    setVisibility((prev) => ({ ...prev, mobileMenu: mobileMenu }))
  }, [mobileMenu])

  // useEffect(() => {
  //   const cb = () => {
  //     const top = document.documentElement.scrollTop || document.body.scrollTop
  //     const delta = top - scrollTop.top
  //     setScrollTop({ top, delta })
  //   }
  //   window.addEventListener("scroll", cb)

  //   return () => {
  //     window.removeEventListener("scroll", cb)
  //   }
  // }, [scrollTop])

  // useEffect(() => {
  //   const delta = scrollTop.delta
  //   if (Math.abs(delta) >= 10) {
  //     if (delta > 0) setVisibility((prev) => ({ ...prev, header: false }))
  //     else setVisibility((prev) => ({ ...prev, header: true }))
  //   }

  //   const top = scrollTop.top
  //   if (top < 10) setVisibility((prev) => ({ ...prev, header: true }))
  // }, [scrollTop])

  const toggleMobileMenu = () => {
    toggleMenu?.call(null, !visibility.mobileMenu)
    setVisibility((prev) => ({ ...prev, mobileMenu: !prev.mobileMenu }))
  }

  return (
    <header className={classNames(styles.header, !visibility.header && styles.hideHeader)}>
      <div className={styles.headerWrapper}>
        <nav className={styles.navBar}>
          {/* Mobile menu */}
          <div
            className={classNames(styles.mobileHeaderTitle, styles.mobile)}
            onClick={toggleMobileMenu}
          >
            <MenuBtn isOpen={visibility.mobileMenu} />
            <h1>{pathname}</h1>
          </div>

          {/* Desktop links */}
          {/* <div className={classNames(styles.links, styles.desktop)}>
            {navList.map((link) => (
              <h4 key={link.pathname}>
                <Link
                  className={classNames(
                    styles.link,
                    router.pathname === link.pathname && styles.activeLink
                  )}
                  key={link.pathname}
                  href={link.pathname}
                >
                  {link.title}
                </Link>
              </h4>
            ))}
          </div> */}

          {/* Change color scheme */}
          <div>
            <ColorScheme />
          </div>
        </nav>
      </div>
    </header>
  )
}
