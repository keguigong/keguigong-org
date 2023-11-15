import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { getIsBlogBody, getSecondaryTitle, getIsHome } from '@/store/header-slice'
import { GeneralTitleBar, PlainTitleBar } from './title-bar'
import { Nav } from './nav'
import styles from './header.module.scss'

export const Header = () => {
  const [scrollTop, setScrollTop] = useState({ top: 0, deltaY: 0 })
  const [visibility, setVisibility] = useState({ menu: false, backtop: true })
  const isHome = useSelector(getIsHome)
  const secondaryTitle = useSelector(getSecondaryTitle)
  const isBlogBody = useSelector(getIsBlogBody)
  const router = useRouter()

  // Watch and calc the movement in Y-Axis
  useEffect(() => {
    const listener = () => {
      const top = document.documentElement.scrollTop || document.body.scrollTop
      const deltaY = top - scrollTop.top
      setScrollTop({ top, deltaY })
    }
    window.addEventListener('scroll', listener)

    return () => {
      window.removeEventListener('scroll', listener)
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
  const handleBackToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  // const windowRef = useRef<Window | null>(null)
  // useEffect(() => {
  //   windowRef.current = window
  // }, [])

  return (
    <>
      {/* static header */}
      <header className={styles.header}>
        <div className={classNames(styles.headerContent, styles.titleBarWrapper)}>
          <PlainTitleBar zen={isBlogBody}></PlainTitleBar>
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
