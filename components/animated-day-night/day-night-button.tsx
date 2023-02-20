import { useEffect, useMemo, useState } from "react"
import { checkDarkMode, clearMode, setMode, watchDarkMode } from "@/utils/day-night"
import DayNight from "./day-night"

export default function DayNightButton() {
  // Read more: https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
  const [isDarkMode, setDarkMode] = useState(() => checkDarkMode())

  const handleModeChange = (darkMode: boolean) => {
    setMode(darkMode)
    setDarkMode(darkMode)
  }

  // Read more: https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-memoize-calculations
  const animatedIcon = useMemo(
    () => <DayNight darkMode={isDarkMode} onModeChange={handleModeChange} />,
    [isDarkMode]
  )

  useEffect(() => {
    setMode(isDarkMode)
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
