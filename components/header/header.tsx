import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { getIsBlogBody, getSecondaryTitle, getIsHome } from '@/store/header-slice'
import styles from './header.module.scss'
import { BackTopBtn } from './back-top-btn'
import { GeneralTitleBar } from './title-bar'
import { Nav } from './nav'
import { useRouter } from 'next/router'

export const Header = () => {
  const [scrollTop, setScrollTop] = useState({ top: 0, deltaY: 0 })
  const [visibility, setVisibility] = useState({ menu: false, secondaryTitle: true })
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
  const handleClose = () => setVisibility((prev) => ({ ...prev, menu: false }))
  const handleBackToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const handleBackPrev = () => router.replace('/')

  return (
    <header className={classNames(styles.header, isHome && !visibility.menu && styles.headerHome)}>
      <div className={classNames(styles.headerContent, styles.titleBarWrapper)}>
        <GeneralTitleBar
          alter={isBlogBody && visibility.secondaryTitle}
          isMenuOpen={visibility.menu}
          onMenuToggle={(next) => setVisibility((prev) => ({ ...prev, menu: next }))}
        ></GeneralTitleBar>
        <div
          className={classNames(
            styles.titleBar,
            styles.secondaryTitleBar,
            isBlogBody && visibility.secondaryTitle && styles.alterTitle
          )}
        >
          <BackTopBtn left onToggle={handleBackPrev} />
          <h4 className={styles.secondaryTitle}>{secondaryTitle || 'Secondary Title'}</h4>
          <BackTopBtn onToggle={handleBackToTop} />
        </div>
      </div>
      <div className={styles.headerContent}>
        <Nav visible={visibility.menu} onClose={handleClose}></Nav>
      </div>
    </header>
  )
}
