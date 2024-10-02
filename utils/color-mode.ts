export const COLOR_MODE = {
  DARK: "dark",
  LIGHT: "light",
  AUTO: "auto",
}

export function setColorMode(mode: string) {
  let dataset = document.documentElement.dataset
  dataset.colorMode = mode
}

export function getSystemPrefersColorScheme() {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) return COLOR_MODE.DARK
  else return COLOR_MODE.LIGHT
}
