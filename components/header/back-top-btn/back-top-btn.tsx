import styles from "./back-top-btn.module.scss"

type Props = {
  onToggle?: () => void
}

export const BackTopBtn = ({ onToggle }: Props) => {
  const toggle = () => {
    onToggle?.call(null)
  }

  return <div onClick={toggle} className={styles.button}></div>
}
