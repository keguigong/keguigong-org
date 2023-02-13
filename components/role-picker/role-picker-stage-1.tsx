import RoleAvatar from "./role-avatar"
import styles from "./styles.module.scss"
import rolesList from "./roles.json"

export default function RolePickerStatic() {
  return (
    <div className={styles["roles-container"]}>
      <ul className={styles["source-item-wrap"]}>
        {rolesList.map((role, index) => (
          <RoleAvatar key={index} name={role} isActive={index === 0} />
        ))}
      </ul>
    </div>
  )
}
