import classNames from "classnames"
import styles from "./styles.module.scss"

export default function RoleAvatar({ name, onClick, isActive }: any) {
  return (
    <li
      onClick={onClick}
      className={classNames(styles["source-item"], isActive && styles["active"])}
    >
      <div className={styles["avatar-wrap"]}>
        <img
          className={styles["avatar-bg"]}
          src="/articlecontent/party-animals/characters_avatar_hover.png"
        />
        <img
          className={styles["avatar-source"]}
          src={`/articlecontent/party-animals/characters_${name}_avatar.png`}
          alt={name}
        />
      </div>
    </li>
  )
}
