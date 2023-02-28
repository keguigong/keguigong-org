import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import styles from "./layout.module.scss"
import { DayNight } from "../animated-day-night"
import { PersonalBriefing } from "."

const links = [
  {
    title: "Blog.",
    pathname: "/"
  },
  {
    title: "Showcase.",
    pathname: "/showcase"
  }
]

export default function Layout({ children, home, meta }: { [key: string]: any }) {
  const router = useRouter()
  const [activeTitle, setTitle] = useState(0)

  useEffect(() => {
    const index = links.map((e) => e.pathname).indexOf(router.pathname)
    if (index >= 0) {
      setTitle(index)
    }
  }, [router])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.headerTitle}>
          {links.map((link, index) => (
            <>
              <Link
                key={link.pathname}
                className={index === activeTitle ? styles.activeLink : ""}
                href={link.pathname}
              >
                {link.title}
              </Link>{" "}
            </>
          ))}
        </h2>
        <DayNight />
      </header>
      {home && <PersonalBriefing />}
      <main>{children}</main>
      <div className={styles.footer}>
        {!home ? (
          <div className={styles.backToHome}>
            <Link href="/">← Back Home</Link>
          </div>
        ) : (
          <div />
        )}
        <p className={styles.backToHome}>
          <a href="https://github.com/keguigong">GitHub</a> •{" "}
          <a href="https://www.behance.net/keguigong">Behance</a> •{" "}
          <a href="https://www.instagram.com/keguigong/">Instagram</a>
        </p>
      </div>
    </div>
  )
}
