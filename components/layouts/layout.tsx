import Link from "next/link"
import { useState } from "react"

import styles from "./layout.module.scss"
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
        {children}
      </main>
      <footer className={styles.footer}>
        {!home ? (
          <div className={styles.backToHome}>
            <Link href="/">← Back Home</Link>
          </div>
        ) : (
          <div>
            With <a href="https://www.nextjs.org/">Next.js</a>.
          </div>
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
