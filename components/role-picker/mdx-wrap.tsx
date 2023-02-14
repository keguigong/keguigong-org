import styles from "./mdx-wrap.module.scss"

export default function MdxWrap({ title, children }: any) {
  return (
    <div className={styles["container"]}>
      {title && (
        <div className={styles["header"]}>
          <p className={styles["title"]}>{title}</p>
        </div>
      )}
      <div className={styles["child-container"]}>{children}</div>
    </div>
  )
}
