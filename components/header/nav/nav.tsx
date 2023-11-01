import Link from 'next/link'
import classNames from 'classnames'
import styles from './nav.module.scss'

type Props = {
  visible?: boolean
  onClose?: () => void
}

export function Nav(props: Props) {
  return (
    <nav>
      <ul className={classNames(styles.navContent, props.visible && styles.navContentOpen)} onClick={props.onClose}>
        <br />
        <li>
          <Link className={styles.navLink} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={styles.navLink} href="/blogs">
            Blogs
          </Link>
        </li>
        <li>
          <Link className={styles.navLink} href="/plogs">
            Plogs
          </Link>
        </li>
        <li>
          <Link className={styles.navLink} href="/works">
            Works
          </Link>
        </li>
      </ul>
    </nav>
  )
}
