import styles from './grid.module.scss'

export function GridLayout() {
  return (
    <div>
      <p>Hello Motherfucker</p>
      <div className={styles.pre}>
        <code className={styles.code}>
          <span>
            <span>function</span>
            <span>hello</span>
            <span>()</span>
            <span>function</span>
            <span>hello</span>
            <span>()</span>
            <span>function</span>
            <span>hello</span>
            <span>()</span>
            <span>function</span>
            <span>hello</span>
            <span>()</span>
            <span>function</span>
            <span>hello</span>
            <span>()</span>
          </span>
          <span>
            <code>console</code>
            <span>.</span>
            <span>log("Hello!")</span>
          </span>
        </code>
      </div>
    </div>
  )
}
