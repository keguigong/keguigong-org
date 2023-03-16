export const LOCAL_THEME_KEY = "local_theme"
export const THEMES = {
  DARK: "dark",
  LIGHT: "light"
}

export function checkDarkMode() {
  if (typeof window === "undefined") return false
  let localMode = localStorage.getItem(LOCAL_THEME_KEY)
  if (localMode === THEMES.DARK || localMode === THEMES.LIGHT) {
    return localMode === THEMES.DARK
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
  if (classNames.contains(THEMES.DARK)) classNames.remove(THEMES.DARK)
  if (classNames.contains(THEMES.LIGHT)) classNames.remove(THEMES.LIGHT)
  classNames.add(darkMode ? THEMES.DARK : THEMES.LIGHT)
  localStorage.setItem(LOCAL_THEME_KEY, darkMode ? THEMES.DARK : THEMES.LIGHT)
}

export function clearMode() {
  if (typeof document == "undefined") return
  let classNames = document.documentElement.classList
  if (classNames.contains(THEMES.DARK)) classNames.remove(THEMES.DARK)
  if (classNames.contains(THEMES.LIGHT)) classNames.remove(THEMES.LIGHT)
  localStorage.removeItem(LOCAL_THEME_KEY)
}
