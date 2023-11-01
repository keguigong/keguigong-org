import { useCallback, useEffect, useMemo, useState } from "react"
import { setColorMode, COLOR_MODE, getSystemPrefersColorScheme } from "@/utils/color-mode"
import Icon from "./theme-icon"
import styles from "./theme-icon.module.scss"

export const ThemeBtn = () => {
  const [mode, setMode] = useState(() => getSystemPrefersColorScheme())

  const animatedIcon = useMemo(() => <Icon darkMode={mode === COLOR_MODE.DARK} />, [mode])

  const onColorPreferenceChange = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) setMode(COLOR_MODE.DARK)
    else setMode(COLOR_MODE.LIGHT)
  }, [])

  useEffect(() => {
    const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)")
    darkModePreference.addEventListener("change", onColorPreferenceChange)

    return () => {
      darkModePreference.removeEventListener("change", onColorPreferenceChange)
    }
  }, [onColorPreferenceChange])

  useEffect(() => {
    setColorMode(mode)
  }, [mode])

  const toggleColorMode = () => {
    setMode(mode === COLOR_MODE.DARK ? COLOR_MODE.LIGHT : COLOR_MODE.DARK)
  }

  return (
    <button className={styles.button} onClick={toggleColorMode}>
      {animatedIcon}
    </button>
  )
}
