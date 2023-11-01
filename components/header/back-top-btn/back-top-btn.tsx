import classNames from 'classnames'
import styles from './back-top-btn.module.scss'

type Props = {
  onToggle?: () => void
  left?: boolean
}

export const BackTopBtn = ({ onToggle, left }: Props) => {
  const toggle = () => {
    onToggle?.call(null)
  }

  return <div onClick={toggle} className={classNames(styles.button, left && styles.buttonLeft)}></div>
}
