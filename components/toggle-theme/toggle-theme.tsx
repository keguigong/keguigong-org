import { useEffect, useLayoutEffect, useMemo, useState } from "react"
import { checkDarkMode, clearMode, setMode, watchDarkMode } from "@/utils/toggle-theme"
import Icon from "./icon"

export default function ToggleTheme() {
  // Read more: https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
  const [isDarkMode, setDarkMode] = useState(false)

  useLayoutEffect(() => {
    const mode = checkDarkMode()
    setDarkMode(mode)
    setMode(mode)
  }, [])

  const handleModeChange = (darkMode: boolean) => {
    setMode(darkMode)
    setDarkMode(darkMode)
  }

  // Read more: https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-memoize-calculations
  const animatedIcon = useMemo(
    () => <Icon darkMode={isDarkMode} onModeChange={handleModeChange} />,
    [isDarkMode]
  )

  useEffect(() => {
    let removeListener = watchDarkMode((darkMode) => {
      setDarkMode(darkMode)
      clearMode()
    })

    return () => {
      removeListener()
    }
  }, [isDarkMode])

  return <>{animatedIcon}</>
}
