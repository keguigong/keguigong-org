import Link from 'next/link'
import { useSelector } from 'react-redux'
import { getIsHome, getIsBlogBody } from '@/store/header-slice'
import styles from './layout.module.scss'
import { Header } from '@/components/header'
import { ThemeBtn } from '@/components/header/theme-btn'

type Props = {
  children?: JSX.Element
  home?: boolean
}

export default function Layout({ children, home }: Props) {
  const isHome = useSelector(getIsHome)
  const isBlogBody = useSelector(getIsBlogBody)

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
          <a href="https://github.com/keguigong">GitHub</a> • <a href="https://www.behance.net/keguigong">Behance</a> •{' '}
          <a href="https://www.instagram.com/keguigong/">Instagram</a>
        </div>
      </footer>
    </>
  )
}
