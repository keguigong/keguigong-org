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
      <h3>keguigong</h3>
      <ThemeBtn />
    </div>
  )
}
