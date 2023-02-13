import {
  KeyboardEvent,
  MouseEvent,
  TouchEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react"
import classNames from "classnames"

import styles from "./styles.module.scss"
import RoleAvatar from "./role-avatar"
import rolesList from "./roles.json"

export default function RolePicker() {
  // State
  const [picked, setPicked] = useState(0)
  // Movement
  const [divLeft, setDivLeft] = useState(0)
  const [startX, setStartX] = useState(0)
  const [dragFlag, setDragFlag] = useState(false)

  const [innerWidth, setInnerWidth] = useState(0)
  const [conWidth, setConWidth] = useState(0)
  const containerEl = useRef<HTMLDivElement>(null)
  const innerEl = useRef<HTMLUListElement>(null)

  function moveX(deltaX: number) {
    let newValue =
      divLeft - deltaX > 0
        ? divLeft - deltaX < innerWidth - conWidth
          ? divLeft - deltaX
          : innerWidth - conWidth
        : 0
    setDivLeft(newValue)
  }

  function handleMoveStart() {
    setDragFlag(true)
  }

  function handleMove(e: MouseEvent) {
    if (innerWidth - conWidth <= 0) return
    if (dragFlag) {
      moveX(e.movementX)
    }
  }

  function handleMoveEnd() {
    setDragFlag(false)
    setStartX(0)
  }

  function handleTouchStart(e: TouchEvent) {
    setDragFlag(true)
    setStartX(e.touches[0].clientX)
  }

  function handleTouchMove(e: TouchEvent) {
    let x = e.touches[0].clientX
    let deltaX = x - startX
    moveX(deltaX)
    setStartX(x)
  }

  function handlePick(index: number) {
    setPicked(index)
  }

  useEffect(() => {
    if (!containerEl.current || !innerEl.current) return
    setInnerWidth(innerEl.current.scrollWidth)
    setConWidth(containerEl.current.offsetWidth)
  }, [])

  return (
    <div tabIndex={0} className={styles["roles-container"]}>
      <div
        className={styles["left-mask"]}
        onMouseDown={handleMoveStart}
        onMouseMove={handleMove}
        onMouseUp={handleMoveEnd}
        onMouseOut={handleMoveEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMoveEnd}
      >
        <div className={styles["right-mask"]} ref={containerEl}>
          <ul
            className={classNames(styles["source-item-wrap"], dragFlag && styles["draggable"])}
            style={{ transform: `translateX(-${divLeft}px)` }}
            ref={innerEl}
          >
            {rolesList.map((role, index) => (
              <RoleAvatar
                key={index}
                name={role}
                isActive={index === picked}
                onClick={() => handlePick(index)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
