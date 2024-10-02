import { useCallback, useEffect, useMemo, useState } from "react"
import { useSpring, animated } from "@react-spring/web"
import { setColorMode, COLOR_MODE, getSystemPrefersColorScheme } from "@/utils/color-mode"
import styles from "./index.module.scss"

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

interface Props {
  darkMode?: boolean
}

export function Icon({ darkMode = false }: Props) {
  const properties = {
    dark: {
      r: 9,
      transform: "rotate(40deg)",
      cx: 12,
      cy: 4,
      opacity: 0,
    },
    light: {
      r: 6,
      transform: "rotate(90deg)",
      cx: 30,
      cy: 0,
      opacity: 1,
    },
    springConfig: {
      mass: 4,
      tension: 250,
      friction: 35,
    },
  }

  const { r, transform, cx, cy, opacity } = properties[darkMode ? "dark" : "light"]

  const svgContainerProps = useSpring({ transform, config: properties.springConfig })
  const centerCircleProps = useSpring({ r, config: properties.springConfig })
  const maskedCircleProps = useSpring({ cx, cy, config: properties.springConfig })
  const linesProps = useSpring({ opacity, config: properties.springConfig })

  return (
    <animated.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.svg}
      style={svgContainerProps}
    >
      <mask id="mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <animated.circle cx={maskedCircleProps.cx} cy={maskedCircleProps.cy} r="9" strokeWidth="0" fill="black" />
      </mask>
      <animated.circle r={centerCircleProps.r} className={styles.circle} cx="12" cy="12" mask="url(#mask)" />
      <animated.g style={linesProps}>
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </animated.g>
    </animated.svg>
  )
}
