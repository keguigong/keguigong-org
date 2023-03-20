export const LOCAL_COLOR_SCHEME_KEY = "local-color-scheme"
export const COLOR_SCHEME = {
  DARK: "dark",
  LIGHT: "light"
}

export function checkColorScheme() {
  let localScheme = localStorage.getItem(LOCAL_COLOR_SCHEME_KEY)
  if (localScheme === COLOR_SCHEME.DARK || localScheme === COLOR_SCHEME.LIGHT) {
    return localScheme === COLOR_SCHEME.DARK
  } else {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  }
}

export function setColorScheme(darkMode: boolean) {
  let classNames = document.documentElement.classList
  if (classNames.contains(COLOR_SCHEME.DARK)) classNames.remove(COLOR_SCHEME.DARK)
  if (classNames.contains(COLOR_SCHEME.LIGHT)) classNames.remove(COLOR_SCHEME.LIGHT)
  classNames.add(darkMode ? COLOR_SCHEME.DARK : COLOR_SCHEME.LIGHT)
  localStorage.setItem(LOCAL_COLOR_SCHEME_KEY, darkMode ? COLOR_SCHEME.DARK : COLOR_SCHEME.LIGHT)
}

export function clearColorScheme() {
  let classNames = document.documentElement.classList
  if (classNames.contains(COLOR_SCHEME.DARK)) classNames.remove(COLOR_SCHEME.DARK)
  if (classNames.contains(COLOR_SCHEME.LIGHT)) classNames.remove(COLOR_SCHEME.LIGHT)
  localStorage.removeItem(LOCAL_COLOR_SCHEME_KEY)
}
