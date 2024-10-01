import Link from "next/link"
import { Header } from "@/components/header"

import styles from "./index.module.scss"

interface Props {
  children?: React.ReactNode
  home?: boolean
}

export function Layout({ children, home }: Props) {
  return (
    <>
      <Header />
      <main className={styles.contentLayout}>{children}</main>
      <footer className={styles.footer}>
        {!home ? (
          <div className={styles.backToHome}>
            <Link href="/">← Back</Link>
          </div>
        ) : (
          <div>
            With <a href="https://www.nextjs.org/">Next.js</a>.
          </div>
        )}
        <div className={styles.backToHome}>
          <a href="https://github.com/keguigong">GitHub</a> • <a href="https://www.behance.net/keguigong">Behance</a> •{" "}
          <a href="https://www.instagram.com/keguigong/">Instagram</a>
        </div>
      </footer>
    </>
  )
}
