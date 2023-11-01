import { CSSTransition } from 'react-transition-group'
import styles from './page-loading.module.scss'

type Props = {
  visible?: boolean
}

export function PageLoading({ visible }: Props) {
  return (
    <CSSTransition in={visible} classNames="page-loading" unmountOnExit appear timeout={500}>
      <div className={styles.loadingOverlay}>
        <div className={styles.loading}>
          <div className={styles.loadingText}>
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}
