import { useEffect, useMemo, useState } from "react"
import { checkColorScheme, setColorScheme } from "@/utils/color-scheme"
import Icon from "./icon"

export const ColorScheme = () => {
  // Read more: https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
  const [isDarkMode, setDarkMode] = useState(false)

  // Read more: https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-memoize-calculations
  const animatedIcon = useMemo(() => <Icon darkMode={isDarkMode} />, [isDarkMode])

  useEffect(() => {
    setDarkMode(checkColorScheme())
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const listener = (e: MediaQueryListEvent) => {
      // setColorScheme(e.matches)
      setDarkMode(e.matches)
    }
    media.addEventListener("change", listener)

    return () => {
      media.removeEventListener("change", listener)
    }
  }, [])

  useEffect(() => {
    Promise.resolve().then(() => setColorScheme(isDarkMode))
  }, [isDarkMode])

  return <div onClick={() => setDarkMode((s) => !s)}>{animatedIcon}</div>
}
