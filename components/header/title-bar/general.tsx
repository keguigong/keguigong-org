import { ThemeBtn } from '../theme-btn'
import { MenuBtn } from '../menu-btn'
import styles from './general.module.scss'
import classNames from 'classnames'

type Props = {
  isMenuOpen?: boolean
  onMenuToggle?: (next: boolean) => void
  alter?: boolean
}

export function GeneralTitleBar(props: Props) {
  return (
    <div className={classNames(styles.titleBar, props.alter && styles.alterTitleBar)}>
      <MenuBtn isOpen={props.isMenuOpen} onToggle={props.onMenuToggle} />
      <h3 className={styles.titleText}>
        <span>k</span>
        <span>e</span>
        <span>g</span>
        <span>u</span>
        <span>i</span>
        <span>g</span>
        <span>o</span>
        <span>n</span>
        <span>g</span>
      </h3>
      <ThemeBtn />
    </div>
  )
}
