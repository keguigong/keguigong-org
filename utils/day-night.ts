export function checkDarkMode() {
  if (typeof window === "undefined") return false
  let localMode = localStorage.getItem("darkMode")
  if (localMode === "dark" || localMode === "light") {
    return localMode === "dark"
  } else {
    const darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)")
    return darkModeMedia.matches
  }
  // const darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)")
  // return darkModeMedia.matches
}

export function watchDarkMode(cb: (e: boolean) => void) {
  if (typeof window === "undefined") return () => {}
  const darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)")
  const listener = () => cb.call(undefined, darkModeMedia.matches)
  darkModeMedia.addEventListener("change", listener)
  return () => darkModeMedia.removeEventListener("change", listener)
}

export function setMode(darkMode: boolean) {
  if (typeof document == "undefined") return
  let classNames = document.documentElement.classList
  if (classNames.contains("dark")) classNames.remove("dark")
  if (classNames.contains("light")) classNames.remove("light")
  classNames.add(darkMode ? "dark" : "light")
  localStorage.setItem("darkMode", darkMode ? "dark" : "light")
}

export function clearMode() {
  if (typeof document == "undefined") return
  let classNames = document.documentElement.classList
  if (classNames.contains("dark")) classNames.remove("dark")
  if (classNames.contains("light")) classNames.remove("light")
  localStorage.removeItem("darkMode")
}
