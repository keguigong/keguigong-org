import { useEffect, useMemo, useState } from "react"
import { setColorMode, COLOR_MODE } from "@/utils/color-mode"
import Icon from "./icon"
import styles from "./icon.module.scss"
const COLOR_MODE_LIST = Object.values(COLOR_MODE)

export const ColorScheme = () => {
  const [mode, setMode] = useState(COLOR_MODE.AUTO)
  const animatedIcon = useMemo(
    () => (mode === COLOR_MODE.AUTO ? <b>🖥️</b> : <Icon darkMode={mode === COLOR_MODE.DARK} />),
    [mode]
  )

  useEffect(() => {
    Promise.resolve().then(() => setColorMode(mode))
  }, [mode])

  const toggleColorMode = () => {
    const index = (COLOR_MODE_LIST.indexOf(mode) + 1) % COLOR_MODE_LIST.length
    setMode(COLOR_MODE_LIST[index])
  }

  return (
    <button className={styles.button} onClick={toggleColorMode}>
      {animatedIcon}
    </button>
  )
}
