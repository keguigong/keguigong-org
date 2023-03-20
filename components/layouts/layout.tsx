import Link from "next/link"
import { useEffect, useState } from "react"

import styles from "./layout.module.scss"
import { Briefing } from "./briefing/briefing"
import { Header, MobileMenu } from "@/components/header"

type Props = {
  children?: JSX.Element
  home?: boolean
}

export default function Layout({ children, home }: Props) {
  const [visibility, setVisibility] = useState({ mobileMenu: false })

  return (
    <>
      <Header
        mobileMenu={visibility.mobileMenu}
        toggleMenu={(e) => setVisibility((prev) => ({ ...prev, mobileMenu: e }))}
      ></Header>
      <MobileMenu
        isOpen={visibility.mobileMenu}
        onClick={() => setVisibility((prev) => ({ ...prev, mobileMenu: !prev.mobileMenu }))}
      ></MobileMenu>
      <main className={styles.contentLayout}>
        {home && <Briefing />}
        {children}
      </main>
      <footer className={styles.footer}>
        {!home ? (
          <div className={styles.backToHome}>
            <Link href="/">← Back Home</Link>
          </div>
        ) : (
          <div />
        )}
        <div className={styles.backToHome}>
          <a href="https://github.com/keguigong">GitHub</a> •{" "}
          <a href="https://www.behance.net/keguigong">Behance</a> •{" "}
          <a href="https://www.instagram.com/keguigong/">Instagram</a>
        </div>
      </footer>
    </>
  )
}
