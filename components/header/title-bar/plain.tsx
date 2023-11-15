import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { ThemeBtn } from '../theme-btn'
import styles from './plain.module.scss'

type Props = {
  zen?: boolean
  href?: string
}

export function PlainTitleBar({ zen, href }: Props) {
  const router = useRouter()

  return (
    <div className={styles.titleBar}>
      <div className={styles.titleTextWrapper}>
        {zen ? (
          <Link href={href || '/'} className={styles.disableDefaultLink}>
            <h2 className={classNames(styles.titleText)}>keguigong</h2>
          </Link>
        ) : (
          <>
            <Link href={href || '/'} className={styles.disableDefaultLink}>
              <h2 className={classNames(styles.titleText, router.asPath !== '/' && styles.inactiveTitle)}>keguigong</h2>
            </Link>{' '}
            <Link href="/work" className={styles.disableDefaultLink}>
              <h2 className={classNames(styles.titleText, router.asPath !== '/work' && styles.inactiveTitle)}>work</h2>
            </Link>
          </>
        )}
      </div>
      <ThemeBtn />
    </div>
  )
}
