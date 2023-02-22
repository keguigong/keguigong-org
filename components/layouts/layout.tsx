import Head from "next/head"
import Link from "next/link"
import styles from "./layout.module.scss"
import { DayNight } from "../animated-day-night"
import { PersonalBriefing } from "."

const siteTitle = "Blog."
const description = "Where keguigong's thoughts were built"

export default function Layout({ children, home, meta }: { [key: string]: any }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          {meta && meta.title ? `${meta.title} - ${siteTitle}` : `${siteTitle} - ${description}`}
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            meta && meta.title ? meta.title : description
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <h2 className={styles.headerTitle}>
          <Link href="/">Blog.</Link>
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
